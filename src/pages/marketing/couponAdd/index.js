import React, { PureComponent } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Button, Card, message, Spin } from 'antd';
import { connect } from 'dva'
import moment from 'moment'
import { Page } from 'components'
import Message from './components/Message'
import Using from './components/Using'
import { COUPON_TYPE, OVER_TYPE, SEND_TYPE, USRE_TYPE, EDIT_STATUS, FORMAT, TIMEFORMAT } from '../constants'
import styles from './index.less'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
}

@Form.create()
@connect(({ couponAdd }) => ({
  ...couponAdd,
}))
class CouponAdd extends PureComponent {
  constructor(props) {
    super(props)

    const { view } = this.props.history.location.query
    this.state = {
      saveLoading: false,
      pubLoading: false,
      loading: false,
      view,
    }
  }

  componentDidMount() {
    this.getCouponByIds()
  }

  toogleSaveLoading = (saveLoading) => {
    this.setState({
      saveLoading
    })
  }

  tooglePubLoading = (pubLoading) => {
    this.setState({
      pubLoading
    })
  }

  toogleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }))
  }

  getCouponByIds = async () => {
    const { dispatch, form } = this.props
    const { id } = this.props.history.location.query

    if (!id) return null

    this.toogleLoading()
    await $api.coupon.getCouponByIds({ coupon_id_str: id }).then((res) => {
      const { data = [] } = res || {}
      const formValue = data && data[0]
      const {
        name = '',
        type = '',
        waiver_amount = '',
        max = '',
        be_over_type = '',
        num = '',
        start_at = '', end_at = '',
        days = '',
        user_num = '',
        send_type = '',
        user_type = '',
        user_type_content = '',
        send_type_content = '',
        good_type = '',
        good_ids = '',
      } = formValue
      const waiverAmountCash = (type === COUPON_TYPE.CASH && waiver_amount) || ''
      const waiverAmountMoneyOff = (type === COUPON_TYPE.MONEY_OFF && waiver_amount) || ''
      const maxAmount = (type === COUPON_TYPE.MONEY_OFF && max) || ''
      const overTypeTime = (be_over_type === OVER_TYPE.TIME && start_at && end_at && [moment(start_at, TIMEFORMAT), moment(end_at, TIMEFORMAT)]) || ''
      const userContentInitiative = (send_type === SEND_TYPE.INITIATIVE) && (user_type === USRE_TYPE.TYPE) && user_type_content
        && user_type_content.split(',').map((key) => { return +key })
      const sendContentUpdate = (send_type === SEND_TYPE.USER_UPDATE) && send_type_content
        && send_type_content.split(',').map((key) => { return +key })
      const sendContentRecharge = (send_type === SEND_TYPE.RECHARGE && send_type_content) || ''
      const sendContentConsume = (send_type === SEND_TYPE.CONSUME && send_type_content) || ''

      form.setFieldsValue({
        name,
        type,
        be_over_type,
        num,
        user_num,
        send_type,
        good_type,
      })
      dispatch({
        type: 'couponAdd/updateCouponForm',
        payload: {
          waiverAmountCash,
          waiverAmountMoneyOff,
          maxAmount,
          overTypeTime,
          days: (be_over_type === OVER_TYPE.DAYS && days) || 0,
          userType: user_type,
          userContentInitiative,
          sendContentUpdate,
          sendContentRecharge,
          sendContentConsume,
          good_ids,
        },
      })
    })
    this.toogleLoading()
  }

  save = (publish) => {
    const { productList = [] } = this.props

    const good_ids = productList && productList.map((product) => {
      return product.goods_id
    })

    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const { id, copy = '' } = this.props.history.location.query
      const good_id_str = good_ids && good_ids.join(',')

      const {
        over_type_time,
        user_type,
        user_type_content_initiative,
        send_type_content_update,
        type,
        waiver_amount_cash, waiver_amount_money_off,
        good_num,
        send_type,
        send_type_content_recharge,
        send_type_content_consume,
        max,
        user_num,
        good_type,
        discount,
        ...otherDatas
      } = values

      const start_at = over_type_time && over_type_time[0].format(FORMAT)
      const end_at = over_type_time && over_type_time[1].format(FORMAT)

      let waiver_amount, user_type_content, send_type_content
      switch (type) {
        case COUPON_TYPE.CASH:
          waiver_amount = waiver_amount_cash
          break;
        case COUPON_TYPE.MONEY_OFF:
          waiver_amount = waiver_amount_money_off
          break;
        default:
          break;
      }

      switch (send_type) {
        case SEND_TYPE.INITIATIVE:
          user_type_content = user_type_content_initiative && user_type_content_initiative.join(',')
          break
        case SEND_TYPE.USER_UPDATE:
          send_type_content = send_type_content_update && send_type_content_update.join(',')
          break
        case SEND_TYPE.RECHARGE:
          send_type_content = send_type_content_recharge && send_type_content_recharge.toString()
          break;
        case SEND_TYPE.CONSUME:
          send_type_content = send_type_content_consume && send_type_content_consume.toString()
          break;
        default:
          break;
      }

      const params = {
        ...otherDatas,
        type,
        start_at: start_at || '',
        end_at: end_at || '',
        user_type: user_type || 0,
        send_type: send_type || 0,
        user_type_content: user_type_content || '',
        send_type_content: send_type_content || '',
        max: max || 0,
        user_num: user_num || 0,
        good_type: good_type || 0,
        waiver_amount: waiver_amount || 0,
        good_num: good_num || 0,
        discount: discount || 0,
        status: !publish ? EDIT_STATUS.SAVE : EDIT_STATUS.PUBLISH,
        good_id_str: good_id_str || '',
      }

      const loadingFn = !publish ? this.toogleSaveLoading : this.tooglePubLoading

      if (good_type === 1 && !good_id_str) {
        message.warning('请选择商品')
        return
      }

      if (type === COUPON_TYPE.MONEY_OFF && (max < waiver_amount)) {
        message.warning('使用条件需要大于或等于优惠券面额')
        return
      }

      if (id !== undefined && !copy) {
        await $api.coupon.editCoupon({ coupon_id: parseInt(id), ...params }, { success: true, loadingFn: loadingFn })
      } else {
        await $api.coupon.addCoupon(params, { success: true, loadingFn: loadingFn })
      }

      this.props.history.push({
        pathname: `/marketing/couponList`,
      })

      this.props.dispatch({
        type: 'couponAdd/updateState',
        payload: {
          couponForm: {},
          productList: [],
        }
      })
    });
  }

  render() {
    const { saveLoading, pubLoading, view, loading } = this.state
    const { form, dispatch } = this.props
    const { create, id } = this.props.history.location.query
    let { couponForm = {} } = this.props
    couponForm = !create ? couponForm : {}

    if (view) {
      return (
        <Page>
          {
          loading && (
            <div className={styles.spinner}>
              <Spin className={styles.spin} />
            </div>
          )
        }
          <Form {...formItemLayout} labelAlign={"left"} colon={false} style={{ position: 'relative' }}>
            <Message form={form} couponForm={couponForm} />
            <Using form={form} />
            <div className={styles.overlay}></div>
          </Form>
        </Page>
      )
    }

    return (
      <Page>
        {
          loading && (
            <div className={styles.spinner}>
              <Spin className={styles.spin} />
            </div>
          )
        }
        <Form {...formItemLayout} labelAlign={"left"} colon={false} autoComplete='off'>
          <Message form={form} couponForm={couponForm} dispatch={dispatch} />
          <Using form={form} />
          <Card style={{ marginTop: '20px' }}>
            <Row type="flex" justify="center">
              <Button style={{ marginRight: '20px' }} onClick={() => { this.save() }} loading={saveLoading}>
                保存
              </Button>
              <Button type="primary" style={{ marginLeft: '20px' }} onClick={() => { this.save('publish') }} loading={pubLoading}>
                发布
            </Button>
            </Row>
          </Card>
        </Form>
      </Page>
    )
  }
}

export default CouponAdd