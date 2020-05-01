import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns, searchFields } from './components/fields'
import { PageTitle } from 'components'
@connect(({ user, userAudit, loading }) => ({
  user,
  loading,
  userAudit,
}))
class UserAudit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `userAudit/getList`,
      payload,
    })
  }
  auditAdopt = (verify_id_str) => {
    $api.user.auditAdopt({ verify_id_str }, { success: true }).then(_ => {
      this.getList()
    })
  }
  auditRefuse = (verify_id_str) => {
    $api.user.auditRefuse({ verify_id_str }, { success: true }).then(_ => {
      this.getList()
    })
  }
  getArrDifference = (arr1, arr2) => {
    return arr1.concat(arr2).filter((v, i, arr) => {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    })
  }
  mutipulClick = (key, ids) => {
    const id = ids.join(',')
    switch (key) {
      case 'adopt':
        this.auditAdopt(id)
        break
      case 'refuse':
        this.auditRefuse(id)
        break
    }
  }
  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `userList/onSearch`, payload: query })
    dispatch({ type: `userAudit/getList`, payload: query })
  }
  render() {
    const { getList, mutipulClick, onSearch } = this
    const { userAudit, loading } = this.props
    const { list, pagination } = userAudit
    const mutipulBtns = [
      {
        name: '通过',
        key: 'adopt',
        permission: $api.user.auditAdopt.permission()
      },
      {
        name: '驳回',
        key: 'refuse',
        permission: $api.user.auditRefuse.permission()
      },
    ].filter(it => it.permission || it.permission === undefined)
    return (
      <Page inner>
        <PageTitle></PageTitle>
        <CommonTable
          dataSource={list}
          getList={getList}
          pagination={pagination}
          loading={loading.effects[`userAudit/getList`]}
          columns={getColumns.call(this)}
          mutipulBtns={mutipulBtns}
          mutipulClick={mutipulClick}
          searchFields={searchFields}
          onSearch={onSearch}
          onDisabled={({ result }) => result === 1 || result === 2}
        />
      </Page>
    )
  }
}

export default UserAudit
