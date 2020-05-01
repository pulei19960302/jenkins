import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";

export default {
    component: Layout,
    name: 'Jurisdiction',
    path: '/Jurisdiction',
    meta: {shortTitle: '权限', icon: 'finished', menu_permissions: ['permission-manage']},
    redirect: 'noredirect',
    rank: 9,
    children: [
        {
            path: 'departmentManagement',
            name: 'departmentManagement',
            meta: {title: '部门管理', menu_permissions: [api.jurisdiction.admincp_group.list]},
            component: () => import('@/views/jurisdiction/departmentManagement'),
        },
        {
            path: 'permissions/:id',
            name: 'permissions',
            meta: {title: '权限设置'},
            hidden: true,
            component: () => import('@/views/jurisdiction/permissions'),
        },
        {
            path: 'roleManagement',
            name: 'roleManagement',
            meta: {title: '角色管理', menu_permissions: [api.jurisdiction.role.list]},
            component: () => import('@/views/jurisdiction/roleManagement'),
        },
        {
            path: 'memberManagement',
            name: 'memberManagement',
            meta: {title: '成员管理', menu_permissions: [api.jurisdiction.admincp_member.list]},
            component: () => import('@/views/jurisdiction/memberManagement/index.vue'),
        },
        {
            path: 'addMember',
            name: 'addMember',
            meta: {title: '添加成员'},
            hidden:true,
            component: () => import('@/views/jurisdiction/addMember'),
        },
        {
            path: 'editMember/:id',
            name: 'editMember',
            meta: {title: '编辑成员'},
            hidden:true,
            component: () => import('@/views/jurisdiction/addMember'),
        },
        {
            path: 'note',
            name: 'note',
            meta: {title: '操作日志', menu_permissions: [api.jurisdiction.operatelog.list]},
            component: () => import('@/views/jurisdiction/note'),
        },
        // {
        //     path: 'customerServiceManagement',
        //     name: 'customerServiceManagement',
        //     meta: {title: '客服管理'},
        //     component: () => import('@/views/jurisdiction/customerServiceManagement'),
        //
        // },
        // {
        //     path: 'customerServiceSecord',
        //     name: 'customerServiceSecord',
        //     meta: {title: '会话记录'},
        //     component: () => import('@/views/jurisdiction/customerServiceSecord'),
        //     hidden:true
        // },
        // {
        //     path: 'databaseManagement',
        //     name: 'databaseManagement',
        //     meta: {title: '数据库管理'},
        //     component: () => import('@/views/jurisdiction/databaseManagement'),
        // },
    ]
};
