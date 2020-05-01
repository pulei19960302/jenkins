const socket = {
    name: 'socket',
    state: {
        socket: {
            isConnected: false,    // 连接成功
            reconnectError: false, // 重连标记
            message: '',           // 内容
        }
    },
    mutations: {
        SOCKET_ONOPEN (state, event)  {
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false
        },
        SOCKET_ONERROR (state, event)  {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
            state.socket.message = message
            // console.log(message, 'SOCKET_ONMESSAGE')
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            // console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    }
};

export default socket;
