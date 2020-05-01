import React, { useState } from 'react'
import { Form, Modal, Input, Switch, Select, InputNumber } from 'antd'
import { UploadImg } from 'components'
import styles from '../index.less'
import { SWITCH_TYPE } from '../constant'

const SecondaryModal = ({ treeData = [], getList, handleCancel, initForm = { status: SWITCH_TYPE.FORBIDDEN } }) => {
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  console.log(initForm)

  const uploadImageChange = (result) => {
    form.setFieldsValue({ thumb: result[0] })
  }

  const licenseProps = {
    pic: initForm ? initForm.thumb : '',
    fileTotalCount: 1,
    dataChange: uploadImageChange,
  }


  const submit = () => {
    setLoading(true)
    form.validateFields().then(value => {
      const requestBody = {
        ...initForm,
        ...value,
        status: value.status ? 1 : 2
      }
      if (!initForm.id) {
        $api.category.categoryAdd(requestBody, { success: true }).then(res => {
          getList()
          handleCancel()
        }).catch(_ => {
          setLoading(false)
        })
      } else {
        $api.category.categoryEdit(requestBody, { success: true }).then(res => {
          getList()
          handleCancel()
        }).catch(_ => {
          setLoading(false)
        })
      }
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }


  // const sortUnquieValidator = async (rule, value) => {
  //   console.log(rule)
  //   if (value) {
  //     // const { data } = await $api.category.sortUnquie({ pid: initForm.id, sort: value })
  //   } else {
  //     return Promise.reject('请输入类目排序')
  //   }
  // }

  const inputChange = async (arg) => {
    console.log(arg)
    if (!arg || arg >= 1000) return ;
    const pid = form.getFieldValue('pid');
    const queryParams = {
      pid,
      id:initForm.id,
      sort: arg,
      method: 'sort'
    }

    const data = initForm.id ? await $api.category.categoryEdit(queryParams) : await $api.category.categoryAdd(queryParams)

    if (data && data.data === false) {
      form.setFields([
        {
          name: 'sort',
          value: arg,
          errors: ['此排序存在']
        }
      ])
    }
  }

  const debounce = (fn, delay = 400) => {
    let handle = null;
    return (e) => {
      clearTimeout(handle)
      handle = setTimeout(() => {
        fn(e)
      }, delay)
    }
  }


  const modalProps = {
    title: initForm.id ? '编辑二级类目' : '新增二级类目',
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
      <Form initialValues={{ ...initForm, status: Number(initForm.status) === 1 }} form={form}>
        <Form.Item label="上级类目" name="pid" rules={[{
          required: true,
          message: '请选着上级类目',
        }]}>
          <Select>
            {
              treeData.map(item => {
                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item label="类目名称" name="name" rules={[{
          required: true,
          message: '请填写类目名称',
        }]}
        >
          <Input placeholder="请填写类目名称" maxLength={20} autoComplete='off'/>
        </Form.Item>

        <Form.Item label="类目排序" name="sort" rules={[{
          required: true,
          message: '请输入类目排序',
        }]}>
          <InputNumber max={999} min={1} precision={0} onChange={debounce(inputChange)}/>
        </Form.Item>


        <Form.Item label="类目图片" name="thumb" rules={[{
          required: true,
          message: '请上传类目图片',
        }]}>
          <div className={styles.uploadHint_box}>
            <UploadImg {...licenseProps} />
            <div className={styles.uploadHint_content}>
              <p>1.格式：图片仅支持JPG，PNG格式</p>
              <p>2.大小：建议1M以内</p>
            </div>
          </div>
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

export default SecondaryModal
