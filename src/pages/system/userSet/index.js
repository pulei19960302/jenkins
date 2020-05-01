import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Row, Col, Input, Button } from 'antd';
import { Page, FSwitch, PageTitle } from 'components'
import styles from './index.less'
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
}
const tipsStyle = {
  marginLeft: '8px',
  lineHeight: '40px'
}
@Form.create()
class UserSet extends PureComponent {
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

  componentDidMount() {
    $api.system.getUserInfo().then(res => {
      const { data = {} } = res
      const {
        improve = 1,
        account_conflict = '',
        abnormal_login = '',
        weChat_authorized = '',
        weChat_unionId = '',
        order_reminder = '',
        order_filter_zero = '',
        only_one_level = '',
        member_binding = 1,
        ...others
      } = data || {}
      this.props.form.setFieldsValue({
        improve: parseInt(improve),
        account_conflict: parseInt(account_conflict),
        abnormal_login: parseInt(abnormal_login),
        weChat_authorized: parseInt(weChat_authorized),
        weChat_unionId: parseInt(weChat_unionId),
        order_reminder: parseInt(order_reminder),
        order_filter_zero: parseInt(order_filter_zero),
        only_one_level: parseInt(only_one_level),
        member_binding: parseInt(member_binding),
        ...others,
      })
    })
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return

      this.toggleLoading()
      $api.system.setUserInfo(values, { success: true }).then(_ => {
        this.toggleLoading()
      }).catch(_ => {
        this.toggleLoading()
      })
    })
  }

  renderFormLabel = (title) => {
    return <label className={styles.formLabel}>
      {title}
    </label>
  }

  render() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form;

    return (
      <Page>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className={styles.container}>
            <div className={styles.title}>安全设置</div>
            <Form.Item label={this.renderFormLabel('完善手机号和密码')} className='mb6'>
              {
                getFieldDecorator('improve')(
                  <Radio.Group style={{ width: '100%' }}>
                    <Col span={12}>
                      <Radio value={1} >进入会员中心提示</Radio>
                      <br />
                      <span className={styles.formLabelTips}>进入会员中心将提示会员完善手机号和密码</span>
                    </Col>
                    <Col span={12}>
                      <Radio value={2}>进入商城提示</Radio>
                      <br />
                      <span className={styles.formLabelTips}>进入商城将提示会员完善手机号和密码</span>
                    </Col>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('账号冲突解决方案')} className='mb6'>
              {
                getFieldDecorator('account_conflict')(
                  <Radio.Group style={{ width: '100%' }}>
                    <Col span={12}>
                      <Radio value={1}>保留老账号</Radio>
                    </Col>
                    <Col span={12}>
                      <Radio value={2}>替换老账号</Radio>
                    </Col>
                    <Col span={24} className={styles.formLabelTips}>
                      <span>该功能主要用于处理换公众号以后,由于同个人openid改变,导致之前会员进入商城后成为新会员的问题,请谨慎选择!</span>
                      <br />
                      <span>相同手机号的老会员的openid将会替换成新会员的openid,新会员账号将被删除！</span>
                      <br />
                      <span>相同手机号的老会员的openid将会替换成新会员的openid,老会员账号将被删除！</span>
                    </Col>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('异常登录短信验证')}>
              {
                getFieldDecorator('abnormal_login')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '取消异常登录短信验证后，您的店铺安全将降低，因此造成的损失后果自负！',
                      '取消异常登录短信验证后，您的店铺安全将降低，因此造成的损失后果自负！']}
                  />
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('需要微信授权')}>
              {
                getFieldDecorator('weChat_authorized')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '关闭后，可以提高首次访问速度，但无法取得微信头像和昵称！',
                      '关闭后，可以提高首次访问速度，但无法取得微信头像和昵称！']}
                  />
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('获取微信UnionID')}>
              {
                getFieldDecorator('weChat_unionId')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '开启后，会员如果没有微信UnionID，进入商城后会调用微信接口获取；请在绑定微信开放平台账号后再开启该功能！',
                      '开启后，会员如果没有微信UnionID，进入商城后会调用微信接口获取；请在绑定微信开放平台账号后再开启该功能！']}
                  />
                )
              }
            </Form.Item>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>提醒设置</div>
            <Form.Item label={this.renderFormLabel('下单提醒')}>
              {
                getFieldDecorator('order_reminder')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '开启后，会员下单支付后会有消息提醒！',
                      '开启后，会员下单支付后会有消息提醒！']}
                  />
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('过滤佣金为0的订单')}>
              {
                getFieldDecorator('order_filter_zero')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '过滤后，不再给上级发送预计佣金为0的消息提醒！',
                      '过滤后，不再给上级发送预计佣金为0的消息提醒！']}
                  />
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('C端只显示一级会员')}>
              {
                getFieldDecorator('only_one_level')(
                  <FSwitch
                    tipStyle={{ ...tipsStyle }}
                    values={[1, 0]}
                    tips={[
                      '开启后只在微信中显示一级会员',
                      '开启后只在微信中显示一级会员！']}
                  />
                )
              }
            </Form.Item>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>其他设置</div>
            <Form.Item label={this.renderFormLabel('其他设置')}>
              {
                getFieldDecorator('member_binding')(
                  <Radio.Group style={{ width: '100%' }}>
                    <Col span={12}>
                      <Radio value={1} >推荐成会员绑定</Radio>
                    </Col>
                    <Col span={12}>
                      <Radio value={2}>推荐下单后绑定</Radio>
                    </Col>
                    <Col span={24} className={styles.formLabelTips}>
                      <span>推荐成会员绑定：系统默认的绑定方式，成为会员时是谁推荐的就是谁的下级。</span>
                      <br />
                      <span>推荐下单后绑定：会员第一次下单是谁推荐的就是谁的下级，如果一直没有下单或者下单时没人推荐就是顶级会员。</span>
                    </Col>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('版权所有')}>
              {
                getFieldDecorator('copyright', {
                  rules: [{ required: true, message: '请输入版权信息' }]
                })(
                  <Input placeholder="请输入" />
                )
              }
            </Form.Item>
            <Form.Item label={this.renderFormLabel('短信签名')}>
              {
                getFieldDecorator('sms_signature', {
                  rules: [{ required: true, message: '请输入签名信息' }]
                })(
                  <Input placeholder="请输入" />
                )
              }
            </Form.Item>
          </div>
          {
            $api.system.setUserInfo.permission() && (
              <div className={styles.submit}>
                <Button type="primary" onClick={this.handleSubmit} loading={loading}>提交</Button>
              </div>
            )
          }
        </Form>
      </Page>
    )
  }
}

export default UserSet
