import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { UploadImg } from 'components'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, InputNumber } from 'antd';
const FormItem = Form.Item
const { TextArea } = Input

@Form.create()
@connect(({ loading }) => ({ loading }))
class BrandsEdit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editData: {},
      logoData: [],
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.editData !== nextProps.editData) {
      const { id, name, alias, logo, description, sort } = nextProps.editData
      this.props.form.setFieldsValue({
        id,
        name,
        alias,
        logo,
        description,
        sort,
      })
      if (logo) {
        this.setState({
          logoData: logo,
        })
      }else{
        this.setState({
          logoData: '',
        })
      }
    }
  }
  handleCancel = () => {
    this.props.toogle(false)
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.props.create(values)
    })
  }
  logoChange(result) {
    this.setState({
      logoData: result,
    })
    this.props.form.setFieldsValue({ logo: result[0], })
  }
  render() {
    const { visible, form, create } = this.props
    const { getFieldDecorator } = form
    const { logoData } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    const licenseProps = {
      pic: logoData,
      fileTotalCount: 1,
      dataChange: this.logoChange.bind(this),
    }
    return (
      <Modal
        title="品牌新增/编辑"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout}>
          <FormItem
            label="品牌名称"
            help="若同时含有中英文，建议按照中文（英文）的格式进行输入"
          >
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请填写品牌名称',
                },
              ],
            })(<Input placeholder="请输入品牌名称" maxLength={30} />)}
          </FormItem>

          <FormItem label="品牌别名">
            {getFieldDecorator('alias', {
              rules: [
                {
                  required: false,
                  message: '请填写品牌别名',
                },
              ],
            })(<Input placeholder="请输入品牌别名" maxLength={30}/>)}
          </FormItem>

          <FormItem label="品牌LOGO">
            {getFieldDecorator('logo', {
              rules: [
                {
                  required: true,
                  message: '请上传品牌LOGO',
                },
              ],
            })(<UploadImg {...licenseProps} />)}
          </FormItem>

          <FormItem label="品牌描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请填写品牌描述',
                },
              ],
            })(
              <TextArea
                // value={value}
                // onChange={this.onChange}
                placeholder="请输入品牌描述"
                autoSize={{ minRows: 4, maxRows: 10 }}
              />
            )}
          </FormItem>

          <FormItem label="排序">
            {getFieldDecorator('sort', {
              rules: [
                {
                  required: false,
                  message: '请填写品牌别名',
                },
              ],
            })(<InputNumber min={1} max={10} precision={0} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default BrandsEdit
