import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { FORMAT } from '../constants'

export default modelExtend(model, pageModel, {
  namespace: 'afterSaleList',
  state: {
    query: {
      start_time: moment().subtract(30, 'days').format(FORMAT.DATE),
      end_time: moment().format(FORMAT.DATE),
    },
    sum: {},
    type: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/finance/afterSaleList', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.afterSaleList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.finance.afterSaleList, { page_size, ...others })

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
          sum: data && data.sum,
          type: data && data.type,
        }
      })
    }
  }
})