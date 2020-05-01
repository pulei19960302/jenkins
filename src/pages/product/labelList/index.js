import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle, Pagination } from 'components'
import { Modal } from 'antd'
import List from './components/List'

@connect(({ loading, productLabelList }) => ({
  loading,
  productLabelList,
}))
class ProductLabelList extends PureComponent {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
    }
  }

  // 批量操作
  mutipulClick = (key, selectKeys) => {
    const ids = selectKeys.join(',');
    switch (key) {
      case 'del':
        this.toogleDelBatch(ids)
        break
      case 'up':
        this.toogleStatusBatch(ids, 1)
        break
      case 'disable':
        this.toogleStatusBatch(ids, 2)
        break
    }
  }

  // 获取数据列表
  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `productLabelList/getList`,
      payload,
    })
  }

  // 点击分页
  pageChange = (page, pageSize) => {
    const { dispatch } = this.props
    dispatch({ type: 'productLabelList/getList', payload: { page, pageSize } })
  }

  // 状态修改
  statusLabel = (id, status) => {
    const { dispatch } = this.props
    $api.label.labelStatus({ id, status }, { success: true }).then(_ => {
      dispatch({ type: `productLabelList/getList` })
    })
  }

  // 批量状态修改
  toogleStatusBatch = (ids, status) => {
    const { dispatch } = this.props
    $api.label.labelStatusBatch({ ids, status }, { success: true }).then(_ => {
      dispatch({ type: `productLabelList/getList` })
    })
  }

  // 删除
  delLabel = id => {
    const { dispatch } = this.props
    Modal.confirm({
      title: '确认删除所选标签么?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        $api.label.labelDel({ id }, { success: true }).then(_ => {
          dispatch({ type: `productLabelList/getList` })
        })
      },
    })
  }

  // 批量删除
  toogleDelBatch = ids => {
    const { dispatch } = this.props
    Modal.confirm({
      title: '确认批量删除所选标签么?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        $api.label.labelDelBatch({ ids }, { success: true }).then(_ => {
          dispatch({ type: `productLabelList/getList` })
        })
      },
    })
  }

  render() {
    const { showfirLabel, operationType } = this.state
    const { loading, productLabelList } = this.props
    const { list, pagination } = productLabelList

    const paginationProps = {
      ...pagination,
      onChange: this.pageChange,
      onShowSizeChange: (page, pageSize) => {
        return this.pageChange(page, pageSize)
      },
    }

    const extendPageProp = {
      btns: [
        {
          name: '批量启用',
          key: 'up',
          permission: $api.label.labelStatusBatch.permission(),
        },
        {
          name: '批量禁用',
          key: 'disable',
          permission: $api.label.labelStatusBatch.permission(),
        },
        {
          name: '批量删除',
          key: 'del',
          type: 'danger',
          permission: $api.label.labelDelBatch.permission(),
        },
      ].filter(it => it.permission || it.permission === undefined),
      mutipulClick: this.mutipulClick,
      paginationProps,
    }

    const listFormProps = {
      deleted: this.delLabel,
      statusSwitch: this.statusLabel,
    }

    const btns = $api.label.labelAdd.permission()?[
      {
        icon: 'plus',
        type:'primary',
        name: '新增标签',
        handleClick: ()=>this.ref.current.showModal('addLabelModal'),
      },
    ]:[]
    return (
      <React.Fragment>
        <Page inner>
          <PageTitle btns={btns} />
          <List list={list} ref={this.ref} getList={this.getList} {...listFormProps} pageProps={extendPageProp}/>
        </Page>
      </React.Fragment>
    )
  }
}

export default ProductLabelList
