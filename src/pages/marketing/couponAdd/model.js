import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'
import { COUPON_TYPE } from '../constants'

export default modelExtend(model, {
  namespace: 'couponAdd',
  state: {
    couponForm: {},
    productList: [],
    userContentFields: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/marketing/couponAdd', pathname)) {

        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {

    },
    *updateCouponForm({ payload }, { put, select }) {
      const { couponForm = {} } = yield select(_ => _.couponAdd)
      yield put({
        type: 'updateState',
        payload: {
          couponForm: {
            ...couponForm,
            ...(payload || {}),
          }
        },
      })
    },
    *getProductsByIds({ payload }, { call, put }) {
      const { goods_ids } = payload
      const { data } = yield call($api.product.productGetByIds, { goods_ids })
      yield put({
        type: 'updateState',
        payload: {
          productList: data
        }
      })
    },
    *getUserContentFields({ }, { call, put }) {
      const { data = {} } = yield call($api.user.userLevelList, { cache: true })
      const { items = [] } = data || {}
      const newItems = items && items.map(it => ({ name: it.name, value: it.id }))
      yield put({
        type: 'updateState',
        payload: {
          userContentFields: newItems
        }
      })
    },
  },
})
