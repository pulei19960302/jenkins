import React, { PureComponent } from 'react'
import { Spin, Empty } from 'antd'
import Columns from '../../components/Columns'
import OrderListRender from './OrderListReder'
import { getColumnsFields } from './OrderListReder/fields'
import AuditAfterSale from './AuditAfterSale'
import AfterSaleOrder from '../../components/AfterSaleOrder'
import { AFTER_SALE_STATUS } from '../../constants'
import styles from '../index.less'

const { CLOSE, COMPLETE, REFUSE_REFUND } = AFTER_SALE_STATUS

class List extends PureComponent {
  state = {
    auditAfterSaleModal: false,
    afterSaleOrderModal: false,
    expressList: [],
    order: {}
  }
  componentDidMount() {
    $api.common.getExpressList({ no_page_flag: true }, { cache: true }).then(res => {
      this.setState({
        expressList: res.data || []
      })
    })
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
  viewDetails = (order) => {
    if ([CLOSE, COMPLETE, REFUSE_REFUND].includes(order.status)) { //如果订单为关闭或完成只做展示
      this.showModal('afterSaleOrderModal', order)
    } else {
      this.showModal('auditAfterSaleModal', order)
    }
  }
  // 弹窗显示
  showModal = (modal, order = {}) => {
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
  // 弹窗公共props
  getCommonProps = modal => {
    return {
      order: this.state.order,
      modalVisible: this.state[modal],
      onCancel: () => {
        this.hideModal(modal)
      },
      successCallback: this.props.getList,
    }
  }
  render() {
    const { list = [], loading } = this.props
    const { expressList } = this.state
    return (
      <React.Fragment>
        <Columns fields={getColumnsFields()} />
        {this.getListRender()}
        {loading && <Spin className={styles.spin} />}
        {!list.length && !loading && <Empty className={styles.spin} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <AuditAfterSale {...this.getCommonProps('auditAfterSaleModal')} expressList={expressList} />
        <AfterSaleOrder {...this.getCommonProps('afterSaleOrderModal')} />
      </React.Fragment>
    )
  }
}
export default List
