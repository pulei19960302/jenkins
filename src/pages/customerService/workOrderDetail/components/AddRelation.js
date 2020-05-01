import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Select, Input, Row, Col } from 'antd';
import { ORDER_STATUS } from '../../constants'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@Form.create()
class AddRelation extends PureComponent {

  handleOk = () => {
    const { customer_member_id = '', worksheet_code = '', form, onOk } = this.props

    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      // const { relation_sn = '', relation_sn_type = '' } = form && form.getFieldsValue(['relation_sn', 'relation_sn_type'])
      const { relation_sn = '', relation_sn_type = '' } = values
      const params = { relation_sn, relation_sn_type, customer_member_id, worksheet_code }
      $api.workorder.addRelation(params).then(_ => {
        onOk && onOk()
      })
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { form: { getFieldDecorator }, visible } = this.props

    return (
      <Modal
        title="新增关联单据"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        // confirmLoading={}
        destroyOnClose
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="关联单据">
            {getFieldDecorator('relation_sn_type', {
              initialValue: ORDER_STATUS.AFTERSALE,
            })(
              <Select>
                <Option value={ORDER_STATUS.AFTERSALE}>售后服务单</Option>
                <Option value={ORDER_STATUS.ORDER}>订单</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ position: 'relative', left: '25%' }}>
            {getFieldDecorator('relation_sn', {
              rules: [{
                required: true,
                message: '请输入单据编号',
              }]
            })(
              <Input placeholder="请输入相关单据编号" style={{ width: '100%', }} />
            )}
          </Form.Item>
        </Form>
      </Modal >
    )
  }
}

export default AddRelation