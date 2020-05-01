import { Descriptions } from 'antd'
import styles from './index.less'

const FinancialAudit = ({order}) => {
  return (
    <div className={styles.blockContainer}>
      <p className={styles.blockTitle}>财务审核意见</p>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="退款">
          {order.finance_verify ===1?'同意':''}
          {order.finance_verify ===2?'拒绝':''}
        </Descriptions.Item>
        <Descriptions.Item label="审核意见">
          {order.finance_message}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default FinancialAudit
