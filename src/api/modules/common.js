/**
 * Created by hetingfeng on 2018/11/20.
 */

import axios from '../axios';

class Common{
    constructor() {
        // 区域级联
        this.area = '/area/list';
        this.allCity = '/area/all-city';
        this.uptoken = '/public/uptoken';
        this.goods_select = '/goods/select';
        this.goods_list = '/goods/list';
        // ws
        this.send_message = '/im/customer_service/send_message';
        this.send_verificationCode = '/finance/send-valdiate-sms'
    }
    sendVerificationCode(params){
        return axios(this.send_verificationCode, { method: 'post', params });
    }
    getAreaList(params) {
        return axios(this.area, { method: 'get', params });
    }
    getAllCity(params) {
        return axios(this.allCity, { method: 'get', params });
    }
    getUptoken(params) {
        return axios(this.uptoken, { method: 'get', params });
    }
    getGoodsSelect(params) {
        return axios(this.goods_select, { method: 'get', params });
    }
    getGoodsList(params) {
        return axios(this.goods_list, { method: 'get', params });
    }
    sendMessage(params) {
        return axios(this.send_message, { method: 'post', params },{ showMsg: false });
    }
};
export default {
    name: 'common',
    module: new Common()
};

