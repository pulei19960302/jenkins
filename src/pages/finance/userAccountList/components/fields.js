import account from 'accounting'
import moment from 'moment'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FORMAT, TRADE_TYPES, DATE_RANGE, TRADE_STATUS_FIELDS as statusFields, BALANCE_FIELDS as balanceFields } from '../../constants'

export const getSearchFields = function (type/* , timeSearchKeys */) {

  const status = Object.keys(statusFields).reduce((total, value) => (
    total.concat([{ value, name: statusFields[value] }])
  ), [])

  const types = type && Object.keys(type) && Object.keys(type).reduce((total, value) => (
    total.concat([{ value, name: type[value] }])
  ), [])

  const balance = Object.keys(balanceFields).reduce((total, value) => (
    total.concat([{ value, name: balanceFields[value] }])
  ), [])

  const statusEnums = status ? [
    { value: '', name: '全部交易状态' },
    ...status,
  ] : [{ value: '', name: '全部交易状态' }]

  const typeEnums = types ? [
    { value: '', name: '全部交易类型' },
    ...types,
  ] : [{ value: '', name: '全部交易类型' }]

  const balanceEnums = balance ? [
    { value: '', name: '全部资金类型' },
    ...balance,
  ] : [{ value: '', name: '全部资金类型' }]

  return [
    {
      key: 'member_id',
      placeholder: '请输入客户账号/客户ID搜索',
    },
    {
      key: 'type',
      placeholder: '全部交易类型',
      enums: typeEnums,
    },
    {
      key: 'status',
      placeholder: '全部交易状态',
      enums: statusEnums,
    },
    {
      key: 'balance_type',
      placeholder: '全部资金类型',
      enums: balanceEnums,
    },
    {
      key: 'order_no',
      placeholder: '交易单号',
    },
    {
      key: 'timeType',
      placeholder: '交易初始时间',
      enums: [
        { value: 0, name: '交易初始时间' },
        { value: 1, name: '交易完成时间' }
      ],
      inputProps: {
        defaultValue: 0,
      },
    },
    {
      type: 'dateRange',
      key: 'time',
      searchKeys: ['start_time', 'end_time'],
      placeholder: ['开始时间', '结束时间'],
      inputProps: {
        ranges: DATE_RANGE,
        disabledDate: current => {
          return (
            current < moment().subtract(3, 'months') ||
            current > moment().endOf('day')
          )
        },
      },
      initialValue: [moment().subtract(30, 'days'), moment()],
    },
  ]
}

export const getColumns = function (type) {
  return [
    {
      title: '交易初始时间',
      dataIndex: 'created_at',
      render: (text, row) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      )
    },
    {
      title: '客户账号',
      width: '200',
      dataIndex: 'nickname',
      render: (text, row) => {
        return <span>{text}&nbsp;({row.member_id})</span>
      },
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      render: (text) => (<span>{type && type[text]}</span>),
    },
    {
      title: '交易金额',
      dataIndex: 'money',
      render: (text = '', row) => {
        const { type = '' } = row
        switch (type) {
          case TRADE_TYPES.CUT_MONEY:
          case TRADE_TYPES.PLACE_ORDER:
          case TRADE_TYPES.AFTERSALE_DEDUCTION:
          case TRADE_TYPES.AFTERSALE_INCOME:

            return (
              <div>
                <span>
                  <ArrowRightOutlined style={{ color: '#70b603', fontSize: '12px' }} />
                  &nbsp;{account.formatMoney(Math.abs(text), '￥')}
                </span>
              </div>
            );
          case TRADE_TYPES.ADD_MONEY:
          case TRADE_TYPES.CANCEL_ORDER:
          case TRADE_TYPES.AFTERSALE_REFUND:
          case TRADE_TYPES.AFTERSALE_EXPEND:
          case TRADE_TYPES.ORDER_RETURN:
            return (
              <div>
                <span>
                  <ArrowLeftOutlined style={{ color: '#d9001b', fontSize: '12px' }} />
                  &nbsp;{account.formatMoney(Math.abs(text), '￥')}
                </span>
              </div>
            );
          case TRADE_TYPES.ONLINE_RECHARGE:
            return (
              <div>
                <span>
                  <ArrowRightOutlined style={{ color: '#70b603', fontSize: '12px' }} />
                  &nbsp;{account.formatMoney(Math.abs(text), '￥')}
                </span>
              </div>
            );
          case TRADE_TYPES.WITHDRAW_CASH:
          case TRADE_TYPES.SWICTH:
            return null
        }
      },
    },
    {
      title: '交易状态',
      dataIndex: 'status',
      render: (text) => (<span>{statusFields[text]}</span>)
    },
    {
      title: '余额',
      dataIndex: 'balance',
      money: true,
    },
    {
      title: '佣金',
      dataIndex: 'reward',
      money: true,
    },
    {
      title: '交易完成时间',
      dataIndex: 'updated_at',
      render: (text) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        const { type = '' } = row
        switch (type) {
          case TRADE_TYPES.PLACE_ORDER:
          case TRADE_TYPES.CANCEL_ORDER:
          case TRADE_TYPES.AFTERSALE_DEDUCTION:
            return <a onClick={() => { this.routeToOrder(row) }}>查看明细</a>
          case TRADE_TYPES.AFTERSALE_REFUND:
            return <a onClick={() => { this.onOpenAfterModal(row) }}>查看明细</a>
          case TRADE_TYPES.AFTERSALE_INCOME:
          case TRADE_TYPES.AFTERSALE_EXPEND:
            return <a onClick={() => { this.onOpenAfterModal(row, 'sales') }}>查看明细</a>
          case TRADE_TYPES.ADD_MONEY:
          case TRADE_TYPES.CUT_MONEY:
            return <a onClick={() => { this.onOpenDeductionModal(row) }}>查看明细</a>
          case TRADE_TYPES.ONLINE_RECHARGE:
            return <a onClick={() => { this.onOpenDetailsModal(row) }}>查看明细</a>
        }
      }
    },
  ];
}