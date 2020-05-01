export default {
  categoryList: 'POST /goods/category/list', // 类目获取列表
  categoryAdd: 'POST /goods/category/add', // 类目新增
  categoryEdit: 'POST /goods/category/edit', // 类目编辑
  categoryDel: 'POST /goods/category/change-del', // 类目删除
  categoryDelBatch: 'POST /goods/category/batch-del', // 类目批量删除
  categoryStatus: 'POST /goods/category/change-status', // 类目状态修改
  categoryStatusBatch: 'POST /goods/category/batch-change-status', // 类目状态批量修改
  categoryParent: 'POST /goods/category/get-parent', // 二级类目新增时获取一级类目列表

  categoryList_inProduct: 'POST /goods/category/get-category', // 商品详情中的商品分类

  newCategoryList: '/goods/category/categoryglist', // 新商品类目

  // sortUnquie: '/goods/category/category-sort-unquie' // 验证排序是否重复
}
