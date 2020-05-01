import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, TreeSelect } from 'antd';
import ServiceList from '../../components/ServiceList'
import styles from '../index.less'

const { TreeNode } = TreeSelect
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@Form.create()
class Transfer extends PureComponent {

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { worksheet_codes = [], form, onOk } = this.props

    form.validateFields(async (err, values) => {
      if (err) {
        return
      }

      const { service_member_id = '', desc = '' } = form && form.getFieldsValue(['service_member_id', 'desc'])
      // if (worksheet_codes && worksheet_codes.length)
      $api.workorder.transfer({ worksheet_codes, service_member_id: parseInt(service_member_id), desc }).then(_ => {
        onOk && onOk()
      })
    })
  }

  renderServiceList() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Form.Item label="接收人">
        {getFieldDecorator('service_member_id', {
          rules: [{
            required: true,
            message: '请选择接收人',
          }]
        })(
          <ServiceList />
        )}
      </Form.Item>
    )
  }

  render() {
    const { form: { getFieldDecorator }, visible } = this.props

    return (
      <Modal
        title="转移工单"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          {this.renderServiceList()}

          <Form.Item label="转移原因">
            {getFieldDecorator('desc')(
              <Input.TextArea rows="3" autoSize={{ minRows: 4, maxRows: 6 }} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Transfer