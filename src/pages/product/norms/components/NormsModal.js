import React, { useState } from 'react'
import { Modal, Form, Input, Tag, message } from 'antd'
import _ from 'lodash'

const NormsModal = ({handleSubmit, handleCancel, initForm = { values: [] } }) => {
  const [loading, setLoading] = useState(false)
  const [attr, setAttr] = useState(_.cloneDeep(initForm.values))
  const [name, setName ] = useState('');
  const [delAttr, setDelAttr] = useState([]);

  const [form] = Form.useForm()


  const submit = () => {
    setLoading(true)
    form.validateFields().then(value => {
      if (!attr.length) {
        message.warn('至少增加一个规格值.')
        setLoading(false);
        return
      }
      let requestBody = {}
      if (initForm.attr_item_id) {
        console.log('编辑')

        requestBody = {
          ...initForm,
          ...value,
          values: attr,
          del_val: delAttr.filter(i => i.attr_value_id).map(i =>i.attr_value_id).join(','),
        }
        Reflect.deleteProperty(requestBody, 'value');

        console.log(requestBody, 'requestBody')

        $api.specs.editSpecs(requestBody, {success: true }).then(res => {
          handleCancel()
          handleSubmit()
          setLoading(false)
        }).catch(err => {
          setLoading(false)
        })

      } else {
        console.log('新增')
        requestBody = {
          ...initForm,
          ...value,
          attr_item_value: attr.map(i =>i.attr_item_value).join(','),
        }
        Reflect.deleteProperty(requestBody, 'value');

        console.log(requestBody, 'requestBody')

        $api.specs.addSpecs(requestBody, {success: true }).then(res => {
          handleCancel()
          handleSubmit()
          setLoading(false)
        }).catch(err => {
          setLoading(false)
        })
      }

      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }


  const handleEnter = (e) => {
    const value = e && e.target && e.target.value.trim()
    if (value) {
      const filterArr = attr.filter(item => item.attr_item_value === value)
      filterArr && filterArr.length === 0 && attr.push({ attr_item_value: value })
      setAttr(attr)
      setName(value)
    }
    form.resetFields(['value'])

  }

  const handleTagDel = (e) => {
    const filterArr = attr.filter(i => i.attr_item_value !== e);
    setAttr(filterArr)
    setDelAttr(delAttr.concat(attr.filter(i => i.attr_item_value === e)))
  }

  const modalProps = {
    title: initForm.attr_item_id ? '编辑规格' : '新增规格',
    visible: true,
    width: 500,
    maskClosable: false,
    confirmLoading: loading,
    destroyOnClose: true,
    onOk: submit,
    onCancel: handleCancel,
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  return (
    <Modal {...modalProps}>
      <Form initialValues={initForm} form={form} {...formItemLayout}>
        <Form.Item label='规格名称' name='name' rules={[{
          required: true,
          message: '请输入规格名称',
        }]}>
          <Input maxLength={30}/>
        </Form.Item>

        <Form.Item label="规格值" required name="value">
          <div>
            {
              attr &&　attr.map(item => (
                <div key={item.attr_item_value} style={{ marginBottom: '8px', display: 'inline-block'}}>
                  <Tag closable onClose={e => handleTagDel(item.attr_item_value)}> {item.attr_item_value} </Tag>
                </div>
              ))
            }
            <div style={{ marginTop: '8px' }}>
              <Input maxLength={30} autoFocus={!!name} placeholder="请按enter添加" onPressEnter={handleEnter}/>
            </div>
          </div>

        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NormsModal
