export default {
  brandsList: 'POST /goods/brand/list', // 品牌获取列表
  brandsAdd: 'POST /goods/brand/add', // 品牌新增
  brandsEdit: 'POST /goods/brand/edit', // 品牌编辑
  brandsDel: 'POST /goods/brand/change-del', // 品牌删除
  brandsStatus: 'POST /goods/brand/change-status', // 品牌状态修改
  brandsBatchDel: 'POST /goods/brand/batch-del', // 品牌批量删除
  brandsBatchStatus: 'POST /goods/brand/batch-change-status', // 品牌状态批量修改
  brandsSelectList: 'POST /goods/brand/list-id-name', // 下拉选择数据，返回所有品牌条目
}
