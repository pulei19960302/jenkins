/**
 *  @desc 路由配置项
 *  @return { Object } constantRouterMap 无需认证即可访问的路由页面，router初始化时即注册
 *  @return { Object } asyncRouterMap 动态注册的路由，需要进行身份验证后或根据权限动态的注册
 *  @return.default { Object } router vue-router实例
 */

import Vue from 'vue';
import Router from 'vue-router';
import constantRouterMap from './constantRouterMap';

Vue.use(Router);

// 自动导入asyncMap
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./asyncMap', true, /\.js$/);
const asyncRouterMap = [];
requireAll(req).map((md) => {
    if (md.default.rank) {
        asyncRouterMap[md.default.rank - 1] = md.default;
    } else {
        asyncRouterMap.push(md.default);
    }
});
// 最后追加
asyncRouterMap.push({ path: '/', redirect: '/Index/Index', hidden: true });
asyncRouterMap.push({ path: '*', redirect: '/404', hidden: true });

export {
    constantRouterMap,
    asyncRouterMap
};

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
