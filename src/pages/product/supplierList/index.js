import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle } from 'components'
import CommonTable from 'components/CommonTable'
import DrawerDetail from 'components/DrawerDetail'
import { getColumns, searchFields, getDrawerData } from './components/fields'
import { Modal, Button } from 'antd'
@connect(({ user, supplierList, loading }) => ({
  user,
  loading,
  supplierList,
}))
class SupplierList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBrandsDetails: false,
      brandsData: {},
      showBrandsEdit: false,
      editBrandsData: {},
      operationType: '',
      detailVisible: false,
      detailsData: {},
    }
  }
  // 更多操作
  tableMoreClick = (key, row) => {
    const id = row.id
    switch (key) {
      case 'del':
        this.supplierDel(id)
        break
      case 'up':
        this.supplierStatusSingle(id, 1)
        break
      case 'disable':
        this.supplierStatusSingle(id, 2)
        break
    }
  }
  // 品牌详情弹窗
  goDetail = (detailVisible, details) => {
    this.setState({
      detailVisible,
      detailsData: details,
    })
  }
  // 供应商编辑
  supplierEdit = id => {
    this.props.history.push({
      pathname: `/product/supplierEdit/${id}`,
    })
  }
  // 批量操作
  mutipulClick = (key, items) => {
    const ids = items.join(',')
    switch (key) {
      case 'del':
        this.supplierDelBatch(ids)
        break
      case 'up':
        this.supplierStatusBatch(ids, 1)
        break
      case 'disable':
        this.supplierStatusBatch(ids, 2)
        break
    }
  }
  // 删除供应商
  supplierDel = id => {
    Modal.confirm({
      title: '确认删除所选供应商?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        $api.supplier.supplierDel({ id }, { success: true }).then(_ => {
          this.props.dispatch({ type: `supplierList/getList` })
        })
      },
    })
  }
  // 批量删除供应商
  supplierDelBatch = ids => {
    Modal.confirm({
      title: '确认批量删除所选用户么?',
      onOk: () => {
        $api.supplier.supplierDelBatch({ ids }, { success: true }).then(_ => {
          this.props.dispatch({ type: `supplierList/getList` })
        })
      },
    })
  }
  // 单条切换供应商状态
  supplierStatusSingle(id, status) {
    $api.supplier.supplierStatus({ id, status }, { success: true }).then(_ => {
      this.props.dispatch({ type: `supplierList/getList` })
    })
  }
  // 批量切换供应商状态
  supplierStatusBatch(ids, status) {
    $api.supplier
      .supplierStatusBatch({ ids, status }, { success: true })
      .then(_ => {
        this.props.dispatch({ type: `supplierList/getList` })
      })
  }
  // 获取数据列表
  getList = ({ page, pageSize }) => {
    const { dispatch } = this.props
    dispatch({
      type: `supplierList/getList`,
      payload: { page, pageSize },
    })
  }
  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `supplierList/onSearch`, payload: query })
    dispatch({ type: `supplierList/getList`, payload: query })
  }
  render() {
    const { detailVisible, detailsData } = this.state
    const { goDetail, supplierEdit, mutipulClick, getList, onSearch } = this
    const { supplierList, loading } = this.props
    const { list, pagination, query } = supplierList
    const { current: page, pageSize } = supplierList.pagination

    const btns = []
    if($api.supplier.supplierAdd.permission()){
      btns.push({
        icon: 'plus',
        type:'primary',
        name: '新增供应商',
        handleClick: this.supplierEdit.bind(this, 0),
      })
    }
    if($api.supplier.supplierDownload.permission()){
      btns.push({
        type: 'export',
        url: $api.supplier.supplierDownload.url,
        query: {
          page,
          pageSize,
          ...query,
        },
      })
    }

    const mutipulBtns = [
      {
        name: '启用',
        key: 'up',
        permission: $api.supplier.supplierStatusBatch.permission(),
      },
      {
        name: '禁用',
        key: 'disable',
        permission: $api.supplier.supplierStatusBatch.permission(),
      },
      {
        name: '删除',
        key: 'del',
        permission: $api.supplier.supplierDelBatch.permission(),
      },
    ].filter(it => it.permission || it.permission === undefined)
    return (
      <Page inner>
        <PageTitle btns={btns} />
        <CommonTable
          dataSource={list}
          getList={getList}
          onSearch={onSearch}
          pagination={pagination}
          loading={loading.effects[`supplierList/getList`]}
          columns={getColumns.call(this)}
          searchFields={searchFields}
          mutipulClick={mutipulClick}
          mutipulBtns={mutipulBtns}
        />
        <DrawerDetail
          visible={detailVisible}
          close={goDetail}
          detailsFields={getDrawerData}
          dataSource={detailsData}
        />
      </Page>
    )
  }
}

export default SupplierList
