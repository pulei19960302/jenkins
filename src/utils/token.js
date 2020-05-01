/**
 * File: 对 Token 的管理
 */

import store from 'store'
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const token = {
  getToken() {
    return store.get(TokenKey)
  },
  setToken(token) {
    Cookies.set(TokenKey, token)
    return store.set(TokenKey, token)
  },
  removeToken() {
    Cookies.remove(TokenKey)
    return store.remove(TokenKey)
  },
}

export default token
