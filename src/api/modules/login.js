/**
 * Created by hetingfeng on 2018/11/1.
 */

import axios from '../axios';

class Login{
    constructor() {
        this.login = '/account/login';
        this.info = '/account/info';
        this.modify_info = '/account/modify-info';
        this.logout = '/account/logout';
        this.systemIndex='/account/system-index';
        this.systemOrder='/account/system-order';
        this.systemMoney='/account/system-money';
        this.systemMember='/account/system-member'
    }

    LOGIN(params) {
        return axios(this.login, { method: 'post', params });
    }
    GET_USERINFO(params) {
        return axios(this.info, { method: 'get', params }, { showMsg: false });
    }
    modifyInfo(params) {
        return axios(this.modify_info, { method: 'post', params });
    }
    LOGOUT(params) {
        return axios(this.logout, { method: 'post', params });
    }
    SystemIndex(params) {
        return axios(this.systemIndex, { method: 'get', params });
    }
    SystemOrder(params) {
        return axios(this.systemOrder, { method: 'get', params });
    }
    SystemMoney(params) {
        return axios(this.systemMoney, { method: 'get', params });
    }
    SystemMember(params){
        return axios(this.systemMember, { method: 'get', params });
    }

    // /**
    //  * 若api数目过多，优化写法
    //  * @param url
    //  * @param method
    //  * @param params
    //  */
    // secKill(url, method, params) {
    //     Object.keys(this.sec_kill).map(val => {
    //         if(url === val) return axios(this.sec_kill[val], { method, params });
    //     })
    // }
};
export default {
    name: 'login',
    module: new Login()
};

