import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { searchFields } from './components/fields'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'brandsList',
  state: {
    list: [],
    pagination: {
      showTotal: total => `共 ${total} 条记录`,
      pageSizeOptions: ['10', '20', '30'],
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
    searchFields,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/brandsList', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(_ => _.brandsList)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { data } = yield call($api.brands.brandsList, params)
      for (let i = 0; i < data.item.length; i++) {
        data.item[i].status = String(data.item[i].status)
      }
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.item,
          pagination: {
            total: data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },

    *add({ payload }, { put, call }) {
      const response = yield call($api.brands.brandsAdd, payload)
    },
  },
})
