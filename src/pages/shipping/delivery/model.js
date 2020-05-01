import moment from 'moment'
import modelExtend from 'dva-model-extend'
import { model, pageModel, pagination } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, pageModel, {
  namespace: 'delivery',
  state: {
    templateQuery: {},
    expressQuery: {},
    insuranceQuery: {},
    areasList: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/shipping/delivery', pathname)) {
          dispatch({ type: 'getAllAreas' })
        }
      })
    }
  },
  effects: {
    *getTemplateList({ payload }, { put, call, select }) {
      const { pagination, templateQuery } = yield select(
        _ => _.delivery
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...templateQuery, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.common.getFreightTemplate, { page_size, ...others })
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
    },

    *getExpressList({ payload }, { put, call, select }) {
      const { pagination, expressQuery } = yield select(
        _ => _.delivery
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...expressQuery, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.common.getExpressList, { page_size, ...others })
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
    },
    
    *getInsuranceList({ payload }, { put, call, select }) {
      const { pagination, insuranceQuery } = yield select(
        _ => _.delivery
      )
      const { pageSize, current: page } = pagination
      const params = { pageSize, page, ...insuranceQuery, ...payload }
      const { pageSize: page_size, ...others } = params
      const { data } = yield call($api.common.getInsurance, { page_size, ...others })
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
    },

    *getAllAreas({ payload }, { put, call, select }) {
      const { data } = yield call($api.common.getAllAreas)

      yield put({
        type: 'updateState',
        payload: {
          areasList: data,
        }
      })
    }
  }
})