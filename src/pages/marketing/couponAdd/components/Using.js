import React, { PureComponent } from 'react'
import { CloseCircleFilled } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Radio, Row, Col, Card, Checkbox, Button } from 'antd';
import { connect } from 'dva'
import { InputNumberGroup, RelateProduct, ChooseGoods } from 'components'
import { cutOutDecimals } from 'utils'
import styles from '../index.less'
import { SEND_TYPE, USRE_TYPE } from '../../constants'

@connect(({ couponAdd }) => ({
  ...couponAdd,
}))
class Using extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showProductModal: false,
    }
  }

  componentDidMount() {
    const { dispatch, userContentFields } = this.props

    if (!userContentFields.length) {
      dispatch({
        type: 'couponAdd/getUserContentFields'
      })
    }
    this.getRelatedProductByIds()
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { couponForm: { good_ids = '' } } = nextprops
    const { couponForm: { good_ids: ids = '' } } = this.props
    if (good_ids !== ids) {
      this.getProduct(good_ids)
    }
  }

  handleUpdateCouponForm = (values = {}) => {
    const { dispatch } = this.props
    dispatch({
      type: 'couponAdd/updateCouponForm',
      payload: {
        ...values,
      }
    })
  }

  toogleProductModal = () => {
    this.setState((prevState) => ({
      showProductModal: !prevState.showProductModal
    }))
  }

  getRelatedProductByIds = () => {
    const { couponForm: { good_ids = '' } } = this.props
    this.getProduct(good_ids)
  }

  getProduct = (ids = '') => {
    if (!ids) return
    const { dispatch } = this.props
    const goods_ids = ids.split(',')
    dispatch({
      type: 'couponAdd/getProductsByIds',
      payload: { goods_ids }
    })
  }

  handleSelectedProduct = (ids, datas) => {
    const { dispatch } = this.props
    datas && dispatch({
      type: 'couponAdd/updateState',
      payload: {
        productList: datas
      }
    }) 
  }

  handleDeleteProduct = (goods_id) => {
    const { dispatch, productList } = this.props
    const list = productList && productList.filter((product) => {
      return product.goods_id !== goods_id
    })

    dispatch({
      type: 'couponAdd/updateState',
      payload: {
        productList: list
      }
    })
  }

  getUserTypes = () => {
    const { form, userContentFields, couponForm = {} } = this.props
    const { getFieldDecorator } = form
    const userType = userContentFields.length && couponForm.userType ? couponForm.userType : USRE_TYPE.ALL

    return (
      <div>
        <Card className={styles.userType}>
          {
            getFieldDecorator('user_type', {
              initialValue: userType,
            })(
              <Radio.Group
                onChange={(event) => {
                  const { value } = event && event.target
                  this.handleUpdateCouponForm({ userType: value })
                }}
              >
                <Radio value={USRE_TYPE.ALL} className={styles.radioBlock}>所有人</Radio>
                <Radio value={USRE_TYPE.TYPE} className={`${styles.radioBlock} ${styles.userContents}`} disabled={!userContentFields.length}>
                  按用户类型
                {
                    (userType === USRE_TYPE.TYPE) && (this.getUserContents('user_type_content_initiative'))
                  }
                </Radio>
              </Radio.Group>)
          }
        </Card>
      </div>
    )
  }

  getUserContents = (key) => {
    const { form: { getFieldDecorator }, userContentFields, couponForm = {} } = this.props
    const { userContentInitiative = [], sendContentUpdate = [] } = couponForm
    const fieldRule = { rules: [{ type: 'array', required: true, message: '请选择用户类型' }] }
    let initialValue, onChange

    if (key === 'user_type_content_initiative') {
      initialValue = userContentInitiative
      onChange = (value) => { this.handleUpdateCouponForm({ userContentInitiative: value }) }
    } else if (key === 'send_type_content_update') {
      initialValue = sendContentUpdate
      onChange = (value) => { this.handleUpdateCouponForm({ sendContentUpdate: value }) }
    }

    if (userContentFields.length) {
      return (
        <Form.Item style={{ marginLeft: 25, marginBottom: -30 }}>
          {
            getFieldDecorator(key, {
              ...fieldRule,
              initialValue: initialValue || [],
            })(
              <Checkbox.Group onChange={onChange} className={styles.userContents}>
                {
                  userContentFields.map(obj => <Checkbox key={obj.value} value={obj.value}>{obj.name}</Checkbox>)
                }
              </Checkbox.Group>
            )
          }
        </Form.Item>
      )
    }
  }

  getSendContents = (key) => {
    const { form: { getFieldDecorator }, couponForm = {} } = this.props
    const { sendContentRecharge, sendContentConsume } = couponForm
    let initialValue, onChange

    if (key === 'send_type_content_recharge') {
      initialValue = sendContentRecharge
      onChange = (value) => { this.handleUpdateCouponForm({ sendContentRecharge: value }) }
    } else if (key === 'send_type_content_consume') {
      initialValue = sendContentConsume
      onChange = (value) => { this.handleUpdateCouponForm({ sendContentConsume: value }) }
    }

    return (
      <Card className={styles.messageCard}>
        <Form.Item className={styles.mb_0}>
          <Row type="flex" justify="space-between" align="middle">
            <Col>满</Col>
            <Col className={`${styles.mr_10} ${styles.ml_10} ${styles.flex_1}`}>
              {
                getFieldDecorator(key, {
                  rules: [{
                    required: true, message: '请填写金额',
                  }],
                  initialValue: initialValue,
                })(<InputNumberGroup addonAfter="元" onChange={onChange} formatter={value => cutOutDecimals(value, 2)} />)
              }
            </Col>
            <Col>送</Col></Row>
        </Form.Item>
      </Card>
    )
  }

  getSelectedProduct = () => {
    const { productList } = this.props

    if (productList && productList.length) {
      const products = productList.map((product, index) => {
        const { goods_id, title, main_img, shop_price, total_stock, checked } = product
        return (
          <Col key={goods_id || index} span={6}>
            <div className={styles.product}>
              <img src={main_img} className={styles.productImg} />
              <span>{title}</span>
              <CloseCircleFilled
                className={styles.close}
                onClick={() => { this.handleDeleteProduct(goods_id) }} />
            </div>
          </Col>
        );
      })

      return (
        <Row className={styles.products} gutter={24} type="flex">
          {products}
          <Col className={styles.chooseMore}><Button className={styles.chooseBtn} onClick={this.toogleProductModal}>选择商品</Button></Col>
        </Row>
      )
    }

    return (
      <Row style={{ marginTop: '-13px', marginBottom: '10px' }}>
        <Col push={2}><Button className={styles.chooseBtn} onClick={this.toogleProductModal}>选择商品</Button></Col>
      </Row>
    )
  }

  renderSendTypes = () => {
    const { form, userContentFields } = this.props
    const { getFieldDecorator } = form
    let sendType = (form && form.getFieldValue('send_type')) || SEND_TYPE.INITIATIVE

    if (sendType === SEND_TYPE.USER_UPDATE && !userContentFields.length) {
      sendType = SEND_TYPE.INITIATIVE
    }

    return (
      <Form.Item label="发放方式">
        {
          getFieldDecorator('send_type', {
            initialValue: sendType,
          })(
            <Radio.Group className={styles.sendType}>
              <Radio value={SEND_TYPE.INITIATIVE} className={styles.radioBlock}>
                主动领取
                  {(sendType === SEND_TYPE.INITIATIVE) && this.getUserTypes()}
              </Radio>
              <Radio value={SEND_TYPE.NEW_USER} className={styles.radioBlock} disabled>新用户注册</Radio>
              <Radio value={SEND_TYPE.USER_UPDATE} className={styles.radioBlock} disabled={!userContentFields.length} disabled>用户升级为
                  {(sendType === SEND_TYPE.USER_UPDATE) && (
                  <div>
                    <Card className={`${styles.messageCard} ${styles.userUpdate}`}>
                      {this.getUserContents('send_type_content_update')}
                    </Card>
                  </div>
                )}
              </Radio>
              <Radio value={SEND_TYPE.RECHARGE} className={styles.radioBlock} disabled>充值满送
                  {(sendType === SEND_TYPE.RECHARGE) && this.getSendContents('send_type_content_recharge')}
              </Radio>
              <Radio value={SEND_TYPE.CONSUME} className={styles.radioBlock} disabled>消费满送
                  {(sendType === SEND_TYPE.CONSUME) && this.getSendContents('send_type_content_consume')}
              </Radio>
            </Radio.Group>
          )
        }
      </Form.Item>
    )
  }

  renderUsingProduct = () => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const goodType = form.getFieldValue('good_type') || 0

    return (
      <div>
        <Form.Item label="适用商品">
          {
            getFieldDecorator('good_type', {
              initialValue: goodType,
            })(
              <Radio.Group className={styles.radioGroup}>
                <Radio value={0}>全部商品</Radio>
                <Radio value={1}>指定商品</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        {(goodType === 1) && this.getSelectedProduct()}
      </div>
    )
  }

  render() {
    const { showProductModal } = this.state
    const { form, productList = [] } = this.props
    const { getFieldDecorator } = form
    const ids = productList && productList.map((data) => (data.goods_id))

    return (
      <Card title="发放使用" style={{ marginTop: '20px' }}>
        <div style={{ width: '80%' }}>
          <Form.Item label="每人限领">
            {
              getFieldDecorator('user_num', {
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]*[1-9][0-9]*$/,
                    message: '请填写领取数 ( 正整数 )',
                  },
                ],
              })(
                <InputNumberGroup addonAfter="张" formatter={value => cutOutDecimals(value)} />
              )
            }
          </Form.Item>
          {this.renderSendTypes()}
          {this.renderUsingProduct()}
        </div>
        <ChooseGoods
          visible={showProductModal}
          toogle={this.toogleProductModal}
          submit={this.handleSelectedProduct}
          choosed={ids}
        />
      </Card >
    );
  }
}

export default Using