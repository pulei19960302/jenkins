/**
 * 范围输入组件
 * props:
 * onChange 值改变的回调
 * placeholder 默认占位Array
 * value 默认值Array
 * rangeType 默认只能输入数字
 */
import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import styles from './index.less'

import { cutOutDecimals } from 'utils/index'

const InputGroup = Input.Group
const InputRange = ({
  value = [],
  onChange,
  placeholder = ['开始', '结束'],
  rangeType = 'Number',
  initProps = {}
}) => {
  const [start, startChange] = useState(value[0] || null)
  const [end, endChange] = useState(value[1] || null)
  useEffect(() => {
    startChange(value[0] || null)
    endChange(value[1] || null)
  }, [start, value])
  const handleChange = (type, value) => {

    if (rangeType === 'Number' && value !== '') {
      if (initProps.min !== undefined && initProps.min > value) {
        value = initProps.min
      }

      if (initProps.precision !== undefined) {
        value = cutOutDecimals(value, initProps.precision)
      }
    }

    if (type === 'start') {
      startChange(value)
      onChange && onChange([value, end])
    } else {
      endChange(value)
      onChange && onChange([start, value])
    }
  }
  return (
    <InputGroup className={styles['input-range']}>
      <Input
        type={rangeType || 'number'}
        className="input-item"
        style={{ borderRight: 'none' }}
        placeholder={placeholder[0]}
        value={start}
        onChange={e => {
          handleChange('start', e.target.value)
        }}
      />
      <Input className="divider" placeholder="~" disabled />
      <Input
        type={rangeType || 'number'}
        className="input-item"
        style={{ borderLeft: 'none' }}
        placeholder={placeholder[1]}
        value={end}
        onChange={e => {
          handleChange('end', e.target.value)
        }}
      />
    </InputGroup>
  )
}

export default InputRange
