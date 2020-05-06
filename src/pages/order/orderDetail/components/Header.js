import React from 'react'
import { IconFont } from 'components'
import { Card, Descriptions, Row, Col, Button } from 'antd'
import { hasBtn } from '../../constants'
import account from 'accounting'
import styles from '../index.less'

class OrderInfo extends React.PureComponent {
  state = {}
  getBtn = () => {
    const { showModal, order, checkApply, loading } = this.props
    return (
      <div className={styles.headerBtns}>
        {/* <Button
          onClick={() => {
            showModal('cancelOrderModal')
          }}
        >
          取消订单
        </Button> */}
        {
          hasBtn('modifyAddress', order.status) &&
          <Button
            onClick={() => {
              showModal('modifyAddressModal')
            }}
          >
            修改地址
        </Button>
        }
        {
          hasBtn('modifyLogistics', order.status) &&
          <Button
            onClick={() => {
              showModal('modifyLogisticsModal')
            }}
          >
            修改物流
        </Button>
        }
        {
          hasBtn('applyAfterSale', order.status) &&
          <Button
            onClick={() => {
              checkApply()
            }}
            loading={loading}
          >
            申请售后
        </Button>
        }
        {
          hasBtn('modifyRemarks', order.status) &&
          <Button
            onClick={() => {
              showModal('modifyRemarksModal')
            }}
          >
            订单备注
        </Button>
        }
        {
          hasBtn('sendGoods', order.status) &&
          <Button
            onClick={() => {
              showModal('sendGoodsModal')
            }}
          >
            一键发货
        </Button>
        }
      </div>
    )
  }
  render() {
    const { order } = this.props
    const title = () => {
      return (
        <div>
          <IconFont type="icondingdan" style={{ color: '#12C2C2', verticalAlign: 'middle', fontSize: 18 }} />
          &nbsp;<span style={{ verticalAlign: 'middle' }}>
            订单号：{order.order_sn}&nbsp;&nbsp;
            {order.status_name} &nbsp;&nbsp;
            {account.formatMoney(order.actual_fee, '￥')}
          </span>
        </div>
      );
    }
    return (
      <Card
        headStyle={{ borderBottom: 'none' }}
        title={title()}
        extra={this.getBtn()}
        className={styles.header}
      >
        <Row>
          <Col>
            <Descriptions>
              <Descriptions.Item label="用户名称">{order.nick_name}</Descriptions.Item>
              <Descriptions.Item label="支付方式">{order.pay_type_name}</Descriptions.Item>
              <Descriptions.Item label="订单来源">{order.from_name}</Descriptions.Item>
              <Descriptions.Item label="付款时间">
                {order.pay_time || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="发货时间">
                {order.send_time || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="成交时间">
                {order.take_time || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          {/* <Col span={5}>
            <Row>
              <Col span={12}>
                <p className={styles.headerRightTitle}>状态</p>
                <p className={styles.headerRightValue}>待收货</p>
              </Col>
              <Col span={12}>
                <p className={styles.headerRightTitle}>订单总额</p>
                <p className={styles.headerRightValue}>
                  {account.formatMoney(1893, '￥')}
                </p>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Card>
    )
  }
}

export default OrderInfo
