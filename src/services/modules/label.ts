export default {
  // getLabelGroupList: 'POST /goods/label/get-category', // 标签新增获取标签组列表
  //labelGroupList: 'POST /goods/label/category-list', // 标签组列表
  //labelGroupAdd: 'POST /goods/label/add', // 标签组新增
  //labelGroupEdit: 'POST /goods/label/edit', // 标签组编辑
  //labelGroupDel: 'POST /goods/label/change-del', // 标签组删除
  //labelGroupStatus: 'POST /goods/label/change-status', // 标签组状态修改
  //labelGroupDelBatch: 'POST /goods/label/batch-category-del', // 标签组批量删除
  //labelGroupStatusBatch: 'POST /goods/label/batch-category-change-status', // 标签组批量状态修改
  labelList: 'POST /goods/label/list', // 标签获取列表
  labelAdd: 'POST /goods/label/add-item', // 标签新增
  labelEdit: 'POST /goods/label/edit-item', // 标签编辑
  labelStatus: 'POST /goods/label/change-item-status', // 标签状态修改
  labelDel: 'POST /goods/label/change-item-del', // 标签删除
  labelStatusBatch: 'POST /goods/label/batch-change-status', // 标签状态批量修改
  labelDelBatch: 'POST /goods/label/batch-del', // 标签批量删除
  getLabel: 'POST /goods/label/get-label', // 获取2级标签嵌套数据
  //labelShowChange: 'POST /goods/label/change-show-status', // 标签是否C端展示
}
