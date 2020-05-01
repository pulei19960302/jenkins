import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, CommonTable, DrawerDetail } from 'components'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
import styles from '../index.less'

const MAXLENGTH = 100

class Notes extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      notes: this.props.notes || '',
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    if(nextprops.visible) {
      this.setState({
        notes: nextprops.notes
      })
    }
  }

  handleChangeNotes = (event) => {
    const { target = {} } = event
    const { value: notes = '' } = target
    this.setState({
      notes
    })
  }

  handleOk = () => {
    const { notes } = this.state
    const { onOk } = this.props
    onOk && onOk(notes)
  }

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  render() {
    const { visible } = this.props
    const { notes } = this.state
    const notesNums = notes ? (notes.length) : 0

    return (
      <Modal
        title="备注"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <div className={styles.notes}>
          <Input.TextArea rows={6} placeholder="请输入" maxLength={MAXLENGTH} onChange={this.handleChangeNotes} value={notes} />
          <span className={styles.nums}>{notesNums}/{MAXLENGTH}</span>
        </div>
      </Modal>
    )
  }
}

export default Notes