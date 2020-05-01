/**
 * 配置项： 默认值
 * rank: Number                   导航栏排序
 * fatherTitle: ''                父级title，不具备导航功能
 * hidden: false                  如果hidden为true，则不会在菜单显示该路由，但是多页面依然会显示
 * alwaysShow: false              如果alwaysShow为true，则始终会显示根菜单，与子路由数量无关
 *                                如果alwaysShow设置为false，当根路由下只有一个子路由时，根路由会变成最近的一个子路由而不会显示根路由
 * name:'RouterName'              name为路由唯一标记
 * meta : {
    title: 'title'                左侧菜单栏显示的名字
    shortTitle: 'title'           头部菜单栏显示的名字
    icon: 'svg-name'              当有icon时，会在菜单上显示，icon对应src/icons/svg/下.svg文件名或者引人的iconfontsymbol图标
    roles: ['admin', 'other']     路由所对应的可访问的角色
 }
 */

import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";
export default {
    component: Layout,
    name: 'Index',
    path: '/Index',
    meta: { shortTitle: '首页', icon: 'house' },
    redirect: 'noredirect',
    rank: 1,
    children: [
        {
            path: 'Index',
            name: 'Index',
            component: () => import('@/views/index/SystemIndex'),
            meta: { title: '系统首页' }
            // component: () => import('@/views/index/SystemIndex'),
            // meta: { title: '系统首页'}
        },
        // {
        //     path: 'SystemIndex',
        //     name: 'SystemIndex',
        //     component: () => import('@/views/index/SystemIndex'),
        //     meta: { title: '系统首页' ,menu_permissions: [api.login.systemIndex]}
        // },
        {
            path: 'AccountSet',
            name: 'AccountSet',
            hidden: true,
            component: () => import('@/views/index/AccountSet'),
            meta: { title: '账户设置' }
        },
        // {
        //     path: 'SystemInfo',
        //     name: 'SystemInfo',
        //     component: () => import('@/views/index/SystemInfo'),
        //     meta: { title: '系统信息' }
        // },
        // {
        //     path: 'LoginLog',
        //     name: 'LoginLog',
        //     component: () => import('@/views/index/LoginLog'),
        //     meta: { title: '登录日志' }
        // }
    ]
};
