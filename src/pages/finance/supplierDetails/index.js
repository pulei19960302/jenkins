import account from 'accounting'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Descriptions } from 'antd'
import { Page, CommonTable, BtnGroup } from 'components'
import { getColumns, getSearchFields } from './components/fields'
import { router } from 'utils'
import { hasBtn } from '../constants'
import styles from './index.less'

@connect(({ suppilerDetails, loading }) => ({ suppilerDetails, loading }))
class SupplierDetails extends PureComponent {
  componentDidMount() {
    const { payload = {} } = this.props.history.location
    payload && this.getList(payload)
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'suppilerDetails/onSearch', payload, })
    dispatch({ type: 'suppilerDetails/getList', payload, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'suppilerDetails/getList', payload })
  }

  handleRouteToOrder = (row) => {
    const { order_id = '' } = row
    router.push({
      pathname: `/order/orderDetail/${order_id}`,
    })
  }

  renderTitles() {
    const { payload = {} } = this.props.history.location
    const { supplier_id = '' } = payload || {}
    const { suppilerDetails = {} } = this.props
    const { sum = {} } = suppilerDetails
    const { total = '', settle = '', settlement = '' } = sum || {}

    return (
      <div className={styles.titles}>
        <div>
          <span>供应商&nbsp;(ID)&nbsp;:&nbsp;&nbsp;</span>
          <span>{supplier_id}</span>
        </div>
        <div>
          <span>待结订单&nbsp;:&nbsp;&nbsp;</span>
          <span>{account.formatNumber(total)}</span>
        </div>
        <div>
          <span>待结金额&nbsp;:&nbsp;&nbsp;</span>
          <span>{account.formatMoney(settle, '￥')}</span>
        </div>
        <div>
          <span>已结金额&nbsp;:&nbsp;&nbsp;</span>
          <span>{account.formatMoney(settlement, '￥')}</span>
        </div>
      </div>
    )
  }

  renderList() {
    const { suppilerDetails, loading } = this.props
    const { list = [], pagination, query, type } = suppilerDetails
    const exportProps = {
      type: 'export',
      name: '导出',
      url: $api.finance.detailExport.url,
      query,
      permission: hasBtn('detailExport'),
    }
    const searchProp = {
      search: query,
      BtnGroup: (<BtnGroup btns={[exportProps]} />)
    }

    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchFields={getSearchFields(type)}
        columns={getColumns.call(this, type)}
        loading={loading.effects['suppilerDetails/getList']}
        onSearch={this.onSearch}
        getList={this.getList}
        searchProp={searchProp}
        classnames={styles.detailsTable}
      />
    )
  }

  render() {
    return (
      <Page inner>
        {this.renderTitles()}
        {this.renderList()}
      </Page>
    )
  }
}

export default SupplierDetails