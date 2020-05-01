import { asyncRouterMap, constantRouterMap } from '../../../router/index';

/**
 * 通过meta.roles判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.menu_permissions) {
        return roles.some(role => route.meta.menu_permissions.indexOf(role) >= 0);
    }
    return true;
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouter, roles) {
    const accessedRouters = asyncRouter.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}

const permission = {
    name: 'permission',
    namespaced: true,
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    actions: {
        GenerateRoutes({ commit, rootState }) {
            const { menu_permissions } = rootState.user;
            const accessedRouters = filterAsyncRouter(asyncRouterMap, menu_permissions);
            // console.log(menu_permissions)
            commit('SET_STATE', {
                routers: []
            });
            commit('SET_STATE', {
                addRouters: accessedRouters,
                routers: accessedRouters.concat(constantRouterMap)
            });
        }
    }
};

export default permission;
