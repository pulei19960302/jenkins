export default {
  financeList: '/finance/overview/index',
  userAccountList: '/member-capital/list',
  updateMoney: 'POST /member-capital/updateMoney',
  returnProfitList: '/finance/rebate/index', //返利明细-列表
  getRebateDetail: 'POST /finance/rebate/get-detail', //返利明细-详情
  afterSaleList: '/finance/sales/index',
  supplierList: '/finance/good-payment/index',
  suppilerDetails: '/finance/good-payment/list',
  editRemark: 'POST /finance/good-payment/edit-remark',
  settle: 'POST /finance/good-payment/settle', //结算货款 
  transferList: '/withdraw/index', 
  transferCheck: 'POST /withdraw/audit',
  financeExport: '/finance/overview/export',
  userAccountExport: '/member-capital/export',
  returnProfitExport: '/finance/rebate/export',
  afterSaleExport: '/finance/sales/export',
  settleExport: '/withdraw/export',
  supplierExport: '/finance/good-payment/export',
  detailExport: '/finance/good-payment/list-export', //货款明细导出
}