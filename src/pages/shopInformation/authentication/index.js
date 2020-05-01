import React, { PureComponent } from 'react';
import moment from 'moment';

import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

import { Row, Col, DatePicker, Input, Card } from 'antd';
import { UploadImg } from 'components';
import styles from './index.less';

const { RangePicker } = DatePicker;

class Authentication extends PureComponent{

  componentDidMount() {
    this.props && this.props.onRef('auth', this);
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const legal_validity_start = values['legal_validity_times'][0].format('YYYY-MM-DD');
        const legal_validity_end = values['legal_validity_times'][1].format('YYYY-MM-DD');
        const license_start = values['license_times'][0].format('YYYY-MM-DD');
        const license_end = values['license_times'][1].format('YYYY-MM-DD');

        const requestBody = {
          ...values,
          legal_validity_start, legal_validity_end, license_start, license_end,
          update_type: 3
        }
        Reflect.deleteProperty(requestBody, 'legal_validity_times');
        Reflect.deleteProperty(requestBody, 'license_times');
        console.log(requestBody, '这里是requestBody');
        // $api.system.saveCompanyAuth(requestBody, {success: true});
        $api.system.saveCompany(requestBody, {success: true});

      }
    })
    this.props.toggleLoading(false);
  }

  handleImgChange = (e, time) => {
    const { setFieldsValue } = this.props.form
    setFieldsValue({ [time]: e && e.length > 0 && e[0] || '' })
  }


  checkPrice = (rule, value, callback) => {
    if (!!value) {
      return callback()
    }
    callback('请上传图片')
  }

  render() {

    const { legal_header = "", legal_back = "", legal_validity_start, legal_validity_end, license_img = "", license_start, license_end, license_text } = this.props;
    const { getFieldDecorator } = this.props.form;

    let legal_validity_times = []
    if (legal_validity_start && legal_validity_end ) {
      legal_validity_times = [moment(legal_validity_start, 'YYYY-MM-DD'), moment(legal_validity_end, 'YYYY-MM-DD')];
    }

    let license_times = []
    if (license_start && license_end) {
      license_times = [moment(license_start, 'YYYY-MM-DD'), moment(license_end, 'YYYY-MM-DD')];
    }

    console.log(legal_back)

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }

    return (
      <Card title='认证资料'>
        <Form { ...formItemLayout } onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label='法人身份证'>
                <div style={{display: 'flex'}}>
                  <div>
                    {
                      getFieldDecorator('legal_header',{
                        initialValue: legal_header ? legal_header : '',
                        valuePropName: 'pic',
                        rules: [{ required: true, validator: this.checkPrice }],
                      })(<UploadImg fileTotalCount={1} desc='正面' dataChange={(event) => this.handleImgChange(event, 'legal_header')}/>)
                    }
                  </div>
                  <div>
                    {
                      getFieldDecorator('legal_back', {
                        initialValue: legal_back ? legal_back : '',
                        valuePropName:'pic',
                        rules: [{ required: true, validator: this.checkPrice }],
                      })(<UploadImg fileTotalCount={1} desc='反面' dataChange={(event) => this.handleImgChange(event, 'legal_back')}/>)
                    }
                  </div>
                  <div className={styles.desc}>
                    <span>1.格式：图片仅支持JPG,PNG格式</span>
                    <br/>
                    <span>2.大小：建议1M以内</span>
                  </div>
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='身份证有效期'>
                {
                  getFieldDecorator('legal_validity_times', {
                    initialValue: legal_validity_times,
                    rules: [{ type: 'array', required: true, message: '请选择法人身份有效期' }],
                  })(
                    <RangePicker format="YYYY-MM-DD"/>
                  )
                }
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label='营业执照'>
                <div style={{display: 'flex'}}>
                  {
                    getFieldDecorator('license_img', {
                      initialValue: license_img ? license_img : '',
                      valuePropName: 'pic',
                      rules: [{ required: true, validator: this.checkPrice }],
                    })(<UploadImg fileTotalCount={1} desc='上传图片' dataChange={(event) => this.handleImgChange(event, 'license_img')}/>)
                  }

                  <div className={styles.desc}>
                    <span>1.格式：图片仅支持JPG,PNG格式</span>
                    <br/>
                    <span>2.大小：建议1M以内</span>
                  </div>
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='营业执照有效期'>
                {
                  getFieldDecorator('license_times', {
                    initialValue: license_times,
                    rules: [{ type: 'array', required: true, message: '请选择营业执照有效期' }],
                  })(
                    <RangePicker format="YYYY-MM-DD"/>
                  )
                }
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label='其他说明'>
                {getFieldDecorator('license_text', {
                  initialValue: license_text
                })(
                  <Input.TextArea maxLength={500} autoSize={{ minRows: 4, maxRows: 8 }}/>,
                )}
              </Form.Item>

            </Col>
          </Row>
        </Form>

      </Card>
    )
  }
}

export default  Form.create()(Authentication)
