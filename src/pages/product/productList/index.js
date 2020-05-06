import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal, message } from 'antd'
import { Page, TabsBar } from 'components'
import CommonTable from 'components/CommonTable'
import { hasBtn, PRODUCT_STATUS } from '../constants'
import { getColumns, getFields, PAGINATION_BTNS, tabsFilds } from './components/fields'

@connect(({ productList, loading }) => ({ loading, productList }))
class ProductList extends PureComponent {
  state = {
    supplierList: [],
    categoryList: []
  }
  componentDidMount() {
    $api.supplier.supplierSelectData().then((res) => { // 获取供应商下拉数据
      this.setState({ supplierList: res.data || [] })
    })

    $api.category.categoryList().then((res) => { // 获取商品类目下拉数据
      this.setState({ categoryList: res.data.item || [] })
    })
  }
  // 获取切页字段
  getTabs() {
    const { tabsNum } = this.props.productList
    let tabs = [...tabsFilds]
    if (tabsNum) {
      tabs = tabs.map(el => {
        const o = { ...el }
        if (tabsNum[o.value]) {
          o.title = `${o.title}(${tabsNum[o.value]})`
        }
        return o
      })
    }
    return tabs
  }
  // 切页
  tabsChange = ({ value }) => {
    const { dispatch } = this.props
    dispatch({ type: 'productList/updateState', payload: { goods_status: value } })
    dispatch({ type: 'productList/getList', payload: { page: 1 } })
    dispatch({ type: 'productList/productSta' })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `productList/getList`,
      payload,
    })
  }

  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `productList/onSearch`, payload: query })
    dispatch({ type: `productList/getList`, payload: query })
  }

  changeProductStatus = (goods_ids, goods_status) => {
    $api.product.productHandle({ goods_ids, goods_status }).then(() => {
      message.success('处理成功！')
      this.table.clearSelectedRowKeys()
      window.setTimeout(() => {
        this.getList()
        this.props.dispatch({ type: 'productList/productSta' })
      }, 500)
    })
  }

  addProduct = () => {
    this.props.history.push("/product/addProduct/")
  }

  editProduct = (goods_id) => {
    this.props.history.push(`/product/addProduct/?id=${goods_id}`)
  }

  copyProduct = (goods_id) => {
    this.props.history.push(`/product/addProduct/?id=${goods_id}&copy=${true}`)
  }

  deleteProducts = (goods_ids, mutipul) => {
    Modal.confirm({
      title: mutipul ? '确认删除所选商品么?' : '确认删除该商品么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.product.productDelete({ goods_ids }).then(() => {
          message.success('删除成功')
          this.getList()
          this.props.dispatch({ type: 'productList/productSta' })
          mutipul && this.table.clearSelectedRowKeys()
        })
      }
    })
  }

  mutipulClick = (key, selectedRowKeys) => {
    switch (key) {
      case 'putaway': // 上架
        this.changeProductStatus(selectedRowKeys, PRODUCT_STATUS.UPPER_SHELF)
        break;
      case 'outOfStock': // 下架
        this.changeProductStatus(selectedRowKeys, PRODUCT_STATUS.LOWER_SHELF)
        break;
      case 'del': // 删除
        this.deleteProducts(selectedRowKeys, true)
        break
    }
  }

  render() {
    const { getList, onSearch } = this
    const { productList, loading } = this.props
    const { goods_status, list, pagination, query } = productList
    const btns = [
      {
        icon: 'plus',
        name: '新增商品',
        type: 'primary',
        handleClick: this.addProduct,
        permission: hasBtn('addProduct')
      },
    ].filter(item => item.permission)
    return (
      <Page inner>
        <TabsBar
          defaultActiveKey={goods_status}
          tabs={this.getTabs()}
          onChange={this.tabsChange}
          btns={btns}
        />
        <CommonTable
          onRef={(ref) => this.table = ref}
          loading={loading.effects[`productList/getList`]}
          tableProps={{
            rowKey: "goods_id"
          }}
          getList={getList}
          onSearch={onSearch}
          dataSource={list}
          mutipulBtns={PAGINATION_BTNS}
          mutipulClick={this.mutipulClick}
          pagination={pagination}
          columns={getColumns.call(this)}
          searchFields={getFields.call(this)}
          searchProp={{ search: query }}
        />
      </Page>
    )
  }
}

export default ProductList
