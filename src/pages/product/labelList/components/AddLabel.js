import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select, Row, Col, Switch } from 'antd';
import styles from '../index.less'
const FormItem = Form.Item
const { Option } = Select

@Form.create()
@connect(({ loading, productLabelList }) => ({ loading, productLabelList }))
class AddLabel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      selectStyleData: {},
      styleList: props.styleList,
      customStatus: 'success',
      customHelp: ''
    }
  }
  handleOk = () => {
    const { form, onCancel, selectRow } = this.props
    const { selectStyleData } = this.state
    form.validateFields((err, values) => {
      if(Object.keys(selectStyleData).length === 0){
        this.setState({
          customStatus: 'error',
          customHelp: '请选择样式'
        })
        return
      }else{
        this.setState({
          customStatus: 'success',
          customHelp: ''
        })
      }
      values.status = values.status?1:2
      values.back_color = selectStyleData.background
      values.font_color = selectStyleData.textColor
      values.border_color = selectStyleData.borderColor
      if (!err) {
        $api.label
        .labelAdd(values, { success: true })
        .then(res => {
          this.props.dispatch({ type: `productLabelList/getList` })
          this.toogleLoading(false)
          onCancel()
        })
        .catch(_ => {
          this.toogleLoading(false)
        })
      }
    })
  }
  toogleLoading = loading => {
    this.setState({
      loading,
    })
  }
  selectStyle = (item, index) => {
    const { styleList } = this.state
    for(let i=0;i<styleList.length;i++){
      styleList[i].isSelect = false
    }
    styleList[index].isSelect = true
    this.setState({
      selectStyleData: item,
      styleList: [ ...styleList ]
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
      onCancel,
      selectRow,
    } = this.props
    const { loading, styleList, customStatus, customHelp } = this.state
    const title = '标签新增'
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const modalOpts = {
      title,
      width: 500,
      visible: true,
      maskClosable: false,
      confirmLoading: loading,
      onOk: this.handleOk,
      onCancel,
    }
    return (
      <Modal {...modalOpts}>
        <Form {...formItemLayout}>
          <FormItem label="标签名">
            {getFieldDecorator('label', {
              rules: [
                {
                  required: true,
                  message: '请填写标签名',
                },
              ],
            })(<Input maxLength={15} placeholder="请输入标签名" />)}
          </FormItem>

          <FormItem
          {...formItemLayout}
          validateStatus={customStatus}
          help={customHelp}
          label="样式"
          required={true}>
            <React.Fragment>
              <Row gutter={[16, 8]}>
              {
                styleList.map((it, index) => {
                  return (
                    <Col className="gutter-row" span={6} key={index} onClick={this.selectStyle.bind(this, it, index)}>
                      <div style={{background: (it.background), color: (it.textColor), border: `1px solid ${it.borderColor}`}} className={`${styles.style_box} ${it.isSelect?styles.select_box:''}`}>文字</div>
                    </Col>
                  )
                })
              }
              </Row>
            </React.Fragment>
          </FormItem>

          <FormItem label="标签状态">
            {getFieldDecorator('status', {
              valuePropName: 'checked',
              initialValue: false,
              rules: [
                {
                  required: true,
                  message: '请选择状态',
                },
              ],
            })(<Switch checkedChildren="启用" unCheckedChildren="禁用" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default AddLabel
