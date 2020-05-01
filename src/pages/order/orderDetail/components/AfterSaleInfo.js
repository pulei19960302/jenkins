import React from 'react'
import { Card, Button, Table } from 'antd'
import { afterSaleColumns } from './fields'
import styles from '../index.less'

class AfterSaleInfo extends React.PureComponent {
  state = {}

  render() {
    const { showAfterSaleOrder, order, loading } = this.props
    const data = order.sale_record || []
    const tableProps = {
      rowKey: (record, index) => index,
      dataSource: data,
      columns: afterSaleColumns,
      pagination: false,
    }
    return (
      <Card
        title="售后信息"
        extra={data.length && $api.order.getAfterSaleDetail.permission() ? <Button onClick={showAfterSaleOrder} loading={loading}>查看售后单</Button> : ''}
        className={styles.orderDetailCard}
      >
        <Table {...tableProps} />
      </Card>
    )
  }
}

export default AfterSaleInfo
