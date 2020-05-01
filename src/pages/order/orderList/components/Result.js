import account from 'accounting'
import styles from '../index.less'

const Result = ({ count, goods_num, price_sum }) => {
  return (
    <div className={styles.resultBar}>
      <span className={styles.resultLabel}>订单数：</span>
      <span className={styles.resultNum}>{account.formatNumber(count)}</span>
      <span className={styles.resultLabel}>商品数量：</span>
      <span className={styles.resultNum}>
        {account.formatNumber(goods_num)}
      </span>
      <span className={styles.resultLabel}>订单金额：</span>
      <span className={styles.resultNum}>
        {account.formatMoney(price_sum, '￥')}
      </span>
    </div>
  )
}

export default Result
