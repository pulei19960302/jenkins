import React, { PureComponent } from 'react'
import { IconFont } from 'components'
import styles from '../index.less'

class Contact extends PureComponent {
  render() {
    return (
      <div className={`${styles.contact} dpflex`}>
        <IconFont type="iconlianxikefu" className={styles.icon}/>
        <div>
          <span className={styles.title}>联系客服</span>
          {/* <br />
          <span>电话&nbsp;:&nbsp;&nbsp;028-6666888</span> */}
          <br />
          <span className={styles.email}>邮箱&nbsp;:&nbsp;</span>
        </div>

      </div>
    )
  }
}

export default Contact