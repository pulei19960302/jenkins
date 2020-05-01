import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, InputNumber, Input } from 'antd';

const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}

@Form.create()
class UserUpIntergral extends PureComponent{
    state = {
        loading:false
    }
    handleOk = ()=>{
        const { form } = this.props
        form.validateFields(async (err,values)=>{
            if(err)return
            await $api.user.userUpIntergral({
                member_ids:this.props.uid,
                ...values
            },{success:true,loadingFn:this.toogleLoading},)
    
            this.props.toogle(false)
            this.props.fresh()
        })
    }
    handleCancel = ()=>{
        this.props.toogle(false)
    }
    toogleLoading=(loading)=>{
        this.setState({
            loading
        })
    }
    render(){
        const { visible,form } = this.props
        const { getFieldDecorator } = form
        const { loading } = this.state
        return (
            <Modal
                title="调整积分"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                destroyOnClose
            >
                <Form {...formItemLayout}>
                    <FormItem label="加扣积分">
                        {
                            getFieldDecorator('integral',{
                                rules: [
                                    {
                                    required: true,
                                    message: '请填写增加或减少积分数量',
                                    },
                                ],
                            })(
                                <InputNumber style={{width:'100%'}} placeholder="请填写增加或减少积分"></InputNumber>
                            )
                        }
                    </FormItem>
                    <FormItem label="备注">
                    {
                        getFieldDecorator('remark')(
                            <Input.TextArea></Input.TextArea>
                        )
                    }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default UserUpIntergral