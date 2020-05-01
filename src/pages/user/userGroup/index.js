import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns, searchFields } from './components/fields'
import AddGroup from './components/addGroup'

@connect(({ loading, userGroup }) => ({
  loading,
  userGroup,
}))
class UserGroupList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addGroupVisible: false,
      editGroupData:{}
    }
  }
  mutipulClick = () => {}
  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `userGroup/onSearch`, payload: query })
    dispatch({ type: `userGroup/getList`, payload: query })
  }
  getList = payload => {
    const { dispatch } = this.props
    dispatch({
      type: `userGroup/getList`,
      payload,
    })
  }
  toogleAddGroup = (addGroupVisible,row={}) => {
    this.setState({
      addGroupVisible,
    })
    this.setState({
        editGroupData:row
    })
  }
  toogleLinkUser=()=>{
      
  }
  del=(id)=>{
      $api.user.groupDel({id},{success:true}).then(_=>{
        this.getList()
      })
  }
  render() {
    const { loading, userGroup } = this.props
    const { list, pagination } = userGroup
    const { getList, mutipulClick, onSearch, toogleAddGroup } = this
    const { addGroupVisible,editGroupData } = this.state
    const mutipulBtns = [
      {
        name: '批量删除',
        key: 'del',
        permission:$api.user.groupDel.permission()
      },
    ].filter(it=>it.permission)
    return (
      <Page inner>
        <PageTitle
          btns={[
            {
              icon: 'plus',
              name: '新建群组',
              type:'primary',
              permission:$api.user.groupAdd.permission(),
              handleClick: () => {
                toogleAddGroup(true)
              },
            },
            // {
            //   type:'export'
            // },
          ].filter(it=>it.permission)}
        ></PageTitle>
        <CommonTable
          dataSource={list}
          getList={getList}
          pagination={pagination}
          loading={loading.effects[`userGroup/getList`]}
          columns={getColumns.call(this)}
          searchFields={searchFields}
          onSearch={onSearch}
          mutipulClick={mutipulClick}
          mutipulBtns={mutipulBtns}
        />
        <AddGroup
          getList={getList}
          visible={addGroupVisible}
          toogle={toogleAddGroup}
          editGroupData={editGroupData}
        />
      </Page>
    )
  }
}

export default UserGroupList
