import React,{PureComponent,Fragment} from 'react'
import Block from '../../Block'
import Subtitle from '../../subtitle'
import { getTplList } from './fields'
import { getTplList as getGoodsTplList } from '../GoodsCard/fields'
import GoodsTpl from '../components/GoodsTpl'
import ChooseTemplate from '../../ChooseTemplate'
import GoodsStyle from '../components/GoodsStyle'
import styles from './index.less'

export default class Kill extends PureComponent {
    static component_id = '9'
    state = {
        tplList:getTplList(1),
        content:{},
        id:null,
        goodsTplList:getGoodsTplList(1)
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
            }
        }
        return null
    }
    componentWillUnmount(){
        this.destorySubmit()
    }
    destorySubmit=()=>{
        const { content } = this.state
        this.submit({
            ...content,
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
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
    render(){
        const { tplList,goodsTplList,content } = this.state
        const { topTplChange,goodsTplChange,formChange } = this
        return (
            <div className={styles.KillContainer}>
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
                <GoodsStyle isKill={true} content={content} formChange={formChange}></GoodsStyle>
            </div> 
        )
    }
}