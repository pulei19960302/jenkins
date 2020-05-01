import React, { useState, useEffect, Fragment } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';

// eslint-disable-next-line valid-jsdoc
// eslint-disable-next-line valid-jsdoc
/* eslint-disable valid-jsdoc */
/**
 * 这是一个表单组件
 * @param {*} level 1 到市 2 到区 默认到区
 * value 包含省市区id的数组(或省市) 例:[520000, 520100, 520102]
 */
export default function ({ value, onChange, onChangeLabel, level = 2, ...race }) {
  let [address, setAddress] = useState((value && value.province_id) ? [value.province_id, value.city_id, value.district_id] : [])
  let [options, setOptions] = useState([])
  let [loading, setLoading] = useState(false)
  useEffect(() => {
    async function init() {
      setLoading(true)
      const { data: provinces } = await getArea(0)
      const snapData = normalize(provinces)
      if (!value || !value.province_id) {
        setOptions(snapData)
        setLoading(false)
        return
      }
      const { data: citys } = await getArea(value.province_id)
      const snapData2 = normalize(citys)
      findFather(snapData, value.province_id, snapData2)
      if (!value.city_id) {
        setOptions(snapData)
        setLoading(false)
        return
      }
      const { data: countys } = await getArea(value.city_id)
      const snapData3 = normalize(countys)
      findFather(snapData2, value.city_id, snapData3)
      setOptions(snapData)
      setLoading(false)
    }
    // 初始化
    if (options.length === 0) {
      init()
    }
    // value 从外部修改为空
    if (!value && address.length !== 0) {
      setAddress([])
      init()
    }
    // value 从外部发生改变
    if (value && (value.province_id !== address[0] || value.city_id !== address[1] || value.district_id !== address[2])) {
      setAddress([value.province_id, value.city_id, value.district_id])
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const findFather = (father, id, children) => {
    father.forEach(it => {
      if (it.value === id) {
        it.children = children
      }
    })
  }
  const loadData = selected => {
    const targetOption = selected[selected.length - 1]
    targetOption.loading = true
    getArea(targetOption.value).then(res => {
      targetOption.loading = false
      if (res.data && res.data.length !== 0) {
        targetOption.children = normalize(res.data, selected.length === level)
      }
      setOptions([...options])
    })
  }
  const getArea = async pid => {
    const { data } = await $api.common.getAreaList({ pid }, { cache: true })
    const { items } = data
    return Promise.resolve({ data: items })
  }
  const normalize = (areas, isLeaf = false) => {
    return areas.map(it => ({
      label: it.name,
      value: it.id,
      isLeaf,
    }))
  }
  const selectChange = (res, selectedOptions = []) => {
    setAddress(res)
    onChange({
      province_id: res[0],
      city_id: res[1],
      district_id: res[2]
    })
    onChangeLabel && onChangeLabel({
      province: (selectedOptions[0] || {}).label,
      city: (selectedOptions[1] || {}).label,
      district: (selectedOptions[2] || {}).label,
    })
  }
  return (
    <Fragment>
      <Cascader
        {...race}
        value={address}
        loadData={loadData}
        options={options}
        changeOnSelect
        onChange={selectChange}
      ></Cascader>
      {loading && (
        <i
          style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <LoadingOutlined />
          &nbsp;&nbsp;loading...
        </i>
      )}
    </Fragment>
  );
}
