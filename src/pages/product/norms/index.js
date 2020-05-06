import React, { PureComponent } from 'react'
import { Modal, Select } from 'antd'
import { connect } from 'dva'
import { CommonTable, Page, PageTitle } from 'components'
import { getColumns, searchFields } from './components/fields'
import NormsModal from './components/NormsModal'

const { confirm } = Modal

@connect(({ normsList, loading }) => ({ normsList, loading }))
class Norms extends PureComponent {

  state = {
    modalVisible: false,
    normsModalProps : {}
  }

  handleDelNorms = (row) => {
    const { dispatch } = this.props
    confirm({
      title: '删除规格',
      content: '是否确认删除当前规格？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.specs
          .delSpecs({id:row.attr_item_id},{success:true})
          .then(res => {
            dispatch({ type: 'normsList/getList', payload: { page: 1 } })
          })
      },
    })
  }

  // 查询与重置
  handleSearch = (search) => {
    const { dispatch } = this.props
    dispatch({ type: 'normsList/onSearch', payload: search })
    dispatch({ type: 'normsList/getList', payload: { page: 1 } })
  }


  toggleModal = () => {
    const { modalVisible } = this.state
    this.setState({
      modalVisible: !modalVisible,
    })
  }

  addNorms = () => {
    this.setState({
      normsModalProps: {
        handleSubmit: this.handleSearch,
        handleCancel: this.toggleModal
      }
    })
    this.toggleModal();
  }

  editNormsModal = (row) => {
    console.log(row, 'row')
    this.setState({
      normsModalProps: {
        handleSubmit: this.handleSearch,
        initForm: row,
        handleCancel: this.toggleModal
      }
    })
    this.toggleModal();
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `normsList/getList`,
      payload,
    })
  }

  render() {

    const { getList } = this;
    const { modalVisible, normsModalProps } = this.state
    const { normsList, loading } = this.props
    const { list, pagination } = normsList
    const btnGroup = [
      {
        icon: 'plus',
        name: '新增规格',
        type: 'primary',
        handleClick: () => this.addNorms(),
        permission: $api.specs.addSpecs.permission()
      }
    ].filter(i => i.permission)


    return (
      <Page inner>
        <PageTitle btns={btnGroup}/>
        <CommonTable
          tableProps={{rowKey: (r, i) => i}}
          loading={loading.effects['normsList/getList']}
          onSearch={this.handleSearch}
          dataSource={list}
          columns={getColumns.call(this)}
          searchFields={searchFields}
          pagination={pagination}
          getList={getList}
        />

        {modalVisible && <NormsModal { ...normsModalProps } handleCancel={this.toggleModal}/>}
      </Page>
    )
  }
}

export default Norms
