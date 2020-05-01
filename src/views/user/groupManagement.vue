<template>
  <div>
    <!--搜索-->
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <el-button
        type="primary"
        @click="open('add')"
        plain
        size="mini"
        v-permission="[$api.user.group.add]"
      >添加</el-button>
      <Export
        :exportOptions="exportOptions"
        :query="query"
        :url="$api.user.group.export"
        v-permission="[$api.user.group.export]"
      />
    </Search>
    <template>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="id" label="群编号"></el-table-column>
        <el-table-column align="center" label="群名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="总人数" prop="users"></el-table-column>
        <el-table-column
          align="center"
          sortable
          label="消费金额"
          prop="order_money"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          sortable
          label="订单数量"
          prop="order_num"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          sortable
          label="建群时间"
          prop="created_at"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="260px" label="操作" align="center">
          <template slot-scope="scope">
            <span
              class="look"
              type="primary"
              plain
              size="mini"
              @click="open('edit',scope.row)"
              v-permission="[$api.user.group.edit]"
            >编辑</span>
            <span
              class="look"
              type="danger"
              plain
              size="mini"
              @click="handleDel(scope.row.id)"
              v-permission="[$api.user.group.del]"
            >删除</span>
            <span
              class="look"
              type="warning"
              plain
              size="mini"
              @click="jumpTo('groupMember',scope.row.id)"
            >管理成员</span>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :options="pageOptions"
        :current="current"
        :count="count"
        :pageSize="pageSize"
        @opreateCBK="handleDel('many')"
        @pageChangeCBK="handlePageChange"
        @sizeChangeCBK="handleSizeChange"
      ></Pagination>
    </template>

    <el-dialog title="添加群组" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="submit"
        :rules="rules"
        ref="submit"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="群组名称：" prop="name">
          <el-input v-model="submit.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "groupManagement",
  data() {
    return {
      exportOptions: [],
      pageOptions: [{ value: "del", label: "批量删除" }],
      loading: false,
      current: 1,
      pageSize: 10,
      count: 0,
      query: {},
      searchOPtions: [
        {
          type: "input",
          key: "id",
          placeholder: "群编号",
        },
        {
          type: "input",
          key: "keywords",
          placeholder: "群名称",
        }
      ],
      tableData: [],
      columnSelect: [],
      addType: "",
      dialogVisible: false,
      submit: {
        name: "",
        id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }]
      }
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    jumpTo(name, id) {
      this.$router.push({ name, params: { id } });
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
        const { data } = await this.$api.user.groupList({
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
    handlePageChange(val) {
      this.current = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    open(type, row) {
      this.dialogVisible = true;
      this.addType = type;
      if (row) {
        this.submit.name = row.name;
        this.submit.id = row.id;
      }
    },
    add() {
      let _this = this;
      this.$refs.submit.validate(valid => {
        if (valid) {
          if (this.addType == "add") {
            this.$api.user.groupAdd(this.submit).then(function() {
              _this.submit.name = "";
              _this.dialogVisible = false;
              _this.$refs.submit.resetFields();
              _this.getData();
            });
          } else {
            this.$api.user.groupEdit(this.submit).then(function() {
              _this.submit.name = "";
              _this.submit.id = "";
              _this.dialogVisible = false;
              _this.$refs.submit.resetFields();
              _this.getData();
            });
          }
        }
      });
    },
    handleDel(id) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {});
    },
    del(id) {
      let _this = this;
      if (id == "many") {
        if (this.columnSelect.length < 1) {
          this.$message({
            message: "请至少选择一条申请",
            type: "error"
          });
          return;
        }
        this.$api.user
          .groupDel({ ids: this.columnSelect.join(",") })
          .then(function() {
            _this.getData();
          });
      } else {
        this.$api.user.groupDel({ ids: id }).then(function() {
          _this.getData();
        });
      }
    }
  }
};
</script>

<style scoped>
.block {
  margin-top: 10px;
}
.look {
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
