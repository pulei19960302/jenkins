import _ from 'lodash'

// 获取checkbox选项
export const getCheckOptions = (attr_item_value) => {
    const options = attr_item_value.filter(el => el.attr_value_id).map(el => {
        return {
            ...el,
            label: el.attr_item_value,
            value: el.attr_value_id,
        }
    })
    return options
}

// 笛卡尔积获取名称
export const cartesianName = (arr) => arr.reduce((a, b) => a.map(x => b.map(y => x.concat(y))).reduce((a, b) => a.concat(b), []), [[]])

// 笛卡尔积获取index
export const cartesianIndex = (arr) => cartesianName(arr.map(el => el.map((it, i) => i)))

// 获取真正被选中的的规格（可作为笛卡尔数组的参数）
export const getSpecsValArry = (selectSpecs = [], customSpecs = []) => {
    const specs1 = selectSpecs.reduce((a, b) => {
        const { values = [], value = [] } = b
        const selectSpecsValue = values.filter(specsValue => (value.includes(specsValue.attr_value_id) || !specsValue.attr_value_id)) || []
        if (selectSpecsValue.length) {
            a.push(selectSpecsValue.map(el => el.attr_item_value))
        }
        return a
    }, [])
    const specs2 = customSpecs.reduce((a, b) => {
        const { values = [] } = b
        if (values.length) {
            a.push(values.map(el => el.attr_item_value))
        }
        return a
    }, [])
    return specs1.concat(specs2)
}

// 获取Table规格colum ['颜色'、'尺寸']
export const getSpecsColumn = (selectSpecs = [], customSpecs = []) => {
    let specsColumn = []
    selectSpecs.forEach(specs => {
        const { values = [], value } = specs
        const selectSpecsValue = values.filter(specsValue => (value.includes(specsValue.attr_value_id) || !specsValue.attr_value_id)) || []
        if (selectSpecsValue.length) {
            specsColumn.push(specs.name)
        }
    })
    customSpecs.forEach(specs => {
        const { values = [] } = specs
        if (values.length) {
            specsColumn.push(specs.name)
        }
    })
    return specsColumn
}

// 获取table的dataSource
export const getTableData = (specsValArry, oldData, tempTableObj) => {
    if (!specsValArry.length) { return [] }
    const specsNameList = cartesianName(specsValArry)
    const specsIndexList = cartesianIndex(specsValArry)
    return specsNameList.map((el, index) => {
        const specs_name = el.join('-')
        const oldSku = oldData.find(it => it.specs_name === specs_name) || {}
        return {
            ...tempTableObj,
            ...oldSku,
            sku_id: oldSku.sku_id || -1,
            specs_key: specsIndexList[index].join('_'),
            specs_name,
        }
    })
}


// 返回满足后端所需attr_group参数
export const getAttrGroup = (selectSpecs = [], customSpecs = []) => {
    const flag = false
    const specs1 = selectSpecs.reduce((a, b) => {
        const { values = [], value = [] } = b
        const selectSpecsValue = values.filter(specsValue => (value.includes(specsValue.attr_value_id) || !specsValue.attr_value_id)) || []
        if (selectSpecsValue.length) {
            const temp = {
                name: b.name,
                values: selectSpecsValue.map(el => ({ attr_item_value: el.attr_item_value }))
            }
            a.push(temp)
        }
        return a
    }, [])
    const specs2 = customSpecs.reduce((a, b) => {
        const { values = [], name } = b
        if (!name) {
            flag = true
        }
        if (values.length) {
            a.push(b)
        }
        return a
    }, [])
    if (flag) {
        return false
    }
    return specs1.concat(specs2)
}