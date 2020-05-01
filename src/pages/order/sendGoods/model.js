import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel, pagination } from 'utils/model'

const DATE = 'YYYY-MM-DD'

export default modelExtend(pageModel, {
  namespace: 'sendGoods',
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
    result: {}, // 统计结果
    list: [], // 订单列表
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/order/sendGoods', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const { pagination, query, status } = yield select(_ => _.sendGoods)
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, status, ...query, ...payload }
      const { data } = yield call($api.order.sendGoodsList, params)
      yield put({
        type: 'updateState',
        payload: {
          list: data.items,
          result: data.stat,
          pagination: {
            ...pagination,
            total: data.stat.count,
            current: params.page,
            pageSize: params.pageSize,
          },
        },
      })
    }
  },
  reducers: {
    
  },
})
