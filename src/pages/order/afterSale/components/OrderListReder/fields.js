import {
  GoodsInfo,
  AfterSaleType,
  AfterSaleStatus,
  Address,
  ReturnAmount,
  AfterSaleAmount,
  ReturnAddress,
  // Handler,
  Operate,
} from './columnsRender'

// 获取售后列表
export const getColumnsFields = (removeFields = []) => {
  const defaultColums = [
    {
      title: '售后信息',
      span: 4,
      key: 'goodsInfo',
      render: (item, field) => {
        return <GoodsInfo item={item} field={field} key="goodsInfo" />
      },
    },
    {
      title: '售后金额',
      span: 1,
      key: 'afterSaleAmount',
      render: (item, field) => {
        return <AfterSaleAmount item={item} field={field} key="afterSaleAmount" />
      },
    },
    {
      title: '售后类型',
      span: 1,
      key: 'afterSaleType',
      render: (item, field) => {
        return (
          <AfterSaleType item={item} field={field} key="afterSaleType" />
        )
      },
    },
    {
      title: '售后状态',
      span: 1,
      key: 'afterSaleStatus',
      render: (item, field) => {
        return (
          <AfterSaleStatus item={item} field={field} key="afterSaleStatus" />
        )
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
      title: '实际退款',
      span: 1,
      key: 'returnAmount',
      render: (item, field) => {
        return <ReturnAmount item={item} field={field} key="returnAmount" />
      },
    },
    {
      title: '退库物流',
      span: 2,
      key: 'returnAddress',
      render: (item, field) => {
        return <ReturnAddress item={item} field={field} key="returnAddress" />
      },
    },
    // {
    //   title: '处理人',
    //   span: 1,
    //   key: 'handler',
    //   render: (item, field) => {
    //     return <Handler item={item} field={field} key="handler" />
    //   },
    // },
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
