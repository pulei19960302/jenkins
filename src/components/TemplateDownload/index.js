/**
 * 模板下载
 * props:
 * templateUrl: 模板下载地址
 */
import React from 'react'
import { Button } from 'antd'

class Export extends React.Component {
  templateDownload=()=> {
    try {
      window.open(`${window.location.origin}${this.props.templateUrl}`)
    } catch (e) {
      throw new Error(e)
    }
  }
  render() {
    const { name = "模板下载",isBtn=true } = this.props
    return (
        isBtn?
      <Button className="mr8" onClick={this.templateDownload}>
        {name}
      </Button>
      :
      <div style={{width:100}} onClick={this.templateDownload}>{name}</div>
    )
  }
}
export default Export
