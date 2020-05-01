import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input } from 'antd';
import { ChooseAddress, CommonTable, FSwitch } from 'components'
import { getColumns } from './fields'
import styles from './addressList.less'
import { mobileReg } from 'utils/constant'

const FormItem = Form.Item

export default function ({ list = [], uid, fresh }) {
  let [showEditAddress, setShowEditAddress] = useState(false)
  let [receiverInfo, setReceiverInfo] = useState(null)
  const toogleEditAddress = boo => {
    setReceiverInfo({})
    setShowEditAddress(boo)
  }
  const onEdit = row => {
    setReceiverInfo(row)
    setShowEditAddress(true)
  }
  const onDel = id => {
    $api.user.userAddressDel({
      member_id: uid,
      address_id: id
    }, { success: true }).then(_ => {
      fresh()
    })
  }
  return (
    <div>
      <CommonTable
        dataSource={list}
        pagination={false}
        columns={getColumns(onEdit, onDel)}
      ></CommonTable>
      {
        $api.user.userAddressAdd.permission() &&
        <div
          className={`${styles.addAddressBtn} fcblack5`}
          onClick={() => {
            toogleEditAddress(true)
          }}
        >
          <PlusOutlined className="mr8"></PlusOutlined>
        新增收货地址
      </div>
      }

      {showEditAddress && (
        <EditAddress uid={uid} fresh={fresh} toogle={toogleEditAddress} receiverInfo={receiverInfo}></EditAddress>
      )}
    </div>
  );
}

const EditAddressFn = function ({ toogle, form, receiverInfo = {}, uid, fresh }) {
  const [loading, setLoading] = useState(false)
  const { name, phone, address, is_default = 0, id, city_id, province_id, district_id } = receiverInfo
  const submit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const datas = JSON.parse(JSON.stringify(values))
        delete datas.addressObj
        const baseParam = Object.assign(datas, {
          member_id: uid,
          ...values.addressObj
        })
        if (id) {
          baseParam.address_id = id
          await $api.user.userAddressEdit(baseParam, { success: true, loadingFn: setLoading })
        } else {
          await $api.user.userAddressAdd(baseParam, { success: true, loadingFn: setLoading })
        }
        fresh()
        toogle(false)
      }
    })
  }
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }
  const simpleRule = {
    rules: [
      {
        required: true,
        message: '请填写',
      },
    ],
  }
  return (
    <Modal
      title="收货地址"
      visible={true}
      onOk={submit}
      confirmLoading={loading}
      onCancel={() => {
        toogle(false)
      }}
    >
      <Form {...formItemLayout}>
        <FormItem label="收货人">
          {getFieldDecorator('name', { initialValue: name, ...simpleRule })(<Input placeholder="请填写" />)}
        </FormItem>
        <FormItem label="手机号">

          {getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
              {
                required: true,
                message: '请输入手机号',
              },
              { pattern: mobileReg, message: '手机号格式不正确' },
            ],
          })(<Input placeholder="请填写" maxLength="11" />)}

        </FormItem>
        <FormItem label="省市区">
          {getFieldDecorator('addressObj', {
            initialValue: {
              city_id,
              district_id,
              province_id
            },
            rules: [
              {
                type: 'object',
                required: true,
                message: '请选择地址',
                validator: (e, v, callback) => {
                  callback(v.province_id && v.city_id ? undefined : e.message)
                }
              },
            ],
          })(<ChooseAddress placeholder="请选择地址"></ChooseAddress>)}
        </FormItem>

        <FormItem label="详细地址">
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [
              {
                required: true,
                message: '请填写详细地址',
              },
            ],
          })(
            <Input.TextArea placeholder="请填写详细地址(限300字)" autosize={{ minRows: 4, maxRows: 6 }} maxLength={300} />
          )}
        </FormItem>
        {/* <FormItem label="详细地址">
          {getFieldDecorator('address', { initialValue: address, ...simpleRule })(<Input placeholder="请填写" />)}
        </FormItem> */}
        <FormItem label="默认地址">
          {getFieldDecorator('is_default', { initialValue: is_default })(<FSwitch />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

export const EditAddress = Form.create()(EditAddressFn)
