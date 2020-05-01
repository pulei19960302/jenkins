const database = [
  {
    id: '1',
    name: '控制台',
    icon: 'iconkongzhitai',
    route: '/dashboard',
    // menu_permissions: ['promotion-manage'],
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: '用户',
    icon: 'iconyonghuguanli1',
    menu_permissions: `${$api.user.userListEs.url},${$api.user.userLevelList.url},${$api.user.userLevelDetail.url},${$api.user.auditList.url}`
  },
  {
    id: '21',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: '用户列表',
    route: '/user/userList',
    menu_permissions: [$api.user.userListEs.url]
  },
  {
    id: '211',
    breadcrumbParentId: '21',
    menuParentId: '-1',
    name: '用户详情',
    route: '/user/userDetail/:id',
    menu_permissions: [$api.user.userDetail.url]
  },
  {
    id: '22',
    breadcrumbParentId: '2',
    menuParentId: '2',
    // name: '用户等级',
    name: '用户类型',
    route: '/user/userLevel',
    menu_permissions: [$api.user.userLevelList.url]
  },
  {
    id: '221',
    breadcrumbParentId: '22',
    menuParentId: '-1',
    name: '用户等级设置',
    route: '/user/userLevelSet',
    menu_permissions: [$api.user.userLevelDetail.url]
  },
  {
    id: '23',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: '用户审核',
    route: '/user/userAudit',
    menu_permissions: [$api.user.auditList.url]
  },
  {
    id: '24',
    breadcrumbParentId: '2',
    menuParentId: '2',
    name: '社群管理',
    route: '/user/userGroup',
    menu_permissions: [$api.user.groupList.url]
  },
  {
    id: '3',
    breadcrumbParentId: '1',
    name: '商品',
    icon: 'iconshangpin2',
    menu_permissions: `${$api.product.productESList.url},${$api.label.labelList.url},${$api.specs.list.url},${$api.brands.brandsList.url},${$api.category.categoryList.url},${$api.category.categoryList.url},${$api.supplier.supplierList.url}`
  },
  {
    id: '31',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '商品列表',
    route: '/product/productList',
    menu_permissions: [$api.product.productESList.url]
  },
  // {
  //   id: '31',
  //   breadcrumbParentId: '3',
  //   menuParentId: '3',
  //   name: '商品列表',
  //   route: '/product/list',
  //   menu_permissions: [$api.product.productESList.url]
  // },
  {
    id: '32',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '商品标签',
    route: '/product/labelList',
    menu_permissions: [$api.label.labelList.url]
  },
  // {
  //   id: '3233',
  //   breadcrumbParentId: '3',
  //   menuParentId: '3',
  //   name: '商品规格',
  //   route: '/product/specsList',
  //   menu_permissions: [$api.specs.list.url]
  // },
  {
    id: '32333',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '商品规格',
    route: '/product/norms',
    menu_permissions: [$api.specs.list.url]
  },
  {
    id: '33',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '商品品牌',
    route: '/product/brandsList',
    menu_permissions: [$api.brands.brandsList.url]
  },
  // {
  //   id: '34',
  //   breadcrumbParentId: '3',
  //   menuParentId: '3',
  //   name: '商品类目',
  //   route: '/product/categoryList',
  //   menu_permissions: [$api.category.categoryList.url]
  // },
  {
    id: '36',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '商品类目',
    route: '/product/categoryList',
    menu_permissions: [$api.category.categoryList.url]
  },
  {
    id: '35',
    breadcrumbParentId: '3',
    menuParentId: '3',
    name: '供应商',
    route: '/product/supplierList',
    menu_permissions: [$api.supplier.supplierList.url]
  },
  {
    id: '352',
    breadcrumbParentId: '35',
    menuParentId: '-1',
    name: '供应商新增/编辑',
    route: '/product/supplierEdit/:id',
    menu_permissions: [$api.supplier.supplierDetail.url]
  },
  {
    id: '4',
    breadcrumbParentId: '1',
    name: '订单',
    icon: 'icondingdan',
    menu_permissions: `${$api.order.orderList.url},${$api.order.sendGoodsList.url},${$api.order.afterSaleList.url},${$api.order.refundAuditList.url}`
  },
  {
    id: '41',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: '订单列表',
    route: '/order/orderList',
    menu_permissions: [$api.order.orderList.url]
  },
  {
    id: '42',
    breadcrumbParentId: '41',
    menuParentId: '-1',
    name: '订单详情',
    route: '/order/orderDetail/:id',
    menu_permissions: [$api.order.getOrderDetail.url]
  },
  {
    id: '43',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: '发货管理',
    route: '/order/sendGoods',
    menu_permissions: [$api.order.sendGoodsList.url]
  },
  {
    id: '44',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: '售后管理',
    route: '/order/afterSale',
    menu_permissions: [$api.order.afterSaleList.url],
  },
  {
    id: '45',
    breadcrumbParentId: '4',
    menuParentId: '4',
    name: '退款审核',
    route: '/order/refundAudit',
    menu_permissions: [$api.order.refundAuditList.url],
  },
  {
    id: '5',
    breadcrumbParentId: '-1',
    name: '财务',
    icon: 'iconcaiwuicon-04',
    menu_permissions:
      `${$api.finance.financeList.url},${$api.finance.userAccountList.url},${$api.finance.returnProfitList.url},
    ${$api.finance.afterSaleList.url},${$api.finance.supplierList.url},${$api.finance.transferList.url}`
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '财务总览',
    route: '/finance/financeList',
    menu_permissions: [$api.finance.financeList.url],
  },
  {
    id: '52',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '账户明细',
    route: '/finance/userAccountList',
    menu_permissions: [$api.finance.userAccountList.url],
  },
  {
    id: '53',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '返利明细',
    route: '/finance/returnProfitList',
    menu_permissions: [$api.finance.returnProfitList.url],
  },
  {
    id: '54',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '售后明细',
    route: '/finance/afterSaleList',
    menu_permissions: [$api.finance.afterSaleList.url],
  },
  // {
  //   id: '915',
  //   breadcrumbParentId: '91',
  //   menuParentId: '91',
  //   name: '商品利润明细',
  //   route: '/finance/productProfitList',
  // },
  {
    id: '56',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '商家货款',
    route: '/finance/supplierList',
    menu_permissions: [$api.finance.supplierList.url],
  },

  {
    id: '57',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: '提现/转账',
    route: '/finance/transferList',
    menu_permissions: [$api.finance.transferList.url],
  },
  // {
  //   id: '931',
  //   breadcrumbParentId: '93',
  //   menuParentId: '93',
  //   name: '总账',
  //   route: '/finance/totalAccount',
  // },
  // {
  //   id: '932',
  //   breadcrumbParentId: '93',
  //   menuParentId: '93',
  //   name: '明细账',
  //   route: '/finance/detailAccount',
  // },
  // {
  //   id: '10',
  //   breadcrumbParentId: '-1',
  //   name: '计费系统',
  //   // icon: 'account-book',
  //   route: '/finance/chargeSystem',
  // },
  {
    id: '6',
    breadcrumbParentId: '-1',
    name: '应用',
    icon: 'iconyingyong',
    menu_permissions: `${$api.coupon.list.url}`,
  },
  {
    id: '61',
    breadcrumbParentId: '6',
    menuParentId: '6',
    name: '优惠券列表',
    route: '/marketing/couponList',
    menu_permissions: [$api.coupon.list.url],
  },
  {
    id: '62',
    breadcrumbParentId: '62',
    menuParentId: '-1',
    name: '优惠券详情',
    route: '/marketing/couponEdit/:id?',
  },
  //   {
  //     id: '5',
  //     breadcrumbParentId: '1',
  //     name: '编辑器Demo',
  //     icon: 'edit',
  //     route: '/editorDemo',
  //   },
  {
    id: '7',
    breadcrumbParentId: '1',
    name: '装修',
    icon: 'iconzhuangxiumianji',
    menu_permissions: `${$api.shop.getPageList.url}`,
  },
  {
    id: '71',
    breadcrumbParentId: '7',
    menuParentId: '7',
    name: '页面管理',
    route: '/shop/pageList',
    menu_permissions: [$api.shop.getPageList.url],
  },
  {
    id: '72',
    breadcrumbParentId: '7',
    menuParentId: '-1',
    name: '店铺装修',
    route: '/shop/decoration/:id',
  },
  {
    id: '8',
    breadcrumbParentId: '-1',
    name: '数据',
    icon: 'iconbarchart',
  },
  {
    id: '81',
    breadcrumbParentId: '8',
    menuParentId: '8',
    name: '数据统计',
    route: '/statistics/demo'
  },
  {
    id: '9',
    breadcrumbParentId: '-1',
    name: '客服',
    icon: 'iconcustomerservice',
    menu_permissions: `${$api.workorder.getServiceList.url},${$api.workorder.list.url},${$api.workorder.getTypeList.url}`
  },
  {
    id: '91',
    breadcrumbParentId: '9',
    menuParentId: '9',
    name: '客服会话',
    route: '/customerService/conversation',
    menu_permissions: [$api.workorder.getServiceList.url]
  },
  // {
  //   id: '92',
  //   breadcrumbParentId: '9',
  //   menuParentId: '9',
  //   name: '工单列表',
  //   route: '/customerService/workOrderList',
  //   menu_permissions: [$api.workorder.list.url],
  // },
  // {
  //   id: '93',
  //   breadcrumbParentId: '9',
  //   menuParentId: '9',
  //   name: '工单分类',
  //   route: '/customerService/workOrderTypes',
  //   menu_permissions: [$api.workorder.getTypeList.url],
  // },
  // {
  //   id: '94',
  //   breadcrumbParentId: '9',
  //   menuParentId: '9',
  //   name: '应答管理',
  //   route: '/customerService/replayManage',
  // },
  // {
  //   id: '95',
  //   breadcrumbParentId: '9',
  //   menuParentId: '9',
  //   name: '调度管理',
  //   route: '/customerService/dispatchManage',
  // },
  // {
  //   id: '96',
  //   breadcrumbParentId: '9',
  //   menuParentId: '9',
  //   name: '数据管理',
  //   route: '/customerService/dataManage',
  // },
  {
    id: '10',
    breadcrumbParentId: '-1',
    name: '设置',
    icon: 'iconsetting',
    menu_permissions:
      `${$api.system.setRebate.url},${$api.common.getFreightTemplate.url},${$api.permissions.getDepartmentList.url},
    ${$api.permissions.getRolesList.url},${$api.common.getFreightTemplate.url},${$api.system.getCompany.url},
    ${$api.system.getTradeInfo.url},${$api.system.getUserInfo.url},${$api.system.getRebate.url}`,
  },
  {
    id: '101',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '返利设置',
    route: '/system/rebateSet',
    menu_permissions: [$api.system.getRebate.url],
  },
  {
    id: '108',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '积分设置',
    route: '/system/integralSet',
    menu_permissions: `${$api.system.getIntegral.url}`
  },
  {
    id: '102',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '配送设置',
    route: '/shipping/delivery',
    menu_permissions: `${$api.common.getFreightTemplate.url}`,
  },
  {
    id: '103',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '权限管理',
    route: '/permissions',
    menu_permissions: `${$api.permissions.getDepartmentList.url},${$api.permissions.getRolesList.url}`,
  },
  {
    id: '104',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '交易设置',
    route: '/system/tradeSet',
    menu_permissions: [$api.system.getTradeInfo.url],
  },
  {
    id: '105',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '平台设置',
    route: '/shopInformation',
    menu_permissions: [$api.system.getCompany.url],
  },
  // {
  //   id: '106',
  //   breadcrumbParentId: '10',
  //   menuParentId: '10',
  //   name: '用户设置',
  //   route: '/system/userSet',
  //   menu_permissions: [$api.system.getUserInfo.url],
  // },
  {
    id: '107',
    breadcrumbParentId: '10',
    menuParentId: '10',
    name: '协议与条款',
    route: '/system/agreement',
    menu_permissions: [$api.system.getAgreementList.url]
  },
  // 108 积分设置， 已存在

]


console.log("$api.system", $api.system)
export default database
