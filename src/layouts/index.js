/**
 * File: 全局布局入口
 */

import React, { Component } from 'react'
import BaseLayout from './BaseLayout'

class Layout extends Component {
  render() {
    const { children } = this.props
    return <BaseLayout>{children}</BaseLayout>
  }
}

export default Layout
