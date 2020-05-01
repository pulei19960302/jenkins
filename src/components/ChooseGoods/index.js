/**
 * 关联商品弹窗
 * props: 
 * submit 确认回调 参数 ids(最终的所有id) idDetail(最终的所有detail)
 * visible 是否展示
 * toogle  修改visible的方法
 * choosed 已经选择的商品id数组
 */

import React, { Component } from 'react'
import { Modal, Button, Row, Col, TreeSelect, Select, Input, Pagination, Checkbox } from 'antd'
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

      // 下拉数据准备
      categoryList: [], // 商品类目列表，二级
      brandsList: [], // 品牌下拉
      labelList: [], // 商品标签下拉，二级


      goodsList: [],

      originChoosed: [],
      nowChoosed: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.choosed !== state.originChoosed) {
      return {
        originChoosed: props.choosed,
        nowChoosed: props.choosed,
      }
    }
    return null
  }


  componentDidMount() {
    $api.category.categoryList().then((res) => { // 获取商品类目下拉数据
      if (!res.data) return
      this.setState({ categoryList: res.data.item })
    })
    $api.brands.brandsSelectList().then((res) => { // 获取商品品牌下拉数据
      if (!res.data) return
      this.setState({ brandsList: res.data.item })
    })
    $api.label.labelList().then((res) => { // 获取商品标签下拉数据
      if (!res.data) return
      if (res.code === 0) {
        const { item = [] } = res.data
        this.setState({
          labelList: item && item.map((el) => {
            const { id = '', label = '' } = el
            return {
              id,
              name: label,
            }
          })
        })
      }
    })
    this.requestProductList()
  }
  // 统一封装的列表请求
  requestProductList = (params = {}) => {
    const { paginationState } = this.state
    // 筛选条件
    let toInjectParams = {}
    const { productCategoryQuery, brandsQuery, productTagQuery, keywordsQuery } = this.state
    if (productCategoryQuery.length) {
      toInjectParams.goods_category_ids = productCategoryQuery
    }
    if (brandsQuery.length) {
      toInjectParams.goods_brand_id = brandsQuery
    }
    if (productTagQuery.length) {
      toInjectParams.label_ids = productTagQuery
    }
    if (keywordsQuery !== '') {
      toInjectParams.goods_title = keywordsQuery
    }

    $api.product.productESList({
      page: paginationState.current,
      page_size: PAGE_SIZE,
      ...toInjectParams,
      ...params
    }).then((res) => {
      const { paginationState } = this.state
      this.setState({
        paginationState: {
          ...paginationState,
          total: res.data && res.data.total
        },
        goodsList: res.data.data || []
      })
    })
  }
  handleModalOK = () => {
    $api.product.productGetByIds({
      goods_ids: this.state.nowChoosed
    }, { loading: true }).then(res => {
      this.props.submit(this.state.nowChoosed, res.data || [])
      this.props.toogle(false)
      this.setState({
        originChoosed: [],
        nowChoosed: []
      })
    })
  }
  handleModalCancel = () => {
    this.setState({
      originChoosed: [],
      nowChoosed: []
    })
    this.props.toogle(false)
  }
  handleClickProductCard = (goods_id, checked) => {
    const nowChoosed = this.state.nowChoosed.slice(0)
    if (checked) {
      const index = nowChoosed.findIndex(it => it === goods_id)
      nowChoosed.splice(index, 1)
    } else {
      nowChoosed.push(goods_id)
    }
    this.setState({
      nowChoosed
    })
  }
  handlePageChange = (page) => {
    const { paginationState } = this.state
    this.setState({
      paginationState: {
        ...paginationState,
        current: page,
      },
    }, () => {
      this.requestProductList()
    })
  }
  allCheck = (allChecked) => {
    let { goodsList, nowChoosed } = this.state
    const ids = goodsList.map(it => it.goods_id)
    if (allChecked) {
      const newChoosed = []
      nowChoosed.forEach((it, i) => {
        if (!ids.includes(it)) {
          newChoosed.push(it)
        }
      })
      nowChoosed = newChoosed
    } else {
      ids.forEach(it => {
        if (!nowChoosed.includes(it)) {
          nowChoosed.push(it)
        }
      })
    }
    this.setState({
      nowChoosed: nowChoosed.slice(0)
    })
  }
  handleFilterQuery = () => {
    this.handlePageChange(1)
  }
  // 重置筛选条件
  resetQuery = () => {
    this.setState({
      productCategoryQuery: [], // 商品类目筛选条件
      brandsQuery: [], // 商品品牌筛选条件
      productTagQuery: [], // 商品标签筛选条件
      keywordsQuery: '', // 关键词筛选条件
    }, () => {
      this.handlePageChange(1)
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
    const { goodsList, nowChoosed } = this.state
    return (
      <Row className={styles.productAreaWrapper} gutter={8}>
        {
          goodsList && goodsList.map((product, productIndex) => {
            return <ProductCard data={product} handleClickProductCard={this.handleClickProductCard} checked={nowChoosed&&nowChoosed.includes(product.goods_id)} key={productIndex} />
          })
        }
      </Row>
    )
  }
  // 渲染底部分页区域
  renderFooter = () => {
    const { paginationState, nowChoosed, goodsList } = this.state
    const ids = goodsList.map(it => it.goods_id)
    let allChecked = false
    if (ids.every(it => nowChoosed&&nowChoosed.includes(it))) {
      allChecked = true
    }
    if (goodsList.length === 0) {
      allChecked = false
    }
    return (
      <div className={styles.footerWrapper}>
        <div><Checkbox onChange={() => { this.allCheck(allChecked) }} checked={allChecked}>全选本页</Checkbox></div>
        <div className="flex1 taRight">
          <Pagination current={paginationState.current} total={paginationState.total}
            pageSize={PAGE_SIZE} onChange={this.handlePageChange} />
        </div>
      </div>
    )
  }
  render() {
    const { categoryList, productCategoryQuery, brandsList, brandsQuery, labelList, productTagQuery,
      keywordsQuery } = this.state

    const { visible } = this.props
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
    const TagSelect = this.renderSelect(labelList, {
      placeholder: '请选择商品标签',
      value: productTagQuery,
      onChange: (value) => { this.setState({ productTagQuery: value }) }
    })

    return (
      <Modal
        title="关联商品"
        width={'90%'}
        centered={true}
        visible={visible}
        onOk={this.handleModalOK}
        onCancel={this.handleModalCancel}
      >
        {/* 筛选条件区域 */}
        <div className="dpflex">
          <div className="flex1">
            <Row gutter={8}>
              <Col span={6}>
                <Input placeholder="请输入搜索关键词" value={keywordsQuery} onChange={(e) => { this.setState({ keywordsQuery: e.target.value }) }} />
              </Col>
              <Col span={6}>{ProductCategoryTreeSelect}</Col>
              <Col span={6}>{BrandSelect}</Col>
              <Col span={6}>{TagSelect}</Col>
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


function ProductCard({ data, checked, handleClickProductCard }) {
  const { goods_id, title, main_img, shop_price, total_stock } = data

  let cardStyle = {}
  if (checked) {
    cardStyle.borderColor = 'rgba(24, 144, 255, 1)'
  }
  return (
    <Col span={6} key={goods_id}>
      <div className={styles.productCard} style={cardStyle} onClick={() => { handleClickProductCard(goods_id, checked) }}>
        <img src={main_img} className={styles.productImg} />
        <div className={styles.productRightBox}>
          <div className={styles.productTitle}>{title}</div>
          <div className={styles.productRightBottomBox}>
            <div><span className="fs16">¥</span>{shop_price}</div>
            <div>{`库存:${total_stock}`}</div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default RelateProduct
