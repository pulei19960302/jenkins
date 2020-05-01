import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";

export default {
    component: Layout,
    name: 'statistics',
    path: '/statistics',
    meta: { shortTitle: '数据', icon: 'chart', menu_permissions: ['stat-manage'] },
    redirect: 'noredirect',
    rank: 8,
    children: [
        // {
        //     path: 'comprehensiveStatistics',
        //     name: 'comprehensiveStatistics',
        //     meta: {title: '综合统计'},
        //     component: () => import('@/views/finance/comprehensiveStatistics'),
        // },
        // {
        //     path: 'userStatistics',
        //     name: 'userStatistics',
        //     meta: {title: '用户统计',menu_permissions: [api.statistics.sta2.member]},
        //     component: () => import('@/views/statistics/userStatistics'),
        // },
        // {
        //     path: 'orderStatistics',
        //     name: 'orderStatistics',
        //     meta: {title: '订单统计',menu_permissions: [api.statistics.sta2.order]},
        //     component: () => import('@/views/statistics/orderStatistics'),
        // },
        // {
        //     path: 'salesStatistics',
        //     name: 'salesStatistics',
        //     meta: {title: '商品销量',menu_permissions: [api.statistics.sta2.goodssalenum]},
        //     component: () => import('@/views/statistics/salesStatistics'),
        // },
        // {
        //     path: 'productRank',
        //     name: 'productRank',
        //     meta: {title: '商品排行',menu_permissions: [api.statistics.sta2.goodslist]},
        //     component: () => import('@/views/statistics/productRank'),
        // },
        // {
        //     path: 'rebateRank',
        //     name: 'rebateRank',
        //     meta: {title: '返利统计',menu_permissions: [api.statistics.sta2.rebate]},
        //     component: () => import('@/views/statistics/rebateRank'),
        // },
        // {
        //     path: 'commodityProfit',
        //     name: 'commodityProfit',
        //     meta: {title: '商品利润'},
        //     component: () => import('@/views/statistics/commodityProfit'),
        // },
        //
        // {
        //     path: 'recruit',
        //     name: 'recruit',
        //     meta: {title: '招募总榜'},
        //     component: () => import('@/views/statistics/recruit'),
        // },
        // {
        //     path: 'active',
        //     name: 'active',
        //     meta: {title: '活跃统计'},
        //     component: () => import('@/views/statistics/active'),
        // },
        // {
        //     path: 'teamRank',
        //     name: 'teamRank',
        //     meta: {title: '团队统计',menu_permissions: [api.statistics.sta2.team]},
        //     component: () => import('@/views/statistics/teamRank'),
        // },
        // {
        //     path: 'groupRanking',
        //     name: 'groupRanking',
        //     meta: {title: '社群统计',menu_permissions: [api.statistics.sta2.group]},
        //     component: () => import('@/views/statistics/groupRanking'),
        // },
        // {
        //     path: 'issueStatistics',
        //     name: 'issueStatistics',
        //     meta: {title: '出单排行',menu_permissions: [api.statistics.sta2.orderrank]},
        //     component: () => import('@/views/statistics/issueStatistics'),
        // },
        // {
        //     path: 'outstanding',
        //     name: 'outstanding',
        //     meta: {title: '杰出推荐',menu_permissions: [api.statistics.sta2.refererlist]},
        //     component: () => import('@/views/statistics/outstanding'),
        // },

        // {
        //     path: 'membershipRankings',
        //     name: 'membershipRankings',
        //     meta: {title: '粉丝排名'},
        //     component: () => import('@/views/finance/membershipRankings'),
        // },
        // {
        //     path: 'salesStatistics',
        //     name: 'salesStatistics',
        //     meta: {title: '销售统计'},
        //     component: () => import('@/views/finance/salesStatistics'),
        // },
        // {
        //     path: 'Trade',
        //     name: 'Trade',
        //     component: () => import('@/views/statistics/Trade'),
        //     meta: { title: '交易统计' }
        // },
        // {
        //     path: 'Traffic',
        //     name: 'Traffic',
        //     component: () => import('@/views/statistics/Traffic'),
        //     meta: { title: '流量统计' }
        // },
        // {
        //     path: 'Commodity',
        //     name: 'Commodity',
        //     component: () => import('@/views/statistics/Commodity'),
        //     meta: { title: '商品统计' }
        // },
        // {
        //     path: 'Member',
        //     name: 'Member',
        //     component: () => import('@/views/statistics/Member'),
        //     meta: { title: '粉丝统计' }
        // },
        // {
        //     path: 'SearchStatistics',
        //     name: 'SearchStatistics',
        //     component: () => import('@/views/statistics/SearchStatistics'),
        //     meta: { title: '搜索统计' }
        // }

        // ================ 以下是新的统计 ============================
        // {
        //     path: 'totalData',
        //     name: 'totalData',
        //     meta: { title: '总体运营' },
        //     component: () => import('@/views/statistics/totalData'),
        // },
        {
            path: 'userData',
            name: 'userData',
            meta: { title: '用户数据', menu_permissions: [api.statistics.sta2.member] },
            component: () => import('@/views/statistics/userData'),
        },
        {
            path: 'goodsData',
            name: 'goodsData',
            meta: { title: '商品数据', menu_permissions: [api.statistics.sta2.goodssalenum] },
            component: () => import('@/views/statistics/goodsData'),
        },
        // {
        //     path: 'tradeAnalysis',
        //     name: 'tradeAnalysis',
        //     meta: { title: '交易分析' },
        //     component: () => import('@/views/statistics/tradeAnalysis'),
        // },
        {
            path: 'rebateAnalysis',
            name: 'rebateAnalysis',
            meta: { title: '返利分析', menu_permissions: [api.statistics.sta2.rebate] },
            component: () => import('@/views/statistics/rebateAnalysis'),
        },
        {
            path: 'teamAnalysis',
            name: 'teamAnalysis',
            meta: { title: '团队分析', menu_permissions: [api.statistics.sta2.team] },
            component: () => import('@/views/statistics/teamAnalysis'),
        },
    ]
};
