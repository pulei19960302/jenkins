import account from 'accounting'
import moment from 'moment'
import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Row, Col, Radio, Input } from 'antd';
import styles from '../index.less'
import { WITHDRAW_STATUS_FIELDS as statusFields, FORMAT, } from '../../constants'

const MAXLENGTH = 100
@Form.create()
@connect(({ transferList }) => ({ ...transferList }))
class ReviewTransfer extends PureComponent {

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { form, onOk } = this.props
    form && form.validateFields((err, values) => {
      if (err) return

      const { details: { id = '' } } = this.props
      const ids = id && id.toString()
      $api.finance.transferCheck({ ids, ...values }).then(_ => {
        onOk && onOk()
      })
    })
  }

  renderInfos() {
    const { forCheck, details, payWay } = this.props
    const {
      status = '',
      order_no = '',
      money = '',
      real_money = '',
      type_txt = '',
      created_at = '',
      remark = '',
      data = '',
      fee = '',
      pay_way = '',
      account: accountName = '',
      real_name = '',
      audit = '',
      audit_txt = '',
    } = details

    const info = data && JSON.parse(data)

    if (pay_way === 'bank') return null

    return (
      <div className={styles.reviewTransfer}>
        <Row type="flex">
          <Col span={6}>提现状态&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{statusFields[status]}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>提现单号&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{order_no}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>提现金额(元)&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{account.formatMoney(money, '￥')}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>手续费比例(%)&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{fee}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>实际提现(元)&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{account.formatMoney(real_money, '￥')}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>提现渠道&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{payWay && payWay[pay_way]}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>提现账号&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{accountName}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>用户真实姓名&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{real_name}</Col>
        </Row>
        <Row type="flex">
          <Col span={6}>创建时间&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={18}>{created_at && moment(created_at).format(FORMAT.DATETIME)}</Col>
        </Row>
        {/* <Row type="flex">
          <Col span={8}>提现状态&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span="8">手续费比例(%)&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>提现渠道&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>提现账号&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>用户真实姓名&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row> */}
        {/* 
         <Row type="flex">
          <Col span={8}>提现支付类型</Col>
          <Col span={16}>{type_txt}</Col>
        </Row>
        <Row type="flex">
          <Col span={8}>开户行</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>银行卡号</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>银行卡ID</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>银行卡真实姓名</Col>
          <Col span={16}></Col>
        </Row>
        <Row type="flex">
          <Col span={8}>银行预留电话</Col>
          <Col span={16}></Col>
        </Row> */}
        {/* <Row type="flex">
          <Col span={8}>创建时间&nbsp;:&nbsp;&nbsp;</Col>
          <Col span={16}></Col>
        </Row> */}
        {
          !forCheck && (
            <Fragment>
              <Row type="flex">
                <Col span={6}>审核意见&nbsp;:&nbsp;&nbsp;</Col>
                <Col span={18}>{audit}</Col>
              </Row>
              <Row type="flex">
                <Col span={6}>备注&nbsp;:&nbsp;&nbsp;</Col>
                <Col span={18}>{audit_txt}</Col>
              </Row>
            </Fragment>
          )
        }
      </div>
    )
  }

  renderForm() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const notes = form && form.getFieldValue('remark')
    const length = notes ? notes.length : 0

    return (
      <Form className={styles.form}>
        <Form.Item label="审核意见" type="flex" style={{ margin: '0 13px 10px 13px' }}>
          {getFieldDecorator('status', {
            initialValue: 1,
          })(
            <Radio.Group className={styles.radioGroup} style={{ marginLeft: '15px' }}>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>拒绝</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="备注" type="flex" className={styles.notes}>
          {getFieldDecorator('remark')(
            <div style={{ position: 'relative' }}>
              <Input.TextArea rows={4} maxLength={100}></Input.TextArea>
              <span className={styles.nums}>{length}/{MAXLENGTH}</span>
            </div>
          )}
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { visible, forCheck, details } = this.props
    if (!details) return null

    if (forCheck) {
      return (
        <Modal
          title="交易审核"
          visible={visible}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          {this.renderInfos()}
          {this.renderForm()}
        </Modal>
      )
    }

    return (
      <Modal
        title="交易审核"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
        onCancel={this.handleCancel}
      >
        {this.renderInfos()}
      </Modal>
    )

  }
}

export default ReviewTransfer