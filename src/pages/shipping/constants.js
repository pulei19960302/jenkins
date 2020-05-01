//商家配送-tab页
export const DELIVEY_TABS = {
  TEMPLATE: 1,
  EXPRESS: 2,
  INSURANCE: 3,
}

//商家配送-运费模板-计价方式
export const VALUATION_WAY = {
  NUMBER: 1,
  WEIGHT: 2,
}
export const VALUATION_FIELDS = {
  [VALUATION_WAY.NUMBER]: '按件数',
  [VALUATION_WAY.WEIGHT]: '按重量',
}

//商家配送-运费模板-状态
export const TEMPLATE_STATUS = {
  DISABLED: 1,
  ENABLED: 2,
}
export const TEMPLATE_FIELDS = {
  [TEMPLATE_STATUS.DISABLED]: '禁用',
  [TEMPLATE_STATUS.ENABLED]: '启用',
}

//商家配送-物流公司状态
export const EXPRESS_STATUS = {
  DISABLED: 1,
  ENABLED: 2,
}
export const EXPRESS_FIELDS = {
  [EXPRESS_STATUS.DISABLED]: '禁用',
  [EXPRESS_STATUS.ENABLED]: '启用',
}

//商家配送-运费险状态
export const INSURANCE_STATUS = {
  DISABLED: 1,
  ENABLED: 2,
}
export const INSURANCE_FIELDS = {
  [INSURANCE_STATUS.DISABLED]: '禁用',
  [INSURANCE_STATUS.ENABLED]: '启用',
}

export const btns = {
  swicthTemplateStatus: {
    permission: $api.shipping.swicthTemplateStatus.permission(),
  },
  deleteTemplates: {
    permission: $api.shipping.deleteTemplates.permission(),
  },
  addTemplate: {
    permission: $api.shipping.addTemplate.permission(),
  },
  templateDetails: {
    permission: $api.shipping.templateDetails.permission(),
  },
  updateTemplate: {
    permission: $api.shipping.updateTemplate.permission(),
  },
  switchExpressStatus: {
    permission: $api.shipping.switchExpressStatus.permission(),
  },
  deleteExpress: {
    permission: $api.shipping.deleteExpress.permission(),
  },
  updateExpress: {
    permission: $api.shipping.updateExpress.permission(),
  },
  addExpress: {
    permission: $api.shipping.addExpress.permission(),
  },
  switchInsuranceStatus: {
    permission: $api.shipping.switchInsuranceStatus.permission(),
  },
  deleteInsurance: {
    permission: $api.shipping.deleteInsurance.permission(),
  },
  addInsurance: {
    permission: $api.shipping.addInsurance.permission(),
  },
  updateInsurance: {
    permission: $api.shipping.updateInsurance.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}
