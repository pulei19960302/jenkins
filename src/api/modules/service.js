/**
 * Created by cc on 2019/3/10.
 */

import axios from '../axios';

class Common{
    constructor() {
        this.phrase = {
            list:  '/phrase/list',
            edit:'/phrase/edit',
            setstatus:' /phrase/set-status',
            del:'/phrase/del',
            session_history:'/im/customer_service/session_history',
            chat_history:'/im/customer_service/message_history'
        }
        this.reply={
            typelist:'/reply/type-list',
            edit_type:'/reply/edit-type',
            deltype:'/reply/del-type',
            reasonlist:'/reply/reason-list',
            edit:'/reply/edit',
            delreasons:' /reply/del-reasons',
            setstatus:'/reply/set-status',
            phraselist:'/customer-service/phrase-list',
            saleinfo:'/order/sale-info',
            apply:' /customer-service/apply',
            kefus:'/admincp-member/service-list',
            changeKefu:'/im/customer_service/transfer',
            applyMoney:'/customer-service/compensate'
        }

    }

    getKefus(params){
        return axios(this.reply.kefus, { method: 'get', params });
    }

    changeKefu(params){
        return axios(this.reply.changeKefu, { method: 'post', params });
    }

    phraseList(params) {
        return axios(this.phrase.list, { method: 'get', params });
    }
    phraseEdit(params) {
        return axios(this.phrase.edit, { method: 'post', params });
    }
    phraseEetstatus(params) {
        return axios(this.phrase.setstatus, { method: 'post', params });
    }
    phraseDel(params) {
        return axios(this.phrase.del, { method: 'post', params });
    }
    phraseHistory(params){
        return axios(this.phrase.chat_history, { method: 'get', params });
    }
    sessionHistory(params) {
        return axios(this.phrase.session_history, { method: 'get', params });
    }
    typelist(params) {
        return axios(this.reply.typelist, { method: 'get', params });
    }
    typeEdittype(params) {
        return axios(this.reply.edit_type, { method: 'post', params });
    }
    typeDeltype(params) {
        return axios(this.reply.deltype, { method: 'post', params });
    }
    reasonlist(params) {
        return axios(this.reply.reasonlist, { method: 'get', params });
    }
    reasonEdit(params) {
        return axios(this.reply.edit, { method: 'post', params });
    }
    delreasons(params) {
        return axios(this.reply.delreasons, { method: 'post', params });
    }
    setstatus(params) {
        return axios(this.reply.setstatus, { method: 'post', params });
    }
    phraselist(params) {
        return axios(this.reply.phraselist, { method: 'get', params });
    }
    saleinfo(params) {
        return axios(this.reply.saleinfo, { method: 'get', params });
    }
    apply(params) {
        return axios(this.reply.apply, { method: 'post', params });
    }
    applyMoney(params){
        return axios(this.reply.applyMoney, { method: 'post', params });
    }
};
export default {
    name: 'service',
    module: new Common()
};

