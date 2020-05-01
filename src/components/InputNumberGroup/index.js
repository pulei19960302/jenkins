/**
 * 数字输入组组件，如金额的输入
 * props addonBefore 前缀 addonAfter 后缀 inputNumberProps InputNumber组件相关props
 */
import React from 'react'
import { InputNumber } from 'antd'

class InputNumberGroup extends React.Component {
  static defaultProps = {
    addonBefore: '',
    addonAfter: '',
  }
  constructor(props) {
    super(props)
    const value = props.value ? props.value : ''
    this.state = {
      value,
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState({ value })
    }
  }
  handleChange = value => {
    if (!('value' in this.props)) {
      this.setState({ value })
    }
    this.triggerChange(value)
  }
  triggerChange = changedValue => {
    const onChange = this.props.onChange
    if (onChange) {
      onChange(changedValue)
    }
  }
  render() {
    const state = this.state
    const { addonAfter, addonBefore } = this.props
    const inputNumberProps = {
      ...this.props,
      value: state.value,
      onChange: this.handleChange,
    }
    return (
      <span className="ant-input-group-wrapper">
        <span className="ant-input-wrapper ant-input-group">
          {addonBefore && (
            <span className="ant-input-group-addon">{addonBefore}</span>
          )}
          <InputNumber
            style={{ padding: 0 }}
            className="ant-input"
            {...inputNumberProps}
          />
          {addonAfter && (
            <span className="ant-input-group-addon">{addonAfter}</span>
          )}
        </span>
      </span>
    )
  }
}

export default InputNumberGroup
