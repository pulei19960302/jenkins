/**
 * searchFields 这一项这么写
  {
    type:'mutipulLevelInput',
    enums: [
        { value: 1, name: '推荐人' },
        { value: 2, name: '直属上级' },
        { value: 3, name: '间接上级' },
    ],
    placeholders:['用户等级','输入id'],
    searchKeys: ['recommend_user_level', 'recommend_user_id'],
    key:'searchUserLevel',
    inputType:'Number'
  },
 */
import React, { useState, useEffect } from 'react'
import { Select, Input } from 'antd'
import { cutOutDecimals } from 'utils/index'
const { Option } = Select

export default function ({
    onChange,
    value = [],
    inputType = 'text',
    initProps = {},
    enums,
    placeholders = ['请选择', '请输入'],
    selectWidth = 100,
    initialValue = []
}) {
    const [select, selectChange] = useState(value[0] || initialValue[0] || undefined)
    const [input, inputChange] = useState(value[1] || initialValue[1] || undefined)
    useEffect(() => {
        selectChange(value[0] || initialValue[0] || undefined)
        inputChange(value[1] || initialValue[1] || undefined)
    }, [initialValue, value])
    const handleChange = (type, v) => {
        if (type === 'select') {
            selectChange(v)
            onChange([v, input])
        } else {
            if (inputType === 'Number' && v !== '') {
                if (initProps.min !== undefined && initProps.min > v) {
                    v = initProps.min
                }
                v = cutOutDecimals(v, 0)
            }

            inputChange(v)
            onChange([select, v])
        }
    }
    const selectBefore = (
        <Select value={select} onChange={e => { handleChange('select', e) }} placeholder={placeholders[0]} style={{ width: selectWidth }}>
            {
                enums.map((it, i) => <Option key={i} value={it.value}>{it.name}</Option>)
            }
        </Select>
    );

    return (
        <Input {...initProps} style={{ verticalAlign: 'middle', marginBottom: 3 }} value={input} onChange={e => { handleChange('input', e.target.value) }} type={inputType} addonBefore={selectBefore} placeholder={placeholders[1]} />
    )
}