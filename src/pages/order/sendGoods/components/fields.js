import moment from 'moment'

export const getSearchFields = () => {
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
      placeholder: '用户名',
    },
    {
      key: 'user_id',
      placeholder: '用户账号',
    },
    {
      key: 'from',
      placeholder: '渠道',
      type: 'enum',
      enums: [{
        "value": 1,
        "name": "微信"
      }, {
        "value": 2,
        "name": "APP"
      }, {
        "value": 3,
        "name": "小程序"
      }],
    },
  ]
}

