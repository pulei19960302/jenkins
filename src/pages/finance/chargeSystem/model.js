import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'chargeSystem',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/finance/chargeSystem', pathname)) {
          dispatch({ type: 'getList' })
        }
      })
    }
  },
  effects: {
    *getList({ payload }, { put, call, select }) {
      const { pagination, query } = yield select(
        _ => _.chargeSystem
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...query, ...payload }
      const { data } = yield call($api.finance.chargeSystem, params)

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