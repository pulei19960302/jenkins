import React,{PureComponent} from 'react'
import { CommonTable } from 'components';
import { getPageColumns,searchFields } from './pageFields'
import { pagination } from 'utils/model'

export default class PageList extends PureComponent{
    state={
        loading:false,
        list:[],
        pagination,
        query:{}
    }
    componentDidMount(){
        this.getList()
    }
    getList=(payload)=>{
        const { pagination,query } = this.state
        const { pageSize,current:page } = pagination
        const params = {page,pageSize,...payload,...query}
        $api.shop.getPageList({page,pageSize,page_type_id:2,...payload,...query},{loadingFn:this.toogleLoading}).then(res=>{
            this.setState({
                list: res.data.items,
                pagination:{
                    total: res.data.count,
                    current: params.page,
                    pageSize: params.pageSize,
                }
            })
        })
    }
    onSearch=(query)=>{
        this.setState({
            query,
        },()=>{
            this.getList({page:1})
        })
    }
    toogleLoading=(loading)=>{
        this.setState({
            loading
        })
    }
    render(){
        const { loading,list,pagination } = this.state
        const { getList,onSearch } = this
        const { linkParams,onCheck } = this.props
        return (
            <CommonTable
                columns={getPageColumns(linkParams,onCheck)}
                loading={loading}
                dataSource={list}
                getList={getList}
                onSearch={onSearch}
                pagination={pagination}
                searchFields={searchFields}
                tableProps={{pagination:true}}
            ></CommonTable>
        )
    }
}