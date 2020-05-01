import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";
//用户
export default {
    component: Layout,
    name: 'Setting',
    path: '/Setting',
    meta: {shortTitle: '设置', icon: 'setting', menu_permissions: ['set-manage']},
    redirect: 'noredirect',
    rank: 10,
    children: [
        {
            path: 'platformSetting',
            name: 'platformSetting',
            meta: {title: '平台设置', menu_permissions: [api.setting.config.list]},
            component: () => import('@/views/setting/platformSetting'),
        },
        // {
        //     path: 'baseSetting',
        //     name: 'baseSetting',
        //     meta: {title: '基本设置', menu_permissions: [api.setting.config.list]},
        //     component: () => import('@/views/setting/baseSetting'),
        // },
        // {
        //     path: 'messageReminding',
        //     name: 'messageReminding',
        //     meta: {title: '消息提醒', menu_permissions: [api.setting.config.list]},
        //     component: () => import('@/views/setting/messageReminding'),
        // },
        {
            path: 'editMessage',
            name: 'editMessage',
            meta: {title: '消息模板编辑',},
            component: () => import('@/views/setting/editMessage'),
            hidden:true,
        },
        // {
        //     path: 'verificationCodeSettings',
        //     name: 'verificationCodeSettings',
        //     meta: {title: '验证码设置', menu_permissions: [api.setting.config.list]},
        //     component: () => import('@/views/setting/verificationCodeSettings'),
        // },
        {
            path: 'freightFormwork',
            name: 'freightFormwork',
            // fatherTitle: '支付配送',
            meta: {title: '运费模板', menu_permissions: [api.setting.freight_template.list]},
            component: () => import('@/views/setting/freightFormwork'),
        },
        {
            path: 'addFreightFormwork',
            name: 'addFreightFormwork',
            meta: {title: '新增运费模板',},
            hidden:true,
            component: () => import('@/views/setting/addFreightFormwork'),
        },
        {
            path: 'editFreightFormwork/:type/:id',
            name: 'editFreightFormwork',
            meta: {title: '编辑运费模板',},
            hidden:true,
            component: () => import('@/views/setting/addFreightFormwork'),
        },
        // {
        //     path: 'freightInsurance',
        //     name: 'freightInsurance',
        //     meta: {title: '运费险', menu_permissions: [api.setting.freight_insurance.list]},
        //     component: () => import('@/views/setting/freightInsurance'),
        // },
        {
            path: 'logisticsCompany',
            name: 'logisticsCompany',
            meta: {title: '物流公司', menu_permissions: [api.setting.express.list]},
            component: () => import('@/views/setting/logisticsCompany'),
        },
        // {
        //     path: 'paymentSetting',
        //     name: 'paymentSetting',
        //     meta: {title: '支付设置', menu_permissions: [api.setting.config.list]},
        //     component: () => import('@/views/setting/paymentSetting'),
        // },
        {
            path: 'editPayWay',
            name: 'editPayWay',
            meta: {title: '编辑支付设置', menu_permissions: [api.setting.config.list]},
            hidden:true,
            component: () => import('@/views/setting/editPayWay'),
        },
        {
            path: 'regionalSetting',
            name: 'regionalSetting',
            meta: {title: '区域设置', menu_permissions: [api.setting.config.list]},
            component: () => import('@/views/setting/regionalSetting'),
        },
        {
            path: 'merchantList',
            name: 'merchantList',
            meta: {title: '商户号管理', menu_permissions: [api.setting.merchant_setting.list]},
            component: () => import('@/views/setting/merchantList'),
        },
        {
            path: 'merchantSetting/:type/:id',
            name: 'merchantSetting',
            hidden:true,
            meta: {title: '商户号管理'},
            component: () => import('@/views/setting/merchantSetting'),
        },
    ]
};
