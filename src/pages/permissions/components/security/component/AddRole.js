import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Modal } from 'antd';
import styles from '../index.less'

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
}
@Form.create()
class AddRole extends PureComponent {

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { form, dispatch, onCancel } = this.props

    form.validateFields(async (err, values) => {
      if (err) return

      const { role_name = '' } = values || {}

      $api.permissions.createRole({ role_name }).then(({ data = ''}) => {
        // if (data) {
          onCancel && onCancel()
          dispatch({ type: 'security/updateRolesList' })
        // }
      }).catch(({ message = '此名称已存在，请重新输入!' }) => {
        //判断名称重复，后台需要提供message
        form.setFields({
          role_name: {
            errors: [new Error(message)]
          }
        })
      })
    })
  }

  render() {
    const { form, visible } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        title="添加角色"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Form autoComplete='off' className={styles.addRole} {...formItemLayout}>
          <Form.Item label="名称">
            {
              getFieldDecorator('role_name', {
                rules: [{
                  required: true,
                  message: '请填写角色名称',
                }]
              })(
                <Input maxLength={20} placeholder="请输入名称" autoComplete='off' />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default AddRole