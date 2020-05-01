
import moment from 'moment'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import styles from '../index.less'
import { FORMAT,DATE_RANGE } from '../../constants'
import { GoodsInfo, AfterType, AfterStatus, PaidMoney, TotalMoney, ReturnMoney, Compensation } from './columnsRender'

export const searchFields = [
  {
    key: '1',
    placeholder: '供应商ID',
  },
  {
    key: '2',
    placeholder: '请输入订单号搜索',
  },
  {
    key: '3',
    placeholder: '请输入商品名称搜索',
  },
  {
    key: 'time',
    type: 'dateRange',
    placeholder: ['开始时间', '结束时间'],
    searchKeys: ['start_time', 'end_time'],
    inputProps: {
      ranges: DATE_RANGE,
    },
  }
]

export const getColumns = function () {
  return [
    {
      title: '商品信息',
      key: 'goodsInfo',
      span: '3',
      render: (item, field) => {
        return <GoodsInfo item={item} field={field} key="goodsInfo" />
      },
    },
    {
      title: '销售量',
      key: 'saleNums',
      span: '1',
      render: (item, field) => {
        return (
          <div key="saleNums" style={{ flex: field.span }}>123</div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            售后量
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'afterNums',
      span: '1',
      render: (item, field) => {
        return (
          <div key="afterNums" style={{ flex: field.span }}>10</div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            销售金额
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'saleMoney',
      span: '1',
      render: (item, field) => {
        return (
          <div key="saleMoney" style={{ flex: field.span }}>1212312231</div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            成本金额
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'costMoney',
      span: '1',
      render: (item, field) => {
        return (
          <div key="costMoney" style={{ flex: field.span }}>123123</div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            返利金额
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'returnMoney',
      span: '1',
      render: (item, field) => {
        return (
          <div key="returnMoney" style={{ flex: field.span }}>
            123123
          </div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            售后金额
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'afterMoney',
      span: '1',
      render: (item, field) => {
        return (
          <div key="afterMoney" style={{ flex: field.span }}>123123123</div>
        )
      },
    },
    {
      title: () => {
        return (
          <span className={styles.title}>
            利润金额
            {/* <Popover content=""> */}
              <QuestionCircleFilled className={styles.questionIcon} />
            {/* </Popover> */}
          </span>
        );
      },
      key: 'proftMoney',
      span: '1',
      render: (item, field) => {
        return (
          <div key="proftMoney" style={{ flex: field.span }}>12312312</div>
        )
      },
    },
  ];
}