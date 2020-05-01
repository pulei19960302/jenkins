import React, { Component } from 'react'
import classnames from 'classnames'
import Loader from '../Loader'
import styles from './Page.less'

export default class Page extends Component {
  render() {
    const {
      className,
      children,
      loading = false,
      inner = false,
      style,
    } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }

    return (
      <div
        className={classnames({
          [styles.contentInner]: inner,
        }, className)}
        style={loading ? loadingStyle : style}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}
