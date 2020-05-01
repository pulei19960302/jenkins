import React, { useState } from 'react'
import { Form, Modal, Input, Switch, InputNumber } from 'antd'
import { SWITCH_TYPE } from '../constant'


const FirstCategoryModal = ({ treeData, handleCancel, handleSubmit, initForm = { status: SWITCH_TYPE.FORBIDDEN, is_diy: 1 } }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()


  const getIsRepeat = (arr, id, key, value) => {
    // 编辑， 排除掉自己和其他比
    const isAddOrEditArr = !id ? arr : arr.filter(item => item.id !== id)
    const filterArr = isAddOrEditArr.filter(item => item[key] === value)
    return filterArr.length > 0
  }

  const submit = () => {
    setLoading(true)
    form.validateFields().then(value => {
      const requestBody = {
        ...initForm,
        ...value,
        pid: 0,
        status: value.status ? 1 : 2
      }
      Reflect.deleteProperty(requestBody, 'is_diy')
      if (initForm.id) {
        $api.category.categoryEdit(requestBody, { success: true }).then(_ => {
          submitAfter();
        }).catch(_ => {
          setLoading(false)
        })
      } else {
        $api.category.categoryAdd(requestBody, { success: true }).then(_ => {
          submitAfter();
        }).catch(_ => {
          setLoading(false)
        })
      }
    }).catch(err => {
      setLoading(false)
    })
  }

  const submitAfter = () => {
      setLoading(false)
      handleSubmit()
      handleCancel()
  }

  const validator = (rule, value) => {
    if (value) {
      return (getIsRepeat(treeData, initForm.id , 'name', value ) ? Promise.reject('此名称已存在！') : Promise.resolve())
    } else {
      return Promise.reject('请输入类目名称！')
    }
  }

  const sortValidator = (rule, value) => {
    if (value) {
      return (getIsRepeat(treeData, initForm.id , 'sort', value ) ? Promise.reject('此排序已存在！') : Promise.resolve())
    } else {
      return Promise.reject('请输入排序！')
    }
  }


  const modalProps = {
    title: initForm.id ? '编辑一级类目' : '新增一级类目',
    visible: true,
    width: 500,
    maskClosable: false,
    confirmLoading: loading,
    destroyOnClose: true,
    onOk: submit,
    onCancel: handleCancel,
  }


  return (
    <Modal {...modalProps}>
      <Form initialValues={{ ...initForm, status: initForm.status === SWITCH_TYPE.ENABLE }} form={form}>
        <Form.Item label="类目名称" name="name" rules={[{
          required: true,
          validator: validator,
        }]}
        >
          {
            (initForm.is_diy === 1) ? <Input placeholder="请填写类目名称" maxLength={20} autoComplete='off'/> :
              <div>{initForm.name}</div>
          }
        </Form.Item>
        <Form.Item label="类目排序" name="sort" rules={[{
          required: true,
          validator: sortValidator,
        }]}>
          <InputNumber min={1} max={999} precision={0}/>
        </Form.Item>
        <Form.Item label="类目状态" name="status" rules={[{
          required: true,
        }]} valuePropName="checked">
          <Switch checkedChildren="启用" unCheckedChildren="禁用"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FirstCategoryModal
