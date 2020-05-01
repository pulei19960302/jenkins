import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns } from './components/fields'
import { PageTitle } from 'components'
@connect(({ user, userLevel, loading }) => ({
  user,
  loading,
  userLevel,
}))
class UserLevel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
    }
  }
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `userLevel/getList`,
      payload,
    })
  }
  addLevel = () => {
    const { userLevel } = this.props
    const { list } = userLevel
    this.props.history.push({
        pathname:'/user/userLevelSet',
        query:{
            sort:(list && list.length)?+list[0].biggst+1:1
        }
    })
  }
  goSet=(id)=>{
    this.props.history.push({
        pathname:'/user/userLevelSet',
        query:{
            id
        }
    })
  }
  del=(id)=>{
    $api.user.delLevel({id},{success:true}).then(_=>{
        this.getList()
    })
  }
  render() {
    const { getList, addLevel } = this
    const { userLevel, loading } = this.props
    const { list, pagination } = userLevel
    return (
      <Page inner>
        <PageTitle
          btns={
          [
            {
              icon: 'plus',
              type:'primary',
              name: '添加等级',
              handleClick: addLevel,
              permission:$api.user.addLevel.permission()
            },
          ].filter(it => it.permission || it.permission === undefined)
          }
        ></PageTitle>
        <CommonTable
          dataSource={list}
          getList={getList}
          pagination={pagination}
          loading={loading.effects[`userLevel/getList`]}
          columns={getColumns.call(this)}
        />
      </Page>
    )
  }
}

export default UserLevel
