import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import { Page, PageTitle, SearchForm, Pagination } from 'components'
import { getSearchFields } from './components/fields'
import { List, Result } from './components'

@connect(({ sendGoods, loading }) => ({ sendGoods, loading }))
class sendGoods extends PureComponent {
  state = {
  }
  // 查询列表回调
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: 'sendGoods/getList',
      payload,
    })
  }
  // 查询与重置
  handleSearch = (search) => {
    const { dispatch } = this.props
    dispatch({ type: 'sendGoods/onSearch', payload: search })
    dispatch({ type: 'sendGoods/getList', payload: { page: 1 } })
  }
  // 点击分页
  pageChange = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({ type: 'sendGoods/getList', payload: { page, pageSize } })
  }

  // 一键发货
  handDeliverySend = () => {
    $api.order.batchSendGoods().then(res => {
      if (res.data === 0) {
        return message.info(`快递单号未设置，请先保存`)
      }
      message.info(`成功发出${res.data}个订单`)
      this.getList({ page: 1 })
    })
  }

  render() {
    const { loading, sendGoods } = this.props
    const { pagination, list, query, result } = sendGoods
    const searchFormProps = {
      search: query,
      fields: getSearchFields(),
      onSearch: this.handleSearch,
    }
    const btns = [
      {
        name: '一键发货',
        type: 'primary',
        handleClick: this.handDeliverySend,
        permission: $api.order.batchSendGoods.permission()
      },
      {
        type: 'templateDowbload',
        templateUrl: '/delivery_template.xlsx',
        permission: $api.order.orderImport.permission()
      },
      {
        type: 'import',
        action: '/order/deliver-import',
        ImportSuccess: () => this.getList({ page: 1 }),
        permission: $api.order.orderImport.permission()
      },
      {
        type: 'export',
        url: '/order/export',
        query: {
          ...query,
          status: 2
        },
        permission: $api.order.orderImport.permission()
      },
    ].filter(item => item.permission)

    const listProps = {
      list,
      loading: loading.effects['sendGoods/getList'],
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
        <PageTitle btns={btns}></PageTitle>
        <SearchForm {...searchFormProps} />
        <Result {...result} />
        <List {...listProps} />
        <Pagination paginationProps={paginationProps} />
      </Page>
    )
  }
}
export default sendGoods