import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'

const initState = {
  list: [],
  pagination,
}
export default modelExtend(model, pageModel, {
  namespace: 'userGroup',
  state: {...initState},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/user/userGroup', pathname)) {
          dispatch({
            type: 'updateState',
            payload: {...initState},
          })
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, tabsKey: level } = yield select(
        _ => _.userGroup
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, level, ...query, ...payload }
      params.page_size=params.pageSize
      const { data } = yield call($api.user.groupList, params)
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
