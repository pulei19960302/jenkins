import modelExtend from 'dva-model-extend'
import lodash from 'lodash'
import { model } from 'utils/model'
import { pathMatchRegexp } from 'utils'

export default modelExtend(model, {
  namespace: 'tradeSet',
  state: {
    trade: {
      order_auto_cancel: {},
      order_auto_confirm_receipt: {},
      order_auto_rebate: {},
      order_after_market: {},
    },
    // switchs: {
    //   paymentRemind: TRADE_SET_SWITCH.TRUE,
    //   autoCancelOrder: TRADE_SET_SWITCH.TRUE,
    //   autoReceive: TRADE_SET_SWITCH.TRUE,
    //   autoComment: TRADE_SET_SWITCH.TRUE,
    //   autoRebate: TRADE_SET_SWITCH.TRUE,
    //   cancelOrder: TRADE_SET_SWITCH.TRUE,
    //   afterSale: TRADE_SET_SWITCH.TRUE,
    //   editOrder: TRADE_SET_SWITCH.TRUE,
    // },
    // orderTypesList: [
    //   {
    //     id: 0,
    //     orderType: 0,
    //     time: 15,
    //     content: '15 min',
    //   },
    // ],
    // afterSaleList: [
    //   {
    //     id: 0,
    //     text: '7天无理由',
    //   },
    //   {
    //     id: 1,
    //     text: '商品质量问题',
    //   },
    // ],
    // cancelOrderList: [
    //   {
    //     id: 0,
    //     text: '待付款',
    //     checked: false,
    //   },
    //   {
    //     id: 1,
    //     text: '待发货',
    //     checked: true,
    //   },
    //   {
    //     id: 2,
    //     text: '订单已导出',
    //     checked: true,
    //   },
    //   {
    //     id: 3,
    //     text: '已发货',
    //     checked: false,
    //   },
    // ],
    // editOrderList: [
    //   {
    //     id: 0,
    //     text: '修改收货地址',
    //     checked: false,
    //   },
    //   {
    //     id: 1,
    //     text: '修改收货人电话',
    //     checked: true,
    //   },
    //   {
    //     id: 2,
    //     text: '修改物流信息',
    //     checked: true,
    //   },
    //   {
    //     id: 3,
    //     text: '修改商品规格',
    //     checked: false,
    //   },
    // ],
    // forms: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathMatchRegexp('/system/tradeSet', pathname)) {
          dispatch({ type: 'getTradeInfo' })
        }
      })
    }
  },
  effects: {
    *getTradeInfo({ payload }, { put, call, select }) {
      const { data = {} } = yield call($api.system.getTradeInfo)
      yield put({
        type: 'updateState',
        payload: {
          trade: data
        }
      })
    },
    *updateTradeInfo({ payload }, { put, call, select }) {
      const { keys = [], value = '', canDel } = payload
      const { trade = {} } = yield select(_ => _.tradeSet)
      const newTrade = lodash.cloneDeep(trade)
      lodash.set(newTrade, keys, value)
      if(canDel && !value) {
        lodash.unset(newTrade, keys)
      }
      
      yield put({
        type: 'updateState',
        payload: {
          trade: newTrade
        }
      })
    },
  },
})