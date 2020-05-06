import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button, Input, Form } from 'antd'
import {debounce} from 'lodash'
import { IconFont } from 'components'
import leftImage from 'assets/images/bj-left.png'
import styles from './index.less'

@connect(({ loading }) => ({ loading }))
class Login extends PureComponent {

  onFinish = (values) => {
    const { dispatch } = this.props
    dispatch({ type: 'login/login', payload: values })
  }

  render() {
    const { loading } = this.props

    return (
      <div className={styles.login}>
        <div className={styles.center}>
          <img src={leftImage} className='leftImage' />
          <Form onFinish={debounce(this.onFinish, 300)}>
            <div className='title'>登录</div>
            <Form.Item
              name='username'
              rules={[{
                required: true,
                message: '请输入账号',
              }]}
              className='username'
            >
              <Input placeholder="请输入账号" size='large' prefix={<IconFont type='iconuser' />} />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{
                required: true,
                message: '请填写密码',
              }]}
              className='password'
            >
              <Input.Password placeholder="请输入密码" size='large' prefix={<IconFont type='iconsuo' />}/>
            </Form.Item>
            <Form.Item>
              <Button
                className='submit'
                type="primary"
                htmlType="submit"
                loading={loading.effects['login/login']}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.footer}>
          <span>Copyright&nbsp;©&nbsp;2020&nbsp;www.hehewin.com&nbsp;All&nbsp;Rights&nbsp;Reserved</span>
          <br/>
          <span>成都合和盈创科技有限公司版权所有&nbsp;&nbsp;&nbsp;蜀ICP备20010387号-2</span>
        </div>
      </div>
    );
  }
}

export default Login
