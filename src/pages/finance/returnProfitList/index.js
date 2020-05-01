import account from 'accounting'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable } from 'components'
import { Row, Col } from 'antd'
import { router } from 'utils'
import { hasBtn } from '../constants'
import { getColumns, getSearchFields } from './components/fields'
import Details from './components/Details'
import styles from './index.less'

@connect(({ returnProfitList, loading }) => ({ returnProfitList, loading }))
class ReturnProfitList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailsModal: false,
      details: {},
    }
  }
  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'returnProfitList/onSearch', payload, })
    dispatch({ type: 'returnProfitList/getList', payload, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'returnProfitList/getList', payload, })
  }

  routeToOrder = (order_id = '') => {
    router.push({
      pathname: `/order/orderDetail/${order_id}`,
    })
  }

  onOpenDetailsModal = (row = '') => {
    this.setState({
      detailsModal: true,
      details: row,
    })
  }

  toggleDetailsModal = () => {
    this.setState((prevState) => ({
      detailsModal: !prevState.detailsModal
    }))
  }

  renderTotals() {
    const { returnProfitList: { sum = {} } } = this.props
    const {
      order_num,
      total_amount,
      rebated,
      rebating,
    } = sum || {}
    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>总下单数量</span>
              <span className={styles.num}>{account.formatNumber(order_num)}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>总返佣金额</span>
              <span className={styles.num}>{account.formatMoney(total_amount, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>已返佣金额</span>
              <span className={styles.num}>{account.formatMoney(rebated, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>待返佣金额</span>
              <span className={styles.num}>{account.formatMoney(rebating, '￥')}</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderDetails() {
    const { detailsModal, details = {} } = this.state
    const { id = '', member_id = '', order_id = '' } = details || {}
    const params = {
      rebate_id: id,
      member_id,
      order_id
    }
    return (
      <Details visible={detailsModal} onCancel={this.toggleDetailsModal} params={params} />
    )
  }

  renderList() {
    const { returnProfitList, loading } = this.props
    const { list = [], pagination, status = {}, query } = returnProfitList

    const is_pays = status && Object.keys(status) && Object.keys(status).reduce((total, value) => (
      total.concat([{ value, name: status[value] }])
    ), [])

    const searchProp = {
      search: query,
    }

    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchProp={searchProp}
        searchFields={getSearchFields.call(this, is_pays)}
        columns={getColumns.call(this, status)}
        loading={loading.effects['returnProfitList/getList']}
        onSearch={this.onSearch}
        getList={this.getList}
      />
    )
  }

  render() {
    const { returnProfitList: { query = '' } } = this.props
    const btns = [
      {
        type: 'export',
        name: '导出',
        url: $api.finance.returnProfitExport.url,
        query,
        permission: hasBtn('returnProfitExport'),
      },
    ].filter(el => el.permission)

    return (
      <Page inner className={styles.returnProfitList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        {this.renderList()}
        {this.renderDetails()}
      </Page>
    )
  }
}

export default ReturnProfitList