export default {
  supplierList: 'POST /supplier/list', // 供应商获取列表
  supplierSelectData: 'POST /supplier/get-supplier', // 供应商下拉数据，一个不需要分页的列表
  supplierDetail: 'POST /supplier/info', // 供应商详情
  supplierStatus: 'POST /supplier/change-status', // 供应商单条状态更改
  supplierStatusBatch: 'POST /supplier/batch-change-status', // 供应商批量状态更改
  supplierDel: 'POST /supplier/change-del', // 供应商单条删除
  supplierDelBatch: 'POST /supplier/batch-del', // 供应商批量删除
  supplierBrandsList: 'POST /goods/brand/get-brand', // 供应商新增编辑，品牌列表获取
  supplierCategoryList: 'POST /goods/category/get-category', // 供应商新增编辑，类目列表获取
  supplierEdit: 'POST /supplier/edit', // 供应商编辑
  supplierAdd: 'POST /supplier/add', // 供应商新增
  supplierDownload: '/supplier/export', // 供应商报表下载
}
