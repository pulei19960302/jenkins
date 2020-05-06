import React, { PureComponent, Fragment } from "react"
import { MSG_CONTENT_TYPE } from '../constants'
import classNames from 'classnames'
import { connect } from 'dva'
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Progress, Avatar, Spin } from 'antd';
import { PreviewImg, PreviewVideo, IconFont } from 'components'
import styles from './index.less'
import { nextTick } from "utils/nextTick";

const { TEXT, IMAGE, VIDEO } = MSG_CONTENT_TYPE

@connect(({ conversation }) => ({ conversation }))
class ChatList extends PureComponent {
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { hasScroll: nextHasScroll } = nextProps.conversation
        const { hasScroll: prevHasScroll } = this.props.conversation
        if (nextHasScroll !== prevHasScroll && nextHasScroll) {
            nextTick(() => {
                document.getElementById('chatContainer').scrollTop = 999999
            })
            this.props.dispatch({
                type: `conversation/updateState`,
                payload: { hasScroll: false }
            })
        }
    }
    getMoreMsg = () => {
        const { msgList } = this.props.conversation
        this.props.dispatch({
            type: `conversation/getMsgList`,
            payload: msgList.length ? msgList[0].msg_index : null
        })
    }
    render() {
        const { msgList, hasMoreMsg } = this.props.conversation
        return (
            <div className={styles.chatContainer} id="chatContainer">
                {
                    hasMoreMsg &&
                    <div className={styles.more}><span onClick={this.getMoreMsg}>查看更多</span></div>
                }
                {
                    msgList.map((msg, index) => (
                        <div
                            key={index}
                            className={
                                classNames(`${styles.chatItem}`,{
                                    [`${styles.customer}`]: msg.person_type === 2,
                                    [`${styles.customerService}`]: msg.person_type === 1
                                })}>
                            <Avatar
                                src={msg.person_head_picture}
                                className="avatar"
                            />
                            <p className="header">{msg.person_name} {msg.date}</p>
                            <div className="content">
                                {
                                    [-1, 0, 1].includes(msg.status) && <Fragment>
                                        {
                                            msg.msg_content_type === TEXT && <span>{msg.message}</span>
                                        }
                                        {
                                            msg.msg_content_type === IMAGE &&
                                            <img
                                                onClick={() => PreviewImg({ imgUrl: msg.message })}
                                                src={msg.message} />
                                        }
                                        {
                                            msg.msg_content_type === VIDEO && <Fragment>
                                                <IconFont type="iconbofang" className="playIcon" onClick={() => PreviewVideo({ videoSrc: msg.message })} />
                                                <video src={msg.message}>
                                                </video>
                                            </Fragment>
                                        }
                                    </Fragment>
                                }
                                {   // 上传中
                                    msg.person_type === 1 && msg.status === -2 &&
                                    <Progress type="circle" percent={msg.progress} width={40} />
                                }
                                {   // 已读未读
                                    msg.person_type === 1 &&
                                    <span className="replayStatus">
                                        {
                                            msg.status === -1 &&
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}></Spin>
                                        }
                                        {
                                            msg.status === 0 &&
                                            <span style={{ color: '#999' }}>未读</span>
                                        }
                                        {
                                            msg.status === 1 &&
                                            <span style={{ color: '#FF9D61' }}>已读</span>
                                        }
                                    </span>
                                }
                                {   // 上传出错
                                    msg.person_type === 1 && msg.status === -3 &&
                                    <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} className="uploadStatus" />
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default ChatList