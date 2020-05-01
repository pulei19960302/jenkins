import React,{useEffect,useState} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Cascader } from 'antd';
import { ENUMS } from './fields';

const getFormatedCategoryTreeData = (srcData) => {
    if (srcData.length === 0) { return [] }
    return srcData.map((item) => {
      return {
        label: item.name,
        value: item.id,
        children: item.sub.length === 0
          ? []
          : item.sub.map((subItem) => {
            return {
              label: subItem.name,
              value: subItem.id
            }
          })
      }
    })
}

const findDesc = (cats,res)=>{
    let snap = {}
    let desc = ''
    if(res[0]){
        snap = cats.find(it=>it.value===res[0])
        desc+=snap.label
    }
    if(res[1]){
        const item = snap.children.find(it=>it.value===res[1])
        desc+=`-${item.label}`
    }
    return desc
}

export default function({linkParams,linkType,onCheck}){
    const [categoryList,setCategoryList] = useState([])
    const [res,setRes] = useState(linkType===ENUMS[7]?linkParams:[])
    useEffect(()=>{
        if(categoryList.length===0){
            $api.category.categoryList().then((res) => { // 获取商品类目下拉数据
                setCategoryList(getFormatedCategoryTreeData(res.data.item))
            })
        }
    })
    const selectChange = (e)=>{
        setRes(e)
        onCheck(e,ENUMS[7],`商品分类:${findDesc(categoryList,e)}`)
    }
    return (
        <Form.Item labelCol={{span:3}} wrapperCol={{span:10}} label="选择商品分类">
            <Cascader
                value={res}
                options={categoryList}
                onChange={selectChange}
                changeOnSelect
            >
            </Cascader>
        </Form.Item>
       
    )
}