/**
 * 颜色选择组件
 * props:
 * color: 默认颜色 width: 颜色面板的宽度
 * handleChange: 选择颜色后的回调
 */

import React from 'react'
import { Input, Row, Col } from 'antd'
import { SketchPicker } from 'react-color'
import styles from './index.less'

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.color || '',
      displayColorPicker: false,
    }
  }

  componentWillReceiveProps({ color }) {
    if (color !== this.props.color) {
      this.setState({ value: color })
    }
  }

  handleClose = color => {
    const { onChange } = this.props
    this.setState({ displayColorPicker: false })
    onChange && onChange(this.state.value)
  }

  handleShow = () => {
    this.setState({ displayColorPicker: true })
  }

  handleChange = color => {
    this.setState({ value: color.hex })
  }

  render() {
    const { width,direction } = this.props
    const { value } = this.state
    return (
      <div className={styles.colorPicker}>
       <div className={styles.valContainer}>
        <Input readOnly onClick={this.handleShow} value={value} />
        <div style={{ background: value }} className={styles.block} />
       </div> 
        {this.state.displayColorPicker ? (
          <div>
            <div className={styles.cover} onClick={this.handleClose} />
            <div style={{position:'relative'}}>
                <div className={`${styles.popover} ${direction?direction:''}`}>
                <SketchPicker
                    onChange={this.handleChange}
                    disableAlpha={true}
                    presetColors={[]}
                    width={width}
                    color={value}
                />
                </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default ColorPicker
