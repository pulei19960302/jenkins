import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable } from 'components'
import { getColumns, getSearchFields } from './components/fields'
import ReviewTransfer from './components/ReviewTransfer'
import { WITHDRAW_STATUS } from '../constants'

@connect(({ transferList, loading }) => ({ transferList, loading }))
class TransferList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      reviewModal: false,
      details: null,
      forCheck: true,
    }
  }

  mutipulClick = (key, keys = [], field, rows = []) => {
    const ids = keys && keys.join(',')
    switch (key) {
      case 'agree':
        $api.finance.transferCheck({ ids, status: WITHDRAW_STATUS.SUCCESS})
        break;
      case 'reject':
        $api.finance.transferCheck({ ids, status: WITHDRAW_STATUS.FAILED})
        break;
    }
  }

  toggleReviewModal = (details = {}, forCheck) => {
    this.setState((prevState) => ({
      reviewModal: !prevState.reviewModal,
      forCheck,
      details,
    }))
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'transferList/onSearch', payload, })
    dispatch({ type: 'transferList/getList', payload, })
  }

  onDisabled = (row) => {
    return row.status !== WITHDRAW_STATUS.APPLY_FOR
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'transferList/getList', payload, })
  }

  renderList() {
    const { transferList, loading } = this.props
    const { list = [], pagination, query, type, pay_way } = transferList
    const searchProp = {
      search: query
    }

    const mutipulBtns = [
      {
        name: '批量同意',
        key: 'agree',
        permission: $api.finance.transferCheck.permission(),
      },
      {
        name: '批量拒绝',
        key: 'reject',
        permission: $api.finance.transferCheck.permission(),
      }
    ]
    return (
      <CommonTable
        dataSource={list}
        pagination={pagination}
        searchProp={searchProp}
        mutipulBtns={mutipulBtns}
        searchFields={getSearchFields.call(this, type, pay_way)}
        columns={getColumns.call(this, pay_way)}
        loading={loading.effects['transferList/getList']}
        mutipulClick={this.mutipulClick}
        onSearch={this.onSearch}
        getList={this.getList}
        onDisabled={this.onDisabled}
      />
    )
  }

  render() {
    const { transferList } = this.props
    const { pay_way: payWay, query = '' } = transferList
    const { reviewModal, details, forCheck } = this.state
    
    const btns = [
      {
        type: 'export',
        name: '导出',
        url: $api.finance.settleExport.url,
        query,
        permission: $api.finance.settleExport.permission(),
      },
    ].filter(el => el.permission)

    return (
      <Page inner>
        <PageTitle btns={btns} />
        {this.renderList()}
        <ReviewTransfer
          visible={reviewModal}
          details={details}
          payWay={payWay}
          forCheck={forCheck}
          onCancel={this.toggleReviewModal}
          onOk={() => { this.getList(); this.toggleReviewModal() }}
        />
      </Page>
    )
  }
}

export default TransferList