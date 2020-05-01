import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select } from 'antd';
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
class SendGoods extends PureComponent {
  state = {
    loading: false,
    expressList: [],
  }
  componentDidMount() {
    $api.common.getExpressList({ no_page_flag: true }, { cache: true }).then(res => {
      this.setState({
        expressList: res.data || []
      })
    })
  }
  handleOk = () => {
    const { form, onCancel, successCallback, order } = this.props
    const { expressList } = this.state
    form.validateFields((err, values) => {
      const express = expressList.find(el => el.express_code === values.code)
      console.log(express)
      if (!err) {
        $api.order
          .modifyLogistics({ ...values, name: express.name, id: order.id, only_logistics: 0 }, { success: true, loadingFn: this.toogleLoading })
          .then(res => {
            onCancel()
            successCallback()
          })
      }
    })
  }
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      modalVisible,
      order,
    } = this.props
    const { loading, expressList } = this.state
    const modalOpts = {
      title: '一键发货',
      width: 450,
      confirmLoading: loading,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    }
    return (
      <Modal {...modalOpts}>
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
export default SendGoods
