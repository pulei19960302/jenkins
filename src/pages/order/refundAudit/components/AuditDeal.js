import { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Drawer, Descriptions, Radio, Input, message } from 'antd';
import { GoodsList, ApplyInfo, HandleResult } from '../../components/CommonAfterSale'
import { DrawerFooter } from 'components'
import styles from '../index.less'
import { AFTER_SALE_STATUS, hasBtn } from '../../constants'
const { WAIT_FINANCE_AUDIT } = AFTER_SALE_STATUS
const TextArea = Input.TextArea

@Form.create()
class AuditDeal extends PureComponent {
    state = {
        loading: false,
    }
    handOk = () => {
        const { form, order, onCancel, successCallback } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    ...values,
                    sale_id: order.id,
                }
                if(params.finance_verify===2 && !params.finance_message){
                    message.warning('请填写审核意见')
                }else{
                    $api.order
                    .finaceVerify(params,{success:true,loadingFn:this.toogleLoading})
                    .then(res => {
                      onCancel()
                      successCallback()
                    })
                }
            }
        })
    }
    render() {
        const {
            order={},
            modalVisible,
            form: { getFieldDecorator },
            onCancel,
        } = this.props
        const { loading } = this.state
        const drawerOpts = {
            title: '售后服务单',
            width: 650,
            visible: modalVisible,
            maskClosable: false,
            destroyOnClose: true,
            onClose: onCancel,
        }
        const drawerFooterProps = {
            confirmLoading: loading,
            onCancel,
            onOk: this.handOk
        }
        return (
            <Drawer {...drawerOpts} className={styles.drawer}>
                <Form className={styles.afterSaleForm}>
                    <GoodsList order={order} />
                    <ApplyInfo order={order} />
                    <HandleResult order={order} />
                    <div className={styles.blockContainer}>
                        <p className={styles.blockTitle}>财务审核意见</p>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="是否退款">
                                {getFieldDecorator('finance_verify', {
                                    initialValue: order.finance_verify || 1
                                })(
                                    <Radio.Group disabled={order.status!==WAIT_FINANCE_AUDIT}>
                                        <Radio value={1}>同意</Radio>
                                        <Radio value={2}>拒绝</Radio>
                                    </Radio.Group>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="审核意见">
                                {getFieldDecorator('finance_message', {
                                    initialValue: order.finance_message
                                })(<TextArea disabled={order.status!==WAIT_FINANCE_AUDIT} 
                                    autoSize={{ minRows: 2, maxRows: 4 }} maxLength={300} />)}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </Form>
                {
                    hasBtn('finaceVerify', order.status) && <DrawerFooter {...drawerFooterProps} />
                }
            </Drawer>
        )
    }
}

export default AuditDeal
