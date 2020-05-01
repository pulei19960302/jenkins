import React,{ PureComponent,Fragment } from 'react'
import { Radio,Select } from 'antd'
import Block from '../Block'
import Subtitle from '../subtitle'
import ChooseTemplate from '../ChooseTemplate'
import PanelSwitch from '../PanelSwitch'
import { FSwitch,ColorPicker,UploadImg,MutipulImg } from 'components'
import LinkSetBtn from '@/components/LinkSet/btn'
import { getTplList,getItem,getColors,index_features,getBannerTplList } from './fields'
import styles from './index.less'

const Option = Select.Option

const Icon_num_map = {
    1:2,
    2:1,
    3:2,
    4:3
}

class ShopTricks extends PureComponent{
    static component_id = '1'
    state = {
        tplList:getTplList(1),
        top_template_id:1,
        content:{},
        id:null,
        icons:[],
        activeIconIndex:0,
        colors:getColors(),
        need_banner:true,
        topBackgroundColor:'#ffffff',
        bannerTplList:getBannerTplList(1),
        background_type:1,
        background_image:'',

        activeImgIndex:0,
        banners:[]
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.top_template_id),
                top_template_id:content.top_template_id,
                content,
                id,
                icons:content.icons || [],
                activeIconIndex:0,
                colors:getColors(content.icons[0].color),
                need_banner:content.need_banner,
                topBackgroundColor:content.topBackgroundColor,
                bannerTplList:getBannerTplList(1,content.banner_template_id),
                background_type:content.background_type,
                background_image:content.background_image,
                banners:content.banners.concat([{img:'',main_color:''}]),
            }
        }
        return null
    }
    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content,icons,need_banner,topBackgroundColor,background_type,background_image,banners } = this.state
        this.submit({
            ...content,
            icons,
            need_banner,
            topBackgroundColor,
            background_type,
            background_image,
            banners:banners.filter(it=>!!it.img)
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    topTplChange=(tplList,item)=>{
        const { icons } = this.state
        const maxNum = Icon_num_map[item.id]
        this.setState({
            tplList,
            top_template_id:item.id,
            icons:icons.slice(0,maxNum)
        })
        this.submit({ top_template_id:item.id })
    }
    bannerTplChange=(bannerTplList,item)=>{
        this.setState({
            bannerTplList
        })
        this.submit({ banner_template_id:item.id })
    }
    iconActive=(activeIconIndex)=>{
        const { icons } = this.state
        this.setState({
            activeIconIndex,
            colors:getColors(icons[activeIconIndex].color)
        })
    }
    addIcon=(icons,active=true)=>{
        this.setState({
            icons
        },()=>{
            active && this.iconActive(icons.length-1)
        })
    }
    formChange=(key,value)=>{
        const { icons,activeIconIndex } = this.state
        icons[activeIconIndex][key] = value
        if(key==='feature_id'){
            const item = index_features.find(it=>it.id===value)
            icons[activeIconIndex].title = item.title
        }
        this.setState({
            icons:icons.slice(0)
        })
    }
    colorChange=(colors,item)=>{
        this.setState({
            colors
        })
        this.formChange('color',item.color)
    }
    stateChange=(key,value)=>{
        this.setState({
            [key]:value
        })
        this.submit({ [key]:value })
    }
    toogleBannerActive=(index)=>{
        const { activeImgIndex } = this.state
        if(index===activeImgIndex)return
        this.setState({
            activeImgIndex:index
        })
    }
    bannerClick=(index)=>{
        this.toogleBannerActive(index)
    }
    bannerClickDel=(index)=>{
        const { banners } = this.state
        banners.splice(index,1)
        this.setState({
            banners:banners.slice(0)
        })
    }
    bannerChange=(imgs)=>{
        if(imgs[imgs.length-1].img){
            imgs.push({
                img:'',
                main_color:''
            })
        }
        this.setState({
            banners:imgs.slice(0)
        })
    }
    bannerItemChange=(key,value)=>{
        const { banners,activeImgIndex } = this.state
        banners[activeImgIndex][key] = value
        this.setState({
            banners:banners.slice(0)
        })
    }
    linkSubmit=({linkParams,linkType,linkDesc})=>{
        const { banners,activeImgIndex } = this.state
        banners[activeImgIndex] = {
            ...banners[activeImgIndex],
            linkParams,
            linkType,
            linkDesc
        }
        this.setState({
            banners:banners.slice(0)
        })
    }
    
    render(){
        const { tplList,top_template_id,icons,activeIconIndex,colors,need_banner,topBackgroundColor,bannerTplList,background_type,background_image,activeImgIndex,banners } = this.state
        const { topTplChange,addIcon,iconActive,colorChange,bannerTplChange } = this

        const { formChange,stateChange,bannerClick,bannerClickDel,bannerChange,bannerItemChange,linkSubmit } = this

        const editData = icons[activeIconIndex]

        const eidtBanner = banners[activeImgIndex]

        const { linkParams,linkType,linkDesc } = eidtBanner || {}


        const Max_Num = Icon_num_map[top_template_id]

        return (
            <div className={styles.shopTricksContainer}>
                    <Block title="顶部设置">
                        <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                        {
                            tplList.map((it,index)=>(
                                <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',height:58,marginBottom:6}} key={index} onActive={topTplChange} showCheckIcon item={it} tplList={tplList} index={index}>
                                    <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                                </ChooseTemplate>
                            ))
                        }
                        <Subtitle style={{marginBottom:4}} title="图标设置"></Subtitle>
                        <div style={{marginBottom:14}} className="tip">最多添加选择{Max_Num}个功能图标, 图标由系统默认配置</div>
                        <PanelSwitch maxNum={Max_Num} colorChange={false} add={addIcon} getItem={getItem} activeIndex={activeIconIndex} imgs={icons} onActive={iconActive}></PanelSwitch>
                        {
                            !!editData && 
                            <Fragment>
                                <Subtitle style={{marginBottom:20}} title="图标功能">
                                <Select getPopupContainer={triggerNode => triggerNode.parentElement} onChange={(e)=>{formChange('feature_id',e)}} value={editData.feature_id} style={{width:'50%'}}>
                                    {
                                        index_features.map(it=><Option key={it.id} value={it.id}>{it.title}</Option>)
                                    }
                                </Select>
                                </Subtitle>
                                <Subtitle style={{marginTop:10}} title="内容颜色">
                                    <div style={{display:'flex'}}>
                                        {
                                            colors.map((it,index)=>(
                                                <ChooseTemplate className={styles.colorPicker} key={index} item={it} onActive={colorChange} tplList={colors} index={index}>
                                                    <div style={{width:14,height:14,backgroundColor:it.color}}></div>
                                                </ChooseTemplate>
                                            ))
                                        }
                                    </div>
                                </Subtitle>
                            </Fragment>
                        }
                        <Subtitle style={{marginTop:20,position:'relative',paddingBottom:need_banner?40:0}} title="轮播图">
                            <FSwitch
                                tips={['开启轮播图后可在下方设置顶部背景,可选择上传背景图或者顶部背景颜色随banner主色动态变化']}
                                texts={['开启','关闭']}
                                tipStyle={{position:'absolute',left:0,bottom:0}}
                                values={[true,false]}
                                value={need_banner}
                                onChange={(e)=>{stateChange('need_banner',e)}}
                            />
                        </Subtitle>
                        {
                            !need_banner && 
                            <Subtitle className="animated bounceInLeft" style={{marginTop:20,animationFillMode: 'inherit'}} title="背景色">
                                <ColorPicker direction="top" color={topBackgroundColor} onChange={e=>{stateChange('topBackgroundColor',e)}} />
                            </Subtitle>
                        }
                        
                    </Block>
                    {
                        need_banner &&
                        <Block title="轮播图设置">
                            <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                                {
                                    bannerTplList.map((it,index)=>(
                                        <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',height:98,marginBottom:6}} key={index} onActive={bannerTplChange} showCheckIcon item={it} tplList={bannerTplList} index={index}>
                                            <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                                        </ChooseTemplate>
                                    ))
                                }
                            <Subtitle style={{marginBottom:4}} title="店招背景">
                                <Radio.Group value={background_type} onChange={(e)=>{stateChange('background_type',e.target.value)}}>
                                    <Radio value={1}>图片背景</Radio>
                                    <Radio value={2}>动态背景色</Radio>
                                </Radio.Group>
                            </Subtitle>
                            {
                                background_type===1&&
                                <Subtitle className="animated bounceInLeft" style={{marginTop:20}} title="请上传背景图">
                                    <UploadImg fileTotalCount={1} dataChange={(e)=>stateChange('background_image',e[0])} pic={background_image}></UploadImg>
                                </Subtitle>
                            }
                            <Subtitle style={{marginBottom:10}} title="轮播图添加"></Subtitle>
                            <MutipulImg active={activeImgIndex} imgClick={bannerClick} tip onDel={bannerClickDel} imgs={banners} dataChange={bannerChange}></MutipulImg>
                            <Subtitle style={{marginTop:10}} title="图片说明">
                                <span style={{color:'#ccc'}}>建议尺寸 702*264</span>
                            </Subtitle>
                            <Subtitle style={{marginTop:10}} title="图片主色">
                                <ColorPicker direction="top" color={eidtBanner.main_color} onChange={e=>{bannerItemChange('main_color',e)}} />
                            </Subtitle>
                            <Subtitle style={{marginTop:20,alignItems:'inherit'}} title="跳转链接">
                                <LinkSetBtn linkOptions={{linkParams,linkType,linkDesc}} submit={linkSubmit}></LinkSetBtn>
                            </Subtitle>
                        </Block>
                    }
                    
            </div>
        )
    }
}

export default ShopTricks