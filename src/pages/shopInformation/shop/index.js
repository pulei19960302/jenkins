import React, { PureComponent } from 'react'
import moment from 'moment'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Select, Radio, TimePicker, Card, message } from 'antd';
import { UploadImg, ChooseAddress, Editor } from 'components'

import styles from './index.less'
import BraftEditor from 'braft-editor'


const { Option } = Select

const radioGroupOptions = [
  { label: '全天', value: '1' },
  { label: '非全天', value: '0' }

]

class ShopInformationComponent extends React.Component {

  state = {
    showTimeLine: false,
  }

  componentDidMount() {
    this.props && this.props.onRef('shop', this)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.about_us === undefined) {
      return false
    }
    return true
  }

  showTimeLine = (e) => {
    this.setState({
      showTimeLine: e.target.value !== '1',
    })
  }

  handleUploadImgChange = (e) => {
    const { setFieldsValue } = this.props.form
    setFieldsValue({ logo: e && e.length > 0 && e[0] || '' })
  }

  handleEditChange = (e) => {
    const { setFieldsValue } = this.props.form
    setFieldsValue({ about_us: e })
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.business_on === '0' && (!values.business_start || !values.business_end)) {
          message.error('请选择时间段')
          return
        }
        const { business_start, business_end } = values
        const requestBody = {
          ...values,
          about_us: values['about_us'].toHTML(),
          business_start: business_start ? business_start._i : null,
          business_end: business_end ? business_end._i : null,
          industry: '1',
          update_type: 1
        }

        // $api.system.saveCompanyBase(requestBody, { success: true }).then()
        $api.system.saveCompany(requestBody, { success: true }).then()

      }
    })
    this.props.toggleLoading(false)
  }


  checkAddress = (rule, value, cb) => {
    if (!!value.province_id) {
      return cb()
    }
    cb('请选择商户地址')
  }

  checkEdit = (rule, value, cb) => {
    if (value && !value.isEmpty()) {
      return cb()
    }
    cb('请输入')
  }

  render() {

    const { name, address, address_area, business_on, logo, text, business_start, business_end, about_us } = this.props
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }

    const bigFormItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    }

    const editorStyle = {
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.15)'
    }

    const editorProps = {
      controls: [
        'undo', 'redo', 'split',
        'indent', 'bold', 'italic', 'underline', 'strike-through',
        'remove-styles','split', 'list-ul',
        'list-ol', 'blockquote', 'link', 'hr', 'media', 'clear',
      ],
    }

    return (

      <Card title='店铺信息'>
        <Form layout="horizontal" {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="商户名称">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: '请输入名字',
                    },
                  ],
                })(<Input maxLength={6}/>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="商户地址">
                {getFieldDecorator('address_area', {
                  initialValue: {
                    city_id: address_area ? address_area.city_id : null,
                    district_id: address_area ? address_area.district_id : null,
                    province_id: address_area ? address_area.province_id : null,
                  },
                  rules: [{ required: true, validator: this.checkAddress }],
                })(
                  <ChooseAddress placeholder="请选择地址"/>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="详细地址">
                {
                  getFieldDecorator('address', {
                    initialValue: address,
                    rules: [{ required: true, message: '请输入商户详细地址' }],
                  })(
                    <Input placeholder="请输入详细地址"/>,
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="营业时间">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {getFieldDecorator('business_on', {
                    initialValue: String(business_on),
                    rules: [{ required: true, message: '请选择时间段' }],
                  })(
                    <Radio.Group onChange={this.showTimeLine} options={radioGroupOptions}/>,
                  )}
                  {this.state.showTimeLine &&
                  <div>
                    {
                      getFieldDecorator('business_start', {
                        initialValue: business_start ? moment(business_start, 'HH:mm:ss') : null,
                      })(<TimePicker/>)
                    }
                    ~
                    {
                      getFieldDecorator('business_end', {
                        initialValue: business_end ? moment(business_end, 'HH:mm:ss') : null,
                      })(<TimePicker/>)
                    }
                  </div>
                  }
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="商户Logo">
                <div style={{ display: 'flex' }}>
                  {getFieldDecorator('logo', {
                    initialValue: logo,
                    rules: [{ required: true, message: '请上传图片' }],
                  })(
                    <UploadImg fileTotalCount={1} desc="上传" dataChange={this.handleUploadImgChange} pic={logo}/>,
                  )}
                  <div className={styles.desc}>
                    <span>1.格式：图片仅支持JPG,PNG格式</span>
                    <br/>
                    <span>2.大小：建议1M以内</span>
                  </div>
                </div>

              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="用户简介">
                {getFieldDecorator('text', {
                  initialValue: text,
                  rules: [{ required: true, message: '请输入用户简介' }],
                })(
                  <Input.TextArea maxLength={500} autoSize={{ minRows: 4, maxRows: 8 }}/>,
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item {...bigFormItemLayout} label="关于我们">
                {
                  getFieldDecorator('about_us', {
                    initialValue: BraftEditor.createEditorState(about_us),
                    valuePropName: 'editorState',
                    rules: [{ required: true, validator: this.checkEdit }],
                  })(
                    <Editor onChange={this.handleEditChange} style={editorStyle} editorProps={editorProps}/>,
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ShopInformationComponent)
