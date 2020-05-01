import React from 'react'
import { Row, Col } from 'antd'
import account from 'accounting'
import { LinesEllipsis, PreviewImg } from 'components'
import styles from './index.less'

class GoodsList extends React.PureComponent {
  state = {}
  render() {
    const { order } = this.props
    const { goods_infos } = order
    const goodsList = goods_infos || []
    return (
      <div className={styles.goodsContainer}>
        <div className={styles.header}>
          <Row className={styles.title}>
            <Col span={12}>售后类型：{order.type_name}</Col>
            <Col span={12}>售后状态：{order.status_name}</Col>
          </Row>
          <Row>
            <Col span={12}>服务单号：{order.return_sn}</Col>
            <Col span={12}>申请时间：{order.created_at}</Col>
            <Col span={12}>订单编号：{order.order_sn}</Col>
            <Col span={12}>客户账号：{order.uid_name}</Col>
          </Row>
        </div>
        <div className={styles.goodsList}>
          {goodsList.map((goods, index) => {
            return (
              <div key={index} className={styles.goods}>
                <img
                  src={goods.goods_avatar}
                  alt=""
                  onClick={() => {
                    PreviewImg({ imgUrl: goods.goods_avatar })
                  }}
                />
                <div className={styles.goodsLine}>
                  <LinesEllipsis text={goods.goods_title} maxLine="1" />
                </div>
                <div className={styles.goodsLine}>
                  <LinesEllipsis text={goods.goods_sku_properties_name} maxLine="1" />
                </div>
                <Row style={{paddingLeft: 10}}>
                  <Col span={6}>
                    售后数量：{goods.count}
                  </Col>
                  <Col span={8}>
                    单价：{account.formatMoney(goods.goods_sale_price, '￥')}
                  </Col>
                </Row>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default GoodsList
