import React, { PureComponent } from "react"
import _ from 'lodash'
import { MSG_CONTENT_TYPE } from '../constants'
import { connect } from 'dva'
import { SwapOutlined, SyncOutlined } from '@ant-design/icons';
import { Tooltip, Dropdown, Menu, Input, Badge, Avatar, Modal, Empty } from 'antd';
import { IconFont } from 'components'
import classNames from 'classnames'
import styles from './index.less'

const { IMAGE, VIDEO } = MSG_CONTENT_TYPE
const { Search } = Input
const statusList = [
    { id: 1, name: '在线', icon: 'iconzaixian' },
    { id: 2, name: '忙碌', icon: 'iconmanglu' },
    { id: 0, name: '离线', icon: 'iconlixian' },
]
@connect(({ conversation }) => ({ conversation }))
class CustomerList extends PureComponent {
    state = {

    }
    // 点击搜索按钮
    search(value) {
        const { showSearchList } = this.props.conversation
        if (value) {
            this.props.dispatch({
                type: `conversation/updateState`,
                payload: { customerList: [], msgList: [], activeKey: "", showSearchList: true },
            })
            this.props.dispatch({
                type: `conversation/serarchCustomer`,
                payload: { search_name: value },
            })
            // 发送搜索websocket
        }
        if (!value && showSearchList) {
            this.props.dispatch({
                type: `conversation/updateState`,
                payload: { customerList: [], msgList: [], activeKey: "", showSearchList: false, page: 1 },
            })
            this.props.dispatch({  // 拉取第一页客户
                type: `conversation/getCustomerList`,
            })
        }
    }
    // 切换在线状态
    handleClickMenu = ({ item }) => {
        const { el } = item.props
        const { customerServiceStatus } = this.props.conversation
        if (el.id === customerServiceStatus) { return }
        this.props.dispatch({
            type: `conversation/switchStatus`,
            payload: el.id,
        })
    }
    // 切换排序
    handleClickSort = ({ key }, refresh) => {
        const { sort_type } = this.props.conversation
        if (+key === sort_type && !refresh) { return }
        this.props.dispatch({
            type: `conversation/updateState`,
            payload: { sort_type: +key, activeKey: "", customerList: [], msgList: [], page: 1 },
        })

        this.props.dispatch({  // 拉取第一页客户
            type: `conversation/getCustomerList`,
        })
    }
    // 获取未读信息条数
    getUnreadCount = (el) => {
        const { activeKey } = this.props.conversation
        if (el.key === activeKey) {
            return 0
        }
        return el.unread_msg_num
    }
    // 获取每个会话的信息
    getLastMsg = (el = {}) => {
        let item = el.latest_msg || el
        if (item.msg_content_type === IMAGE) {
            return '[图片]'
        }
        if (item.msg_content_type === VIDEO) {
            return '[视频]'
        }
        return item.message || ''
    }
    // 切换会话
    handleClick = (el) => {
        const { activeKey } = this.props.conversation
        if (activeKey === el.key) { return }
        this.props.dispatch({
            type: `conversation/updateState`,
            payload: { activeKey: el.key, msgList: [] },
        })
        this.props.dispatch({
            type: `conversation/getMsgList`,
        })
    }
    // 关闭会话
    close = (el) => {
        Modal.confirm({
            title: '结束会话',
            content: `确定要关闭与${el.person_name}的聊天吗？`,
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                const { customerList, activeKey } = this.props.conversation
                const list = customerList.filter(customer => customer.key !== el.key)
                let newKey = activeKey
                if (activeKey === el.key && list.length) {   // 如果关闭的是当前会话
                    newKey = list[0].key || null
                }
                this.props.dispatch({
                    type: `conversation/updateState`,
                    payload: { customerList: [...list] },
                })
                if (el.key === activeKey && newKey) {  // 新会话
                    this.props.dispatch({
                        type: `conversation/updateState`,
                        payload: { activeKey: newKey, msgList: [] },
                    })
                    this.props.dispatch({
                        type: `conversation/getMsgList`,
                    })
                }
            },
        })
    }
    onScroll = _.debounce(function (e) {
        let { customerList, showSearchList, page, hasMoreConversation } = this.props.conversation
        if (!customerList.length || showSearchList || !hasMoreConversation) { return }
        const container = document.getElementById("__customerList");
        if (container.scrollHeight - container.scrollTop === container.clientHeight) {
            console.log('------------------')
            this.props.dispatch({
                type: `conversation/updateState`,
                payload: { page: ++page },
            })
            this.props.dispatch({
                type: `conversation/getCustomerList`,
            })
        }
    }, 500).bind(this)
    render() {
        const { customerList, activeKey, customerServiceStatus, user = {}, sort_type = 1 } = this.props.conversation
        const statusItem = statusList.find(el => el.id === customerServiceStatus) || {}
        return (
            <div className={styles.customerContainer}>
                <div className={styles.header}>
                    <Dropdown overlay={
                        <Menu onClick={this.handleClickMenu} selectedKeys={[_.toString(statusItem.id)]}>
                            {
                                statusList.map(el => (
                                    <Menu.Item key={el.id} el={el}><IconFont type={el.icon} />{el.name}</Menu.Item>
                                ))
                            }
                        </Menu>
                    }
                        trigger={['click']}
                        overlayClassName="customer_service_menu"
                    >
                        <div className="ant-dropdown-link">
                            <Avatar src={user.avatar}><IconFont type={statusItem.icon} className={styles.avaterIcon} /></Avatar>
                        </div>
                    </Dropdown>
                    <div className={styles.nikeName}>
                        <span style={{ color: '#000' }}>
                            {user.name}
                        </span>
                        <span style={{ color: '#666' }}>({statusItem.name})</span>
                    </div>
                </div>
                <div className={styles.search}>
                    <Search
                        className="searchInput"
                        disabled={customerServiceStatus === 0}
                        allowClear
                        placeholder="请输入用户名"
                        size="default"
                        onSearch={value => this.search(value)}
                    />
                    <div className="operate">
                        <Dropdown overlay={
                            <Menu onClick={this.handleClickSort} selectedKeys={[_.toString(sort_type)]}>
                                <Menu.Item key={1}>按会话时间排序</Menu.Item>
                                <Menu.Item key={2}>按未读消息排序</Menu.Item>
                            </Menu>
                        }
                            trigger={['click']}
                        >
                            <div className="ant-dropdown-link">
                                <IconFont type="iconpaixu1" style={{fontSize: 16}} />
                            </div>
                        </Dropdown>
                        {
                            sort_type === 2 &&
                            <Tooltip placement="topLeft" title="刷新">
                                <SyncOutlined
                                    style={{marginLeft: 4}}
                                    onClick={() => this.handleClickSort({ key: 2 }, true)} />
                            </Tooltip>
                        }
                    </div>
                </div>
                <div id="__customerList" className={styles.customerList} onScroll={this.onScroll}>
                    {
                        customerList.map(el => (
                            <div
                                key={el.key}
                                className={classNames({
                                    [styles.customerItemContainer]: true,
                                    [styles.itemActive]: el.key === activeKey
                                })}>
                                {/* <Icon type="close" className={styles.close} onClick={() => this.close(el)} /> */}
                                <div className={styles.customerItem} onClick={() => this.handleClick(el)}>
                                    {el.transfer_num > 0 && <SwapOutlined className={styles.swap} />}
                                    {
                                        this.getUnreadCount(el) > 0 &&
                                        <Badge count={this.getUnreadCount(el)} className={styles.badge} overflowCount={99} />
                                    }
                                    <Avatar src={el.person_head_picture}
                                        className={styles.avatar} />
                                    <p className={`${styles.customerName} ${styles.line}`}>
                                        {el.person_name}
                                        {el.conversation_status === 2 ? '(已关闭)' : ''}
                                    </p>
                                    <p className={`${styles.lastDialogue} ${styles.line}`}>{this.getLastMsg(el)}</p>
                                </div>
                            </div>
                        ))
                    }
                    {
                        !customerList.length &&
                        <Empty style={{ marginTop: 80 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无会话" />
                    }
                </div>
            </div>
        );
    }
}

export default CustomerList