import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel, pagination } from 'utils/model'
import { tabsFilds } from './components/fields'

const DATE = 'YYYY-MM-DD'

export default modelExtend(pageModel, {
  namespace: 'orderList',
  state: {
    pagination: {
      ...pagination,
      pageSize: 10
    },
    query: {
      //搜索条件
      start_at: `${moment()
        .subtract(3, 'days')
        .format(DATE)}`,
      end_at: `${moment().format(DATE)}`,
    },
    status: '', // 切页状态
    result: {}, // 统计结果
    list: [], // 订单列表
    tabsNum: null, // 切页统计
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/order/orderList', pathname)) {
          console.log(history)
          dispatch({ type: 'getList' })
          dispatch({ type: 'orderSta' })
        }
      })
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const { pagination, query, status } = yield select(_ => _.orderList)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, status, ...query, ...payload }
      const { data } = yield call($api.order.orderList, params)
      const count = data.stat.count || 0
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
    *orderSta({ payload }, { call, put, select }) {
      const { data } = yield call($api.order.orderSta)
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
