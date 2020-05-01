import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
export default modelExtend(model, pageModel, {
  namespace: 'userLevel',
  state: {
    list: [],
    pagination,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/user/userLevel', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  reducers: {},
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(_ => _.userLevel)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      params.page_size=params.pageSize
      const { data } = yield call($api.user.userLevelList, params)
      if(data && data.items && data.items.length){
        const biggst = Math.max.apply(null,data.items.map(it=>it.sort))
        data.items.forEach(it=>it.biggst=biggst)
      }
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
