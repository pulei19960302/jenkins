import store from 'store'
export function btnPermission(url) {
  // return true
  const targetUrl = url[0] === '/' ? `/admin${url}` : `/admin/${url}`
  const button_permissions = [...getBtnPermission(), ...getMenuPermission()]
  if (!button_permissions || button_permissions.length === 0) {
    return false
  }
  if (!targetUrl) {
    return true
  }
  if (typeof targetUrl === 'string' && button_permissions.includes(targetUrl)) {
    return true
  }
  if (Object.prototype.toString.call(targetUrl) === '[object Array]') {
    if (targetUrl.every(it => button_permissions.includes(it))) {
      return true
    }
  }
  return false
}

function getBtnPermission() {
  const user = store.get('userInfo')
  return user ? user.button_permissions : []
}

function getMenuPermission() {
  const user = store.get('userInfo')
  return user ? user.menu_permissions : []
}

export function menuPermission(routeList) {
  // return routeList
  const menu_permissions = [...getBtnPermission(), ...getMenuPermission()]
  if (!menu_permissions || menu_permissions.length === 0) {
    return []
  }
  return routeList.filter(it => {
    if (!it.menu_permissions) return true
    if (it.menu_permissions.length === 0) return true
    if (it.menu_permissions instanceof Array) {
      return it.menu_permissions.every(item => (menu_permissions.includes(item[0] === '/' ? `/admin${item}` : `/admin/${item}`)) || menu_permissions.includes(item))
    }
    if (typeof (it.menu_permissions) === 'string') {
      return it.menu_permissions.split(',').some(item => (menu_permissions.includes(item[0] === '/' ? `/admin${item}` : `/admin/${item}`)) || menu_permissions.includes(item))
    }
    return false
  })
}

export function hasPagePermission(newRouteList) {
  // return true
  const menu_permissions = getMenuPermission()
  if (!menu_permissions || menu_permissions.length === 0) {
    return true
  }
  const currentRoute = getCurrentRoute()
  if (currentRoute === '/' || currentRoute === '#/' || currentRoute === '') {
    return true
  }
  for (let i = 0; i < newRouteList.length; i++) {
    if (judgeSameRoute(newRouteList[i].route, currentRoute)) {
      return true
    }
  }
  return false
}

export const getCurrentRoute = _ =>
  window.location.hash.replace(/\#([^\?]*).*/, '$1')

// eslint-disable-next-line valid-jsdoc
/**
 * 判断路由是否匹配
 * @param {*} configRoute 路由配置中的路由
 * @param {*} pageRoute  页面当前路由地址
 */
export const judgeSameRoute = function (configRoute, pageRoute) {
  if (!configRoute) return false
  const configRouteArr = configRoute.split('/')
  const pageRouteArr = pageRoute.split('/')
  for (let i = 0; i < configRouteArr.length; i++) {
    if (!configRouteArr[i].includes(':')) {
      if (configRouteArr[i] !== pageRouteArr[i]) {
        return false
      }
    }
  }
  return true
}
