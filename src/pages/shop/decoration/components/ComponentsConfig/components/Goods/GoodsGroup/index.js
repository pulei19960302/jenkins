import React,{PureComponent,Fragment} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Radio } from 'antd';
import Block from '../../Block'
import Subtitle from '../../subtitle'
import { getTplList,getItem } from './fields'
import { getTplList as getGoodsTplList } from '../GoodsCard/fields'
import GoodsTpl from '../components/GoodsTpl'
import ChooseTemplate from '../../ChooseTemplate'
import GoodsStyle from '../components/GoodsStyle'
import PanelSwitch from '../../PanelSwitch'
import GoodsListContent from '../components/GoodsListContent'
// import styles from './index.less'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }

export default class GoodsGroup extends PureComponent {
    static component_id = '8'
    state = {
        tplList:getTplList(1),
        content:{},
        id:null,
        goodsTplList:getGoodsTplList(1),
        groups:[],
        activeGroupIndex:0,

        goodsChoosedDetail:[],
        
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.top_template_id),
                goodsTplList:getGoodsTplList(1,content.goods_template_id),
                content,
                id,
                groups:getItem(content.groups)
            }
        }
        return null
    }
    componentDidMount(){
        this.groupActive(0)
    }
    componentWillUnmount(){
        this.destorySubmit()
    }
    destorySubmit=()=>{
        const { content,groups } = this.state
        this.submit({
            ...content,
            groups
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    findGoods=(goodsChoosed)=>{
        $api.product.productGetByIds({
            goods_ids:goodsChoosed
        },{cache:true}).then(res=>{
            this.setState({
                goodsChoosedDetail:res.data || []
            })
        })
    }
    topTplChange=(tplList,item)=>{
        this.setState({
            tplList
        })
        this.submit({ top_template_id:item.id })
    }
    goodsTplChange=(goodsTplList,item)=>{
        this.setState({
            goodsTplList
        })
        this.submit({ goods_template_id:item.id })
    }
    formChange=(key,value)=>{
        this.setState({
            content:{
                ...this.state.content,
                [key]:value
            }
        })
    }
    addGroup=(groups,active=true)=>{
        this.setState({
            groups
        },()=>{
            active && this.groupActive(groups.length-1)
        })
    }
    groupActive=(activeGroupIndex)=>{
        this.setState({
            activeGroupIndex,
        })
        const goodsChoosed = this.state.groups[activeGroupIndex].goodsChoosed
        if(goodsChoosed.length!==0){
            this.findGoods(goodsChoosed)
        }else{
            this.setState({
                goodsChoosedDetail:[]
            })
        }
    }
    groupItemChange=(key,value)=>{
        const { activeGroupIndex,groups } = this.state
        groups.splice(activeGroupIndex,1,{
            ...groups[activeGroupIndex],
            [key]:value
        })
        this.setState({
            groups:groups.slice(0)
        })
    }
    chooseGoodsSubmit=(goodsChoosed)=>{
        this.setState({
            goodsChoosedDetail:goodsChoosed
        })
        this.groupItemChange('goodsChoosed',goodsChoosed.map(it=>it.goods_id))
    }
    render(){
        const { tplList,goodsTplList,content,activeGroupIndex,groups,goodsChoosedDetail } = this.state
        const { topTplChange,goodsTplChange,formChange,addGroup,groupActive,groupItemChange,chooseGoodsSubmit } = this

        const editData = groups[activeGroupIndex]
        return (
            <div>
                <Block title="顶部样式设置">
                    <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                    {
                        tplList.map((it,index)=>(
                            <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',padding:index===0?'8px 0':'8px',height:36,marginBottom:6}} key={index} onActive={topTplChange} showCheckIcon item={it} tplList={tplList} index={index}>
                                <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                            </ChooseTemplate>
                        ))
                    }
                </Block>
                <GoodsTpl tplList={goodsTplList} onActive={goodsTplChange}></GoodsTpl>
                <Block title="分组配置">
                    <Form.Item {...formItemLayout} required label="组商品数">
                        <Input placeholder="请输入每组最多展示商品数" onChange={(e)=>{groupItemChange('maxNum',e.target.value)}} value={editData.maxNum} style={{flex:1,height:26}}></Input>
                    </Form.Item>
                    <PanelSwitch add={addGroup} getItem={getItem} activeIndex={activeGroupIndex} imgs={groups} onActive={groupActive}></PanelSwitch>
                    {
                        editData && 
                        <Fragment>
                        <Form.Item {...formItemLayout} required label="分组名称">
                            <Input onChange={(e)=>{groupItemChange('title',e.target.value)}} value={editData.title} style={{flex:1,height:26}}></Input>
                        </Form.Item>
                        <GoodsListContent goodsChoosedDetail={goodsChoosedDetail} chooseGoodsSubmit={chooseGoodsSubmit} content={editData} formChange={groupItemChange}></GoodsListContent>
                        </Fragment>
                    }
                </Block>
                <GoodsStyle content={content} formChange={formChange}></GoodsStyle>
            </div> 
        )
    }
}