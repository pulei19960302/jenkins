import moment from 'moment'
import React, { PureComponent } from 'react'
import { openWindowSafe } from 'utils'
import styles from '../index.less'

const FORMAT = 'MM/DD'
class Notice extends PureComponent {

  handleRoute = (url) => {
    openWindowSafe(url, true)
  }

  render() {
    return (
      <div className={styles.notice}>
        <div className={`${styles.title} ${styles.colorDark} dpflex`}>
          产品公告
        </div>
        <ul className={`fs12 ${styles.colorDark}`}>
          {/* <li>
            <span>
              <a onClick={() => { this.handleRoute('http://saaswiki.topstore.cn/version1_0_0.html') }}>平台系统1.0内测版本发布</a>
            </span>
            <span className={styles.new}>
              new
            </span>
          </li> */}
        </ul>
      </div>
    )
  }
}

export default Notice