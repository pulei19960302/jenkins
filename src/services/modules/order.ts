export default {
  //订单列表和发货列表
  orderList: '/order/list',
  orderSta: '/order/stat',
  modifyRemark: 'POST /order/modify-remark',
  modifyAddress:'POST /order/modify-receiver',
  getOrderDetail: '/order/detail',
  sendGoodsList: '/order/deliver-list',
  modifyLogistics: 'POST /order/modify-logistics', // 修改、发货公用 （only_logistics 0发货，1修改）
  getLogistics: '/order/logistics-history',
  batchSendGoods: '/order/onebutton-sends',
  orderImport: '/order/deliver-import',
  //售后相关
  checkApply: '/post-sales/check-apply', 
  getSaleReason: 'POST /post-sales-reason/get-all-reason',
  applyAfterSale: 'POST /post-sales/apply',
  afterSaleList: '/post-sales/list',
  afterSaleSta: '/post-sales/sales-list-stat',
  refundAuditList: '/post-sales/refund-list',  
  refundAuditSta: '/post-sales/refund-list-stat', 
  closeAfterSale:  'POST /post-sales/sale-closed',
  modifyInfo: 'POST /post-sales/modify-info',
  confirmAfterSale: 'POST /post-sales/verify-apply',
  sendBack: 'POST /post-sales/sure-enduser-send',
  returnLibrary: 'POST /post-sales/get-enduser-send',
  businessSend: 'POST /post-sales/store-sure-send',
  finaceVerify: 'POST /post-sales/finance-verify',
  getAfterSaleDetail: '/post-sales/detail',
  afterSaleDownload: '/post-sales/export',
  refundAuditDownload: '/post-sales/refund-list-export'
}