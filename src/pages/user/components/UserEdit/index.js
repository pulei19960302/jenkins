import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Modal, Input, Radio, DatePicker, Button } from 'antd'
import { mobileReg } from 'utils/constant'
import moment from 'moment'
const FormItem = Form.Item

@Form.create()
@connect(({ loading }) => ({ loading }))
class UserEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userData !== nextProps.userData) {
      let { nickname, phone, gender, birthday, id, member_id } = nextProps.userData
      this.setState({
        id: id || member_id,
      })
      birthday = birthday ? moment(birthday) : undefined
      const { form } = this.props
      form.resetFields()
      form.setFieldsValue({
        nickname,
        phone,
        gender,
        birthday,
      })
    }
  }
  handleCancel = () => {
    this.props.toogle(false)
  }
  handleOk = () => {
    const { form } = this.props
    const { id: member_id } = this.state
    form.validateFields((err, values) => {
      if (!err) {
        $api.user
          .userEdit({ member_id, ...values, birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : undefined }, { success: true, loadingFn: this.toogleLoading })
          .then(_ => {
            this.props.toogle(false)
            this.props.getList()
          })
      }
    })
  }
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }
  render() {
    const { visible, form } = this.props
    const { loading } = this.state
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Modal
        title="用户资料"
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        confirmLoading={loading}
      >
        <Form {...formItemLayout}>
          <FormItem label="用户名">
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请填写手机号',
                },
                { pattern: mobileReg, message: '手机号格式不正确' },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem label="性别">
            {getFieldDecorator('gender', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
            })(
              <Radio.Group>
                <Radio value={0}>保密</Radio>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem label="生日">
            {getFieldDecorator('birthday')(<DatePicker></DatePicker>)}
          </FormItem>

          <FormItem label="登录密码">
            {getFieldDecorator('password')(
              <Input
                autoComplete="new-password"
                type="password"
                placeholder="需要重置时输入"
              ></Input>
            )}
          </FormItem>

          <FormItem label="支付密码">
            {getFieldDecorator('pay_password', {
              rules: [
                { pattern: /^\d{6}$/, message: '支付密码为6位数字' },
              ],
            })(
              <Input
                autoComplete="new-password"
                type="password"
                placeholder="需要重置时输入(6位数字)"
              ></Input>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default UserEdit
