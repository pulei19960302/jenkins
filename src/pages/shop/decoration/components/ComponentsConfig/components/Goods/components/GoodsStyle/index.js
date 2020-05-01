import React,{PureComponent,Fragment} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Select, Switch, Row, Col, Input } from 'antd';
import { FSwitch } from 'components'
import Subtitle from '../../../subtitle'
import MutipulChoose from '../../../MutipulChoose'
import ChooseGoods from '@/components/ChooseGoods'
import debounce from 'lodash/debounce';
import Block from '../../../Block'

const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }

export default class GoodsStyle extends PureComponent{
    state={

    }
    inputChange=(e)=>{
        this.debounceChange('bottomBtnText',e.target.value)
    }
    debounceChange=debounce((key,value)=>{
        this.props.formChange(key,value)
    },500)
    render(){
        const { formChange,content,isKill } = this.props
        const { inputChange } = this
        const { showMainTitle,showSubTitle,showSaleNum,showGoodsTag,bottomBtnType,bottomBtnStyle,bottomBtnText,showProgress } = content
        return (
            <Form {...formItemLayout}>
                <Block title="显示设置">
                <Row>
                    <Col span={12}>
                        <Form.Item label="主标题">
                            <FSwitch
                                disabled
                                values={[true,false]}
                                value={showMainTitle}
                                onChange={(e)=>{formChange('showMainTitle',e)}}
                                texts={['展示','隐藏']}
                            ></FSwitch>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="副标题">
                            <FSwitch
                                    value={showSubTitle}
                                    values={[true,false]}
                                    onChange={(e)=>{formChange('showSubTitle',e)}}
                                    texts={['展示','隐藏']}
                            ></FSwitch>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="商品销量">
                            <FSwitch
                                    value={showSaleNum}
                                    values={[true,false]}
                                    onChange={(e)=>{formChange('showSaleNum',e)}}
                                    texts={['展示','隐藏']}
                            ></FSwitch>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="商品标签">
                            <FSwitch
                                value={showGoodsTag}
                                values={[true,false]}
                                onChange={(e)=>{formChange('showGoodsTag',e)}}
                                texts={['展示','隐藏']}
                            ></FSwitch>
                        </Form.Item>
                    </Col>
                </Row>
                {
                    isKill &&
                    <Form.Item labelCol={{span:5}} wrapperCol={{span:19}} label="抢购进度">
                        <FSwitch
                            value={showProgress}
                            values={[true,false]}
                            onChange={(e)=>{formChange('showProgress',e)}}
                            texts={['展示','隐藏']}
                        ></FSwitch>
                    </Form.Item>
                }
                <Form.Item labelCol={{span:5}} wrapperCol={{span:19}} label="购买按钮">
                    <Radio.Group value={bottomBtnType} onChange={e=>{formChange('bottomBtnType',e.target.value)}}>
                        <Radio value={1}>购物车</Radio>
                        <Radio value={2}>按钮</Radio>
                        <Radio value={3}>不展示</Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    bottomBtnType === 2 && 
                    <Fragment>
                        <Form.Item labelCol={{span:5}} wrapperCol={{span:19}} label="按钮风格">
                            <Radio.Group value={bottomBtnStyle} onChange={e=>{formChange('bottomBtnStyle',e.target.value)}}>
                                <Radio value={1}>样式1</Radio>
                                <Radio value={2}>样式2</Radio>
                                <Radio value={3}>样式3</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item labelCol={{span:5}} wrapperCol={{span:19}} label="按钮文字">
                            <Input defaultValue={bottomBtnText} onChange={inputChange}></Input>
                        </Form.Item>
                    </Fragment>
                }
                
                </Block>
            </Form>
        )
    }
}