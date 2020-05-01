import React,{PureComponent,Fragment} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio } from 'antd';
import Block from '../Block'
import Subtitle from '../subtitle'
import ChooseTemplate from '../ChooseTemplate'
import { getTplList,getColors } from './fields'
import { FSwitch,ChooseCoupon } from 'components'
import ChooseCouponItem from '../MutipulChoose'
import styles from './index.less'

@Form.create()
class Coupon extends PureComponent{
    static component_id = '5'
    state = {
        tplList:getTplList(1),
        colors:getColors(),
        content:{
            couponChoosed:[]
        },
        couponChoosedDetail:[],
        id:null,
        chooseCouponVisible:false
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.template_id),
                colors:getColors(content.color),
                content,
                id,
            }
        }
        return null
    }

    componentDidMount=()=>{
        const { activeComponent } = this.props
        const { content } = activeComponent
        if(content.couponChoosed.length){
            this.findCoupon(content.couponChoosed.join(','))
        }
    }
    findCoupon=(coupon_id_str)=>{
        $api.coupon.getCouponByIds({
            coupon_id_str
        },{cache:true}).then(res=>{
            this.setState({
                couponChoosedDetail:res.data
            })
        })
    }

    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content,couponChoosedDetail } = this.state
        this.submit({
            ...content,
            couponChoosed:couponChoosedDetail.map(it=>it.id),
            ...this.props.form.getFieldsValue(),
        })
    }
    
    tplChange=(tplList,item)=>{
        this.setState({
            tplList
        })
        this.submit({ template_id:item.id })
    }
    colorChange=(colors,item,index)=>{
        this.setState({
            colors
        })
        this.submit({ color:item.color })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    toogleChooseCouponVisible=(chooseCouponVisible)=>{
        this.setState({
            chooseCouponVisible
        })
    }
    chooseCouponSubmit=(couponChoosedDetail,idArr=false)=>{
        if(idArr && couponChoosedDetail.length!==0){
            this.findCoupon(couponChoosedDetail.join(','))
        }else{
            this.setState({
                couponChoosedDetail
            })
        }
    }
    render(){
        const { tplList,colors,content,chooseCouponVisible,couponChoosedDetail } = this.state
        const { sendWay,all_visible } = content
        const { tplChange,colorChange,toogleChooseCouponVisible,chooseCouponSubmit } = this
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <div className={styles.CouponContainer}>
            <Form>
                <Block title="组件样式">
                    <Subtitle title="选择模板"></Subtitle>
                    {
                        tplList.map((it,index)=>(
                            <ChooseTemplate key={index} onActive={tplChange} showCheckIcon item={it} tplList={tplList} index={index}>
                                <img style={{width:'100%'}} src={it.img}></img>
                            </ChooseTemplate>
                        ))
                    }
                    <Subtitle title="颜色设置">
                        <div style={{display:'flex'}}>
                            {
                                colors.map((it,index)=>(
                                    <ChooseTemplate className="colorPicker" key={index} item={it} onActive={colorChange} tplList={colors} index={index}>
                                        <div style={{width:14,height:14,backgroundColor:it.color}}></div>
                                    </ChooseTemplate>
                                ))
                            }
                        </div>
                    </Subtitle>
                </Block>
                <Block title="优惠券添加">
                    <Subtitle style={{marginBottom:20}} title="添加方式">
                    
                    {
                        getFieldDecorator('sendWay',{
                            initialValue:sendWay
                        })(
                            <Radio.Group onChange={(e)=>{
                                this.setState({
                                    content:{
                                        ...this.state.content,
                                        sendWay:e.target.value
                                    }
                                })
                            }}>
                                <Radio value={1}>手动添加</Radio>
                                <Radio value={2}>自动获取</Radio>
                            </Radio.Group>
                        )
                    }
                    </Subtitle>
                    {
                        sendWay === 1 &&
                        <Fragment>
                            {
                                couponChoosedDetail.map((it,i)=><ChooseCouponItem key={it.id} onDel={chooseCouponSubmit} all={couponChoosedDetail} index={i} item={it}>{it.name}</ChooseCouponItem>)
                            }
                            <ChooseCouponItem>
                                <div onClick={()=>{toogleChooseCouponVisible(true)}} className="addCouponBtn">
                                    <PlusOutlined></PlusOutlined>
                                    <span style={{marginLeft:5}}>添加优惠券</span>
                                </div>
                            </ChooseCouponItem>
                        </Fragment>
                    }
                    <Subtitle style={{marginBottom:30,position:'relative'}} title="已抢完券">
                    {
                        getFieldDecorator('all_visible',{
                            initialValue:all_visible
                        })(
                            <FSwitch
                                tips={['当页面无可用的优惠券时，优惠券区块仍然显示','当页面无可用的优惠券时，优惠券区块将隐藏']}
                                texts={['显示','隐藏']}
                                tipStyle={{position:'absolute',left:0,bottom:-25}}
                            />
                       )
                    }
                    </Subtitle>
                    <ChooseCoupon submit={(res)=>{chooseCouponSubmit(res,true)}} toogle={toogleChooseCouponVisible} choosed={couponChoosedDetail.map(it=>it.id)} visible={chooseCouponVisible}></ChooseCoupon>
                </Block>
            </Form>
            </div>
        );
    }
}

export default Coupon