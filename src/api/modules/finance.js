/**
 * Created by hetingfeng on 2018/12/7.
 */

import axios from '../axios';

class Finance{
    constructor() {
        // 资金明细
        this.balance_record = {
            export: '/balance-record/export',
            list: '/balance-record/list',
            user:'/balance-record/user',
            type:'/balance-record/type',
            updatemoney:'/balance-record/update-money',
            financeindex:'/finance/index',
        };

        // 返利明细
        this.order_clearing = {
            list: '/order-clearing/list',
            supplierlist: '/order-clearing/supplier-list',
        };

        // 提现管理
        this.withdraw = {
            export: '/withdraw/export',
            list: '/withdraw/list',
            verify: '/withdraw/verify',
            transfer: '/withdraw/transfer'
        };
        // 充值记录
        this.recharge = {
            export: '/recharge/export',
            list: '/recharge/list',
        };


        this.finance={
            moneystat:'/finance/money-stat',
            billlist:'/finance/bill-list',
            checkbill:'/finance/check-bill',
            totalbill:'/finance/total-bill',
            totalbilldetail:'/finance/total-bill-detail',
            checktotal:'/finance/check-total',
            savetotal:'/finance/save-total',
            goodslist:'/finance/goods-list',
            payall:'/order-clearing/pay-all',
            goodsexport:'/finance/goods-export',
            apptransfer:'/finance/app-transfer',
            withdrawrequest:'/finance/withdraw-request',
            exportRevenueAndExpenses:'/finance/total-bill-export', // 导出总账
            manualRebate: '/order-clearing/order-repair', // 手动返利
            sale: '/v3/finance/finish-order-sales', // 售后财务
            exportSale: '/v3/finance/export-finish-order-sales', // 财务售后导出
            details: '/v3/finance/details', // 详情
            detailsExport: '/v3/finance/export', // 资金统计导出
        }
        // 计费系统
        this.billingSystem = {
            list:'/cloud-shop/service-charge-list',
            detail:'/order/service-charge-detail'
        }

    }

    // 计费系统
    billingSystemList(params){
        return axios(this.billingSystem.list, { method: 'get', params });
    }
    billingSystemDetail(params){
        return axios(this.billingSystem.detail, { method: 'get', params });
    }
    // 资金明细
    orderclearingList(params) {
        return axios(this.order_clearing.list, { method: 'get', params });
    }

    // 资金明细
    orderclearingSupplierList(params) {
        return axios(this.order_clearing.supplierlist, { method: 'get', params });
    }


    // 资金明细
    balanceRecordList(params) {
        return axios(this.balance_record.list, { method: 'get', params });
    }
    balanceRecordUser(params) {
        return axios(this.balance_record.user, { method: 'get', params });
    }
    balanceRecordType(params) {
        return axios(this.balance_record.type, { method: 'get', params });
    }
    financeIndex(params) {
        return axios(this.balance_record.financeindex, { method: 'get', params });
    }
    updatemoney(params) {
        return axios(this.balance_record.updatemoney, { method: 'post', params });
    }
    // 提现管理
    withdrawList(params) {
        return axios(this.withdraw.list, { method: 'get', params });
    }
    withdrawVerify(params) {
        return axios(this.withdraw.verify, { method: 'post', params });
    }
    withdrawTransfer(params) {
        return axios(this.withdraw.transfer, { method: 'post', params });
    }
    // 充值记录
    rechargeList(params) {
        return axios(this.recharge.list, { method: 'get', params });
    }
    moneyStat(params) {
        return axios(this.finance.moneystat, { method: 'get', params });
    }
    billList(params) {
        return axios(this.finance.billlist, { method: 'get', params });
    }
    totalBill(params) {
        return axios(this.finance.totalbill, { method: 'get', params });
    }
    checkBill(params) {
        return axios(this.finance.checkbill, { method: 'post', params });
    }
    checkTotal(params) {
        return axios(this.finance.checktotal, { method: 'post', params });
    }
    saveTotal(params) {
        return axios(this.finance.savetotal, { method: 'post', params });
    }
    goodsList(params) {
        return axios(this.finance.goodslist, { method: 'get', params });
    }
    payAll(params) {
        return axios(this.finance.payall, { method: 'post', params });
    }
    appTransfer(params) {
        return axios(this.finance.apptransfer, { method: 'post', params });
    }
    withdrawRequest(params) {
        return axios(this.finance.withdrawrequest, { method: 'post', params });
    }

    manualRebate (params) {
        return axios(this.finance.manualRebate, { method: 'post', params });
    }

    getSaleFinance (params) {
        return axios(this.finance.sale, { method: 'get', params })
    }

    getDetailsInfor (params) {
        return axios(this.finance.details, { method: 'get', params })
    }
};
export default {
    name: 'finance',
    module: new Finance()
};

