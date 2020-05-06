import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Input, Select } from 'antd';
import { FSwitch } from 'components'
import { EXPRESS_STATUS } from '../../../../constants'
import styles from '../index.less'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
@Form.create()
class AddExpress extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      expressList: [],
    }
  }

  componentDidMount() {
    $api.shipping.expressList().then(res => {
      const { data = [] } = res
      this.setState({
        expressList: data || []
      })
    })
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
      const data = {
        ...values,
        bird_code: '111', //virtual data
        status: EXPRESS_STATUS.DISABLED, //default value
      }
      $api.shipping.addExpress(data).then(_ => {
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

  handleCheckExpress = (value, option = {}) => {
    const { code: express_code = '' } = option
    this.props.form.setFieldsValue({ express_code })
  }

  render() {
    const { visible, form } = this.props
    const { getFieldDecorator } = form
    const { loading, expressList } = this.state
    const express_code = form.getFieldValue('express_code')

    return (
      <Modal
        title="新建物流公司"
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        visible={visible}
        onOk={this.handleModalOK}
        onCancel={this.handleModalCancel}
        confirmLoading={loading}
      >
        <Form className={styles.addInfos} autoComplete='off' {...formItemLayout}>
          <Form.Item label="物流公司">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请选择物流公司',
              }]
            })(
              <Select
                showSearch
                showArrow
                onChange={this.handleCheckExpress}
                disabled={!expressList || !expressList.length}
              >
                {
                  expressList && expressList.map(el => (
                    <Select.Option key={el.id} code={el.code} value={el.name}>
                      {el.name}
                    </Select.Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item label="物流代码">
            {getFieldDecorator('express_code', {
              rules: [{
                required: true,
                message: '请选择物流公司',
              }]
            })(
              <Input
                placeholder="选择物流公司后自动生成"
                maxLength={32}
                readOnly
                disabled={!express_code}
                style={{ 'cursor': 'default' }}
              />
            )}
          </Form.Item>
          <Form.Item label="联系方式">
            {getFieldDecorator('phone', {
              rules: [
                { pattern: /^(\d|\-){0,}$/g, message: '格式不正确' },
              ],
            })(
              <Input placeholder="请输入联系方式" maxLength={20} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddExpress