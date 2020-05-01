import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, TabsBar, SearchForm, Pagination } from 'components'
import { getSearchFields, tabsFilds } from './components/fields'
import List from './components/List'

@connect(({ afterSale, app, loading }) => ({ afterSale, app, loading }))
class AfterSale extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 查询列表回调
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'afterSale/getList',
      payload,
    })
  }
  // 获取切页字段
  getTabs(){
    const { tabsNum } = this.props.afterSale
    let tabs = [...tabsFilds]
    if(tabsNum){
      tabs = tabs.map( el => {
        const o = {...el}
        if(tabsNum[o.key]){
          o.title = `${o.title}(${tabsNum[o.key].num})`
        }
        return o
      })
    }
    return tabs
  }
  // 切页
  tabsChange = ({value})=>{
    const { dispatch } = this.props
    dispatch({ type: 'afterSale/updateState', payload: {status: value} })
    dispatch({ type: 'afterSale/getList', payload: { page: 1 } })
    dispatch({ type: 'afterSale/afterSaleSta'})
  }
  // 查询与重置
  handleSearch = (search)=> {
    const { dispatch } = this.props
    dispatch({ type: 'afterSale/onSearch', payload: search })
    dispatch({ type: 'afterSale/getList', payload: { page: 1 } })
  }
  // 点击分页
  pageChange = (page, pageSize)=> {
    const { dispatch } = this.props
    dispatch({ type: 'afterSale/getList', payload: { page, pageSize } })
  }
  render() {
    const { loading, afterSale } = this.props
    const { pagination, list, query, status } = afterSale
    const searchFormProps = {
      search: query,
      fields: getSearchFields(),
      onSearch: this.handleSearch,
    }
    const btns = [{
      type: 'export',
      url: '/post-sales/export',
      query,
      permission: $api.order.afterSaleDownload.permission()
    }].filter(item=>item.permission)
    const listProps = {
      list,
      loading: loading.effects['afterSale/getList'],
      getList: this.getList
    }
    const paginationProps = {
      ...pagination,
      onChange: this.pageChange,
      onShowSizeChange: (page, pageSize) => {
        return this.pageChange(1, pageSize)
      },
    }
    return (
      <Page inner>
        <TabsBar
          defaultActiveKey={status}
          tabs={this.getTabs()}
          onChange={this.tabsChange}
          btns={btns}
        />
        <SearchForm {...searchFormProps} />
        <List {...listProps} />
        <Pagination paginationProps={paginationProps} />
      </Page>
    )
  }
}
export default AfterSale
