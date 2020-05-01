import React, { PureComponent, Fragment } from 'react'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Drawer, Input, Radio, Table, TreeSelect, Spin, message } from 'antd'
import _ from 'lodash'
import { DrawerFooter } from 'components'
import { getAddTemplateFields } from './fields'
import { TEMPLATE_STATUS, VALUATION_WAY } from '../../../../constants'
import { getTableRowClassName } from 'utils'
import styles from '../index.less'

const { SHOW_PARENT, SHOW_CHILD } = TreeSelect
@Form.create()
class AddTemplate extends PureComponent {
  constructor(props) {
    super(props)
    this.state = this.buildInitialState()
  }

  buildInitialState() {
    return {
      loading: false,
      transports: [],
      count: 0,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { visible: oldVisible } = this.props
    const { visible, id } = nextProps
    if (!oldVisible && visible) {
      id ? this.getDetails(id)
        : this.setState({
          transports: [],
        })
    }
  }

  getDetails = (id) => {
    this.toggleLoading()
    $api.shipping.templateDetails({ id }).then(data => {
      const { data: details = {} } = data || {}
      const { transports = [], name = '', type = '' } = details || {}

      this.props.form.setFieldsValue({ name, type })

      this.toggleLoading()
      this.setState({
        transports,
      })
    }).catch(_ => {
      this.toggleLoading()
    })
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }))
  }

  handleClose = () => {
    this.setState(this.buildInitialState())
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  handleOk = () => {
    const { form, onOk, id = '' } = this.props
    const { transports = [] } = this.state
    //validate empty region
    let errors
    if (!transports || !transports.length) {
      errors = true
    } else {
      let half = transports.some((region) => { //某一行有部分信息但不完整
        const { area_ids = '', first_num = '', first_price = '', follow_num = '', follow_price = '' } = region
        if (area_ids || first_num || first_num === 0
          || first_price || first_price === 0
          || follow_num || follow_num === 0
          || follow_price || follow_price === 0) {

          return (!area_ids || (!first_num && first_num !== 0)
            || (!first_price && first_price !== 0)
            || (!follow_num && follow_num !== 0)
            || (!follow_price && follow_price !== 0))
        }
      })

      let full = transports.some((region) => { //某一行有完整信息
        const { area_ids = '', first_num = '', first_price = '', follow_num = '', follow_price = '' } = region
        return (area_ids && (first_num || first_num === 0)
          && (first_price || first_price === 0)
          && (follow_num || follow_num === 0)
          && (follow_price || follow_price === 0))
      })

      errors = half || !full
    }


    form.validateFields(async (err, values) => {
      if (err) return
      if (errors) {
        message.warn('请填写完整的物流信息')
        return
      }
      const { name = '', type = '' } = form.getFieldsValue(['name', 'type'])
      let newTransports = []
      transports.forEach((region) => {
        const { id = '', ...others } = region
        if (!_.isEmpty(others)) { //某一行未填写任何数据，也会验证成功
          /add/g.test(id) ? newTransports.push({ ...others }) : newTransports.push({ ...region })
        }
      })

      // const newTransports = transports.map((region) => {
      //   //delete front-end data, id like: 'add-'
      //   const { id = '', ...others } = region
      //   if (/add/g.test(id)) {
      //     return others
      //   }
      //   return region
      // })

      const data = {
        name,
        type,
        status: TEMPLATE_STATUS.DISABLED, //default value
        config: newTransports,
      }

      this.toggleLoading()
      const api = id ? $api.shipping.updateTemplate({ id, ...data }) : $api.shipping.addTemplate(data)
      api.then(_ => {
        this.toggleLoading()
        onOk && onOk()
      }).catch(_ => {
        this.toggleLoading()
      })
    })
  }

  handleAddRegion = () => {
    const { transports = [], count } = this.state
    this.setState({
      transports: [
        ...transports,
        { id: `add-${count}` },
      ],
      count: count + 1,
    })
  }

  handleDeleteRegion = (id = '') => {
    if (!id) return
    const { transports = [] } = this.state
    const newTransport = transports.filter((region) => (
      region.id !== id
    ))
    this.setState({
      transports: [...newTransport],
    })
  }

  handleUpdateRegion = ({ id = '', name = '', value = '' } = {}) => {
    if (!id) return

    const { transports } = this.state
    const index = transports.findIndex(region => (region.id === id))
    const newTransport = JSON.parse(JSON.stringify(transports))

    if (name) {
      newTransport[index][name] = value
    }

    this.setState({
      transports: newTransport,
    })
  }

  getSelectedAreas = (ids = []) => {
    if (ids && ids.length) {
      const newIds = []
      const { areasList = [] } = this.props

      ids.forEach((id) => {
        const area = areasList.find((area) => (area.value === id))
        if (area) {
          const { children } = area || {}
          children && children.forEach((child) => {
            const { value = '' } = child
            value && newIds.push(value)
          })
        } else {
          newIds.push(id)
        }
      })

      return newIds
    }
  }

  getTreeCheckedStrategy = (values = []) => {
    const { areasList = [] } = this.props
    const child = values && values.some((value) => {
      const areas = areasList.some((area) => (
        area.value === value
      ))

      return areas && areas.length
    })
    return child ? SHOW_CHILD : SHOW_PARENT
  }

  renderInfos() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Fragment>
        <Form.Item label="模板名称" style={{ marginBottom: '5px' }}>
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入运费模板名称',
                }
              ],
            })(
              <Input maxLength={20} placeholder="请输入运费模板名称(少于20字符)" style={{ width: '400px' }} autoComplete='off' />
            )
          }
        </Form.Item>
        <Form.Item label="寄件方式">
          {
            getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                }
              ],
              initialValue: VALUATION_WAY.NUMBER,
            })(
              <Radio.Group>
                <Radio value={VALUATION_WAY.NUMBER}>按件数</Radio>
                <Radio value={VALUATION_WAY.WEIGHT}>按重量</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
      </Fragment>
    )
  }

  renderRegions() {
    const { transports = [] } = this.state
    const { areasList = [], form } = this.props
    const type = form && form.getFieldValue('type')
    const unit = type === VALUATION_WAY.NUMBER ? '件' : '重量 (kg)'
    return (
      <div className={styles.regions}>
        <div className={styles.title}>
          <span>区域及运费设置:</span>
          <a onClick={this.handleAddRegion}><span style={{ marginRight: '5px' }}>+</span>新增区域</a>
        </div>
        <Table
          columns={getAddTemplateFields.call(this, areasList, unit)}
          bordered={true}
          pagination={false}
          dataSource={transports}
          scroll={{ y: 'calc(100vh - 350px)' }}
          rowKey='id'
          rowClassName={getTableRowClassName}
        >
        </Table>
      </div >
    )
  }

  render() {
    const { visible, id } = this.props
    const { loading } = this.state
    const title = id ? '编辑运费模板' : '新增运费模板'

    return (
      <Drawer
        title={title}
        visible={visible}
        placement="right"
        width="1000"
        headerStyle={{ background: '#f5f5f5' }}
        maskClosable={false}
        destroyOnClose={true}
        onClose={this.handleClose}
      >
        {
          loading && (
            <div className={styles.spin}>
              <Spin />
            </div>
          )
        }
        <Form autoComplete='off'>
          {this.renderInfos()}
          {this.renderRegions()}
        </Form>
        <DrawerFooter
          onOk={this.handleOk}
          onCancel={this.handleClose}
        />
      </Drawer>
    )
  }
}

export default AddTemplate