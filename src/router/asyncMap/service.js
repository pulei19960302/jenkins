import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";

export default {
    component: Layout,
    name: 'Service',
    path: '/Service',
    meta: {shortTitle: '客服', icon: 'service',menu_permissions: ['customer-service']},
    redirect: 'noredirect',
    rank: 6,
    children: [
        // {
        //     path: 'PanelData',
        //     name: 'PanelData',
        //     meta: {title: '数据面板'},
        //     component: () => import('@/views/service/dataStatistics'),
        // },
        {
            path: 'Service',
            name: 'Service',
            meta: {title: '会话管理', menu_permissions: api.service.reply.saleinfo},
            component: () => import('@/OMS/service/Index'),
        },
        {
            path: 'afterSaleProblem',
            name: 'afterSaleProblem',
            meta: {title: '自动回复'},
            component: () => import('@/OMS/service/afterSaleProblem'),
        },
        {
            path: 'problemForDetail/:id',
            name: 'problemForDetail',
            meta: {title: '售后问题'},
            hidden:true,
            component: () => import('@/OMS/service/problemForDetail'),
        },
        {
            path: 'phrase',
            name: 'phrase',
            meta: {title: '常用语设置'},
            component: () => import('@/OMS/service/phrase'),
        },
        // {
        //     path: 'serviceSet',
        //     name: 'serviceSet',
        //     meta: {title: '客服设置'},
        //     component: () => import('@/views/service/serviceSetting'),
        // },
        {
            path: 'order/afterSaleApplication',
            name: 'afterSaleApplication',
            // fatherTitle: '退货及退款',
            meta: {title: '售后列表', menu_permissions: [api.order.sale.list]},
            component: () => import('@/views/order/afterSaleApplication'),
        },
        {
            path: 'order/refundApplication',
            name: 'refundApplication',
            meta: {title: '退款列表', menu_permissions: [api.order.refund.list]},
            component: () => import('@/views/order/refundApplication'),
        },
        {
            path: 'order/causeOfReturn',
            name: 'causeOfReturn',
            meta: {title: '退货原因设置', menu_permissions: [api.order.reason.list]},
            component: () => import('@/views/order/causeOfReturn'),
        },
    ]
};
