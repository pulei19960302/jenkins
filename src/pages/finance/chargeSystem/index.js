import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { Page, PageTitle, SearchForm, Pagination, CommonTable } from 'components'
import { getSearchFields, getColumns } from './components/fields'
import Notes from '@/pages/finance/supplierList/components/Notes'
import styles from './index.less'

@connect(({ chargeSystem, loading }) => ({ chargeSystem, loading }))
class ChargeSystem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      notesModal: true,
      notes: '',
    }
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'chargeSystem/getList', payload })
  }

  toggleNotesModal = () => {
    this.setState((prevState) => ({
      notesModal: !prevState.notesModal
    }))
  }

  handleAddNotes = (notes = '') => {
    //api 请求 根据具体的id 如果 需要notes 回填，则，将信息回填进去。初始化渲染 notes modal 的时候，则 填进去
    this.toggleNotesModal()
  }

  renderDescribe() {
    const { chargeSystem } = this.props
    const { pagination: { total } } = chargeSystem
    return (
      <div className={styles.describe}>
        <div>符合搜索条件的数据共&nbsp;<span style={{ color: 'red' }}>{total}</span>&nbsp;条</div>
        <div>可用额度:
          &nbsp;<span style={{ color: 'red' }}>￥</span>
          &nbsp;=&nbsp;余额:&nbsp;<span style={{ color: 'red' }}>￥</span>
          &nbsp;-&nbsp;未结清金额:&nbsp;<span style={{ color: 'red' }}>￥</span>
        </div>
        <div>
          系统累计为您服务{}天,&nbsp;成交{}笔订单,&nbsp;交易成功&nbsp;<span style={{ color: 'red' }}>￥</span>
        </div>
      </div>
    )
  }

  render() {
    const { notesModal, notes } = this.state
    const { chargeSystem, loading } = this.props
    const { query, pagination, list = [] } = chargeSystem
    const btns = [
      {
        type: 'export',
        name: '导出',
        handleClick: () => { }
      }
    ]

    const searchFormProps = {
      search: query,
      fields: getSearchFields(),
      onSearch: this.onSearch,
    }

    // const paginationProps = {
    //   ...pagination,
    //   onChange: (page, pageSize) => { this.getList({ page, pageSize }) },
    //   onShowSizeChange: (page, pageSize) => { this.getList({ page: 1, pageSize }) }
    // }

    return (
      <Page inner>
        <PageTitle btns={btns} />
        <SearchForm {...searchFormProps} />
        {this.renderDescribe()}
        <CommonTable
          dataSource={list}
          pagination={pagination}
          columns={getColumns.call(this)}
          loading={loading.effects['chargeSystem/getList']}
          getList={this.getList}
        />
        <Notes
          visible={notesModal}
          notes={notes}
          onOk={this.handleAddNotes}
          onCancel={this.toggleNotesModal}
        />
      </Page>
    )
  }
}

export default ChargeSystem