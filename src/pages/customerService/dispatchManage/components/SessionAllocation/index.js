import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';
import Allocation from './Allocation'
import MessageSet from './MessageSet'
import styles from '../../index.less'

@Form.create()
class SessionAllocation extends PureComponent {
	handleSubmit = () => {
		const { form } = this.props
		form.validateFields((err, values) => {
			if (err) return null
		})
	}

	render() {
		const { form } = this.props
		return (
			<div className={styles.conversation}>
				<Allocation form={form} />
				<MessageSet form={form} />
				<div className={styles.submit}>
					<Button type="primary" onClick={this.handleSubmit}>提交</Button>
				</div>
			</div>
		)
	}
}

export default SessionAllocation