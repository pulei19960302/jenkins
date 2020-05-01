import React,{ PureComponent } from "react"
import Title from './components/title'
import styles from './index.less'
import { IconFont } from 'components'
import Coupon from './components/Coupon'
import ImageNav from './components/ImageNav'
import Carousel from './components/Carousel'
import InnerTitle from './components/InnerTitle'
import IconNav from './components/IconNav'
import ShopTricks from './components/ShopTricks'
import PageSet from './components/PageSet'
import GoodsCard from './components/Goods/GoodsCard'
import Kill from './components/Goods/Kill'
import GoodsGroup from './components/Goods/GoodsGroup'

class ComponentsConfig extends PureComponent{
    
    judge=(component)=>{
        const { activeComponent } = this.props
        return +activeComponent.component_id === +component.component_id
    }
    render(){
        const { activeComponent,submit } = this.props
        const { judge } = this
        const componentConfigProps = {
            submit,
            activeComponent
        }
        return (
            <div className={styles.ComponentsConfigContainer}>
                    <div className="components-content-box">
                        <Title>
                            <IconFont style={{fontSize:18,marginRight:3}} type={activeComponent.icon}></IconFont>
                            {activeComponent.name}
                        </Title>
                        {
                            judge(Coupon) && <Coupon {...componentConfigProps}></Coupon>
                        }
                        {
                            judge(ImageNav) && <ImageNav {...componentConfigProps}></ImageNav>
                        }
                        {
                            judge(Carousel) && <Carousel {...componentConfigProps}></Carousel>
                        }
                        {
                            judge(InnerTitle) && <InnerTitle {...componentConfigProps}></InnerTitle>
                        }
                        {
                            judge(IconNav) && <IconNav {...componentConfigProps}></IconNav>
                        }
                        {
                            judge(ShopTricks) && <ShopTricks {...componentConfigProps}></ShopTricks>
                        }
                        {
                            judge(PageSet) && <PageSet {...componentConfigProps}></PageSet>
                        }
                        {
                            judge(GoodsCard) && <GoodsCard {...componentConfigProps}></GoodsCard>
                        }
                        {
                            judge(Kill) && <Kill {...componentConfigProps}></Kill>
                        }
                        {
                            judge(GoodsGroup) && <GoodsGroup {...componentConfigProps}></GoodsGroup>
                        }
                    </div>
            </div>
        )
    }
}

export default ComponentsConfig
