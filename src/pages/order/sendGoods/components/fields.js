import moment from 'moment'

export const getSearchFields = (orderType=[],orderSource=[]) => {
  return [
    {
      key: 'order_sn',
      placeholder: '订单号',
    },
    {
      key: 'time',
      searchKeys: ['start_at', 'end_at'],
      placeholder: ['下单开始时间', '结束时间'],
      // itemCol: 12,
      type: 'dateRange',
      inputProps: {
        disabledDate: current => {
          return (
            current < moment().subtract(3, 'months') ||
            current > moment().endOf('day')
          )
        },
      },
      initialValue: [moment().subtract(3, 'days'), moment()],
    },
    {
      key: 'nick_name',
      placeholder: '客户昵称',
    },
    {
      key: 'user_id',
      placeholder: '客户账号',
    },
    {
      key: 'type',
      placeholder: '订单类型',
      type: 'enum',
      enums: orderType,
    },
    {
      key: 'from',
      placeholder: '渠道',
      type: 'enum',
      enums: orderSource,
    },
  ]
}

