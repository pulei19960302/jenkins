import React, { PureComponent } from 'react'
import { Layout } from 'antd'
import ScrollBar from '../ScrollBar'
import SiderMenu from './Menu'
import logo from 'assets/images/logo.png'
import config from 'utils/config'
import styles from './Sider.less'
class Sider extends PureComponent {
  render() {
    const {
      logoPath,
      siteName = "平台管理系统",
      menus,
      theme,
      collapsed,
      // onThemeChange,
      onCollapseChange,
    } = this.props
    return (
      <Layout.Sider
        width={170}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img alt="logo" src={logoPath || logo} />
            {collapsed ? null : <h1>{siteName || config.siteName}</h1>}
          </div>
        </div>

        <div className={styles.menuContainer}>
          <ScrollBar
            options={{
              // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
              suppressScrollX: true,
            }}
          >
            <SiderMenu
              menus={menus}
              theme={theme}
              collapsed={collapsed}
              onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>
        {/* {collapsed ? null : (
          <div className={styles.switchTheme}>
            <span>
              <Icon type="bulb" />
              更换主题
            </span>
            <Switch
              onChange={onThemeChange.bind(
                this,
                theme === 'dark' ? 'light' : 'dark'
              )}
              defaultChecked={theme === 'dark'}
              checkedChildren={'暗'}
              unCheckedChildren={'亮'}
            />
          </div>
        )} */}
      </Layout.Sider>
    )
  }
}

export default Sider
