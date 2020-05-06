import React,{PureComponent,Fragment} from 'react'
import { Input } from 'antd'
import { MutipulImg } from 'components'
import Block from '../Block'

import Subtitle from '../subtitle'
import ColorBall from '../ColorBall';
import ChooseTemplate from '../ChooseTemplate'
import PanelSwitch from '../PanelSwitch'
import { getTplList,getColors,getItem } from './fields'
import LinkSetBtn from '@/components/LinkSet/btn'
import styles from './index.less'



class ImageNav extends PureComponent{
    static component_id = '2'
    state = {
        tplList:getTplList(1),
        content:{},
        id:null,
        imgs:[],
        activeImgIndex:0,
        colors:getColors()
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.template_id),
                content,
                id,
                imgs:getItem(content.imgs),
                activeImgIndex:0,
                colors:getColors(content.imgs[0].color),
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
    imgActiveDel=(index)=>{
        const { imgs } = this.state
        imgs.splice(index,1)
        this.setState({
            imgs:imgs.slice(0)
        })
    }
    formChange=(changeRes)=>{
        const { activeImgIndex,imgs } = this.state
        imgs.splice(activeImgIndex,1,{
            ...imgs[activeImgIndex],
            ...changeRes
        })
        this.setState({
            imgs:imgs.slice(0)
        })
    }
    colorChange=(colors,item,index)=>{
        this.setState({
            colors
        })
        this.formChange({color:item.color})
    }
    imgActive=(activeImgIndex)=>{
        const { imgs } = this.state
        this.setState({
            activeImgIndex,
            colors:getColors(imgs[activeImgIndex].color)
        })
    }
    addImg=(imgs,active=true)=>{
        this.setState({
            imgs
        },()=>{
            active && this.imgActive(imgs.length-1)
        })
        
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
        const { tplList,imgs,activeImgIndex,colors } = this.state
        const { tplChange,formChange,colorChange,imgActive,addImg,linkSubmit } = this
        const editData = imgs[activeImgIndex]

        const { linkParams,linkType,linkDesc } = editData || {}
        return(
            <div>
                <Block title="组件样式">
                    <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                    {
                        tplList.map((it,index)=>(
                            <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',padding:index===0?'12px':0,height:85,marginBottom:6}} key={index} onActive={tplChange} showCheckIcon item={it} tplList={tplList} index={index}>
                                <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                            </ChooseTemplate>
                        ))
                    }
                </Block>
                <Block title="导航编辑">
                <PanelSwitch add={addImg} getItem={getItem} activeIndex={activeImgIndex} imgs={imgs} onActive={imgActive}></PanelSwitch>
                {
                    !!editData &&
                <Fragment>
                <Subtitle style={{marginTop:10}} title="标题名称">
                    <Input onChange={(e)=>{formChange({title:e.target.value})}} value={editData.title} style={{flex:1,height:26}}></Input>
                </Subtitle>
                <Subtitle style={{marginTop:10}} title="标题颜色">
                    <div style={{display:'flex'}}>
                        {
                            colors.map((it,index)=>(
                                <ChooseTemplate className={styles.colorPicker} key={index} item={it} onActive={colorChange} tplList={colors} index={index}>                 
                                    <ColorBall color={it.color} />
                                </ChooseTemplate>
                            ))
                        }
                    </div>
                </Subtitle>
                <Subtitle style={{marginTop:10}} spanStyle={{alignSelf: 'flex-start'}} title="上传图片">
                    <div>
                        <MutipulImg imgs={[editData]} style={{width:107}} dataChange={(img)=>{formChange(img[0])}}></MutipulImg>
                    </div>
                </Subtitle>
                <Subtitle style={{marginTop:10,alignItems:'inherit'}} title="跳转链接">
                <LinkSetBtn linkOptions={{linkParams,linkType,linkDesc}} submit={linkSubmit}></LinkSetBtn>
                </Subtitle>
                </Fragment>
            }

                </Block>
            </div>
        )
    }
}

export default ImageNav