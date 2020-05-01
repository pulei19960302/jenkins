import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import { FORMAT } from '../constants'

// const format = 'YYYY-MM-DD HH:mm:ss'

export default modelExtend(model, pageModel, {
  namespace: 'workOrderList',
  state: {
    status: '-1',
    tabsCount: null, //"2": 8, "1": 0,"-1": 8

    query: {
      start_time: moment().subtract(2, 'days').format(FORMAT),
      end_time: moment().format(FORMAT),
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/customerService/workOrderList', pathname)) {
          dispatch({ type: 'getList' })
          dispatch({ type: 'getTabsCount' })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query, status } = yield select(_ => _.workOrderList)
      const { pageSize, current: page } = pagination
      const params = { page_size: pageSize, page, status, ...query, ...payload }
      const { data } = yield call($api.workorder.list, params)
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
    },
    *getTabsCount({ payload }, { put, call, select }) {
      const { data } = yield call($api.workorder.statusCount, {})
      yield put({
        type: 'updateState',
        payload: {
          tabsCount: data,
        }
      })
    }
  }
})