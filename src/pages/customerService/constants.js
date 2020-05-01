export const FORMAT = 'YYYY-MM-DD HH:mm:ss'

//工单
export const WORK_STATUS = {
  PROGRESS: 1,
  CLOSED: 2,
  INVALID: 3,
}

export const ORDER_STATUS = {
  ORDER: 1,
  AFTERSALE: 2,
}

//应答管理-tab页
export const MANAGE_TABS = {
  SELF_SERVICE: 1,
  AUTO_RESPNSE: 2,
}

export const RESPONSE_TYPE = {
  TEXT: 1,
  IMAGE_TEXT: 2,
}

//调度管理
export const DISPATCH_TABS = {
  BUSINESS: 1,
  CONVERSATION: 2,
}

export const BUSINESS_STATUS = {
  DISABLED: 1,
  ENABLED: 2,
}

export const MESSAGE_SET_STATUS = {
  DISABLED: 1,
  ENABLED: 2,
}

//数据管理
export const DATA_TABS = {
  CONVERSATION: 1,
  SERVICE: 2,
}

//客服账号/客户账号查询
export const ACCOUNT_QUERY = {
   SERVICE: 1,
   CLIENT: 2,
}

export const SOURCE_TYPE = {
  ORDER: 1, 
  AFTERSALE: 2,
  PRODUCT: 3,
}


export const btns = {
  transfer: {
    permission: $api.workorder.transfer.permission(),
  },
  close: {
    permission: $api.workorder.close.permission(),
  },
  details: {
    permission: $api.workorder.details.permission(),
  },
  addRelation: {
    permission: $api.workorder.addRelation.permission(),
  },
  deleteTypes: {
    permission: $api.workorder.deleteTypes.permission(),
  },
  addEditTypes: {
    permission: $api.workorder.addEditTypes.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}
