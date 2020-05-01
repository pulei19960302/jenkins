import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { tabsFields } from './components/fields'
import { Template, Express, Insurance } from './components'
import { Page, TabsBar } from 'components'
import { DELIVEY_TABS } from '../constants'

@connect(({ delivery, loading }) => ({ delivery, loading }))
class Delivery extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: DELIVEY_TABS.TEMPLATE,
    }
  }

  handleReset = () => {
    const { delivery = {}, dispatch } = this.props
    const { pagination = {} } = delivery
    const newDelivery = {
      list: [],
      pagination: {
        ...pagination,
        total: 0,
        current: 1,
      },
    }
    dispatch({ type: 'delivery/updateState', payload: newDelivery })
  }

  onTabsChange = ({ value }) => {
    this.setState({
      tab: value,
    })
    this.handleReset()
  }

  getTemplateList = () => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/getTemplateList' })
  }

  renderList() {
    const { delivery = {}, dispatch, loading } = this.props
    const { tab } = this.state
    switch (tab) {
      case DELIVEY_TABS.TEMPLATE:
        return (
          <Template
            delivery={delivery}
            dispatch={dispatch}
            loading={loading} />
        )

      case DELIVEY_TABS.EXPRESS:
        return (
          <Express
            delivery={delivery}
            dispatch={dispatch}
            loading={loading} />
        )

      case DELIVEY_TABS.INSURANCE:
        return (
          <Insurance
            delivery={delivery}
            dispatch={dispatch}
            loading={loading} />
        ) 
    }
  }

  render() {
    return (
      <div>
        <Page inner>
          <TabsBar
            defaultActiveKey='template'
            tabs={tabsFields}
            onChange={this.onTabsChange}
          />
          {this.renderList()}
        </Page>
      </div>
    )
  }
}

export default Delivery