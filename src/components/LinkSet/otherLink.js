import React,{useState} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import { ENUMS } from './fields';

const { Search } = Input

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
  }

const OtherLinkFn = function({linkType,linkParams,onCheck,form}){
    const [value,setValue] = useState(linkType===ENUMS[8]?linkParams:'')
    const [sure,setSure] = useState(false)
    const { getFieldDecorator } = form
    const submit=()=>{
        form.validateFields((err)=>{
            if(err)return
            setSure(true)
            onCheck(value,ENUMS[8],'外部链接')
        })
    }
    return (
        <div>
            <Form {...formItemLayout}>
                <Form.Item label="网址">
                    {
                        getFieldDecorator('url',{
                            initialValue:value,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写url地址',
                                },
                            ],
                        })(<Search 
                            onSearch={submit} 
                            enterButton={`${sure?'已确认':'确认'}`} 
                            onChange={(e)=>{
                                setSure(false)
                                setValue(e.target.value)
                            }} 
                            placeholder="请输入url地址" />
                        )
                    }
                </Form.Item>
            </Form>
        </div>
    )
}

export default Form.create()(OtherLinkFn)