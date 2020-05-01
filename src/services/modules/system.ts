export default {
  // 返利设置相关
  setRebate: 'POST /config/set-rebate',
  getRebate: '/config/get-rebate',
  getRebateShowName: 'POST /config/get-rebate-show-name',

  // 积分设置相关
  setIntegral: 'POST /config/set-integral-config',
  getIntegral: 'POST /config/get-integral-config',

  // 店铺信息获取base
  getCompany: '/company/info',
  saveCompanyBase: 'POST /company/base',
  saveCompanyOperator: 'POST /company/operator',
  saveCompanyAuth: 'POST /company/license',

  saveCompany:　'POST /company/update',

  //协议与条款
  getAgreementList: '/company-agreement/list',
  switchStatus: 'POST /company-agreement/change-status',
  getAgreementInfo: '/company-agreement/info',
  addAgreement: 'POST /company-agreement/add',
  updateAgreement: 'POST /company-agreement/edit',
  deleteAgreement: 'POST /company-agreement/delete',

  //交易设置
  getTradeInfo: 'POST /config/get-trade-config',
  setTradeInfo: 'POST /config/set-trade-config',

  //用户设置
  setUserInfo: 'POST /config/set-user',
  getUserInfo: '/config/get-user',
}
