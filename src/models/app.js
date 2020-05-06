/**
 * File: 全局 Model
 * TODO-HP：初始的 state 声明；
 * TODO-HP：索引 Action Type
 */

import { router, pathMatchRegexp } from 'utils'
import Token from 'utils/token'
import store from 'store'
import { stringify } from 'qs'

export default {
  namespace: 'app',
  state: {
    isLogout: false,
    user: {},       // 登录用户信息
    theme: 'light',  // 左侧导航主题颜色
    collapsed: false, // 导航是否折叠
    locationPathname: '', //当前路由地址
    locationQuery: {},  // 路由参数
    key: false,   // 强制重新触发（如：导航权限）
  },
  subscriptions: {
    setup({ dispatch }) {
      if (!Token.getToken() && !pathMatchRegexp('/login', window.location.pathname)) {
        router.push('/login')
        return;
      }
      if (
        ['/', '#/', ''].includes(window.location.hash) &&
        window.location.pathname === (process.env.UMI_ENV === 'prod' ? '/web/' : '/')
      ) {
        router.push('/dashboard')
      }
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { data } = yield call($api.user.getUserInfo)
      if (data.is_customer_service) { data.menu_permissions.push('is_customer_service') }
      yield put({ type: 'updateUser', payload: { user: data } })
      store.set('userInfo', data)
      yield put({ type: 'forceReRender' })
    },
    *queryUserInfo({ payload }, { call, put, select }) {
      const { data } = yield call($api.user.getUserInfo)
      yield put({ type: 'updateUser', payload: { user: data } })
      store.set('userInfo', data)
    },
    *logout({ payload }, { call, put, select }) {
      yield put({ type: 'updateState', payload: { isLogout: true, key: false } })
      const { locationPathname } = yield select(_ => _.app)
      Token.removeToken()
      router.push({
        pathname: '/login',
        search: stringify({
          from: locationPathname
        }),
      })
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateUser(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    forceReRender(state) {
      const key = true
      return {
        ...state,
        key,
      }
    },
    getUserInfo(state) {
      return state.user
    },

    handleThemeChange(state, { payload }) {
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      state.collapsed = payload
    },
  },
}
