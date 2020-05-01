import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Input, Table } from 'antd';
import moment from 'moment'
import styles from '../index.less'
import { FORMAT, WORK_STATUS } from '../../constants'

@Form.create()
class Records extends PureComponent {
  addRecord = () => {
    const { worksheet_code, getDetails, form } = this.props

    form.validateFields(async (err, values) => {
      if (err) {
        return
      }

      const { recordText = '' } = values

      $api.workorder.addRecord({ worksheet_code, worksheet_desc: recordText }, { success: true }).then(_ => {
        form.setFieldsValue({ recordText: '' })
        getDetails && getDetails()
      })
    })
  }

  renderAddRecord() {
    const { status = '', form } = this.props
    const { getFieldDecorator } = form

    if (status !== WORK_STATUS.PROGRESS) return null

    return (
      <div className="clearfix">
        <Form>
          <Form.Item>
            {
              getFieldDecorator('recordText', {
                rules: [
                  { required: true, message: '请输入' }
                ]
              })(
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} rows={4} style={{ resize: 'none' }} />
              )
            }
          </Form.Item>
        </Form>
        <Button type="primary" className="pull-right" onClick={this.addRecord}>新增</Button>
      </div>
    )
  }

  renderRecords() {
    const { records = [], status = '' } = this.props
    const tableClassName = (status === WORK_STATUS.PROGRESS) ? styles.recordsTable : styles.closedRecordsTable
    const columns = [
      {
        title: '时间',
        key: 'created_at',
        dataIndex: 'created_at',
        width: 180,
        render: (text) => {
          return <span>{text && moment(text).format(FORMAT)}</span>
        }
      },
      {
        title: '操作人账户',
        key: 'operation_member_name',
        dataIndex: 'operation_member_name',
        width: 120,
      },
      {
        title: '工单记录',
        key: 'action_desc',
        dataIndex: 'action_desc',
      },
      {
        title: '工单说明',
        key: 'worksheet_desc',
        dataIndex: 'worksheet_desc',
        width: 200,
      }
    ]

    return (
      <Table
        dataSource={records}
        columns={columns}
        pagination={false}
        className={tableClassName}
        scroll={{ y: 'calc(100vh - 533px)' }}
        style={{ marginTop: 10 }}
      />)
  }

  render() {
    return (
      <Card style={{ marginLeft: '20px' }}
        className={styles.card}
        title="工单记录"
      >
        {this.renderAddRecord()}
        {this.renderRecords()}
      </Card>
    )
  }
}

export default Records