import account from 'accounting'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { router } from 'utils'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
import { hasBtn } from '../constants'
import { getColumns, searchFields, getSearchFields } from './components/fields'
import UpdateMoney from './components/UpdateMoney'
import Details from './components/Details'
import Deduction from './components/Deduction'
import AfterSale from '@/pages/order/components/AfterSaleOrder'
import styles from './index.less'

@connect(({ userAccountList, loading }) => ({ userAccountList, loading }))
class UserAccountList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      updateMoenyModal: false,
      deductionModal: false,
      detailsModal: false,
      afterSaleModal: false,
      details: null,
      order: null,
    }
  }

  toggleUpdateMoneyModal = () => {
    this.setState((prevState) => ({
      updateMoenyModal: !prevState.updateMoenyModal
    }))
  }

  onOpenDetailsModal = (row = '') => {
    this.setState({
      detailsModal: true,
      details: row,
    })
  }

  onOpenAfterModal = (row = '', sales = false) => {
    const { member_id = '', order_no = '', sales_sn = '' } = row
    const search_sn = !sales ? order_no : sales_sn
    order_no && $api.customerService.afterSaleList({ search_sn, uid: member_id }).then(({ data }) => {
      const order = data && data[0]
      this.setState({
        afterSaleModal: true,
        order,
      })
    })
  }

  onOpenDeductionModal = (row = '') => {
    this.setState({
      deductionModal: true,
      details: row,
    })
  }

  onCloseModal = (modal) => {
    this.setState({
      [modal]: false
    })
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'userAccountList/onSearch', payload, })
    dispatch({ type: 'userAccountList/getList', payload, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'userAccountList/getList', payload, })
  }

  routeToOrder = (row) => {
    const { order_id = '' } = row
    router.push({
      pathname: `/order/orderDetail/${order_id}`,
    })
  }

  renderTotals() {
    const { userAccountList: { sum = {} } } = this.props
    const {
      balance = '',
      refund = '',
      refunding = '',
      admin_add = '',
      admin_reduce = '',
    } = sum || {}

    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={5}>
          <div className={styles.totalCol}>
            <div>
              <span>用户余额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(balance, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.totalCol}>
            <div>
              <span>已提金额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(refund, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.totalCol}>
            <div>
              <span>待提金额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(refunding, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.totalCol}>
            <div>
              <span>录款金额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(admin_add, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.totalCol}>
            <div>
              <span>扣款金额&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(admin_reduce, '￥')}</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderList() {
    const { userAccountList, loading } = this.props
    const { list = [], pagination, query, type = {} } = userAccountList
    const searchProp = {
      search: query,
    }

    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchProp={searchProp}
        searchFields={getSearchFields.call(this, type)}
        columns={getColumns.call(this, type)}
        loading={loading.effects['userAccountList/getList']}
        onSearch={this.onSearch}
        getList={this.getList}
      />
    )
  }

  renderUpdateMoeny() {
    const { updateMoenyModal } = this.state
    return (
      <UpdateMoney
        visible={updateMoenyModal}
        onCancel={this.toggleUpdateMoneyModal}
        onOk={() => { this.toggleUpdateMoneyModal(); this.getList() }}
      />
    )
  }

  renderDetailsModal() {
    const { detailsModal, details } = this.state
    const { userAccountList: { type: types = {} } } = this.props
    return (
      <Details
        visible={detailsModal}
        details={details}
        types={types}
        onCancel={() => { this.onCloseModal('detailsModal') }}
      />
    )
  }

  renderAfterSaleModal() {
    const { afterSaleModal, order } = this.state
    if (!order || !afterSaleModal) return null
    return (
      <AfterSale
        onCancel={() => { this.onCloseModal('afterSaleModal') }}
        modalVisible={afterSaleModal}
        order={order} />)
  }

  renderDeductionModal() {
    const { deductionModal, details } = this.state

    return (
      <Deduction
        visible={deductionModal}
        details={details}
        onCancel={() => { this.onCloseModal('deductionModal') }}
      />
    )
  }

  render() {
    const { userAccountList: { query = '' } } = this.props
    const btns = [
      {
        type: 'primary',
        name: '加扣款',
        handleClick: this.toggleUpdateMoneyModal,
        permission: hasBtn('updateMoney'),
      },
      {
        type: 'export',
        name: '导出',
        url: $api.finance.userAccountExport.url,
        query,
        permission: hasBtn('userAccountExport'),
      },
    ].filter(el => el.permission)

    return (
      <Page inner className={styles.userAccountList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        {this.renderList()}
        {this.renderUpdateMoeny()}
        {this.renderDetailsModal()}
        {this.renderAfterSaleModal()}
        {this.renderDeductionModal()}
      </Page>
    )
  }
}

export default UserAccountList
