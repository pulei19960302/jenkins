import React from 'react'
import { Checkbox, Row, Col, InputNumber } from 'antd'
import account from 'accounting'
import { LinesEllipsis, PreviewImg } from 'components'
import styles from './index.less'

class GoodsList extends React.PureComponent {
  state = {
    goodsList: [],
    checkAll: false,
  }
  selectGoodsParams() {
    const { goodsList } = this.state
    const goodsParams = goodsList.filter(goods => goods.checked)
    console.log(goodsParams)
    this.props.onChange(goodsParams)
  }
  componentDidMount() {
    const { goods_info = [] } = this.props
    const goodsList = goods_info.map(el => {
      const goods = { ...el }
      goods.checked = false
      goods.count = goods.allow_nums
      return goods
    })
    this.setState({
      goodsList,
    })
  }
  onChange(value, index, name) {
    let { goodsList } = this.state
    goodsList[index][name] = value
    const checkList = goodsList.filter(goods => goods.checked)
    this.setState({
      goodsList: [...goodsList],
      checkAll: checkList.length === goodsList.length,
    }, () => {
      this.selectGoodsParams()
    })
  }
  onCheckAllChange = e => {
    let { goodsList } = this.state
    if (e.target.checked) {
      goodsList = goodsList.map(goods => {
        return { ...goods, checked: true }
      })
    } else {
      goodsList = goodsList.map(goods => {
        return { ...goods, checked: false }
      })
    }
    this.setState({
      goodsList: [...goodsList],
      checkAll: e.target.checked,
    }, () => {
      this.selectGoodsParams()
    })
  }
  render() {
    const { order_sn, nick_name } = this.props.order
    const { goodsList, checkAll } = this.state
    return (
      <div className={styles.goodsContainer}>
        <div className={styles.orderTitle}>
          <Row>
            <Col span={1}>
              <Checkbox
                indeterminate={false}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              />
            </Col>
            <Col span={11}>订单号：{order_sn}</Col>
            <Col span={11}>客户账号：{nick_name}</Col>
          </Row>
        </div>
        <div className={styles.goodsList}>
          {goodsList.map((goods, index) => {
            return (
              <div key={index}>
                <Row>
                  <Col span={1}>
                    <Checkbox
                      onChange={e => {
                        this.onChange(e.target.checked, index, 'checked')
                      }}
                      checked={goods.checked}
                    ></Checkbox>
                  </Col>
                  <Col span={16} className={styles.goods}>
                    <img
                      src={goods.goods_avatar}
                      alt=""
                      onClick={() => {
                        PreviewImg({
                          imgUrl: goods.goods_avatar
                        })
                      }}
                    />
                    <div className={styles.goodsLine}>
                      <LinesEllipsis text={goods.goods_title} maxLine="1" />
                    </div>
                    <div className={styles.goodsLine}>
                      <LinesEllipsis text={goods.goods_sku_properties_name} maxLine="1" />
                    </div>
                    <div className={styles.goodsLine}>
                      商品单价：{account.formatMoney(goods.sale_price, '￥')}
                    </div>
                  </Col>
                  <Col span={6} className={styles.applyNum}>
                    申请数量：
                    <InputNumber
                      min={1}
                      max={goods.allow_nums}
                      defaultValue={goods.allow_nums}
                      size="small"
                      onChange={value => {
                        this.onChange(value, index, 'count')
                      }}
                    />
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
