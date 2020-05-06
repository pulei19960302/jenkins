import account from 'accounting'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
import { Row, Col, Card } from 'antd'
import { hasBtn } from '../constants'
import { getColumns, searchFields } from './components/fields'
import styles from './index.less'

@connect(({ financeList, loading }) => ({ financeList, loading }))
class FinanceList extends PureComponent {

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'financeList/onSearch', payload, })
    dispatch({ type: 'financeList/getList', payload, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'financeList/getList', payload, })
  }

  renderTotals() {
    const { financeList: { sum = {} } } = this.props
    const {
      total_balance = '',
      sales_amount = '',
      commission = '',
      settled_loan = '',
      after_sale = '',
      user_balance = '',
    } = sum || {}
    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>平台总余额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(total_balance, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>用户总余额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(user_balance, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>下单总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(sales_amount, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>已返佣总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(commission, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>已结算货款&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(settled_loan, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>售后总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(after_sale, '￥')}</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderList() {
    const { financeList, loading } = this.props
    const { list = [], pagination, query } = financeList
    const searchProp = {
      search: query
    }
    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchFields={searchFields}
        columns={getColumns.call(this)}
        loading={loading.effects['financeList/getList']}
        onSearch={this.onSearch}
        getList={this.getList}
        searchProp={searchProp}
      />
    )
  }

  render() {
    const { financeList: { query = '' } } = this.props
    const btns = [
      {
        type: 'export',
        name: '导出',
        url: $api.finance.financeExport.url,
        query,
        permission: hasBtn('financeExport'),
      },
    ].filter(el => el.permission)

    return (
      <Page inner className={styles.financeList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        {this.renderList()}
      </Page>
    )
  }
}

export default FinanceList