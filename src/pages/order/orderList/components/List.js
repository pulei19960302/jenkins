import { router } from 'utils'
import React, { PureComponent } from 'react'
import { Spin, Empty } from 'antd'
import { getColumnsFields } from '../../components/OrderListReder/fields'
// 订单相关公共弹窗组件
import {
  Columns,
  OrderListRender,
  CancelOrder,
  ModifyAddress,
  ModifyLogistics,
  ApplyAfterSale,
  ModifyRemarks,
  LogisticsTrail,
} from '../../components'
import styles from '../index.less'

class List extends PureComponent {
  state = {
    order: {}, // 当前选中的订单
    cancelOrderModal: false,
    modifyAddressModal: false,
    modifyLogisticsModal: false,
    applyAfterSaleModal: false,
    modifyRemarksModal: false,
    logisticsTrailModal: false,
    applyAfterSaleProps: {}
  }
  // 申请售后前检查能否申请
  checkApply = (order)=>{
    $api.order.checkApply({order_id:order.id}).then(({data})=>{
      this.setState({
          applyAfterSaleProps: {goods_info:data.goods_info,order}
        })
      this.showModal('applyAfterSaleModal')
    })
  }
  // 弹窗显示
  showModal = (modal,order={}) => {
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
        <Columns fields={getColumnsFields()} />
        {this.getListRender()}
        {loading && <Spin className={styles.spin} />}
        {!list.length && !loading && <Empty className={styles.spin} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <LogisticsTrail {...this.getCommonProps('logisticsTrailModal')} />
        <ModifyRemarks {...this.getCommonProps('modifyRemarksModal')} />
        <ApplyAfterSale {...this.getCommonProps('applyAfterSaleModal')} {...this.state.applyAfterSaleProps} />
        <ModifyLogistics {...this.getCommonProps('modifyLogisticsModal')} />
        <ModifyAddress {...this.getCommonProps('modifyAddressModal')} />
        {/*<CancelOrder {...this.getCommonProps('cancelOrderModal') />} */}
      </React.Fragment>
    )
  }
}
export default List
