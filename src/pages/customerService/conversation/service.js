import websocket from 'utils/websocket'
import { ws_target } from 'services/target'
import { MSG_TYPE, } from './constants'
const { ENTER, HEART_BEAT, } = MSG_TYPE

class Socket {

    ws = null
    timer = null
    dispatch = null
    baseMessage = null

    socketConnet = (baseMessage) => {
        this.baseMessage = baseMessage
        this.ws && this.ws.close()
        this.ws = new websocket(ws_target, null, { debug: true, reconnectInterval: 3000 })
        this.ws.onopen = () => {
            console.log('msg:', 'open');
            this.sendMessage({
                message: '客服上线',
                msg_type: ENTER,
            })
            this.sendHeartbeat() // 发送心跳
        };
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log('msg:', data);
            this.dispatch({
                type: 'onMessage',
                payload: data
            })
        };
    }

    close = () => {
        this.ws && this.ws.close()
        this.timer && clearInterval(this.timer)
    }

    sendMessage = (otherMsg) => {
        this.ws && this.ws.send(JSON.stringify({ ...this.baseMessage, ...otherMsg }));
    }

    // 发送心跳
    sendHeartbeat = () => {
        this.timer && clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.sendMessage({
                msg_type: HEART_BEAT,
                message: '心跳消息',
            })
        }, 10000)
    }
}

export default new Socket()