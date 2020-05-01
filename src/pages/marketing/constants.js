//优惠券类型
export const COUPON_TYPE = {
  CASH: 1,
  MONEY_OFF: 2,
  DISCOUNT: 3,
}

//优惠券状态
export const COUPON_STATUS = {
  UNPUBLISHED: 1,
  UNEXPIRED: 2,
  EXPIRED: 3,
  CANCELED: 4,
}

//适用商品类型
export const PRODUCT_TYPE = {
  ALL: 0,
  SPECIAL: 1,
}

//user type
export const USRE_TYPE = {
  ALL: 0,
  GROUP: 1,
  TAG: 2,
  TYPE: 3,
}

//send type
export const SEND_TYPE = {
  INITIATIVE: 0,
  NEW_USER: 1,
  USER_UPDATE: 2,
  RECHARGE: 3,
  CONSUME: 4,
}

//add coupon status: publish or save
export const EDIT_STATUS = {
  SAVE: 1,
  PUBLISH: 2,
}

//tiem over type
export const OVER_TYPE = {
  TIME: 1,
  DAYS: 2,
}

export const FORMAT = 'YYYY-MM-DD HH:mm'
export const TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss'

export const btns = {
  addCoupon: {
    permission: $api.coupon.addCoupon.permission(),
  },
  publishCoupon: {
    permission: $api.coupon.publishCoupon.permission(),
  },
  deleteCoupon: {
    permission: $api.coupon.deleteCoupon.permission(),
  },
  invalidCoupon: {
    permission: $api.coupon.invalidCoupon.permission(),
  },
  getCouponByIds: {
    permission: $api.coupon.getCouponByIds.permission(),
  },
  editCoupon: {
    permission: $api.coupon.editCoupon.permission(),
  },
  couponUseDetails: {
    permission: $api.coupon.couponUseDetails.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}
