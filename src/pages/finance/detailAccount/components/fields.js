import {DATE_RANGE} from '../../constants'
export const searchFields = (typeEnums = [], statusEnums = []) => (
  [
    {
      key: '用户',
      placeholder: '用户',
    },
    {
      key: '系统订单号',
      placeholder: '系统订单号',
    },
    {
      key: '银行交易号',
      placeholder: '银行交易号',
    },
    {
      key: '交易类型',
      placeholder: '交易类型',
      type: 'enum',
      // enums: typeEnums,
      enums: [
        { value: '-1', name: '全部' },
        { value: '0', name: '充值' },
        { value: '1', name: '提现' },
        { value: '2', name: '转账' },
        { value: '3', name: '微信下单' },
        { value: '4', name: '余额下单' },
      ],
    },
    {
      key: '对账状态',
      placeholder: '对账状态',
      type: 'enum',
      // enums: statusEnums,
      enums: [
        { value: '-1', name: '全部' },
        { value: '0', name: '未对账' },
        { value: '1', name: '已对帐' },
        { value: '2', name: '异常' },
        { value: '3', name: '已冲正' },
      ],
    },
    {
      key: '对账时间',
      placeholder: ['对账时间', '结束日期'],
      searchKeys: ['start', 'end'],
      type: 'dateRange',
    },
    {
      key: '订单创建时间',
      placeholder: ['订单创建时间', '结束日期'],
      searchKeys: ['start_1', 'end_1'],
      type: 'dateRange',
      inputProps: {
        ranges: DATE_RANGE,
      },
    },
  ]
)

export const getColumns = function () {
  return [
    {
      title: '用户ID',
      dataIndex: '用户ID',
    },
    {
      title: '用户名',
      dataIndex: '用户名',
    },
    {
      title: '交易类型',
      dataIndex: '交易类型',
    },
    {
      title: '支付类型',
      dataIndex: '支付类型',
    },
    {
      title: '系统订单号',
      dataIndex: '系统订单号',
    },
    {
      title: '银行交易号',
      dataIndex: '银行交易号',
    },
    {
      title: '金额',
      dataIndex: '金额',
    },
    {
      title: '对账人员',
      dataIndex: '对账人员',
    },
    {
      title: '对账时间',
      dataIndex: '对账时间',
    },
    {
      title: '备注',
      dataIndex: '备注',
    },
    {
      title: '手续费',
      dataIndex: '手续费',
    },
    {
      title: '对账状态',
      dataIndex: '对账状态',
    },
    {
      title: '订单创建时间',
      dataIndex: '订单创建时间',
    },
    {
      title: '订单支付时间',
      dataIndex: '订单支付时间',
    },
    {
      title: '对账时间',
      dataIndex: '对账时间',
    },
    {
      title: '操作',
      dataIndex: '操作',
      render: () => { },
    },
  ]
}