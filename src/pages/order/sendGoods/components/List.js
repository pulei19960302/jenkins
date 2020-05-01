import React, { PureComponent } from 'react'
import { Spin, Empty } from 'antd'
import { router } from 'utils'
import Columns  from '../../components/Columns'
import OrderListRender from './OrderListReder'
import { getColumnsFields } from './OrderListReder/fields'
import ModifyLogistics from './ModifyLogistics'
import styles from '../index.less'

class List extends PureComponent {
  state = {
    modifyLogisticsModal: false,
    order: {}
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
  showModal = (modal,order) => {
    this.setState({
      [modal]: true,
      order,
    })
  }
  // 弹窗隐藏
  hideModal = modal => {
    this.setState({
      [modal]: false,
    })
  }
  // 弹窗公共props
  getCommonProps = modal => {
    return {
      onCancel: () => {
        this.hideModal(modal)
      },
      order: this.state.order,
      modalVisible: this.state[modal],
      successCallback: this.props.getList
    }
  }
  // 前往订单详情
  goDetail(id) {
    router.push({
      pathname: `/order/orderDetail/${id}`,
    })
  }
  render() {
    const { list = [], loading } = this.props
    return (
      <React.Fragment>
        <Columns fields={getColumnsFields([])} />
        {this.getListRender()}
        {loading && <Spin className={styles.spin} />}
        {!list.length && !loading && <Empty className={styles.spin} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <ModifyLogistics {...this.getCommonProps('modifyLogisticsModal')} />
      </React.Fragment>
    )
  }
}
export default List
