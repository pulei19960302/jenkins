import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Input, InputNumber } from 'antd';
import { FSwitch } from 'components'
import { cutOutDecimals } from 'utils'
import { INSURANCE_STATUS } from '../../../../constants'
import styles from '../index.less'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
@Form.create()
class AddInsurance extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }))
  }

  handleModalOK = () => {
    const { form, onOk } = this.props
    form.validateFields((err, values) => {
      if (err) return

      this.toggleLoading()
      $api.shipping.addInsurance(values).then(_ => {
        onOk && onOk()
      }).finally(_ => {
        this.toggleLoading()
      })
    })
  }

  handleModalCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { visible, form: { getFieldDecorator } } = this.props
    const { loading } = this.state

    return (
      <Modal
        title="新增运费险"
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        visible={visible}
        onOk={this.handleModalOK}
        onCancel={this.handleModalCancel}
        confirmLoading={loading}
      >
        <Form className={styles.addInfos} autoComplete='off' {...formItemLayout}>
          <Form.Item label="模板名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请填写模板名称',
              }]
            })(
              <Input placeholder="请输入模板名称" maxLength={30} autoComplete='off' />
            )}
          </Form.Item>
          <Form.Item label="运费险价格">
            {getFieldDecorator('money', {
              rules: [{
                required: true,
                message: '请填写运费险价格',
              }]
            })(
              <InputNumber placeholder="请输入运费险价格" maxLength={20}
                formatter={value => cutOutDecimals(value, 2)} />
            )}
          </Form.Item>
          <Form.Item label="赔付金额">
            {getFieldDecorator('compensate', {
              rules: [{
                required: true,
                message: '请填写赔付金额',
              }]
            })(
              <InputNumber placeholder="请输入赔付金额" maxLength={20}
                formatter={value => cutOutDecimals(value, 2)} />
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('status', {
              rules: [{
                required: true,
              }],
              initialValue: INSURANCE_STATUS.ENABLED,
            })(
              <FSwitch
                values={[INSURANCE_STATUS.ENABLED, INSURANCE_STATUS.DISABLED]}
                texts={['启用', '禁用']}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default AddInsurance