import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'userAudit',
  state: {
    list: [],
    pagination,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/user/userAudit', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, tabsKey: level } = yield select(
        _ => _.userAudit
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, level, ...query, ...payload }
      params.page_size = params.pageSize
      delete params.pageSize
      params[params.user_search_type] = params.user_search_input
      delete params.user_search_type
      delete params.user_search_input
      const { data } = yield call($api.user.auditList, params)
      yield put({
        type: 'querySuccess',
        payload: {
          list: data.items,
          pagination: {
            total: data.count,
            current: params.page,
            pageSize: params.page_size,
          },
        },
      })
    },
  },
})
