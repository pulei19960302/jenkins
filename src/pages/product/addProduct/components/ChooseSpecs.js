import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
const { Option } = Select

export default function ChooseSpecs({ value, onChange }) {
    let [init, setInit] = useState(false)
    let [list, setList] = useState([])

    useEffect(() => {
        if (init) return
        setInit(true)
        $api.specs.getSpecsList({ no_page_flag: true }).then(res => {
            setList(res.data.item || [])
        })
    }, [init])

    return (
        <Select
            showSearch
            optionFilterProp="children"
            mode="multiple"
            value={value}
            onChange={(value) => onChange(list, value)}
            placeholder="请选择规格"
            getPopupContainer={triggerNode => triggerNode.parentElement}>
            {
                list.map((el) =>
                    <Option value={el.attr_item_id} key={el.attr_item_id}>{el.name}</Option>
                )
            }
        </Select>
    )
}