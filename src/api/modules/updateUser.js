import axios from "../axios";

class UpdateUser {
    constructor() {
        this.updataUser = {
            detail: '/v3/member/info',
            abstract: '/v3/member/summaries',
            teamRelation: '/v3/member/teams',
            fundsDetail: '/v3/member/capitals',
            orders: '/v3/member/orders',
            integral: '/v3/member/integrals',
            coupon: '/v3/member/coupons',
        //    logs: '/v3'
            list: '/v3/member/list',
            mergeData: '/v3/member/merge-data',
            integerUpdate: '/v3/member/integral-update',
            getUserId: '/v3/member/search-uid',
            updatePwd: '/v3/member/update-password'
        }
    }

    getUserDetail(params) {
        return axios(this.updataUser.detail, {
            method: 'get',
            params
        })
    };

    getUserAbstract(params) {
        return axios(this.updataUser.abstract, {
            method: 'get',
            params
        })
    };

    getTeamRelation(params) {
        return axios(this.updataUser.teamRelation, {
            method: 'get',
            params
        })
    };

    getFundDetail(params) {
        return axios(this.updataUser.fundsDetail, {
            method: 'get',
            params
        })
    };

    getOrders(params) {
        return axios(this.updataUser.orders, {
            method: 'get',
            params
        })
    };

    getIntegral(params) {
        return axios(this.updataUser.integral, {
            method: 'get',
            params
        })
    };

    getCoupons(params) {
        return axios(this.updataUser.coupon, {
            method: 'get',
            params
        })
    };

    getList(params) {
        return axios(this.updataUser.list, {
            method: 'get',
            params
        })
    };

    mergeDataService (params) {
        return axios(this.updataUser.mergeData, {
            method: 'post',
            params
        })
    }

    integerUpdateService (params) {
        return axios(this.updataUser.integerUpdate, {
            method: 'post',
            params
        })
    }

    searchUserService (params) {
        return axios(this.updataUser.getUserId, {
            method: 'get',
            params
        })
    }

    updatePwdService (params) {
        return axios(this.updataUser.updatePwd, {
            method: 'post',
            params
        })
    }
}

export default {
    name: 'updateUser',
    module: new UpdateUser()
}
