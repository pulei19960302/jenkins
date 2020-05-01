import React,{PureComponent} from 'react'
import { Table,Checkbox } from 'antd'
import { pagination } from 'utils/model'
import { ENUMS,System_page } from './fields'


function getColumns(linkType,onCheck){
    return [
        {
            title: '页面名称',
            dataIndex: 'name',
            key:'linkType'
        },
        {
            title: '操作',
            fixed: 'right',
            width: 180,
            render:(text,row)=>{
                return (
                    <div>
                        <Checkbox onChange={e=>{
                            if(e.target.checked){
                                onCheck('',row.linkType,`系统页面:${row.name}`)
                            }else{
                                onCheck('','','')
                            }
                        }} checked={linkType===row.linkType}></Checkbox>
                    </div>
                )
            }
        }
    ]
}

export default class PageList extends PureComponent{
    state={
        loading:false,
        list:[],
        pagination,
        query:{}
    }
    
    render(){
        const { linkType,onCheck } = this.props
        return (
            <Table dataSource={System_page} columns={getColumns(linkType,onCheck)} />
        )
    }
}