import React from 'react'
import { Card, Descriptions } from 'antd'
import styles from '../index.less'

class OrderStatus extends React.PureComponent {
  render() {
    const { showModal, order } = this.props


    const logistics = order.logistics_info && order.logistics_info.content || [];
    let logisticsString = '-';

    if (logistics.length > 0) {
      logisticsString = `${logistics[0].time || ''} ${logistics[0].text || ''}`
    }
    return (
      <Card
        title={`当前状态：${order.status_name}`}
        className={styles.orderDetailCard}
      >
        <Descriptions title="收货人信息">
          <Descriptions.Item label="联系人">{order.receiver_name}</Descriptions.Item>
          <Descriptions.Item label="联系方式">{order.receiver_mobile}</Descriptions.Item>
          <Descriptions.Item label="联系地址">
            {order.receiver_province_name}{order.receiver_city_name}{order.receiver_district_name}
            {order.receiver_address}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="物流信息">
          <Descriptions.Item label="物流公司">{order.logistics_name || '-'}</Descriptions.Item>
          <Descriptions.Item label="快递单号" span={2}>
            {order.logistics_sn || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="物流跟踪" span={3}>
            {
              logistics && !!logistics.length &&
              <a
                onClick={() => {
                  showModal('logisticsTrailModal')
                }}
              >
                {logisticsString}（查看详情）
            </a>
            }
            {
              (!logistics || !logistics.length) && '-'
            }
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default OrderStatus
