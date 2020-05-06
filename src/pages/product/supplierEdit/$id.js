import { connect } from 'dva'
import React, { PureComponent } from 'react'
import { Page, ChooseAddress, PageTitle, UploadImg } from 'components'
import { mobileReg, bankCardReg } from 'utils/constant'
import styles from './index.less'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Radio, Select, Row, Col, Button, TreeSelect, Divider } from 'antd';
const FormItem = Form.Item
const { Option } = Select
const { SHOW_ALL } = TreeSelect
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
}

@Form.create()
@connect(({ user, supplierDetail, loading }) => ({
  user,
  loading,
  supplierDetail,
}))
class SupplierEdit extends PureComponent {
  constructor(props) {
    super(props)
    const id = parseInt(this.props.match.params.id)
    this.state = {
      id,
      brandsList: [],
      categoryList: [],
      province: '',
      city: '',
      district: '',
      imagesData: [],
      sale_text: [],
    }
  }

  componentDidMount() {
    const { id } = this.state
    this.getBrandsList()
    this.getCategoryList()
    if (id !== 0) {
      this.getDetails(id)
    }
  }

  // 品牌list获取
  getBrandsList = () => {
    $api.supplier.supplierBrandsList({}).then(res => {
      this.setState({
        brandsList: res.data,
      })
    })
  }

  // 类目list获取
  getCategoryList = () => {
    $api.supplier.supplierCategoryList({}).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].title = res.data[i].name
        res.data[i].value = res.data[i].id
        res.data[i].key = res.data[i].id
        for (let j = 0; j < res.data[i].sub.length; j++) {
          res.data[i].sub[j].title = res.data[i].sub[j].name
          res.data[i].sub[j].value = res.data[i].sub[j].id
          res.data[i].sub[j].key = res.data[i].sub[j].id
        }
        res.data[i].children = res.data[i].sub
        delete res.data[i].sub
      }
      this.setState({
        categoryList: res.data,
      })
    })
  }

  handleChangeAddressLabel = ({ province = '', city = '', district = '' }) => {
    this.setState({
      province,
      city,
      district,
    })
  }

  // 新增/修改提交
  submitForm = e => {
    const { id, brandsList, categoryList, province, city, district, sale_text } = this.state
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      const datas = JSON.parse(JSON.stringify(values))
      delete datas.addresses
      const baseParam = Object.assign(datas, {
        ...values.addresses,
        province,
        city,
        district,
      })

      if (baseParam.brand_ids) {
        let brandText = []
        for (let i = 0; i < baseParam.brand_ids.length; i++) {
          for (let j = 0; j < brandsList.length; j++) {
            if (baseParam.brand_ids[i] === brandsList[j].id) {
              brandText.push(brandsList[j].name)
            }
          }
        }
        baseParam.brand_text = brandText.join(',')
        baseParam.brand_ids = baseParam.brand_ids.join(',')
      }
      if (baseParam.sale_type) {
        baseParam.sale_type = baseParam.sale_type.join(',')
        baseParam.sale_text = sale_text && sale_text.join(',')
      }
      if (baseParam.images) {
        baseParam.images = baseParam.images.join(',')
      }
      if (id !== 0) {
        baseParam.id = id
        $api.supplier.supplierEdit(baseParam, { success: true }).then(_ => {
          this.props.history.push({
            pathname: `/product/supplierList`,
          })
        })
      } else {
        $api.supplier.supplierAdd(baseParam, { success: true }).then(_ => {
          this.props.history.push({
            pathname: `/product/supplierList`,
          })
        })
      }
    })
  }

  // 重置
  resetForm = () => {
    this.props.form.resetFields()
  }

  // 编辑获取详情数据
  getDetails = id => {
    $api.supplier.supplierDetail({ id }).then(res => {
      if (res.data.brand_ids !== '') {
        res.data.brand_ids = res.data.brand_ids.split(',')
        for (let i = 0; i < res.data.brand_ids.length; i++) {
          res.data.brand_ids[i] = parseInt(res.data.brand_ids[i])
        }
      } else {
        res.data.brand_ids = undefined
      }
      if (res.data.sale_type !== '') {
        res.data.sale_type = res.data.sale_type.split(',')
        for (let i = 0; i < res.data.sale_type.length; i++) {
          res.data.sale_type[i] = parseInt(res.data.sale_type[i])
        }
      } else {
        res.data.sale_type = undefined
      }
      if (res.data.license_img !== '') {
        res.data.license_img = res.data.license_img.split(',')
      } else {
        res.data.license_img = undefined
      }
      const {
        name,
        short_name,
        alipay,
        contact,
        phone,
        address,
        company_type,
        bank_name,
        bankno,
        open_name,
        brand_ids,
        sale_type,
        province_id,
        city_id,
        district_id,
        license_img,
        province = '',
        district = '',
        city = '',
        sale_text = '',
      } = res.data
      const addresses = {
        province_id,
        city_id,
        district_id
      }
      this.props.form.setFieldsValue({
        name,
        short_name,
        alipay,
        contact,
        phone,
        address,
        company_type,
        bank_name,
        bankno,
        open_name,
        brand_ids,
        sale_type,
        addresses
      })
      this.setState({
        province,
        district,
        city,
        imagesData: license_img,
        sale_text: sale_text && sale_text.split(','),
      })
    })
  }

  logoChange(result) {
    this.setState({
      imagesData: result,
    })
    this.props.form.setFieldsValue({ images: result, })
  }

  handleChangeSaleText = (value, label = [], extra) => {
    console.log(label)
    this.setState({
      sale_text: label
    })
  }

  render() {
    const { resetForm } = this
    const { brandsList, categoryList, imagesData } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form
    const licenseProps = {
      pic: imagesData,
      fileTotalCount: 9,
      dataChange: this.logoChange.bind(this),
    }


    return (
      <Page className={styles.supplierEdit} style={{ backgroundColor: '#fff' }} inner>
        <PageTitle />
        <Divider />
        <Form {...formItemLayout} onSubmit={this.submitForm}>
          <p className={styles.title_font}>基本信息</p>
          <Row>
            <Col span={12}>
              <FormItem label="供应商名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请填写供应商名称',
                    },
                  ],
                })(<Input placeholder="请输入供应商名称" autoComplete='off' />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="简称">
                {getFieldDecorator('short_name', {
                  rules: [
                    {
                      required: true,
                      message: '请填写简称',
                    },
                  ],
                })(<Input placeholder="请输入简称" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="支付宝号(对公)">
                {getFieldDecorator('alipay', {
                  rules: [
                    {
                      required: true,
                      message: '请填写支付宝号(对公)',
                    },
                  ],
                })(<Input placeholder="请输入支付宝号(对公)" />)}
              </FormItem>
            </Col>
            <Col span={12}></Col>
          </Row>

          <p className={styles.title_font}>联系方式</p>
          <Row>
            <Col span={12}>
              <FormItem label="联系人">
                {getFieldDecorator('contact', {
                  rules: [
                    {
                      required: true,
                      message: '请填写联系人',
                    },
                  ],
                })(<Input placeholder="请输入联系人" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="联系电话">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '请填写联系电话',
                    },
                    { pattern: mobileReg, message: '手机号格式不正确' },
                  ],
                })(<Input placeholder="请输入联系电话" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="发货地址">
                {getFieldDecorator('addresses', {
                  rules: [
                    {
                      required: true,
                      message: '请选择省/市/区',
                    },
                  ],
                })(<ChooseAddress getPopupContainer={triggerNode => triggerNode.parentElement} placeholder="请选择地址" onChangeLabel={this.handleChangeAddressLabel} />)}
              </FormItem>
            </Col>
            <Col span={24} pull={2}>
              <FormItem label="详细地址">
                {getFieldDecorator('address', {
                  rules: [
                    {
                      required: true,
                      message: '请填写发货地址',
                    },
                  ],
                })(
                  <TextArea autoSize={{ minRows: 4, maxRows: 6 }} maxLength={300} style={{ width: '50%' }}
                    placeholder="请输入详细地址" />
                )}
              </FormItem>
            </Col>
            <Col span={24} pull={2}>
              <FormItem
                label="供应商类型"
                help="供应商类型为代发时，对应的商品订单将会流转至供应商系统，由供应商系统进行发货"
              >
                {getFieldDecorator('company_type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择供应商类型',
                    },
                  ],
                })(
                  <Radio.Group onChange={this.typeChange}>
                    <Radio value={1}>自营</Radio>
                    <Radio value={2}>代发</Radio>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>

          <p className={styles.title_font}>银行账号</p>
          <Row>
            <Col span={12}>
              <FormItem label="银行名称">
                {getFieldDecorator('bank_name', {
                  rules: [
                    {
                      required: true,
                      message: '请填写银行名称',
                    },
                  ],
                })(<Input placeholder="请输入银行名称" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="银行账号">
                {getFieldDecorator('bankno', {
                  rules: [
                    {
                      required: true,
                      message: '请填写银行账号',
                    },
                    { pattern: bankCardReg, message: '银行账号格式不正确' },
                  ],
                })(<Input placeholder="请输入银行账号" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="开户名称">
                {getFieldDecorator('open_name', {
                  rules: [
                    {
                      required: true,
                      message: '请填写开户名称',
                    },
                  ],
                })(<Input placeholder="请输入开户名称" />)}
              </FormItem>
            </Col>
            <Col span={12}></Col>
          </Row>

          <p className={styles.title_font}>经营范围</p>
          <Row>
            <Col span={12}>
              <FormItem label="品牌">
                {getFieldDecorator('brand_ids', {
                  rules: [
                    {
                      required: true,
                      message: '请选择品牌',
                    },
                  ],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择品牌"
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                  >
                    {brandsList &&
                      brandsList.map(it => {
                        return (
                          <Option value={it.id} key={it.id}>
                            {it.name}
                          </Option>
                        )
                      })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="类目">
                {getFieldDecorator('sale_type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择类目',
                    },
                  ],
                })(
                  <TreeSelect
                    treeData={categoryList}
                    treeCheckable={true}
                    showCheckedStrategy="SHOW_ALL"
                    searchPlaceholder="请选择类目"
                    style={{
                      width: '100%',
                    }}
                    onChange={this.handleChangeSaleText}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <p className={styles.title_font}>经营资质</p>
          <Row>
            <Col span={12}>
              <FormItem label="经营资质">
                {getFieldDecorator('images', {
                  rules: [
                    {
                      required: false,
                      message: '请上传经营资质',
                    },
                  ],
                })(
                  <div>
                    <UploadImg {...licenseProps} />
                    <div className={styles.uploadHint_content}>
                      <p>1.格式：图片仅支持JPG，PNG格式</p>
                      <p>2.大小：建议1M以内</p>
                    </div>
                  </div>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={8} push={2}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                  提交
                </Button>
                <Button onClick={resetForm} style={{ marginRight: 10 }}>重置</Button>
                {/* <Button>返回</Button> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Page>
    )
  }
}

export default SupplierEdit
