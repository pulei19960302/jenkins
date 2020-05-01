import { PureComponent } from 'react'
import { connect } from 'dva'
import { RightCircleOutlined } from '@ant-design/icons';
import { Input, Descriptions, Collapse, Empty, Spin } from 'antd';
import AuditAfterSale from '@/pages/order/afterSale/components/AuditAfterSale'
import AuditDeal from '@/pages/order/refundAudit/components/AuditDeal'
import AfterSaleOrder from '@/pages/order/components/AfterSaleOrder'

import { AFTER_SALE_STATUS } from '@/pages/order/constants'
const { Search } = Input
const { Panel } = Collapse
const { CLOSE, COMPLETE, REFUSE_REFUND, WAIT_FINANCE_AUDIT } = AFTER_SALE_STATUS

const customPanelStyle = {
    borderRadius: 4,
    marginTop: 14,
    border: '1px solid #EDEDED',
    overflow: 'hidden',
}

@connect(({ conversation }) => ({ ...conversation }))
class AfterSale extends PureComponent {
    state = {
        loading: false,
        auditAfterSaleModal: false,
        afterSaleOrderModal: false,
        auditDealModal: false,
        search_sn: null,
        openKey: [],
        order: {},
        customer: {},
        expressList: [],
        orderList: []
    }
    componentDidMount() {
        $api.common.getExpressList({ no_page_flag: true }, { cache: true }).then(res => {
            this.setState({
                expressList: res.data || []
            })
        })
        const { activeKey, customerList } = this.props
            this.init(activeKey, customerList)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
            const { activeKey, customerList } = nextProps
            this.init(activeKey, customerList)
        }
    }
    init(activeKey, customerList) {
        const customer = customerList.find(el => el.key === activeKey) || {}
        this.setState({ customer, search_sn: customer.sn_code || null }, () => {
            this.getAfterSaleList(customer.sn_code || null)
        })
    }
    viewDetails = (order) => {
        if ([CLOSE, COMPLETE, REFUSE_REFUND].includes(order.status)) { //如果订单为关闭、完成、驳回退款只做展示
            this.showModal('afterSaleOrderModal', order)
        } else if (order.status === WAIT_FINANCE_AUDIT) {  // 财务审核展示财务审核弹窗
            this.showModal('auditDealModal', order)
        } else {
            this.showModal('auditAfterSaleModal', order) // 其余展示售后审核弹窗
        }
    }
    // 弹窗显示
    showModal = (modal, order = {}) => {
        this.setState({
            [modal]: true,
            order
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
                this.getAfterSaleList(this.state.search_sn)
            },
        }
    }
    getAfterSaleList = (search_sn) => {
        const { customer } = this.state
        if (customer.person_id) {
            $api.customerService.afterSaleList({ search_sn, uid: customer.person_id }, { loadingFn: this.toogleLoading }).then(({ data }) => {
                const openKey = data.filter(order => ![CLOSE, COMPLETE, REFUSE_REFUND].includes(order.status)).map(el => el.id)
                this.setState({ orderList: data, openKey })
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
            search_sn: e.target.value
        })
    }
    onSearch = (search_sn) => {
        this.getAfterSaleList(search_sn)
    }
    openChange = (openKey) => {
        this.setState({ openKey })
    }
    render() {
        const { expressList, search_sn, orderList, openKey, loading } = this.state
        return (
            <div className="afterSale">
                <Search
                    allowClear
                    placeholder="输入订单号/服务单号查询"
                    enterButton="查询"
                    value={search_sn}
                    onSearch={this.onSearch}
                    onChange={this.searchChange}
                />
                <Collapse
                    onChange={this.openChange}
                    activeKey={openKey}
                    bordered={false}
                    expandIconPosition="right"
                    expandIcon={({ isActive }) =>
                        <RightCircleOutlined
                            style={{ fontSize: 20, color: 'rgba(0,0,0,0.25)' }}
                            rotate={isActive ? 90 : 0} />}
                >
                    {
                        orderList.map(order =>
                            <Panel header=
                                {
                                    <div>
                                        <div className="headerLabel">服务单号：</div>
                                        <div className="headerContent">{order.return_sn}({order.status_name})</div>
                                    </div>
                                }
                                style={customPanelStyle} key={order.id}>
                                <Descriptions title="" size="small" column={1} className="descriptions">
                                    <Descriptions.Item label="订单单号">{order.order_sn}</Descriptions.Item>
                                    <Descriptions.Item label="售后类型"><span style={{ color: '#E52C33' }} >{order.type_name}</span></Descriptions.Item>
                                    <Descriptions.Item label="售后状态"><span style={{ color: '#E52C33' }} >{order.status_name}</span></Descriptions.Item>
                                    <Descriptions.Item label="售后时间">{order.created_at}</Descriptions.Item>
                                </Descriptions>
                                <div style={{ float: "right", marginBottom: 8 }}><a onClick={() => this.viewDetails(order)}>查看详情</a></div>
                            </Panel>
                        )
                    }
                </Collapse>
                {
                    !orderList.length && !loading &&
                    <Empty style={{ marginTop: 100 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无售后记录" />
                }
                {loading && <Spin style={{ margin: '100px auto', display: 'block' }} />}
                <AuditAfterSale {...this.getCommonProps('auditAfterSaleModal')} expressList={expressList} />
                <AuditDeal {...this.getCommonProps('auditDealModal')} />
                <AfterSaleOrder {...this.getCommonProps('afterSaleOrderModal')} />
            </div>
        );
    }
}

export default AfterSale