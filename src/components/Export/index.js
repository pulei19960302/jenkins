/**
 * 导出组件
 * props:
 * url: 导出链接
 * query: 参数对象
 * style: 按钮其他覆盖样式
 */

import React from 'react'
import { ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import styles from './index.less'

class Export extends React.Component {
  constructor(props) {
    super(props)
    this.handleExport = this.handleExport.bind(this)
  }
  handleExport() {
    const { url, query } = this.props
    let queryStr = '' // 用户搜索字段
    if (Object.keys(query).length > 0) {
      for (const key in query) {
        queryStr += `${key}=${query[key]}&`
      }
    }
    window.open(`/admin${url}?${queryStr}`)
  }
  render() {
    const { style, name = '报表下载', type = 'dashed', btnProps,isBtn=true } = this.props
    return isBtn?
  <Button
    className={styles.defaultBtn}
    type={type}
    icon={<ExportOutlined />}
    style={{ ...style }}
    {...btnProps}
    onClick={this.handleExport}
  >
    {name}
  </Button>
  :
  <div style={{width:100}} onClick={this.handleExport}>{name}</div>;
  }
}
export default Export
