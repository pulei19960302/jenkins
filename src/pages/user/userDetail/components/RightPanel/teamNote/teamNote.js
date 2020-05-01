import React, { PureComponent } from 'react'
import CommonTable from 'components/CommonTable'
import { pagination } from 'utils/model'
import { getColumns,searchFields } from './fields'

class TeamNote extends PureComponent{
    state={
        list:[],
        pagination,
        loading:false,
        query:{} 
    }
    componentDidMount(){
        this.$pageWidth = document.getElementById('userDetailRightPanelContainer').offsetWidth
        this.getList()
    }
    getList=(payload)=>{
        const { pagination,query } = this.state
        const { pageSize,current:page } = pagination
        const params = {page,pageSize,...payload,...query,member_id:this.props.id}
        params.page_size = params.pageSize
        $api.user.userChangeRelation(params,{loadingFn:this.toogleLoading}).then(res=>{
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
    onSearch = query => {
        this.setState({
            query,
        },()=>{
            this.getList({page:1})
        })
    }
    toogleLoading=loading=>{
        this.setState({
            loading
        })
    }
    render(){
        const { list,pagination,loading } = this.state
        const { getList,onSearch } = this
        return (
            <div style={{minHeight:500}}>
                <CommonTable
                    columns={getColumns.call(this)}
                    loading={loading}
                    pagination={pagination}
                    dataSource={list}
                    getList={getList}
                    onSearch={onSearch}
                    searchFields={searchFields}
                    pageProps={{
                        stylePros:{
                            width:this.$pageWidth || 925
                        }
                    }}
                />
            </div>
        )
    }
}
export default TeamNote