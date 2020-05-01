import React from 'react'
import { Card, Table } from 'antd'
import { getFinanceColumns, rebateColumns } from './fields'
import styles from '../index.less'

class FinanceInfo extends React.PureComponent {
  state = {}
  showTable = (type) => {
    this.props.showTable(type)
  }
  render() {
    const { finance } = this.props
    const financeInfoProps = {
      rowKey: (record, index) => index,
      dataSource: [finance],
      columns: getFinanceColumns.call(this),
      pagination: false,
    }
    // const rebateProps = {
    //   rowKey: (record, index) => index,
    //   dataSource: [],
    //   columns: rebateColumns,
    //   pagination: false,
    // }
    return (
      <Card title="财务信息" className={styles.orderDetailCard}>
        {/* <p className={styles.blockTile}>订单财务</p> */}
        <Table {...financeInfoProps} />
        {/* <p className={styles.blockTile} style={{marginTop: 16}}>预计返利明细</p>
        <Table {...rebateProps} /> */}
      </Card>
    )
  }
}

export default FinanceInfo
