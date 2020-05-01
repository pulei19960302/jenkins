import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Select } from 'antd';
const FormItem = Form.Item

const { Option } = Select

@Form.create()
@connect(({ loading }) => ({ loading }))
class UserType extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      userTypes:[],
      loading:false
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userTypeData !== nextProps.userTypeData) {
      const { userTypes } = this.state
      if(userTypes.length===0){
          $api.user.userLevelList({},{cache:true}).then(res=>{
              if(!res || !res.data || !res.data.items)return
            this.setState({
                userTypes:res.data.items.map(it=>({name:it.name,value:it.id}))
            })
          })
      }
      const { id,member_type_id } = nextProps.userTypeData
      const { form } = this.props
      form.resetFields()
      this.setState({
        id,
      })
      if(member_type_id){
        form.setFieldsValue({
            type_id:member_type_id
          })
      }
      
    }
  }
  toogleLoading=(loading)=>{
    this.setState({
        loading
    })
  }
  handleCancel = () => {
    this.props.toogle(false)
  }
  handleOk = () => {
    const { form } = this.props
    const { id:member_id_str } = this.state
    form.validateFields(async (err,values)=>{
        await $api.user.userChangeType({member_id_str:String(member_id_str),...values},{success:true,loadingFn:this.toogleLoading})
        this.props.toogle(false)
        this.props.getList()
    })
  }
  render() {
    const { visible, form } = this.props
    const { getFieldDecorator } = form
    const { userTypes,loading } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Modal
        title="修改类型"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
      >
        <Form {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('type_id', {
              rules: [
                {
                  required: true,
                  message: '请填写用户类型',
                },
              ],
            })(
              <Select placeholder="请选择用户类型">
              {
                userTypes.map(it=><Option key={it.value} value={it.value}>{it.name}</Option>)
              }
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default UserType
