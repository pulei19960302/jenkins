import account from 'accounting'
import moment from 'moment'
import { connect } from 'dva'
import React, { PureComponent, Fragment } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Row, Col, Radio, Input, Drawer, Descriptions } from 'antd';
import { InputNumberGroup, DrawerFooter } from 'components'
import { cutOutDecimals } from 'utils'
import { FORMAT, SUPPLIER_STATUS } from '../../constants'
import styles from '../index.less'

const MAXLENGTH = 100
@Form.create()
class SettleAccount extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      changeRemark: false,
    }
  }
  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { form, details: { id = '' }, onOk } = this.props
    form && form.validateFields((err, values) => {
      if (err) return null

      const { status = '', paid_amount = '', remark = '' } = values
      const params = {
        id: (id && id.toString()) || '',
        status: (status && status.toString()) || '',
        paid_amount: (paid_amount && paid_amount.toString()) || '',
        remark: (remark && remark.toString()) || '',
      }
      const title = status === SUPPLIER_STATUS.CLOSED ? '结束结算' : '结算'
      const content = status === SUPPLIER_STATUS.CLOSED ? '确认结清本次账单？' : '确认结算本次账单？'
      Modal.confirm({
        title,
        content,
        cancelText: '取消',
        okText: '确定',
        onOk: () => {
          $api.finance.settle(params).then(_ => {
            onOk && onOk()
          })
        },
      })
    })
  }

  handleChangeRemark = () => {
    this.setState({
      changeRemark: true,
    })
  }

  renderInfos() {
    const { details = {} } = this.props
    const {
      supplier_name = '',
      supplier_id = '',
      created_at = '',
      order_num = '',
      money = '',
      paid_amount = '',
    } = details || {}
    return (
      <Descriptions column={1}>
        <Descriptions.Item label="供应商">
          {supplier_name}&nbsp;({supplier_id})
        </Descriptions.Item>
        <Descriptions.Item label="生成时间">
          {created_at && moment(created_at*1000).format(FORMAT.DATETIME)}
        </Descriptions.Item>
        <Descriptions.Item label="待结订单">
          {account.formatNumber(order_num)}
        </Descriptions.Item>
        <Descriptions.Item label="待结总额">
          {account.formatNumber(money)}
          <span style={{ marginLeft: 10 }}>元</span>
        </Descriptions.Item>
        <Descriptions.Item label="已结金额">
          {account.formatNumber(paid_amount)}
          <span style={{ marginLeft: 10 }}>元</span>
        </Descriptions.Item>
      </Descriptions>
    )
  }

  renderForm() {
    const { form, details = {} } = this.props
    const { remark: remarkProps = '', status = '' } = details || {}
    const { getFieldDecorator } = form
    const remark = form && form.getFieldValue('remark')

    const { changeRemark } = this.state
    const length = changeRemark ? remark && remark.length : remarkProps && remarkProps.length

    return (
      <Form className={styles.settleForm}>
        {
          status === SUPPLIER_STATUS.WAIT &&
          (
            <Form.Item label="本次结算">
              {
                getFieldDecorator('paid_amount', {
                  rules: [{
                    required: true,
                    message: '请输入结算金额',
                  }]
                })(
                  <InputNumberGroup addonAfter='元' formatter={value => cutOutDecimals(value, 2)} />
                )
              }
            </Form.Item>
          )
        }
        {
          status === SUPPLIER_STATUS.WAIT ? (
            <Form.Item label="是否结清">
              {
                getFieldDecorator('status', {
                  initialValue: 1,
                })(
                  <Radio.Group style={{ marginLeft: '15px' }}>
                    <Radio value={SUPPLIER_STATUS.WAIT}>否</Radio>
                    <Radio value={SUPPLIER_STATUS.CLOSED}>是</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
          ) :
            (
              <Form.Item label="是否结清">
                <span>是</span>
              </Form.Item>
            )
        }

        <Form.Item label="备注">
          {
            getFieldDecorator('remark', {
              initialValue: remarkProps,
            })(
              <div style={{ position: 'relative' }}>
                <Input.TextArea rows={4} defaultValue={remarkProps} onChange={this.handleChangeRemark} maxLength={MAXLENGTH} />
                <span className={styles.nums}>{length || 0}/{MAXLENGTH}</span>
              </div>
            )
          }
        </Form.Item>
        <DrawerFooter onOk={this.handleOk} onCancel={this.handleCancel}></DrawerFooter>
      </Form>
    )
  }

  render() {
    const { visible } = this.props
    return (
      <Drawer
        title="结算"
        placement="right"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        onClose={this.handleCancel}
        width={600}
      >
        {this.renderInfos()}
        {this.renderForm()}
      </Drawer>
    )
  }
}

export default SettleAccount