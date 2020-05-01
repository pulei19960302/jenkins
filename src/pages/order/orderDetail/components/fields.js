import { Badge, Divider } from 'antd'
import account from 'accounting'
// import { ORDER_STATUS } from '../../constants'

// 订单详情售后信息
export const afterSaleColumns = [
  {
    title: '售后节点',
    dataIndex: 'id',
  },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   render: text => <Badge status="processing" text={text} />,
  // },
  {
    title: '状态',
    dataIndex: 'content',
  },
  {
    title: '完成时间',
    dataIndex: 'created_at',
  },
  // {
  //   title: '实际退款金额',
  //   dataIndex: 'goods_id',
  // },
  // {
  //   title: '补偿金额',
  //   dataIndex: 'goods_title',
  // },
  // {
  //   title: '售后和扣除金额',
  //   dataIndex: 'sku_properties_name',
  // },
  {
    title: '操作人',
    dataIndex: 'deal_name',
  },
  // {
  //   title: '备注',
  //   dataIndex: 'receiver_mobile',
  // },
]
// 订单详情财务
export const getFinanceColumns = function(){
  return [
    {
      title: '账户名称',
      dataIndex: 'order_user_name',
    },
    {
      title: '实付金额',
      dataIndex: 'actual_fee',
      render: text=><span>{account.formatMoney(text,'￥')}</span>
    },
    {
      title: '运费',
      dataIndex: 'freight_fee',
      render: text=><span>{account.formatMoney(text,'￥')}</span>
    },
    {
      title: '运费险',
      dataIndex: 'insurance_fee',
    },
    {
      title: '优惠明细',
      dataIndex: 'coupon',
      render: text=><span>省{account.formatMoney(text,'￥')}</span>
    },
    // {
    //   title: '记账记录',
    //   dataIndex: 'operat',
    //   width: 215,
    //   render: (text, row) => {
    //     return (
    //       <div>
    //         <a
    //           onClick={() => {
    //             this.showTable('rechargeRecord', row)
    //           }}
    //         >
    //           充值记录
    //         </a>
    //         <Divider type="vertical" />
    //         <a
    //           onClick={() => {
    //             this.showTable('payRecord', row)
    //           }}
    //         >
    //           消费记录
    //         </a>
    //         <Divider type="vertical" />
    //         <a
    //           onClick={() => {
    //             this.showTable('withdrawRecord', row)
    //           }}
    //         >
    //           提现
    //         </a>
    //         </div>
    //     )}
    // },
  ]
}

// 订单详情返利
export const rebateColumns = [
  {
    title: '商品',
    dataIndex: 'goods_name',
  },
  {
    title: '单价',
    dataIndex: 'price',
  },
  {
    title: '数量',
    dataIndex: 'logistics_sn',
  },
  {
    title: '实付金额',
    dataIndex: 'actual_price',
  },
  {
    title: '预计总返利',
    dataIndex: 'total_clearing',
  },
  {
    title: '团队长返利',
    dataIndex: 'team_clearing',
  },
  {
    title: '一级合伙人返利',
    dataIndex: 'first_clearing',
  },
  {
    title: '二级合伙人返利',
    dataIndex: 'second_clearing',
  },
]
// 收货地址弹窗
const receiveAddressColumns = [
  {
    title: '收件人姓名',
    dataIndex: '11',
  },
  {
    title: '联系方式',
    dataIndex: 'receiver_mobile',
  },
  {
    title: '收货地址',
    dataIndex: 'receiver_name',
  },
]

// 账户充值记录弹窗
const rechargeRecordColumns = [
  {
    title: '时间',
    dataIndex: 'receiver_mobile',
  },
  {
    title: '来源',
    dataIndex: 'receiver_name',
  },
  {
    title: '充值金额',
    dataIndex: 'receiver_mobile',
  },
  {
    title: '账户余额',
    dataIndex: 'receiver_name',
  },
]
// 账户提现记录弹窗
const withdrawRecordColumns = [
  {
    title: '时间',
    dataIndex: 'receiver_mobile',
  },
  {
    title: '提现至',
    dataIndex: 'receiver_name',
  },
  {
    title: '到账时间',
    dataIndex: 'receiver_mobile',
  },
  {
    title: '提现金额',
    dataIndex: 'receiver_name',
  },
  {
    title: '账户余额',
    dataIndex: 'receiver_name',
  },
]

// 账户消费记录弹窗
const payRecordColumns = [
  {
    title: '时间',
    dataIndex: 'receiver_name',
  },
  {
    title: '订单号',
    dataIndex: 'receiver_name',
  },
  {
    title: '订单类型',
    dataIndex: 'receiver_name',
  },
  {
    title: '商品',
    dataIndex: 'receiver_name',
  },
  {
    title: '消费金额',
    dataIndex: 'receiver_name',
  },
  {
    title: '账户余额',
    dataIndex: 'receiver_name',
  },
  {
    title: '订单状态',
    dataIndex: 'receiver_name',
  },
]
// 订单详情 公共弹窗Table
export const commonTable = {
  receiveAddress: {
    title: '收货地址',
    width: 600,
    columns: receiveAddressColumns,
  },
  rechargeRecord: {
    title: '账户充值记录',
    width: 600,
    columns: rechargeRecordColumns,
  },
  withdrawRecord: {
    title: '账户提现记录',
    width: 600,
    columns: withdrawRecordColumns,
  },
  payRecord: {
    title: '消费记录',
    width: 950,
    columns: payRecordColumns,
  },
}
