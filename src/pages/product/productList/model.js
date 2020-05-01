import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'productList',
  state: {
    goods_status: -1,
    query: {},
    tabsNum: null, // 切页统计
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/productList', pathname)) {
          dispatch({ type: 'getList' })
          dispatch({ type: 'productSta' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, goods_status } = yield select(_ => _.productList)
      const { pageSize, current: page } = pagination
      let params = { pageSize, page, goods_status, ...query, ...payload }
      params.page_size = params.pageSize
      delete params.pageSize
      const { data } = yield call($api.product.productESList, params)
      yield put({
        type: 'updateState',
        payload: {
          list: data.data,
          pagination: {
            ...pagination,
            total: data.total,
            current: params.page,
            pageSize: params.page_size,
          },
        },
      })
    },
    *productSta({ payload }, { call, put, select }) {
      const { data } = yield call($api.product.productStatusCount)
      yield put({
        type: 'updateState',
        payload: {
          tabsNum: data,
        },
      })
    },
  },
})
