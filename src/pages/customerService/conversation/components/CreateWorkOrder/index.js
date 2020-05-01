import { PureComponent } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Drawer, Row, Col, TreeSelect } from 'antd';
import { DrawerFooter } from 'components'
import { connect } from 'dva'
import ServiceList from '../../../components/ServiceList'
import styles from './index.less'
const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
}
let uid = 0

@connect(({ conversation }) => ({ ...conversation }))
@Form.create()
class CreateWorkOrder extends PureComponent {
    state = {
        loading: false,
        workOrderType: [],
        relationOrder: [],
    }
    componentDidMount() {
        // $api.customerService.workOrderType().then(({ data }) => {
        //     this.setState({ workOrderType: data || [] })
        // })
    }
    // 关闭前重置state
    closeModal = () => {
        const { onCancel } = this.props
        this.setState({
            relationOrder: [],
        })
        onCancel()
    }
    // 关联单改变
    valueChange(value, type, index) {
        let { relationOrder } = this.state
        relationOrder[index][type] = value
        this.setState({ relationOrder: [...relationOrder] })
    }
    // 添加一个关联
    addRelation = () => {
        const { relationOrder } = this.state
        const newRelation = { relation_sn: '', relation_sn_type: 1, uid: ++uid }
        this.setState({ relationOrder: [...relationOrder, newRelation] })
    }
    // 移除一个关联
    removeRelation(index) {
        let { relationOrder } = this.state
        relationOrder.splice(index, 1)
        this.setState({ relationOrder: [...relationOrder] })
    }
    handOk = () => {
        const { form, activeKey, customerList } = this.props
        const { relationOrder } = this.state
        let customer = {}
        customerList.forEach(el => {
            if (el.key === activeKey) {
                customer = el
            }
        })

        form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    customer_member_id: customer.id,
                    service_member_id: values.service_member_id,
                    worksheet_type_id: values.worksheet_type_id,
                    im_conversation_key: activeKey,
                    worksheet_relations: relationOrder,
                    desc: values.desc
                }
                console.log(params)
                $api.customerService.creatWorkOrder(params, { success: true, loadingFn: this.toogleLoading })
                    .then(res => {
                        this.closeModal()
                    })
            }
        })
    }
    onSelect = (value) => {
        const { form } = this.props
        form.setFieldsValue({ 'service_member_id': value })
    }
    render() {
        const {
            modalVisible,
            form: { getFieldDecorator },
            user
        } = this.props
        const { loading, relationOrder, workOrderType } = this.state
        const drawerOpts = {
            title: '创建工单',
            width: 500,
            visible: modalVisible,
            maskClosable: false,
            destroyOnClose: true,
            onClose: this.closeModal,
        }
        const drawerFooterProps = {
            confirmLoading: loading,
            onCancel: this.closeModal,
            onOk: this.handOk
        }
        return (
            <Drawer {...drawerOpts} className={styles.createWorkOrder}>
                <Form {...formItemLayout}>
                    <FormItem label="客服账号">
                        {user.name} {`id（${user.id}）`}
                    </FormItem>
                    <FormItem label="工单类型">
                        {getFieldDecorator('worksheet_type_id', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择申请工单类型',
                                },
                            ],
                        })(
                            <Select getPopupContainer={trigger => trigger.parentNode}>
                                {workOrderType.map(el => <Option value={el.id} key={el.id}>{el.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="工单说明">
                        {getFieldDecorator('desc', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写工单说明',
                                },
                            ],
                        })(
                            <TextArea
                                placeholder="请填写工单说明（限200字）"
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                maxLength={200}
                            />
                        )}
                    </FormItem>
                    <FormItem label="关联单据">
                        {
                            relationOrder.map((el, index) => {
                                return (
                                    <div key={el.uid}>
                                        <Row gutter={8}>
                                            <Col span={9}>
                                                <Select
                                                    onChange={value => this.valueChange(value, 'relation_sn_type', index)}
                                                    getPopupContainer={trigger => trigger.parentNode} defaultValue={1}>
                                                    <Option value={1} key={1}>订单</Option>
                                                    <Option value={2} key={2}>售后服务单</Option>
                                                </Select>
                                            </Col>
                                            <Col span={14}>
                                                <Input maxLength={20} onChange={e => this.valueChange(e.target.value, 'relation_sn', index)} />
                                            </Col>
                                            <DeleteOutlined className={styles.modalIcon} onClick={() => this.removeRelation(index)} />
                                        </Row>
                                    </div>
                                );
                            })
                        }
                        <p
                            className="more fcblue6"
                            onClick={this.addRelation}
                        >
                            <PlusOutlined />
                            &nbsp;新增关联单
                        </p>
                    </FormItem>
                    <FormItem label="流转至">
                        {getFieldDecorator('service_member_id', {})(
                            <ServiceList />
                        )}
                    </FormItem>
                </Form>
                <DrawerFooter {...drawerFooterProps} />
            </Drawer>
        );
    }
}

export default CreateWorkOrder
