import React, { PureComponent } from 'react'
import moment from 'moment'
import account from 'accounting'
import { Drawer } from 'antd'
import { TRADE_TYPES, TRADE_STATUS_FIELDS, FORMAT, PAY_WAY_TEXT } from '../../constants'
import styles from '../index.less'

class Details extends PureComponent {

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  renderRecharge() {
    const {
      details: {
        target_id,
        nickname,
        member_id,
        created_at,
        type,
        money,
        status,
        // remark,
        pay_way,
      },
      types = '',
    } = this.props
    return (
      <div className={styles.details}>
        <div>
          <span>交易单号&nbsp;:&nbsp;&nbsp;</span>
          <span>{target_id}</span>
        </div>
        <div>
          <span>交易账户&nbsp;:&nbsp;&nbsp;</span>
          <span>{nickname}&nbsp;(&nbsp;{member_id}&nbsp;)&nbsp;</span>
        </div>
        <div>
          <span>交易时间&nbsp;:&nbsp;&nbsp;</span>
          <span>{created_at && moment(created_at * 1000).format(FORMAT.DATETIME)}</span>
        </div>
        <div>
          <span>交易类型&nbsp;:&nbsp;&nbsp;</span>
          <span>{types && types[type]}</span>
        </div>
        <div>
          <span>交易金额&nbsp;:&nbsp;&nbsp;</span>
          <span>{account.formatMoney(Math.abs(money), '￥')}</span>
        </div>
        <div>
          <span>支付来源&nbsp;:&nbsp;&nbsp;</span>
          <span>{PAY_WAY_TEXT[pay_way]}</span>
        </div>
        <div>
          <span>充值状态&nbsp;:&nbsp;&nbsp;</span>
          <span>{TRADE_STATUS_FIELDS[status]}</span>
        </div>
      </div>
    )
  }

  renderCash() {
    const {
      details: {
        target_id,
        nickname,
        member_id,
        created_at,
        type,
        money,
        status,
        remark,
        data,
        pay_way,
      },
      types = '',
    } = this.props

    const { real_name = '', account = '', fee = '' } = data
    const serviceCharge = (fee * 10000) / (Math.abs(money) * 100)
    //争对不同的，提现方式，有不同的展示内容：暂时，只展示 微信，支付宝；银行卡暂不展示
    return (
      <div className={styles.details}>
        <div>
          <span>交易单号&nbsp;:&nbsp;&nbsp;</span>
          <span>{target_id}</span>
        </div>
        <div>
          <span>交易账户&nbsp;:&nbsp;&nbsp;</span>
          <span>{nickname}&nbsp;(&nbsp;{member_id}&nbsp;)&nbsp;</span>
        </div>
        <div>
          <span>交易时间&nbsp;:&nbsp;&nbsp;</span>
          <span>{created_at && moment(created_at * 1000).format(FORMAT.DATETIME)}</span>
        </div>
        <div>
          <span>交易类型&nbsp;:&nbsp;&nbsp;</span>
          <span>{types && types[type]}</span>
        </div>
        <div>
          <span>手续费比例&nbsp;(%)&nbsp;&nbsp;:&nbsp;&nbsp;</span>
          <span>{serviceCharge}</span>
        </div>
        <div>
          <span>交易状态&nbsp;:&nbsp;&nbsp;</span>
          <span>{TRADE_STATUS_FIELDS[status]}</span>
        </div>
        <div>
          <span>提现渠道&nbsp;:&nbsp;&nbsp;</span>
          <span>{PAY_WAY_TEXT[pay_way]}</span>
        </div>
        <div>
          <span>提现账号&nbsp;:&nbsp;&nbsp;</span>
          <span>{account}</span>
        </div>
        <div>
        </div>
        {/* <div>
          <span>{remark}&nbsp;:&nbsp;&nbsp;</span>
          <span>{account}</span>
        </div> */}
        {/* <div>
          <span>开户行&nbsp;:&nbsp;&nbsp;</span>
          <span></span>
        </div>
        <div>
          <span>银行卡号&nbsp;:&nbsp;&nbsp;</span>
          <span></span>
        </div>
        <div>
          <span>银行卡ID&nbsp;:&nbsp;&nbsp;</span>
          <span></span>
        </div> */}
        <div>
          <span>真实姓名&nbsp;:&nbsp;&nbsp;</span>
          <span>{real_name}</span>
        </div>
        {/* <div>
          <span>银行卡预留手机号&nbsp;:&nbsp;&nbsp;</span>
          <span></span>
        </div> */}
      </div>
    )
  }

  renderDetails() {
    if (!this.props.details) return null

    const { type = '' } = this.props.details
    switch (type) {
      case TRADE_TYPES.ONLINE_RECHARGE:
        return this.renderRecharge()
      case TRADE_TYPES.WITHDRAW_CASH:
        return this.renderCash()
    }
  }

  render() {
    const { visible } = this.props

    return (
      <Drawer
        title="交易明细"
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

export default Details