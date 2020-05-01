import { router, pathMatchRegexp } from 'utils'
import Token from 'utils/token'
import store from 'store'

export default {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { put, call, select }) {
      const { data } = yield call(
        $api.user.loginUser,
        {
          ...payload,
        //   company_id: 1,
        },
        {
          delAuthorization: true,
        }
      )
      Token.setToken(data.accessToken)
      store.set('user', data)
      yield put({ type: 'app/updateState', payload: { user: data } })
      yield put({ type: 'app/query' })
      const { locationQuery } = yield select(_ => _.app)
      const { from } = locationQuery
      if (!pathMatchRegexp('/login', from)) {
        if (['', '/', undefined].includes(from)) router.push('/dashboard')
        else router.push(from)
      } else {
        router.push('/dashboard')
      }
    },
  },
}
