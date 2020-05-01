import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
}

class DepartmentModal extends PureComponent {
  state = {
    loading: false,
  }
  handleOk = () => {
    const { form, onCancel, successCallback, department } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        if (department.id) {
          const data = [{ ...values, id: department.id }]
          $api.permissions.updateDepartment({ departments: data }, { success: true, loadingFn: this.toogleLoading }).then(() => {
            onCancel()
            successCallback()
          })
        } else {
          $api.permissions.addDepartment({ ...values, parent_id: department.parent_id }, { success: true, loadingFn: this.toogleLoading }).then(() => {
            onCancel()
            successCallback()
          })
        }
      }
    })
  }
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      modalVisible,
      department
    } = this.props
    const { loading } = this.state
    const modalOpts = {
      title: department.id ? '编辑部门' : '新增部门',
      width: 500,
      confirmLoading: loading,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    }
    return (
      <Modal {...modalOpts}>
        <Form {...formItemLayout}>
          {
            department.ptitle &&
            <Form.Item label='所属部门'>
              {department.ptitle}
            </Form.Item>
          }
          <Form.Item label='部门名称'>
            {
              getFieldDecorator('department_name', {
                initialValue: department.department_name,
                rules: [
                  {
                    required: true,
                    message: '请填写部门名称(限10字)',
                  },
                ],
              })(
                <Input maxLength={10}/>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(DepartmentModal)
