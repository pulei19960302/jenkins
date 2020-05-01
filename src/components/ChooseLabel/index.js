import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
const { Option } = Select

export default function ChooseLabel({ value, onChange, placeholder = "请选择标签", maxCount = 3 }) {
    let [init, setInit] = useState(false)
    let [list, setList] = useState([])

    useEffect(() => {
        if (init) return
        setInit(true)
        $api.label.labelList({ no_page_flag: true }).then(res => {
            setList(res.data.item || [])
        })
    }, [init])

    const handChange = (val) => {
        val.length <= maxCount && onChange(val)
    }
    return (
        <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            value={value}
            onChange={handChange}
            placeholder={placeholder}
            getPopupContainer={triggerNode => triggerNode.parentElement}>
            {
                list.map((el) =>
                    <Option value={el.id} key={el.id}>{el.label}</Option>
                )
            }
        </Select>
    )
}