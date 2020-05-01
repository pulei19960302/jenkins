import classnames from 'classnames'
import account from 'accounting'
import { PreviewImg, LinesEllipsis } from 'components'
import styles from '../index.less'

//商品信息
export const GoodsInfo = ({ item, field }) => {
  const { goods_infos = [] } = item

  if (!goods_infos || !goods_infos.length) return null

  const list = goods_infos.map((good, index) => {
    const {
      goods_avatar = '',
      goods_title = '',
      goods_sku_properties_name = '',
      goods_sale_price = '',
      count = '',
      goods_id = '',
      goods_sku_id = '',
    } = good

    return (
      <div className={classnames(styles.goods, styles.flex)} key={index}>
        <img
          // className={styles.goodsImg}
          src={goods_avatar}
          alt=""
          className={styles.img}
          onClick={() => {
            PreviewImg({ imgUrl: goods_avatar })
          }}
        />
        <div className={classnames(styles.flex_1, styles.info)}>
          <span>{goods_sku_id}</span>
          <LinesEllipsis text={goods_title} maxLine="1" />
          <span>{goods_sku_properties_name}</span>
          <div className={`${styles.flex} ${styles.nums}`}>
            <span>售后数量:&nbsp;{count}</span>
            <span>单价:&nbsp;{account.formatMoney(goods_sale_price, '￥')}</span>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div
      style={{ flex: field.span }}
      className={styles.goodsInfo}
    >
      {list}
    </div>
  )
}

//售后类型
export const AfterType = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }}>
      {item.type_name}
    </div>
  )
}

//售后状态
export const AfterStatus = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }}>
      {item.status_name}
    </div>
  )
}

//支付金额
export const PaidMoney = ({ item, field }) => {
  const { actual_fee = '' } = item
  return (
    <div style={{ flex: field.span }}>
      <div>
        <span>{account.formatMoney(actual_fee, '￥')}</span>
        {/* <div>
          <span>一级合伙人</span>:&nbsp;&nbsp;3.00
        </div> */}
      </div>
    </div>
  )
}
//售后总额
export const TotalMoney = ({ item, field }) => {
  const { sale_fee_count_by_backend = '' } = item
  return (
    <div style={{ flex: field.span }} >
      <div>
        <span>
          {account.formatMoney(sale_fee_count_by_backend, '￥')}
        </span>
        {/* <span className={styles.block}>(微信)</span> */}
      </div>
    </div>
  )
}
//售后退款
export const ReturnMoney = ({ item, field }) => {
  const { total_fee = '' } = item
  return (
    <div style={{ flex: field.span }}>
      <div>
        <span>{account.formatMoney(total_fee, '￥')}</span>
        {/* <span className={styles.block}>(微信)</span> */}
      </div>
    </div>
  )
}
//售后补偿
export const Compensation = ({ item, field }) => {
  const { add_fee = '' } = item
  return (
    <div style={{ flex: field.span }}>
      <div>
        <span>{account.formatMoney(add_fee, '￥')}</span>
        {/* <span className={styles.block}>(微信)</span> */}
      </div>
    </div>
  )
}