import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal, Button, message } from 'antd'
import { CommonTable } from 'components'
import { getSearchFields, getColumns } from './components/fields'
import { EXPRESS_STATUS, hasBtn } from '../../../constants'
import AddExpress from './components/AddExpress'
import styles from './index.less'

class ExpressList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      editingExpress: {},
      addExpressModal: false,
      phoneValue: '',
    }
  }

  componentDidMount() {
    this.getList()
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }))
  }

  toggleAddExpress = () => {
    this.setState((prevState) => ({
      addExpressModal: !prevState.addExpressModal,
    }))
  }

  onSearch = (query) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/updateState', payload: { expressQuery: query }, })
    dispatch({ type: 'delivery/getExpressList', query, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/getExpressList', payload, }).then(_ => {
      this.handleEditExpress({})
    })
  }

  mutipulClick = (key, keys = [], field) => {
    const { delivery = {} } = this.props
    const { list = [] } = delivery

    const rows = list.filter(el => keys && keys.includes(el.id))

    const ids = keys || []
    let msg, callback
    switch (key) {
      case 'enabled':
        msg = '当前存在启用中的物流，请确认后操作'
        callback = () => { this.handleSwitchStatus(EXPRESS_STATUS.ENABLED, ids) }
        this.handleJudgeMultipul(rows, EXPRESS_STATUS.ENABLED, msg, callback)
        break;
      case 'disabled':
        msg = '当前存在已停用的物流，请确认后操作'
        callback = () => { this.handleSwitchStatus(EXPRESS_STATUS.DISABLED, ids) }
        this.handleJudgeMultipul(rows, EXPRESS_STATUS.DISABLED, msg, callback)
        break;
      case 'delete':
        msg = '当前存在启用中的物流，请确认后删除'
        callback = () => { this.handleDeleteExpress(ids, rows) }
        this.handleJudgeMultipul(rows, EXPRESS_STATUS.ENABLED, msg, callback)
        break;
    }
  }

  handleJudgeMultipul = (rows, status, msg, callback) => {
    console.log('rows', rows)
    const judge = rows && rows.some((info) => (info.status === status))
    if (judge) {
      message.warn(msg)
      return
    }

    callback && callback()
  }

  handleFormatPhone = (value) => {
    const reg = /[^(0-9)(\-)]/g
    const phoneValue = value && value.replace(reg, '')
    this.setState({ phoneValue })
  }

  handleSwitchStatus = (status, ids = []) => {
    this.toggleLoading()
    $api.shipping.switchExpressStatus({ status, ids }).then(_ => {
      this.getList()
      this.toggleLoading()
    })
  }

  handleEditExpress = (row = {}) => {
    const { phone = '' } = row
    this.setState({
      editingExpress: row,
      phoneValue: phone,
    })
  }

  handleUpdateFields = ({ name = '', value = '' } = {}) => {
    const { editingExpress } = this.state
    const newExpress = {
      ...editingExpress,
      [name]: value,
    }

    this.setState({
      editingExpress: newExpress,
    })
  }

  handleDeleteExpress = (ids = []) => {
    Modal.confirm({
      title: '确认删除所选快递么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.shipping.deleteExpress({ ids }).then(_ => {
          this.getList()
        })
      },
    })
  }

  handleUpdateExpress = () => {
    //will do: validate name and phone data. 
    const { editingExpress } = this.state
    const { name = '' } = editingExpress || {}
    if (!name) {
      message.warn('请输入正确的物流信息')
      return
    }
    // this.setState({ loading: true })
    this.toggleLoading()
    $api.shipping.updateExpress(editingExpress).then(_ => {
      this.toggleLoading()
      this.getList()
    }).catch(_ => {
      this.toggleLoading()
    })
  }

  render() {
    const { editingExpress, addExpressModal, phoneValue } = this.state
    const { delivery = {}, loading } = this.props
    const { list = [], pagination, expressQuery = {} } = delivery || {}
    const searchProp = {
      search: expressQuery,
    }

    const loadingProp = loading.effects['delivery/getExpressList'] || this.state.loading

    const mutipulBtns = [
      {
        name: '批量启用',
        key: 'enabled',
        permission: hasBtn('switchExpressStatus'),
      },
      {
        name: '批量停用',
        key: 'disabled',
        permission: hasBtn('switchExpressStatus'),
      },
      {
        name: '批量删除',
        key: 'delete',
        permission: hasBtn('deleteExpress'),
      },
    ].filter(el => el.permission)

    return (
      <div className={styles.list}>
        {
          hasBtn('addExpress') && (
            <Button type="primary"
              className={styles.btn}
              onClick={this.toggleAddExpress}
            >
              <span style={{ marginRight: '8px' }}>+</span>新增物流公司
            </Button>
          )
        }
        <CommonTable
          dataSource={list}
          pagination={pagination}
          searchProp={searchProp}
          searchFields={getSearchFields()}
          columns={getColumns.call(this, editingExpress, phoneValue)}
          loading={loadingProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          onSearch={this.onSearch}
          getList={this.getList}
        />
        <AddExpress
          visible={addExpressModal}
          onCancel={this.toggleAddExpress}
          onOk={() => { this.toggleAddExpress(); this.getList() }}
        />
      </div>
    )
  }
}

export default ExpressList


