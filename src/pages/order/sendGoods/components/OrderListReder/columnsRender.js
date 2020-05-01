import { LinesEllipsis, PreviewImg } from 'components'
import account from 'accounting'
import styles from './index.less'

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
          goods_nums,
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
                <span>{`(${goods_nums}件)`}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}



export const OrderType = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p>{item.type_name}</p>
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
      <p>
        {item.receiver_province_name} {item.receiver_city_name} {item.receiver_district_name}
      </p>
      <div>
        <LinesEllipsis text={item.receiver_address} maxLine="2" />
      </div>
    </div>
  )
}

export const Logistics = ({ item, field }) => {
  return (
    <div
      style={{ flex: field.span }}
      className={[styles.contentCol, styles.address].join(' ')}
    >
      <p>快递公司：{item.logistics_name || '-'}</p>
      <p>快递单号：{item.logistics_sn || '-'}</p>
    </div>
  )
}

export const ActualAmount = ({ item, field }) => {
  return (
    <div style={{ flex: field.span }} className={styles.contentCol}>
      <p className={styles.money}>
        {account.formatMoney(item.actual_fee, '￥')}
      </p>
      <p>{`(含运费：${account.formatMoney(item.freight_fee, '￥')})`}</p>
      <p>
        <span>{item.pay_type_name}</span>
      </p>
    </div>
  )
}

export const Operate = ({ item, field, context }) => {
  const { showModal } = context
  return (
    <div
      style={{ flex: field.span }}
      className={[styles.contentCol, styles.operate].join(' ')}
    >
      <a className={styles.operateBtn} onClick={() => context.goDetail(item.id)}>
        查看详情
      </a>
      <a
        className={styles.operateBtn}
        onClick={() => {
          showModal('modifyLogisticsModal',item)
        }}
      >
        编辑物流
      </a>
    </div>
  )
}
