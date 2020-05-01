import React,{PureComponent,Fragment} from 'react'
import Block from '../../../Block'
import Subtitle from '../../../subtitle'
import ChooseTemplate from '../../../ChooseTemplate'

export default class GoodsTpl extends PureComponent{
    render(){
        const { tplList,onActive } = this.props
        return (
            <Block title="商品模板">
                <Subtitle style={{marginBottom:4}} title="选择模板"></Subtitle>
                {
                    tplList.map((it,index)=>(
                        <ChooseTemplate style={{display:'inline-block',width: '48%',marginRight:'2%',padding:index===0?'8px 0':'8px',height:125,marginBottom:6}} key={index} onActive={onActive} showCheckIcon item={it} tplList={tplList} index={index}>
                            <img style={{width:'100%',height:'100%'}} src={it.img}></img>
                        </ChooseTemplate>
                    ))
                }
            </Block>
        )
    }
}