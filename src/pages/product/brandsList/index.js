import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, PageTitle } from 'components'
import CommonTable from 'components/CommonTable'
import { getColumns, searchFields } from './components/fields'
import BrandsDetails from './components/BrandsDetails'
import BrandsEdit from './components/BrandsEdit'
import { Modal, Button, Radio } from 'antd'
@connect(({ user, brandsList, loading }) => ({
  user,
  loading,
  brandsList,
}))
class BrandList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBrandsDetails: false, // 详情弹窗状态
      brandsData: {}, // 详情弹窗传入内容
      showBrandsEdit: false, // 新增/编辑弹窗状态
      editBrandsData: {}, // 新增/编辑传入弹窗组件的数据
      operationType: '', // 类型：区分是编辑还是新增
      operationId: '', // 选中进行操作的ID
      modalTitle: '', // 二次确认弹窗标题
      modalContent: '', // 二次确认弹窗内容
      affirmVisible: false, // 二次确认弹窗状态
      confirmStatus: 0, // 是否下架商品
      confirmType: '', // 区分是删除还是禁用
    }
  }
  saveFormRef = formRef => {
    this.formRef = formRef
  }
  // 更多操作
  tableMoreClick = (key, row) => {
    const id = row.id
    this.setState({
      operationId: id,
      confirmStatus: 0,
    })
    switch (key) {
      case 'del':
        this.setState({
          modalTitle: '删除品牌',
          modalContent: '删除品牌时是否需要下架相关的商品？',
          affirmVisible: true,
          confirmType: 'del',
        })
        break
      case 'up':
        this.toogleBrandsStatus(id, 1, 0)
        break
      case 'disable':
        this.setState({
          modalTitle: '禁用品牌',
          modalContent: '禁用品牌时是否需要下架相关的商品？',
          affirmVisible: true,
          confirmType: 'disable',
        })
        break
    }
  }
  // 品牌新增/编辑接口调用
  toogleCreate = values => {
    const { operationType, operationId } = this.state
    if (operationType === 'create') {
      $api.brands.brandsAdd(values, { success: true }).then(_ => {
        this.toogleEdit(false)
        this.props.dispatch({ type: `brandsList/getList` })
      })
    }
    if (operationType === 'edit') {
      values.id = operationId
      $api.brands.brandsEdit(values, { success: true }).then(_ => {
        this.toogleEdit(false)
        this.props.dispatch({ type: `brandsList/getList` })
      })
    }
  }
  // 品牌二次确认radio选择
  modalRadioChange = e => {
    this.setState({
      confirmStatus: e.target.value,
    })
  }
  // 品牌二次确认弹窗确定
  affirmOk = () => {
    const { confirmType, operationId, confirmStatus } = this.state
    switch (confirmType) {
      case 'del':
        this.brandsDel(operationId, confirmStatus)
        break
      case 'disable':
        this.toogleBrandsStatus(operationId, 2, confirmStatus)
        break
      case 'batchDel':
        this.batchBrandsDel(operationId, confirmStatus)
        break
      case 'batchDisable':
        this.toogleBatchBrandsStatus(operationId, 2, confirmStatus)
        break
    }
  }
  // 品牌二次确认弹窗取消
  affirmCancel = () => {
    this.setState({
      affirmVisible: false,
    })
  }
  // 品牌编辑弹窗
  toogleEdit = (showBrandsEdit, type, editBrandsData = {}) => {
    this.setState({
      showBrandsEdit,
      editBrandsData,
      operationType: type,
    })
    if (Object.keys(editBrandsData.length > 0)) {
      this.setState({
        operationId: editBrandsData.id,
      })
    }
  }
  // 品牌详情弹窗
  goDetail = (showBrandsDetails, row) => {
    this.setState({
      showBrandsDetails,
      brandsData: row,
    })
  }
  // 批量操作
  mutipulClick = (key, items) => {
    const ids = items.join(',')
    this.setState({
      operationId: ids,
      confirmStatus: 0,
    })
    switch (key) {
      case 'del':
        this.setState({
          modalTitle: '删除品牌',
          modalContent: '删除品牌时是否需要下架相关的商品？',
          affirmVisible: true,
          confirmType: 'batchDel',
        })
        break
      case 'up':
        this.toogleBatchBrandsStatus(ids, 1, 0)
        break
      case 'disable':
        this.setState({
          modalTitle: '禁用品牌',
          modalContent: '禁用品牌时是否需要下架相关的商品？',
          affirmVisible: true,
          confirmType: 'batchDisable',
        })
        break
    }
  }
  // 删除用户
  brandsDel = (id, confirm) => {
    $api.brands.brandsDel({ id, confirm }, { success: true }).then(_ => {
      this.setState({
        affirmVisible: false,
      })
      this.props.dispatch({ type: `brandsList/getList` })
    })
  }
  // 批量删除用户
  batchBrandsDel = (ids, confirm) => {
    $api.brands.brandsBatchDel({ ids, confirm }, { success: true }).then(_ => {
      this.setState({
        affirmVisible: false,
      })
      this.props.dispatch({ type: `brandsList/getList` })
    })
  }
  // 切换品牌状态
  toogleBrandsStatus(id, status, confirm) {
    $api.brands
      .brandsStatus({ id, status, confirm }, { success: true })
      .then(_ => {
        this.setState({
          affirmVisible: false,
        })
        this.props.dispatch({ type: `brandsList/getList` })
      })
  }
  // 批量切换品牌状态
  toogleBatchBrandsStatus(ids, status, confirm) {
    $api.brands
      .brandsBatchStatus({ ids, status, confirm }, { success: true })
      .then(_ => {
        this.setState({
          affirmVisible: false,
        })
        this.props.dispatch({ type: `brandsList/getList` })
      })
  }
  // 获取数据列表
  getList = ({ page, pageSize }) => {
    const { dispatch } = this.props
    dispatch({
      type: `brandsList/getList`,
      payload: { page, pageSize },
    })
  }
  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `brandsList/onSearch`, payload: query })
    dispatch({ type: `brandsList/getList`, payload: query })
  }
  render() {
    const {
      showBrandsDetails,
      brandsData,
      operationType,
      editBrandsData,
      showBrandsEdit,
      modalTitle,
      modalContent,
      affirmVisible,
      confirmStatus,
    } = this.state
    const {
      goDetail,
      toogleEdit,
      mutipulClick,
      getList,
      onSearch,
      toogleCreate,
      affirmOk,
      affirmCancel,
    } = this
    const { brandsList, loading } = this.props
    const { list, pagination } = brandsList

    const btns = $api.brands.brandsAdd.permission()?[
      {
        icon: 'plus',
        type:'primary',
        name: '新增品牌',
        handleClick: this.toogleEdit.bind(this, true, 'create'),
      },
    ]:[]

    const mutipulBtns = [
      {
        name: '启用',
        key: 'up',
        permission: $api.brands.brandsBatchStatus.permission(),
      },
      {
        name: '禁用',
        key: 'disable',
        permission: $api.brands.brandsBatchStatus.permission(),
      },
      {
        name: '删除',
        key: 'del',
        permission: $api.brands.brandsBatchDel.permission(),
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
          loading={loading.effects[`brandsList/getList`]}
          columns={getColumns.call(this)}
          searchFields={searchFields}
          mutipulClick={mutipulClick}
          mutipulBtns={mutipulBtns}
        />
        <BrandsDetails
          brandsData={brandsData}
          details={goDetail}
          visible={showBrandsDetails}
        ></BrandsDetails>
        <BrandsEdit
          wrappedComponentRef={this.saveFormRef}
          editData={editBrandsData}
          toogle={toogleEdit}
          create={toogleCreate}
          visible={showBrandsEdit}
          type={operationType}
        ></BrandsEdit>
        <Modal
          title={modalTitle}
          visible={affirmVisible}
          onOk={affirmOk}
          onCancel={affirmCancel}
        >
          <div>
            {modalContent}
            <Radio.Group onChange={this.modalRadioChange} value={confirmStatus}>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          </div>
        </Modal>
      </Page>
    )
  }
}

export default BrandList
