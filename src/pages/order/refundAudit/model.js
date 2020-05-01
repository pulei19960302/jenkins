import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel, pagination } from 'utils/model'
import { tabsFilds } from './components/fields'
import { AFTER_SALE_STATUS } from '../constants'

const DATE = 'YYYY-MM-DD'


export default modelExtend(pageModel, {
  namespace: 'refundAudit',
  pagination: {
    ...pagination,
    pageSize: 10
  },
  state: {
    query: {
      //搜索条件
      start_at: `${moment()
        .subtract(3, 'days')
        .format(DATE)}`,
      end_at: `${moment().format(DATE)}`,
    },
    status: AFTER_SALE_STATUS.WAIT_FINANCE_AUDIT,
    list: [], // 订单列表,
    tabsNum: null, // 切页统计
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/order/refundAudit', pathname)) {
          dispatch({ type: 'getList' })
          dispatch({ type: 'refundAuditSta' })
        }
      })
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const { pagination, query, status } = yield select(_ => _.refundAudit)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, status, ...query, ...payload }
      const { data } = yield call($api.order.refundAuditList, params)
      const count = data.count || 0
      yield put({
        type: 'updateState',
        payload: {
          list: data.items,
          result: data.stat,
          pagination: {
            ...pagination,
            total: count,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    },
    *refundAuditSta({ payload }, { call, put, select }) {
      const { data } = yield call($api.order.refundAuditSta)
      yield put({
        type: 'updateState',
        payload: {
          tabsNum: data,
        },
      })
    },
  },
  reducers: {
    
  },
})
