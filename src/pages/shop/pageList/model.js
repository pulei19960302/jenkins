import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { searchFields } from './components/fields'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'shopPageList',
  state: {
    list: [],
    searchFields,
    query:{}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/shop/pageList', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.shopPageList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { data } = yield call($api.shop.getPageList, params)
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.items,
          pagination: {
            total: data.count,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})
