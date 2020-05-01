import React,{PureComponent} from 'react'
import { MutipulImg } from 'components'
import Block from '../Block'
import Subtitle from '../subtitle'
import ChooseTemplate from '../ChooseTemplate'
import LinkSetBtn from '@/components/LinkSet/btn'
import { getTplList } from './fields'

class ImageNav extends PureComponent{
    static component_id = '3'
    state = {
        tplList:getTplList(1),
        content:{},
        id:null,
        imgs:[],
        activeImgIndex:0
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.template_id),
                content,
                id,
                imgs:content.imgs,
                activeImgIndex:0
            }
        }
        return null
    }
    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content,imgs } = this.state
        this.submit({
            ...content,
            imgs
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    tplChange=(tplList,item)=>{
        this.setState({
            tplList
        })
        this.submit({ template_id:item.id })
        this.toogleImgTpl(item)
    }
    toogleImgTpl=(item)=>{
        let { imgs } = this.state
        if(item.imgNum>imgs.length){
            imgs = imgs.concat(Array(item.imgNum-imgs.length).fill().map(_=>({
                img:'',
            })))
        }else{
            imgs = imgs.slice(0,item.imgNum)
        }
        this.setState({
            imgs,
        })
        this.toogleActive(0)
    }
    imgChange=(imgs)=>{
        this.setState({
            imgs
        })
    }
    toogleActive=(index)=>{
        const { activeImgIndex } = this.state
        if(index===activeImgIndex)return
        this.setState({
            activeImgIndex:index
        })
    }
    imgClick=(index)=>{
        this.toogleActive(index)
    }
    linkSubmit=({linkParams,linkType,linkDesc})=>{
        const { imgs,activeImgIndex } = this.state
        imgs[activeImgIndex] = {
            ...imgs[activeImgIndex],
            linkParams,
            linkType,
            linkDesc
        }
        this.setState({
            imgs:imgs.slice(0)
        })
    }
    render(){
        const { tplList,imgs,activeImgIndex } = this.state
        const { tplChange,imgChange,imgClick,linkSubmit } = this
        const editData = imgs[activeImgIndex]
        const { linkParams,linkType,linkDesc } = editData || {}
        const tplItem = tplList.find(it=>it.active) || {}
        return(
            <div>
                <Block title="组件样式">
                    <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                    {
                        tplList.map((it,index)=>(
                            <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',padding:index===0?'8px 0':'8px',height:86,marginBottom:6}} key={index} onActive={tplChange} showCheckIcon item={it} tplList={tplList} index={index}>
                                <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                            </ChooseTemplate>
                        ))
                    }
                </Block>
                <Block title="图片添加">
                <MutipulImg active={activeImgIndex} imgClick={imgClick} tip imgs={imgs} dataChange={imgChange}></MutipulImg>
                <Subtitle style={{marginTop:10}} title="图片说明">
                    <span style={{color:'#ccc'}}>建议尺寸{tplItem.size}</span>
                </Subtitle>
                <Subtitle style={{marginTop:10,alignItems:'inherit'}} title="图片链接">
                    <LinkSetBtn linkOptions={{linkParams,linkType,linkDesc}} submit={linkSubmit}></LinkSetBtn>
                </Subtitle>
                </Block>
            </div>
        )
    }
}

export default ImageNav