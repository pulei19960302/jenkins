import {DATE_RANGE} from '../../constants'
import styles from '../index.less'
export const getSearchFields = (enums = []) => (
  [
    {
      key: '对账状态',
      type: 'enum',
      enums,
      placeholder: '请选择对账状态',
    },
    {
      key: 'time',
      type: 'dateRange',
      placeholder: ['对账时间', '结束日期'],
      searchKeys: ['start_time', 'end_time'],
      inputProps: {
        ranges: DATE_RANGE,
      },
    },
  ]
)

export const getColumns = function () {
  return [
    {
      title: '日期',
      key: '日期',
      span: '2',
      styles: {
        flex: 'none',
        width: '180px',
      },
      render: (info, field) => {
        return <span key="日期" style={{flex: field.span}}>20190923</span>
      },
    },
    {
      title: '账户',
      key: '账户',
      span: '1',
      render: (info, field) => { 
        return <span key="账户" style={{flex: field.span}}>系统</span>
      },
    },
    {
      title: '初始资金',
      key: '初始资金',
      span: '2',
      render: (info, field) => { 
        return <span key="初始资金" style={{flex: field.span}}>初始资金</span>
      },
    },
    {
      title: '充值资金',
      key: '充值资金',
      span: '2',
      render: (info, field) => { 
        return <span key="充值资金" style={{flex: field.span}}>充值资金</span>
      },
    },
    {
      title: '订单直付',
      key: '订单直付',
      span: '2',
      render: (info, field) => { 
        return <span key="订单直付" style={{flex: field.span}}>订单直付</span>
      },
    },
    {
      title: '订单退款',
      key: '订单退款',
      span: '2',
      render: (info, field) => { 
        return <span key="订单退款" style={{flex: field.span}}>订单退款</span>
      },
    },
    {
      title: '用户提现',
      key: '用户提现',
      span: '2',
      render: (info, field) => { 
        return <span key="用户提现" style={{flex: field.span}}>用户提现</span>
      },
    },
    {
      title: '手续费',
      key: '手续费',
      span: '2',
      render: (info, field) => { 
        return <span key="手续费" style={{flex: field.span}}>手续费</span>
      },
    },
    {
      title: '结余资金',
      key: '结余资金',
      span: '2',
      render: (info, field) => { 
        return <span key="结余资金" style={{flex: field.span}}>结余资金</span>
      },
    },
  ]
}