import React, { PureComponent } from 'react'
import { router } from 'utils'
import { AFTER_SALE_STATUS } from '@/pages/order/constants'
import styles from '../index.less'

class Helper extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      wait_send: 0,
      wait_change_goods: 0,
      wait_return_goods: 0,
      wait_apply_finance: 0,
      wait_apply_user: 0,
    }
  }

  componentDidMount() {
    $api.dashboard.assistant().then(res => {
      const { data = {} } = res
      this.setState({
        ...data,
      })
    })
  }

  renderContent() {
    const {
      wait_send = 0,
      wait_change_goods = 0,
      wait_return_goods = 0,
      wait_apply_finance = 0,
      wait_apply_user = 0,
    } = this.state

    return (
      <div className={styles.content}>
        <div>
          <span className={styles.num}>{parseInt(wait_send)}</span>
          <span className={styles.tips}>待发货</span>
          {
            $api.order.sendGoodsList.permission() && (
              <a onClick={() => { router.push('/order/sendGoods') }}>去发货</a>
            )
          }
        </div>
        <div>
          <span className={styles.num}>{parseInt(wait_change_goods)}</span>
          <span className={styles.tips}>待售后换货处理</span>
          {
            $api.order.afterSaleList.permission() && (
              <a onClick={() => {
                router.push({
                  pathname: '/order/afterSale',
                  payload: { status: AFTER_SALE_STATUS.IN_EXCHANGE }
                })
              }}>去处理</a>
            )
          }
        </div>
        <div>
          <span className={styles.num}>{parseInt(wait_return_goods)}</span>
          <span className={styles.tips}>待售后退货处理</span>
          {
            $api.order.afterSaleList.permission() && (
              <a onClick={() => {
                router.push({
                  pathname: '/order/afterSale',
                  payload: { status: AFTER_SALE_STATUS.IN_RETURN }
                })
              }}>去处理</a>
            )
          }
        </div>
        <div>
          <span className={styles.num}>{parseInt(wait_apply_user)}</span>
          <span className={styles.tips}>待审核用户</span>
          {
            $api.user.auditList.permission() && (
              <a onClick={() => { router.push('/user/userAudit') }}>去审核</a>
            )
          }
        </div>
        <div>
          <span className={styles.num}>{parseInt(wait_apply_finance)}</span>
          <span className={styles.tips}>待审核财务</span>
          {
            $api.order.refundAuditList.permission() && (
              <a onClick={() => { router.push('/order/refundAudit') }}>去审核</a>
            )
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.helper}>
        <div className={`${styles.title} ${styles.dark}`}>
          智能助手
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

export default Helper