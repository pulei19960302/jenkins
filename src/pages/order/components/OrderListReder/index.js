// 注：订单列表展示
// 该组件涉及订单列表、订单详情
import { getColumnsFields } from './fields'
import styles from './index.less'

const OrderListRender = ({ order = {}, context, removeFields }) => {
  const columnsFields = getColumnsFields(removeFields)
  return (
    <div className={styles.list} >
      <div className={styles.listTitle}>
        <div className={styles.listTitleItem}>订单号：{order.order_sn}</div>
        <div className={styles.listTitleItem}>下单时间：{order.created_at}</div>
        <div className={styles.listTitleItem}>订单来源：{order.from_name}</div>
        <div className={[styles.listTitleItem, styles.nickName].join(' ')}>
          昵称：{order.nick_name}
        </div>
      </div>
      <div className={styles.listContent}>
        {columnsFields.map(field => field.render(order, field, context))}
      </div>
      <div className={styles.remark}>
        买家备注：{order.buyer_message||'-'}（系统备注）{order.remark||'-'}
      </div>
      {/* <div className={styles.remark}>
        取消订单：(华大宝) 他太丑了，所以取消订单
      </div> */}
    </div>
  )
}

export default OrderListRender
