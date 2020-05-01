import React from 'react'
import { CloseCircleFilled } from '@ant-design/icons';
import styles from './index.less'

export default function({activeIndex,imgs,onActive,getItem,add,colorChange=true,maxNum=10}){
    const onAdd =()=>{
        const newImgs = imgs.slice(0)
        newImgs.push(getItem())
        add(newImgs)
    }
    const onDel=(index)=>{
        const newImgs = imgs.slice(0)
        if(activeIndex===index && activeIndex===imgs.length-1){
            onActive(index===0?0:index-1)
        }
        newImgs.splice(index,1)
        add(newImgs,false)
    }
    return (
        <div style={{display:'flex',flexWrap:'wrap'}}>
            {
                imgs.map((it,i)=><Item del={onDel} canDel={imgs.length>1} style={{color:colorChange?it.color:'#333'}} key={it.uuid} active={activeIndex===i} index={i} onClick={onActive}>{it.title || `标题${i+1}`}</Item>)
            }
            {
                imgs.length<maxNum && <Item onClick={onAdd} index={0}>+</Item>
            }
        </div>
    )
}

const Item = function({active,onClick,index,children,style,del,canDel}){
    return (
        <div style={{...style}} className={`${styles.item} ${active?styles.active:''}`} onClick={()=>{onClick(index)}}>
            <div className="inner">{children}</div>
            {
                canDel && <CloseCircleFilled
                    onClick={(e)=>{
                        e.stopPropagation()
                        del(index)
                    }}
                    className={styles.close} />
            }
        </div>
    );
}