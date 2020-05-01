import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
const FormItem = Form.Item
const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
}

class ModifyRemarks extends PureComponent {
  state = {
    loading: false,
  }
  handleOk = () => {
    const { form, onCancel, successCallback, order } = this.props
    form.validateFields((err,values) => {
      if (!err) {
        $api.order
        .modifyRemark({...values,id: order.id},{success:true,loadingFn:this.toogleLoading})
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
      order
    } = this.props
    const { loading } = this.state
    const modalOpts = {
      title: '修改备注',
      width: 500,
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
          <FormItem label="备注">
            {getFieldDecorator('remark',{initialValue: order.remark})(
              <TextArea placeholder="请填写备注信息(限200字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={200} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ModifyRemarks)
