import account from 'accounting'
import React, { PureComponent } from 'react'
import { Drawer } from 'antd'
import {
  TRADE_TYPES_FIELDS as typeFields, PAY_WAY_TEXT as payText,
  PAY_WAY, BALANCE_FIELDS as balanceFields,
} from '../../constants'
import styles from '../index.less'

class Deduction extends PureComponent {

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  renderDetails() {
    if (!this.props.details) return null

    const { details = {} } = this.props
    const {
      member_id = '',
      type = '',
      pay_way = '',
      money = '',
      remark = '',
      balance_type = '',
      order_no = '',
    } = details

    let payWay = ''
    if (pay_way !== PAY_WAY.BALANCE) {
      payWay = payText[pay_way]
    } else {
      payWay = balanceFields[balance_type]
    }
    return (
      <div className={styles.details}>
        <div>
          <span className={styles.label}>交易单号&nbsp;:&nbsp;&nbsp;</span>
          <span>{order_no}</span>
        </div>
        <div>
          <span className={styles.label}>客户ID&nbsp;:&nbsp;&nbsp;</span>
          <span>{member_id}</span>
        </div>
        <div>
          <span className={styles.label}>收支类型&nbsp;:&nbsp;&nbsp;</span>
          <span>{typeFields[type]}</span>
        </div>
        <div>
          <span className={styles.label}>加扣渠道&nbsp;:&nbsp;&nbsp;</span>
          <span>{payWay}</span>
        </div>
        <div>
          <span className={styles.label}>资金&nbsp;:&nbsp;&nbsp;</span>
          <span>{account.formatMoney(Math.abs(money), '￥')}</span>
        </div>
        <div>
          <span className={styles.label}>备注&nbsp;:&nbsp;&nbsp;</span>
          <span>{remark}</span>
        </div>
      </div>
    )
  }

  render() {
    const { visible } = this.props

    return (
      <Drawer
        title="加扣款交易明细"
        visible={visible}
        onClose={this.handleCancel}
        placement="right"
        width="600"
      >
        {this.renderDetails()}
      </Drawer>
    )
  }
}

export default Deduction