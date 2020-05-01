import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";
//用户
export default {
    component: Layout,
    name: 'Finance',
    path: '/Finance',
    meta: {shortTitle: '财务', icon: 'coin', menu_permissions: ['finance-manage']},
    redirect: 'noredirect',
    rank: 7,
    children: [
        // {
        //     path: 'comprehensiveStatistics',
        //     name: 'comprehensiveStatistics',
        //     meta: {title: '账户余额',menu_permissions: [api.finance.balance_record.financeindex]},
        //     component: () => import('@/views/finance/comprehensiveStatistics'),
        // },
        {
            path: 'MoneyStatistics',
            name: 'MoneyStatistics',
            meta: {title: '资金统计',menu_permissions: [api.finance.finance.moneystat]},
            component: () => import('@/views/finance/MoneyStatistics'),
        },
        // {
        //     path: 'revenueAndExpenses',
        //     name: 'revenueAndExpenses',
        //     fatherTitle: '对账管理',
        //     meta: {title: '总账', menu_permissions: [api.finance.finance.totalbill]},
        //     component: () => import('@/views/finance/revenueAndExpenses'),
        // },
        // {
        //     path: 'reconciliationsList',
        //     name: 'reconciliationsList',
        //     meta: {title: '明细账',menu_permissions: [api.finance.finance.billlist]},
        //     component: () => import('@/views/finance/reconciliationsList'),
        // },
        // {
        //     path: 'revenueAndExpensesDetail',
        //     name: 'revenueAndExpensesDetail',
        //     meta: {title: '总账详情', menu_permissions: [api.finance.finance.totalbilldetail]},
        //     hidden: true,
        //     component: () => import('@/views/finance/components/revenueAndExpensesDetail'),
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
        //     path: 'reconciliationsList',
        //     name: 'reconciliationsList',
        //     meta: {title: '对账列表'},
        //     component: () => import('@/views/finance/reconciliationsList'),
        // },
        {
            path: 'rechargeRecord',
            name: 'rechargeRecord',
            meta: {title: '充值记录', menu_permissions: [api.finance.recharge.list]},
            component: () => import('@/views/finance/rechargeRecord'),
        },
        {
            path: 'rebateDetails',
            name: 'rebateDetails',
            meta: {title: '返利明细', menu_permissions: [api.finance.order_clearing.list]},
            component: () => import('@/views/finance/rebateDetails'),
        },
        {
            path: 'financialDetails',
            name: 'financialDetails',
            meta: {title: '资金明细', menu_permissions: [api.finance.balance_record.list]},
            component: () => import('@/views/finance/financialDetails'),
        },
        {
            path: 'withdrawManage',
            name: 'withdrawManage',
            meta: {title: '提现明细', menu_permissions: [api.finance.withdraw.list]},
            component: () => import('@/views/finance/withdrawManage'),
        },
        // {
        //     path: 'afterSale',
        //     name: 'afterSale',
        //     meta: {
        //         title: '售后明细'
        //     },
        //     component: () => import('@/views/finance/afterSale')
        // },
        {
            path: 'commission',
            name: 'commission',
            meta: {
                title: '佣金提现'
            },
            component: () => import('@/views/finance/commissionCash')
        },
        // {
        //     path: 'Settlement',
        //     name: 'Settlement',
        //     meta: {title: '财务结算', menu_permissions: [api.finance.withdraw.list]},
        //     component: () => import('@/views/finance/Settlement'),
        // },
        {
            path: 'merchandiseSales',
            name: 'merchandiseSales',
            meta: {
                title: '利润统计',
                // menu_permissions: [api.finance.finance.goodslist] // 记住权限
            },
            component: () => import('@/views/finance/merchandiseSales'),
        }
        // {
        //     path: 'supplierAccount',
        //     name: 'supplierAccount',
        //     meta: {title: '供应商款',menu_permissions: [api.finance.order_clearing.supplierlist]},
        //     component: () => import('@/views/finance/supplierAccount'),
        // },
        // {
        //     path: 'transferAccounts',
        //     name: 'transferAccounts',
        //     meta: {title: '转账',menu_permissions: [api.finance.finance.apptransfer]},
        //     component: () => import('@/views/finance/transferAccounts'),
        // },
        // {
        //     path: 'cashWithdrawal',
        //     name: 'cashWithdrawal',
        //     meta: {title: '提现',menu_permissions: [api.finance.finance.withdrawrequest]},
        //     component: () => import('@/views/finance/cashWithdrawal'),
        // },
        // {
        //     path: 'billingSystem',
        //     name: 'billingSystem',
        //     component: () => import('@/views/finance/billingSystem'),
        //     // meta: { title: '计费系统' }
        //     meta: { title: '计费系统',menu_permissions: [api.finance.billingSystem.list] }
        // },

    ],
}
