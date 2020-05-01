import { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Drawer, message } from 'antd';
import GoodsList from './GoodsList'
import { UploadImg, DrawerFooter } from 'components'
import { mobileReg } from 'utils/constant'
import styles from './index.less'
const FormItem = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option

@Form.create()
@connect(({ app }) => ({ app }))
class ApplyAfterSale extends PureComponent {
  state = {
    loading: false,
    salesType: this.props.app.enums.apply_type || [],
    salesReason: [],
    return_goods_sku_list: [],
    img: [],
  }
  componentDidMount() {
    $api.order.getSaleReason().then(({ data }) => {
      this.setState({
        salesReason: data
      })
    })
  }
  // 关闭前重置state
  closeModal = () => {
    const { onCancel } = this.props
    this.setState({
      return_goods_sku_list: [],
      img: [],
    })
    onCancel()
  }
  // 退货商品勾选改变
  getGoodsParams = return_goods_sku_list => {
    this.setState({ return_goods_sku_list })
  }
  // 上传图片改变
  picChange = (img) => {
    this.setState({ img })
  }
  handOk = () => {
    const { form, order, successCallback } = this.props
    const { img, return_goods_sku_list } = this.state
    if (!return_goods_sku_list.length) {
      message.info(`至少选择一个商品`)
      return
    }
    form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          img,
          return_goods_sku_list,
          order_sn: order.order_sn,
          id: order.id,
          uid: order.uid,
        }
        console.log(params)
        $api.order
          .applyAfterSale(params, { success: true, loadingFn: this.toogleLoading })
          .then(res => {
            successCallback()
            this.closeModal()
          })
      }
    })
  }
  render() {
    const {
      order,
      goods_info,
      modalVisible,
      form: { getFieldDecorator },
    } = this.props
    const { loading, salesType, salesReason } = this.state
    const drawerOpts = {
      title: '申请售后',
      width: 650,
      visible: modalVisible,
      maskClosable: false,
      destroyOnClose: true,
      onClose: this.closeModal,
    }
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    }
    const drawerFooterProps = {
      confirmLoading: loading,
      onCancel: this.closeModal,
      onOk: this.handOk
    }
    return (
      <Drawer {...drawerOpts} className={styles.drawer}>
        <Form {...formItemLayout} className={styles.afterSaleForm}>
          <GoodsList order={order} onChange={this.getGoodsParams} goods_info={goods_info} />
          <div className={styles.applyReason}>
            <p className={styles.blockTitle}>申请信息</p>
            <FormItem label="申请类型">
              {getFieldDecorator('sale_type', {
                initialValue: 2,
                rules: [
                  {
                    required: true,
                    message: '请选择申请类型',
                  },
                ],
              })(
                <Select getPopupContainer={trigger => trigger.parentNode}>
                  {salesType.map(el => <Option value={el.value} key={el.value}>{el.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem label="申请原因">
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: true,
                    message: '请选择申请原因',
                  },
                ],
              })(
                <Select getPopupContainer={trigger => trigger.parentNode}>
                  {salesReason.map(el => <Option value={el.id} key={el.id}>{el.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem label="原因详情">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请选择申请原因',
                  },
                ],
              })(
                <TextArea
                  placeholder="详细描述客户问题及需要申请售后的原因(限200字)"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                  maxLength={300}
                />
              )}
            </FormItem>
          </div>
          <div>
            <p className={styles.blockTitle}>
              上传凭证<span className={styles.tips}>(最多可以上传5张图片)</span>
            </p>
            <UploadImg fileTotalCount={5} dataChange={this.picChange} />
          </div>
          <div className={styles.returnAddress}>
            <p className={styles.blockTitle}>退换货收货信息</p>
            <FormItem label="收货人姓名">
              {getFieldDecorator('receiver_name', {
                initialValue: order.receiver_name,
                rules: [
                  {
                    required: true,
                    message: '请输入快递单号',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="收货人电话">
              {getFieldDecorator('receiver_mobile', {
                initialValue: order.receiver_mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                  { pattern: mobileReg, message: '手机号格式不正确' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="收货地址">
              {getFieldDecorator('receiver_address', {
                initialValue: `${order.receiver_province_name}${order.receiver_city_name}${order.receiver_district_name}${order.receiver_address}`,
                rules: [
                  {
                    required: true,
                    message: '请填写收货地址',
                  },
                ],
              })(
                <TextArea placeholder="请填写收货地址(限200字)" autoSize={{ minRows: 4, maxRows: 6 }} maxLength={200} />
              )}
            </FormItem>
          </div>
        </Form>
        <DrawerFooter {...drawerFooterProps} />
      </Drawer>
    )
  }
}

export default ApplyAfterSale
