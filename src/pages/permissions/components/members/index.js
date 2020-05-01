import React, { PureComponent } from 'react'
import { Page } from 'components'
import Department from './component/department'
import MemberList from './component/memberList'
import styles from './index.less'

export default class Members extends PureComponent {

  render() {
    return (
      <Page className={styles.page}>
        <div className={styles.container}>
          {
            <div className="left">
              <Department />
            </div>
          }
          {
            <div className="right">
              <MemberList />
            </div>
          }
        </div>
      </Page>
    )
  }
}
