import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Radio, Row, Col, Card, DatePicker } from 'antd';
import { InputNumberGroup } from 'components'
import { COUPON_TYPE, OVER_TYPE } from '../../constants'
import styles from '../index.less'
import moment from 'moment'
import { cutOutDecimals } from 'utils'

const { RangePicker } = DatePicker

class Message extends PureComponent {

  handleUpdateCouponForm = (values = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'couponAdd/updateCouponForm',
      payload: {
        ...values,
      }
    })
  }

  handleDisabledDate = (current) => {

    return (
      current < moment().startOf('day')
    )
  }

  getCouponContents = (couponType) => {
    const { form: { getFieldDecorator }, couponForm = {} } = this.props
    const { waiverAmountCash = '', waiverAmountMoneyOff, maxAmount } = couponForm
    const simpleRule = { rules: [{ required: true, message: '请输入金额' }] }

    let contents = {}
    switch (couponType) {
      case COUPON_TYPE.CASH:
        contents = (
          <Form.Item className={styles.mb_0}>
            <Row type="flex" >
              <Col className={styles.mr_10}>面额</Col>
              <Col className={styles.flex_1}>
                {
                  getFieldDecorator('waiver_amount_cash', {
                    ...simpleRule,
                    initialValue: waiverAmountCash,
                  })(
                    <InputNumberGroup
                      addonAfter='元'
                      formatter={value => cutOutDecimals(value, 2)}
                      onChange={value => {
                        this.handleUpdateCouponForm({ waiverAmountCash: value })
                      }}
                    />
                  )
                }</Col>
            </Row>
          </Form.Item>
        )
        break;
      case COUPON_TYPE.MONEY_OFF:
        contents = (
          <div>
            <Form.Item className={styles.mb_0}>
              <Row type="flex" >
                <Col className={styles.mr_10}>面额</Col>
                <Col className={styles.flex_1}>
                  {
                    getFieldDecorator('waiver_amount_money_off', {
                      ...simpleRule,
                      initialValue: waiverAmountMoneyOff,
                    })(
                      <InputNumberGroup
                        addonAfter='元'
                        formatter={value => cutOutDecimals(value, 2)}
                        onChange={value => {
                          this.handleUpdateCouponForm({ waiverAmountMoneyOff: value })
                        }}
                      />
                    )
                  }
                </Col>
              </Row>
            </Form.Item>

            <Form.Item className={styles.mb_0}>
              <Row type="flex">
                <Col>消费满</Col>
                <Col className={styles.messageMax}>
                  {
                    getFieldDecorator('max', {
                      ...simpleRule,
                      initialValue: maxAmount,
                    })(
                      <InputNumberGroup
                        addonAfter='元'
                        formatter={value => cutOutDecimals(value, 2)}
                        onChange={value => { this.handleUpdateCouponForm({ maxAmount: value }) }}
                      />
                    )
                  }
                </Col>
                <Col style={{ position: 'relative' }}>使用
                <span className={styles.maxTooltip}>(注：使用条件需要大于或等于优惠券面额）</span></Col>
              </Row>
            </Form.Item>
          </div>
        )
        break;
    }

    return contents
  }

  getOverTypeTimeContents = (overType) => {
    const { form: { getFieldDecorator }, couponForm = {} } = this.props
    const { overTypeTime = '', days = '' } = couponForm
    const timeRule = { rules: [{ type: 'array', required: true, message: '请选择时间' }] }

    if (overType === OVER_TYPE.TIME) {
      return (
        <Form.Item className={styles.mb_5}>
          {
            getFieldDecorator('over_type_time', {
              ...timeRule,
              initialValue: overTypeTime,
            })(
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                  defaultValue: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={value => {
                  this.handleUpdateCouponForm({ overTypeTime: value })
                }}
                disabledDate={this.handleDisabledDate}
              />
            )
          }
        </Form.Item>
      )
    } else if (overType === OVER_TYPE.DAYS) {
      return (
        <Form.Item className={styles.mb_5}>
          <Row type="flex" justify="space-between">
            <Col className={styles.mr_10}>有效天数</Col>
            <Col className={styles.flex_1}>
              {
                getFieldDecorator('days', {
                  rules: [{
                    required: true,
                    message: '请填写有效天数',
                  }],
                  initialValue: days,
                })(
                  <InputNumberGroup
                    addonAfter='天'
                    formatter={value => cutOutDecimals(value)}
                    onChange={value => {
                      this.handleUpdateCouponForm({ days: value })
                    }}
                  />
                )
              }
            </Col>
          </Row>
        </Form.Item>
      )
    }
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const couponType = (form && form.getFieldValue('type')) || COUPON_TYPE.CASH
    const overType = (form && form.getFieldValue('be_over_type')) || OVER_TYPE.TIME

    const simpleRule = { rules: [{ required: true, message: '请填写' }] }

    const nameLabel = (
      <span>
        标题
      </span>
    )

    return (
      <Card title="基本信息">
        <div className={styles.message}>
          <Form.Item label={nameLabel}>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入标题' }],
              })(
                <Input placeholder="请输入标题，不超过20字符" maxLength={20} autoComplete='off' />
              )
            }
          </Form.Item>
          <Form.Item label="优惠券类型">
            {
              getFieldDecorator('type', {
                initialValue: couponType,
              }, simpleRule)(
                <Radio.Group className={styles.radioGroup}>
                  <Radio value={COUPON_TYPE.CASH}>现金券</Radio>
                  <Radio value={COUPON_TYPE.MONEY_OFF} style={{ minWidth: 102 }}>满减券</Radio>
                </Radio.Group>
              )
            }
            {this.getCouponContents(couponType)}
          </Form.Item>
          <Form.Item label="生效日期">
            {
              getFieldDecorator('be_over_type', {
                initialValue: overType,
              })(
                <Radio.Group className={styles.radioGroup}>
                  <Radio value={OVER_TYPE.TIME}>固定时间</Radio>
                  <Radio value={OVER_TYPE.DAYS}>领取后时间</Radio>
                </Radio.Group>
              )
            }
            {this.getOverTypeTimeContents(overType)}
          </Form.Item>
          <Form.Item label="库存">
            {
              getFieldDecorator('num', {
                rules: [{
                  required: true,
                  pattern: /^[0-9]*[1-9][0-9]*$/,
                  message: '请填写库存数 ( 正整数 )',
                },
                ],
              })(
                <InputNumberGroup addonAfter="张" formatter={value => cutOutDecimals(value)} />
              )
            }
          </Form.Item>
        </div>
      </Card>
    );
  }
}

export default Message