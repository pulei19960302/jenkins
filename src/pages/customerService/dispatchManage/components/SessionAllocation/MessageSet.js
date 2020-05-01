import React, { PureComponent } from 'react'
import { FSwitch } from 'components'
import { Card, Radio } from 'antd'
import { MESSAGE_SET_STATUS } from '../../../constants'
import ServiceList from '../../../components/ServiceList'
import styles from '../../index.less'

class MessageSet extends PureComponent {
  handleChangeSwitch = (checked) => {
    const { form } = this.props
    form.setFieldsValue({ 'switch': checked })
  }

  renderServiceList() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const type = form.getFieldValue('type')
    if (type === 1) return null

    return (
      <div className={styles.serviceList}>
        {getFieldDecorator('service_member_id')(
          <ServiceList />
        )}
      </div>
    )
  }

  renderBody() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const switchValue = form.getFieldValue('switch') || MESSAGE_SET_STATUS.ENABLED

    return (
      <div className={styles.messageSet}>
        <div className={`${styles.switch} dpflex`}>
          {
            getFieldDecorator('switch', {
              initialValue: MESSAGE_SET_STATUS.ENABLED,
            })(
              <FSwitch
                values={[MESSAGE_SET_STATUS.ENABLED, MESSAGE_SET_STATUS.DISABLED]}
                texts={['', '']}
                onChange={this.handleChangeSwitch}
                className='mr10'
              />
            )
          }
          <span>
            启用客服离线状态时的留言分配
          </span>
        </div>
        <div className='mt12'>
          {
            getFieldDecorator('type', {
              initialValue: 1,
            })(
              <Radio.Group name="type" className={styles.type}>
                <Radio value={1}>
                  {
                    switchValue !== MESSAGE_SET_STATUS.ENABLED ?
                      '轮流平均分配：将用户产生的留言平均分配至在线的客服队列'
                      : '轮流平均分配：将用户产生的留言平均分配至客服队列'
                  }
                </Radio>
                <Radio value={2}>
                  {
                    switchValue !== MESSAGE_SET_STATUS.ENABLED ?
                      '指定客服分配：将用户产生的留言分配至指定的在线客服队列'
                      : '指定客服分配：将用户产生的留言分配至指定的客服队列'
                  }
                </Radio>
              </Radio.Group>
            )
          }
        </div>
        {this.renderServiceList()}
      </div>
    )
  }

  render() {
    return (
      <Card title="留言设置">
        {this.renderBody()}
      </Card>
    )
  }
}

export default MessageSet