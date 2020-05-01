import Layout from '../../views/mainLayout/Layout.vue';
//用户
export default {
    component: Layout,
    name: 'SourcingCenter',
    path: '/SourcingCenter',
    meta: {title: '货源中心', shortTitle: '货源', icon: 'fenxiaoshangpinliebiao', menu_permissions: ['source-manage']},
    redirect: 'noredirect',
    rank: 11,
    hidden: true,
    children: [
        {
            path: 'index',
            name: 'index',
            meta: {title: '货源中心'},
            component: () => import('@/views/sourcingCenter/Index'),
        }
    ]
};
