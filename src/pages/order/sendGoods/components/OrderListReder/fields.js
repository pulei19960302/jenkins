import {
  GoodsInfo,
  OrderType,
  Address,
  Logistics,
  ActualAmount,
  Operate,
} from './columnsRender'

// 获取发货列表
export const getColumnsFields = (removeFields = []) => {
  const defaultColums = [
    {
      title: '商品信息',
      span: 4,
      key: 'goodsInfo',
      render: (item, field) => {
        return <GoodsInfo item={item} field={field} key="goodsInfo" />
      },
    },
    {
      title: '订单类型',
      span: 1,
      key: 'orderType',
      render: (item, field) => {
        return <OrderType item={item} field={field} key="orderType" />
      },
    },
    {
      title: '收货信息',
      span: 2,
      key: 'address',
      render: (item, field) => {
        return <Address item={item} field={field} key="address" />
      },
    },
    {
      title: '物流信息',
      span: 2,
      key: 'logistics',
      render: (item, field) => {
        return <Logistics item={item} field={field} key="logistics" />
      },
    },
    {
      title: '实付金额',
      span: 2,
      key: 'actualAmount',
      render: (item, field) => {
        return <ActualAmount item={item} field={field} key="actualAmount" />
      },
    },
    {
      title: '操作',
      span: 1,
      key: 'operate',
      render: (item, field, context) => {
        return (
          <Operate item={item} field={field} context={context} key="operate" />
        )
      },
    },
  ]
  const columns = defaultColums.filter(item => {
    return !removeFields.includes(item.key)
  })
  return columns
}
