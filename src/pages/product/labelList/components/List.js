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
      {background: 'linear-gradient(93deg,rgba(207,39,64,1) 0%,rgba(234,108,104,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(90deg,rgba(33,138,235,1) 0%,rgba(55,180,241,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(90deg,rgba(129,59,216,1) 0%,rgba(161,93,226,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(90deg,rgba(12,197,179,1) 0%,rgba(52,226,200,1) 100%)', textColor: '#FFFFFF', borderColor: '', isSelect: false},
      {background: 'linear-gradient(133deg,rgba(41,42,35,1) 0%,rgba(94,94,83,1) 100%)', textColor: '#E4B55C', borderColor: '', isSelect: false},
      {background: '', textColor: '#EA485E', borderColor: '#FF817E', isSelect: false},
      {background: '', textColor: '#388BE6', borderColor: '#78B3F2', isSelect: false},
      {background: '', textColor: '#8E4DDE', borderColor: '#AA6DE8', isSelect: false},
      {background: '', textColor: '#0DC6B4', borderColor: '#5BDFCB', isSelect: false},
      {background: '', textColor: '#C29A4F', borderColor: '#DCBF84', isSelect: false},
    ]
    const {
      addLabelModal,
      editLabelModal,
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
