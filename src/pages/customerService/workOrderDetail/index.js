import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal, Row, Col, Spin } from 'antd'
import { Page } from 'components'
import BaseInfo from './components/BaseInfo'
import Conversation from './components/Conversation'
import Records from './components/Records'
import OrderInfo from './components/OrderInfo'
import AddRelation from './components/AddRelation'
import Transfer from './components/Transfer'
import AfterSale from '@/pages/order/components/AfterSaleOrder'
import Item from 'antd/lib/list/Item'

// import styles from './index.less'

@connect(({ workOrderDetail }) => ({ ...workOrderDetail }))
class WorkOrderDetail extends PureComponent {
  constructor(props) {
    super(props)

    const { code: worksheet_code = '', key: conversation_key = '' } = this.props.history.location.query
    this.state = {
      worksheet_code,
      conversation_key,
      afterSaleModal: false,
      orderInfoModal: false,
      order: null,
      addRelationModal: false,
      transferModal: false,
    }
  }

  componentDidMount() {
    this.getDetails()
    this.getRelations()
    this.getConversations()
  }

  getConversations = () => {
    const { dispatch } = this.props
    const { conversation_key, } = this.state
    conversation_key && dispatch({
      type: 'workOrderDetail/getConversations',
      payload: { conversation_key, page: 1, page_size: 20 }
    })
  }

  getDetails = () => {
    const { dispatch } = this.props
    const { worksheet_code } = this.state
    worksheet_code && dispatch({
      type: 'workOrderDetail/getDetails',
      payload: { worksheet_code }
    })
  }

  getRelations = () => {
    const { dispatch } = this.props
    const { worksheet_code } = this.state

    worksheet_code && dispatch({
      type: 'workOrderDetail/getRelations',
      payload: { worksheet_code }
    })
  }

  toggleAddRelationModal = () => {
    this.setState((prevState) => ({
      addRelationModal: !prevState.addRelationModal
    }))
  }

  toggleTransferModal = () => {
    this.setState((prevState) => ({
      transferModal: !prevState.transferModal
    }))
  }

  onClose = () => {
    const { worksheet_code } = this.state
    Modal.confirm({
      title: '确认关闭所选工单么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.workorder.close({ worksheet_codes: [worksheet_code] }, { success: true }).then(_ => {
          this.getDetails(worksheet_code)
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

  render() {
    const { details = {}, conversations = {}, relations = [], dispatch } = this.props
    const { records = [], status = '', customer_member_id = '' } = details
    const { conversation_key, order, afterSaleModal, orderInfoModal, worksheet_code, addRelationModal, transferModal } = this.state

    return (
      <Page className="workDetail" style={{ position: 'relative' }}>
        <BaseInfo
          details={details}
          relations={relations}
          worksheet_code={worksheet_code}
          onClose={this.onClose}
          onViewAfterSale={this.onViewAfterSale}
          onViewOrderInfo={this.onViewOrderInfo}
          toggleAddRelationModal={this.toggleAddRelationModal}
          toggleTransferModal={this.toggleTransferModal}
        />
        <Row>
          <Col span={10}>
            <Conversation
              conversations={conversations}
              dispatch={dispatch}
              conversation_key={conversation_key}
            />
          </Col>
          <Col span={14}>
            <Records
              records={records}
              worksheet_code={worksheet_code}
              status={status}
              getDetails={this.getDetails}
            />
          </Col>
        </Row>
        <AfterSale
          onCancel={() => { this.onCloseDrawer('afterSaleModal') }}
          modalVisible={afterSaleModal} order={order}
        />
        <OrderInfo
          onCancel={() => { this.onCloseDrawer('orderInfoModal') }}
          modalVisible={orderInfoModal}
          order={order}
        />
        <AddRelation
          worksheet_code={worksheet_code}
          customer_member_id={customer_member_id}
          visible={addRelationModal}
          onCancel={this.toggleAddRelationModal}
          onOk={() => { this.getRelations(); this.toggleAddRelationModal() }}
        />
        <Transfer
          visible={transferModal}
          onCancel={this.toggleTransferModal}
          onOk={() => { this.getRelations(); this.getDetails(); this.toggleTransferModal() }}
          worksheet_codes={[worksheet_code]}
        />
      </Page>
    )
  }
}

export default WorkOrderDetail