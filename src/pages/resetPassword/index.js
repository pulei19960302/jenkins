import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/navlink'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Input } from 'antd';
import { GlobalFooter } from 'ant-design-pro'
import config from 'utils/config'

import styles from './index.less'
const FormItem = Form.Item
let timer = ''

@connect(({ loading }) => ({ loading }))
@Form.create()
class ResetPassword extends PureComponent {
  state = {
    seconds: -1,
  }
  componentWillUnmount() {
    clearInterval(timer)
  }
  handleOk = () => {
    const {
      dispatch,
      form: { validateFields },
    } = this.props
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      //   dispatch({ type: 'login/login', payload: values })
    })
  }
  verifyCode() {
    const {
      form: { validateFields },
      dispatch,
    } = this.props
    validateFields(['phoneNum'], (errors, values) => {
      if (errors) {
        return
      }
      this.startCountDown()
      // dispatch({ type: 'login/login', payload: values })
    })
  }
  startCountDown() {
    let { seconds } = this.state
    timer = setInterval(() => {
      if (!seconds) {
        clearInterval(timer)
      }
      this.setState({
        seconds: --seconds,
      })
    }, 1000)
  }

  render() {
    const { loading, form } = this.props
    const { getFieldDecorator } = form
    const { seconds } = this.state
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/* <img alt="logo" src={config.logoPath} /> */}
            <span>找回密码</span>
          </div>
          <form>
            <FormItem>
              {getFieldDecorator('a', {
                rules: [
                  {
                    required: true,
                    message: '请填写手机号',
                  },
                ],
              })(<Input onPressEnter={this.handleOk} placeholder="手机号" />)}
            </FormItem>
            <FormItem>
              <Row>
                <Col span={14}>
                  {getFieldDecorator('b11bbb', {
                    rules: [
                      {
                        required: true,
                        message: '请输入短信验证码',
                      },
                    ],
                  })(<Input placeholder="验证码" />)}
                </Col>
                <Col style={{ textAlign: 'center' }} span={10}>
                  {seconds < 0 ? (
                    <Button onClick={() => this.verifyCode()}>
                      获取验证码
                    </Button>
                  ) : (
                    <span>{`${seconds}秒后重发`}</span>
                  )}
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              {getFieldDecorator('cccc', {
                rules: [
                  {
                    required: true,
                    message: '请填写新密码',
                  },
                ],
              })(
                <Input
                  type="password"
                  placeholder="新密码"
                  autocomplete="new-password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('rePassword', {
                rules: [
                  {
                    required: true,
                    message: '请填写确认密码',
                  },
                ],
              })(<Input type="password" placeholder="确认密码" />)}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading.effects.login}
              >
                登录
              </Button>
            </Row>
            <p>
              <Link to="/login">
                <a href>返回登录</a>
              </Link>
            </p>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

export default ResetPassword
