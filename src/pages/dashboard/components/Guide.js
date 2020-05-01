import React, { PureComponent } from 'react'
import { openWindowSafe } from 'utils'
import styles from '../index.less'

class Guide extends PureComponent {

  handleRoute = (url) => {
    openWindowSafe(url, true)
  }

  render() {
    return (
      <div className={styles.guide}>
        <div className={`${styles.title} dpflex`}>
          使用指南
        </div>
        <ul className='fs12'>
          
        </ul>
      </div>
    )
  }
}

export default Guide