import store from 'store'
import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Spin } from 'antd';
import { Page, UploadImg } from 'components'
import { router } from 'utils'
import { emailReg } from 'utils/constant'
import styles from './index.less'

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 8 },
}
@Form.create()
@connect(({ app }) => ({ app }))
class AccountSet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }))
  }

  handleImgChange = (imgArr = []) => {
    const { form } = this.props
    const img = imgArr && imgArr[0]
    form.setFieldsValue({ 'avatar': img })
  }

  handleSubmit = () => {
    const { form, dispatch, app } = this.props
    const { user = {} } = app
    form.validateFields((err, values) => {
      if (err) return null

      $api.user.accountSet(values, { success: true, loadingFn: this.toggleLoading }).then((res) => {
        const { data = {} } = res
        const newUser = {
          ...user,
          ...data,
        }
        dispatch({ type: 'app/updateState', payload: { user: newUser } })
        router.push('/dashboard')
      })
    })
  }

  handleRest = () => {
    const { form } = this.props
    form.resetFields()
  }

  renderForm() {
    const { form, app: { user = {} } } = this.props
    const { getFieldDecorator } = form
    const { avatar = '', name = '', email = '' } = user

    return (
      <Form {...formItemLayout} className={styles.form} autoComplete='off' role="presentation">
        <Form.Item label="头像">
          <div className={`${styles.photo} dpflex`}>
            {
              getFieldDecorator('avatar')(
                <UploadImg
                  desc='上传图片'
                  fileTotalCount={1}
                  dataChange={this.handleImgChange}
                  pic={avatar}
                />
              )
            }
            <ol>
              <li>格式&nbsp;:&nbsp;&nbsp;图片仅支持JPG,PNG格式</li>
              <li>大小&nbsp;:&nbsp;&nbsp;建议1M以内</li>
            </ol>
          </div>
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            initialValue: name,
          })(
            <Input
              autoComplete="off"
              placeholder='请输入姓名'
              maxLength={10} />
          )}
        </Form.Item>
        <Form.Item label="电子邮箱">
          {getFieldDecorator('email', {
            initialValue: email,
            rules: [{ pattern: emailReg, message: '请输入正确的邮箱' }]
          })(
            <Input
              autoComplete="off"
              placeholder='请输入电子邮箱'
              readonly />
          )}
        </Form.Item>
        <Form.Item label="旧密码">
          {getFieldDecorator('password_old')(
            <Input type="password"
              autoComplete="off"
              placeholder='请输入旧密码&nbsp;&nbsp;(不修改可不填写)'
              maxLength={20}
            />
          )}
        </Form.Item>
        <Form.Item label="新密码">
          {getFieldDecorator('password')(
            <Input type="password"
              autoComplete="off"
              placeholder='请输入新密码&nbsp;&nbsp;(不修改可不填写)'
              maxLength={20} />
          )}
        </Form.Item>
        <Form.Item label="确认新密码">
          {getFieldDecorator('password_conf')(
            <Input type="password"
              autoComplete="off"
              placeholder='请输入新密码&nbsp;&nbsp;(不修改可不填写)'
              maxLength={20} />
          )}
        </Form.Item>
      </Form>
    )
  }

  renderSpin() {
    const { loading } = this.state
    if (!loading) return

    return (
      <div className={styles.spin}>
        <Spin />
      </div>
    )
  }

  render() {
    return (
      <Page inner>
        {this.renderSpin()}
        <div className={styles.title}>
          <ArrowLeftOutlined onClick={() => { this.props.history.goBack() }} />
          <span>账户设置</span>
        </div>
        {this.renderForm()}
        <div className={styles.btns}>
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
          {/* <Button onClick={this.handleRest}>重置</Button> */}
        </div>
      </Page>
    );
  }
}

export default AccountSet