import { CloseSquareFilled, RightOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { getTplList as couponTpl  } from '../ComponentsConfig/components/Coupon/fields'
import { getTplList as imgNavTpl  } from '../ComponentsConfig/components/ImageNav/fields'
import { getTplList as carouselTpl  } from '../ComponentsConfig/components/Carousel/fields'
import { getTplList as iconNavTpl  } from '../ComponentsConfig/components/IconNav/fields'
import { getTplList as shopTricksTop } from '../ComponentsConfig/components/ShopTricks/fields'
import { getTplList as goodsCardTpl } from '../ComponentsConfig/components/Goods/GoodsCard/fields'
import { getBannerTplList as shopTricksBanner } from '../ComponentsConfig/components/ShopTricks/fields'
import { getTplList as killTpl }  from '../ComponentsConfig/components/Goods/Kill/fields'
import { getTplList as groupTpl }  from '../ComponentsConfig/components/Goods/GoodsGroup/fields'
import styles from './index.less'
import { idFindList } from '../fields';

export default function({item,onComponentFocus,onComponentDel,index}){
    return (
        <div 
        onClick={()=>{onComponentFocus(item,index)}}
        className={`${styles.pageComponentItem} ${item.active?styles.active:''}`}
        >
            {
                item.active && <Popconfirm
                                    title="确认移除这个组件?"
                                    placement="topRight"
                                    onConfirm={() => {
                                        onComponentDel(item,index)
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <CloseSquareFilled className="close-icon" />
                                </Popconfirm>
            }
            {
                +item.component_id ===  5 && <Coupon item={item}></Coupon>
            }
            {
                +item.component_id ===  3 && <ImageNav item={item}></ImageNav>
            }
            {
                +item.component_id ===  4 && <Carousel item={item}></Carousel>
            }
            {
                +item.component_id ===  6 && <InnerTitle item={item}></InnerTitle>
            }
            {
                +item.component_id ===  2 && <IconNav item={item}></IconNav>
            }
            {
                +item.component_id === 1 && <ShopTricks item={item}></ShopTricks>
            }
            {
                +item.component_id === 7 && <GoodsCards item={item}></GoodsCards>
            }
            {
                +item.component_id === 9 && <Kill item={item}></Kill>
            }
            {
                +item.component_id === 8 && <GoodsGroup item={item}></GoodsGroup>
            }
        </div>
    );
}

const Coupon = function({item}){
    const { res } = idFindList(couponTpl(2),item.content.template_id||1)
    return (
        <div className={styles.commonBox} style={{...item.style}}>
            <img style={{width:'100%'}} src={res.img} alt=""/> 
        </div>
    )
}

const ImageNav = function({item}){
    const { res } = idFindList(imgNavTpl(2),item.content.template_id||1)
    return (
        <div style={{...res.style}}>
            <img style={{width:'100%',height:'100%',display:'block'}} src={res.img} alt=""/> 
        </div>
    )
}

const Carousel = function({item}){
    const { res } = idFindList(carouselTpl(2),item.content.template_id||1)
    return (
        <div style={{...res.style}}>
            <img style={{width:'100%',height:'100%',display:'block'}} src={res.img} alt=""/> 
        </div>
    )
}

const InnerTitle = function({item}){
    const { content } = item
    const { title,position,link,linkText,fontSize,isBold } = content
    return (
        <div className={`${styles.commonBox} ${styles.InnerTitle}`} style={{fontSize,fontWeight:isBold,textAlign:position}}>
            <span className="title">{title}</span>
            {
                link && 
                <span className="link">
                    {linkText}
                    <RightOutlined />
                </span>
            }
        </div>
    );
}

const IconNav = function({item}){
    const { res } = idFindList(iconNavTpl(2),item.content.template_id||1)
    return (
        <div style={{...res.style}}>
            <img style={{width:'100%',height:'100%',display:'block'}} src={res.img} alt=""/> 
        </div>
    )
}

const ShopTricks = function({item}){
    const { res:top } = idFindList(shopTricksTop(2),item.content.top_template_id||1)
    const { res:banner } = idFindList(shopTricksBanner(2),item.content.banner_template_id||1)
    return (
        <div>
            <div>
                <img style={{width:'100%',height:52,display:'block',...top.style}} src={top.img} alt=""/> 
            </div>
            <div>
                <img style={{width:'100%',height:136,display:'block'}} src={banner.img} alt=""/> 
            </div>
        </div>
    )
}

const GoodsCards = function({item}){
    const { res } = idFindList(goodsCardTpl(2),item.content.template_id||1)
    return (
        <div style={{height:300}}>
            <img style={{width:'100%',height:'100%',display:'block'}} src={res.img} alt=""/> 
        </div>
    )
}

const Kill = function({item}){
    const { res:top } = idFindList(killTpl(2),item.content.top_template_id||1)
    const { res:goods } = idFindList(goodsCardTpl(2),item.content.goods_template_id||1)
    return (
        <div>
            <div>
                <img style={{width:'100%',height:55,display:'block'}} src={top.img} alt=""/> 
            </div>
            <div style={{height:300}}>
                <img style={{width:'100%',height:'100%',display:'block'}} src={goods.img} alt=""/> 
            </div>
        </div> 
    )
}

const GoodsGroup = function({item}){
    const { res:top } = idFindList(groupTpl(2),item.content.top_template_id||1)
    const { res:goods } = idFindList(goodsCardTpl(2),item.content.goods_template_id||1)
    return (
        <div>
            <div>
                <img style={{width:'100%',height:45,display:'block'}} src={top.img} alt=""/> 
            </div>
            <div style={{height:300}}>
                <img style={{width:'100%',height:'100%',display:'block'}} src={goods.img} alt=""/> 
            </div>
        </div> 
    )
}