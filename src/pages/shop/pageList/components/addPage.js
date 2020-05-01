import React, { useState } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Select } from 'antd';
import { page_types } from './fields'


const { Option } = Select

const FormItem = Form.Item

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
const AddPageFn = function ({ form, toogle, visible, getList, total }) {

    const [loading, setLoading] = useState(false)

    const { getFieldDecorator } = form

    const submit = () => {
        form.validateFields(async (err, values) => {
            if (err) return
            await $api.shop.addPage(values, { success: true, loadingFn: setLoading })
            toogle(false)
            getList()
        })
    }
    let types = page_types
    let initialType = 2

    if (total) {
        types = page_types.filter(it => it.value !== 1)
    } else {
        initialType = 1
        types = page_types.filter(it => it.value === 1)
    }

    return (
        <Modal
            title="添加页面"
            visible={visible}
            onCancel={() => { toogle(false) }}
            onOk={submit}
            confirmLoading={loading}
            destroyOnClose
        >
            <Form {...formItemLayout}>
                <FormItem label="页面名称">
                    {getFieldDecorator('name', simpleRule)(<Input placeholder="请填写" />)}
                </FormItem>
                <FormItem label="页面类型">
                    {getFieldDecorator('page_type_id', {
                        initialValue: initialType,
                        ...simpleRule
                    })(
                        <Select placeholder="请选择">
                            {
                                types.map(it => <Option key={it.value} value={it.value}>{it.label}</Option>)
                            }
                        </Select>
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

export const AddPage = Form.create()(AddPageFn)