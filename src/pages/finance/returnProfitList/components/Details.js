import React, { PureComponent, useState, useEffect } from 'react'
import { Drawer, Table } from 'antd'
import _ from 'lodash'
import { looseEqual } from 'utils'
import { detailColumns } from '../components/fields'

export default function ({ visible, params = {}, onCancel }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params && Object.values(params).every(el => el)) {
      setLoading(true)
      $api.finance.getRebateDetail(params).then((data) => {
        const list = data && data.data
        setList(list || [])
      }).then(_ => {
        setLoading(false)
      }).catch(_ => {
        setLoading(false)
      })
    }
  }, [params])

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return (
    <Drawer
      title="返利明细"
      visible={visible}
      onClose={handleCancel}
      placement="right"
      width="1000"
    >
      <Table
        columns={detailColumns}
        dataSource={list}
        pagination={false}
        loading={loading}
      />
    </Drawer>
  )
}