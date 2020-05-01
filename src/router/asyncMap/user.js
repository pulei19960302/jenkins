import Layout from '../../views/mainLayout/Layout.vue';
import api from '../../api'
//用户
export default {
    component: Layout,
    name: 'User',
    path: '/User',
    meta: {shortTitle: '用户', icon: 'user', menu_permissions: ['member-manage']},
    redirect: 'noredirect',
    rank: 2,
    children: [
        {
            path: 'userList',
            name: 'userList',
            meta: {title: '用户列表', menu_permissions: [api.user.userManage.list]},
            component: () => import('@/views/user/userList'),
        },
        // {
        //     path: 'UserSet',
        //     name: 'UserSet',
        //     meta: {title: '用户设置', menu_permissions: [api.setting.config.list]},
        //     component: () => import('@/views/user/UserSet'),
        // },
        // {
        //     path: 'shopkeeperList',
        //     name: 'shopkeeperList',
        //     meta: {title: '白银管理', menu_permissions: [api.user.store.list]},
        //     component: () => import('@/views/user/shopkeeperList'),
        // },
        // {
        //     path: 'partnerList',
        //     name: 'partnerList',
        //     meta: {title: '平台合伙人', menu_permissions: [api.user.partner.list]},
        //     component: () => import('@/views/user/partnerList'),
        // },
        // {
        //     path: 'groupManagement',
        //     name: 'groupManagement',
        //     meta: {title: '社群管理', menu_permissions: [api.user.group.list]},
        //     component: () => import('@/views/user/groupManagement'),
        // },
        // {
        //     path: 'groupMember/:id',
        //     name: 'groupMember',
        //     meta: {title: '群成员管理'},
        //     component: () => import('@/views/user/groupMember'),
        //     hidden:true,
        // },
        {
            path: 'userDetail/:type/:id/:listType/',
            name: 'userDetail',
            meta: {title: '用户详情'},
            hidden:true,
            component: () => import('@/views/user/userDetail'),
        },
        // {
        //     path: 'userIntegration',
        //     name: 'userIntegration',
        //     component: () => import('@/views/user/userIntegration'),
        //     meta: { title: '用户积分',menu_permissions: [api.user.userManage.integralrecord] }
        // },
        // {
        //     path: 'integrationConfig',
        //     name: 'integrationConfig',
        //     component: () => import('@/views/user/integrationConfig'),
        //     meta: { title: '积分配置',menu_permissions: [api.setting.config.list] }
        // },
        //
        // {
        //     path: 'System',
        //     name: 'System',
        //     fatherTitle: '消息查询',
        //     component: () => import('@/views/operate/informationQuery/System'),
        //     meta: { title: '系统消息' }
        // },
        // {
        //     path: 'ShortMsg',
        //     name: 'ShortMsg',
        //     component: () => import('@/views/operate/informationQuery/ShortMsg'),
        //     meta: { title: '短信消息' }
        // },
        // {
        //     path: 'TaskManage',
        //     name: 'TaskManage',
        //     component: () => import('@/views/user/TaskManage'),
        //     meta: { title: '任务管理', menu_permissions: [api.user.task.list] }
        // },
        // {
        //     path: 'AppPush',
        //     name: 'AppPush',
        //     component: () => import('@/views/operate/informationQuery/AppPush'),
        //     meta: { title: 'APP推送消息' }
        // },
        // {
        //     path: 'recommendCodeList',
        //     name: 'recommendCodeList',
        //     component: () => import('@/views/user/recommendCodeList'),
        //     meta: { title: '推荐码列表',menu_permissions: [api.user.recommendCode.list] }
        // },
    
    ],
}
    