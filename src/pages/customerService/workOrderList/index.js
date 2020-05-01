import _ from 'lodash'
import moment from 'moment'
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { CommonTable, Page, TabsBar } from 'components'
import { searchFields, getColumns, tabsFields } from './components/fields'
import { WORK_STATUS, hasBtn } from '../constants'

import OrderInfo from '@/pages/customerService/workOrderDetail/components/OrderInfo'
import Transfer from '@/pages/customerService/workOrderDetail/components/Transfer'
import AfterSale from '@/pages/order/components/AfterSaleOrder'
import styles from './index'

@connect(({ workOrderList, loading }) => ({ workOrderList, loading }))
class WorkOrderList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      afterSaleModal: false,
      orderInfoModal: false,
      afterModal: false,
      worksheet_codes: '',
      order: null,
    }
  }

  getTabs = () => {
    const { workOrderList } = this.props
    const { tabsCount = {} } = workOrderList
    let tabs = _.cloneDeep(tabsFields)

    tabs.forEach((tab) => {
      const count = (tabsCount && tabsCount[tab.value]) || 0
      tab.title = `${tab.title}(${count})`
    })

    return tabs
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `workOrderList/getList`,
      payload,
    })
  }

  toggleTransferModal = (worksheet_codes = '') => {
    this.setState((prevState) => ({
      afterModal: !prevState.afterModal,
      worksheet_codes,
    }))
  }

  onTabsChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch({ type: 'workOrderList/getTabsCount' })
    dispatch({ type: 'workOrderList/updateState', payload: { status: value } })
    dispatch({ type: 'workOrderList/getList', payload: { page: 1 } })
  }

  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `workOrderList/onSearch`, payload: query })
    dispatch({ type: `workOrderList/getList`, payload: query })
  }

  onDisabled = (row) => {
    return row.status === WORK_STATUS.CLOSED
  }

  onTransfer = (worksheet_codes) => {
    this.toggleTransferModal(worksheet_codes)
  }

  onClose = (worksheet_codes) => {
    Modal.confirm({
      title: '确认关闭所选工单么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.workorder.close({ worksheet_codes }, { success: true }).then(_ => {
          this.getList()
        })
      },
    })
  }

  onCloseDrawer = (modal) => {
    this.setState({
      [modal]: false,
      // order: null,
    })
  }

  onViewDetail = (row) => {
    const { code = '', im_conversation_key: key = '' } = row
    const { history } = this.props
    history.push({
      pathname: `/customerService/workOrderDetail`,
      query: { code, key }
    })
  }

  onViewAfterSale = (search_sn = '', uid = '') => {
    uid && $api.customerService.afterSaleList({ search_sn, uid }).then(({ data }) => {
      const order = data && data[0]
      this.setState({
        afterSaleModal: true,
        order,
      })
    })
  }

  onViewOrderInfo = (order_sn = '', uid = '') => {
    uid && $api.customerService.orderDetail({ order_sn, uid }).then(({ data }) => {
      this.setState({
        orderInfoModal: true,
        order: data,
      })
    })
  }

  mutipulClick = (key, keys = [], field, rows = []) => {
    const worksheet_codes = rows && rows.map((row) => {
      return row.code
    })
    switch (key) {
      case 'transfer':
        this.onTransfer(worksheet_codes)
        break;
      case 'close':
        this.onClose(worksheet_codes)
        break;
    }
  }

  render() {
    const { afterSaleModal, orderInfoModal, afterModal, worksheet_codes, order } = this.state
    const { workOrderList, loading } = this.props
    const { list = [], pagination, status, query } = workOrderList

    const searchProp = {
      search: query,
    }

    const exportProps = {
      type: 'export',
      url: '',
      query,
    }

    const mutipulBtns = [
      {
        name: '批量转移',
        key: 'transfer',
        permission: hasBtn('transfer'),
      },
      {
        name: '批量关闭',
        key: 'close',
        permission: hasBtn('close'),
      }
    ].filter(el => el.permission)
    return (
      <Page inner className={styles.workList}>
        <TabsBar
          defaultActiveKey={status}
          tabs={this.getTabs()}
          onChange={this.onTabsChange}
          btns={[exportProps]}
        />
        <CommonTable
          dataSource={list}
          getList={this.getList}
          onSearch={this.onSearch}
          pagination={pagination}
          loading={loading.effects[`workOrderList/getList`]}
          searchFields={searchFields}
          columns={getColumns.call(this)}
          searchProp={searchProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          onDisabled={this.onDisabled} />
        <AfterSale
          onCancel={() => { this.onCloseDrawer('afterSaleModal') }}
          modalVisible={afterSaleModal}
          order={order} />
        <OrderInfo
          onCancel={() => { this.onCloseDrawer('orderInfoModal') }}
          modalVisible={orderInfoModal}
          order={order} />
        <Transfer
          visible={afterModal}
          onCancel={this.toggleTransferModal}
          onOk={() => { this.getList(); this.toggleTransferModal() }}
          worksheet_codes={worksheet_codes} />
      </Page>
    )
  }
}

export default WorkOrderList