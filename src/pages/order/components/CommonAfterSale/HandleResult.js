import { Descriptions } from 'antd'
import account from 'accounting'
import styles from './index.less'

const HandleResult = ({ order }) => {
  return (
    <div className={styles.blockContainer}>
      <p className={styles.blockTitle}>售后处理意见</p>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="售后方式">{order.type_name}</Descriptions.Item>
        <Descriptions.Item label="售后总金额">
          {account.formatMoney(order.sale_fee_count_by_backend, '￥')}
        </Descriptions.Item>
        <Descriptions.Item label="订单退款">
          {account.formatMoney(order.goods_fee, '￥')}
        </Descriptions.Item>
        <Descriptions.Item label="补偿金额">
          {account.formatMoney(order.add_fee, '￥')}
        </Descriptions.Item>
        <Descriptions.Item label="退还运费">
          {order.freight_type === 0 && '无'}
          {order.freight_type === 1 &&
            `补平台运费 ${account.formatMoney(order.freight_fee, '￥')}`
          }
          {order.freight_type === 2 &&
            `退用户运费/运费险 ${account.formatMoney(order.freight_fee, '￥')}`
          }
        </Descriptions.Item>
        <Descriptions.Item label="是否扣除返利">
          {order.is_rebate === 1 ? '是' : '否'}
        </Descriptions.Item>
        <Descriptions.Item label="合计" span={2}>
          {account.formatMoney(order.total_fee, '￥')}
        </Descriptions.Item>
        {
          [1, 2].includes(order.type) &&
          <Descriptions.Item label="商家收货地址" span={2}>
            {order.store_address}
          </Descriptions.Item>
        }
        {
          [1, 2].includes(order.type) &&
          <Descriptions.Item label="物流公司" span={1}>
            {order.logistics_name}
          </Descriptions.Item>
        }
        {
          [1, 2].includes(order.type) &&
          <Descriptions.Item label="快递单号" span={1}>
            {order.logistics_sn}
          </Descriptions.Item>
        }
        {
          [1, 4].includes(order.type) &&
          <Descriptions.Item label="客户收货地址" span={2}>
            {order.receiver_address}
          </Descriptions.Item>
        }
        {
          [1, 4].includes(order.type) &&
          <Descriptions.Item label="物流公司" span={1}>
            {order.store_logistics_name}
          </Descriptions.Item>
        }
        {
          [1, 4].includes(order.type) &&
          <Descriptions.Item label="快递单号" span={1}>
            {order.store_logistics_sn}
          </Descriptions.Item>
        }
        <Descriptions.Item label="售后说明" span={2}>
          {order.remark}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default HandleResult
