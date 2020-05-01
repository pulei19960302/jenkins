import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import styles from './index.less'

export default function ServiceList({ value, disabledIds, onChange }) {
  const [serviceList, setServiceList] = useState([])

  useEffect(() => {
    $api.workorder.getServiceList({}).then((data) => {
      const list = data && data.data
      setServiceList(list || [])
    })
  }, [])

  const handleChange = (value = '') => {
    onChange && onChange(value)
  }

  return (
    <Select style={{ width: 300 }} onChange={handleChange} value={value}>
      {
        serviceList && serviceList.map((item) => {
          const { username = '', id = '' } = item
          return (
            <Select.Option
              key={id}
              value={id}
              disabled={disabledIds && disabledIds.includes(id)}
            >
              {username}
            </Select.Option>
          )
        })
      }
    </Select>
  )
}