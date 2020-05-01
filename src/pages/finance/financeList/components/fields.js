import moment from 'moment'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import styles from '../index.less'
import { FORMAT, DATE_RANGE } from '../../constants'

export const searchFields = [
  {
    key: 'time',
    searchKeys: ['start_time', 'end_time'],
    placeholder: ['开始时间', '结束时间'],
    itemCol: 8,
    type: 'dateRange',
    inputProps: {
      ranges: DATE_RANGE,
      disabledDate: current => {
        return (
          current < moment().subtract(3, 'months') ||
          current > moment().endOf('day')
        )
      },
    },
    initialValue: [moment().subtract(30, 'days'), moment()]
  },
]

export const getColumns = function () {
  return [
    {
      title: '日期',
      dataIndex: 'date',
      width: '180',
      render: (text, row) => {
        if (!text) return null
        return <span>{moment(text).format(FORMAT.DATE)}</span>
      }
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            平台余额
            <Popover content="平台总余额=前一天的余额+销售金额-已返佣金-已结货款-售后金额-已提金额-录款金额+扣款金额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'total_balance',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            用户余额
            <Popover content="用户账户余额的总和">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'user_balance',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            销售金额
            <Popover content="用户下单的金额总数（不考虑取消订单和售后）；注意这里包含用户余额支付的金额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'sales_amount',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            已返佣金
            <Popover content="总计给客户返利的总金额（总支出返利-总扣除返利）">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'commission',
      width: '180',
      moeny: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            已结货款
            <Popover content="已经给供应商结算的货款总额，即供应商货款明细中 已结算状态的金额总额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'settled_loan',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            售后金额
            <Popover content="售后产生的总计金额，即总退款金额+总补偿金额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'after_sale',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            已提金额
            <Popover content="用户账户内总提现成功的金额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'withdraw',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            录款金额
            <Popover content="给用户后台操作直接补款的总额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'recording',
      width: '180',
      money: true,
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            扣款金额
            <Popover content="给用户后台操作直接扣款的总额">
              <QuestionCircleFilled className={styles.questionIcon} />
            </Popover>
          </span>
        );
      },
      dataIndex: 'deduction',
      width: '180',
      money: true,
    }
  ];
}