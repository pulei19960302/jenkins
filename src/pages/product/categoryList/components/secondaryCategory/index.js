import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Button, Switch } from 'antd'
import { CommonTable } from 'components'
import { getColumns } from './fields'
import SecondaryModal from '../SecondaryModal'
import { SWITCH_TYPE } from '../../constant'

@connect(({ newCategory, app, loading }) => ({ ...newCategory, app, loading }))
class SecondaryCategory extends PureComponent {

  state = {
    showSecondaryModal: false,
    secondaryModalProps: {},
    switchLoading: false
  }

  toggleStatus = (key, status) => {
    this.setState({
      [key]: status,
    })
  }

  handleCancel = () => {
    this.toggleStatus('showSecondaryModal', false)
  }

  getList = (arg) => {
    const { dispatch } = this.props;
    dispatch({ type: 'newCategory/getList', payload: { page: 1, ...arg }})
  }

  addCategory = () => {
    const { treeData, currentId } = this.props
    this.setState({
      secondaryModalProps: {
        treeData,
        initForm: {
          pid: Number(currentId),
          status: SWITCH_TYPE.FORBIDDEN
        },
        handleCancel: this.handleCancel,
        getList: this.getList,
      },
    }, () => {
      this.toggleStatus('showSecondaryModal', true)
    })
  }

  editCategory = (row) => {
    const { treeData, currentId } = this.props
    this.setState({
      secondaryModalProps: {
        treeData,
        initForm: { ...row, pid: Number(currentId) },
        handleCancel: this.handleCancel,
        getList: this.getList,
      },
    }, () => {
      this.toggleStatus('showSecondaryModal', true)
    })
  }

  delCategory = (row) => {
    const { dispatch } = this.props;
    $api.category.categoryDel({ id: Number(row.id) }, { success: true })
      .then(_ => {
        dispatch({ type: 'newCategory/getList' })
      })
  }

  // switch 改变
  handleSwitch = async (id, status) => {
    this.setState({
      switchLoading: true
    })
    const { dispatch } = this.props;
    await $api.category.categoryStatus({ id: Number(id), status }, { success: true }).then(_ => {
      dispatch({type: 'newCategory/updateState', payload: { currentStatus: status }})
      dispatch({ type: 'newCategory/getTreeData'})
      this.setState({
        switchLoading: false
      })
    }).catch(_ => {
      this.setState({
        switchLoading: false
      })
    })
  }

  handleTableSwitch = (id , status) => {
    const { dispatch } = this.props;
    $api.category.categoryStatus({ id: Number(id), status }, { success: true }).then(_ => {
      dispatch({ type: 'newCategory/getList'})
    })
  }

  getTableList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `newCategory/getList`,
      payload,
    })
  }

  render() {
    const width = this.props.app.collapsed ? 'calc(100% - 378px)' : 'calc(100% - 468px)'
    const { getTableList } = this;
    const { showSecondaryModal, secondaryModalProps, switchLoading } = this.state
    const { pagination, list, currentStatus, loading, currentId } = this.props

    return (
      <Fragment>
        <div className='title'>
          <div className='secondary-left'>
            <div className='mr10'>一级类目状态</div>
            <Switch unCheckedChildren="禁用" checkedChildren="启用" disabled={!$api.category.categoryStatus.permission()} loading={switchLoading} onChange={(status) => this.handleSwitch(currentId, status ? 1 : 2) } checked={currentStatus === SWITCH_TYPE.ENABLE }/>
          </div>
          <div>
            {
              $api.category.categoryAdd.permission() && <Button type="primary" onClick={this.addCategory}>新增二级类目</Button>
            }
          </div>
        </div>
        <div className='secondary-table'>
          <CommonTable
            loading={loading.effects['newCategory/getList']}
            dataSource={list}
            columns={getColumns(this)}
            pagination={pagination}
            pageProps={{ stylePros: { width: width, bottom: 16 } }}
            getList={getTableList}
          />
        </div>

        {
          showSecondaryModal && <SecondaryModal handleCancel={this.handleCancel} {...secondaryModalProps} />
        }

      </Fragment>

    )
  }
}

export default SecondaryCategory
