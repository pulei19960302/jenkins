import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'productProfitList',
  state: {
    pagination: {
      ...pagination,
      pageSize: 8,
      // showSizeChanger: true,
      // showQuickJumper: true,
      // current: 1,
      // total: 14,
      // pageSize: 10,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, payload }) => {
        if (pathMatchRegexp('/finance/productProfitList', pathname)) {
          dispatch({ type: 'getList', payload })  //payload 直接从 供应商货款页面过来的，数据，直接发给后台，请求
          dispatch({ type: 'onSearch', payload })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.productProfitList
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { data } = yield call($api.finance.productProfitList, params)

      // yield put({  //后台接口 暂时 不知 拿到后，重新更新代码
      //   type: 'querySuccess',
      //   payload: {
      //     list: data && data.items,
      //     pagination: {
      //       total: data && data.count,
      //       current: page,
      //       pageSize: pageSize,
      //     },
      //   },
      // })
    }
  }
})