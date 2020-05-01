import React,{PureComponent,Fragment} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Input, Slider } from 'antd';
import Block from '../Block'
import { FSwitch } from 'components'
import debounce from 'lodash/debounce';
import LinkSetBtn from '@/components/LinkSet/btn'

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

const marks = {
  16: '16px',
  32: '32px',
  50: '50px',
};


@Form.create()
class InnerTitle extends PureComponent{
    static component_id = '6'
    state = {
        content:{},
        id:null,
        showEffectForm:false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                content,
                id,
                showEffectForm:content.link
            }
        }
        return null
    }
    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content,imgs } = this.state
        const { form } = this.props
        this.submit({
            ...content,
            ...form.getFieldsValue(),
            imgs
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

    linkSubmit=({linkParams,linkType,linkDesc})=>{
        this.setState({
            content:{
                ...this.state.content,
                linkParams,linkType,linkDesc
            }
        })
    }
    
    render(){
        const { content,showEffectForm } = this.state
        const { title,position,isBold,fontSize,link,linkText,linkParams,linkType,linkDesc } = content
        const { form } = this.props
        const { getFieldDecorator } = form
        const { formChange,linkSubmit } = this
        
        return(
            <div>
                <Form {...formItemLayout}>
                    <Block title="组件设置">
                        {/* <Subtitle title="标题名称">
                            {
                                getFieldDecorator('title',{
                                    initialValue:title
                                })(
                                    <Input style={{flex:1}}></Input>
                                )
                            }
                        </Subtitle> */}
                        <Form.Item label="标题名称">
                            {
                                getFieldDecorator('title',{
                                    initialValue:title,
                                    ...simpleRule
                                })(
                                    <Input onChange={formChange} style={{flex:1}}></Input>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="位置">
                            {
                                getFieldDecorator('position',{
                                    initialValue:position,
                                    ...simpleRule
                                })(
                                    <Radio.Group onChange={formChange}>
                                        <Radio value={'left'}>居左</Radio>
                                        <Radio value={'center'}>居中</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否加粗">
                            {
                                getFieldDecorator('isBold',{
                                    initialValue:isBold,
                                    ...simpleRule
                                })(
                                    <FSwitch
                                        values={['bold','normal']}
                                        onChange={formChange}
                                    ></FSwitch>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="字体大小">
                            {
                                getFieldDecorator('fontSize',{
                                    initialValue:fontSize,
                                    ...simpleRule
                                })(
                                    <Slider onChange={formChange} marks={marks} min={12} max={50}></Slider>
                                )
                            }
                        </Form.Item>
                        {/* <Slider min={12} max={50}></Slider> */}
                        <Form.Item label="是否外链">
                            {
                                getFieldDecorator('link',{
                                    initialValue:link,
                                    ...simpleRule
                                })(
                                    <FSwitch
                                        values={[true,false]}
                                        onChange={(showEffectForm)=>{
                                            this.setState({
                                                showEffectForm
                                            })
                                            formChange()
                                        }}
                                    ></FSwitch>
                                )
                            }
                        </Form.Item>
                        {
                            showEffectForm && <Fragment>
                                <Form.Item label="外链文案">
                                    {
                                        getFieldDecorator('linkText',{
                                            initialValue:linkText,
                                            ...simpleRule
                                        })(
                                            <Input onChange={formChange} style={{flex:1}}></Input>
                                        )
                                    }
                                </Form.Item>
                                <Form.Item label="跳转设置">
                                    <LinkSetBtn linkOptions={{linkParams,linkType,linkDesc}} submit={linkSubmit}></LinkSetBtn>
                                </Form.Item>
                        </Fragment>
                        }
                    </Block>
                </Form>
            </div>
        )
    }
}

export default InnerTitle
