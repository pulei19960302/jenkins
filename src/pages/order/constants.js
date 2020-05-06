// 订单状态
export const ORDER_STATUS = {
  WAIT_PAY: 1,   // 待支付
  WAIT_SEND: 2,  // 待发送
  WAIT_RECEIVE: 3, // 待接收
  CANCEL: 4,      // 取消
  COMPLETE: 5,    // 完成
  AFTER_SALE: 6,  // 售后
}

// 售后状态
export const AFTER_SALE_STATUS = {
  WAIT_AUDIT: 1,   // 待审核
  WAIT_CUSTOMER_SEND: 2, // 待用户发货
  WAIT_RETURN_LIBRARY: 3, // 待退库
  WAIT_BUSINESS_SEND: 4,  // 待售后发货
  WAIT_FINANCE_AUDIT: 5, // 待退款审核
  CLOSE: 6,             // 已关闭
  COMPLETE: 7,         // 售后已完成
  REFUSE_REFUND: 8,   // 拒绝退款
  IN_RETURN: 9,       // 退货中   
  IN_EXCHANGE: 10,    // 换货中
  IN_REISSUE: 11,      // 补发中
  END: 12,         // 复合状态（包括已完成和拒绝退款）
}


export const btns = {
  //-----------------订单相关按钮----------------start
  cancelOrder: {    // 取消订单
    permission: true,
    orderStatus: [ORDER_STATUS.WAIT_PAY, ORDER_STATUS.WAIT_SEND],
  },
  modifyLogistics: {  // 修改物流
    permission: $api.order.modifyLogistics.permission(),
    orderStatus: [ORDER_STATUS.WAIT_RECEIVE],
  },
  modifyAddress: {   // 修改收货地址
    permission: $api.order.modifyAddress.permission(),
    orderStatus: [ORDER_STATUS.WAIT_PAY, ORDER_STATUS.WAIT_SEND],
  },
  applyAfterSale: {  // 申请售后
    permission: $api.order.applyAfterSale.permission(),
    orderStatus: [ORDER_STATUS.COMPLETE],
  },
  logisticsTrail: {  // 物流轨迹
    permission: $api.order.getLogistics.permission(),
    orderStatus: [ORDER_STATUS.WAIT_RECEIVE, ORDER_STATUS.COMPLETE],
  },
  modifyRemarks: {  // 修改备注
    permission: $api.order.modifyRemark.permission(),
    orderStatus: [
      ORDER_STATUS.WAIT_PAY,
      ORDER_STATUS.WAIT_SEND,
      ORDER_STATUS.WAIT_RECEIVE,
    ],
  },
  sendGoods: {    // 一键发货
    permission: $api.order.batchSendGoods.permission(),
    orderStatus: [ORDER_STATUS.WAIT_SEND],
  },
  //-----------------订单相关按钮----------------end

  //-----------------售后相关按钮----------------start

  confirmAfterSale: {  // 确认售后（待售后）
    permission: $api.order.confirmAfterSale.permission(),
    orderStatus: [AFTER_SALE_STATUS.WAIT_AUDIT],
  },
  modifyInfo: {   // 修改信息（待审核|待用户发货|待退库|待售后发货）
    permission: $api.order.modifyInfo.permission(),
    orderStatus: [
      AFTER_SALE_STATUS.WAIT_AUDIT,  
      AFTER_SALE_STATUS.WAIT_CUSTOMER_SEND,
      AFTER_SALE_STATUS.WAIT_RETURN_LIBRARY,
      AFTER_SALE_STATUS.WAIT_BUSINESS_SEND,
    ],
  },
  closeAfterSale: {   // 终止售后（待审核|待用户发货|待退库|待售后发货）
    permission: $api.order.closeAfterSale.permission(),
    orderStatus: [
      AFTER_SALE_STATUS.WAIT_AUDIT,
      AFTER_SALE_STATUS.WAIT_CUSTOMER_SEND,
      AFTER_SALE_STATUS.WAIT_RETURN_LIBRARY,
      AFTER_SALE_STATUS.WAIT_BUSINESS_SEND,
    ],
  },
  sendBack: {  // 确认用户寄回（待用户发货）
    permission: $api.order.sendBack.permission(),
    orderStatus: [
      AFTER_SALE_STATUS.WAIT_CUSTOMER_SEND, 
    ],
  },
  returnLibrary: {  // 商家收货（待退库）
    permission: $api.order.returnLibrary.permission(),
    orderStatus: [
      AFTER_SALE_STATUS.WAIT_RETURN_LIBRARY,
    ],
  },
  businessSend: {  // 确认商家寄出（待售后发货）
    permission: $api.order.businessSend.permission(),
    orderStatus: [AFTER_SALE_STATUS.WAIT_BUSINESS_SEND],
  },
  finaceVerify: {  // 财务审核（待财务审核）
    permission: $api.order.finaceVerify.permission(),
    orderStatus: [AFTER_SALE_STATUS.WAIT_FINANCE_AUDIT],
  },
  //-----------------售后相关按钮----------------end
}

export const hasBtn = (type, status) => {
  if (!type || !status) {
    return false
  }
  return btns[type].permission && btns[type].orderStatus.includes(status)
}

export const APPLY_TYPE = [{value: 1, name: "换货"}, {value: 2, name: "退货"}, {value: 4, name: "补发"}]
export const SALE_TYPE = [{value: 1, name: "换货"}, {value: 2, name: "退货"}, {value: 3, name: "补偿"}, {value: 4, name: "补发"}]
