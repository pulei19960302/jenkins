//交易设置
export const ORDER_TYPES = {
  ALL: 0,
  SECKILL: 1,
  OVERSEAS: 2,
  GROUP: 3,
}

export const ORDER_TYPE_OPTIONS = [
  { name: '全部订单类型', value: ORDER_TYPES.ALL },
  { name: '秒杀订单', value: ORDER_TYPES.SECKILL },
  { name: '海外购订单', value: ORDER_TYPES.OVERSEAS },
  { name: '拼购订单', value: ORDER_TYPES.GROUP },
]

export const TRADE_SET_SWITCH = {
  TRUE: true,
  FALSE: false,
}
//协议与条款
export const AGREEMENT_STATUS = {
  DISABLED: 0,
  ENABLED: 1,
}

export const btns = {
  addAgreement: {
    permission: $api.system.addAgreement.permission(),
  },
  switchAgreeStatus: {
    permission: $api.system.switchStatus.permission(),
  },
  deleteAgreement: {
    permission: $api.system.deleteAgreement.permission(),
  },
  updateAgreement: {
    permission: $api.system.updateAgreement.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}