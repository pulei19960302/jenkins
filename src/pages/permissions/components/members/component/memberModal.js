import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select, TreeSelect } from 'antd';

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
}

class memberModal extends PureComponent {
  state = {
    loading: false,
  }
  handleOk = () => {
    const { form, onCancel, successCallback, member } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        if (member.id) {   // 修改
          $api.permissions
            .updateMember({ ...values, member_id: member.id }, { success: true, loadingFn: this.toogleLoading })
            .then(res => {
              onCancel()
              successCallback()
            })
        } else {  // 新增
          $api.permissions
            .addMember({ ...values }, { success: true, loadingFn: this.toogleLoading })
            .then(res => {
              onCancel()
              successCallback({ page: 1 })
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
      roleList,
      treeData,
      member,
    } = this.props
    const { loading } = this.state
    const modalOpts = {
      title: member.id ? '编辑成员' : '新增成员',
      width: 500,
      confirmLoading: loading,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    }
    console.log(member)
    return (
      <Modal {...modalOpts}>
        <Form {...formItemLayout}>
          <Form.Item label='成员账号'>
            {
              getFieldDecorator('member_account', {
                initialValue: member.username,
                rules: [
                  {
                    required: true,
                    message: '请填写成员账号',
                  },
                ],
              })(
                <Input maxLength={20} />
              )
            }
          </Form.Item>
          <Form.Item label='登录密码'>
            {
              getFieldDecorator('member_password', {
                rules: [
                  {
                    required: member.id ? false : true,
                    message: '请填写登录密码',
                  },
                ],
              })(
                <Input type="password" maxLength={20} />
              )
            }
          </Form.Item>
          <Form.Item label='成员姓名'>
            {
              getFieldDecorator('member_name', {
                initialValue: member.name,
              })(
                <Input maxLength={10} />
              )
            }
          </Form.Item>
          <FormItem label='成员角色'>
            {
              getFieldDecorator('role_id', {
                initialValue: member.role_ids ? member.role_ids.split(',').map(el => +el) : undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择成员角色',
                  },
                ],
              })(

                <Select mode="multiple">
                  {roleList.map(d => (
                    <Option value={d.value} key={d.value}>
                      {d.name}
                    </Option>
                  ))}
                </Select>
              )
            }
          </FormItem>
          <FormItem label='所属部门'>
            {
              getFieldDecorator('department_id', {
                initialValue: member.group_id,
                rules: [
                  {
                    required: true,
                    message: '请选择所属部门',
                  },
                ],
              })(
                <TreeSelect
                  showSearch
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeDefaultExpandAll
                  treeData={treeData}
                >
                </TreeSelect>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(memberModal)
