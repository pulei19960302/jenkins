import React, { PureComponent } from 'react'
import { connect } from 'dva'

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MinusSquareOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

import { Tree, Dropdown, Menu, Modal, message } from 'antd';
import { arrayToTree } from 'utils'
import DepartmentModal from './departmentModal'
const { TreeNode } = Tree;

@connect(({ members }) => ({ ...members }))
class Department extends PureComponent {
  state = {
    modalVisible: false,
    selectDepartment: {},  //当前modal操作的部门
  }

  componentDidMount() {
    this.getDepartmentList()
  }

  // initData = (data) => {
  //   return data
  // }

  getDepartmentList = () => {
    const { dispatch } = this.props
    dispatch({ type: 'members/getDepartmentList' })
  }

  onExpand = (expandedKeys) => {
    const { dispatch } = this.props
    dispatch({ type: 'members/updateState', payload: { expandedKeys } })
  }

  toggleModal = (type) => {
    this.setState({
      modalVisible: type
    })
  }

  addDepartment = ({ id: parent_id, department_name: ptitle }) => {
    this.setState({
      selectDepartment: { parent_id, ptitle }
    })
    this.toggleModal(true)
  }

  editDepartment = (selectDepartment) => {
    this.setState({
      selectDepartment
    })
    this.toggleModal(true)
  }

  delDepartment = (data) => {
    let flag = true
    if (data.count) {
      flag = false
    } else if (data.children && data.children.length > 0) {
      flag = data.children.find(el => el.cout > 0) ? false : true
    }
    if (!flag) {
      message.warning('该部门或其子部门下还有成员，删除失败！', 3)
      return
    }
    let department_ids = [data.id]
    if (data.children && data.children.length > 0) {
      data.children.forEach(el => {
        department_ids.push(el.id)
      });
    }
    console.log(department_ids)
    Modal.confirm({
      title: '删除部门',
      content: `确认删除该部门吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        $api.permissions.deleteDepartment({ department_ids }, { success: true }).then(() => {
          this.getDepartmentList()
        })
      },
    });
  }

  getSearchDepartment = (id, data, titles) => {
    const { treeData } = this.props
    if (!id) {
      return '所有部门'
    }
    for (let i = 0; i < data.length; i++) {
      const el = data[i]
      if (el.id === id) {
        titles.unshift(el.department_name)
        if (el.parent_id !== 0) {
          this.getSearchDepartment(el.parent_id, treeData, titles)
        }
        break
      } else {
        if (el.children && el.children.length) {
          this.getSearchDepartment(id, el.children, titles)
        }
      }
    };
    return titles.join('-')
  }

  onSelect = (selectedKeys) => {
    const { dispatch, treeData } = this.props
    const searchDepartment = this.getSearchDepartment(+selectedKeys[0], treeData, [])
    dispatch({ type: 'members/updateState', payload: { selectedKeys, searchDepartment } })
    dispatch({ type: 'members/getList', payload: { department_id: selectedKeys[0] || '' } })
  };


  //menu组操作
  handleMenuClick = ({ item, key, domEvent }) => {
    const { data } = item.props
    switch (key) {
      case 'add':
        this.addDepartment(data)
        break;
      case 'edit':
        this.editDepartment(data)
        break;
      case 'del':
        this.delDepartment(data)
        break;
    }
    domEvent.stopPropagation()
  }

  // 渲染操作menu组
  renderMenuItem = (item) => {
    return (
      <Menu onClick={this.handleMenuClick}>
        {
          $api.permissions.addDepartment.permission() && item.parent_id === 0 &&
          <Menu.Item key='add' data={item} className="permissionMenuItem">
            <PlusCircleOutlined />&nbsp;添加
        </Menu.Item>
        }
        {
          $api.permissions.updateDepartment.permission() &&
          <Menu.Item key='edit' data={item} className="permissionMenuItem">
            <EditOutlined />&nbsp;重命名
          </Menu.Item>
        }
        {
          $api.permissions.deleteDepartment.permission() &&
          <Menu.Item key='del' data={item} className="permissionMenuItem">
            <DeleteOutlined />&nbsp;删除
          </Menu.Item>
        }
      </Menu>
    );
  }

  // 自定义渲染TreeNode的Title
  renderTreeNodeTitle = (data) => {
    const { department_name } = data
    return (
      <React.Fragment>
        <div className="nodeTitle">
          <span className="name">{department_name}</span>
          <span className="operate" onClick={(e) => { e.stopPropagation() }}>
            <Dropdown overlay={this.renderMenuItem(data)} trigger={['hover']}>
              <EllipsisOutlined />
            </Dropdown>
          </span>
        </div>
      </React.Fragment>
    );
  }

  //  渲染TreeNode
  renderTreeNodes = (treeData) => {
    const { expandedKeys } = this.props
    return treeData.map(item => {
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        return (
          <TreeNode
            style={{ position: 'relative' }}
            switcherIcon={expandedKeys.includes(item.id + '') ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
            title={this.renderTreeNodeTitle(item)}
            key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={this.renderTreeNodeTitle(item)} key={item.id} style={{ position: 'relative' }} />
    });
  }

  render() {
    const { modalVisible, selectDepartment } = this.state;
    const { expandedKeys, selectedKeys, treeData } = this.props
    return (
      <React.Fragment>
        <div className="header">
          {
            $api.permissions.addDepartment.permission() &&
            <div onClick={() => { this.addDepartment({ id: 0 }) }}>
              <PlusCircleOutlined />&nbsp;&nbsp;添加部门
            </div>
          }
        </div>
        <div className="tree">
          <Tree
            onExpand={this.onExpand}
            onSelect={this.onSelect}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </div>
        <DepartmentModal
          department={selectDepartment}
          onCancel={() => this.toggleModal(false)}
          modalVisible={modalVisible}
          successCallback={this.getDepartmentList}
        />
      </React.Fragment>
    );
  }
}
export default Department