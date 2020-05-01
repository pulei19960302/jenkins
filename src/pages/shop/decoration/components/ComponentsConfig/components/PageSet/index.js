import React, { PureComponent } from 'react'
import { Faker } from '../../../fields'
import Block from '../Block'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import debounce from 'lodash/debounce'
import { UploadImg } from 'components'

const FormItem = Form.Item
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
const simpleRule = {
    rules: [
      {
        required: true,
        message: '请填写',
      },
    ],
  }

@Form.create()
class PageSet extends PureComponent{
    static component_id = Faker.component_id
    state = {
        content:{},
        id:null
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                content,
                id
            }
        }
        return null
    }
    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content } = this.state
        const { form } = this.props
        this.submit({
            ...content,
            ...form.getFieldsValue()
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    formChange=debounce(()=>{
        const { form } = this.props
        this.submit(form.getFieldsValue())
    },300)
    imgChange=(e)=>{
        const { content } = this.state
        this.setState({
            content:{
                ...content,
                share_img:e[0]
            }
        })
    }
    render(){
        const { content } = this.state
        const { name,share_title,share_content,share_img } = content
        const { form } = this.props
        const { getFieldDecorator } = form
        const { formChange,imgChange } = this
        return (
            <div>
                <Form {...formItemLayout}>
                    <Block title="基本设置">
                        <Form.Item label="页面标题">
                            {
                                getFieldDecorator('name',{
                                    initialValue:name,
                                    ...simpleRule
                                })(
                                    <Input placeholder="请输入页面标题" onChange={formChange} style={{flex:1}}></Input>
                                )
                            }
                        </Form.Item>
                    </Block>
                    <Block title="分享设置">
                        <Form.Item label="分享标题">
                            {
                                getFieldDecorator('share_title',{
                                    initialValue:share_title,
                                    ...simpleRule
                                })(
                                    <Input placeholder="请输入分享标题" style={{flex:1}}></Input>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="分享描述">
                            {
                                getFieldDecorator('share_content',{
                                    initialValue:share_content,
                                    ...simpleRule
                                })(
                                    <TextArea placeholder="请输入分享描述" style={{flex:1}}></TextArea>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="分享图" required>
                            <UploadImg fileTotalCount={1} dataChange={imgChange} pic={share_img}></UploadImg>
                        </Form.Item>
                    </Block>
                </Form>
            </div> 
        )
    }
}

export default PageSet