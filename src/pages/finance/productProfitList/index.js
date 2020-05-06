import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, Pagination, SearchForm } from 'components'
import { Row, Col } from 'antd'
import { getColumns, searchFields } from './components/fields'
import Columns from '../components/Columns'
import styles from './index.less'

@connect(({ productProfitList, loading }) => ({ productProfitList, loading }))
class ProductProfitList extends PureComponent {

  handlePageChange = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({ type: 'productProfitList/getList', payload: { page, pageSize } })
  }

  onSearch = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'productProfitList/onSearch', payload })
    dispatch({ type: 'productProfitList/getList', payload })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'productProfitList/getList', payload, })
  }

  renderTotals() {
    return (
      <Row type="flex" justify="space-around" className={styles.totalRow} gutter={16}>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>利润总额&nbsp;(元)</span>
              <span className={styles.num}>116,123,345.21</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>下单总额&nbsp;(元)</span>
              <span className={styles.num}>116,123,345.21</span>
            </div>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.totalCol}>
            <div>
              <span>返利总额&nbsp;(元)</span>
              <span className={styles.num}>116,123,345.21</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.totalCol}>
            <div>
              <span>售后总额&nbsp;(元)</span>
              <span className={styles.num}>116,123,345.21</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

  renderOrders = (order = {}, key = '') => {
    const columnsFields = getColumns()

    return (
      <div className={styles.list} key={key}>
        <div className={styles.listTitle}>
          <span>供应商：123564564</span>
          <span>品牌：123564564</span>
        </div>

        <div className={`${styles.listContent} ${styles.flex}`}>
          {
            columnsFields && columnsFields.map((field) => (
              field.render(order, field)
            ))
          }
        </div>
      </div>
    )
  }

  renderList() {
    const { productProfitList, loading } = this.props
    const { list = [], pagination } = productProfitList

    const listData = list && list.map((order, key) => (
      this.renderOrders(order, key)
    ))

    return listData
  }

  render() {
    const { productProfitList, loading } = this.props
    const { list = [], pagination, query } = productProfitList

    const btns = [
      {
        //icon: 'plus',
        type: 'export',
        name: '导出',
        handleClick: () => { },
        url: '',
        query: {
        }
      }
    ]

    const searchFormProps = {
      search: query,
      fields: searchFields,
      onSearch: this.onSearch,
    }

    const paginationProps = {
      ...pagination,
      onChange: this.handlePageChange,
      onShowSizeChange: (page, pageSize) => {
        return this.handlePageChange(1, pageSize)
      }
    }

    return (
      <Page inner className={styles.afterSaleList}>
        <PageTitle btns={btns} className={styles.totalTitle} />
        {this.renderTotals()}
        <SearchForm {...searchFormProps} />
        <Columns fields={getColumns()} />
        {/* {this.renderList()} */}
        <Pagination paginationProps={paginationProps} />

        {/* for static test */}
        {this.renderOrders()}
      </Page>
    )
  }
}

export default ProductProfitList