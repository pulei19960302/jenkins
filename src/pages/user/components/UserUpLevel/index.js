import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
const FormItem = Form.Item

const { Option } = Select;

@Form.create()
@connect(({ loading }) => ({ loading }))
class UserType extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      loading: false,
      fetching: false,
      users: []
    }
    this.fetchUser = debounce(this.fetchUser, 200);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.userLevelData !== nextProps.userLevelData) {
      const { id } = nextProps.userLevelData

      this.setState({
        id,
      })
      this.props.form.resetFields()
    }
  }
  handleCancel = () => {
    this.props.toogle(false)
  }
  handleOk = () => {
    const { form } = this.props
    form.validateFields(async (err, values) => {
      if (err) return
      await $api.user.userUpLevel({
        member_ids: this.state.id.toString().split(',').map((item) => (+item)),
        ...values
      }, { success: true, loadingFn: this.toogleLoading })

      this.props.toogle(false)
      this.props.getList()
    })

  }
  toogleLoading = (loading) => {
    this.setState({
      loading
    })
  }
  fetchUser = (keyword) => {
    this.setState({
      fetching: true,
      users: []
    })
    $api.user.userListEs({ keyword }).then(res => {
      const { data: items } = res.data
      let users = []
      if (items) {
        users = items.map(it => ({
          text: it.nickname,
          value: it.id
        }))
      }
      this.setState({
        users,
        fetching: false
      })
    })
  }
  render() {
    const { visible, form } = this.props
    const { getFieldDecorator } = form
    const { loading, fetching, users } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <Modal
        title="调整上级"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={loading}
      >
        <Form {...formItemLayout}>
          <FormItem>
            {getFieldDecorator('new_member_id', {
              rules: [
                {
                  required: true,
                  message: '请填写上级id',
                },
              ],
            })(<Select
              showSearch
              placeholder="输入ID或昵称搜索"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              style={{ width: '100%' }}
            >
              {users.map(d => (
                <Option key={d.value}>{d.text}</Option>
              ))}
            </Select>)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
export default UserType
