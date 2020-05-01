import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Radio, DatePicker, Button } from 'antd';
const FormItem = Form.Item

@Form.create()
class AddGroup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        editGroupData:{},
        loading:false
    }
  }
  static getDerivedStateFromProps({editGroupData},{editGroupData:preEditGroupData}){
    if(editGroupData!==preEditGroupData){
        return {
            editGroupData
        }
    }
    return null
  }
  handleOk = () => {
    const { toogle, form, getList } = this.props
    const { editGroupData } = this.state
    form.validateFields(async err => {
      if (!err) {
        if(editGroupData.id){
            await $api.user.groupEdit(Object.assign(form.getFieldsValue(),{id:editGroupData.id}), { success: true ,loadingFn:this.toogleLoading})
        }else{
            await $api.user.groupAdd(form.getFieldsValue(), { success: true,loadingFn:this.toogleLoading })
        }
        toogle(false)
        getList({ page: 1 })
      }
    })
  }
  handleCancel = () => {
    const { toogle } = this.props
    toogle(false)
  }
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    const { form, visible } = this.props
    const { getFieldDecorator } = form
    const { loading,editGroupData } = this.state
    const simpleRule = { rules: [{ required: true, message: '请填写' }] }
    return (
      <Modal
        title="添加群组"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form {...formItemLayout}>
          <FormItem label="群组名称">
            {getFieldDecorator('name',{
                initialValue:editGroupData.name,
                ...simpleRule
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem label="群组描述">
            {getFieldDecorator('desc')(<Input.TextArea placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default AddGroup
