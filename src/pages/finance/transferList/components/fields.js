
import moment from 'moment'
import { Popover } from 'antd';
import styles from '../index.less'
import { FORMAT, DATE_RANGE, WITHDRAW_STATUS, WITHDRAW_STATUS_FIELDS as statusFields } from '../../constants'

export const getSearchFields = function (types, payWay) {

  const statusList = statusFields && Object.keys(statusFields).reduce((total, value) => (
    total.concat([{ value, name: statusFields[value] }])
  ), [])

  const typesList = types && Object.keys(types).reduce((total, value) => (
    total.concat([{ value, name: types[value] }])
  ), [])

  const payWayList = payWay && Object.keys(payWay).reduce((total, value) => (
    total.concat([{ value, name: payWay[value] }])
  ), [])

  const statusEnums = statusList ? [
    { value: '', name: '全部交易状态' },
    ...statusList,
  ] : [{ value: '', name: '全部交易状态' }]

  const typeEnums = typesList ? [
    { value: '', name: '全部交易类型' },
    ...typesList,
  ] : [{ value: '', name: '全部交易类型' }]

  const payWayEnums = typesList ? [
    { value: '', name: '全部交易渠道' },
    ...payWayList,
  ] : [{ value: '', name: '全部交易渠道' }]

  return [
    {
      type: 'enum',
      key: 'status',
      placeholder: '全部交易状态',
      enums: statusEnums,
    },
    // {
    //   type: 'enum',
    //   key: 'type',
    //   placeholder: '全部交易类型',
    //   enums: typeEnums,
    // },
    {
      key: 'timeType',
      type: 'enum',
      placeholder: '交易申请时间',
      enums: [
        { value: 0, name: '交易申请时间' },
        { value: 1, name: '交易完成时间' },
      ],
      inputProps: {
        onSelect: this.onChangeTimeType,
      },
    },
    {
      type: 'dateRange',
      key: 'time',
      searchKeys: ['start_time', 'end_time'],
      placeholder: ['开始时间', '结束时间'],
      inputProps: {
        ranges: DATE_RANGE,
      },
      initialValue: [moment().subtract(30, 'days'), moment()],
    },
    {
      key: 'member_id',
      placeholder: '用户ID',
    },
    {
      key: 'order_no',
      placeholder: '交易单号',
    },
    {
      key: 'pay_way',
      type: 'enum',
      enums: payWayEnums,
      placeholder: '全部交易渠道',
    },
  ]
}

export const getColumns = function (payWay) {
  return [
    {
      title: '申请时间',
      dataIndex: 'created_at',
      render: (text, row) => {
        if (!text) return null
        return <span>{moment(text * 1000).format(FORMAT.DATETIME)}</span>
      }
    },
    {
      title: '交易单号',
      dataIndex: 'order_no',
    },
    {
      title: '用户名 / ID',
      dataIndex: 'nickname',
      render: (text, row) => (
        <span>{text}&nbsp;/&nbsp;{row.member_id}</span>
      ),
    },
    {
      title: '交易金额',
      dataIndex: 'money',
      money: true,
    },
    {
      title: '交易渠道',
      dataIndex: 'pay_way',
      render: (text) => (
        <span>{payWay && payWay[text]}</span>
      )
    },
    {
      title: '交易状态',
      dataIndex: 'status',
      render: (text) => (
        <span>{statusFields[text]}</span>
      ),
    },
    {
      title: '完成时间',
      dataIndex: 'updated_at',
      render: (text) => (
        <span>{text && moment(text * 1000).format(FORMAT.DATETIME)}</span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row) => {
        if (row.status === WITHDRAW_STATUS.APPLY_FOR) {
          return (
            $api.finance.transferCheck.permission() && (
              <a onClick={() => { this.toggleReviewModal(row, true) }}>审核</a>
            )
          )
        }
        return (
          <a onClick={() => { this.toggleReviewModal(row) }}>查看</a>
        )
      }
    },
  ]
}