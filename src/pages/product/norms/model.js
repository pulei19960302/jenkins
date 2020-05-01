import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'normsList',
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/norms', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    * getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(_ => _.normsList)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...payload, ...query }
      console.log(params, 'params')
      const { data } = yield call($api.specs.getSpecsList, params)
      yield put({
        type: 'updateState',
        payload: {
          list: data && data.item,
          pagination: {
            ...pagination,
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})
