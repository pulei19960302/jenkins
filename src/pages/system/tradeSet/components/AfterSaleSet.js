import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { CloseOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { InputNumber, Input, Table, Row, Col, Modal, Checkbox } from 'antd';
import { Page, FSwitch, PageTitle } from 'components'
import { orderFields } from '../components/fields'
import { TRADE_SET_SWITCH } from '../../constants'
import styles from '../index.less'

class AfterSaleSet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addReasonModal: false,
    }
  }

  toggleAddReasonModal = () => {
    this.setState((prevState) => ({
      addReasonModal: !prevState.addReasonModal
    }))
  }

  handleDeleteReason = (delIndex = '') => {
    const { order_after_market = {}, onChangeTrade } = this.props
    const { messages = '' } = order_after_market
    const newMessages = messages && messages.filter((value, index) => index !== delIndex)
    onChangeTrade && onChangeTrade(['order_after_market', 'messages'], newMessages)
  }

  handleAddReason = () => {
    const { order_after_market = {}, onChangeTrade, form } = this.props
    const { messages = '' } = order_after_market
    form.validateFields((err, value) => {
      if (err) return

      const { reason = '' } = value
      const newMessages = messages && messages.concat([reason])
      this.toggleAddReasonModal()
      onChangeTrade && onChangeTrade(['order_after_market', 'messages'], newMessages)
    })
  }

  renderModal() {
    const { addReasonModal } = this.state
    const { form: { getFieldDecorator } } = this.props
    return (
      <Modal
        title="新增售后原因"
        visible={addReasonModal}
        destroyOnClose={true}
        maskClosable={false}
        onOk={this.handleAddReason}
        onCancel={this.toggleAddReasonModal}
        className={styles.addReasonModal}
      >
        <Form.Item label="售后原因" type="flex" wrapperCol={{ span: 18 }} labelCol={{ span: 4 }}>
          {
            getFieldDecorator('reason', {
              rules: [
                { required: true, message: '请输入规格名称' }
              ]
            })(
              <Input placeholder="请输入规格名称" maxLength={10} />
            )
          }
          <span className={styles.tips}>&nbsp;&nbsp;10字符以内</span>
        </Form.Item>
      </Modal>
    )
  }

  render() {
    const { order_after_market = {} } = this.props
    const { messages = '' } = order_after_market

    return (
      <div className={styles.container}>
        <div className={`${styles.title} ${styles.flex}`}>
          <span className={styles.mr20}>交易售后设置</span>
        </div>
        <div className={`${styles.flex} ${styles.item} ${styles.afterSale}`}>
          <span className={styles.label}>售后原因设置</span>
          <div>
            {
              messages && messages.map((el, index) => (
                <span className={styles.reason} key={index}>
                  <span>{el}</span>
                  {
                    index > 1 && (
                      <CloseOutlined onClick={() => { this.handleDeleteReason(index) }} />
                    )
                  }
                </span>
              ))
            }
            <span className={styles.add} onClick={this.toggleAddReasonModal}>添加</span>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default AfterSaleSet