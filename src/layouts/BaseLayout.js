/**
 * File: 全局布局
 */

import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Helmet } from 'react-helmet'
import { Loader } from 'components'
import { queryLayout } from 'utils'
import NProgress from 'nprogress'
import config from 'utils/config'
import withRouter from 'umi/withRouter'

import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import './BaseLayout.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

@withRouter
@connect(({ loading }) => ({ loading }))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props

    // 根据当前路由判断应用 primary 还是 public 布局
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]

    // 控制跳转加载进度条
    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }
    if (!loading.global) {
      NProgress.done()
      this.previousPath = currentPath
    }

    return (
      <Fragment>
        {/* 管理 Document Head */}
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

export default BaseLayout
