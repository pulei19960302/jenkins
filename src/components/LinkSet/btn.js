import React,{ useState } from 'react'
import { Button } from 'antd'
import LinkSet from './index'

/**
 * 
 * @param {*} param0 
 * linkOptions:{
 *      linkType,
 *      linkDesc,
 *      linkParams
 * }
 */
export default function({linkOptions,submit}){
    const [visible,setVisible] = useState(false)
    
    const { linkDesc } = linkOptions
    const toogle = (visible)=>{
        setVisible(visible)
    }
    return (
        <div>
            <Button type="default" onClick={()=>{toogle(true)}}>设置跳转链接</Button>
            <div style={{marginLeft:8,marginTop:8}}>{linkDesc?`已选择${linkDesc}`:''}</div>
            <LinkSet submit={submit} visible={visible} toogle={setVisible} linkOptions={linkOptions}></LinkSet>
        </div> 
    )
}