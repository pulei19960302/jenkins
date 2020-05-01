import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Modal, Button, message } from 'antd'
import { CommonTable } from 'components'
import { getSearchFields, getColumns } from './components/fields'
import { INSURANCE_STATUS, hasBtn } from '../../../constants'
import AddInsurance from './components/AddInsurance'
import styles from './index.less'

class InsuranceList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      editingInsurance: {},
      addInsuranceModal: false,
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

  toggleAddInsurance = () => {
    this.setState((prevState) => ({
      addInsuranceModal: !prevState.addInsuranceModal,
    }))
  }

  onSearch = (query) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/updateState', payload: { insuranceQuery: query }, })
    dispatch({ type: 'delivery/getInsuranceList', query, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/getInsuranceList', payload, }).then(_ => {
      this.handleEditInsurance({})
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
        msg = '当前存在启用中的运费险，请确认后操作'
        callback = () => { this.handleSwitchStatus(INSURANCE_STATUS.ENABLED, ids) }
        this.handleJudgeMultipul(rows, INSURANCE_STATUS.ENABLED, msg, callback)
        break;
      case 'disabled':
        msg = '当前存在已停用的运费险，请确认后操作'
        callback = () => { this.handleSwitchStatus(INSURANCE_STATUS.DISABLED, ids) }
        this.handleJudgeMultipul(rows, INSURANCE_STATUS.DISABLED, msg, callback)
        break;
      case 'delete':
        msg = '当前存在启用中的运费险，请确认后删除'
        callback = () => { this.handleDeleteInsurance(ids, rows) }
        this.handleJudgeMultipul(rows, INSURANCE_STATUS.ENABLED, msg, callback)
        break;
    }
  }

  handleJudgeMultipul = (rows, status, msg, callback) => {
    const judge = rows && rows.some((info) => (info.status === status))
    if (judge) {
      message.warn(msg)
      return
    }

    callback && callback()
  }

  handleSwitchStatus = (status, ids = []) => {
    this.toggleLoading()
    $api.shipping.switchInsuranceStatus({ status, ids }).then(_ => {
      this.getList()
      this.toggleLoading()
    })
  }

  handleEditInsurance = (row = {}) => {
    this.setState({
      editingInsurance: row,
    })
  }

  handleUpdateFields = ({ name = '', value = '' } = {}) => {
    const { editingInsurance } = this.state
    const newInsurance = {
      ...editingInsurance,
      [name]: value,
    }

    this.setState({
      editingInsurance: newInsurance,
    })
  }

  handleDeleteInsurance = (ids = []) => {
    Modal.confirm({
      title: '确认删除所选模板么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.shipping.deleteInsurance({ ids }).then(_ => {
          this.getList()
        })
      },
    })
  }

  handleUpdateInsurance = () => {
    //will do: validate name and phone data. 
    const { editingInsurance } = this.state
    const { name = '' } = editingInsurance || {}
    if (!name) {
      message.warn('请输入正确的运费险信息')
      return
    }
    // this.setState({ loading: true })
    this.toggleLoading()
    $api.shipping.updateInsurance(editingInsurance).then(_ => {
      this.toggleLoading()
      this.getList()
    }).catch(_ => {
      this.toggleLoading()
    })
  }

  render() {
    const { editingInsurance, addInsuranceModal } = this.state
    const { delivery = {}, loading } = this.props
    const { list = [], pagination, insuranceQuery = {} } = delivery || {}
    const searchProp = {
      search: insuranceQuery,
    }

    const loadingProp = loading.effects['delivery/getInsuranceList'] || this.state.loading

    const mutipulBtns = [
      {
        name: '批量启用',
        key: 'enabled',
        permission: hasBtn('switchInsuranceStatus'),
      },
      {
        name: '批量停用',
        key: 'disabled',
        permission: hasBtn('switchInsuranceStatus'),
      },
      {
        name: '批量删除',
        key: 'delete',
        permission: hasBtn('deleteInsurance'),
      },
    ].filter(el => el.permission)

    return (
      <div className={styles.list}>
        {
          hasBtn('addInsurance') && (
            <Button type="primary"
              className={styles.btn}
              onClick={this.toggleAddInsurance}
            >
              <span style={{ marginRight: '8px' }}>+</span>新增运费险
            </Button>
          )
        }
        <CommonTable
          dataSource={list}
          pagination={pagination}
          searchProp={searchProp}
          searchFields={getSearchFields()}
          columns={getColumns.call(this, editingInsurance)}
          loading={loadingProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          onSearch={this.onSearch}
          getList={this.getList}
        />
        <AddInsurance
          visible={addInsuranceModal}
          onCancel={this.toggleAddInsurance}
          onOk={() => { this.toggleAddInsurance(); this.getList() }}
        />
      </div>
    )
  }
}

export default InsuranceList


