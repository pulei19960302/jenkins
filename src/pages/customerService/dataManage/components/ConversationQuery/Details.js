import moment from 'moment'
import React, { PureComponent } from 'react'
import { Drawer, Row, Col, Divider, Spin } from 'antd'
import { LinesEllipsis } from 'components'
import { FORMAT } from '../../../constants'
import styles from '../../index.less'

class Details extends PureComponent {
  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  renderList() {
    const { list = [] } = this.props
    if (!list || !list.length) return null

    const result = list.map((el, index) => {
      const { created_at = '', person_name = '', content = '' } = el
      return (
        <div key={index}>
          <div>
            <span className={styles.time}>{created_at && moment(created_at).format(FORMAT)}</span>
            <span className={styles.name}>{person_name}</span>
          </div>
          <div className={styles.content}>{content}</div>
          <Divider />
        </div>
      )
    })

    return (
      <div className={styles.details}>
        {result}
      </div>
    )
  }

  renderTitle() {
    const { details = {} } = this.props
    const { customer = '', service = '', created_at = '' } = details

    return (
      <Row>
        <Col>
          <LinesEllipsis text={`客户账号 : ${customer}`} />
        </Col>
        <Col>
          <span>咨询时间&nbsp;:&nbsp;</span>
          <span>{created_at && moment(created_at).format(FORMAT)}</span>
        </Col>
        <Col>
          <LinesEllipsis text={`客服账号 : ${service}`} />
        </Col>
      </Row>
    )
  }

  render() {
    const { visible, loading } = this.props
    return (
      <Drawer
        title={this.renderTitle()}
        className={styles.details}
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        width={800}
        onClose={this.handleClose}
      >
        {
          loading && (
            <div className={styles.loading}>
              <Spin />
            </div>
          )
        }
        {this.renderList()}
      </Drawer>
    )
  }
}

export default Details