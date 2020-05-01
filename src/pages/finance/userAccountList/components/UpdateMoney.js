import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, InputNumber, Select, Button } from 'antd';
import { cutOutDecimals } from 'utils'
import { InputNumberGroup } from 'components'
import { BALANCE_TYPE, TRADE_TYPES } from '../../constants'
import styles from '../index.less'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
const MAXLENGTH = 50

@Form.create()
class UpdateMoney extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      notesLength: 0,
      loading: false,
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }))
  }

  handleOk = () => {
    const { form, onOk } = this.props
    form.validateFields(async (err, values) => {
      if (err) return

      this.toggleLoading()
      $api.finance.updateMoney({ ...values }, { success: true }).then(_ => {
        onOk && onOk()
      }).finally(_ => {
        this.toggleLoading()
      })
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  renderForm() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const notes = form.getFieldValue('remark')
    const notesNums = notes ? (notes.length) : 0

    return (
      <Form {...formItemLayout} autoComplete="off">
        <Form.Item label="客户ID">
          {getFieldDecorator('member_id', {
            rules: [{
              required: true,
              message: '请输入客户ID',
            }]
          })(
            <Input placeholder="请输入" autoComplete="off" />
          )}
        </Form.Item>
        <Form.Item label="收支类型">
          {getFieldDecorator('type', {
            initialValue: TRADE_TYPES.ADD_MONEY,
            rule: [{
              required: true,
            }]
          })(
            <Select>
              <Select.Option value={TRADE_TYPES.ADD_MONEY}>管理员录款</Select.Option>
              <Select.Option value={TRADE_TYPES.CUT_MONEY}>管理员扣款</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="加扣渠道">
          {getFieldDecorator('balance_type', {
            initialValue: BALANCE_TYPE.BALANCE,
            rule: [{
              required: true,
            }]
          })(
            <Select>
              <Select.Option value={BALANCE_TYPE.BALANCE}>余额&nbsp;(不可提现)</Select.Option>
              <Select.Option value={BALANCE_TYPE.FEE}>佣金&nbsp;(可提现)</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="资金">
          {getFieldDecorator('money', {
            rules: [{
              required: true,
              message: '请输入金额',
            }]
          })(
            <InputNumberGroup formatter={value => cutOutDecimals(value, 2)} placeholder="请输入" addonAfter='元' />
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('remark')(
            <div className={styles.notes}>
              <Input.TextArea rows={4} placeholder="请输入" maxLength={MAXLENGTH} />
              <span className={styles.nums}>{notesNums}/{MAXLENGTH}</span>
            </div>
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('pay_pwd', {
            rules: [{
              required: true,
              message: '请输入密码',
            }]
          })(
            <Input type="password" placeholder="请输入" autoComplete="off" />
          )}
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible } = this.props
    const { loading } = this.state

    return (
      <Modal
        title="加扣款"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        confirmLoading={loading}
      >
        {this.renderForm()}
      </Modal>
    )
  }
}

export default UpdateMoney
