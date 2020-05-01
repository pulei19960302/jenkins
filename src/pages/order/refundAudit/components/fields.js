import moment from 'moment'
import { AFTER_SALE_STATUS } from '../../constants'

export const tabsFilds = [
  {
    title: '待审核',
    value: AFTER_SALE_STATUS.WAIT_FINANCE_AUDIT,
    key: 'wait_finance_apply',
  },
  {
    title: '同意退款',
    value: AFTER_SALE_STATUS.COMPLETE,
    key: 'agree_return_finance',
  },
  {
    title: '驳回退款',
    value: AFTER_SALE_STATUS.REFUSE_REFUND,
    key: 'refuse_return_finance',
  },
]

export const getSearchFields = (enums = []) => {
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
      key: 'sales_id',
      placeholder: '服务单号',
    },
    {
      key: 'receiver_name',
      placeholder: '收货人姓名',
    },
    {
      key: 'user_id',
      placeholder: '用户ID',
    }
    // {
    //   key: 'goods_fee',
    //   placeholder: '商品名称',
    // },
    // {
    //   key: 'status',
    //   placeholder: '售后类型',
    //   type: 'enum',
    //   enums: enums,
    // },
    // {
    //   key: 'receiver_name',
    //   placeholder: '收货人电话',
    // },
  ]
} 
