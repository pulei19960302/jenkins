import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Drawer, Descriptions, Timeline } from 'antd'
import account from 'accounting'
import { PreviewImg, LinesEllipsis } from 'components'
import { WORK_STATUS, ORDER_STATUS } from '../../constants'

class OrderInfo extends PureComponent {

  renderDetails() {
    const { order, modalVisible } = this.props
    if(!order || !modalVisible) return null

    return (
      <div>
        <Descriptions title="" size="small" column={1} className="descriptions">
          <Descriptions.Item label="订单单号">{order.order_sn}</Descriptions.Item>
          <Descriptions.Item label="订单状态">{order.status_name}</Descriptions.Item>
          <Descriptions.Item label="下单时间">{order.created_at}</Descriptions.Item>
        </Descriptions>
        <div className="goodsInfo">
          {
            order.goods_infos.map(goods => (
              <div className="goodsList">
                <img src={goods.goods_avatar}
                  alt=""
                  className="goodsImg"
                  onClick={() => {
                    PreviewImg({ imgUrl: goods.goods_avatar })
                  }} />
                <div className="goodsTitle">
                  <LinesEllipsis text={goods.goods_title} maxLine="2" />
                </div>
                <p>{goods.goods_sku_properties_name}</p>
                <p>数量： {goods.goods_nums} 单价：{account.formatMoney(goods.goods_sale_price, '￥')}</p>
              </div>
            ))
          }

          <Descriptions title="" size="small" column={2} className="descriptions">
            <Descriptions.Item label="订单金额">{account.formatMoney(order.total_fee, '￥')}</Descriptions.Item>
            <Descriptions.Item label="运费险">{account.formatMoney(order.insurance_fee, '￥')}</Descriptions.Item>
            <Descriptions.Item label="订单备注" span={2}>{order.buyer_message}</Descriptions.Item>
          </Descriptions>
        </div>

        <Descriptions title="" size="small" column={1} className="descriptions" style={{ border: 'none' }}>
          <Descriptions.Item label="收货信息">
            {order.receiver_name} {order.receiver_mobile}
            <p>{order.receiver_province_name}{order.receiver_city_name}{order.receiver_district_name}</p>
            <p>{order.receiver_address}</p>
          </Descriptions.Item>

          <Descriptions.Item label="物流公司">{order.logistics_name}</Descriptions.Item>
          <Descriptions.Item label="快递单号">{order.logistics_sn}</Descriptions.Item>
          <Descriptions.Item label="物流跟踪"></Descriptions.Item>

          <Timeline>
            {
              order.logistics_info.content.map((el, index) => {
                if (index === 0) {
                return <Timeline.Item color="#E52C33" style={{ color: '#E52C33' }}>{el.time}&nbsp;{el.text}</Timeline.Item>
                } else {
                  return <Timeline.Item>{el.time}&nbsp;{el.text}</Timeline.Item>
                }
              })
            }
          </Timeline>
        </Descriptions>
      </div>
    )
  }

  render() {
    const {
      modalVisible,
      onCancel,
    } = this.props

    return (
      <Drawer title="订单信息" onClose={onCancel} visible={modalVisible} width="650" maskClosable={false}>
        {this.renderDetails()}
      </Drawer>
    )
  }
}

export default OrderInfo