import moment from 'moment'
import { Divider } from 'antd'
import { TableDropDown } from 'components'
import { DISPATCH_TABS, BUSINESS_STATUS, FORMAT } from '../../constants'

export const tabsFields = [
	{
		title: '业务组管理',
		value: DISPATCH_TABS.BUSINESS,
		key: 'business',
	},
	{
		title: '会话分配',
		value: DISPATCH_TABS.CONVERSATION,
		key: 'conversation',
	},
]

export const searchFields = [
	{
		key: 'name',
		placeholder: '业务组名称',
	},
]

export const getColumns = function () {
	return [
		{
			title: '业务组ID',
			dataIndex: 'id',
		},
		{
			title: '业务组名称',
			dataIndex: 'name',
		},
		{
			title: '当前业务组客服数',
			dataIndex: 'num',
		},
		{
			title: '修改人账号',
			dataIndex: 'account',
		},
		{
			title: '修改时间',
			dataIndex: 'time',
			render: (text, row) => {
				return (
					<span>{text && moment(text).format(FORMAT)}</span>
				)
			},
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (text, row) => {
				const { status = '' } = row
				if (status === BUSINESS_STATUS.DISABLED) {
					return (
						<div>
							<a onClick={(row) => { this.handleView(row) }}>查看</a>
							<Divider type="vertical" />
							<a onClick={(row) => { this.handleEnable(row) }}>启用</a>
							<Divider type="vertical" />
							<TableDropDown items={[
								{
									label: '编辑',
									value: 'edit',
								},
								{
									label: '删除',
									value: 'delete'
								}
							]} row={row} itemClick={this.handleMoreClick} />
						</div>
					)
				} else if (status === BUSINESS_STATUS.ENABLED) {
					return (
						<div>
							<a onClick={(row) => { this.handleView(row) }}>查看</a>
							<Divider type="vertical" />
							<a onClick={(row) => { this.handleDisable(row) }}>停用</a>
						</div>
					)
				}
			},
		},
	]
}
