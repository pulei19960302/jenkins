import moment from 'moment'
import React, { PureComponent } from 'react'
import { ProfileTwoTone } from '@ant-design/icons';
import { Card, Descriptions, Button, Tooltip } from 'antd';
import { WORK_STATUS, ORDER_STATUS, hasBtn } from '../../constants'
import styles from '../index.less'

const format = 'YYYY-MM-DD HH:mm:ss'

class BaseInfo extends PureComponent {

  getBtns = () => {
    const { status = '' } = this.props.details
    const { onClose, toggleAddRelationModal, toggleTransferModal } = this.props

    if (status === WORK_STATUS.PROGRESS) {
      return (
        <div >
          {
            hasBtn('addRelation') && (
              <Button onClick={toggleAddRelationModal} className={styles.addRelation}>新增关联单据</Button>
            )
          }
          {
            hasBtn('transfer') && (
              <Button onClick={toggleTransferModal} className={styles.transfer}>转移工单</Button>
            )
          }
          {
            hasBtn('close') && (
              <Button onClick={onClose} className={styles.close}>关闭工单</Button>
            )
          }
        </div>
      )
    }
  }

  renderRelations = () => {
    const { relations = [], details = {}, onViewAfterSale, onViewOrderInfo } = this.props
    const { customer_member_id = '' } = details

    if (relations && relations.length) {

      const titles = relations.map((data) => {
        const { relation_sn_type, relation_sn } = data
        if (relation_sn_type === ORDER_STATUS.AFTERSALE) {
          return (
            <div>【售后工单】&nbsp;
              <a onClick={() => { onViewAfterSale && onViewAfterSale(relation_sn, customer_member_id) }}>
                {relation_sn}
              </a>
            </div>
          )
        }

        return (
          <div>【订单】&nbsp;
            <a onClick={() => { onViewOrderInfo && onViewOrderInfo(relation_sn, customer_member_id) }}>
              {relation_sn}
            </a>
          </div>
        )

      })

      return (
        <Descriptions.Item label="关联单据数量">
          <Tooltip title={titles} placement="bottomLeft" overlayStyle={{ backgroundColor: '#fff', zIndex: '100' }} className={styles.tooltip}>
            <span style={{ cursor: 'pointer', color: '#12C2C2' }}>{relations.length}</span>
          </Tooltip>
        </Descriptions.Item>
      )
    }
  }

  render() {
    const { details = {} } = this.props

    const {
      worksheet_code = '',
      status = '',
      created_at = '',
      customer_member_id = '',
      customer_member_name = '' } = details

    let statusText
    switch (status) {
      case WORK_STATUS.PROGRESS:
        statusText = '处理中'
        break;
      case WORK_STATUS.CLOSED:
        statusText = '已关闭'
        break;
      case WORK_STATUS.INVALID:
        statusText = '已失效'
        break;
    }

    return (
      <Card extra={this.getBtns()} title={
        <Descriptions >
          <Descriptions.Item className={styles.boldFonts}>
            <ProfileTwoTone style={{ fontSize: 22, verticalAlign: 'middle' }} />
            <span className={styles.boldFonts}>工单号：{worksheet_code}</span>
          </Descriptions.Item>
          <Descriptions.Item className={styles.boldFonts}>
            <span className={styles.boldFonts}>{statusText}</span>
          </Descriptions.Item>
          <Descriptions.Item className={styles.boldFonts}>
            <span className={styles.boldFonts}>{moment(created_at).format(format)}</span>
          </Descriptions.Item>
        </Descriptions>}>
        <Descriptions >
          <Descriptions.Item label="客户账号" >
            {customer_member_name}&nbsp;
              (&nbsp;id:&nbsp;{customer_member_id}&nbsp;)
          </Descriptions.Item>
          {this.renderRelations()}
        </Descriptions>
      </Card>
    );
  }
}

export default BaseInfo
