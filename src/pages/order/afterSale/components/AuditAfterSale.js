/**
 * 进来先看看注释-审核流程
 *  退货
 *  待审核1-待用户发货2（填写商家收货地址和客户物流）-待退库3（确认退库）-待退款审核5
 *  换货（不展示订单退款）
 *  待审核1-待用户发货2（填写商家收货地址和客户物流）-待退库3（确认退库）-待售后发货4（填写客户收货地址和物流)
 *  补发（不展示订单退款）
 *  待审核1-待售后发货4（填写客户收货地址和物流)
 *  补偿（不展示订单退款）
 *  待审核1-退款审核5
 * 
 */

import { PureComponent } from 'react';
import { connect } from 'dva'
import account from 'accounting'
import Big from 'big.js'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Drawer, Descriptions, Radio, Input, Row, Col, message } from 'antd';
import { GoodsListEdit, ApplyInfo, ExpectAfterSale } from '../../components/CommonAfterSale'
import { InputNumberGroup, DrawerFooter } from 'components'
import CloseSale from './CloseSale'
import { cutOutDecimals } from 'utils'
import { nextTick } from 'utils/nextTick'
import styles from '../index.less'
import { SALE_TYPE, AFTER_SALE_STATUS, hasBtn } from '@/pages/order/constants'
const { WAIT_AUDIT, WAIT_CUSTOMER_SEND, WAIT_RETURN_LIBRARY } = AFTER_SALE_STATUS
const Option = Select.Option
const TextArea = Input.TextArea

@Form.create()
class AuditAfterSale extends PureComponent {
    state = {
        closeSaleModal: false,
        loading: false,
        return_goods_sku_list: [],
        status: 1,
        salesTypeList: SALE_TYPE,
        sale_type: '',  // 售后方式 1换货|2退货|3补偿|4补发
        sales_fee: 0, // 售后金额
        freight_type: 0, // 退还运费（0无|1补平台运费|2退用户运费/运费险）
        total_fee: 0  //合计
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.modalVisible && nextProps.modalVisible !== this.props.modalVisible) {
            console.log(nextProps.order)
            const { status, type, sale_fee_count_by_backend, total_fee, goods_infos, freight_type } = nextProps.order
            this.setState({
                status,
                freight_type,
                sale_type: type,
                sales_fee: sale_fee_count_by_backend,
                total_fee,
                return_goods_sku_list: goods_infos
            })
            console.log(nextProps);
        }
    }
    // 审核商品处理表单字段改变
    valueChange = (name, value) => {
        console.log(value)
        this.setState({ [name]: value })
        this.calculateTotal()
    }
    // 退货商品数量改变(退款金额和售后金额相应变化，并计算合计金额)
    getGoodsParams = return_goods_sku_list => {
        const goods_fee = return_goods_sku_list.reduce((total, el) => {
            return total + (el.count || 0) * el.goods_sale_price
        }, 0)
        this.setState({
            sales_fee: goods_fee,
            return_goods_sku_list,
        }, () => {
            this.props.form.setFieldsValue({ goods_fee })
            this.calculateTotal()
        })
    }
    // 计算合计金额
    calculateTotal = () => {
        const { getFieldsValue } = this.props.form
        const { sale_type } = this.state
        nextTick(() => {
            const { goods_fee = 0, add_fee = 0, freight_fee = 0, freight_type } = getFieldsValue()
            let total_fee = 0
            let freightFee = 0
            if (freight_type === 1) {
                freightFee = (-freight_fee)
            }
            if (freight_type === 2) {
                freightFee = (+freight_fee)
            }
            if (sale_type === 2) {  // 退货 (订单退款+补偿金额+退用户运费/运费险-补平台运费)
                total_fee = Big(+goods_fee).plus(+add_fee).plus(+freightFee).valueOf()
            } else {      // 其他 （补偿金额+退用户运费/运费险-补平台运费)
                total_fee = Big(+add_fee).plus(+freightFee).valueOf()
            }
            this.setState({ total_fee: +total_fee })
        })
    }
    // 终止售后
    closeAfterSale = () => {
        this.setState({
            closeSaleModal: true
        })
    }
    // 获取售后相关提交字段
    getAllParams = () => {
        const { return_goods_sku_list } = this.state
        const { order, form: { getFieldsValue }, } = this.props
        const values = getFieldsValue()
        return {
            return_goods_sku_list,
            sale_id: order.id,
            ...values
        }
    }
    // 修改信息
    modifyInfo = () => {
        const params = this.getAllParams()
        const { onCancel, successCallback } = this.props
        $api.order.modifyInfo(params, { success: true }).then(() => {
            onCancel()
            successCallback()
        })
    }
    // 确认售后
    confirmAfterSale = () => {
        const params = this.getAllParams()
        const { onCancel, successCallback } = this.props
        $api.order.confirmAfterSale(params, { success: true }).then(() => {
            onCancel()
            successCallback()
        })
    }
    // 确认用户寄回
    sendBack = () => {
        const { order, onCancel, successCallback, form: { getFieldsValue }, } = this.props
        const { logistics_code, logistics_sn, store_address } = getFieldsValue(['logistics_code', 'logistics_sn', 'store_address'])
        if (!logistics_code || !logistics_sn) {
            message.info('请补全客户返回物流信息')
            return
        }
        $api.order.sendBack({ sale_id: order.id, logistics_code, logistics_sn, store_address }, { success: true }).then(() => {
            onCancel()
            successCallback()
        })
    }
    // 确认退库
    returnLibrary = () => {
        const { order, onCancel, successCallback, } = this.props
        $api.order.returnLibrary({ sale_id: order.id, get_enduser_send: 1 }, { success: true }).then(() => {
            onCancel()
            successCallback()
        })
    }
    // 确认商家寄出
    businessSend = () => {
        const { order, onCancel, successCallback, form: { getFieldsValue }, } = this.props
        const { store_logistics_code, store_logistics_sn, receiver_address } = getFieldsValue(['store_logistics_code', 'store_logistics_sn', 'receiver_address'])
        if (!store_logistics_code || !store_logistics_sn) {
            message.info('请补全商家寄出物流信息')
            return
        }
        $api.order.businessSend({ sale_id: order.id, store_logistics_code, store_logistics_sn, receiver_address }, { success: true }).then(() => {
            onCancel()
            successCallback()
        })
    }

    handleOk = ({ key }) => {
        switch (key) {
            case -2:
                this.closeAfterSale()
                break;
            case -1:
                this.modifyInfo()
                break;
            case 1:
                this.confirmAfterSale()
                break;
            case 2:
                this.sendBack()
                break;
            case 3:
                this.returnLibrary()
                break;
            case 4:
                this.businessSend()
                break;
        }
    }
    getDrawerBtns() {
        const { status } = this.state
        const allBtns = [
            { name: '确认处理', key: 1, show: hasBtn('confirmAfterSale', status) },
            { name: '确认客户寄回', key: 2, show: hasBtn('sendBack', status) },
            { name: '商家收货', key: 3, show: hasBtn('returnLibrary', status) },
            { name: '确认商家寄出', key: 4, show: hasBtn('businessSend', status) },
            { name: '修改信息', key: -1, show: hasBtn('modifyInfo', status) },
            { name: '终止售后', key: -2, type: 'default', show: hasBtn('closeAfterSale', status) }
        ]
        let btns = allBtns.filter(el => el.show)
        return btns;
    }
    render() {
        const {
            modalVisible,
            form: { getFieldDecorator },
            onCancel,
            expressList,
            successCallback,
            order
        } = this.props
        const { closeSaleModal, salesTypeList, sale_type, status, loading, sales_fee, total_fee, freight_type } = this.state
        const drawerOpts = {
            title: '售后服务单审核',
            width: 750,
            visible: modalVisible,
            maskClosable: false,
            destroyOnClose: true,
            onClose: onCancel,
        }
        // console.log(type, status)

        const goodsListProps = {
            order,
            disabled: (sale_type === 1 && status > WAIT_CUSTOMER_SEND) || (sale_type === 2 && status > WAIT_RETURN_LIBRARY),
            onChange: this.getGoodsParams
        }

        const drawerFooterProps = {
            confirmLoading: loading,
            onOk: this.handleOk,
            btns: this.getDrawerBtns()
        }
        console.log(sale_type)
        return (
            <Drawer {...drawerOpts} className={styles.drawer}>
                <Form>
                    <GoodsListEdit {...goodsListProps} />
                    <ApplyInfo order={order} />
                    <div className={styles.blockContainer}>
                        <p className={styles.blockTitle}>售后处理意见</p>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="售后方式" >
                                <Col span={12}>
                                    {getFieldDecorator('sale_type', {
                                        initialValue: order.type
                                    })(
                                        <Select
                                            disabled={status !== WAIT_AUDIT}
                                            onChange={(value) => this.valueChange('sale_type', value)}
                                            getPopupContainer={trigger => trigger.parentNode}>
                                            {salesTypeList.map(el => <Option value={el.value} key={el.value}>{el.name}</Option>)}
                                        </Select>
                                    )}
                                </Col>
                            </Descriptions.Item>
                            <Descriptions.Item label={ExpectAfterSale(order)}>
                                {account.formatMoney(sales_fee, '￥')}
                            </Descriptions.Item>
                            <Descriptions.Item label="运费险">
                                {account.formatMoney(order.insurance_fee, '￥')}
                                {`（赔付金额￥${order.order_insurance_compensate || 0}）`}
                            </Descriptions.Item>
                            {sale_type === 2 &&
                                <Descriptions.Item label="订单退款" >
                                    <Col span={7}>
                                        {getFieldDecorator('goods_fee', {
                                            initialValue: order.goods_fee || null
                                        })(
                                            <InputNumberGroup
                                                formatter={value => cutOutDecimals(value, 2)}
                                                size="small"
                                                onChange={this.calculateTotal}
                                                addonAfter="元"
                                                max={sales_fee} />
                                        )}
                                    </Col>
                                    <Col span={16} offset={1}>
                                        提示：退款金额不能大于预计售后金额
                                    </Col>
                                </Descriptions.Item>
                            }
                            <Descriptions.Item label="补偿金额" >
                                <Row>
                                    <Col span={17}>
                                        {getFieldDecorator('add_type', {
                                            initialValue: order.add_type
                                        })(
                                            <Radio.Group>
                                                <Radio value={1}>返余额</Radio>
                                                <Radio value={2}>返佣金</Radio>
                                            </Radio.Group>
                                        )}
                                    </Col>
                                    <Col span={7}>
                                        {getFieldDecorator('add_fee', {
                                            initialValue: order.add_fee || null
                                        })(
                                            <InputNumberGroup size="small"
                                                formatter={value => cutOutDecimals(value, 2)}
                                                onChange={this.calculateTotal} addonAfter="元" />
                                        )}
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label="退还运费" >
                                {
                                    order.is_pay_freight === 1 &&
                                    <p style={{ color: "#ff4d4f" }}>已存在历史赔付</p>
                                }

                                <Row>
                                    <Col span={17}>
                                        {getFieldDecorator('freight_type', {
                                            initialValue: order.freight_type
                                        })(
                                            <Radio.Group onChange={(e) => this.valueChange('freight_type', e.target.value)}>
                                                <Radio value={0}>无</Radio>
                                                <Radio value={1}>补平台运费</Radio>
                                                <Radio value={2}>退用户运费/运费险</Radio>
                                            </Radio.Group>
                                        )}
                                    </Col>
                                    {
                                        freight_type !== 0 &&
                                        <Col span={7}>
                                            {getFieldDecorator('freight_fee', {
                                                initialValue: order.freight_fee || null
                                            })(
                                                <InputNumberGroup formatter={value => cutOutDecimals(value, 2)} size="small" onChange={this.calculateTotal} addonAfter="元" />
                                            )}
                                        </Col>
                                    }
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label="是否扣除返利">
                                {getFieldDecorator('is_rebate', {
                                    initialValue: order.is_rebate
                                })(
                                    <Radio.Group>
                                        <Radio value={0}>否</Radio>
                                        <Radio value={1}>是</Radio>
                                    </Radio.Group>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="合计">
                                {account.formatMoney(total_fee, '￥')}
                            </Descriptions.Item>
                            {[1, 2].includes(sale_type) &&
                                <Descriptions.Item label="商家收货地址" >
                                    {getFieldDecorator('store_address', {
                                        initialValue: order.store_address
                                    })(
                                        <TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={300} />
                                    )}
                                </Descriptions.Item>
                            }
                            {status > WAIT_AUDIT && [1, 2].includes(sale_type) &&
                                <Descriptions.Item label="客户返回物流信息" >
                                    <Row>
                                        <Col span={11}>
                                            {getFieldDecorator('logistics_code', {
                                                initialValue: order.logistics_code
                                            })(
                                                <Select placeholder="物流公司" getPopupContainer={trigger => trigger.parentNode}>
                                                    {expressList.map(el => <Option value={el.express_code} key={el.express_code}>{el.name}</Option>)}
                                                </Select>
                                            )}
                                        </Col>
                                        <Col span={12} offset={1}>
                                            {getFieldDecorator('logistics_sn', {
                                                initialValue: order.logistics_sn
                                            })(<Input placeholder="快递单号" />)}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            }
                            {status > WAIT_RETURN_LIBRARY && [1, 4].includes(sale_type) &&
                                <Descriptions.Item label="客户收货地址" >
                                    {getFieldDecorator('receiver_address', {
                                        initialValue: order.receiver_address
                                    })(
                                        <TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={300} />
                                    )}
                                </Descriptions.Item>
                            }
                            {status > WAIT_RETURN_LIBRARY && [1, 4].includes(sale_type) &&
                                <Descriptions.Item label="商家寄出物流信息" >
                                    <Row>
                                        <Col span={11}>
                                            {getFieldDecorator('store_logistics_code', {
                                                initialValue: order.store_logistics_code
                                            })(
                                                <Select placeholder="物流公司" getPopupContainer={trigger => trigger.parentNode}>
                                                    {expressList.map(el => <Option value={el.express_code} key={el.express_code}>{el.name}</Option>)}
                                                </Select>
                                            )}
                                        </Col>
                                        <Col span={12} offset={1}>
                                            {getFieldDecorator('store_logistics_sn', {
                                                initialValue: order.store_logistics_sn
                                            })(<Input placeholder="快递单号" />)}
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            }
                            <Descriptions.Item label="售后说明">
                                {getFieldDecorator('remark', {
                                    initialValue: order.remark
                                })(<TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={300} />)}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </Form>
                <DrawerFooter {...drawerFooterProps} />
                <CloseSale
                    modalVisible={closeSaleModal}
                    onCancel={() => { this.setState({ closeSaleModal: false }) }}
                    orderId={order.id}
                    successCallback={() => (onCancel() && successCallback())}
                />
            </Drawer>
        )
    }
}

export default Form.create()(AuditAfterSale)
