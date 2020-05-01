import moment from 'moment'
export const FORMAT = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  TIME: 'HH:mm:ss',
  MONTH: 'YYYY-MM',
}

//用户交易类型
export const TRADE_TYPES = {
  ADD_MONEY: 1, //后台加款 
  CUT_MONEY: 2, //后台扣款
  PLACE_ORDER: 3, //下单消费
  CANCEL_ORDER: 4, //取消退款 
  AFTERSALE_REFUND: 5, //售后退款 
  AFTERSALE_INCOME: 6, //售后补平台款 
  ONLINE_RECHARGE: 7, //在线充值 
  WITHDRAW_CASH: 8, //佣金提现 
  SWICTH: 9, //佣金转余额 
  AFTERSALE_EXPEND: 10, // 售后补用户款 
  AFTERSALE_DEDUCTION: 20, //售后扣除返利
  ORDER_RETURN: 21, //订单返利 
}

export const TRADE_TYPES_FIELDS = {
  [TRADE_TYPES.ADD_MONEY]: '管理员录款',
  [TRADE_TYPES.CUT_MONEY]: '管理员扣款',
}

//用户交易状态
export const TRADE_STATUS = {
  APPLY_FOR: 0,
  SUCCESS: 1,
  FAILED: 2,
  IN_REVIEW: 3,
}

export const TRADE_STATUS_FIELDS = {
  [TRADE_STATUS.APPLY_FOR]: '申请中',
  [TRADE_STATUS.SUCCESS]: '成功',
  [TRADE_STATUS.FAILED]: '失败',
}

//用户 提现/支付 渠道
export const PAY_WAY = {
  BALANCE: 'balance',
  WECHAT: 'wechat',
  ALIPAY: 'alipay',
  BANK: 'bank',
}

export const PAY_WAY_TEXT = {
  [PAY_WAY.BALANCE]: '余额',
  [PAY_WAY.WECHAT]: '微信',
  [PAY_WAY.ALIPAY]: '支付宝',
  [PAY_WAY.ALIPAY]: '银行卡',
}

//加扣款方式
export const BALANCE_TYPE = {
  BALANCE: 1, //余额
  FEE: 2, //佣金
}

export const BALANCE_FIELDS = {
  [BALANCE_TYPE.BALANCE]: '余额',
  [BALANCE_TYPE.FEE]: '佣金',
}

//返利类型
export const PROFIT_TYPES = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
}

//返利状态
export const PROFIT_STATUS = {
  DELETE: 0, // 已删除返利
  WAIT: 1, // 待返利 
  CLOSED: 2, //已返利
  // CLOSED: 1, //已返利
  // WAIT_CLOSED: 0, //待返利
  // CANCELED: 2, //取消返利
  // AFTER: 3, //售后扣除
}

export const PROFIT_STATUS_FIELDS = {
  [PROFIT_STATUS.CLOSED]: '已返利',
  [PROFIT_STATUS.WAIT]: '待返利',
  [PROFIT_STATUS.DELETE]: '已删除返利',
}

//提现转账状态
export const WITHDRAW_STATUS = {
  APPLY_FOR: 0,
  SUCCESS: 1,
  FAILED: 2,
  IN_REVIEW: 3,
}

export const WITHDRAW_STATUS_FIELDS = {
  [WITHDRAW_STATUS.APPLY_FOR]: '申请中',
  [WITHDRAW_STATUS.SUCCESS]: '成功',
  [WITHDRAW_STATUS.FAILED]: '失败',
  [WITHDRAW_STATUS.IN_REVIEW]: '审核中',
}

//供应商货款：待结算，结算记录
export const SUPPLIER_STATUS = {
  WAIT: 1,
  CLOSED: 9,
}

//date choose
export const DATE_RANGE = {
  今日: [moment().startOf('day'), moment()],
  昨日: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  最近一周: [moment().subtract(7, 'days'), moment()],
  最近一个月: [moment().subtract(30, 'days'), moment()],
  本月: [moment().startOf('month'), moment()],
  上月: [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')],
}


export const btns = {
  updateMoney: {
    permission: $api.finance.updateMoney.permission(),
  },
  suppilerDetails: {
    permission: $api.finance.suppilerDetails.permission(),
  },
  settle: {
    permission: $api.finance.settle.permission(),
  },
  financeExport: {
    permission: $api.finance.financeExport.permission(),
  },
  userAccountExport: {
    permission: $api.finance.userAccountExport.permission(),
  },
  returnProfitExport: {
    permission: $api.finance.returnProfitExport.permission(),
  },
  afterSaleExport: {
    permission: $api.finance.afterSaleExport.permission(),
  },
  settleExport: {
    permission: $api.finance.settleExport.permission(),
  },
  supplierExport: {
    permission: $api.finance.supplierExport.permission(),
  },
  detailExport: {
    permission: $api.finance.detailExport.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}
