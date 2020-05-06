import account from 'accounting'
import moment from 'moment'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, Pagination, SearchForm } from 'components'
import { Row, Col, Spin } from 'antd'
import { router } from 'utils'
import { hasBtn } from '../constants'
import { getColumns, getSearchFields } from './components/fields'
import Columns from '../components/Columns'
import { FORMAT } from '../constants'
import AfterSale from '@/pages/order/components/AfterSaleOrder'
import styles from './index.less'

@connect(({ afterSaleList, loading }) => ({ afterSaleList, loading }))
class AfterSaleList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      afterSaleModal: false,
      details: {},
    }
  }

  toggleAfterSaleModal = () => {
    this.setState((prevState) => ({
      afterSaleModal: !prevState.afterSaleModal,
    }))
  }

  handlePageChange = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({ type: 'afterSaleList/getList', payload: { page, pageSize } })
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'afterSaleList/onSearch', payload })
    dispatch({ type: 'afterSaleList/getList', payload })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'afterSaleList/getList', payload, })
  }

  routeAfterSale = (details = {}) => {
    this.setState({ details })
    this.toggleAfterSaleModal()
  }

  routeToOrder = (order_id = '') => {
    router.push({
      pathname: `/order/orderDetail/${order_id}`,
    })
  }

  renderAfterSaleModal() {
    const { afterSaleModal, details } = this.state
    if (!details || !afterSaleModal) return null
    return (
      <AfterSale
        onCancel={this.toggleAfterSaleModal}
        modalVisible={afterSaleModal}
        order={details}
      />
    )
  }

  renderTotals() {
    const { afterSaleList: { sum = {} } } = this.props
    const {
      sales_num = '',
      sum_return_money = '',
      sum_total_fee = '',
      sum_add_fee = '',
    } = sum || {}
    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>售后订单总量&nbsp;(单)</span>
              <span className={styles.num}>{account.formatNumber(sales_num)}</span>
            </div>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.totalCol}>
            <div>
              <span>售后申请总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(sum_total_fee, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.totalCol}>
            <div>
              <span>售后退款总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(sum_return_money, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>售后补偿总额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(sum_add_fee, '￥')}</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderOrders = (order = {}, key = '') => {
    const columnsFields = getColumns()

    const {
      order_sn = '',
      order_id = '',
      return_sn = '',
      created_at = '',
      uid_name = '',
      uid = '',
    } = order

    return (
      <div className={styles.list} key={key}>
        <div className={styles.listTitle}>
          <span>
            订单&nbsp;:&nbsp;&nbsp;
            {
              $api.order.getOrderDetail.permission() ? <a onClick={() => { this.routeToOrder(order_id) }}>{order_sn}</a>
                : order_sn
            }
          </span>
          <span>售后服务单&nbsp;:&nbsp;&nbsp;<a onClick={() => { this.routeAfterSale(order) }}>{return_sn}</a></span>
          <span>申请时间&nbsp;:&nbsp;&nbsp;{created_at && moment(created_at).format(FORMAT.DATETIME)}</span>
          <span className="pull-right">用户名:&nbsp;{uid_name}&nbsp;({uid})</span>
        </div>

        <div className={`${styles.listContent} ${styles.flex}`}>
          {
            columnsFields && columnsFields.map((field) => (
              field.render(order, field)
            ))
          }
        </div>
      </div>
    )
  }

  renderList() {
    const { afterSaleList, loading } = this.props
    const { list = [], pagination } = afterSaleList

    const listData = list && list.map((order, key) => (
      this.renderOrders(order, key)
    ))

    return listData
  }

  render() {
    const { afterSaleList, loading } = this.props
    const { pagination, query, type = {} } = afterSaleList
    const types = type && Object.keys(type) && Object.keys(type).reduce((total, value) => (
      total.concat([{ value, name: type[value] }])
    ), [])

    const btns = [
      {
        type: 'export',
        name: '导出',
        url: $api.finance.afterSaleExport.url,
        query,
        permission: hasBtn('afterSaleExport'),
      },
    ].filter(el => el.permission)

    const searchFormProps = {
      search: query,
      fields: getSearchFields.call(this, types),
      onSearch: this.onSearch,
    }

    const paginationProps = {
      ...pagination,
      onChange: this.handlePageChange,
      onShowSizeChange: (page, pageSize) => {
        return this.handlePageChange(1, pageSize)
      }
    }

    const loadingSpin = loading.effects['afterSaleList/getList']

    return (
      <Page inner className={styles.afterSaleList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        <SearchForm {...searchFormProps} />
        <div style={{ position: 'relative' }}>
          {loadingSpin && <Spin className={styles.spin} />}
          <Columns fields={getColumns()} />
          {this.renderList()}
          <Pagination paginationProps={paginationProps} />
        </div>
        {this.renderAfterSaleModal()}
      </Page>
    )
  }
}

export default AfterSaleList