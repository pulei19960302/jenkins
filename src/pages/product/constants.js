export const btns = {
  editProduct: {
    permission: $api.product.editProduct.permission(),
  },
  addProduct: {
    permission: $api.product.addProduct.permission(),
  },
  productHandle: {
    permission: $api.product.productHandle.permission(),
  },
  productDetail: {
    permission: $api.product.productDetail.permission(),
  },
  productPreStart: {
    permission: $api.product.productPreStart.permission(),
  },
  productDelete: {
    permission: $api.product.productDelete.permission(),
  },
  productEditLabel: {
    permission: $api.product.productEditLabel.permission(),
  },
  productExport: {
    permission: $api.product.productExport.permission(),
  },
}

export const hasBtn = (type) => {
  if (!type) {
    return false
  }
  return btns[type].permission
}

export const PRODUCT_STATUS = {
  PRELOADING: '1',
  UPPER_SHELF: '2',
  LOWER_SHELF: '3',
  EARLY_WARNING: '4',
  SELL_OUT: '5'
}

export const PRODUCT_STATUS_NAME = {
  0: '已删除',
  1: '预上架',
  2: '已上架',
  3: '已下架',
  4: '预警',
  5: '已售罄'
}
