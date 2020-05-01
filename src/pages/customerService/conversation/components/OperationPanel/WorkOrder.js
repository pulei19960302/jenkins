import { PureComponent } from 'react'
import { RightCircleOutlined } from '@ant-design/icons';
import { Input, Descriptions, Collapse, Empty, Spin } from 'antd';
import { connect } from 'dva'
const { Search } = Input
const { Panel } = Collapse

const customPanelStyle = {
    borderRadius: 4,
    marginTop: 14,
    border: '1px solid #EDEDED',
    overflow: 'hidden',
}

const DEALING = 1 //处理中的工单

@connect(({ conversation }) => ({ ...conversation }))
class WorkOrder extends PureComponent {
    state = {
        loading: false,
        search_sn: null,
        openKey: [],
        customer: {},
        workOrderList: []
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
            const { activeKey, customerList } = nextProps
            this.init(activeKey, customerList)
        }
    }
    componentDidMount(){
        const { activeKey, customerList } = this.props
        this.init(activeKey, customerList)
    }
    init(activeKey, customerList) {
        const customer = customerList.find(el => el.key === activeKey) || {}
        this.setState({ customer, search_sn: null }, () => {
            this.getWorkOrderList()
        })
    }
    getWorkOrderList = (search_sn) => {
        const { customer } = this.state
        if (customer.person_id) {
            $api.customerService.getWorkOrderList({ search_sn, customer_member_id: customer.person_id }, { loadingFn: this.toogleLoading }).then(({ data }) => {
                const openKey = data.filter(workOrder => workOrder.status === DEALING).map(el => el.worksheet_code)
                this.setState({
                    workOrderList: data,
                    openKey
                })
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
        this.getWorkOrderList(search_sn)
    }
    openChange = (openKey) => {
        this.setState({ openKey })
    }
    render() {
        const { search_sn, workOrderList, openKey, loading } = this.state
        return (
            <div className="workOrder">
                <Search
                    placeholder="输入订单号/工单号查询"
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
                        workOrderList.map(workOrder =>
                            <Panel header=
                                {
                                    <div>
                                        <div className="headerLabel">工单单号：</div>
                                        <div className="headerContent">{workOrder.worksheet_code}</div>
                                    </div>
                                }
                                style={customPanelStyle} key={workOrder.worksheet_code}>
                                <Descriptions title="" size="small" column={1} className="descriptions">
                                    <Descriptions.Item label="工单状态">{workOrder.status === 1 && '处理中'}{workOrder.status === 2 && '关闭'}</Descriptions.Item>
                                    <Descriptions.Item label="工单类型">{workOrder.type_name}</Descriptions.Item>
                                    <Descriptions.Item label="订单单号">{workOrder.worksheet_code}</Descriptions.Item>
                                    <Descriptions.Item label="客户名称">{workOrder.customer_member_name}</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">{workOrder.created_at}</Descriptions.Item>
                                    {
                                        !!workOrder.relation.length &&
                                        <Descriptions.Item label="关联单据">
                                            {
                                                workOrder.relation.map(el => {
                                                    if (el.sn_type === 1) {
                                                        return <div key={el.sn}>【订单】{el.sn}</div>
                                                    }
                                                    if (el.sn_type === 2) {
                                                        return <div key={el.sn}>【售后服务单】{el.sn}</div>
                                                    }
                                                    return ''
                                                })
                                            }
                                        </Descriptions.Item>
                                    }
                                </Descriptions>
                                <div style={{ float: "right", marginBottom: 8 }}><a>查看详情</a></div>
                            </Panel>

                        )
                    }
                </Collapse>
                {
                    !workOrderList.length && !loading &&
                    <Empty style={{ marginTop: 100 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无工单记录" />
                }
                {loading && <Spin style={{ margin: '100px auto', display: 'block' }} />}
            </div>
        );
    }
}

export default WorkOrder