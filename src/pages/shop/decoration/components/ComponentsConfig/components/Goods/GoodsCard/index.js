import React,{PureComponent,Fragment} from 'react'
import Block from '../../Block'
import { getTplList } from './fields'
import GoodsTpl from '../components/GoodsTpl'
import GoodsListContent from '../components/GoodsListContent'
import GoodsStyle from '../components/GoodsStyle'
import styles from './index.less'


class GoodsCard extends PureComponent{
    static component_id = '7'
    state = {
        tplList:getTplList(1),
        content:{},
        id:null,
        goodsChoosedDetail:[],
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { activeComponent } = nextProps
        const { id,content } = activeComponent
        if(prevState.id!==id){
            return {
                tplList:getTplList(1,content.template_id),
                content,
                id,
            }
        }
        return null
    }
    componentDidMount(){
        const { activeComponent } = this.props
        const { content } = activeComponent
        if(content.goodsChoosed.length){
            this.findGoods(content.goodsChoosed)
        }
    }
    componentWillUnmount(){
        this.destorySubmit()
    }

    destorySubmit=()=>{
        const { content,goodsChoosedDetail } = this.state
        this.submit({
            ...content,
            goodsChoosed:goodsChoosedDetail.map(it=>it.goods_id),
        })
    }
    submit(payload){
        const { id } = this.state
        this.props.submit(id,payload)
    }
    findGoods=(choosedGoods)=>{
        $api.product.productGetByIds({
            goods_ids:choosedGoods
        }).then(res=>{
            this.setState({
                goodsChoosedDetail:res.data || []
            })
        })
    }
    tplChange=(tplList,item)=>{
        this.setState({
            tplList
        })
        this.submit({ template_id:item.id })
    }
    chooseGoodsSubmit=(choosedGoods)=>{
        this.setState({
            goodsChoosedDetail:choosedGoods
        })
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
        const { tplList,content,goodsChoosedDetail } = this.state
        const { tplChange,formChange,chooseGoodsSubmit } = this
        return (
            <div className={styles.GoodsCardContainer}>
                    <GoodsTpl tplList={tplList} onActive={tplChange}></GoodsTpl>
                    <Block title="商品添加">
                        <GoodsListContent content={content} formChange={formChange} goodsChoosedDetail={goodsChoosedDetail} chooseGoodsSubmit={chooseGoodsSubmit}></GoodsListContent>
                    </Block>
                    <GoodsStyle content={content} formChange={formChange}></GoodsStyle>
            </div> 
        )
    }
}

export default GoodsCard