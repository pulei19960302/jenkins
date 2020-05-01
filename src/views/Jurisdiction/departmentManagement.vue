<template>
<div>
<div class="pageWrapper">
  <div class="pageHeader">
    <el-button type="primary" plain size="small" :disabled="selectedGroupIndexNum < 2 ? false : true" class="mr0" v-permission="[$api.jurisdiction.admincp_group.add]" @click="dialogVisible=true; isEdit=false;">添加</el-button>
  </div>
  <div class="dpflex">
    <div class="menuNav">
      <el-tree :data="menuTreeData" @node-click="handleMenuClick" />
    </div>
    <div class="flex1">
      <el-table
        style="width: 100%"
        :data="listData"
        border
        header-cell-class-name="n-table-header-cell-class"
        cell-class-name="n-table-cell-class"
        v-loading="isTableLoading"
      >
        <el-table-column label="部门名称" prop="name" min-width="160" />
        <el-table-column label="职能描述" prop="describe" min-width="160" />
        <el-table-column label="成员数量" prop="num" min-width="160" />
        <el-table-column label="添加时间" prop="created_at" min-width="140">
          <template slot-scope="scope">{{ scope.row.created_at | validDateTime }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="90">
          <template slot-scope="scope">
            <span class="operationText mr8"
              v-permission="[$api.jurisdiction.admincp_group.edit]"
              type="primary"
              plain
              size="mini"
              @click="handleEdit(scope.row)">
              编辑
            </span>
            <span class="operationText"
              v-permission="[$api.jurisdiction.admincp_group.del]"
              type="danger"
              plain
              size="mini"
              @click="handleDelGroup(scope.row)">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 添加、编辑部门弹窗 -->
  <el-dialog :title="isEdit ? '编辑部门' : '添加部门'" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose">
    <el-form
      ref="addGroupForm"
      :model="addGroupForm"
      :rules="addGroupFormRules"
      label-width="100px"
    >
      <el-form-item label="上级部门ID："><span>{{ isEdit ? pid : selectedGroupId }}</span></el-form-item>
      <el-form-item label="部门名称：" prop="name">
        <el-input v-model="addGroupForm.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="职能描述：" prop="describe">
        <el-input
          type="textarea"
          :rows="4"
          v-model="addGroupForm.describe"
          placeholder="请输入部门职能描述"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelDialog">取消</el-button>
      <el-button type="primary" @click="submitAddOrEditGroup">确定</el-button>
    </div>
  </el-dialog>
</div>

<!-- Fixed 分页 -->
<Pagination
  :current="pagination.current"
  :pageSize="pagination.pageSize"
  :count="pagination.count"
  :pageChoose="[10, 20, 30, 40]"
  @pageChangeCBK="handlePageCrtChange"
  @sizeChangeCBK="handlePageSizeChange"
>
</Pagination>
</div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

const TO_CONNECT_TREE_DATA = {
  id: 0,
  label: '全部部门',
  children: [],
  indexNum: 0,
}

// 根据业务格式化表格数据
function getFormatListData(srcItems) {
  return srcItems.map((item) => ({
    ...item,
    describe: item.describe === '' ? '--' : item.describe
  }))
}

function setFormatTreeData(srcTree, indexNum) {
  srcTree.forEach((item) => {
    item.label = item.name
    item.indexNum = indexNum
    if (item.children.length) {
      setFormatTreeData(item.children, indexNum + 1)
    }
  })
}

export default {
  // 部门管理
  name: "departmentManagement",
  data() {
    return {
      // 配置
      addGroupFormRules: {
        name: [{
          required: true, message: '请输入部门名称', trigger: 'blur'
        }, {
          max: 10, message: '长度在10个字符以内', trigger: 'blur'
        }],
        describe: [{
          max: 200, message: '长度在200个字符以内', trigger: 'blur'
        }]
      },

      // 数据缓存
      menuTreeData: [TO_CONNECT_TREE_DATA],
      listData: [], // 列表数据
      stashForm: null, // 用于编辑时的表单数据缓存，用于提交编辑时对比新旧数据是否有变更

      // 用于请求
      selectedGroupId: 0, // 当前选中的部门 ID
      pagination: { // 分页器
        current: 1,
        pageSize: 10,
        count: 0,
      },
      operationId: null, // 待操作的部门 Id
      addGroupForm: { // 添加、编辑公用的部门表单
        name: '', // 部门名称
        describe: '', // 部门描述
      },      

      // UI 状态
      isTableLoading: false, // 表格是否处于加载中
      dialogVisible: false, // 弹窗显隐控制
      selectedGroupIndexNum: 0, // 当前选中部门的层级，达到2的情况下不允许添加
      isEdit: null, // 打开弹窗时，区分是进行添加还是编辑
      pid: null, // 编辑状态下，显示被编辑部门的父级 ID
    }
  },
  created() {
    this.requestList()
    this.requestTree()
  },
  methods: {
    // 请求
    requestList() {
      this.isTableLoading = true
      const toInjectQuery = this.selectedGroupId === -1 ? {} : { group_id: this.selectedGroupId }
      this.$api.jurisdiction.getAdminGroupList({
        ...toInjectQuery,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
      }).then((res) => {
        this.pagination.count = res.data.count
        this.listData = getFormatListData(res.data.items)
        this.isTableLoading = false
      })
    },
    // 请求部门树
    requestTree() {
      this.$api.jurisdiction.tree().then((res) => {
        let toConcatArr = [TO_CONNECT_TREE_DATA]
        let treeData = _.cloneDeep(res.data.tree)

        setFormatTreeData(treeData, 0)

        toConcatArr = toConcatArr.concat(treeData)
        this.menuTreeData = toConcatArr
      })
    },
    // 处理部门树导航点击
    handleMenuClick(data) {
      const { id, indexNum } = data
      this.selectedGroupId = id
      this.selectedGroupIndexNum = indexNum
      this.requestList()
    },
    // 分页器当前页变化
    handlePageCrtChange(page) {
      this.pagination.current = page
      this.requestList()
    },
    // 分页器 pageSize 变化
    handlePageSizeChange(size) {
      this.pagination.pageSize = size
      this.requestList()
    },
    // 处理编辑部门
    handleEdit({ name, describe, id, pid }) {
      this.operationId = id
      this.pid = pid

      this.stashForm = { name, describe }
      this.addGroupForm = { name, describe }

      this.dialogVisible = true
      this.isEdit = true
    },
    // 处理删除部门
    handleDelGroup({ id }) {
      this.$api.jurisdiction.DelAdminGroup({ id }).then(() => {
        this.requestList()
        this.requestTree()
      })
    },
    // 处理取消提交表单
    handleCancelDialog() {
      this.dialogVisible = false
      this.addGroupForm = { name: '', describe: '' }
    },
    handleDialogClose() {
      this.addGroupForm.name = ''
      this.addGroupForm.describe = ''
    },
    // 处理新增或编辑部门的表单提交
    submitAddOrEditGroup() {
      this.$refs.addGroupForm.validate(async (valid) => {
        if (valid) { // 表单验证通过
          let params = Object.assign({}, this.addGroupForm)
          params.pid = this.isEdit ? this.pid : this.selectedGroupId // 父级 ID，区分创建与编辑

          if (this.isEdit) { // 编辑
            // 新旧数据比较
            if (_.isEqual(this.stashForm, this.addGroupForm)) {
              this.$message({ message: '暂无数据变更', type: 'warning' })
              return false
            } else {
              params.id = this.operationId // 待编辑 ID
              await this.$api.jurisdiction.EditAdminGroup(params);
            }
          } else { // 新增
            await this.$api.jurisdiction.AddAdminGroup(params)
          }

          this.addGroupForm = { name: '', describe: '' }
          this.dialogVisible = false
          this.requestTree()
          this.requestList()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pageWrapper {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  min-height: calc(100vh - 135px);
}
.pageHeader {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
}
.menuNav {
  padding-top: 10px;
  width: 200px;
  overflow-x: auto;
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
</style>
