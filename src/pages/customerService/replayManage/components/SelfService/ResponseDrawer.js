import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Drawer, Radio } from 'antd';
import { UploadImg, DrawerFooter } from 'components'
import { RESPONSE_TYPE } from '../../../constants'
import styles from '../../index.less'

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 10 },
}
@Form.create()
class ResonseDrawer extends PureComponent {
	constructor(props) {
		super(props)
		const { details = {} } = this.props
		const { src = '' } = details
		this.state = {
			imgSrc: src || ''
		}
	}
	handleClose = () => {
		const { onClose } = this.props
		onClose && onClose()
	}

	handleImgChange = (img = []) => {
		const imgSrc = img && img[0]
		this.setState({
			imgSrc
		})
	}

	handleOk = () => {
		const { form } = this.props
		const { imgSrc } = this.state
		form.validateFields(async (err, values) => {
			if (err) return

			// 向后台发送请求
			// 1 新增请求
			// 2 编辑 请求
			console.log({ ...values, imgSrc })
		})
	}

	renderForm() {
		const { form, details = {} } = this.props
		const { imgSrc = '' } = this.state
		const { getFieldDecorator } = form
		const type = form.getFieldValue('type')

		return (
			<Form {...formItemLayout} className={styles.responseForm} autoComplete='off'>
				<Form.Item label="问题名称" type="flex">
					{
						getFieldDecorator('name', {
							rules: [{ required: true, }]
						})(
							<Input maxLength={10} autoComplete='off' />
						)
					}
				</Form.Item>
				<Form.Item label="回复内容" type="flex">
					{
						getFieldDecorator('type', {
							initialValue: RESPONSE_TYPE.TEXT,
						})(
							<Radio.Group name="type">
								<Radio value={RESPONSE_TYPE.TEXT}>文本</Radio>
								<Radio value={RESPONSE_TYPE.IMAGE_TEXT}>图文</Radio>
							</Radio.Group>
						)
					}
				</Form.Item>
				<Form.Item type="flex" className={styles.textarea}>
					<div >
						{
							getFieldDecorator('content', {
							})(
								<Input.TextArea />
							)
						}
					</div>
				</Form.Item>
				{
					type === RESPONSE_TYPE.IMAGE_TEXT && (
						<div className={styles.uploadImg}>
							<UploadImg
								fileTotalCount={1}
								dataChange={this.handleImgChange}
								desc='上传图片' />
						</div>
					)
				}
			</Form>
		)
	}

	render() {
		const { visible, editResponse = '' } = this.props
		const title = editResponse ? '编辑应答' : '新增应答'
		return (
			<Drawer
				title={title}
				width={600}
				visible={visible}
				onClose={this.handleClose}
				destroyOnClose={true}
				maskClosable={false}
			>
				{this.renderForm()}
				<DrawerFooter onOk={this.handleOk} onCancel={this.handleClose} />
			</Drawer>
		)
	}
}

export default ResonseDrawer