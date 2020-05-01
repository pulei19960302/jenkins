import React from 'react'
import { Card } from 'antd'
import OrderListRender from '../../components/OrderListReder'
import { Columns } from '../../components'
import { getColumnsFields } from '../../components/OrderListReder/fields'
import styles from '../index.less'

class OrderBaseInfo extends React.PureComponent {
  state = {}
  render() {
    const orderListProps = {
      order: this.props.order,
      removeFields: ['operate'],
    }
    return (
      <Card title="订单基本信息" className={styles.orderDetailCard}>
        <Columns fields={getColumnsFields(['operate'])} />
        <OrderListRender {...orderListProps} />
      </Card>
    )
  }
}

export default OrderBaseInfo
