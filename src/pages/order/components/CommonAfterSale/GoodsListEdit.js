import React from 'react'
import { Checkbox, Row, Col, InputNumber } from 'antd'
import account from 'accounting'
import { LinesEllipsis, PreviewImg } from 'components'
import styles from './index.less'

class GoodsListEidt extends React.PureComponent {
    state = {
        goodsList: [],
        checkAll: false,
    }
    selectGoodsParams() {
        const { goodsList } = this.state
        const newGoodsList = goodsList.map(el => {
            const goods = { ...el }
            if (!goods.checked) {
                goods.count = 0
            }
            return goods
        })
        this.props.onChange(newGoodsList)
    }
    componentDidMount() {
        const { goods_infos = [] } = this.props.order
        const goodsList = goods_infos.map(el => {
            const goods = { ...el }
            goods.checked = goods.count ? true : false
            return goods
        })
        const checkList = goodsList.filter(goods => goods.checked)
        this.setState({
            goodsList,
            checkAll: checkList.length === goodsList.length,
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
        const { order, disabled } = this.props
        // const { order_sn, uid_name } = order
        const { goodsList, checkAll } = this.state
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
                    </Row>
                </div>
                <div className={styles.goodsList}>
                    <Row style={{ marginBottom: 12 }}>
                        <Col span={1}>
                            <Checkbox
                                disabled={disabled}
                                indeterminate={false}
                                onChange={this.onCheckAllChange}
                                checked={checkAll}
                            />
                        </Col>
                        <Col span={11}>订单号：{order.order_sn}</Col>
                        <Col span={12}>客户账号：{order.uid_name}</Col>
                    </Row>
                    {goodsList.map((goods, index) => {
                        return (
                            <Row key={index}>
                                <Col span={1}>
                                    <Checkbox
                                        disabled={disabled}
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
                                        商品单价：{account.formatMoney(goods.goods_sale_price, '￥')}
                                    </div>
                                </Col>
                                <Col span={6} className={styles.applyNum}>
                                    申请数量：
                                    <InputNumber
                                        disabled={disabled}
                                        min={1}
                                        max={goods.allow_nums || 0}
                                        defaultValue={goods.count}
                                        size="small"
                                        onChange={value => {
                                            this.onChange(value, index, 'count')
                                        }}
                                    />
                                </Col>
                            </Row>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default GoodsListEidt
