import React from 'react'
import { connect } from 'dva'
import { Modal, Table } from 'antd'
import { commonTable } from './fields'

@connect(({ orderDetail, loading }) => ({ orderDetail, loading }))
class FinanceInfo extends React.PureComponent {
  state = {
    list: [],
  }
  getList() {
    console.log(this.props)
    const { type } = this.props
    switch (type) {
      case 'receiveAddress':
        break
      case 'rechargeRecord':
        break
      case 'withdrawRecord':
        break
      case 'payRecord':
        break
    }
    return []
  }
  render() {

    const { list } = this.state
    const { type, hideTable } = this.props
    const opts = commonTable[type] || {}
    const tableProps = {
      rowKey: (record, index) => index,
      dataSource: list,
      columns: opts.columns || [],
      pagination: false,
    }
    const modalOpts = {
      title: opts.title,
      width: opts.width,
      visible: type ? true : false,
      footer: null,
      onCancel: hideTable,
    }
    return (
      <Modal {...modalOpts}>
        <Table {...tableProps} />
      </Modal>
    )
  }
}

export default FinanceInfo
