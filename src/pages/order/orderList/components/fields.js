import moment from 'moment'
import { ORDER_STATUS } from '../../constants'
export const tabsFilds = [
  {
    title: '全部订单',
    value: '',
    key: 'total',
  },
  {
    title: '待付款',
    value: ORDER_STATUS.WAIT_PAY,
    key: 'wait_pay',
  },
  {
    title: '待发货',
    value: ORDER_STATUS.WAIT_SEND,
    key: 'wait_send',
  },
  {
    title: '待收货',
    value: ORDER_STATUS.WAIT_RECEIVE,
    key: 'wait_get',
  },
  {
    title: '已取消',
    value: ORDER_STATUS.CANCEL,
    key: 'cancel',
  },
  {
    title: '已完成',
    value: ORDER_STATUS.COMPLETE,
    key: 'end',
  },
  {
    title: '已售后',
    value: ORDER_STATUS.AFTER_SALE,
    key: 'have_service',
  },
]

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
      placeholder: '用户ID',
      inputProps: {
        type: 'number'
      }
    },
    {
      key: 'receiver_name',
      placeholder: '收货人姓名',
    },
  ]
}

