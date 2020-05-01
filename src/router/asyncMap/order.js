import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";

export default {
    component: Layout,
    name: 'Order',
    path: '/Order',
    meta: {shortTitle: '订单', icon: 'tickets', menu_permissions: ['order-manage']},
    redirect: 'noredirect',
    rank: 4,
    children: [
        {
            path: 'orderList',
            name: 'orderList',
            meta: {title: '订单列表', menu_permissions: [api.order.order.list] },
            component: () => import('@/views/order/orderList/index.vue'),
        },
        {
            path: 'DeliveryList',
            name: 'DeliveryList',
            meta: {title: '发货列表', menu_permissions: [api.order.delivery.list] },
            component: () => import('@/views/order/DeliveryList'),
        },
        {
            path: 'orderSet',
            name: 'orderSet',
            meta: {title: '订单设置', menu_permissions: [api.setting.config.list] },
            component: () => import('@/views/order/orderSet'),
        },

        {
            path: 'order/afterSaleApplicationDetail',
            name: 'afterSaleApplicationDetail',
            meta: {title: '售后申请处理详情'},
            hidden:true,
            component: () => import('@/views/order/afterSaleApplicationDetail'),
        },

        {
            path: 'order/refundDetail',
            name: 'refundDetail',
            meta: {title: '服务单信息'},
            hidden:true,
            component: () => import('@/views/order/refundDetail'),
        },
        {
            path: 'order/orderDetail/:id',
            name: 'orderDetail',
            hidden:true,
            meta: {title: '订单详情'},
            component: () => import('@/views/order/newOrderDetail'),
        },
    ]
};
