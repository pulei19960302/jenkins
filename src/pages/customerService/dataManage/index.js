import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, TabsBar } from 'components'
import { tabsFields } from './components/fields'
import { DATA_TABS } from '../constants'
import ConversationQuery from './components/ConversationQuery'

@connect(({ dataManage, loading }) => ({ dataManage, loading }))
class DataManage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: DATA_TABS.CONVERSATION,
    }
  }

  onTabsChange = ({ value }) => {
    this.setState({
      tab: value,
    })
  }

  renderContents() {
    const { tab } = this.state
    const { dataManage = {}, loading, dispatch } = this.props
    switch (tab) {
      case DATA_TABS.CONVERSATION:
        return <ConversationQuery {...dataManage} loading={loading} dispatch={dispatch} />
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

export default DataManage