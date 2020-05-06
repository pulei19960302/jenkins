import account from 'accounting'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
import { Row, Col, Modal } from 'antd'
import { router } from 'utils'
import { hasBtn } from '../constants'
import { getColumns, searchFields, getSearchFields } from './components/fields'
import Notes from './components/Notes'
import styles from './index.less'
import SettleAccount from './components/SettleAccount'

@connect(({ supplierList, loading }) => ({ supplierList, loading }))
class LoanList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      notesModal: false,
      settleModal: false,
      notes: '',
      id: '',
      settleDetails: '',
    }
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'supplierList/onSearch', payload, })
    dispatch({ type: 'supplierList/getList', payload, })
  }

  onOpenSettleModal = (settleDetails) => {
    this.setState({
      settleDetails,
      settleModal: true,
    })
  }

  onCloseSettleModal = () => {
    this.setState({
      settleModal: false,
    })
  }

  toggleNotesModal = (id = '', notes = '') => {
    this.setState((prevState) => ({
      notesModal: !prevState.notesModal,
      id,
      notes,
    }))
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'supplierList/getList', payload, })
  }

  handleUpdateNotes = (notes) => {
    const { id } = this.state
    id && $api.finance.editRemark({ id, remark: notes }).then(_ => {
      this.getList()
      this.toggleNotesModal()
    })
  }

  handleCloseLoans = (ids = '', status = '') => {
    Modal.confirm({
      title: '确定结算所选货款么',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.finance.settle({ ids, status }).then(_ => {
          this.getList()
        })
      }
    })
  }

  handleViewDetails = (row) => {
    const { id = '', supplier_id = '' } = row
    router.push({
      pathname: `/finance/supplierDetails`,
      query: { id, supplier_id }
    })
  }

  // bulk operation
  mutipulClick = (key, items = [], field, rows = []) => {
    // 批量结算
    const ids = items.join(',')
    const statusArr = rows && rows.map((row) => {
      return row.status
    })
    const status = statusArr && statusArr.join(',')

    switch (key) {
      case 'close':
        this.handleCloseLoans(ids, status);
        break;
      default:
        break;
    }
  }

  renderTotals() {
    const { supplierList: { sum = {} } } = this.props
    const {
      total = '',
      settle = '',
      settlement = '',
    } = sum || {}
    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={8}>
          <div className={styles.totalCol}>
            <div style={{ display: 'inline-block' }}>
              <span>总供应商货款&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(total, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.totalCol}>
            <div style={{ display: 'inline-block' }}>
              <span>已结算货款&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(settle, '￥')}</span>
            </div>
          </div>
        </Col>
        <Col span={8} >
          <div className={styles.totalCol}>
            <div style={{ display: 'inline-block' }}>
              <span>待结算货款&nbsp;(元)</span>
              <span className={styles.num}>{account.formatMoney(settlement, '￥')}</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderList() {
    const { supplierList, loading } = this.props
    const { list = [], pagination, status, query } = supplierList
    const searchProp = {
      search: query
    }

    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchProp={searchProp}
        searchFields={getSearchFields(status)}
        columns={getColumns.call(this, status)}
        loading={loading.effects['supplierList/getList']}
        onSearch={this.onSearch}
        getList={this.getList}
        mutipulClick={this.mutipulClick}
      />
    )
  }

  renderNotesModal() {
    const { notesModal, notes } = this.state
    return (
      <Notes
        visible={notesModal}
        notes={notes}
        onCancel={this.toggleNotesModal}
        onOk={this.handleUpdateNotes}
      />
    )
  }

  renderSettleModal() {
    const { settleModal, settleDetails } = this.state

    return (
      <SettleAccount
        visible={settleModal}
        details={settleDetails}
        onCancel={this.onCloseSettleModal}
        onOk={() => { this.onCloseSettleModal(); this.getList() }}
      >
      </SettleAccount>
    )
  }

  render() {
    const { supplierList: { query = '' } } = this.props
    const btns = [
      {
        type: 'export',
        name: '导出',
        url: $api.finance.supplierExport.url,
        query,
        permission: hasBtn('supplierExport'),
      },
    ].filter(el => el.permission)

    return (
      <Page inner className={styles.supplierList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        {this.renderList()}
        {this.renderNotesModal()}
        {this.renderSettleModal()}
      </Page>
    )
  }
}

export default LoanList