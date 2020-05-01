import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
const FormItem = Form.Item
const TextArea = Input.TextArea

const CancelOrder = props => {
  const {
    form,
    form: { getFieldDecorator },
    loading,
    onCancel,
  } = props
  const modalOpts = {
    title: '取消订单',
    width: 500,
    confirmLoading: loading,
    visible: true,
    maskClosable: false,
    onOk: () => {
      form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          // cancelOrder(values).then(() => {
          //     onCancel();
          // });
        }
      })
    },
    onCancel,
  }
  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 20 },
    },
  }
  return (
    <Modal {...modalOpts}>
      <Form {...formItemLayout}>
        <FormItem label="取消原因">
          {getFieldDecorator('aaa')(
            <TextArea autosize={{ minRows: 4, maxRows: 6 }} maxLength={300} />
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(CancelOrder)
