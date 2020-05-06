import moment from 'moment'
import React, { PureComponent } from 'react'
import { openWindowSafe } from 'utils'
import { IconFont } from 'components'
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
          <a className='more'>更多</a>
        </div>
        <ul className={`fs12 ${styles.colorDark}`}>
          <li>
            <span>
              <a onClick={() => { this.handleRoute('') }}>平台系统1.0内测版本发布</a>
            </span>
            <span className={styles.new}>
              <IconFont type="iconNEW" style={{'fontSize': '39px'}}/>
            </span>
          </li>
        </ul>
      </div>
    )
  }
}

export default Notice