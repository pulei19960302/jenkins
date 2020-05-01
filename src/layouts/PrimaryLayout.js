/**
 * File: 主体布局
 * TODO: 右侧灰条过宽
 */

import React, { PureComponent, Fragment } from 'react'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout } from 'antd'
import config from 'config'
import { router } from 'utils'
import styles from './PrimaryLayout.less'
import routeList from './routeConfig'
import { menuPermission, hasPagePermission } from 'utils/permission'
import Error from '@/pages/Error'
import 'animate.css'

const LayoutContent = Layout.Content
const { Header, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    key: 1,
  }
  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }
  render() {
    const { app, dispatch, children } = this.props
    const { theme, collapsed, user, key } = app
    const { onCollapseChange } = this
    const newRouteList = menuPermission(routeList)
    const hasPermission = hasPagePermission(newRouteList)
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')
    const headerProps = {
      menus,
      collapsed,
      onCollapseChange,
      name: user.name,
      avatar: user.avatar,
      // contact: user.contact,
      fixed: config.fixedHeader,
      onSignOut() {
        dispatch({ type: 'app/logout' })
      },
      onAccountSet() {
        router.push('/user/accountSet')
      },
    }

    const siderProps = {
      logoPath: user.company_logo,
      siteName: user.company_name,
      theme,
      menus,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          <Sider {...siderProps} />
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 56 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            {
              !!key &&
              <LayoutContent className={styles.content}>
                {/* <Bread routeList={newRouteList} /> */}
                {hasPermission ? children : <Error />}
              </LayoutContent>
            }

            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

export default PrimaryLayout
