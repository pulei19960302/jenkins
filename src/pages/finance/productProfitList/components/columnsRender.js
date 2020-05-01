import { PreviewImg } from 'components'
import styles from '../index.less'

//商品信息
export const GoodsInfo = ({ item, field }) => {
  const { goods_infos = [] } = item

  const list = goods_infos && goods_infos.map((good, index) => {
    const {
      goods_avatar,
      goods_title,
      goods_sku_properties_name,
      goods_sale_price,
      goods_nums,
      goods_id
    } = good

    return (
      <div className={`${styles.goods} ${styles.flex}`}>
        <img
          // className={styles.goodsImg}
          // src={goods_avatar}
          src="aaa.jpg"
          alt=""
          className={styles.img}
        // onClick={() => {
        //   PreviewImg({ imgUrl: goods_avatar })
        // }} 
        />
        <div className={`${styles.flex_1} ${styles.info}`}>
          <span className={styles.block}>title title title</span>
          <span>subtitle subtitlesubtitle...</span>
          <div className={`${styles.flex} ${styles.nums}`}>
            <span>售后数量：4</span>
            <span>单价：12.00</span>
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
      {/* {list} */}
      {/* 以下代码，仅用于测试，当后台有数据时，请返回list 数据 */}
      <div className={`${styles.goods} ${styles.flex}`}>
        <img
          // className={styles.goodsImg}
          // src={goods_avatar}
          src="aaa.jpg"
          alt=""
          className={styles.img}
        // onClick={() => {
        //   PreviewImg({ imgUrl: goods_avatar })
        // }} 
        />
        <div className={`${styles.flex_1} ${styles.info}`}>
          <span className={styles.block}>title title title</span>
          <span>subtitle subtitlesubtitle...</span>
          <div className={`${styles.flex} ${styles.nums}`}>
            <span>售后数量：4</span>
            <span>单价：12.00</span>
          </div>
        </div>
      </div>

      <div className={`${styles.goods} ${styles.flex}`}>
        <img
          // className={styles.goodsImg}
          // src={goods_avatar}
          src="aaa.jpg"
          alt=""
          className={styles.img}
        // onClick={() => {
        //   PreviewImg({ imgUrl: goods_avatar })
        // }} 
        />
        <div className={`${styles.flex_1} ${styles.info}`}>
          <span className={styles.block}>title title title</span>
          <span>subtitle subtitlesubtitle...</span>
          <div className={`${styles.flex} ${styles.nums}`}>
            <span>售后数量：4</span>
            <span>单价：12.00</span>
          </div>
        </div>
      </div>
      {/* 以上代码，仅用于测试，当后台有数据时，请返回list 数据 */}
    </div>
  )
}

