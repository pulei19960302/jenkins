import _ from 'lodash'

function getToInjectList(dataList) {
  if (dataList === null) { return [] }
  return dataList.map((item) => ({
    goods_id: item.goods_id,
    title: item.title,
    main_img: item.main_img,
    shop_price: item.shop_price,
    total_stock: item.total_stock,
    checked: false,
  }))
}

export const getInitialSelectedProduct = (dataList, currentPage) => {
  let dist = {}
  let toInjectList = getToInjectList(dataList)
  dist[currentPage] = toInjectList
  return dist
}

export const getInjetcedSelectedProduct = (dataList, currentPage, selectedProduct) => {
  let cloneSelectedProduct = _.cloneDeep(selectedProduct)
  let toInjectList = getToInjectList(dataList)
  cloneSelectedProduct[currentPage] = toInjectList
  return cloneSelectedProduct
}
