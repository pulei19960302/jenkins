import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page,PageTitle } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns, searchFields } from './components/fields'
import { AddPage } from './components/addPage'

@connect(({ shopPageList, loading }) => ({
    loading,
    shopPageList,
  }))
class ShopPageList extends PureComponent{
    state = {
        showAddModal:false
    }
    getList = (payload) => {
        const { dispatch } = this.props
        dispatch({
          type: `shopPageList/getList`,
          payload,
        })
      }
      onSearch = query => {
        const { dispatch } = this.props
        dispatch({ type: `shopPageList/onSearch`, payload: query })
        this.getList(query)
      }
      toogleAddPage=(showAddModal)=>{
        this.setState({
            showAddModal
        })
      }
      del=async (id)=>{
        await $api.shop.delPage({page_dev_id_str:`${id}`},{success:true})
        this.getList()
      }
      prod=async id=>{
          await $api.shop.prod({page_dev_id_str:`${id}`},{success:true})
          this.getList()
      }
      goEdit=(id)=>{
        this.props.history.push({
            pathname: `/shop/decoration/${id}`,
          })
      }
      
    render(){
        const { getList,onSearch,toogleAddPage } = this
        const { showAddModal } = this.state
        const { shopPageList, loading } = this.props
        const { query, list, pagination } = shopPageList
        const searchProp = {
            search: query,
          }
        return (
            <Page inner>
                <PageTitle btns={[
                        {
                            icon: 'plus',
                            type:'primary',
                            name: '添加页面',
                            handleClick: ()=>{toogleAddPage(true)},
                            permission:$api.shop.addPage.permission()
                        },
                    ].filter(it=>it.permission)
                    } 
                />
                <CommonTable
                    dataSource={list}
                    getList={getList}
                    onSearch={onSearch}
                    pagination={pagination}
                    loading={loading.effects[`shopPageList/getList`]}
                    columns={getColumns.call(this)}
                    searchFields={searchFields}
                    searchProp={searchProp}
                />
                <AddPage getList={getList} visible={showAddModal} toogle={toogleAddPage} total={pagination.total}></AddPage>
            </Page>
        )
    }
}

export default ShopPageList