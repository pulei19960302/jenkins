/**
 * 关联商品弹窗
 * method: open() // TODO: 增加参数可以支持会写数据
 * props: onOk(selectedDataList)
 */

import React, { Component } from 'react'
import { Modal, Button, Row, Col, TreeSelect, Select, Input, Pagination, Checkbox } from 'antd'
import _ from 'lodash'
import * as utils from './utils'
import styles from './index.less'

const SelectOption = Select.Option
const TreeSelectNode = TreeSelect.TreeNode

const PAGE_SIZE = 24

class RelateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 请求接口
      productCategoryQuery: [], // 商品类目筛选条件
      brandsQuery: [], // 商品品牌筛选条件
      productTagQuery: [], // 商品标签筛选条件
      keywordsQuery: '', // 关键词筛选条件
      paginationState: { // 受控的分页配置
        current: 1, // 当前页数
        total: 0, // 总条数
      },

      // 数据记录
      selectedProduct: {}, // map 各页已请求的商品，并记录选中态
      stashSelectedProduct: {}, // 暂存的已选商品，用于取消时的状态回退

      // UI
      modalVisible: false,
      checkboxChecked: false, // 是否选中全页

      // 下拉数据准备
      categoryList: [], // 商品类目列表，二级
      brandsList: [], // 品牌下拉
      labelList: [], // 商品标签下拉，二级
    }
  }
  open = (toCheckedProducts) => { // 实例方法，打开弹窗
    const { selectedProduct } = this.state
    let toSetState = {
      modalVisible: true,
      stashSelectedProduct: selectedProduct // 暂存的已选商品，用于取消时的状态回退
    }

    if (toCheckedProducts && toCheckedProducts.length) { // 进行商品回填
      const { selectedProduct } = this.state
      let cloneSelectedProduct = _.cloneDeep(selectedProduct)
      for (let key in cloneSelectedProduct) {
        cloneSelectedProduct[key] = cloneSelectedProduct[key].map((productItem) => {
          const toSetChecked = toCheckedProducts.findIndex((item) => { return item.goods_id == productItem.goods_id }) === -1 ? false : true
          return {
            ...productItem,
            checked: toSetChecked
          }
        })
      }
      toSetState.selectedProduct = cloneSelectedProduct
      toSetState.stashSelectedProduct = cloneSelectedProduct
    }

    this.setState(toSetState)
  }
  componentDidMount() {
    $api.category.categoryList().then((res) => { // 获取商品类目下拉数据
      this.setState({ categoryList: res.data.item })
    })
    $api.brands.brandsList().then((res) => { // 获取商品品牌下拉数据
      this.setState({ brandsList: res.data.item })
    })
    $api.label.getLabel().then((res) => { // 获取2级标签嵌套数据
      if (res.code === 0) {
        this.setState({
          labelList: res.data.map((labelGroup) => {
            const { category_id, category_name, item } = labelGroup
            return {
              id: category_id,
              name: category_name,
              sub: item
                ? item.map((item) => ({ id: item.label_id, name: item.label }))
                : []
            }
          })
        })
      }
    })
    this.requestProductList({}, true)
  }
  // 统一封装的列表请求
  requestProductList = (params = {}, isClear = false, isFromFilter = false) => {
    const { paginationState, selectedProduct } = this.state

    if (!isClear && selectedProduct[paginationState.current]) { // 已请求该页数据，仅做视图切换
      return false
    }

    // 筛选条件
    let toInjectParams = {}
    if (isFromFilter) { // 是点击筛选条件查询进来的
      const { productCategoryQuery, brandsQuery, productTagQuery, keywordsQuery } = this.state
      if (productCategoryQuery.length) {
        toInjectParams.goods_category_ids = productCategoryQuery
      }
      if (brandsQuery.length) {
        toInjectParams.goods_brand_id = brandsQuery[0]
      }
      if (productTagQuery.length) {
        toInjectParams.label_ids = productTagQuery
      }
      if (keywordsQuery !== '') {
        toInjectParams.goods_title = keywordsQuery
      }
    }

    $api.product.productESList({
      page: paginationState.current,
      page_size: PAGE_SIZE,
      ...toInjectParams,
      ...params
    }).then((res) => {
      if (res.code === 0) {
        const { paginationState, selectedProduct } = this.state
        const toSetSelectedProduct = isClear
          ? utils.getInitialSelectedProduct(res.data && res.data.data, paginationState.current)
          : utils.getInjetcedSelectedProduct(res.data && res.data.data, paginationState.current, selectedProduct)
        this.setState({
          selectedProduct: toSetSelectedProduct,
          paginationState: {
            ...paginationState,
            total: res.data && res.data.total
          }
        })
      }
    })
  }
  handleModalOK = () => {
    const { onOk } = this.props
    const { selectedProduct } = this.state

    let distData = []
    for (let key in selectedProduct) {
      selectedProduct[key].forEach((item) => {
        if (item.checked) {
          distData.push(item)
        }
      })
    }

    if (onOk) { onOk(distData) }
    this.setState({ modalVisible: false, checkboxChecked: false })
  }
  handleModalCancel = () => {
    const { selectedProduct, stashSelectedProduct } = this.state
    this.setState({
      modalVisible: false,
      checkboxChecked: false,
      selectedProduct: stashSelectedProduct
    })
  }
  handleClickProductCard = (cardIndex) => {
    const { selectedProduct, paginationState } = this.state
    let cloneSelectedProduct = _.cloneDeep(selectedProduct)
    cloneSelectedProduct[paginationState.current][cardIndex].checked = !cloneSelectedProduct[paginationState.current][cardIndex].checked
    this.setState({ selectedProduct: cloneSelectedProduct })
  }
  handlePageChange = (page) => {
    const { paginationState } = this.state
    this.setState({
      paginationState: {
        ...paginationState,
        current: page,
      },
      checkboxChecked: false,
    }, () => {
      this.requestProductList()
    })
  }
  handleCheckBoxChange = (e) => {
    const { selectedProduct, paginationState } = this.state
    const toSetChecked = e.target.checked
    let cloneSelectedProduct = _.cloneDeep(selectedProduct)

    cloneSelectedProduct[paginationState.current] = cloneSelectedProduct[paginationState.current].map((item) => ({
      ...item,
      checked: toSetChecked
    }))

    this.setState({
      selectedProduct: cloneSelectedProduct,
      checkboxChecked: toSetChecked,
    })
  }
  handleFilterQuery = () => {
    this.requestProductList({}, true, true)
  }
  // 重置筛选条件
  resetQuery = () => {
    this.setState({
      productCategoryQuery: [], // 商品类目筛选条件
      brandsQuery: [], // 商品品牌筛选条件
      productTagQuery: [], // 商品标签筛选条件
      keywordsQuery: '', // 关键词筛选条件
    }, () => {
      this.requestProductList({}, true, true)
    })
  }
  // 统一生成下拉树选择控件
  renderTreeSelect = (treeSelectData, props) => {
    return (
      <TreeSelect
        treeNodeFilterProp="title"
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        allowClear
        {...props}
      >
        {
          treeSelectData.map(({ id, name, sub }) => {
            return (
              <TreeSelectNode value={id} title={name} key={id}>
                {
                  sub
                    ? sub.map((subData) => (<TreeSelectNode value={subData.id} title={subData.name} key={subData.id} />))
                    : null
                }
              </TreeSelectNode>
            )
          })
        }
      </TreeSelect>
    )
  }
  // 统一生成下拉选择组件
  renderSelect = (selectData, props) => {
    const selectProps = {
      style: { width: '100%' },
      filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      ...props,
    }
    return (
      <Select {...selectProps}>
        {selectData.map((optionData, optionIndex) => {
          const { id, name } = optionData
          return <SelectOption key={id}>{name}</SelectOption>
        })}
      </Select>
    )
  }
  // 渲染商品区域
  renderProductArea = () => {
    const { selectedProduct, paginationState } = this.state
    const toRenderList = selectedProduct[paginationState.current] ? selectedProduct[paginationState.current] : []

    const ProductCard = (props) => {
      const { data, productIndex } = props
      const { goods_id, title, main_img, shop_price, total_stock, checked } = data

      let cardStyle = {}
      if (checked) {
        cardStyle.borderColor = 'rgba(24, 144, 255, 1)'
      }

      return (
        <Col span={6} key={goods_id}>
          <div className={styles.productCard} style={cardStyle} onClick={() => { this.handleClickProductCard(productIndex) }}>
            <img src={main_img} className={styles.productImg} />
            <div className={styles.productRightBox}>
              <div className={styles.productTitle}>{title}</div>
              <div className={styles.productRightBottomBox}>
                <div className="flex1"><span className="fs16">¥</span>{shop_price}</div>
                <div className="flex1 taRight">{`库存:${total_stock}`}</div>
              </div>
            </div>
          </div>
        </Col>
      )
    }

    return (
      <Row className={styles.productAreaWrapper} gutter={8}>
        {
          toRenderList.map((product, productIndex) => {
            return <ProductCard data={product} productIndex={productIndex} key={productIndex} />
          })
        }
      </Row>
    )
  }
  // 渲染底部分页区域
  renderFooter = () => {
    const { paginationState, checkboxChecked } = this.state
    return (
      <div className={styles.footerWrapper}>
        <div><Checkbox onChange={this.handleCheckBoxChange} checked={checkboxChecked}>全选本页</Checkbox></div>
        <div className="flex1 taRight">
          <Pagination current={paginationState.current} total={paginationState.total}
            pageSize={PAGE_SIZE} onChange={this.handlePageChange} />
        </div>
      </div>
    )
  }
  render() {
    const { modalVisible, categoryList, productCategoryQuery, brandsList, brandsQuery, labelList, productTagQuery,
      keywordsQuery } = this.state
    // 商品类目下拉
    const ProductCategoryTreeSelect = this.renderTreeSelect(categoryList, {
      multiple: true,
      placeholder: '请选择商品类目',
      value: productCategoryQuery,
      onChange: (value) => { this.setState({ productCategoryQuery: value }) }
    })
    // 品牌下拉
    const BrandSelect = this.renderSelect(brandsList, {
      placeholder: '请选择品牌',
      value: brandsQuery,
      onChange: (value) => { this.setState({ brandsQuery: value }) }
    })
    // 标签下拉
    const TagSelect = this.renderTreeSelect(labelList, {
      multiple: true,
      placeholder: '请选择商品标签',
      value: productTagQuery,
      onChange: (value) => { this.setState({ productTagQuery: value }) }
    })
    return (
      <Modal
        title="关联商品"
        width={1300}
        centered={true}
        visible={modalVisible}
        onOk={this.handleModalOK}
        onCancel={this.handleModalCancel}
      >
        {/* 筛选条件区域 */}
        <div className="dpflex">
          <div className="flex1">
            <Row gutter={8}>
              <Col span={6}>{ProductCategoryTreeSelect}</Col>
              <Col span={6}>{BrandSelect}</Col>
              <Col span={6}>{TagSelect}</Col>
              <Col span={6}>
                <Input placeholder="请输入搜索关键词" value={keywordsQuery} onChange={(e) => { this.setState({ keywordsQuery: e.target.value }) }} />
              </Col>
            </Row>
          </div>
          <div className={styles.queryBtnWrapper}>
            <Button onClick={this.handleFilterQuery} type="primary" className="mr8">查询</Button>
            <Button onClick={this.resetQuery}>重置</Button>
          </div>
        </div>

        {/* 渲染商品区域 */}
        {this.renderProductArea()}

        {/* 渲染底部分页区域 */}
        {this.renderFooter()}
      </Modal>
    )
  }
}

export default RelateProduct
