import React, { PureComponent, Fragment } from 'react'
import { Tree, Menu, Dropdown, Modal, Badge, Spin } from 'antd'
import { connect } from 'dva'
import {
  PlusCircleOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import FirstCategoryModal from '../FirstCategoryModal'

const { TreeNode } = Tree
const { confirm } = Modal

@connect(({ newCategory, loading }) => ({ ...newCategory, loading }))
class Index extends PureComponent {

  state = {
    showCategoryModal: false,
    categoryModalProps: {},
  }

  toggleStatus = (key, status) => {
    this.setState({
      [key]: status,
    })
  }

  handleTreeSelect = (selectedKeys) => {
    const { dispatch } = this.props
    if (selectedKeys.length > 0) {
      const currentId = selectedKeys && selectedKeys[0]
      dispatch({ type: 'newCategory/updateState', payload: { selectedKeys, currentId } })
      dispatch({ type: 'newCategory/getList', payload: { pid: currentId } })
      dispatch({ type: 'newCategory/updateCurrentStatus', payload: {currentId} })
    }
  }

  handleCancel = () => {
    this.toggleStatus('showCategoryModal', false)
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch({ type:'newCategory/getTreeData' })
  }

  addDepartment = () => {
    const { treeData } = this.props;
    this.setState({
      categoryModalProps: {
        treeData,
        handleSubmit: this.handleSubmit,
        handleCancel: this.handleCancel
      }
    })
    this.toggleStatus('showCategoryModal', true)
  }

  editDepartment = (data) => {
    const { treeData } = this.props
    this.setState({
      categoryModalProps: {
        initForm: data,
        treeData,
        handleSubmit: this.handleSubmit,
        handleCancel: this.handleCancel
      },
    })
    this.toggleStatus('showCategoryModal', true)
  }

  delDepartment = (data) => {
    const { dispatch, currentId } = this.props;
    const { id } = data;
    confirm({
      title: '删除类目',
      content: '是否确认删除当前类目？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        $api.category.categoryDel({ id }, { success: true })
          .then(_ => {
            if (Number(id) === Number(currentId)) {
              dispatch({ type: 'newCategory/updateState', payload: { currentId: null } })
            }
            dispatch({ type: 'newCategory/getTreeData' })
          })
      },
    })
    // dispatch({ type: 'newCategory/d', payload: { id: data.id }})
  }


  //menu组操作
  handleMenuClick = ({ item, key, domEvent }) => {
    const { data } = item.props
    switch (key) {
      case 'edit':
        this.editDepartment(data)
        break
      case 'del':
        this.delDepartment(data)
        break
    }
    domEvent.stopPropagation()
  }

  // 渲染操作menu组
  renderMenuItem = (item) => {
    return (
      <Menu onClick={this.handleMenuClick}>
        {
          $api.category.categoryEdit.permission() && <Menu.Item key='edit' data={item} className="permissionMenuItem">
            <PlusCircleOutlined/>&nbsp;编辑
          </Menu.Item>
        }
        {
          $api.category.categoryDel.permission() && item.is_diy === 1 && <Menu.Item key='del' data={item} className="permissionMenuItem">
            <DeleteOutlined/>&nbsp;删除
          </Menu.Item>
        }
      </Menu>
    )
  }

  // 自定义渲染TreeNode的Title
  renderTreeNodeTitle = (data) => {
    const { name, status } = data
    return (
      <React.Fragment>
        <div className="nodeTitle">
          <Badge status={ status === 1 ? 'success' : 'error' } />
          <span className="name">{name}</span>
          <span className="operate" onClick={(e) => {
            e.stopPropagation()
          }}>
            <Dropdown overlay={this.renderMenuItem(data)} trigger={['hover']}>
              <MoreOutlined/>
            </Dropdown>
          </span>
        </div>
      </React.Fragment>
    )
  }

  //  渲染TreeNode
  renderTreeNodes = (treeData) => {
    const { expandedKeys } = this.props
    return treeData.map(item => {
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        return (
          <TreeNode
            style={{ position: 'relative' }}
            switcherIcon={expandedKeys.includes(item.id + '') ? <MinusSquareOutlined/> : <PlusSquareOutlined/>}
            title={this.renderTreeNodeTitle(item)}
            key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={this.renderTreeNodeTitle(item)} key={item.id} style={{ position: 'relative' }}/>
    })
  }

  render() {

    const { showCategoryModal, categoryModalProps } = this.state
    const { expandedKeys, selectedKeys, treeData, loading } = this.props


    return (
      <Fragment>
        <div className='header'>
          {
            $api.category.categoryAdd.permission() &&
            <div onClick={this.addDepartment}>
              <PlusCircleOutlined/>&nbsp;&nbsp;新增一级类目
            </div>
          }
        </div>
        <div className="tree">
          <Spin spinning={loading.effects['newCategory/getTreeData']}>
            <Tree
              onSelect={this.handleTreeSelect}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Spin>
        </div>

        {
          showCategoryModal && <FirstCategoryModal handleCancel={this.handleCancel} {...categoryModalProps}/>
        }

      </Fragment>
    )
  }
}

export default Index
