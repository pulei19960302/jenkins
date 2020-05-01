class Login{
    LOGIN() {
        return {
            code: 0,
            message: '登录成功',
            data: {
                accessToken: '&&&xxx!!!!'
            }
        }
    }
    USER_INFO() {
        return {
            code: 0,
            message: '获取用户信息成功',
            data: {
                username: '何廷俸',
                permission: {
                    index: ['export'],
                    index2: ['look', 'export']
                }
            }
        }
    }
    LOGINOUT() {
        return {
            code: 0,
            message: '登出成功',
            data: {}
        }
    }
}
export default new Login();

