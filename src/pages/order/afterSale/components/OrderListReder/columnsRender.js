import { LinesEllipsis, PreviewImg } from 'components'
import account from 'accounting'
import { AFTER_SALE_STATUS } from '../../../constants'
import styles from './index.less'

const { WAIT_FINANCE_AUDIT } = AFTER_SALE_STATUS

export const GoodsInfo = ({ item, field }) => {
  return (
    <div
      style={{ flex: field.span }}
      className={[styles.contentCol, styles.goodsContainer].join(' ')}
    >
      {item.goods_infos && item.goods_infos.map((goods, index) => {
        const {
          goods_avatar,
          goods_title,
          goods_sale_price,
          count,
          goods_sku_id,
          goods_sku_properties_name,
        } = goods
        return (
          <div className={styles.goods} key={index}>
            <div className={styles.goodsInfo}>
              <img
                className={styles.goodsImg}
                src={goods_avatar}
                alt=""
                onClick={() => {
                  PreviewImg({ imgUrl: goods_avatar })
                }}
              />
              <p className={styles.goodsTitle}>{goods_sku_id}</p>
              <div className={styles.goodsTitle}>
                <LinesEllipsis text={goods_title} maxLine="2" />
              </div>
              <div className={styles.goodsTitle}>
                <LinesEllipsis text={goods_sku_properties_name} maxLine="2" />
              </div>
            </div>
            <div className={styles.goodsPrice}>
              <p style={{ marginBottom: 10 }}>
                <span>{account.formatMoney(goods_sale_price, '￥')}</span>
              </p>
              <p>
                <span>{`售后：${count}件`}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const AfterSaleAmount = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p className={styles.money}>{account.formatMoney(item.sale_fee_count_by_backend, '￥')}</p>
    </div>
  )
}

export const AfterSaleType = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p>{item.type_name}</p>
    </div>
  )
}

export const AfterSaleStatus = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p>{item.status_name}</p>
    </div>
  )
}


export const Address = ({ item, field }) => {
  return (
    <div
      style={{ flex: field.span }}
      className={[styles.contentCol, styles.address].join(' ')}
    >
      <p>
        {item.receiver_name} {item.receiver_mobile}
      </p>
      <div>
        <LinesEllipsis text={item.receiver_address} maxLine="2" />
      </div>
    </div>
  )
}

export const ReturnAmount = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p className={styles.money}>{account.formatMoney(item.total_fee, '￥')}</p>
    </div>
  )
}


export const ReturnAddress = ({ item, field }) => {
  return (
    <div
      style={{ flex: field.span }}
      className={[styles.contentCol, styles.address].join(' ')}
    >
      <p>
        {item.logistics_name} {item.receiver_city_name} {item.receiver_district_name}
      </p>
      <div>
        <LinesEllipsis text={item.logistics_sn} maxLine="1" />
      </div>
    </div>
  )
}

// export const Handler = ({ item, field }) => {
//   return (
//     <div style={{ flex: field.span }} className={styles.contentCol}>
//       <p>{item.dealer_name}</p>
//     </div>
//   )
// }

export const Operate = ({ item, field, context }) => {
  const { viewDetails } = context
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      {
        item.status !== WAIT_FINANCE_AUDIT &&
        <a
          className={styles.operateBtn}
          onClick={() => {
            viewDetails(item)
          }}
        >
          查看详情
      </a>
      }
    </div>
  )
}
