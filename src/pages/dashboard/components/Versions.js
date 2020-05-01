import moment from 'moment'
import React, { PureComponent } from 'react'
import { openWindowSafe } from 'utils'
import styles from '../index.less'

const FORMAT = 'YYYY-MM-DD HH:mm:ss'
class Versions extends PureComponent {

  handleRoute = (url) => {
    openWindowSafe(url, true)
  }

  render() {
    return (
      <div className={`${styles.vesions} fs12 ${styles.colorDark}`}>
        <div className={`${styles.title} mb5`}>
          版本信息
        </div>
        <div>
          <label className={styles.colorLight}>当前版本&nbsp;:&nbsp;</label>
          <span className={styles.versionNum}>
            <a onClick={() => { this.handleRoute('') }}>V1.0.0_beta</a>
          </span>
        </div>
        <div>
          <label className={styles.colorLight}>更新时间&nbsp;:&nbsp;</label>
          <span>{moment().format(FORMAT)}</span>
        </div>
        <div className={`dpflex ${styles.update}`}>
          <label className={styles.colorLight}>版本说明&nbsp;:&nbsp;</label>
          <span>公测版本是为了验证功能的可行性和用户的操作方便与否，是不完善的，有可能存在功能缺陷，或者Bug。</span>
        </div>
      </div>
    )
  }
}

export default Versions 