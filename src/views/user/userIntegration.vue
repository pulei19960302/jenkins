<template>
  <div>
    <!--搜索-->
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <el-button
        type="primary"
        plain
        size="mini"
        v-permission="[$api.user.userManage.updateintegral]"
        @click="dialogVisible=true"
      >加扣积分</el-button>
    </Search>
    <div class="table-pandect table-pandect-hidden"> 
      符合搜索条件的数据共
      <span>{{ count }}</span> 个 总积分
      <span>{{total_integral}}</span>
    </div>
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
        <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column align="center" prop="uid" label="用户ID"></el-table-column>
        <el-table-column align="center" label="用户名" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="收支类型" prop="type_name" show-overflow-tooltip></el-table-column>
        <el-table-column
          align="center"
          label="来源"
          width="140"
          prop="order_no"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="交易积分" prop="point" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="总积分" prop="integral" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作人" prop="admin_username" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="创建时间" prop="created_at" show-overflow-tooltip></el-table-column>
      </el-table>

      <Pagination
        :current="current"
        :pageSize="pageSize"
        :count="count"
        @pageChangeCBK="handlePageChange"
        @sizeChangeCBK="handleSizeChange"
      ></Pagination>
    </template>

    <el-dialog title="加扣款" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
        <el-form-item label="用户名：" prop="uid">
          <el-select
            style="width: 70%;"
            v-model="form.uid"
            filterable
            remote
            reserve-keyword
            placeholder="用户名："
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型：" prop="type">
          <el-select v-model="form.type" style="width: 70%;">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分：" prop="point">
          <el-input v-model="form.point" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="2"
            autocomplete="off"
            style="width: 70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateintegral()">确定</el-button>
      </div>
    </el-dialog>

    <!-- <div class="changeMoney-wrap" v-if="dialogVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">
        <el-form-item label="用户名：" prop="uid">
          <el-select
            style="width: 70%;"
            v-model="form.uid"
            filterable
            remote
            reserve-keyword
            placeholder="用户名："
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options4"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支类型：" prop="type">
          <el-select v-model="form.type" style="width: 70%;">
            <el-option
              v-for="item in options5"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分：" prop="point">
          <el-input v-model="form.point" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="2"
            autocomplete="off"
            style="width: 70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateintegral()">确定</el-button>
      </div>
    </div> -->

  </div>
</template>

<script>
// 用户积分
export default {
  name: "userIntegration",
  data() {
    return {
      loading: false,
      dialogVisible: false,
      current: 1,
      pageSize: 10,
      count: 0,
      query: {},
      exportOptions: [],
      tableData: [],
      multipleSelection: [],
      searchOPtions: [
        {
          type: "input",
          key: "uid",
          placeholder: "用户ID",
        },
        {
          type: "input",
          key: "username",
          placeholder: "用户名",
        },
        {
          type: "input",
          key: "order_no",
          placeholder: "来源",
        },
        {
          type: "select",
          key: "type",
          placeholder: "积分类型",
          options: []
        },
        {
          type: "dateRangePicker",
          key: "start_at-end_at",
          placeholder: "创建时间",
        }
      ],
      total_integral: 0,
      form: {
        uid: "",
        type: "",
        point: "",
        remark: "",
        password: ""
      },
      simpleRule: { required: true, message: "必填项", trigger: "change" },
      options5: [],
      options4: [],
      rules: {
        uid: [{ required: true, message: "请输入", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        point: [{ required: true, message: "请输入", trigger: "change" }],
        remark: [{ required: true, message: "请选择", trigger: "change" }],
        password: [{ required: true, message: "请选择", trigger: "change" }],
        sort: [{ required: true, message: "请输入", trigger: "change" }]
      }
    };
  },
  created() {
    this.getData();
    this.balanceRecordType();
  },
  methods: {
    async balanceRecordType() {
      const { data } = await this.$api.user.integralType();
      this.options5 = data;
    },
    cancel() {
      this.dialogVisible = false;
      this.isEdit = false;
      this.$refs.form.resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageChange(val) {
      this.current = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
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
      try {
        this.loading = true;
        const { data } = await this.$api.user.integraLrecord({
          ...this.query,
          pagesize: this.pageSize,
          page: this.current
        });
        this.tableData = data.items;
        this.count = data.count;
        this.total_integral = data.total_integral || 0;
        this.searchOPtions[3].options = data.type;
        // 导出字段
        this.exportOptions = data.fields || [];
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    async updateintegral() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const params = Object.assign({}, this.form);
            const { code } = await this.$api.user.updateintegral(params);
            if (code == 0) {
              this.dialogVisible = false;
              this.$refs["form"].resetFields();
              this.getData();
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      });
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const { data } = await this.$api.finance.balanceRecordUser({
          name: query
        });
        this.list = data.map(item => {
          return { value: item.id, label: item.name };
        });
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    }
  }
};
</script>

<style scoped>
.note-mune {
  margin-bottom: 10px;
}
.mune-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mune-content .el-button {
  margin: 0 10px 10px 0 !important;
}
.block {
  margin-top: 10px;
}

.changeMoney-wrap{
  width: 30%;
  position: fixed;
  right: 0;
  top: 15vh;
  z-index: 9;
  background-color: #f0f2f5;
  padding: 20px 0;
}

.dialog-footer{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
