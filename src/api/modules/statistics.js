/**
 * Created by cc on 2019/1/25.
 */
//统计
import axios from '../axios';

class Statistics{
    constructor() {
        this.sta={
            userrank:'/stat/user-rank',
            goodssale:'/stat/goods-sale',
            groupRank:'/stat/group-rank',
            rewardRank:'/stat/reward-rank',
            goodsProfits:'/stat/goods-profits',
        }
        this.sta2={
            order:'/stat2/order',
            goods:'/stat2/goods',
            goodscate:'/stat2/goods-cate',
            goodssalenum:'/stat2/goods-sale-num',
            goodssupplier:'/stat2/goods-supplier',
            goodslist:'/stat2/goods-list',
            exportProduct:'/stat2/goods-list-export',
            team:'/stat2/team',
            teamrank:'/stat2/team-rank',
            group:'/stat2/group',
            grouprank:'/stat2/group-rank',
            member:'/stat2/member',
            memberrank:'/stat2/member-rank',
            rebate:'/stat2/rebate',
            rebaterank:'/stat2/rebate-rank',
            orderrank:'/stat2/order-rank',
            goodsteamrank:'/stat2/goods-team-rank',
            export:'/stat2/export',
            refererrank:'/stat2/referer-rank',
            refererlist:'/stat2/referer-list',
            refererexport:'/stat2/referer-export',
            orderList:'/stat2/order-list',
        }
    }

    userRank(params) {
        return axios(this.sta.userrank, { method: 'get', params });
    }
    goodsSale(params) {
        return axios(this.sta.goodssale, { method: 'get', params });
    }
    groupRank(params) {
        return axios(this.sta.groupRank, { method: 'get', params });
    }
    rewardRank(params) {
        return axios(this.sta.rewardRank, { method: 'get', params });
    }
    goodsProfits(params) {
        return axios(this.sta.goodsProfits, { method: 'get', params });
    }

    goodsProfits(params) {
        return axios(this.sta2.order, { method: 'get', params });
    }
    goodscate(params) {
        return axios(this.sta2.goodscate, { method: 'get', params });
    }
    goods(params) {
        return axios(this.sta2.goods, { method: 'get', params });
    }
    goodssalenum(params) {
        return axios(this.sta2.goodssalenum, { method: 'get', params });
    }
    goodssupplier(params) {
        return axios(this.sta2.goodssupplier, { method: 'get', params });
    }
    goodslist(params) {
        return axios(this.sta2.goodslist, { method: 'get', params });
    }
    team(params) {
        return axios(this.sta2.team, { method: 'get', params });
    }
    teamrank(params) {
        return axios(this.sta2.teamrank, { method: 'get', params });
    }
    group(params) {
        return axios(this.sta2.group, { method: 'get', params });
    }
    grouprank(params) {
        return axios(this.sta2.grouprank, { method: 'get', params });
    }
    member(params) {
        return axios(this.sta2.member, { method: 'get', params });
    }
    memberrank(params) {
        return axios(this.sta2.memberrank, { method: 'get', params });
    }
    rebate(params) {
        return axios(this.sta2.rebate, { method: 'get', params });
    }
    rebaterank(params) {
        return axios(this.sta2.rebaterank, { method: 'get', params });
    }
    orderRank(params) {
        return axios(this.sta2.orderrank, { method: 'get', params });
    }
    goodsTeamrank(params) {
        return axios(this.sta2.goodsteamrank, { method: 'get', params });
    }
    refererRank(params) {
        return axios(this.sta2.refererrank, { method: 'get', params },{timeout:12000000});
    }
    refererList(params) {
        return axios(this.sta2.refererlist, { method: 'get', params });
    }
    orderList(params) {
        return axios(this.sta2.orderList, { method: 'get', params });
    }



};
export default {
    name: 'statistics',
    module: new Statistics()
};

