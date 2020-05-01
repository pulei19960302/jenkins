import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
import ServiceList from '../../components/ServiceList'
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
class SwitchChat extends PureComponent {
    state = {}
    handleOk = () => {
        const { form, onCancel, switchChat } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                onCancel()
                switchChat(values.switch_service_id)
            }
        })
    }
    render() {
        const {
            modalVisible,
            form: { getFieldDecorator },
            onCancel,
            user
        } = this.props
        const { loading } = this.state
        const modalOpts = {
            title: '转接客服',
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
                    <FormItem label="接收人">
                        {getFieldDecorator('switch_service_id', {})(
                            <ServiceList disabledIds={[user.id]} />
                        )}
                    </FormItem>
                    <FormItem label="转接原因">
                        {getFieldDecorator('remarks', {})(
                            <TextArea placeholder="请填写转接原因(限200字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={200} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default SwitchChat
