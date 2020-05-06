import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, TabsBar, SearchForm, Pagination } from 'components'
import { getSearchFields, tabsFilds } from './components/fields'
import { List, Result } from './components'

@connect(({ orderList, loading }) => ({  orderList, loading }))
class OrderList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 查询列表回调
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'orderList/getList',
      payload,
    })
  }
  // 获取切页字段
  getTabs() {
    const { tabsNum } = this.props.orderList
    let tabs = [...tabsFilds]
    if (tabsNum) {
      tabs = tabs.map(el => {
        const o = { ...el }
        if(tabsNum[o.key]){
          o.title = `${o.title}(${tabsNum[o.key].num})`
        }
        return o
      })
    }
    return tabs
  }
  // 切页
  tabsChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch({ type: 'orderList/updateState', payload: { status: value } })
    dispatch({ type: 'orderList/getList', payload: { page: 1 } })
    dispatch({ type: 'orderList/orderSta'})
  }
  // 查询与重置
  handleSearch = (search) => {
    const { dispatch } = this.props
    dispatch({ type: 'orderList/onSearch', payload: search })
    dispatch({ type: 'orderList/getList', payload: { page: 1 } })
  }
  // 点击分页
  pageChange = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({ type: 'orderList/getList', payload: { page, pageSize } })
  }
  render() {
    const { loading, orderList } = this.props
    const { pagination, result, list, query, status } = orderList
    const searchFormProps = {
      search: query,
      fields: getSearchFields(),
      onSearch: this.handleSearch,
    }
    const btns = [{
      type: 'export',
      url: '/order/export',
      query,
      permission: $api.order.orderImport.permission()
    }].filter(item=>item.permission)

    const listProps = {
      list,
      loading: loading.effects['orderList/getList'],
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
        <Result {...result} />
        <List {...listProps} />
        <Pagination paginationProps={paginationProps} />
      </Page>
    )
  }
}
export default OrderList
