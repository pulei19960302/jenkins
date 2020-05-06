import React, { useEffect, useState } from 'react'
import { Select } from 'antd'

const { Option } = Select
export default function CommonSelect({ value, onChange, type, selectPorps = {} }) {
    let [init, setInit] = useState(false)
    let [list, setList] = useState([])
    let [placeholder, setPlaceholder] = useState("")

    useEffect(() => {
        if (init) return
        setInit(true)
        switch (type) {
            case 'freightTemplate':
                $api.common.getFreightTemplate({ no_page_flag: true }).then((res) => {
                    setList(res.data || [])
                    setPlaceholder('请选择运费模板')
                })
                break
            case 'supplier':
                $api.supplier.supplierSelectData({ status: 1 }).then((res) => {
                    setList(res.data || [])
                    setPlaceholder('请选择供应商')
                })
                break
            case 'freightInsurance':
                $api.common.getInsurance({ no_page_flag: true }).then((res) => {
                    setList(res.data || [])
                    setPlaceholder('请选择运费险')
                })
                break
            case 'brand':
                $api.brands.brandsSelectList().then((res) => {
                    setList(res.data.item || [])
                    setPlaceholder('请选择品牌')
                })
                break
        }

    }, [init, type])

    return (
        <Select
            showSearch
            optionFilterProp="children"
            {...selectPorps}
            value={list.find(el => el.id === value) ? value : undefined}
            onChange={onChange}
            placeholder={placeholder}
            getPopupContainer={triggerNode => triggerNode.parentElement}>
            {
                list.map((el) =>
                    <Option value={el.id} key={el.id}>{el.name}</Option>
                )
            }
        </Select>
    )
}