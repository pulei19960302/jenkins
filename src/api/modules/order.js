import axios from "../axios";

/**
 * Created by hetingfeng on 2018/12/9
 */
class Order{
    constructor() {
        // 订单
        this.order = {
            list: '/order/list',
            detail: '/order/detail',
            remark: '/order/modify-remark',
            close: '/order/close',
            modify_receive: '/order/modify-receiver',
            logistics:'/order/logistics',
            orderinfo:'/customer-service/order-info?',
            orderlist:'/customer-service/order-list',
            delall:'/order/del-all',
            orderExtend:'/order-sale/apply-list',//可退货详情

            // 改版后
            odStatus: '/v3/order/statistic', // 获取订单状态统计
            odList: '/v3/order/list', // 请求订单列表
            export: '/v3/order/export',

            getOrder: '/v3/order/detail', // 获取详情

            getReceiver: '/v3/order/receiver-info', // 获取基本信息
            getExpress: '/v3/order/express-info', // 获取物流基本信息
        };
        // 发货
        this.delivery = {
            list: '/order-delivery/list',
            save: '/order-delivery/save',
            send: '/order-delivery/send',
            export: '/order-delivery/export',
            template: '/delivery_template.xlsx',
            importfile: '/order-delivery/import',
        }
        // 售后申请
        this.sale = {
            // export: '/order-sale/export',
            export:'/order-sale/sale-list-export',
            list: '/order-sale/sale-list',
            detail: '/order-sale/sale-detail',
            edit: '/order-sale/sale-edit',
            send: '/order-sale/order-send',
            deny: '/order-sale/order-deny',
            helpBack:'/order-sale/edit-logistics'
        }
        // 退款申请
        this.refund = {
            export: '/order-sale/refund-list-export',
            list: '/order-sale/refund-list',
            detail: '/order-sale/refund-detail',
            money: '/order-sale/refund-money',
            take: '/order-sale/order-take',
        }
        // 售后原因
        this.reason = {
            list: '/order-reason/reason-list',
            edit: '/order-reason/edit',
            detail: '/order-reason/detail',
            del: '/order-reason/del-reasons',
            set_reasonstatus: '/order-reason/set-reasonstatus',
            setstatus: '/order-reason/set-reasonstatus'
        }
    }
    refundList(params) {
        return axios(this.refund.list, { method: 'get', params });
    }
    refundDetail(params) {
        return axios(this.refund.detail, { method: 'get', params });
    }
    refundMoney(params) {
        return axios(this.refund.money, { method: 'post', params });
    }
    refundTake(params) {
        return axios(this.refund.take, { method: 'post', params });
    }

    getOrderExtend(params){
        return axios(this.order.orderExtend, { method: 'get', params });
    }


    orderList(params) {
        return axios(this.order.list, { method: 'get', params });
    }
    orderDetail(params) {
        return axios(this.order.detail, { method: 'get', params });
    }
    orderRemark(params) {
        return axios(this.order.remark, { method: 'post', params });
    }
    orderClose(params) {
        return axios(this.order.close, { method: 'post', params });
    }
    modifyReceive(params) {
        return axios(this.order.modify_receive, { method: 'post', params });
    }
    logistics(params) {
        return axios(this.order.logistics, { method: 'get', params });
    }
    orderinfo(params) {
        return axios(this.order.orderinfo, { method: 'get', params });
    }
    orderlist(params) {
        return axios(this.order.orderlist, { method: 'get', params });
    }
    delall(params) {
        return axios(this.order.delall, { method: 'post', params });
    }

    deliveryList(params) {
        return axios(this.delivery.list, { method: 'get', params });
    }
    deliverySave(params) {
        return axios(this.delivery.save, { method: 'post', params });
    }
    deliverySend(params) {
        return axios(this.delivery.send, { method: 'post', params });
    }
    deliveryImportfile(params) {
        return axios(this.delivery.importfile, { method: 'post', params });
    }

    reasonList(params) {
        return axios(this.reason.list, { method: 'get', params });
    }
    reasonDetail(params) {
        return axios(this.reason.detail, { method: 'get', params });
    }
    reasonEdit(params) {
        return axios(this.reason.edit, { method: 'post', params });
    }
    reasonSetStatus(params) {
        return axios(this.reason.setstatus, { method: 'post', params });
    }
    reasonDel(params) {
        return axios(this.reason.del, { method: 'post', params });
    }
    reasonSetStatus(params) {
        return axios(this.reason.set_reasonstatus, { method: 'post', params });
    }

    saleList(params) {
        return axios(this.sale.list, { method: 'get', params });
    }
    saleDetail(params) {
        return axios(this.sale.detail, { method: 'get', params });
    }
    saleEdit(params) {
        return axios(this.sale.edit, { method: 'post', params });
    }
    saleSend(params) {
        return axios(this.sale.send, { method: 'post', params });
    }
    saleDeny(params) {
        return axios(this.sale.deny, { method: 'post', params });
    }

    saleHelpBack(params){
        return axios(this.sale.helpBack, { method: 'post', params });
    }

    /**
     * 改版后-订单列表页
     */
    odStatus(params) {
        return axios(this.order.odStatus, { method: 'get', params })
    }
    odList(params) {
        return axios(this.order.odList, { method: 'get', params })
    }

    getOrderService (params) {
        return axios(this.order.getOrder, { method: 'get', params })
    }

    getReceiverService (params) {
        return axios(this.order.getReceiver, { method: 'get', params })
    }

    getExpressService (params) {
        return axios(this.order.getExpress, { method: 'get', params })
    }
};
export default {
    name: 'order',
    module: new Order()
};
