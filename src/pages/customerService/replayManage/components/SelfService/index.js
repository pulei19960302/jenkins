import React, { PureComponent } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Row, Col, Input, Table } from 'antd';
import { Page, FSwitch } from 'components'
import { getResponseColumns } from '../fields'
import ResponseDrawer from './ResponseDrawer'
import styles from '../../index.less'

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
}

@Form.create()
class SelfService extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			titleModal: false,
			responseDrawer: false,
		}
	}

	toggleTitleModal = () => {
		this.setState((prevState) => ({
			titleModal: !prevState.titleModal
		}))
	}

	toggelResponseDrawer = () => {
		this.setState((prevState) => ({
			responseDrawer: !prevState.responseDrawer
		}))
	}

	toggleServiceSwitch = (checked) => {
		const { dispatch } = this.props
		dispatch({
			type: 'replyManage/toggleServiceSwitch',
			payload: { serviceSwitch: checked }
		})
	}

	handleDeleteResponse = (row) => {
		Modal.confirm({
			title: '确认删除么?',
			okText: '确定',
			cancelText: '取消',
			onOk: () => {
				// 请求后台api，并更新model 数据 
			},
		})
	}

	handleEditRespone = (row) => {
		// 如果 可以 从 responseList 直接获取详细信息 则不用发请求。 直接获取对应 信息传参
		// 如果获取不到 向 后台发送请求。更新model 下的details 
		this.toggelResponseDrawer()
	}

	handleUpdateTitle = () => {
		const { form, dispatch } = this.props

		form.validateFields(async (err, values) => {
			if (err) return
			const { title = '' } = values
			dispatch({
				type: 'replyManage/updateTitle',
				payload: { title }
			})
			this.toggleTitleModal()
		})
	}

	renderTitleModal() {
		const { titleModal } = this.state
		const { form: { getFieldDecorator }, title } = this.props
		return (
			<Modal
				title="新增/编辑标题"
				visible={titleModal}
				onCancel={this.toggleTitleModal}
				onOk={this.handleUpdateTitle}
				maskClosable={false}
				destroyOnClose={true}>
				<Form {...formItemLayout}>
					<Form.Item label="名称" type="flex">
						{getFieldDecorator('title', {
							rules: [{
								required: true,
								message: '请输入标题名称',
							}],
							initialValue: title,
						})(
							<Input placeholder="请输入标题名称" maxLength={20} />
						)}
					</Form.Item>
				</Form>
			</Modal>
		)
	}

	renderResponseDrawer() {
		const { responseDetails = {} } = this.props
		const { responseDrawer } = this.state
		return (
			<ResponseDrawer
				visible={responseDrawer}
				details={responseDetails}
				onClose={this.toggelResponseDrawer} />
		)
	}

	render() {
		const { serviceSwitch = false, title = '', responseList = [] } = this.props
		return (
            <Page>
				<Row type="flex" className={styles.mb16}>
					<Col span={3}>自助服务</Col>
					<Col>
						<FSwitch onChange={this.toggleServiceSwitch} value={serviceSwitch} />
					</Col>
				</Row>
				<Row type="flex" className={styles.mb16}>
					<Col span={3}>标题</Col>
					<Col>
						{
							title ? (<a onClick={this.toggleTitleModal}>{title}</a>)
								: (<a onClick={this.toggleTitleModal}>添加</a>)
						}
					</Col>
				</Row>
				<div className={styles.responseList}>
					<div className={styles.add} onClick={this.toggelResponseDrawer}>
						<PlusOutlined />
						新增
					</div>
					<Table
						dataSource={responseList}
						columns={getResponseColumns.call(this)}
						bordered={true}
						pagination={false}
					/>
				</div>
				{this.renderTitleModal()}
				{this.renderResponseDrawer()}
			</Page>
        );
	}
}

export default SelfService