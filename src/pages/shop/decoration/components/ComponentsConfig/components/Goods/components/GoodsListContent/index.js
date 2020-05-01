import React,{PureComponent,Fragment} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Select } from 'antd';
import Subtitle from '../../../subtitle'
import MutipulChoose from '../../../MutipulChoose'
import ChooseGoods from '@/components/ChooseGoods'
import ChooseLabel from '@/components/ChooseLabel'
import ChooseCat from '@/components/ChooseCat'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

export default class GoodsTpl extends PureComponent{
    state = {
        chooseGoodsVisible:false
    }
    toogleChooseGoodsVisible=(chooseGoodsVisible)=>{
        this.setState({
            chooseGoodsVisible
        })
    }
    render(){
        const { content,formChange,goodsChoosedDetail,chooseGoodsSubmit } = this.props
        const { addWay,sort,groupType,goodsLabels=[],goodsCats=[] } = content
        const { toogleChooseGoodsVisible } = this
        const { chooseGoodsVisible } = this.state
        return (
            <Fragment>
            <Form {...formItemLayout}>
                <Form.Item required className="add-goods" label="添加方式">
                        <Radio.Group value={addWay} onChange={e=>{formChange('addWay',e.target.value)}}>
                            <Radio value={1}>手动添加</Radio>
                            <Radio value={2}>自动获取</Radio>
                        </Radio.Group>
                </Form.Item>
                {
                        +addWay===1 &&
                        <Fragment>
                            {
                                goodsChoosedDetail.length>0 && <Subtitle onClick={()=>{chooseGoodsSubmit([])}} style={{marginBottom:4,color:'#1890FF',cursor:'pointer'}} title="全部删除"></Subtitle>
                            }
                            {
                                goodsChoosedDetail.map((it,i)=><MutipulChoose all={goodsChoosedDetail} index={i} onDel={chooseGoodsSubmit} key={it.goods_id}>{it.title}</MutipulChoose>)
                            }
                            <MutipulChoose>
                                <div onClick={()=>{toogleChooseGoodsVisible(true)}} className="addGoodsBtn">
                                    <PlusOutlined></PlusOutlined>
                                    <span style={{marginLeft:5}}>添加商品</span>
                                </div>
                            </MutipulChoose>
                        </Fragment>
                    }
                    {
                        +addWay===2 &&
                        <Fragment>
                            <Form.Item required className="add-goods" label="获取方式">
                                    <Radio.Group value={groupType} onChange={e=>{formChange('groupType',e.target.value)}}>
                                        <Radio value={1}>标签</Radio>
                                        <Radio value={2}>分类</Radio>
                                        <Radio value={3}>全部商品</Radio>
                                    </Radio.Group>
                            </Form.Item>
                            {
                                +groupType===1 &&
                                <Form.Item required label="选择标签">
                                    <ChooseLabel value={goodsLabels} onChange={(e)=>{formChange('goodsLabels',e)}}></ChooseLabel>
                                </Form.Item>
                            }
                            {
                                +groupType===2 &&
                                <Form.Item required label="选择分类">
                                    <ChooseCat value={goodsCats} onChange={(e)=>{formChange('goodsCats',e)}}></ChooseCat>
                                </Form.Item>
                            }
                            
                        </Fragment>
                    }
                    
                    <Form.Item required label="商品排序">
                            <Select value={sort} getPopupContainer={triggerNode => triggerNode.parentElement} onChange={e=>{formChange('sort',e)}}>
                                <Select.Option key={5}>销量从高到低</Select.Option>
                            </Select>
                    </Form.Item>
                </Form>
                <ChooseGoods submit={(a,b)=>{chooseGoodsSubmit(b)}} toogle={toogleChooseGoodsVisible} visible={chooseGoodsVisible} choosed={goodsChoosedDetail.map(it=>it.goods_id)} ></ChooseGoods>
            </Fragment>
        );
    }
}