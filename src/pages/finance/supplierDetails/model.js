import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { FORMAT } from '../constants'

export default modelExtend(model, pageModel, {
  namespace: 'suppilerDetails',
  state: {
    query: {
      update_start_time: moment().subtract(30, 'days').format(FORMAT.DATE),
      update_end_time: moment().format(FORMAT.DATE),
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, payload }) => {
        if (pathMatchRegexp('/finance/suppilerDetails', pathname)) {
          dispatch({ type: 'getList', payload })
        }
      })
    },
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.suppilerDetails
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.finance.suppilerDetails, { page_size, ...others })
      yield put({
        type: 'querySuccess',
        payload: {
          list: data && data.data,
          pagination: {
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          }
        }
      })

      yield put({
        type: 'updateState',
        payload: {
          type: data && data.type,
          sum: data && data.sum,
        }
      })
    }
  }
})