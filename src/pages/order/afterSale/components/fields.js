import moment from 'moment'
import { AFTER_SALE_STATUS } from '../../constants'


export const tabsFilds = [
  {
    title: '全部',
    value: '',
    key: 'total',
  },
  {
    title: '待审核',
    value: AFTER_SALE_STATUS.WAIT_AUDIT,
    key: 'wait_verify',
  },
  {
    title: '补发中',
    value: AFTER_SALE_STATUS.IN_REISSUE,
    key: 'reissue_ing',
  },
  {
    title: '退货中',
    value: AFTER_SALE_STATUS.IN_RETURN,
    key: 'return_goods_ing',
  },
  {
    title: '换货中',
    value: AFTER_SALE_STATUS.IN_EXCHANGE,
    key: 'change_goods_ing',
  },
  {
    title: '退款中',
    value: AFTER_SALE_STATUS.WAIT_FINANCE_AUDIT,
    key: 'return_finance_ing',
  },
  {
    title: '售后完成',
    value: AFTER_SALE_STATUS.END,
    key: 'sales_done',
  },
  {
    title: '已关闭',
    value: AFTER_SALE_STATUS.CLOSE,
    key: 'sales_closed',
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
      key: 'return_sn',
      placeholder: '服务单号',
    },
    {
      key: 'receiver_name',
      placeholder: '收货人姓名',
    },
    {
      key: 'user_id',
      placeholder: '客户ID',
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
