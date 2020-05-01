/**
 *  无需验证即可访问的路由，此路由会router实例化时注册
 *  同时也不会加入到菜单中进行显示
 *  @return { Object } 路由对象
 */

export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login')
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404' }
    }
];
