import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input } from 'antd';
import logo from 'assets/images/logo.png'
import styles from './index.less'

@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFields } = form
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.login}>
        <div className={styles.icon}>
          <img src={logo} />
        </div>
        <div className={styles.center}>
          <Form>
            <div className={styles.title}>登录</div>
            <Form.Item>
              <span className={styles.label}>
                <UserOutlined className='mr8' />
                账号
              </span>
              {
                getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请输入账号',
                  }],
                })(
                  <Input placeholder="请输入账号" size='large' />
                )
              }
            </Form.Item>
            <Form.Item>
              <span className={styles.label}>
                <LockOutlined className='mr8' />
                密码
              </span>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请填写密码',
                }],
              })(
                <Input.Password onPressEnter={this.handleOk} placeholder="请输入密码" size='large' />
              )}
            </Form.Item>
            <Button className={styles.submit} type="primary" onClick={this.handleOk} loading={loading.effects.login}>
              登录
            </Button>
          </Form>
        </div>
        <div className={styles.footer}>

        </div>
      </div>
    );
  }
}

export default Login
