import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'productLabelList',
  state: {
    list: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/product/labelList', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, tabsKey: level } = yield select(
        _ => _.productLabelList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, level, ...query, ...payload }
      const { data } = yield call($api.label.labelList, params)
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.item,
          pagination: {
            ...pagination,
            total: data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
  },
})
