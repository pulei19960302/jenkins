import modelExtend from 'dva-model-extend'
import { message, notification } from 'antd'
import Token from '@/utils/token'
import { model } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import lodash from 'lodash'
import service from './service'
import { MSG_TYPE, MSG_CONTENT_TYPE, PERSON_TYPE } from './constants'

const { ENTER, NORMAL, PULL_LIST, SEARCH_LIST, GET_MSG, READ, SWITCH_SERVICE, NEW_CONVERSATION,
    SERVICE_EXI, SERVICE_ONLINE, SERVICE_BUSY } = MSG_TYPE

const { TEXT } = MSG_CONTENT_TYPE

const { CUSTOMER_SERVICE, CUSTOMER } = PERSON_TYPE

const baseMessage = {
    company_id: "",
    person_type: CUSTOMER_SERVICE,         //用户类型客服 1 用户2
    person_id: "",           //用户id
    person_name: "", //用户名字
    person_head_picture: "", //用户头像
    auth_key: "", //暂时无用,必须添加, 方便以后升级授权
    type: 0,   //咨询类型
    message: "",  //消息(注:必须要有内容, 进入时的内容可自定或者咨询产品)
    msg_type: NORMAL,   //消息类型 (2000用户进入|2100正常消息|2200消息已读)
    msg_content_type: TEXT,  //消息类型 （1文字2图片|3视频）
    status: 0,  //消息状态0未读 1已读
}


export default modelExtend(model, {
    namespace: 'conversation',
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathMatchRegexp('/customerService/conversation', pathname)) {
                    service.dispatch = dispatch
                    notification.destroy()
                }
            })
        },
    },
    state: {
        switchServiceModal: false, // 转移客服弹窗
        hasScroll: false, // 是否有新消息触发滚动
        hasMoreMsg: true,  // 是否有更多消息
        hasMoreConversation: true, //是否有更多会话
        showSearchList: false, //当前是否为搜索
        sort_type: 1, // 排序 1会话 2未读消息
        customerServiceStatus: 3, // 客服在线状态
        user: {}, //用户信息
        msgList: [],
        page: 1,
        page_size: 50,
        customerList: [], // 客户列表
        activeKey: null, // 聊天中的客户
        auth_key: "",
    },
    effects: {
        *socketInit({ payload }, { call, put, select }) {
            const { user } = yield select(_ => _.app)
            yield put({ type: 'updateState', payload: { user } })
            const userInfo = { person_name: user.name, person_head_picture: user.avatar, person_id: user.id, company_id: user.company_id }
            yield call(service.socketConnet, { ...baseMessage, ...userInfo, auth_key: Token.getToken() })
        },
        *closeSocket({ payload }, { call, put, select }) {
            yield call(service.close)
        },
        *sendMessage({ payload }, { call, put, select }) {
            const { activeKey } = yield select(model => model.conversation)
            yield call(service.sendMessage, { key: activeKey || "", ...payload })
        },
        *onMessage({ payload: data }, { call, put, select }) {
            const { activeKey, customerList, msgList, sort_type, page_size } = yield select(model => model.conversation)
            switch (data.msg_type) {
                case ENTER:   //客服进入
                    yield put({ type: 'updateState', payload: { customerServiceStatus: data.person_status } })
                    if (!customerList.length) {
                        yield put({ type: 'getCustomerList' })
                    }
                    break
                case PULL_LIST:   //拉取会话
                case SEARCH_LIST: //搜索会话
                    let list = []
                    if (data.msg_type === PULL_LIST) {
                        list = data.result.list
                    } else {
                        list = data.result
                    }
                    let tempCustomerList = lodash.unionBy(customerList, list, 'key') // 去重
                    let newKey = null
                    if (!activeKey && tempCustomerList.length) {   // 如果没有会话 默认第一个
                        newKey = tempCustomerList[0].key
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            activeKey: newKey ? newKey : activeKey,
                            customerList: tempCustomerList,
                            hasMoreConversation: list.length < page_size ? false : true
                        }
                    })
                    if (newKey) { yield put({ type: 'getMsgList' }) }
                    break
                case NORMAL:
                case NEW_CONVERSATION:
                    if (data.msg_type === NEW_CONVERSATION) {
                        let index = customerList.findIndex(el => el.key === data.key)
                        if (index >= 0) { return }
                    }
                    if (window.location.hash !== '#/customerService/conversation') {
                        notification.info({
                            key: 'key',
                            message: '消息通知',
                            description: '您有新的会话消息，请及时处理。',
                            duration: 0
                        });
                    }
                    if (activeKey === data.key) {
                        let index = -1
                        if (data.msg_index) {
                            index = msgList.findIndex(el => el.msg_index === data.msg_index)
                        }
                        if (index === -1 && data.uid) {
                            index = msgList.findIndex(el => el.uid === data.uid)
                        }
                        if (index >= 0) {  //如果消息存在，只做更新
                            msgList.splice(index, 1, data)
                        } else {
                            if (data.person_type === CUSTOMER) {
                                yield put({ type: 'read', payload: [data.msg_index] }) //通知C端已读
                                const activeIndex = customerList.findIndex(el => el.key === data.key)
                                customerList.splice(activeIndex, 1, { ...customerList[activeIndex], ...data, unread_msg_num: 0 })
                            }
                            msgList.push(data)  // 新增记录
                            yield put({ type: 'updateState', payload: { hasScroll: true } })
                        }
                        yield put({ type: 'updateState', payload: { msgList: [...msgList], customerList: [...customerList] } })
                    } else {
                        let activeIndex = customerList.findIndex(el => el.key === activeKey)
                        let index = customerList.findIndex(el => el.key === data.key)
                        const oldData = customerList[index]   // 保证之前独有的字段不被覆盖
                        console.log('收到新消息', index)
                        if (index >= 0) {  // 客户列表已存在客户
                            if (sort_type === 1) {  // 按会话排序
                                console.log('收到新消息', data)
                                customerList.splice(index, 1, { ...oldData, ...data })
                            } else {               //  按未读排序
                                customerList.splice(index, 1)
                                customerList.unshift({ ...oldData, ...data })
                            }
                        } else {   // 新会话
                            customerList.unshift(data)
                        }
                        let newActiveIndex = customerList.findIndex(el => el.key === activeKey)
                        if (activeIndex !== newActiveIndex && newActiveIndex > 0) {   // 保证当前会话的可视位置
                            const data = customerList.splice(newActiveIndex, 1)[0]
                            customerList.splice(activeIndex, 0, data)
                        }
                        let newKey = null
                        if (!activeKey && customerList.length) {   // 如果没有会话 默认第一个
                            newKey = customerList[0].key
                        }
                        yield put({ type: 'updateState', payload: { customerList: [...customerList], activeKey: newKey ? newKey : activeKey } })
                        if (newKey) { yield put({ type: 'getMsgList' }) }
                    }
                    break;
                case GET_MSG:
                    let index = customerList.findIndex(el => el.key === data.key)
                    if (index >= 0) {
                        const customer = customerList[index]
                        if (customer.unread_msg_num !== 0) {    // 当前聊天会话未读置为0
                            customer.unread_msg_num = 0
                            customerList.splice(index, 1, customer)
                            yield put({ type: 'updateState', payload: { customerList: [...customerList] } })
                        }
                    }
                    if (data.list.length) {
                        const msg_ids = data.list.filter(el => (el.status === 0 && el.person_type === CUSTOMER)).map(el => el.msg_index)
                        if (msg_ids.length) {
                            yield put({ type: 'read', payload: msg_ids }) //通知C端已读
                        }
                        const hasScroll = !msgList.length ? true : false //首次加载msg滚动到底部
                        const newList = data.list.filter(el => [1, 2].includes(el.person_type))
                        yield put({ type: 'updateState', payload: { msgList: [...newList, ...msgList], hasMoreMsg: true, hasScroll } })
                        if (!newList.length) {
                            if (msgList.length) { message.info('没有更多消息了') }
                            yield put({ type: 'updateState', payload: { hasMoreMsg: false } })
                        }
                    } else {
                        if (msgList.length) { message.info('没有更多消息了') }
                        yield put({ type: 'updateState', payload: { hasMoreMsg: false } })
                    }
                    break
                case READ: // 更新已读
                    if (data.person_type === CUSTOMER) {
                        msgList.forEach(msg => {
                            if (data.msg_ids.includes(msg.msg_index)) {
                                msg.status = 1
                            }
                        })
                        yield put({ type: 'updateState', payload: { msgList: [...msgList] } })
                    }
                    break
                case SWITCH_SERVICE:  // 转移客服
                    message.info('客服转移成功')
                    const newList = customerList.filter(customer => customer.key !== activeKey)
                    const key = (newList.length && newList[0].key) || null
                    yield put({
                        type: 'updateState',
                        payload: { customerList: [...newList], msgList: [], activeKey: key, switchServiceModal: false }
                    })
                    if (key) {
                        yield put({ type: 'getMsgList' })
                    }
                    break
            }
        },
        *getCustomerList({ payload }, { call, put, select }) {
            const { customerList, page_size, page, sort_type } = yield select(model => model.conversation)
            const length = customerList.length
            const message = {
                msg_type: PULL_LIST,
                message: '拉取客户',
                sort_type,
                page,
                page_size,
                key: length ? customerList[length - 1].key : ""
            }
            yield put({ type: 'sendMessage', payload: message })
        },

        *serarchCustomer({ payload }, { call, put, select }) {
            yield put({ type: 'updateState', payload: { customerList: [], activeKey: '', msgList: [] } })
            const message = {
                search_name: payload.search_name,
                message: '搜索客户',
                msg_type: SEARCH_LIST,
            }
            yield put({ type: 'sendMessage', payload: message })
        },
        *getMsgList({ payload }, { call, put, select }) {
            const message = {
                msg_type: GET_MSG,
                message: '拉取消息',
                msg_index: payload || 0
            }
            yield put({ type: 'sendMessage', payload: message })
        },
        *read({ payload }, { call, put, select }) {
            const message = {
                msg_type: READ,
                message: '消息已读',
                msg_ids: payload,
            }
            yield put({ type: 'sendMessage', payload: message })
        },
        *switchStatus({ payload: status }, { call, put, select }) {
            yield put({ type: 'updateState', payload: { customerServiceStatus: status } })
            let message = {
                msg_type: "",
                message: "",
            }
            switch (status) {
                case 1:
                    message.msg_type = SERVICE_ONLINE
                    message.message = '客服上线'
                    break
                case 2:
                    message.msg_type = SERVICE_BUSY
                    message.message = '客服忙碌'
                    break
                case 0:
                    message.msg_type = SERVICE_EXI
                    message.message = '客服下线'
                    break
            }
            yield put({ type: 'sendMessage', payload: message })
        },
        *switchService({ payload }, { call, put, select }) {
            const message = {
                msg_type: SWITCH_SERVICE,
                message: '切换客服',
                switch_service_id: payload.switch_service_id,
                remarks: payload.remarks,
            }
            yield put({ type: 'sendMessage', payload: message })
        },
    },
    reducers: {

    },
})
