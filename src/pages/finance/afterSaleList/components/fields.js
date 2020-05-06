
import moment from 'moment'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import styles from '../index.less'
import { FORMAT, DATE_RANGE } from '../../constants'
import { GoodsInfo, AfterType, AfterStatus, PaidMoney, TotalMoney, ReturnMoney, Compensation } from './columnsRender'

export const getSearchFields = function (types) {
  const typeEnums = types ? [
    { value: '', name: '全部售后类型' },
    ...types,
  ] : [{ value: '', name: '全部售后类型' }]

  return [
    {
      key: 'member_id',
      placeholder: '请输入客户账号/客户ID搜索',
    },
    {
      key: 'order_id',
      placeholder: '请输入订单号搜索',
    },
    {
      key: 'time',
      type: 'dateRange',
      placeholder: ['开始时间', '结束时间'],
      searchKeys: ['start_time', 'end_time'],
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
    {
      key: 'good_name',
      placeholder: '请输入商品名称搜索',
    },
    {
      key: 'sale_type',
      placeholder: '全部售后类型',
      enums: typeEnums,
    },
  ]
}

export const getColumns = function () {
  return [
    {
      title: '订单信息',
      key: 'goodsInfo',
      span: '3',
      render: (item, field) => {
        return <GoodsInfo item={item} field={field} key="goodsInfo" />
      },
    },
    {
      title: '售后类型',
      key: 'afterType',
      span: '1',
      render: (item, field) => {
        return <AfterType item={item} field={field} key="afterType" />
      },
    },
    // {
    //   title: '售后状态',
    //   key: 'afterStatus',
    //   span: '1',
    //   render: (item, field) => {
    //     return <AfterStatus item={item} field={field} key="afterStatus" />
    //   },
    // },
    // {
    //   title: () => {
    //     return (
    //       <span className={styles.title}>
    //         支付金额
    //         <Popover content="售后服务单内每件商品的实际支付金额的总和/该订单内每件商品给下单账号的返利金额和返利类型">
    //           <Icon type="question-circle" theme="filled" className={styles.questionIcon} />
    //         </Popover>
    //       </span>)
    //   },
    //   key: 'paidMoney',
    //   span: '1',
    //   render: (item, field) => {
    //     return <PaidMoney item={item} field={field} key="paidMoney" />
    //   },
    // },
    {
      title: () => {
        return (
          <span className={styles.title}>
            申请金额
            <Popover content="售后申请的合计售后金额，售后传参；展示金额+售后渠道">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      key: 'totalMoney',
      span: '1',
      render: (item, field) => {
        return <TotalMoney item={item} field={field} key="totalMoney" />
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            退款金额
            <Popover content="当前订单的售后产生的实际退款金额；展示金额+售后渠道">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      key: 'returnMoney',
      span: '1',
      render: (item, field) => {
        return <ReturnMoney item={item} field={field} key="returnMoney" />
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            补偿金额
            <Popover content="当前订单在售后中除退款外得到的额外补偿金额及返还渠道（余额或佣金）">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      key: 'compensation',
      span: '1',
      render: (item, field) => {
        return <Compensation item={item} field={field} key="compensation" />
      },
    },
  ];
}