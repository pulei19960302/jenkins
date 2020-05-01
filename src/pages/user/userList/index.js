import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, TabsBar } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns, searchFields } from './components/fields'
import UserEdit from '../components/UserEdit'
import UserType from '../components/UserType'
import UserUpLevel from '../components/UserUpLevel'
import UserUpIntergral from '../components/UserUpIntergral'
import { Modal } from 'antd'
@connect(({ user, userList, loading }) => ({
  user,
  loading,
  userList
}))
class UserList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showUserEdit: false,
      userData: {},
      showUserType: false,
      userTypeData: {},
      showUserLevel: false,
      userLevelData: {},
      showUserUpIntergral:false,
      userUpIntergralUid:0
    }
  }
  // 更多操作
  tableMoreClick = (key, row) => {
    const id = row.id
    switch (key) {
      case 'del':
        this.userDel(id)
        break
      case 'up':
        this.toogleUserStatus(id, 1)
        break
      case 'disable':
        this.toogleUserStatus(id, 2)
        break
      case 'type':
        this.toogleUserTypeModal(true, id,row.member_type_id)
        break
      case 'switch':
        this.toogleUserLevelModal(true, id)
        break
      case 'switch_intergral':
            this.toogleUserIntergral(true, [id])
        break
    }
  }
  // 切换用户编辑弹窗
  toogleEdit = (showUserEdit, userData) => {
    this.setState({
      showUserEdit,
    })
    if (userData) {
      this.setState({
        userData,
      })
    }
  }
  goDetail = id => {
    this.props.history.push({
      pathname: `/user/userDetail/${id}`,
      // state:{id},
      // query:{id},
    })
  }
  // 批量操作
  mutipulClick = (key, items) => {
    const ids = items.join(',')
    switch (key) {
      case 'del':
        this.userDel(ids)
        break
      case 'up':
        this.toogleUserStatus(ids, 1)
        break
      case 'disable':
        this.toogleUserStatus(ids, 2)
        break
      case 'type':
        this.toogleUserTypeModal(true, ids)
        break
      case 'switch':
        this.toogleUserLevelModal(true, ids)
        break
      case 'switch_intergral':
          this.toogleUserIntergral(true,ids.split(','))
        break
    }
  }
  // 删除用户
  userDel = id => {
    Modal.confirm({
      title: '确认删除所选用户么?',
      okText:'确定',
      cancelText:'取消',
      onOk: () => {
        $api.user.userDel({ member_id_str:`${id}` }, { success: true }).then(_ => {
          this.props.dispatch({ type: `userList/getList` })
        })
      },
    })
  }
  // 切换用户状态
  toogleUserStatus(id, status) {
    $api.user.userType({ member_id_str:`${id}`, status }, { success: true }).then(_ => {
      this.props.dispatch({ type: `userList/getList` })
    })
  }
  tabsChange = e => {
    this.props.dispatch({
      type: `userList/updateState`,
      payload: { tabsKey: e.value },
    })
    this.props.dispatch({ type: `userList/getList` })
  }
  // 切换用户类型弹窗
  toogleUserTypeModal = (showUserType, id,member_type_id=null) => {
    this.setState({
      showUserType,
    })
    if (id) {
      this.setState({
        userTypeData: {
          id,
          member_type_id
        },
      })
    }
  }
  toogleUserLevelModal = (showUserLevel, id) => {
    this.setState({
      showUserLevel,
    })
    if (id) {
      this.setState({
        userLevelData: {
          id,
        },
      })
    }
  }
  toogleUserIntergral=(showUserUpIntergral,id)=>{
    this.setState({
        showUserUpIntergral
    })
    if(id){
        this.setState({
            userUpIntergralUid:id
        })
    }
  }
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `userList/getList`,
      payload,
    })
  }
  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `userList/onSearch`, payload: query })
    dispatch({ type: `userList/getList`, payload: query })
  }
  render() {
    const {
      showUserEdit,
      userData,
      userTypeData,
      showUserType,
      showUserLevel,
      userLevelData,
      userUpIntergralUid,
      showUserUpIntergral
    } = this.state
    const {
      toogleEdit,
      mutipulClick,
      toogleUserTypeModal,
      toogleUserLevelModal,
      getList,
      onSearch,
      toogleUserIntergral
    } = this
    const { userList, loading } = this.props
    const { tabs, tabsKey, query, list, pagination,tabsEnum } = userList

    const tabsProps = {
      tabs,
      onChange: this.tabsChange,
      defaultActiveKey: tabsKey,
    }
    const mutipulBtns = [
      {
        name: '启用',
        key: 'up',
        permission: $api.user.userType.permission(),
      },
      {
        name: '禁用',
        key: 'disable',
        permission: $api.user.userType.permission(),
      },
      {
        name: '修改类型',
        key: 'type',
        permission: $api.user.userChangeType.permission(),
      },
      {
        name: '调整上级',
        key: 'switch',
        permission: $api.user.userUpLevel.permission(),
      },
      {
        name: '调整积分',
        key: 'switch_intergral',
        permission: $api.user.userUpIntergral.permission(),
      },
      {
        name: '删除',
        key: 'del',
        permission: $api.user.userDel.permission(),
      },
    ].filter(it => it.permission || it.permission === undefined)
    const searchProp = {
      search: query,
    }
    return (
      <Page inner>
        <TabsBar {...tabsProps}></TabsBar>
        <CommonTable
          dataSource={list}
          getList={getList}
          onSearch={onSearch}
          pagination={pagination}
          loading={loading.effects[`userList/getList`]}
          columns={getColumns.call(this,tabsEnum)}
          searchFields={searchFields}
          mutipulClick={mutipulClick}
          mutipulBtns={mutipulBtns}
          searchProp={searchProp}
        />
        <UserEdit
          userData={userData}
          toogle={toogleEdit}
          visible={showUserEdit}
          getList={getList}
        ></UserEdit>
        <UserType
          userTypeData={userTypeData}
          toogle={toogleUserTypeModal}
          visible={showUserType}
          getList={getList}
        ></UserType>
        <UserUpLevel
          userLevelData={userLevelData}
          toogle={toogleUserLevelModal}
          visible={showUserLevel}
          getList={getList}
        ></UserUpLevel>
        <UserUpIntergral
            uid={userUpIntergralUid}
            visible={showUserUpIntergral}
            toogle={toogleUserIntergral}
            fresh={getList}
        />
      </Page>
    )
  }
}

export default UserList
