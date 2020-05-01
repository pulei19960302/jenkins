import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, TabsBar } from 'components'
import { DISPATCH_TABS } from '../constants'
import { tabsFields } from './components/fields'
import Business from './components/Business'
import SessionAllocation from './components/SessionAllocation'

@connect(({ dispatchManage, loading }) => ({ dispatchManage, loading }))
class DispatchManage extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			tab: DISPATCH_TABS.BUSINESS
		}
	}

	onTabsChange = ({ value }) => {
		this.setState({
			tab: value,
		})
	}

	renderContents() {
		const { tab } = this.state
		const { dispatchManage = {}, loading = {}, dispatch = {} } = this.props
		switch (tab) {
			case DISPATCH_TABS.BUSINESS:
				return <Business
					dispatchManage={dispatchManage}
					loading={loading}
					dispatch={dispatch} />
			case DISPATCH_TABS.CONVERSATION:
				return <SessionAllocation />
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

export default DispatchManage