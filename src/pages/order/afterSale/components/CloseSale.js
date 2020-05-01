import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
const FormItem = Form.Item
const TextArea = Input.TextArea

const formItemLayout = {
    labelCol: {
        sm: { span: 5 },
    },
    wrapperCol: {
        sm: { span: 17 },
    },
}
@Form.create()
class CloseSale extends PureComponent {
    state = {}
    handleOk = () => {
        const { form, onCancel, orderId, successCallback } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                onCancel()
                $api.order.closeAfterSale({ sale_id: orderId, closed: 1, stop_reason: values.stop_reason }, { success: true }).then(() => {
                    onCancel()
                    successCallback()
                })
            }
        })
    }
    render() {
        const {
            modalVisible,
            form: { getFieldDecorator },
            onCancel,
        } = this.props
        const { loading } = this.state
        const modalOpts = {
            title: '关闭售后',
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
                    <FormItem label="关闭原因">
                        {getFieldDecorator('stop_reason', {
                            rules: [
                                {
                                  required: true,
                                  message: '请填写关闭原因',
                                },
                              ],
                        })(
                            <TextArea autosize={{ minRows: 4, maxRows: 6 }} maxLength={300} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default CloseSale
