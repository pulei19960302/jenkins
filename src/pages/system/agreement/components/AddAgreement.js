import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Drawer, Input, Checkbox, Spin } from 'antd';
import BraftEditor from 'braft-editor'
import { Editor, FSwitch, DrawerFooter } from 'components'
import { AGREEMENT_STATUS } from '../../constants'
import styles from '../index.less'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
}
const editorProps = {
  controls: [
    'undo', 'redo', 'split',
    'indent', 'bold', 'italic', 'underline', 'strike-through',
    'remove-styles', 'split', 'list-ul',
    'list-ol', 'blockquote', 'link', 'hr', 'media', 'clear',
  ],
}
const channelOptions = [
  { label: '小程序', value: 'mini' },
  { label: '公众号', value: 'wechat' },
  // { label: 'App', value: 'app' },
]

const pageOptions = [
  { label: '登录注册页', value: '1' },
  { label: '账号设置页', value: '2' },
]
@Form.create()
class AddAgreement extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      details: '',
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { visible: oldVisible } = this.props
    const { visible, id = '' } = nextProps
    if (!oldVisible && visible) {
      this.getDetails(id)
    }
  }

  getDetails = (id = '') => {
    if (!id) return
    this.toggleLoading()
    $api.system.getAgreementInfo({ id }).then(res => {
      const { data: resData = {} } = res || {}
      const { data: details = {} } = resData
      const { title = '', data = '', show_channel = '', show_page = '', status = '' } = details
      this.toggleLoading()
      this.props.form.setFieldsValue({
        title,
        data: BraftEditor.createEditorState(data),
        show_channel: show_channel && show_channel.split(','),
        show_page: show_page && show_page.split(','),
        status,
      })
    }).catch(_ => {
      this.toggleLoading()
    })
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }))
  }

  handleCheckEditor = (rule, value, callback) => {
    if (value && !value.isEmpty()) {
      return callback()
    }
    callback('请输入')
  }

  handleChangeEditor = (value) => {
    const { form } = this.props
    form.setFieldsValue({ data: value })
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  handleOk = () => {
    const { form, onOk, id = '' } = this.props
    form.validateFields((err, values) => {
      if (err) return null
      const { data = '', ...other } = values
      const params = {
        data: data && data.toHTML(),
        ...other
      }

      this.toggleLoading()
      const res = id ? $api.system.updateAgreement({ id, ...params }) : $api.system.addAgreement({ ...params })
      res.then(_ => {
        this.toggleLoading()
        onOk && onOk()
      }).catch(_ => {
        this.toggleLoading()
      })
    })
  }

  renderForm() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form {...formItemLayout} labelAlign="left">
        <Form.Item label="协议名称">
          {
            getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入协议名称' }]
            })(
              <Input placeholder="请输入协议名称" maxLength={20} />
            )
          }
        </Form.Item>
        <Form.Item label="协议内容">
          <div className={styles.editor}>
            {
              getFieldDecorator('data', {
                valuePropName: 'editorState',
                rules: [{ required: true, validator: this.handleCheckEditor }],
              })(
                <Editor onChange={this.handleChangeEditor} editorProps={editorProps} />,
              )
            }
          </div>
        </Form.Item>
        <Form.Item label="显示终端">
          {getFieldDecorator('show_channel', {
            rules: [{ required: true, message: '请选择显示终端' }]
          })(
            <Checkbox.Group
              options={channelOptions}
            />
          )}
        </Form.Item>
        <Form.Item label="显示页面">
          {getFieldDecorator('show_page', {
            rules: [{ required: true, message: '请选择显示页面' }]
          })(
            <Checkbox.Group
              options={pageOptions}
            />
          )}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            initialValue: AGREEMENT_STATUS.DISABLED,
            rules: [{ required: true, }]
          })(
            <FSwitch />
          )}
        </Form.Item>
      </Form>
    )
  }

  render() {
    const { loading } = this.state
    const { visible, id } = this.props
    const title = id ? '编辑协议' : '新增协议'
    return (
      <div>
        <Drawer
          title={title}
          visible={visible}
          placement="right"
          width="1000"
          headerStyle={{ background: '#f5f5f5' }}
          maskClosable={false}
          destroyOnClose={true}
          onClose={this.handleClose}
        >
          {
            loading && (
              <div className={styles.spin}>
                <Spin />
              </div>
            )
          }
          {this.renderForm()}
          <DrawerFooter onOk={this.handleOk} onCancel={this.handleClose} />
        </Drawer>
      </div>
    )
  }
}

export default AddAgreement