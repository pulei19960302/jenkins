import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
import { ChooseAddress } from 'components'
import { mobileReg } from 'utils/constant'
const FormItem = Form.Item
const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 17 },
  },
}
@Form.create()
class ModifyAddress extends PureComponent {
  state = {
    loading: false,
  }
  handleOk = () => {
    const { form, onCancel, successCallback, order } = this.props
    form.validateFields((err,values) => {
      if (!err) {
        const params = {
          ...values,
          receiver_province_id: values.area.province_id,
          receiver_city_id: values.area.city_id,
          receiver_district_id: values.area.district_id,
          ...values.area,
          id: order.id
        }
        delete params.area
        $api.order
        .modifyAddress(params,{success:true,loadingFn:this.toogleLoading})
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
  render(){
    const {
      modalVisible,
      form: { getFieldDecorator },
      onCancel,
      order = {}
    } = this.props
    const { loading } = this.state
    const modalOpts = {
      title: '修改收货地址',
      width: 450,
      confirmLoading: loading,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    }
    const area = {
      province_id: order.receiver_province_id,
      city_id: order.receiver_city_id,
      district_id: order.receiver_district_id
    }
    return (
      <Modal {...modalOpts}>
        <Form {...formItemLayout}>
          <FormItem label="收货人姓名">
            {getFieldDecorator('receiver_name', {
              initialValue: order.receiver_name,
              rules: [
                {
                  required: true,
                  message: '请输入快递单号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="手机号">
            {getFieldDecorator('receiver_mobile', {
              initialValue: order.receiver_mobile,
              rules: [
                {
                  required: true,
                  message: '请输入手机号',
                },
                { pattern: mobileReg, message: '手机号格式不正确' },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="所在区域">
            {getFieldDecorator('area', {
              initialValue: area,
              rules: [
                {
                  required: true,
                  message: '请选择所在区域',
                },
              ],
            })(
              <ChooseAddress />
            )}
          </FormItem>
          <FormItem label="详细地址">
            {getFieldDecorator('receiver_address', {
              initialValue: order.receiver_address,
              rules: [
                {
                  required: true,
                  message: '请填写详细地址',
                },
              ],
            })(
              <TextArea placeholder="请填写详细地址(限300字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={300} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default ModifyAddress
