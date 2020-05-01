import React, { PureComponent } from 'react'
import { Page } from 'components'
import {
  Datas,
  Helper,
  Feature,
  Versions,
  Notice,
  Guide,
  Contact,
} from './components'
import styles from './index.less'

class Dashboard extends PureComponent {
  render() {
    return (
      <Page className={`${styles.dashboard} dpflex`}>
        <div className={`${styles.left} dpflex`}>
          <Datas />
          <Helper />
          <Feature />
        </div>
        <div className={`${styles.right} dpflex`}>
          <Versions />
          <Notice />
          <Guide />
          <Contact />
        </div>
      </Page>
    )
  }
}

export default Dashboard