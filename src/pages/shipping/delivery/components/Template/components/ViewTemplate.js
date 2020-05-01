import React, { PureComponent } from 'react'
import { Drawer, Row, Col, Table } from 'antd'
import { getTableRowClassName } from 'utils'
import { VALUATION_WAY, VALUATION_FIELDS } from '../../../../constants'
import { getViewTemplateFields } from './fields'
import styles from '../index.less'

class ViewTemplate extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { visible: oldVisible } = this.props
    const { visible, id } = nextProps
    if (!oldVisible && visible) {
      id && this.getDetails(id)
    }
  }

  getDetails = (id) => {
    $api.shipping.templateDetails({ id }).then(data => {
      const { data: details = {} } = data
      this.setState({ details })
    })
  }

  handleClose = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  renderInfos = () => {
    const { details = {} } = this.state
    const { name = '', type = '' } = details

    return (
      <div className={styles.infos}>
        <Row type="flex">
          <Col><strong>模板名称&nbsp;:&nbsp;</strong></Col>
          <Col>{name}</Col>
        </Row>
        <Row type="flex">
          <Col><strong>寄件方式&nbsp;:&nbsp;</strong></Col>
          <Col>{VALUATION_FIELDS[type]}</Col>
        </Row>
      </div>
    )
  }

  renderRegions = () => {
    const { areasList = [] } = this.props
    const { details = {} } = this.state
    const { transports = [], type = '' } = details
    const unit = type === VALUATION_WAY.NUMBER ? '件' : '重量 (kg)'
    return (
      <div className={`${styles.regions} ${styles.view}`}>
        <div className={styles.title}>
          <strong>区域及运费设置:</strong>
        </div>
        <Table
          columns={getViewTemplateFields.call(this, areasList, unit)}
          bordered={true}
          pagination={false}
          dataSource={transports}
          scroll={{ y: 'calc(100vh - 350px)' }}
          rowKey={(record, index) => index}
          rowClassName={getTableRowClassName}
        >
        </Table>
      </div >
    )
  }

  render() {
    const { visible } = this.props

    return (
      <Drawer
        title="运费模板"
        visible={visible}
        placement="right"
        width="1000"
        headerStyle={{ background: '#f5f5f5' }}
        maskClosable={false}
        destroyOnClose={true}
        onClose={this.handleClose}
      >
        {this.renderInfos()}
        {this.renderRegions()}
      </Drawer>
    )
  }
}

export default ViewTemplate