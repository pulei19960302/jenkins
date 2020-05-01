/**
 * Created by cc on 2018/12/4.
 */

import axios from '../axios';

class Activity{
    constructor() {
        // 秒杀
        this.sec_kill={
            export: '/sec-kill/export',
            list: '/sec-kill/list',
            set_status:'/sec-kill/set-status',
            add:'/sec-kill/add',
            del:'/sec-kill/del-all',
            detail:'/sec-kill/detail'
        }
        //拼团
        this.groupbuy={
            export: '/group-buy/export',
            list: '/group-buy/list',
            edit:'/group-buy/edit',
            set_status:'/group-buy/set-status',
            add:'/group-buy/add',
            del:'/group-buy/del',
            detail:'/group-buy/detail',
            select:'/goods/select',
        }
        //砍价
        this.bargain={
            export: '/bargain-buy/export',
            list: '/bargain-buy/list',
            edit:'/bargain-buy/edit',
            set_status:'/bargain/set-status',
            add:'/bargain-buy/add',
            del:'/bargain-buy/del',
            detail:'/bargain/detail',
        }
        //免单
        this.free={
            export: '/free-buy/export',
            list: '/free-buy/list',
            edit:'/free-buy/edit',
            set_status:'/free-buy/set-status',
            add:'/free-buy/add',
            del:'/free-buy/del',
            detail:'/free-buy/detail',
        }
        // 优惠券
        this.coupon = {
            export: '/coupon/export',
            list: '/coupon/list',
            edit:'/coupon/edit',
            set_status:'/coupon/set-status',
            add:'/coupon/add',
            del:'/coupon/del',
            detail:'/coupon/detail',
            membertype:'/coupon/member-type',
            send:'/coupon/send',
            recordList:'/coupon-record/list',
            recordDel:'/coupon-record/del-all',
            recordStatus:'/coupon-record/set-is-used',
        }
        // 专题
        this.activity_topic = {
            export: '/activity-topic/export',
            list: '/activity-topic/list',
            edit:'/activity-topic/edit',
            set_status:'/activity-topic/set-status',
            add:'/activity-topic/add',
            del:'/activity-topic/del',
            detail:'/activity-topic/detail',
        }
        // 专题活动
        this.activities = {
            export: '/activity/export',
            list: '/activity/list',
            edit:'/activity/edit',
            set_status:'/activity/set-status',
            add:'/activity/add',
            del:'/activity/del',
            detail:'/activity/detail',
        }
        // 商学院
        this.businessArticle = {
            list:'/article/list',
            add:'/article/save',
            status:'/article/set-status',
            del:'/article/del'
        }
        // 抽奖
        this.luckDraw = {
            info:'/luck-draw/info',
            save:'/luck-draw/save',
            list:'/luck-draw-user-record/user-prize-list',
            savePrize:'',
            delPrize:'/luck-draw/delete-prize',
            editPrize:''
        }
        // 预热促销
        this.warmUp = {
            list:'/sec-kill/get-presalestatlist'
        }
        // 专题管理
        this.specialManager = {
            getWay: '/special/get-way', // 获取实现方式
            list: '/special/list',
            edit:'/special/add',
            delete: '/special/del', // 删除
        }
        // 拼团管理
        this.assembleManager = {
            add: '/group-buy-new/add',
            list: '/group-buy-new/list',
            edit:'/group-buy-new/edit',
            delete: '/group-buy-new/del', // 删除
            status: '/group-buy-new/set-status',
            detail: '/group-buy-new/detail',
            joinPeople: '/group-buy-new/join-people', // 参与人员列表
        }
    }
    couponRecordList(params){
        return axios(this.coupon.recordList, { method: 'get', params }, );
    }
    couponRecordDel(params){
        return axios(this.coupon.recordDel, { method: 'post', params }, );
    }
    couponRecordStatus(params){
        return axios(this.coupon.recordStatus, { method: 'post', params }, );
    }
    // 预热
    warmUpList(params){
        return axios(this.warmUp.list, { method: 'get', params }, );
    }
    // 抽奖
    getLuckDraw(params){
        return axios(this.luckDraw.info, { method: 'get', params }, );
    }
    saveLuckDraw(params){
        return axios(this.luckDraw.save, { method: 'post', params }, );
    }
    getLuckDrawList(params){
        return axios(this.luckDraw.list, { method: 'get', params }, );
    }
    savePrize(params){
        return axios(this.luckDraw.savePrize, { method: 'post', params }, );
    }
    delPrize(params){
        return axios(this.luckDraw.delPrize, { method: 'post', params }, );
    }
    // 商学院
    businessArticleList(params){
        return axios(this.businessArticle.list, { method: 'get', params }, );
    }
    businessArticleAdd(params){
        return axios(this.businessArticle.add, { method: 'post', params }, );
    }
    businessArticleStatus(params){
        return axios(this.businessArticle.status, { method: 'post', params }, );
    }
    businessArticleDel(params){
        return axios(this.businessArticle.del, { method: 'post', params }, );
    }
    // 专题活动
    activitiesList(params) {
        return axios(this.activities.list, { method: 'get', params }, );
    }
    activitiesDetail(params) {
        return axios(this.activities.detail, { method: 'get', params }, );
    }
    activitiesSetStatus(params) {
        return axios(this.activities.set_status, { method: 'post', params }, );
    }
    activitiesAdd(params) {
        return axios(this.activities.add, { method: 'post', params }, );
    }
    activitiesEdit(params) {
        return axios(this.activities.edit, { method: 'post', params }, );
    }
    activitiesDel(params) {
        return axios(this.activities.del, { method: 'post', params }, );
    }
    // 专题
    activityTopicList(params) {
        return axios(this.activity_topic.list, { method: 'get', params }, );
    }
    activityTopicDetail(params) {
        return axios(this.activity_topic.detail, { method: 'get', params }, );
    }
    activityTopicSetStatus(params) {
        return axios(this.activity_topic.set_status, { method: 'post', params }, );
    }
    activityTopicAdd(params) {
        return axios(this.activity_topic.add, { method: 'post', params }, );
    }
    activityTopicEdit(params) {
        return axios(this.activity_topic.edit, { method: 'post', params }, );
    }
    activityTopicDel(params) {
        return axios(this.activity_topic.del, { method: 'post', params }, );
    }
    // 秒杀
    seckillList(params) {
        return axios(this.sec_kill.list, { method: 'get', params }, );
    }
    seckillDetail(params) {
        return axios(this.sec_kill.detail, { method: 'get', params }, );
    }
    seckillSetStatus(params) {
        return axios(this.sec_kill.set_status, { method: 'post', params }, );
    }
    seckillAdd(params) {
        return axios(this.sec_kill.add, { method: 'post', params }, );
    }
    seckillDel(params) {
        return axios(this.sec_kill.del, { method: 'post', params }, );
    }
    //拼团
    groupbuyList(params) {
        return axios(this.groupbuy.list, { method: 'get', params }, );
    }
    groupbuyDetail(params) {
        return axios(this.groupbuy.detail, { method: 'get', params }, );
    }
    groupbuyEdit(params) {
        return axios(this.groupbuy.edit, { method: 'post', params }, );
    }
    groupbuySetStatus(params) {
        return axios(this.groupbuy.set_status, { method: 'post', params }, );
    }
    groupbuyAdd(params) {
        return axios(this.groupbuy.add, { method: 'post', params }, );
    }
    groupbuyDel(params) {
        return axios(this.groupbuy.del, { method: 'post', params }, );
    }
    select(params) {
        return axios(this.groupbuy.select, { method: 'get', params }, );
    }
    //砍价
    bargainList(params) {
        return axios(this.bargain.list, { method: 'get', params }, );
    }
    bargainDetail(params) {
        return axios(this.bargain.detail, { method: 'get', params }, );
    }
    bargainEdit(params) {
        return axios(this.bargain.edit, { method: 'post', params }, );
    }
    bargainSetStatus(params) {
        return axios(this.bargain.set_status, { method: 'post', params }, );
    }
    bargainAdd(params) {
        return axios(this.bargain.add, { method: 'post', params }, );
    }
    bargainDel(params) {
        return axios(this.bargain.del, { method: 'post', params }, );
    }
    // 免单
    freeList(params) {
        return axios(this.free.list, { method: 'get', params }, );
    }
    freeDetail(params) {
        return axios(this.free.detail, { method: 'get', params }, );
    }
    freeEdit(params) {
        return axios(this.free.edit, { method: 'post', params }, );
    }
    freeSetStatus(params) {
        return axios(this.free.set_status, { method: 'post', params }, );
    }
    freeAdd(params) {
        return axios(this.free.add, { method: 'post', params }, );
    }
    freeDel(params) {
        return axios(this.free.del, { method: 'post', params }, );
    }

    // 优惠券
    couponList(params) {
        return axios(this.coupon.list, { method: 'get', params }, );
    }
    couponSend(params) {
        return axios(this.coupon.send, { method: 'post', params }, );
    }
    couponDetail(params) {
        return axios(this.coupon.detail, { method: 'get', params }, );
    }
    couponEdit(params) {
        return axios(this.coupon.edit, { method: 'post', params }, );
    }
    couponSetStatus(params) {
        return axios(this.coupon.set_status, { method: 'post', params }, );
    }
    couponAdd(params) {
        return axios(this.coupon.add, { method: 'post', params }, );
    }
    couponDel(params) {
        return axios(this.coupon.del, { method: 'post', params }, );
    }
    memberType(params) {
        return axios(this.coupon.membertype, { method: 'get', params }, );
    }
    
    // 专题设置
    getSpecialWay(params) {
        return axios(this.specialManager.getWay, { method: 'get', params }, );
    }
    getSpecialList(params) {
        return axios(this.specialManager.list, { method: 'get', params }, );
    }
    editSpecial(params) {
        return axios(this.specialManager.edit, { method: 'post', params }, );
    }
    deleteSpecial(params) {
        return axios(this.specialManager.delete, { method: 'post', params }, );
    }
    getWay(params) {
        return axios(this.specialManager.getWay, { method: 'get', params }, );
    }
    // 拼团设置
    getAssembleList(params) {
        return axios(this.assembleManager.list, { method: 'get', params }, );
    }
    getAssembleDetail(params) {
        return axios(this.assembleManager.detail, { method: 'get', params }, );
    }
    addAssemble(params) {
        return axios(this.assembleManager.add, { method: 'post', params }, );
    }
    editAssemble(params) {
        return axios(this.assembleManager.edit, { method: 'post', params }, );
    }
    deleteAssemble(params) {
        return axios(this.assembleManager.delete, { method: 'post', params }, );
    }
    changeAssembleStatus(params) {
        return axios(this.assembleManager.status, { method: 'post', params }, );
    }
    getJoinPeople(params) {
        return axios(this.assembleManager.joinPeople, { method: 'get', params }, );
    }
};
export default {
    name: 'activity',
    module: new Activity()
};

