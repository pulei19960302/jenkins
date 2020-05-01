import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable } from 'components'
import {searchFields, getColumns} from './components/fields'

@connect(({ detailAccount, loading }) => ({ detailAccount, loading }))
class DetailAccount extends PureComponent {
  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'detailAccount/onSearch', payload, })
    dispatch({ type: 'detailAccount/getList', payload, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'detailAccount/getList', payload, })
  }

  render() {
    const { detailAccount, loading } = this.props
    const { list = [], pagination, query } = detailAccount

    return (
      <Page inner>
        <PageTitle />
        <CommonTable
          dataSource={list}
          pagination={pagination}
          searchFields={searchFields()}
          columns={getColumns.call(this)}
          loading={loading.effects['detailAccount/getList']}
          onSearch={this.onSearch}
          getList={this.getList}
        />
      </Page>
    )
  }
}

export default DetailAccount