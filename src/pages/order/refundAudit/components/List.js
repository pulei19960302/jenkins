import React, { PureComponent } from 'react'
import { Spin, Empty } from 'antd'
import Columns from '../../components/Columns'
import OrderListRender from './OrderListReder'
import { getColumnsFields } from './OrderListReder/fields'
import AuditDeal from './AuditDeal'
import styles from '../index.less'

class List extends PureComponent {
  state = {
    order: {}, //选中的申请单
    auditDealModal: false,
  }
  getListRender = () => {
    const { list } = this.props
    return list.map(order => {
      const orderListRenderProps = {
        order,
        context: this,
      }
      return <OrderListRender {...orderListRenderProps} key={order.id} />
    })
  }
  // 弹窗显示
  showModal = (modal, order) => {
    this.setState({
      [modal]: true,
      order
    })
  }
  // 弹窗隐藏
  hideModal = modal => {
    this.setState({
      [modal]: false,
    })
  }
  render() {
    const { list = [], loading, getList } = this.props
    const { auditDealModal, order } = this.state
    const auditDealProps = {
      order,
      modalVisible: auditDealModal,
      onCancel: () => {
        this.hideModal('auditDealModal')
      },
      successCallback: getList,
    }
    return (
      <React.Fragment>
        <Columns fields={getColumnsFields()} />
        {this.getListRender()}
        {loading && <Spin className={styles.spin} />}
        {!list.length && !loading && <Empty className={styles.spin} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <AuditDeal {...auditDealProps} />
      </React.Fragment>
    )
  }
}
export default List
