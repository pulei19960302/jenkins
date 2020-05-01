import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'userDetail',
  state: {
    list: [],
    pagination,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/user/userDetail', pathname)) {
        //   dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {},
})
