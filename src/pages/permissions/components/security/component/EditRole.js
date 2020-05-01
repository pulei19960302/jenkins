import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Modal } from 'antd';
import styles from '../index.less'

const formItemLayout = {
  wrapperCol: { span: 18 },
}
@Form.create()
class EditRole extends PureComponent {
  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { form, editRole = {}, dispatch } = this.props
    const { id } = editRole

    form.validateFields(async (err, values) => {
      if (err) return

      const { role_name = '' } = values || {}
      dispatch({
        type: 'security/updateRole',
        payload: { role_name, id }
      }).then(_ => { this.handleCancel() })
    })
  }

  render() {
    const { form, visible, editRole = {} } = this.props
    const { getFieldDecorator } = form
    const { role_name = '' } = editRole

    return (
      <Modal
        title="修改角色名称"
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
                }],
                initialValue: role_name,
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

export default EditRole