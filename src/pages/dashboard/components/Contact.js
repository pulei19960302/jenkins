import React, { PureComponent } from 'react'
import { IconFont } from 'components'
import styles from '../index.less'

class Contact extends PureComponent {
  render() {
    return (
      <div className={styles.contact}>
        {/* <IconFont type="iconservice" className={styles.icon}/> */}
        <div>
          <IconFont type="iconservice" className={styles.icon} />
          <span className={styles.title}>联系客服</span>
        </div>
        <span>电话&nbsp;:&nbsp;&nbsp;028-85286893</span>
        <br />
        <span className={styles.email}>邮箱&nbsp;:&nbsp;help@hehewin.com</span>
      </div>
    )
  }
}

export default Contact