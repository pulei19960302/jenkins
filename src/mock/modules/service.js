class Login{
    LOGIN() {
        return {
            code: 0,
            message: '登录成功',
            data: {
                msgs: [{
                    portrait: 'http://admin.mall.ryg0212.com/static/imgs/logo.png',
                    username: '彩什么虹',
                    time: '17:50',
                    content: '你好',
                    type: 1
                },{
                    portrait: 'http://admin.mall.ryg0212.com/static/imgs/logo.png',
                    username: '客服',
                    time: '17:50',
                    content: '你好，请问有什么可以帮您',
                    type: 2
                }]
            }
        }
    }
}
export default new Login();

