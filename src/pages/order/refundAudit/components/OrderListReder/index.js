import { getColumnsFields } from './fields'
import styles from './index.less'

const OrderListRender = ({ order, context, removeFields }) => {
  const columnsFields = getColumnsFields(removeFields)
  return (
    <div className={styles.list}>
      <div className={styles.listTitle}>
        <div className={styles.listTitleItem}>服务单号：{order.return_sn}</div>
        <div className={styles.listTitleItem}>订单编号：{order.order_sn}</div>
        <div className={styles.listTitleItem}>
          售后时间：{order.created_at}
        </div>
        <div className={[styles.listTitleItem, styles.nickName].join(' ')}>
          用户名：{order.uid_name}
        </div>
      </div>
      <div className={styles.listContent}>
        {columnsFields.map(field => field.render(order, field, context))}
      </div>
    </div>
  )
}

export default OrderListRender
