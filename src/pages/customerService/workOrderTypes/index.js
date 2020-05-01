import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Input } from 'antd';
import { CommonTable, Page, PageTitle, TabsBar } from 'components'
import { searchFields, getColumns } from './components/fields'
import {hasBtn} from '../constants'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

@Form.create({})
@connect(({ workOrderTypes, loading }) => ({ workOrderTypes, loading }))
class WorkOrderTypes extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tabStatus: 0,
      addEditModal: false,
      editTypeId: '',
      type_name: ''
    }
  }

  toggleAddEditModal = (event = {}, id = '', type_name = '') => {
    this.setState((prevState) => ({
      addEditModal: !prevState.addEditModal,
      editTypeId: id,
      type_name,
    }))
  }

  onTabsChange = ({ value }) => {
    this.setState({
      tabStatus: value
    })
  }

  onDeleteTypes = (ids = []) => {
    Modal.confirm({
      title: '确认删除所选类型么？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        $api.workorder.deleteTypes({ ids }).then(_ => {
          this.getList()
        })
      }
    })
  }

  onAddEditTypes = (text) => {
    const { editTypeId } = this.state

    const { form } = this.props

    form.validateFields(async (err, values) => {
      if (err) return

      const { type_name } = values
      const params = editTypeId ? {
        type_name,
        id: parseInt(editTypeId) || 0,
      } : { type_name }

      $api.workorder.addEditTypes(params).then(_ => {
        this.getList()
        this.toggleAddEditModal()
      })
    })
  }


  onSearch = query => {
    const { dispatch } = this.props
    dispatch({ type: `workOrderTypes/onSearch`, payload: query })
    dispatch({ type: `workOrderTypes/getList`, payload: query })
  }

  getTabs = () => {
    return [
      {
        title: '工单类型',
        value: 0,
      },
      /* {
        title: '自动创建',
        value: 1,
      } */
    ]
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({
      type: `workOrderTypes/getList`,
      payload,
    })
  }

  mutipulClick = (key, keys = [], field, rows = []) => {
    switch (key) {
      case 'delete':
        this.onDeleteTypes(keys)
        break;
    }
  }

  renderModal() {
    const { addEditModal, type_name } = this.state
    const { form: { getFieldDecorator } } = this.props

    return (
      <Modal
        title="新增/编辑类型"
        visible={addEditModal}
        onCancel={this.toggleAddEditModal}
        onOk={this.onAddEditTypes}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Form {...formItemLayout}>
          <Form.Item label="类型名称">
            {getFieldDecorator('type_name', {
              rules: [{
                required: true,
                message: '请输入类型名称',
              }],
              initialValue: type_name,
            })(
              <Input placeholder="" maxLength={15} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  render() {
    const { tabStatus, addEditModal } = this.state
    const { workOrderTypes, loading } = this.props
    const { list = [], pagination, query } = workOrderTypes

    const mutipulBtns = [
      {
        name: '批量删除',
        key: 'delete',
        permission: hasBtn('deleteTypes'),
      }
    ]

    return (
      <Page inner>
        <TabsBar
          defaultActiveKey={tabStatus}
          tabs={this.getTabs()}
          onChange={this.onTabsChange}
        // btns={[exportProps]}
        />
        {
          hasBtn('addEditTypes') && (
            <Button
              className="pull-right"
              style={{ zIndex: '100' }}
              type="primary"
              onClick={this.toggleAddEditModal}
            >
              新增类型
          </Button>
          )
        }
        <CommonTable
          dataSource={list}
          getList={this.getList}
          onSearch={this.onSearch}
          pagination={pagination}
          loading={loading.effects[`workOrderTypes/getList`]}
          searchFields={searchFields}
          columns={getColumns.call(this)}
          // searchProp={searchProp}
          mutipulBtns={mutipulBtns}
          mutipulClick={this.mutipulClick}
        />
        {this.renderModal()}
      </Page>
    )
  }
}

export default WorkOrderTypes