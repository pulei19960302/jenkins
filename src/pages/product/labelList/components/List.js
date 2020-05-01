import React, { PureComponent } from 'react'
import { Table } from 'antd'
import { getColumns, searchFields } from './fields'
import { AddLabel, EditLabel } from './index'
import { CommonTable } from 'components'

class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectRow: {}, // 选中后传入弹窗的对象
      selectedRowKeys: [], // 勾选项
      addLabelModal: false,
      editLabelModal: false,
      secondCategoryEditModal: false,

    }
  }

  onSearch = query => {
    this.props.getList(query)
  }

  // 弹窗显示
  showModal = (modal, row) => {
    this.setState({
      [modal]: true,
      selectRow: row,
    })
  }

  // 弹窗隐藏
  hideModal = modal => {
    this.setState({
      [modal]: false,
    })
  }

  // 弹窗公共props
  getCommonProps = modal => {
    return {
      selectRow: this.state.selectRow,
      onCancel: () => {
        this.hideModal(modal)
      },
      onOk: () => {},
    }
  }

  // 状态修改
  labelStatusChange = (id, stauts) => {
    this.props.statusSwitch(id, stauts)
  }


  // 标签删除
  labelDelete = id => {
    this.props.deleted(id)
  }

  render() {
    const { list } = this.props
    const styleList = [
      {background: 'linear-gradient(133deg,rgba(243,23,12,1) 0%,rgba(249,63,30,1) 50%,rgba(255,103,49,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(133deg,rgba(0,132,253,1) 0%,rgba(0,214,255,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(133deg,rgba(140,10,220,1) 0%,rgba(214,135,255,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(133deg,rgba(0,194,175,1) 0%,rgba(0,234,140,1) 99%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(133deg,rgba(41,42,35,1) 0%,rgba(94,94,83,1) 100%)', textColor: '#E4B55C', borderColor: '', isSelect: false},
      {background: '', textColor: '#F1260A', borderColor: '#FF8272', isSelect: false},
      {background: '', textColor: '#1780F2', borderColor: '#78B3F2', isSelect: false},
      {background: '', textColor: '#8C0ADC', borderColor: '#CE7CFD', isSelect: false},
      {background: '', textColor: '#0ECF71', borderColor: '#5CCB94', isSelect: false},
      {background: '', textColor: '#FF8300', borderColor: '#FFB500', isSelect: false},
    ]
    const {
      addLabelModal,
      editLabelModal,
      selectedRowKeys
    } = this.state
    const addLabelProps = {
      ...this.getCommonProps('addLabelModal'),
      styleList
    }
    const editLabelProps = {
      ...this.getCommonProps('editLabelModal'),
      styleList
    }

    const { onSearch } = this;
    const { pageProps, getList } = this.props
    const { btns, mutipulClick, paginationProps } = pageProps;

    return (
      <div>
        <CommonTable
          onSearch={onSearch}
          searchFields={searchFields}
          columns={getColumns.call(this)}
          dataSource={list}
          pagination={paginationProps}
          mutipulBtns={btns}
          mutipulClick={mutipulClick}
          getList={getList}
        />
        {addLabelModal && <AddLabel {...addLabelProps} />}
        {editLabelModal && <EditLabel {...editLabelProps} />}

      </div>
    )
  }
}

export default List
