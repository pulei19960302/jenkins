import moment from 'moment'
import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import Orders from './Orders'
import Sales from './Sales'
import AddedUser from './AddedUser'
import ActiveUser from './ActiveUser'
import logo from 'assets/images/overlay.png'
import styles from '../../index.less'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'
class Datas extends PureComponent {
  render() {
    return (
      <div className={styles.datas}>
        <div className={styles.overlay}>
          <img className={styles.img} src={logo} />
          <strong>开发中，敬请期待...</strong>
        </div>
        <div className={`${styles.title} ${styles.colorDark} dpflex`}>
          <div>
            <span className={`${styles.label} ${styles.colorDark}`}>实时概况</span>
            <span className={styles.colorLight}>
              更新时间&nbsp;:&nbsp;
            {moment().format(FORMAT)}
            </span>
          </div>
          <a>更多数据</a>
        </div>
        <Row gutter={16} className={`${styles.charts} ${styles.flex}`}>
          <Col span={12}>
            <Orders />
          </Col>
          <Col span={12}>
            <Sales />
          </Col>
          <Col span={12}>
            <AddedUser />
          </Col>
          <Col span={12}>
            <ActiveUser />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Datas