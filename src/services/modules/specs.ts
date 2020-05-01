export default {
    list: '/goods/attr-item/list',
    specsGroupEnums: 'goods/attr/get-parent', // 获取规格组名称列表
    getSpecInfo: 'POST /goods/attr/get-info', // 获取规格组详情，嵌套2级数组
    addSpecsGroup: 'POST /goods/attr/add',
    editSpecsGroup: 'POST /goods/attr/edit',
    delSpecsGroup: 'POST /goods/attr/change-del',

    addSpecs: 'POST goods/attr-item/add',
    editSpecs: 'POST goods/attr-item/edit',
    delSpecs: 'POST /goods/attr-item/change-del',
    batchDelSpecs: 'POST /goods/attr-item/batch-change-del',

    getSpecsList: '/goods/attr-item/list' // 新的规格

}
