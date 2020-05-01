import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, TabsBar } from 'components'
import { tabsFields } from './components/fields'
import { PERMISSIONS_TABS } from './constants'
import Members from './components/members'
import Security from './components/security'
import styles from './index.less'

@connect(({ loading }) => ({ loading }))
class Permission extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: PERMISSIONS_TABS.MEMBERS
    }
  }

  onTabsChange = ({ value }) => {
    this.setState({
      tab: value,
    })
  }

  render() {
    const { tab } = this.state
    return (
      <Page inner className={styles.page}>
        <TabsBar
          defaultActiveKey={PERMISSIONS_TABS.MEMBERS}
          tabs={tabsFields}
          onChange={this.onTabsChange}
        />
        {
          tab === PERMISSIONS_TABS.MEMBERS ? (
            <Members />
          ) : (
              <Security />
            )
        }
      </Page>
    )
  }
}

export default Permission