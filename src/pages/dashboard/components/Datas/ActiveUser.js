import React, { PureComponent } from 'react'
import { QuestionCircleFilled } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { IconFont } from 'components'
import styles from '../../index.less'
const PERCENT = '32.6%'

class ActiveUser extends PureComponent {
  renderTop() {
    return (
      <Row className={`${styles.chartTop} dpflex`}>
        <Col span={18}>
          <span className={styles.chartTitle}>今日活跃用户</span>
          <QuestionCircleFilled style={{ color: '#B3BBBF' }} />
          <span className={`${styles.chartNum} ${styles.colorDark}`}>786</span>
        </Col>
        <Col span={6}>
          <div className={styles.chartIcon}>
            <IconFont type="iconhuoyueyonghu" />
          </div>
        </Col>
      </Row>
    );
  }

  renderProgress() {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', width: `${PERCENT}`, backgroundColor: '#12c3c5', top: '0', height: 10, left: 0 }}></div>
        <div style={{ height: 10, backgroundColor: '#cff6f2' }}></div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.activeUser}>
        {this.renderTop()}
        <div className={`${styles.content} dpflex`}>
          <div className={`${styles.percent} dpflex`}>
            <span>今日活跃率:&nbsp;&nbsp;<strong>{PERCENT}</strong></span>
            <span>累计用户:&nbsp;&nbsp;<strong>2560</strong></span>
          </div>
          {this.renderProgress()}
        </div>
      </div>
    )
  }
}

export default ActiveUser