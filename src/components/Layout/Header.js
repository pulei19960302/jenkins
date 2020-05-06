import React, { PureComponent, Fragment } from 'react'
import { FormOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Menu, Layout, Avatar } from 'antd'
import { IconFont } from 'components'
import classnames from 'classnames'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
    e.key === 'AccountSet' && this.props.onAccountSet()
  }
  render() {
    const { fixed, name, avatar, contact, collapsed, onCollapseChange } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu} selectedKeys={[]}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>欢迎您,{name}</span>
              <span>{contact}</span>
              {
                !avatar && (
                  <IconFont type='iconhoutaitouxiang' className={styles.defaultAvator}></IconFont>
                )
              }
              {avatar && <Avatar style={{ marginLeft: 8 }} src={avatar} />}
            </Fragment>
          }
        >
          <Menu.Item key="AccountSet">
            <FormOutlined />
            账户设置
          </Menu.Item>
          <Menu.Item key="SignOut" style={{ color: '#F5222D' }}>
            <LogoutOutlined />
            退出
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <LegacyIcon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>

        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    );
  }
}

export default Header
