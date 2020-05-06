import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { DATE_RANGE, FORMAT } from '../constants'

export default modelExtend(model, pageModel, {
  namespace: 'userAccountList',
  state: {
    query: {
      start_time: moment().subtract(30, 'days').format(FORMAT.DATE),
      end_time: moment().format(FORMAT.DATE),
    },
    details: {},
    type: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathMatchRegexp('/finance/userAccountList', pathname)) {
          dispatch({
            type: 'updateState',
            payload: { query }
          })
          dispatch({ type: 'getList' })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.userAccountList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }

      const { timeType = '', start_time, end_time, pageSize: page_size, ...others } = params
      let times = {}
      if (start_time && end_time) {
        times = !timeType ? { start_time, end_time } : { update_start_time: start_time, update_end_time: end_time }
      }
      const { data } = yield call($api.finance.userAccountList, { page_size, ...times, ...others })
      yield put({
        type: 'querySuccess',
        payload: {
          list: data && data.data,
          pagination: {
            total: data && data.total,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
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