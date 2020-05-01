import React, { PureComponent } from 'react'
import { Row, Col, Drawer } from 'antd'
import { BUSINESS_STATUS } from '../../../constants'
import styles from '../../index.less'

class ViewBusiness extends PureComponent {
	render() {
		const { visible = false, details = {}, onClose } = this.props
		const { name = '', status = '' } = details
		return (
			<Drawer
				title="查看业务组"
				width={600}
				visible={visible}
				maskClosable={false}
				onClose={() => { onClose && onClose() }}
			>
				<div className={styles.viewBusiness}>
					<Row type="flex">
						<Col span={4}>业务组名称:</Col>
						<Col>{name}</Col>
					</Row>
					<Row type="flex">
						<Col span={4}>业务组客服:</Col>
						<Col></Col>
					</Row>
					<Row type="flex">
						<Col span={4}>业务组状态:</Col>
						<Col>
							{
								status === BUSINESS_STATUS.ENABLED ? '启用' : '禁用'
							}
						</Col>
					</Row>
				</div>
			</Drawer>
		)
	}
}

export default ViewBusiness