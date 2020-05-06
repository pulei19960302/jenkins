import { PureComponent } from 'react'
import account from 'accounting'
import { connect } from 'dva'
import { Input, Descriptions, Timeline, Button, Empty, Spin } from 'antd'
import { LinesEllipsis, PreviewImg } from 'components'
import { hasBtn } from '@/pages/order/constants'
// 订单相关公共弹窗组件
import {
    ModifyAddress,
    ModifyLogistics,
    ApplyAfterSale,
    SendGoods,
} from '@/pages/order/components'
const { Search } = Input

@connect(({ conversation }) => ({ ...conversation }))
class OrderInfo extends PureComponent {
    state = {
        loading: false,
        order: {},
        customer: {},
        order_sn: null,
        modifyAddressModal: false,
        modifyLogisticsModal: false,
        applyAfterSaleModal: false,
        sendGoodsModal: false,
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
            const { activeKey, customerList } = nextProps
            this.init(activeKey, customerList)
        }
    }
    componentDidMount() {
        const { activeKey, customerList } = this.props
        this.init(activeKey, customerList)
    }
    init(activeKey, customerList) {
        const customer = customerList.find(el => el.key === activeKey) || {}
        this.setState({ customer, order: {}, order_sn: customer.sn_type === 1 ? customer.sn_code : null }, () => {
            if (customer.sn_type === 1 && customer.sn_code) {
                this.getOrderInfo(customer.sn_code)
            }
        })
    }
    getFooterBtns() {
        const { order } = this.state
        const { status } = order
        const allBtns = [
            { name: '一键发货', key: 1, show: hasBtn('sendGoods', status), handleClick: () => this.showModal('sendGoodsModal') },
            { name: '申请售后', key: 2, show: hasBtn('applyAfterSale', status), handleClick: () => this.checkApply() },
            { name: '修改地址', key: 3, show: hasBtn('modifyAddress', status), handleClick: () => this.showModal('modifyAddressModal') },
            { name: '修改物流', key: 4, show: hasBtn('modifyLogistics', status), handleClick: () => this.showModal('modifyLogisticsModal') },
        ]
        let btns = allBtns.filter(el => el.show)
        return btns;
    }
    // 申请售后前检查能否申请
    checkApply = () => {
        const { order } = this.state
        $api.order.checkApply({ order_id: order.id }).then(({ data }) => {
            this.setState({
                applyAfterSaleProps: { goods_info: data.goods_info, order }
            })
            this.showModal('applyAfterSaleModal')
        })
    }
    // 弹窗显示
    showModal = modal => {
        this.setState({
            [modal]: true,
        })
    }
    // 弹窗隐藏
    hideModal = modal => {
        this.setState({
            [modal]: false,
        })
    }
    // 弹窗公共props
    getCommonProps = modal => {
        return {
            order: this.state.order,
            modalVisible: this.state[modal],
            onCancel: () => {
                this.hideModal(modal)
            },
            successCallback: () => {
                this.getOrderInfo(this.state.order.order_sn)
            },
        }
    }
    getOrderInfo = (order_sn) => {
        const { customer } = this.state
        if (customer.person_id) {
            $api.customerService.orderDetail({ order_sn, uid: customer.person_id }, { loadingFn: this.toogleLoading }).then(({ data }) => {
                this.setState({ order: data || {} })
            })
        }
    }
    toogleLoading = loading => {
        this.setState({
            loading,
        })
    }
    searchChange = (e) => {
        this.setState({
            order_sn: e.target.value
        })
    }
    onSearch = (order_sn) => {
        if (order_sn) {
            this.getOrderInfo(order_sn)
        } else {
            this.setState({ order: {} })
        }
    }
    render() {
        const { order, order_sn, loading } = this.state
        return (
            <div className="orderInfo">
                <Search
                    allowClear
                    placeholder="输入订单号查询"
                    enterButton="查询"
                    value={order_sn}
                    onChange={this.searchChange}
                    onSearch={this.onSearch}
                />
                {
                    order.id &&
                    <div>
                        <Descriptions title="" size="small" column={1} className="descriptions">
                            <Descriptions.Item label="订单单号">{order.order_sn}</Descriptions.Item>
                            <Descriptions.Item label="订单状态">{order.status_name}</Descriptions.Item>
                            <Descriptions.Item label="下单时间">{order.created_at}</Descriptions.Item>
                        </Descriptions>
                        <div className="goodsInfo">
                            {
                                order.goods_infos.map(goods => (
                                    <div className="goodsList" key={goods.goods_id}>
                                        <img src={goods.goods_avatar}
                                            alt=""
                                            className="goodsImg"
                                            onClick={() => {
                                                PreviewImg({ imgUrl: goods.goods_avatar })
                                            }} />
                                        <div className="goodsTitle">
                                            <LinesEllipsis text={goods.goods_title} maxLine="2" />
                                        </div>
                                        <p>{goods.goods_sku_properties_name}</p>
                                        <p>数量： {goods.goods_nums} 单价：{account.formatMoney(goods.goods_sale_price, '￥')}</p>
                                    </div>
                                ))
                            }

                            <Descriptions title="" size="small" column={2} className="descriptions">
                                <Descriptions.Item label="订单金额">{account.formatMoney(order.total_fee, '￥')}</Descriptions.Item>
                                <Descriptions.Item label="运费险">{account.formatMoney(order.insurance_fee, '￥')}</Descriptions.Item>
                                <Descriptions.Item label="订单备注" span={2}>{order.buyer_message}</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <Descriptions title="" size="small" column={1} className="descriptions" style={{ border: 'none' }}>
                            <Descriptions.Item label="收货信息">
                                {order.receiver_name} {order.receiver_mobile}
                                <p>{order.receiver_province_name}{order.receiver_city_name}{order.receiver_district_name}</p>
                                <p>{order.receiver_address}</p>
                            </Descriptions.Item>
                            <Descriptions.Item label="物流公司">{order.logistics_name}</Descriptions.Item>
                            <Descriptions.Item label="快递单号">{order.logistics_sn}</Descriptions.Item>
                            <Descriptions.Item label="物流跟踪"></Descriptions.Item>
                            <Timeline>
                                {
                                    order.logistics_info.content.map((el, index) => {
                                        if (index === 0) {
                                            return <Timeline.Item color="#E52C33" style={{ color: '#E52C33' }} key={index} >{el.time}&nbsp;{el.text}</Timeline.Item>
                                        } else {
                                            return <Timeline.Item key={index}>{el.time}&nbsp;{el.text}</Timeline.Item>
                                        }
                                    })
                                }
                            </Timeline>
                        </Descriptions>
                        <div className="footer">
                            {
                                this.getFooterBtns().map(el =>
                                    <Button key={el.key} size="small" type="primary" onClick={el.handleClick}>{el.name}</Button>)
                            }
                        </div>
                    </div>
                }
                {
                    !order.order_sn && !loading &&
                    <Empty style={{ marginTop: 100 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无订单记录" />
                }
                {loading && <Spin style={{ margin: '100px auto', display: 'block' }} />}
                <SendGoods {...this.getCommonProps('sendGoodsModal')} />
                <ApplyAfterSale {...this.getCommonProps('applyAfterSaleModal')} {...this.state.applyAfterSaleProps} />
                <ModifyLogistics {...this.getCommonProps('modifyLogisticsModal')} />
                <ModifyAddress {...this.getCommonProps('modifyAddressModal')} />
            </div>
        )
    }
}

export default OrderInfo