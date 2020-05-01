import React, { PureComponent } from "react"
import moment from 'moment'
import { MSG_CONTENT_TYPE, MSG_TYPE, PERSON_TYPE } from '../constants'
import { connect } from 'dva'
import { createUUID } from 'utils'
import { Avatar, Tooltip, Input, Button, message, Modal } from 'antd'
import { IconFont } from 'components'
import UploadFile from './UploadFile'
import CreateWorkOrder from './CreateWorkOrder'
import SwitchChat from './SwitchChat'
import ChatList from './ChatList'
import Emoji from './Emoji'
import { nextTick } from "utils/nextTick";
import styles from './index.less'
const { NORMAL } = MSG_TYPE
const { TEXT, IMAGE, VIDEO } = MSG_CONTENT_TYPE
const { TextArea } = Input
const DATE = 'YYYY-MM-DD HH:mm:ss'
@connect(({ conversation, app }) => ({ conversation, app }))
class ChatBox extends PureComponent {
    constructor(props) {
        super(props)
        this.emojiPanel = React.createRef()
        this.state = {
            inputCursor: null, //光标位置 
            showEmojiPanel: false,
            textValue: '',
            createWorkOrderModal: false,  // 创建工单弹窗
            switchChatModal: false // 转移工单
        }
    }
    // 聊天窗口自动滚动到底部
    autoScroll() {
        nextTick(() => {
            document.getElementById('chatContainer').scrollTop = 99999
        })
    }
    componentDidMount() {
        document.body.addEventListener('click', this.bodyClick, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.bodyClick, false);
    }
    bodyClick = (e) => {
        if (!this.emojiPanel.current.contains(e.target)) {
            this.setState({
                showEmojiPanel: false
            });
        }
    }
    textChange = (e) => {
        this.setState({
            textValue: e.target.value,
        })
    }
    toogleEmoji = (isShow) => {
        const testarea = document.getElementById("chatTextArea")
        this.setState({
            showEmojiPanel: isShow,
            inputCursor: testarea.selectionStart
        });
    }
    selectEmoji = (Emoji) => {
        const { textValue, inputCursor } = this.state
        let lastCursor = inputCursor ? inputCursor : textValue.length
        let startStr = textValue.substr(0, lastCursor)
        let endStr = textValue.substr(lastCursor)
        this.setState({
            textValue: startStr + `${Emoji}` + endStr,
            showEmojiPanel: false
        })
    }
    // 图片上传回调
    uploadStatus = ({ url, uid, type, progress, uploadStatus }) => {
        const msg = {
            message: url,
            msg_content_type: type === 'image' ? IMAGE : VIDEO,
            uid,
            progress,
        }
        if (uploadStatus === 'uploading') {
            this.updateChat({ ...msg, status: -2 })
        }
        if (uploadStatus === 'uploadSuccess') {
            this.updateChat({ ...msg, status: 0 })
            this.props.dispatch({
                type: `conversation/sendMessage`,
                payload: msg
            })
        }
        if (uploadStatus === 'error') {
            this.updateChat({ ...msg, message: `${type === 'image' ? '图片' : '视频'}上传失败`, status: -3 })
        }
        // status:  -3 上传出错 | -2 正在上传图片或视频  | -1 loading
    }
    // 更新消息
    updateChat(msg) {
        const { dispatch, conversation } = this.props
        const { activeKey, person_name, person_head_picture } = conversation
        if (!activeKey) { return }
        const receiveMsg = {
            key: activeKey,
            msg_type: NORMAL,
            date: `${moment().format(DATE)}`,
            person_type: PERSON_TYPE.CUSTOMER_SERVICE,
            person_name,
            person_head_picture,
            ...msg,
            status: -1,
        }
        dispatch({
            type: 'conversation/onMessage',
            payload: receiveMsg,
        })
    }

    // 点击发送按钮
    send = () => {
        const { textValue } = this.state
        const { customerServiceStatus } = this.props.conversation
        if (customerServiceStatus === 0) {
            message.warning('你当前处于离线状态')
            return
        }
        const msg = {
            message: textValue,
            msg_content_type: TEXT,
            status: 0,
            uid: createUUID()
        }
        this.setState({ textValue: '' })
        this.updateChat(msg)
        this.props.dispatch({
            type: `conversation/sendMessage`,
            payload: msg
        })
    }
    // 转接会话
    switch = (switch_service_id, remarks) => {
        this.props.dispatch({ type: 'conversation/switchService', payload: { switch_service_id, remarks } })
    }
    // 关闭会话
    close = (el) => {
        if (!el.key) { return }
        Modal.confirm({
            title: '结束会话',
            content: `确定要结束与${el.person_name}的会话吗？`,
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                const { customerList, activeKey } = this.props.conversation
                const list = customerList.filter(customer => customer.key !== activeKey)
                this.props.dispatch({
                    type: `conversation/updateState`,
                    payload: { customerList: [...list], activeKey: (list.length && list[0].key) || null, msgList: [] },
                })
                this.props.dispatch({
                    type: `conversation/getMsgList`,
                })
            },
        })
    }
    // 弹窗显示
    showModal = modal => {
        this.setState({
            [modal]: true,
        })
    }
    // 弹窗隐藏
    hideModal = modal => {
        this.setState({
            [modal]: false,
        })
    }
    // 弹窗公共props
    getCommonProps = (modal) => {
        return {
            modalVisible: this.state[modal],
            onCancel: () => {
                this.hideModal(modal)
            }
        }
    }
    render() {
        const { showEmojiPanel, textValue } = this.state
        const { activeKey, customerList, } = this.props.conversation
        let customer = customerList.find(el => el.key === activeKey) || {}
        return (
            <div className={styles.chatBox}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <Avatar
                            className={styles.avatar}
                            src={customer.person_head_picture} />
                        <p>
                            {customer.person_name}
                            {customer.sn_type === 1 && `（订单号：${customer.sn_code}）`}
                            {customer.sn_type === 2 && `（售后单号：${customer.sn_code}）`}
                        </p>
                    </div>
                    {
                        activeKey &&
                        <div className={styles.bansBar}>
                            {/* <Tooltip placement="bottom" title="历史记录">
                            <IconFont type="iconlishijilu" />
                        </Tooltip> */}
                            {/* <Tooltip placement="bottom" title="创建工单" onClick={() => this.showModal('createWorkOrderModal')}>
                                <i><IconFont type="iconchuangjiangongdan" /></i>
                            </Tooltip> */}
                            <Tooltip placement="bottom" title="会话转接" onClick={() => this.showModal('switchChatModal')}>
                                <i><IconFont type="iconhuihuazhuanjie" /></i>
                            </Tooltip>
                            <Tooltip placement="bottom" title="结束会话" onClick={() => this.close(customer)}>
                                <i><IconFont type="iconjieshuhuihua" /></i>
                            </Tooltip>
                        </div>
                    }
                </div>
                <ChatList />
                <div className={styles.textAreaContainer}>
                    <div className={styles.toolsBar}>
                        <div className={styles.emojiPanel} ref={this.emojiPanel}>
                            {showEmojiPanel && <Emoji selectEmoji={this.selectEmoji} />}
                        </div>
                        <IconFont type="iconbiaoqing" onClick={() => this.toogleEmoji(true)} className={styles.icon} />
                        <UploadFile
                            disabled={!activeKey}
                            index={1}
                            uploadStatus={this.uploadStatus}
                            uploadButton={<IconFont type="icontupian" />}
                        />
                    </div>
                    <div className={styles.textarea}>
                        <TextArea
                            id="chatTextArea"
                            value={textValue}
                            onChange={this.textChange}
                            spellCheck="false"
                            autoComplete="false"
                        />
                    </div>
                    <div className={styles.footer}>
                        <Button
                            type="primary"
                            className={styles.subBtn}
                            disabled={!activeKey || !textValue || customer.conversation_status === 2}
                            onClick={this.send}>
                            发送</Button>
                    </div>
                </div>
                <CreateWorkOrder {...this.getCommonProps('createWorkOrderModal')} />
                <SwitchChat {...this.getCommonProps('switchChatModal')} switchChat={this.switch} user={this.props.app.user} />
            </div>
        )
    }
}

export default ChatBox