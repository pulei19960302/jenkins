import React,{PureComponent} from 'react'
import { CommonTable } from 'components';
import { getColumns,searchFields } from './productFields'
import { pagination } from 'utils/model'

export default class ProductList extends PureComponent{
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
        const params = {page,pageSize,...payload,...query,goods_status:2}
        $api.product.productESList(params,{loadingFn:this.toogleLoading}).then(res=>{
            this.setState({
                list: res.data.data,
                pagination:{
                    total: res.data.total,
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
                columns={getColumns(linkParams,onCheck)}
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