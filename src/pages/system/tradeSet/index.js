import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { InputNumber, Input, Table, Row, Col, Button, Checkbox } from 'antd'
import {debounce} from 'lodash'
import { Page, FSwitch, PageTitle } from 'components'
import { orderFields } from './components/fields'
import AfterSaleSet from './components/AfterSaleSet'
import PaymentSet from './components/PaymentSet'
import { TRADE_SET_SWITCH } from '../constants'
import styles from './index.less'

const AUTOCANCEL_MINUTES = '30'
const AUTORECEIVE_DAYS = '10'
const AUTOREBATE_DAYS = '0'

@Form.create()
@connect(({ tradeSet }) => ({ ...tradeSet }))
class TradeSet extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    toggleLoading = () => {
        this.setState((prevState) => ({
            loading: !prevState.loading
        }))
    }

    // toggleSwitchs = (key, checked) => {
    //     const { dispatch } = this.props
    //     dispatch({
    //         type: 'tradeSet/toggleSwitchs',
    //         payload: {
    //             key,
    //             checked,
    //         }
    //     })
    // }



    handleSubmit = () => {
        this.toggleLoading()
        const { trade = {} } = this.props
        $api.system.setTradeInfo({ data: trade }, { success: true }).finally(_ => {
            this.toggleLoading()
        })
    }

    handleChangeTrade = (keys = [], param = '', canDel = true) => {
        let value = param
        if ((param instanceof Object) && !(param instanceof Array)) {
            value = param.target && param.target.value
        }
        const { dispatch } = this.props
        dispatch({
            type: 'tradeSet/updateTradeInfo',
            payload: {
                keys,
                value,
                canDel,
            }
        })
    }

    // handleChangeCancelOrder = (event = {}, id = '') => {
    //     const { target = {} } = event
    //     const { checked = '' } = target
    //     const { cancelOrderList = [], dispatch } = this.props
    //     const newList = cancelOrderList.map((el) => {
    //         if (el.id === id) {
    //             return { ...el, checked }
    //         }
    //         return el
    //     })

    //     dispatch({
    //         type: 'tradeSet/updateState',
    //         payload: {
    //             cancelOrderList: newList
    //         }
    //     })
    // }

    // handleChangeEditOrder = (event = {}, id = '') => {
    //     const { target = {} } = event
    //     const { checked = '' } = target
    //     const { editOrderList = [], dispatch } = this.props
    //     const newList = editOrderList.map((el) => {
    //         if (el.id === id) {
    //             return { ...el, checked }
    //         }
    //         return el
    //     })

    //     dispatch({
    //         type: 'tradeSet/updateState',
    //         payload: {
    //             editOrderList: newList
    //         }
    //     })
    // }

    // renderPaymentSet() {
    //     const { form, switchs = {}, orderTypesList = [], dispatch } = this.props
    //     return <PaymentSet
    //         form={form}
    //         dispatch={dispatch}
    //         switchs={switchs}
    //         orderTypesList={orderTypesList}
    //         toggleSwitchs={this.toggleSwitchs}
    //     />
    // }

    renderAutoCancelSet() {
        const { trade = {} } = this.props
        const { order_auto_cancel = {} } = trade
        const { minutes = '', cancel_tips_message = '' } = order_auto_cancel
        return (
            <div className={styles.container}>
                <div className={`${styles.title} ${styles.flex}`}>
                    <span className={styles.mr20}>自动取消订单</span>
                </div>
                <Form.Item className={styles.item}>
                    <span className={styles.label}>客户下单后</span>
                    <InputNumber
                        min={1}
                        max={600}
                        placeholder="请输入"
                        precision={0}
                        value={minutes}
                        onChange={(value) => {
                            this.handleChangeTrade(['order_auto_cancel', 'minutes'], value || AUTOCANCEL_MINUTES)
                        }}
                    />
                    <span>&nbsp;&nbsp;min&nbsp;&nbsp;后未付款，自动取消订单</span>
                    <span className={styles.notes}>备注：请输入1-600之间的整数</span>
                </Form.Item>
                <Form.Item className={`${styles.item} ${styles.autoCancel}`}>
                    <span className={styles.label}>提醒内容</span>
                    <Input.TextArea
                        placeholder="请输入自动取消提醒内容"
                        value={cancel_tips_message}
                        onChange={(event) => {
                            this.handleChangeTrade(['order_auto_cancel', 'cancel_tips_message'], event)
                        }}
                        maxLength={50}
                    />
                </Form.Item>
            </div>
        )
    }

    renderAutoReceiveSet() {
        const { trade = {} } = this.props
        const { order_auto_confirm_receipt = {} } = trade
        const { flag = '', days = '', confirm_tips_message = '' } = order_auto_confirm_receipt
        return (
            <div className={styles.container}>
                <div className={`${styles.title} ${styles.flex}`}>
                    <span className={styles.mr20}>自动收货设置</span>
                    <FSwitch
                        onChange={(checked) => {
                            this.handleChangeTrade(['order_auto_confirm_receipt', 'flag'], checked, false)
                        }}
                        values={[true, false]}
                        value={flag}
                    />
                </div>
                {
                    flag && (
                        <div className={styles.content}>
                            <Form.Item className={styles.item}>
                                <span className={styles.label}>商家发货</span>
                                <InputNumber
                                    min={1}
                                    max={30}
                                    placeholder="请输入"
                                    precision={0}
                                    value={days}
                                    onChange={(value) => {
                                        this.handleChangeTrade(['order_auto_confirm_receipt', 'days'], value || AUTORECEIVE_DAYS)
                                    }}
                                />
                                <span>&nbsp;&nbsp;天&nbsp;&nbsp;后客户未确认收货，自动完成收货</span>
                                <span className={styles.notes}>备注：请输入1-30之间的整数</span>
                            </Form.Item>
                            <Form.Item className={`${styles.item} ${styles.autoReceive}`}>
                                <span className={styles.label}>提醒内容</span>
                                <Input.TextArea
                                    placeholder="请输入自动收货提醒内容"
                                    value={confirm_tips_message}
                                    onChange={(event) => {
                                        this.handleChangeTrade(['order_auto_confirm_receipt', 'confirm_tips_message'], event)
                                    }}
                                    maxLength={50}
                                />
                            </Form.Item>
                        </div>
                    )
                }
            </div>
        )
    }

    // renderAutoCommentSet() {
    //     const { switchs = {}, form: { getFieldDecorator } } = this.props
    //     const { autoComment = false } = switchs
    //     return (
    //         <div className={styles.container}>
    //             <div className={`${styles.title} ${styles.flex}`}>
    //                 <span className={styles.mr20}>自动评价设置</span>
    //                 <FSwitch
    //                     onChange={(checked) => {
    //                         this.toggleSwitchs('autoComment', checked)
    //                     }}
    //                     value={autoComment}
    //                 />
    //             </div>
    //             {
    //                 (autoComment === TRADE_SET_SWITCH.TRUE) && (
    //                     <Form.Item type="flex" className={styles.item}>
    //                         <span className={styles.label}>订单完成超过</span>
    //                         {
    //                             getFieldDecorator('eee')(
    //                                 <InputNumber min={1} max={30} placeholder="请输入" precision={0} />
    //                             )
    //                         }
    //                         <span>&nbsp;&nbsp;天&nbsp;&nbsp;自动五星好评</span>
    //                     </Form.Item>
    //                 )
    //             }
    //         </div>
    //     )
    // }

    renderAutoRebateSet() {
        const { trade = {} } = this.props
        const { order_auto_rebate = {} } = trade
        const { days = '' } = order_auto_rebate
        return (
            <div className={styles.container}>
                <div className={`${styles.title} ${styles.flex}`}>
                    <span className={styles.mr20}>自动返利设置</span>
                </div>
                <Form.Item className={styles.item}>
                    <span className={styles.label}>订单完成超过</span>
                    <InputNumber
                        min={0}
                        max={30}
                        placeholder="请输入"
                        precision={0}
                        value={days}
                        onChange={(value) => {
                            this.handleChangeTrade(['order_auto_rebate', 'days'], value || AUTOREBATE_DAYS)
                        }}
                    />
                    <span>&nbsp;&nbsp;天&nbsp;&nbsp;自动返利</span>
                    <span className={styles.notes}>备注：请输入0-30之间的整数</span>
                </Form.Item>
            </div>
        )
    }

    // renderAfterSaleSet() {
    //     const { trade = {}, form, dispatch } = this.props
    //     const { order_after_market = {} } = trade
    //     return (
    //         <AfterSaleSet
    //             order_after_market={order_after_market}
    //             onChangeTrade={this.handleChangeTrade}
    //             form={form}
    //             dispatch={dispatch}
    //         />
    //     )
    // }

    // renderCancelOrderSet() {
    //     const { switchs = {}, cancelOrderList = [], form: { getFieldDecorator } } = this.props
    //     const { cancelOrder = false } = switchs

    //     return (
    //         <div className={styles.container}>
    //             <div className={styles.title}>取消订单设置</div>
    //             <div>
    //                 <div className={`${styles.flex} ${styles.item}`}>
    //                     <span className={styles.label}>允许取消订单</span>
    //                     <FSwitch
    //                         onChange={(checked) => {
    //                             this.toggleSwitchs('cancelOrder', checked)
    //                         }}
    //                         value={cancelOrder}
    //                     />
    //                 </div>
    //                 {
    //                     (cancelOrder === TRADE_SET_SWITCH.TRUE) && (
    //                         <div className={styles.cancelOrder}>
    //                             {
    //                                 cancelOrderList && cancelOrderList.map((el) => {
    //                                     const { id = '', checked = '', text = '' } = el
    //                                     return (
    //                                         <Checkbox key={id}
    //                                             checked={checked}
    //                                             onChange={(event) => { this.handleChangeCancelOrder(event, id) }}>
    //                                             {text}
    //                                         </Checkbox>
    //                                     )
    //                                 })
    //                             }
    //                         </div>)
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    // renderEditOrderSet() {
    //     const { switchs = {}, editOrderList = [], form: { getFieldDecorator } } = this.props
    //     const { editOrder = false } = switchs
    //     return (
    //         <div className={styles.container}>
    //             <div className={styles.title}>修改订单设置</div>
    //             <div>
    //                 <div className={`${styles.flex} ${styles.item}`}>
    //                     <span className={styles.label}>允许修改订单</span>
    //                     <FSwitch
    //                         onChange={(checked) => {
    //                             this.toggleSwitchs('editOrder', checked)
    //                         }}
    //                         value={editOrder}
    //                     />
    //                 </div>
    //                 {
    //                     (editOrder === TRADE_SET_SWITCH.TRUE) && (
    //                         <div className={styles.editOrder}>
    //                             {
    //                                 editOrderList && editOrderList.map((el) => {
    //                                     const { id = '', checked = '', text = '' } = el
    //                                     return (
    //                                         <Checkbox key={id} checked={checked}
    //                                             onChange={(event) => { this.handleChangeEditOrder(event, id) }}>
    //                                             {text}
    //                                         </Checkbox>
    //                                     )
    //                                 })
    //                             }
    //                         </div>)
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        const { loading } = this.state
        const { handleSubmit } = this
        return (
            <Page>
                <Form>
                    {/* {this.renderPaymentSet()} */}
                    {this.renderAutoCancelSet()}
                    {this.renderAutoReceiveSet()}
                    {/* {this.renderAutoCommentSet()} */}
                    {this.renderAutoRebateSet()}
                    {/* {this.renderAfterSaleSet()} */}
                    {/* {this.renderCancelOrderSet()} */}
                    {/* {this.renderEditOrderSet()} */}
                    {
                        $api.system.setTradeInfo.permission() && (
                            <div className={styles.submit}>
                                <Button type="primary" loading={loading} onClick={debounce(handleSubmit, 300)}>提交</Button>
                            </div>
                        )
                    }
                </Form>
            </Page>
        )
    }
}

export default TradeSet