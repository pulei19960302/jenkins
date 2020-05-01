/**
 * Created by hetingfeng on 2018/12/7.
 */

import axios from '../axios';

class Content{
    constructor() {
        // 专题管理
        this.special_topic_list = {
            list: '/topic/list',
            detail: '/topic/detail',
            del: '/topic/del-all',
            add: '/topic/add',
        };
        // 素材管理
        this.material = {
            list: '/material/list',
            detail: '/material/detail',
            del: '/material/del-all',
            add: '/material/add',
        };
    }

    // 专题管理
    specialTopicList(params) {
        return axios(this.special_topic_list.list, { method: 'get', params });
    }
    specialTopicDetail(params) {
        return axios(this.special_topic_list.detail, { method: 'get', params });
    }
    specialTopicEdit(params) {
        return axios(this.special_topic_list.add, { method: 'post', params });
    }
    specialTopicDel(params) {
        return axios(this.special_topic_list.del, { method: 'post', params });
    }
    specialTopicAdd(params) {
        return axios(this.special_topic_list.add, { method: 'post', params });
    }

    materialList(params) {
        return axios(this.material.list, { method: 'get', params });
    }
};
export default {
    name: 'content',
    module: new Content()
};

