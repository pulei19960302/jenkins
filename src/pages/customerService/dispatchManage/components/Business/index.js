import React, { PureComponent } from 'react'
import { CommonTable } from 'components'
import { Button, Modal } from 'antd'
import { getColumns, searchFields } from '../fields'
import ViewBusiness from './ViewBusiness'
import UpdateBusiness from './UpdateBusiness'
import styles from '../../index.less'

class Business extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			viewDrawer: false,
			updateDrawer: false,
			details: {}, //details 数据，要么，直接存放在row 里面，要么，根据id，再去请求后台。
		}
	}

	toggleViewDrawer = () => {
		this.setState((prevState) => ({
			viewDrawer: !prevState.viewDrawer
		}))
	}

	toggleUpdateDrawer = () => {
		this.setState((prevState) => ({
			updateDrawer: !prevState.updateDrawer
		}))
	}

	//批量操作
	handleMutipulClick = (key, itemKeys) => {
		//批量操启用和禁用时： 是否需要判断： 已存在启用或已存在禁用 的item
		//但是commontable中，如果选择内容不变，启用或禁用后，rows并未发生改变。
	}

	handleMoreClick = (key, row) => {
		switch (key) {
			case 'edit':
				this.handleEdit(row)
				break;
			case 'delete':
				this.handleDelete(row)
				break;
		}
	}

	handleView = (row) => {
		this.toggleViewDrawer()
		this.setState({
			details: row
		})
	}

	handleEnable = (row) => {
		//后台接口
	}

	handleDisable = (row) => {
		//后台接口
	}

	handleEdit = (row) => {
		this.toggleUpdateDrawer()
		this.setState({
			details: row
		})
	}

	handleDelete = (row) => {
		Modal.confirm({
			title: '确认删除么？',
			okText: '确定',
			cancelText: '取消',
			onOk: () => { }
		})
	}

	onSearch = (payload) => {
		const { dispatch } = this.props
		dispatch({ type: 'dispatchManage/onSearch', payload, })
		dispatch({ type: 'dispatchManage/getList', payload, })
	}

	getList = (payload) => {
		const { dispatch } = this.props
		dispatch({ type: 'dispatchManage/getList', payload, })
	}
	render() {
		const { viewDrawer, updateDrawer, details } = this.state
		const { dispatchManage, loading } = this.props
		const { list = [], pagination, query, serviceList } = dispatchManage
		//serviceList 需要请求后台接口返回。
		const searchProp = {
			search: query
		}

		const btns = [
			{
				name: '添加业务组',
			},
		]

		const mutipulBtns = [
			{
				name: '批量启用',
				key: 'enable',
			},
			{
				name: '批量停用',
				key: 'disable',
			},
			{
				name: '批量删除',
				key: 'delete',
			}
		]

		return (
			<div>
				<Button type="primary"
					className={styles.btn}
					onClick={() => { this.toggleUpdateDrawer() }}
				>
					<span style={{ marginRight: '8px' }}>+</span>添加业务组
				</Button>
				<CommonTable
					dataSource={list}
					pagination={pagination}
					searchFields={searchFields}
					columns={getColumns.call(this)}
					loading={loading.effects['dispatchManage/getList']}
					onSearch={this.onSearch}
					getList={this.getList}
					searchProp={searchProp}
					mutipulBtns={mutipulBtns}
					mutipulClick={this.handleMutipulClick}
					btns={btns}
				/>
				<ViewBusiness
					visible={viewDrawer}
					details={details}
					onClose={this.toggleViewDrawer} />
				<UpdateBusiness
					visible={updateDrawer}
					details={details}
					serviceList={serviceList}
					onClose={this.toggleUpdateDrawer} />
			</div>
		)
	}
}

export default Business