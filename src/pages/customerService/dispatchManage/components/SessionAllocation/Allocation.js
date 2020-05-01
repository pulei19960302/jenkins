import React, { PureComponent } from 'react'
import { Card, InputNumber, Radio } from 'antd'
import { cutOutDecimals } from 'utils'
import styles from '../../index.less'

class Allocation extends PureComponent {
  renderBody() {
    const { form: { getFieldDecorator } } = this.props

    return (
      <div>
        <div className={`${styles.max} ${styles.items}`}>
          <span className={styles.label}>客服接待上线&nbsp;:&nbsp;</span>
          {
            getFieldDecorator('num')(
              <InputNumber
                formatter={value => cutOutDecimals(value)}
                min={1}
                max={999}
                placeholder="请输入1-999之间的整数" />
            )
          }
        </div>

        <div className={styles.items}>
          <span className={styles.label}>分配优先级&nbsp;:&nbsp;</span>
          <span>业务组分配规则&nbsp;&gt;&nbsp;轮流平均分配&nbsp;&gt;&nbsp;低负荷优先分配</span>
        </div>

        <div className={`${styles.items} ${styles.mode} dpflex`}>
          <span className={styles.label}>客服分配模式&nbsp;:&nbsp;</span>
          {
            getFieldDecorator('mode', {
              initialValue: 1,
            })(
              <Radio.Group name="mode">
                <Radio value={1}>
                  轮流平均分配：当有多个客服在线时，轮流分配会话，保障客服间的接待总数平均
						    </Radio>
                <Radio value={2}>
                  低负荷分配：当有多个客服在线时，优先将会话分配给当前接待会话较少的人。如果当前接待的正好相同，则按轮流方式选择
						</Radio>
              </Radio.Group>
            )
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <Card title="分配模式">
        {this.renderBody()}
      </Card>
    )
  }
}

export default Allocation
