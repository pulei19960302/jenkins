
import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, TabsBar } from 'components'
import { tabsFields } from './components/fields.js'
import SelfService from './components/SelfService'
import { MANAGE_TABS } from '../constants'

@connect(({ replyManage }) => ({ replyManage }))
class ReplyManage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: MANAGE_TABS.SELF_SERVICE,
    }
  }

  onTabsChange = ({ value }) => {
    this.setState({
      tab: value,
    })
  }

  renderContents() {
    const { tab } = this.state
    const { replyManage = {}, dispatch } = this.props
    switch (tab) {
      case MANAGE_TABS.SELF_SERVICE:
        return <SelfService {...replyManage} dispatch={dispatch} />
    }
  }

  render() {
    const { tab } = this.state
    return (
      <Page inner>
        <TabsBar
          defaultActiveKey={tab}
          tabs={tabsFields}
          onChange={this.onTabsChange}
        />
        {this.renderContents()}
      </Page>
    )
  }
}

export default ReplyManage