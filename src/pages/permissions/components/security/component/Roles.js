import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, List, Dropdown, Menu, Modal, message, Button } from 'antd';
import { MENU_TYPE } from '../../../constants'
import AddRole from './AddRole'
import EditRole from './EditRole'
import styles from '../index.less'

@Form.create()
class Roles extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addRoleModal: false,
      editRoleModal: false,
      editRole: {}
    }
  }

  toggleAddRole = (addRoleModal) => {
    this.setState({
      addRoleModal
    })
  }

  toggleEditRole = (editRoleModal) => {
    this.setState({
      editRoleModal
    })
  }

  handleMenuClick = ({ item = {}, key, keyPath, domEvent } = {}) => {
    const { props = {} } = item
    const { details = {} } = props
    switch (key) {
      case 'edit':
        this.handelMenuEdit(details)
        break;
      case 'del':
        this.handleMenuDel(details.id)
        break;
    }
  }

  handelMenuEdit = (details = {}) => {
    this.setState({
      editRole: details,
    })
    this.toggleEditRole(true)
  }

  handleMenuDel = (role_id = '') => {
    const { dispatch } = this.props
    Modal.confirm({
      title: '多个成员正在使用当前角色，删除后所有成员将解除相关权限，是否确认删除？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'security/deleteRole',
          payload: { role_id },
        })
      }
    });
  }

  handleSelectRole = (id = '') => {
    const { dispatch, selectedRole } = this.props
    if (id !== selectedRole) {
      dispatch({
        type: 'security/updateSelectedRole',
        payload: { id }
      })
    }
  }

  renderMenuItem = (item = {}) => {
    const { id = '' } = item
    return (
      <Menu onClick={this.handleMenuClick}>
        {
          <Menu.Item key='edit' details={item} style={{ height: '32px', lineHeight: '32px' }}>
            <EditOutlined style={{ fontSize: '16px', color: '#666666bf' }} />
            {MENU_TYPE.EDIT}
          </Menu.Item>
        }
        {
          $api.permissions.deleteRole.permission() && (
            <Menu.Item key='del' details={item} style={{ height: '32px', lineHeight: '32px' }}>
              <DeleteOutlined style={{ fontSize: '16px', color: '#666666bf' }} />
              {MENU_TYPE.DEL}
            </Menu.Item>
          )
        }
      </Menu>
    );
  }

  renderListItem = (item) => {
    const { selectedRole, roles } = this.props
    const { role_name = '', id = '', lock = false } = item

    return (
      <List.Item
        className={classNames({
          [styles.selectedRole]: id === selectedRole
        })}
        onClick={() => { this.handleSelectRole(id) }}
      >
        <div className={styles.more}>
          <span>{role_name}</span>
          {
            !lock && (
              <span onClick={(e) => { e.stopPropagation() }}>
                <Dropdown overlay={this.renderMenuItem(item)} trigger={['hover']}>
                  <EllipsisOutlined />
                </Dropdown>
              </span>)
          }
        </div>
      </List.Item>
    );
  }

  render() {
    const { roles, dispatch } = this.props
    const { addRoleModal, editRoleModal, editRole } = this.state
    return (
      <div className={styles.roles}>
        {
          $api.permissions.createRole.permission() && (
            <div className={styles.addBtn} onClick={() => { this.toggleAddRole(true) }}>
              <PlusCircleOutlined />
              <span>&nbsp;&nbsp;添加角色</span>
            </div>
          )
        }
        <List
          className={styles.rolesList}
          dataSource={roles}
          renderItem={this.renderListItem}>
        </List>
        <AddRole
          visible={addRoleModal}
          dispatch={dispatch}
          onCancel={() => { this.toggleAddRole(false) }} />
        <EditRole
          visible={editRoleModal}
          editRole={editRole}
          dispatch={dispatch}
          onCancel={() => { this.toggleEditRole(false) }} />
      </div>
    );
  }
}

export default Roles