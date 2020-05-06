import React, { PureComponent } from 'react'
import { Page } from 'components'
// 订单详情模块组件
import {
  AfterSaleInfo,
  FinanceInfo,
  OrderStatus,
  OrderBaseInfo,
  Header,
  CommonTable,
} from './components'
// 订单相关公共弹窗组件
import {
  CancelOrder,
  ModifyAddress,
  ModifyLogistics,
  ApplyAfterSale,
  ModifyRemarks,
  SendGoods,
  LogisticsTrail,
  AfterSaleOrder,

} from '../components'

class OrderDetial extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      btnLoading: false,
      order: {},  // 订单信息
      type: null, // 公共展示表格类型
      afterSaleOrderModal: false,
      cancelOrderModal: false,
      modifyAddressModal: false,
      modifyLogisticsModal: false,
      applyAfterSaleModal: false,
      modifyRemarksModal: false,
      sendGoodsModal: false,
      logisticsTrailModal: false,
      applyAfterSaleProps: {}, // 申请售后props
      afterSaleOrderProps: {}, // 售后单详情props
    }
  }

  componentDidMount() {
    this.getOrderDetail()
  }

  // 获取订单详情
  getOrderDetail = () => {
    const id = this.props.match.params.id
    $api.order.getOrderDetail({ id }).then(({ data }) => {
      this.setState({
        order: data
      })
    })
  }

  /**
   * 公共表格显示
   * @param {string} type receiveAddress|rechargeRecord|withdrawRecord|payRecord
   * @returns {void}
   */
  showTable = type => {
    this.setState({ type })
  }
  // 公共表格隐藏
  hideTable = () => {
    this.setState({ type: null })
  }
  // 申请售后前检查能否申请
  checkApply = () => {
    const { order } = this.state
    $api.order.checkApply({ order_id: order.id }, { loadingFn: this.toogleLoading }).then(({ data }) => {
      this.setState({
        applyAfterSaleProps: { goods_info: data.goods_info, order }
      })
      this.showModal('applyAfterSaleModal')
    })
  }
  // 获取售后单详情
  getAfterSaleDetail = () => {
    const { order } = this.state
    $api.order.getAfterSaleDetail({ id: order.sale_id }, { loadingFn: this.toogleLoading }).then(({ data }) => {
      this.setState({
        afterSaleOrderProps: data
      })
      this.showModal('afterSaleOrderModal')
    })
  }

  // 接口loading回调
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }

  // 弹窗显示
  showModal = modal => {
    this.setState({
      [modal]: true,
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
      order: this.state.order,
      modalVisible: this.state[modal],
      onCancel: () => {
        this.hideModal(modal)
      },
      successCallback: this.getOrderDetail,
    }
  }
  render() {
    const { type, order, btnLoading, afterSaleOrderProps } = this.state
    const headerProps = {
      order,
      showModal: this.showModal,
      checkApply: this.checkApply,
      loading: btnLoading
    }
    const orderStatusProps = {
      order,
      showTable: this.showTable,
      showModal: this.showModal,
    }
    const financeInfoProps = {
      finance: order.finance || [],
      showTable: this.showTable,
    }
    const afterSaleInfoProps = {
      loading: btnLoading,
      order,
      showAfterSaleOrder: this.getAfterSaleDetail
    }
    const logisticsTrailProps = {
      ...this.getCommonProps('logisticsTrailModal'),
      logistics: order.logistics_info || []
    }
    const tableProps = {
      hideTable: this.hideTable,
      type,
    }
    return (
      <Page>
        <Header {...headerProps} />
        <OrderBaseInfo order={order} />
        <OrderStatus {...orderStatusProps} />
        <FinanceInfo {...financeInfoProps} />
        <AfterSaleInfo {...afterSaleInfoProps} />
        <LogisticsTrail {...logisticsTrailProps} />
        <SendGoods {...this.getCommonProps('sendGoodsModal')} />
        <ModifyRemarks {...this.getCommonProps('modifyRemarksModal')} />
        <ApplyAfterSale {...this.getCommonProps('applyAfterSaleModal')} {...this.state.applyAfterSaleProps} />
        <ModifyLogistics {...this.getCommonProps('modifyLogisticsModal')} />
        <ModifyAddress {...this.getCommonProps('modifyAddressModal')} />
        {/* <CancelOrder {...this.getCommonProps('cancelOrderModal')} />} */}
        <AfterSaleOrder {...this.getCommonProps('afterSaleOrderModal')} order={afterSaleOrderProps} />
        {/* <CommonTable {...tableProps} /> */}
      </Page>
    )
  }
}
export default OrderDetial
