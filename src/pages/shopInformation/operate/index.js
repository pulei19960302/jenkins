import { PureComponent } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col, Card } from 'antd';

class Operate extends PureComponent{

  componentDidMount() {
    this.props && this.props.onRef('operate', this);
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const requestBody = {
          ...values,
          update_type: 2
        }
        // $api.system.saveCompanyOperator(values, {success: true}).then()
        $api.system.saveCompany(requestBody, {success: true}).then()

      }
    })
    this.props.toggleLoading(false)
  }
  render() {
    const { operator_name, operator_phone, operator_wechat, operator_qq, operator_email } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Card title='运营人信息'>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="姓名">
                {getFieldDecorator('operator_name', {
                  initialValue: operator_name,
                  rules: [
                    { required: true, message: '请输入姓名', },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="电话">
                {getFieldDecorator('operator_phone', {
                  initialValue: operator_phone,
                  rules: [
                    { required: true, message: '请输入电话', },
                  ],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="微信号">
                {getFieldDecorator('operator_wechat', {
                  initialValue: operator_wechat
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="QQ">
                {getFieldDecorator('operator_qq', {
                  initialValue: operator_qq
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="邮箱">
                {getFieldDecorator('operator_email', {
                  initialValue: operator_email
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Operate)
