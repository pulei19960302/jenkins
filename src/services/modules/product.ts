export default {
    productList:'POST /goods/list', // 商品列表-旧
    productESList:'POST /goods/get-goods-list', // 商品列表-新
    productStatusCount: 'POST /goods/get-goods-status-count', // 商品按状态统计
    addProduct: 'POST /goods/add', // 添加商品
    productHandle: 'POST /goods/handle', // 批量处理上下架
    productPreStart: 'POST /goods/edit-pre-date', // 批量处理预上架
    productDelete: 'POST /goods/delete', // 批量处理删除
    productEditLabel: 'POST /goods/edit-label', // 批量处理商品标签
    productGetSku: 'POST /goods/sku-info', // 获取商品 SKU 信息
    productEditTitleSort: 'POST /goods/edit-title-sort', // 编辑商品名或者排序

    // productDetail: 'POST /goods/detail', // 查看商品详情
    productDetail: 'POST /goods/get-edit-details', // 商品编辑获取详情
    editProduct: 'POST /goods/edit', // 商品编辑提交
    productRebateConfig: 'POST /goods/rebate-config', // 获取商品返利配置
    productGetByIds : 'POST /goods/get-goods-by-ids', //由商品id获取商品列表

    productExport: 'POST /goods/export',
}
