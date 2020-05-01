import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select } from 'antd';
import { BtnGroup } from 'components'
import { PureComponent } from 'react';
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
}
@Form.create()
class ModifyLogistics extends PureComponent {
  state = {
    saveLoading: false,
    sendLoading: false,
    expressList: [],
  }
  componentDidMount() {
    $api.common.getExpressList({ no_page_flag: true }, { cache: true }).then(res => {
      this.setState({
        expressList: res.data || []
      })
    })
  }
  handOk(only_logistics) {
    const { form, onCancel, successCallback, order } = this.props
    const { expressList } = this.state
    form.validateFields((err, values) => {
      const express = expressList.find(el => el.express_code === values.code)
      if (!err) {
        this.toogleLoading(only_logistics, true)
        $api.order
          .modifyLogistics({ ...values, name: express.name, id: order.id, only_logistics }, { success: true })
          .then(res => {
            onCancel()
            successCallback()
            this.toogleLoading(only_logistics, false)
          }).catch(_ => {
            this.toogleLoading(only_logistics, false)
          })
      }
    })
  }
  toogleLoading = (type, loading) => {
    const key = type === 1 ? 'saveLoading' : 'sendLoading'
    this.setState({
      [key]: loading,
    })
  }
  getFooter = () => {
    const btns = [
      {
        name: '取消',
        type: 'default',
        handleClick: this.props.onCancel,
      },
      {
        name: '保存',
        handleClick: () => { this.handOk(1) },
        loding: this.state.saveLoading
      },
      {
        name: '发货',
        handleClick: () => { this.handOk(0) },
        loding: this.state.sendLoading
      },
    ]
    return <BtnGroup btns={btns} />
  }
  render() {
    const {
      order,
      form: { getFieldDecorator },
      modalVisible,
      onCancel
    } = this.props
    const { expressList } = this.state
    const modalOpts = {
      title: '编辑物流信息',
      width: 450,
      footer: this.getFooter(),
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onCancel,
    }

    return (
      <Modal {...modalOpts}>
        <p style={{ paddingLeft: 20 }}>订单号：{order.order_sn}</p>
        <Form {...formItemLayout}>
          <FormItem label="物流公司">
            {getFieldDecorator('code', {
              initialValue: order.express_code,
              rules: [
                {
                  required: true,
                  message: '请选择物流公司',
                },
              ],
            })(
              <Select>
                {expressList.map(el => <Option value={el.express_code} key={el.express_code}>{el.name}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem label="快递单号">
            {getFieldDecorator('sn', {
              initialValue: order.logistics_sn,
              rules: [
                {
                  required: true,
                  message: '请填写快递单号',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}


export default ModifyLogistics
