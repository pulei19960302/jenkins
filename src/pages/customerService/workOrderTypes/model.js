import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'workOrderTypes',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/customerService/workOrderTypes', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(_ => _.workOrderTypes)
      const { pageSize, current: page } = pagination
      const params = { page_size: pageSize, page, ...query, ...payload }
      const { data } = yield call($api.workorder.getTypeList, params)

      yield put({
        type: 'updateState',
        payload: {
          list: data && data.data,
          pagination: {
            total: data && data.total,
            current: params.page,
            pageSize: params.page_size,
          },
        }
      })
    }
  }
}) 