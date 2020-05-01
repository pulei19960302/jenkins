import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Drawer, Input } from 'antd';
import { DrawerFooter, FSwitch } from 'components'
import { BUSINESS_STATUS } from '../../../constants'
import ServiceList from '../../../components/ServiceList'

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 14 },
}

@Form.create()
class UpdateBusiness extends PureComponent {
	handleOk = () => {
		const { form, onClose } = this.props
		form.validateFields((err, values) => {
			if (err) return
			console.log(values)
			//新增。并更新list 列表。
			//判断details 里，是否有确切的ID，如果有，为编辑，否则，新增。
			onClose && onClose()
		})
	}

	handleClose = () => {
		const { onClose } = this.props
		onClose && onClose()
	}

	renderServiceList() {
		const { form, details = {} } = this.props
		const { getFieldDecorator } = form
		const { service_member_id = '' } = details

		return (
			<Form.Item label="接收人">
				{getFieldDecorator('service_member_id', {
					rules: [{
						required: true,
						message: '请选择接收人',
					}],
					initialValue: service_member_id,
				})(
					<ServiceList />
				)}
			</Form.Item>
		)
	}

	render() {
		const { form, visible, details = {} } = this.props
		const { getFieldDecorator } = form
		const { name = '', status = '' } = details

		return (
			<Drawer
				title="编辑/添加业务组"
				width={600}
				visible={visible}
				maskClosable={false}
				destroyOnClose={true}
				onClose={this.handleClose}
			>
				<Form {...formItemLayout}>
					<Form.Item label="业务组名称">
						{
							getFieldDecorator('name', {
								rules: [{ required: true, message: '请输入名称' }],
								initialValue: name,
							})(
								<Input autoComplete='off' />
							)
						}
					</Form.Item>
					{this.renderServiceList()}
					<Form.Item label="业务组状态">
						{
							getFieldDecorator('status', {
								rules: [{ required: true, }],
								initialValue: status || BUSINESS_STATUS.DISABLED,
							})(
								<FSwitch values={[BUSINESS_STATUS.ENABLED, BUSINESS_STATUS.DISABLED]} />
							)
						}
					</Form.Item>
				</Form>
				<DrawerFooter
					onOk={this.handleOk}
					onCancel={this.handleClose}
				/>
			</Drawer>
		)
	}
}

export default UpdateBusiness