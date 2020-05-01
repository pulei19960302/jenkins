import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { searchFields } from './components/fields'

export default modelExtend(model, pageModel, {
  namespace: 'couponList',
  state: {
    searchFields,
    query: {
      sort: 'DESC', //ASC or DESC
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/marketing/couponList', pathname)) {
          dispatch({ type: 'getList' })
          dispatch({ type: 'getTabs' })
        }
      })
    },
  },

  reducers: {
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.couponList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.coupon.list, { page_size, ...others, sort: 'DESC', })
      yield put({
        type: 'querySuccess',
        payload: {
          list: data && data.items,
          pagination: {
            total: data && data.count,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})