/**
 * Created by hetingfeng on 2018/11/20.
 */

import axios from '../axios';

class Operate{
    constructor() {
        // 站内信
        this.message = {
            list: '/message/list',
            add: '/message/add',
            detail: '/message/detail',
            edit: '/message/edit',
            del: '/message/del'
        };
    }

    //轮播管理
    messageList(params) {
        return axios(this.message.list, { method: 'get', params });
    }
    messageAdd(params) {
        return axios(this.message.add, { method: 'post', params });
    }
    messageDetail(params) {
        return axios(this.message.detail, { method: 'get', params });
    }
    messageEdit(params) {
        return axios(this.message.edit, { method: 'post', params });
    }
    messageDel(params) {
        return axios(this.message.del, { method: 'post', params });
    }


};
export default {
    name: 'operate',
    module: new Operate()
};

