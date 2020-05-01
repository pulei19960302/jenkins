import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { CommonTable, Page, PageTitle } from 'components'
import { getColumns } from './components/fields'
import AddAgreement from './components/AddAgreement'
import { AGREEMENT_STATUS, hasBtn } from '../constants'

@connect(({ agreement, loading }) => ({ agreement, loading }))
class Agreement extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      addAgreeModal: false,
      id: '',
    }
  }

  toggleAddAgreeModal = () => {
    this.setState((prevState) => ({
      addAgreeModal: !prevState.addAgreeModal,
      id: '',
    }))
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }))
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'agreement/getList', payload })
  }

  handleSwitchStatus = (status = '', ids = '') => {
    this.toggleLoading()
    $api.system.switchStatus({ ids, status }).then(_ => {
      this.getList()
      this.toggleLoading()
    }).catch(_ => {
      this.toggleLoading()
    })
  }

  handleDelete = (ids = '') => {
    Modal.confirm({
      title: '确认删除所选协议么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.system.deleteAgreement({ ids }).then(_ => {
          this.getList()
        })
      },
    })
  }

  handleEdit = (id = '') => {
    this.setState({
      id,
      addAgreeModal: true,
    })
  }

  mutipulClick = (key, keys = [], field) => {
    switch (key) {
      case 'enabled':
        this.handleSwitchStatus(AGREEMENT_STATUS.ENABLED, keys);
        break;
      case 'disabled':
        this.handleSwitchStatus(AGREEMENT_STATUS.DISABLED, keys);
        break;
      case 'delete':
        this.handleDelete(keys)
        break;
    }
  }

  render() {
    const { addAgreeModal, id } = this.state
    const { agreement, loading } = this.props
    const { list = [], pagination } = agreement
    const btns = [
      {
        icon: 'plus',
        type: 'primary',
        name: '添加协议',
        handleClick: this.toggleAddAgreeModal,
        permission: hasBtn('addAgreement')
      },
    ].filter(el => el.permission)

    const loadingProp = loading.effects[`agreement/getList`] || this.state.loading

    const mutipulBtns = [
      {
        name: '批量启用',
        key: 'enabled',
        permission: hasBtn('switchAgreeStatus'),
      },
      {
        name: '批量停用',
        key: 'disabled',
        permission: hasBtn('switchAgreeStatus'),
      },
      {
        name: '批量删除',
        key: 'delete',
        permission: hasBtn('deleteAgreement'),
      },
    ].filter(el => el.permission)

    return (
      <Page inner>
        <PageTitle btns={btns} />
        <CommonTable
          dataSource={list}
          getList={this.getList}
          pagination={pagination}
          loading={loadingProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          columns={getColumns.call(this)}
        />
        <AddAgreement
          id={id}
          visible={addAgreeModal}
          onOk={() => { this.toggleAddAgreeModal(); this.getList() }}
          onClose={this.toggleAddAgreeModal}
        />
      </Page>
    )
  }
}

export default Agreement