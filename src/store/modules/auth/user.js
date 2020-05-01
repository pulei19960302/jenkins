import { Token, Storage } from '@/OMS/utils';
import api from '@/api';

const user = {
    name: 'user',
    namespaced: true,
    state: {
        token: Token.getToken(), // token
        userInfo: {},            // 用户信息
        menu_permissions: [],
        button_permissions: [],  // 操作权限
        platform_config:{},
        isGetUserInfo: false     // userInfo只会获取一次接口，标记判断
    },
    actions: {
        // 登录
        async Login({ commit }, params) {
            try {
                const { data } = await api.login.LOGIN(params);
                commit('SET_STATE', { token: data.accessToken });
                Token.setToken(data.accessToken);
            } catch (err) {
                throw new Error(err);
            }
        },
        // 获取用户信息
        async GetUserInfo({ commit }) {
            try {
                const { data } = await api.login.GET_USERINFO();
                commit('SET_STATE', {
                    userInfo: data,
                    menu_permissions: [...data.menu_permissions],
                    button_permissions: [...data.button_permissions],
                    isGetUserInfo: true,
                    platform_config:data.platform_config
                });
            } catch (err) {
                throw new Error(err);
            }
        },
        /**
         * 登出
         * @param isForce 是否是主动登出
         * @returns {Promise<void>}
         * @constructor
         */
        async LogOut(isForce) {
            if(!isForce) await api.login.LOGOUT();
            // 清除本地及vuex缓存
            Token.removeToken();
            Storage.clearLocal();
            Storage.clearSession();
            window.location.reload();
        }
    }
};
export default user;
