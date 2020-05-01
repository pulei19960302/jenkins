import { connect } from 'dva'
import { Modal, message, Button, Tag } from 'antd'
import React, { PureComponent } from 'react'
import { CommonTable } from 'components'
import MemberModal from './memberModal'
import { getTableColums, getSearchFields } from './fields'

const mutipulBtns = [{
  name: '批量删除',
  key: 'delete',
}]

@connect(({ loading, app, members }) => ({
  loading, app, ...members
}))
class MemberList extends PureComponent {
  state = {
    modalVisible: false,
    selectMember: {},
    roleList: [],
  }

  componentDidMount() {
    this.getRole()
    this.getList()
  }

  // 获取角色列表
  getRole = () => {
    $api.permissions.getRolesList().then(({ data }) => {
      this.setState({
        roleList: data.map(el => {
          el.value = el.id
          el.name = el.role_name
          return el
        })
      })
    })
  }

  // 查询列表回调
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'members/getList',
      payload,
    })
  }

  // 查询与重置
  handleSearch = (search) => {
    const { dispatch } = this.props
    dispatch({ type: 'members/onSearch', payload: search })
    dispatch({ type: 'members/getList', payload: { page: 1 } })
  }

  toggleModal = (type) => {
    this.setState({
      modalVisible: type
    })
  }

  editMember = (member) => {
    this.setState({
      selectMember: member
    })
    this.toggleModal(true)
  }

  addMember = () => {
    this.setState({
      selectMember: {}
    })
    this.toggleModal(true)
  }

  deleteMember = (member_ids, mutipul) => {
    Modal.confirm({
      title: mutipul ? '确认删除所选成员么?' : '确认删除该成员么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.permissions.deleteMember({ member_ids }).then(() => {
          message.success('删除成功');
          this.getList()
        })
      }
    })
  }

  mutipulClick = (key, items) => {
    switch (key) {
      case 'delete':
        this.deleteMember(items, true)
        break;
    }
  }

  render() {
    const width = this.props.app.collapsed ? 'calc(100% - 378px)' : 'calc(100% - 468px)'
    const { modalVisible, selectMember, roleList } = this.state
    const { loading, list, pagination, searchDepartment, treeData } = this.props
    return (
      <React.Fragment>
        <div className="searchDepartment">
          <Tag color="cyan">{searchDepartment}</Tag>
        </div>
        {
          $api.permissions.addMember.permission() &&
          <Button type="primary" className="addMember" onClick={this.addMember}>添加成员</Button>
        }
        <CommonTable
          loading={loading.effects['members/getList']}
          getList={this.getList}
          dataSource={list}
          columns={getTableColums.call(this)}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          pagination={pagination}
          pageProps={{ stylePros: { width: width, bottom: 16 } }}
          searchFields={getSearchFields(roleList)}
          onSearch={this.handleSearch}
        />
        <MemberModal
          roleList={roleList}
          treeData={treeData}
          member={selectMember}
          onCancel={() => this.toggleModal(false)}
          modalVisible={modalVisible}
          successCallback={this.getList}
        />
      </React.Fragment>
    )
  }
}

export default MemberList
