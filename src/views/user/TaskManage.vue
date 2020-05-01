<template>
  <div class="task-manage">
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <el-button
        type="primary"
        plain
        @click="dialogVisible=true;form={status:0,m_type:[]}"
        size="mini"
        v-permission="[$api.user.task.edit]"
      >添 加</el-button>
      <Export
        :exportOptions="exportOptions"
        :query="query"
        :url="$api.user.task.export"
        v-permission="[$api.user.task.export]"
      />
    </Search>
    <el-table
      element-loading-spinner="el-icon-loading"
      :highlight-current-row="true"
      v-loading="loading"
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
    >
      <!--<el-table-column-->
      <!--type="selection">-->
      <!--</el-table-column>-->
      <el-table-column width="110" align="center" prop="id" label="编号"></el-table-column>
      <el-table-column align="center" prop="title" label="任务名称"></el-table-column>
      <el-table-column align="center" prop="description" label="任务描述"></el-table-column>
      <el-table-column align="center" prop="content" label="内容介绍"></el-table-column>
      <el-table-column align="center" prop="description" label="任务描述"></el-table-column>
      <el-table-column align="center" prop="top_fee" label="目标销售额"></el-table-column>
      <el-table-column align="center" prop="top_order_num" label="目标订单数"></el-table-column>
      <el-table-column align="center" prop="m_type_name" label="参与类型"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间">
        <template slot-scope="scope">{{ scope.row.start_time | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间">
        <template slot-scope="scope">{{ scope.row.end_time | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-switch
            :disabled="!button_permissions.includes($api.user.task.edit)"
            v-model="scope.row.status"
            :active-value="10"
            :inactive-value="0"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handelEdit(scope.row)"
            v-permission="[$api.user.task.edit]"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleDel(scope.row.id)"
            v-permission="[$api.user.task.del]"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :current="current"
      :count="count"
      :pageSize="pageSize"
      @opreateCBK="handleDel('many')"
      @pageChangeCBK="handlePageChange"
      @sizeChangeCBK="handleSizeChange"
    ></Pagination>
    <el-dialog :title="isEdit ? '编辑任务' : '添加任务'" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" label-position="right">
        <el-form-item label="参与类型：" prop="m_type" :rules="[simpleRule]">
          <el-checkbox-group v-model="form.m_type">
            <el-checkbox
              v-for="index in typeoptions"
              :label="index.value"
              :key="index.value"
            >{{index.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="任务名称：" prop="title" :rules="[simpleRule]">
          <el-input v-model="form.title" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="任务描述：" prop="description" :rules="[simpleRule]">
          <el-input v-model="form.description" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="内容介绍：" prop="content" :rules="[simpleRule]">
          <el-input type="textarea" :rows="4" v-model="form.content" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="任务选择：">
          <el-radio-group v-model="taskType" @change="taskTypeChange">
            <el-radio :label="1">目标销售额</el-radio>
            <el-radio :label="2">目标订单数</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目标销售额：" prop="top_fee" :rules="[simpleRule]" v-if="taskType==1">
          <el-input :disabled="taskType==2" v-model="form.top_fee" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="目标订单数：" prop="top_order_num" :rules="[simpleRule]" v-if="taskType==2">
          <el-input :disabled="taskType==1" v-model="form.top_order_num" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="start_time" :rules="[simpleRule]">
          <el-date-picker
            value-format="timestamp"
            size="mini"
            v-model="form.start_time"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="end_time" :rules="[simpleRule]">
          <el-date-picker
            value-format="timestamp"
            size="mini"
            v-model="form.end_time"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-switch v-model="form.status" :active-value="10" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
        <el-button type="primary" @click="AddLabel(isEdit)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { _ } from "@/OMS/utils";
import { common } from "@/OMS/mixins";

export default {
  name: "TaskManage",
  mixins: [common],
  data() {
    return {
      exportOptions: [],
      opreate: "",
      dialogVisible: false,
      form: {
        status: null,
        m_type: []
      },
      loading: false,
      show: true,
      paginationOptions: [{ value: "del", label: "批量删除" }],
      searchOPtions: [
        {
          type: "input",
          key: "title",
          placeholder: "任务名称",
        },
        {
          type: "select",
          key: "status",
          placeholder: "状态",
          options: [{ label: "启用", value: 10 }, { label: "关闭", value: 0 }]
        }
      ],
      query: {},
      current: 1,
      pageSize: 10,
      count: 0,
      tableData: [],
      columnSelect: [],
      rules: {},
      isEdit: false,
      id: null,
      oldRowData: {},
      typeoptions: [],
      taskType: 1
    };
  },
  computed: {
    ...mapState("user", ["button_permissions"])
  },
  activated() {
    this.getData();
    this.gettype();
  },
  methods: {
    // 仅改变状态
    async changeStatus({ status, id }) {
      try {
        await this.$api.user.taskSetStatus({ status, id });
      } catch (e) {
        // 后端保存出错，强制变回原状态
        this.tableData.map(val => {
          if (val.id === id) this.$set(val, "status", status == 10 ? 0 : 10);
        });
      }
    },
    async gettype() {
      const { data } = await this.$api.user.typeList();
      this.typeoptions = data;
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handelEdit(row) {
      this.id = row.id;
      this.isEdit = true;
      this.dialogVisible = true;
      const editData = Object.assign({}, row);
      editData.start_time = editData.start_time * 1000;
      editData.end_time = editData.end_time * 1000;
      this.oldRowData = { ...editData };
      this.form = { ...editData };
      this.form.m_type = row.m_type;
      console.log(row.m_type);
    },
    AddLabel(isEdit) {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const params = Object.assign({}, this.form);
            params.start_time = params.start_time / 1000;
            params.end_time = params.end_time / 1000;
            if (isEdit) {
              if (_.isEqual(this.oldRowData, this.form)) {
                this.$message({ message: "暂无数据变更", type: "warning" });
                return;
              }
              params.id = this.id;
            }
            await this.$api.user.taskEdit(params);
            this.dialogVisible = false;
            this.isEdit = false;
            this.resetForm();
            this.getData();
          } catch (e) {
            throw new Error(e);
          }
        }
      });
    },
    handelSearch(type, query) {
      const todo = {
        search: () => {
          this.query = { ...query };
          this.current = 1;
          this.getData();
        },
        reset: () => {
          this.query = {};
          this.pageSize = 10;
          this.current = 1;
          this.getData();
        }
      };
      todo[type]();
    },
    async getData() {
      //获取列表数据
      try {
        this.loading = true;
        const { data } = await this.$api.user.taskList({
          ...this.query,
          pageSize: this.pageSize,
          page: this.current
        });
        this.tableData = data.items;
        this.count = data.count;
        // 导出字段
        this.exportOptions = data.fields || [];
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    handlePageChange(val) {
      this.current = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleSelectionChange(val) {
      const select = [];
      if (val.length < 1) {
        this.columnSelect = [];
        return;
      }
      val.map(curr => {
        select.push(curr.id);
      });
      this.columnSelect = select;
    },
    handleDel(id) {
      if (id == "many" && this.columnSelect.length < 1) {
        this.$message({
          message: "请选择任务",
          type: "error"
        });
        return;
      }
      this.$confirm("确认删除选中任务？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.del(id);
      });
    },
    async del(id) {
      try {
        await this.$api.user.taskDel({ id });
        this.getData();
      } catch (e) {}
    },
    taskTypeChange() {
      if (this.taskType == 2) {
        this.form.top_fee = "";
      } else {
        this.form.top_order_num = "";
      }
    }
  }
};
</script>

<style scoped>
.look {
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
