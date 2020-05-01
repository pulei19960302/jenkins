import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";
console.log(api.setting)
export default {
    component: Layout,
    name: 'activity',
    path: '/activity',
    meta: {shortTitle: '运营', icon: 'tag', menu_permissions: ['promotion-manage']},
    redirect: 'noredirect',
    rank: 5,
    children: [
        // {
        //     path: 'assembleList',
        //     name: 'assembleList',
        //     meta: {title: '拼团管理'},
        //     component: () => import('@/views/activity/assembleList'),
        // },
        // {
        //     path: 'addAssembleList/:type/:id',
        //     name: 'addAssembleList',
        //     meta: {title: '拼团编辑'},
        //     component: () => import('@/views/activity/addAssembleList'),
        //     hidden:true
        // },
        // {
        //     path: 'Seckill',
        //     name: 'Seckill',
        //     meta: {title: '限时团购', menu_permissions: [api.activity.sec_kill.list]},
        //     component: () => import('@/views/activity/Seckill'),
        // },
        {
            path: 'bannerList',
            name: 'bannerList',
            meta: {title: '轮播设置', menu_permissions: [api.setting.banner.list]},
            component: () => import('@/views/setting/bannerList'),
        },
        {
            path: 'specialManager',
            name: 'specialManager',
            meta: {title: '分类区域', menu_permissions: [api.activity.specialManager.list] },
            component: () => import('@/views/activity/specialManager'),
        },
        {
            path: 'specialSetting',
            name: 'specialSetting',
            // meta: {title: '专题/活动设置'},
            meta: {title: '活动区域', menu_permissions: [api.setting.specialActivity.list]},
            component: () => import('@/views/setting/specialSetting'),
        },
        {
            path: 'assembleManager',
            name: 'assembleManager',
            // fatherTitle: '活动设置',
            meta: {title: '拼团管理', menu_permissions: [api.activity.assembleManager.list] },
            component: () => import('@/views/activity/assembleManager'),
        },
        {
            path: 'AddSeckill',
            name: 'AddSeckill',
            meta: {title: '添加限时团购'},
            component: () => import('@/views/activity/components/AddSeckill'),
            hidden: true
        },
        {
            path: 'EditSeckill/:id',
            name: 'EditSeckill',
            meta: {title: '编辑限时团购'},
            component: () => import('@/views/activity/components/AddSeckill'),
            hidden: true
        },
        {
            path: 'readSeckill/:id/:readtype',
            name: 'readSeckill',
            meta: {title: '查看限时团购'},
            component: () => import('@/views/activity/components/AddSeckill'),
            hidden: true
        },

        // {
        //     path: 'bargainList',
        //     name: 'bargainList',
        //     meta: {title: '砍价管理', menu_permissions: [api.product.addGoods.bargainbuylist]},
        //     component: () => import('@/views/activity/bargainList'),
        // },
        // {
        //     path: 'addBargainv',
        //     name: 'addBargainv2',
        //     meta: {title: '新增砍价'},
        //     component: () => import('@/views/activity/addBargainv2'),
        //     hidden: true,
        // },
        // {
        //     path: 'editBargain/:type/:id',
        //     name: 'editBargain',
        //     meta: {title: '编辑砍价'},
        //     component: () => import('@/views/activity/addBargainv2'),
        //     hidden: true,
        // },
        // {
        //     path: 'readBargain/:type/:id',
        //     name: 'readBargain',
        //     meta: {title: '查看砍价'},
        //     component: () => import('@/views/activity/addBargainv2'),
        //     hidden: true,
        // },
        // {
        //     path: 'freeSheetList',
        //     name: 'freeSheetList',
        //     meta: {title: '免单管理', menu_permissions: [api.activity.free.list]},
        //     component: () => import('@/views/activity/freeSheetList'),
        // },
        // {
        //     path: 'addfreeSheet/:type/:id',
        //     name: 'addfreeSheet',
        //     meta: {title: '免单编辑'},
        //     component: () => import('@/views/activity/addfreeSheet'),
        //     hidden: true,
        // },
        // {
        //     path: 'specialList',
        //     name: 'specialList',
        //     meta: {title: '专题管理'},
        //     component: () => import('@/views/activity/specialList'),
        // },
        // {
        //     path: 'AddSpecial/:type/:id',
        //     name: 'AddSpecial',
        //     meta: {title: '专题编辑'},
        //     component: () => import('@/views/activity/components/AddSpecial'),
        //     hidden:true,
        // },
        // {
        //     path: 'specialActivityList',
        //     name: 'specialActivityList',
        //     meta: {title: '专题活动'},
        //     component: () => import('@/views/activity/specialActivityList'),
        // },
        // {
        //     path: 'AddSpecialActivity/:type/:id',
        //     name: 'AddSpecialActivity',
        //     meta: {title: '专题活动编辑'},
        //     component: () => import('@/views/activity/components/AddSpecialActivity'),
        //     hidden:true,
        // },

        {
            path: 'Coupon',
            name: 'Coupon',
            component: () => import('@/views/activity/Coupon'),
            meta: { title: '优惠券管理', menu_permissions: [api.activity.coupon.list] }
        },
        {
            path: 'couponRecord',
            name: 'couponRecord',
            hidden: true,
            component: () => import('@/views/activity/couponRecord'),
            meta: { title: '优惠券记录',menu_permissions: [api.activity.coupon.recordList] }
        },
        {
            path: 'AddCoupon',
            name: 'AddCoupon',
            hidden: true,
            component: () => import('@/views/activity/components/AddCoupon'),
            meta: { title: '新增优惠券' }
        },
        {
            path: 'EditCoupon/:type/:id',
            name: 'EditCoupon',
            hidden: true,
            component: () => import('@/views/activity/components/AddCoupon'),
            meta: { title: '编辑优惠券' }
        },

        // {
        //     path: 'ActivitySet',
        //     name: 'ActivitySet',
        //     component: () => import('@/views/activity/ActivitySet'),
        //     meta: { title: '活动设置', menu_permissions: [api.setting.config.list] }
        // },
        // {
        //     path: 'ActivitySet2/:type',
        //     name: 'ActivitySet2',
        //     component: () => import('@/views/activity/ActivitySet'),
        //     meta: { title: '砍价设置', menu_permissions: [api.setting.config.list] },
        //     hidden:true,
        // },
        // {
        //     path: 'businessArticle',
        //     name: 'businessArticle',
        //     component: () => import('@/views/activity/businessArticle'),
        //     meta: { title: '商学院列表',menu_permissions: [api.activity.businessArticle.list] }
        // },
        // {
        //     path: 'luckDrawSet',
        //     name: 'luckDrawSet',
        //     component: () => import('@/views/activity/luckDrawSet'),
        //     meta: { title: '抽奖设置',menu_permissions: [api.activity.luckDraw.info] }
        //     // meta: { title: '抽奖设置' }
        // },
        // {
        //     path: 'luckDrawList',
        //     name: 'luckDrawList',
        //     component: () => import('@/views/activity/luckDrawList'),
        //     meta: { title: '抽奖记录' }
        // },
        // {
        //     path: 'warmUp',
        //     name: 'warmUp',
        //     component: () => import('@/views/activity/warmUp'),
        //     meta: { title: '预热统计' }
        // },
        {
            path: 'sendCoupon/:coupon_id/:coupon_name',
            name: 'sendCoupon',
            hidden:true,
            component: () => import('@/views/activity/sendCoupon'),
            meta: { title: '发放优惠券' }
        },
        {
            path: 'Insite',
            name: 'Insite',
            component: () => import('@/views/operate/informationQuery/Insite'),
            meta: { title: '站内信', menu_permissions: [api.operate.message.list] }
        },
        {
            path: 'announcementSetting',
            name: 'announcementSetting',
            meta: {title: '公告设置', menu_permissions: [api.setting.config.list]},
            component: () => import('@/views/setting/announcementSetting'),
        },
    ],
}
    