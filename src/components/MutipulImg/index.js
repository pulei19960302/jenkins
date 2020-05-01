import React,{PureComponent} from 'react'
import { UploadImg } from 'components'
import { CloseCircleFilled } from '@ant-design/icons';
import styles from './index.less'

export default class MutipulImg extends PureComponent{
    state = {
        imgs:[]
    }
    static getDerivedStateFromProps(props, state) {
        if(props.imgs!==state.imgs){
            return {
                imgs:props.imgs
            }
        }
        return null
    }
    imgChange=(index,url)=>{
        const { imgs } = this.state
        imgs[index].img = url || ''
        this.setState({
            imgs
        })
        this.props.dataChange(imgs)
    }
    render(){
        const { imgs } = this.state
        const { tip,imgClick,active,style={width:100,marginRight:8,position:'relative'},onDel } = this.props
        const { imgChange } = this
        return (
            <div className={styles.container} style={{display:'flex',flexWrap:'wrap'}}>
            {
                imgs.map((it,i)=>(
                    <div style={{...style}} className={`${(active===undefined || active!==i)?'':styles.active}`} onClick={(e)=>{ imgClick && imgClick(i) }} key={i}>
                        <UploadImg fileTotalCount={1} dataChange={(e)=>{imgChange(i,e[0])}} pic={it.img}></UploadImg>
                        {tip && <div style={{textAlign:'center',marginTop:-5,paddingRight:3}}>{`图${i+1}`}</div>}
                        {onDel && i!==imgs.length-1 && <CloseCircleFilled onClick={()=>{onDel(i)}} className={styles.close} />}
                    </div>
                ))
            }
            </div>
        );
    }
}