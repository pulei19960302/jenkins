import React, { PureComponent } from 'react'
import { Modal, Button, message } from 'antd'
import { CommonTable } from 'components'
import { getTemplateSearch, getTemplateColumns } from './components/fields'
import { TEMPLATE_STATUS, hasBtn } from '../../../constants'
import AddTemplate from './components/AddTemplate.js'
import ViewTemplate from './components/ViewTemplate'
import styles from './index.less'

class TemplateList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      templateModal: false,
      viewTemplate: false,
      treeData: [],
    }
  }

  toggleTemplateModal = (id = '') => {
    this.setState((prevState) => ({
      templateModal: !prevState.templateModal,
      id,
    }))
  }

  toggleViewTemplate = (id = '') => {
    this.setState((prevState) => ({
      viewTemplate: !prevState.viewTemplate,
      id,
    }))
  }

  componentDidMount() {
    this.getList()
  }

  onSearch = (query) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/updateState', payload: { templateQuery: query }, })
    dispatch({ type: 'delivery/getTemplateList', query, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'delivery/getTemplateList', payload, })
  }

  mutipulClick = (key, keys = [], field) => {
    const { delivery = {} } = this.props
    const { list = [] } = delivery

    const rows = list.filter(el => keys && keys.includes(el.id))

    const ids = keys || []
    let msg, callback
    switch (key) {
      case 'enabled':
        msg = '当前存在启用中的模板，请确认后操作'
        callback = () => { this.handleSwitchStatus(TEMPLATE_STATUS.ENABLED, ids) }
        this.handleJudgeMultipul(rows, TEMPLATE_STATUS.ENABLED, msg, callback)
        break;
      case 'disabled':
        msg = '当前存在已停用的模板，请确认后操作'
        callback = () => { this.handleSwitchStatus(TEMPLATE_STATUS.DISABLED, ids) }
        this.handleJudgeMultipul(rows, TEMPLATE_STATUS.DISABLED, msg, callback)
        break;
      case 'delete':
        msg = '当前存在启用中的模板，请确认后删除'
        callback = () => { this.handleDeleteTemplates(ids, rows) }
        this.handleJudgeMultipul(rows, TEMPLATE_STATUS.ENABLED, msg, callback)
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
    this.setState({ loading: true })
    $api.shipping.swicthTemplateStatus({ status, ids }).then(_ => {
      this.getList()
      this.setState({ loading: false })
    })
  }

  handleDeleteTemplates = (ids = [], rows = []) => {
    Modal.confirm({
      title: '确认删除所选模板么?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.shipping.deleteTemplates({ ids }).then(_ => {
          this.getList()
        })
      },
    })
  }

  render() {
    const { templateModal, id, viewTemplate } = this.state
    const { delivery = {}, loading } = this.props
    const { list = [], pagination, templateQuery = {}, areasList = [] } = delivery || {}
    const searchProp = {
      search: templateQuery,
    }
    const loadingProp = loading.effects['delivery/getTemplateList'] || this.state.loading

    const mutipulBtns = [
      {
        name: '批量启用',
        key: 'enabled',
        permission: hasBtn('swicthTemplateStatus'),
      },
      {
        name: '批量停用',
        key: 'disabled',
        permission: hasBtn('swicthTemplateStatus'),
      },
      {
        name: '批量删除',
        key: 'delete',
        permission: hasBtn('deleteTemplates'),
      },
    ].filter(el => el.permission)

    return (
      <div>
        {
          hasBtn('addTemplate') && (
            <Button type="primary"
              className={styles.btn}
              onClick={() => { this.toggleTemplateModal() }}
            >
              <span style={{ marginRight: '8px' }}>+</span>新增运费模板
            </Button>
          )
        }
        <CommonTable
          dataSource={list}
          pagination={pagination}
          searchProp={searchProp}
          searchFields={getTemplateSearch()}
          columns={getTemplateColumns.call(this)}
          loading={loadingProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
          onSearch={this.onSearch}
          getList={this.getList}
        />
        <AddTemplate
          visible={templateModal}
          areasList={areasList}
          id={id}
          onCancel={this.toggleTemplateModal}
          onOk={() => { this.toggleTemplateModal(); this.getList() }}
        />
        <ViewTemplate
          id={id}
          areasList={areasList}
          visible={viewTemplate}
          onCancel={this.toggleViewTemplate}
        />
      </div>
    )
  }
}

export default TemplateList