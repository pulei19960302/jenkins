import React, { PureComponent, Fragment } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { InputNumber, Input, Table } from 'antd';
import { FSwitch, } from 'components'
import { orderFields } from '../components/fields'
import { TRADE_SET_SWITCH } from '../../constants'
import styles from '../index.less'

class PaymentSet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  handleUpdateOrderList = (key, value, row) => {
    const { id = '' } = row
    const { dispatch, orderTypesList = [] } = this.props
    const newList = orderTypesList.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          [key]: value,
        }
      }
      return el
    })
    dispatch({
      type: 'tradeSet/updateState',
      payload: {
        orderTypesList: newList,
      }
    })
  }

  handleDeleteOrderType = (row) => {
    const { id = '' } = row
    const { orderTypesList = [], dispatch } = this.props
    const newList = orderTypesList.filter((el) => (el.id !== id))

    dispatch({
      type: 'tradeSet/updateState',
      payload: {
        orderTypesList: newList,
      }
    })
  }

  handleAddOrderType = () => {
    const { count } = this.state
    const { orderTypesList = [], dispatch } = this.props
    this.setState({
      count: count + 1
    }, () => {
      const { count } = this.state
      const newList = [
        ...orderTypesList,
        { id: `add-${count}` }
      ]

      dispatch({
        type: 'tradeSet/updateState',
        payload: {
          orderTypesList: newList,
        }
      })
    })
  }

  renderTips() {
    const { form: { getFieldDecorator }, switchs = {}, toggleSwitchs } = this.props
    const { paymentRemind = false } = switchs

    return (
      <div className={styles.content}>
        <div className={`${styles.flex} ${styles.item}`}>
          <span className={styles.label}>催付提醒</span>
          <FSwitch
            onChange={(checked) => {
              toggleSwitchs('paymentRemind', checked)
            }}
            value={paymentRemind}
            texts={['是', '否']} />
        </div>
        {
          (paymentRemind === TRADE_SET_SWITCH.TRUE) && (
            <Fragment>
              <Form.Item className={styles.item}>
                <span className={styles.label}>客户下单后</span>
                {
                  getFieldDecorator('aaa', {
                    rules: [{
                      required: true,
                      message: '请输入'
                    }]
                  })(
                    <InputNumber min={1} max={600} placeholder="请输入" precision={0} />
                  )
                }
                <span style={{ marginLeft: 8 }}>分钟&nbsp;&nbsp;后进行催付提醒</span>
              </Form.Item>
              <Form.Item className={`${styles.item} ${styles.remindContent}`}>
                <span className={styles.label}>催付提醒内容</span>
                {
                  getFieldDecorator('bbb')(
                    <Input.TextArea placeholder="请输入催付提醒内容" />
                  )
                }
              </Form.Item>
            </Fragment>
          )
        }
      </div>
    )
  }

  renderCancelOrder() {
    const { switchs = {}, orderTypesList = [], toggleSwitchs } = this.props
    const { autoCancelOrder = false } = switchs

    return (
      <div className={styles.content}>
        <div className={`${styles.flex} ${styles.item}`}>
          <span className={styles.label}>自动取消订单</span>
          <FSwitch
            onChange={(checked) => {
              toggleSwitchs('autoCancelOrder', checked)
            }}
            value={autoCancelOrder}
            texts={['是', '否']} />
        </div>
        {
          (autoCancelOrder === TRADE_SET_SWITCH.TRUE) && (
            <div className={styles.orderTypesList}>
              <Table
                columns={orderFields.call(this)}
                dataSource={orderTypesList}
                pagination={false}
                bordered={true}
              />
              <div className={styles.add} onClick={this.handleAddOrderType}>
                <PlusOutlined />新增</div>
            </div>)
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>付款时效设置</div>
        {this.renderTips()}
        {this.renderCancelOrder()}
      </div>
    )
  }
}

export default PaymentSet