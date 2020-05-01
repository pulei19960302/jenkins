
<template>
  <div class="recommendCodeList-container">
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch"></Search>
    <div class="table-pandect table-pandect-hidden">
      符合搜索条件的数据共
      <b>{{ count }}</b> 条
    </div>
    <el-table
      element-loading-spinner="el-icon-loading"
      :highlight-current-row="true"
      v-loading="loading"
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"  
    >
      <el-table-column align="center" prop="id" label="编号"></el-table-column>

      <el-table-column align="center" prop="uid" label="白银id"></el-table-column>

      <el-table-column align="center" prop="buyer_nickname" label="白银昵称"></el-table-column>

      <el-table-column align="center" prop="code" label="邀请码"></el-table-column>

      <el-table-column align="center" prop="use_name" label="用户昵称"></el-table-column>

      <el-table-column align="center" prop="order_sn" label="订单号"></el-table-column>

      <el-table-column align="center" prop="goods_title" label="商品名称"></el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="use_at" label="使用时间"></el-table-column>
      <el-table-column align="center" prop="status" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="10"
            inactive-value="0"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :current="current"
      :count="count"
      :pageSize="pageSize"
      @pageChangeCBK="handlePageChange"
      @sizeChangeCBK="handleSizeChange"
    ></Pagination>
  </div>
</template>
<script>
import { common } from "@/OMS/mixins";
export default {
  name: "recommendCodeList",
  mixins: [common],
  data() {
    return {
      searchOPtions: [
        {
          type: "input",
          key: "uid",
          placeholder: "白银ID",
        },
        {
          type: "input",
          key: "buyer_nickname",
          placeholder: "白银昵称",
        },
        {
          type: "input",
          key: "use_name",
          placeholder: "用户昵称",
        },
        {
          type: "input",
          key: "code",
          placeholder: "邀请码",
        },
        {
          type: "select",
          key: "is_use",
          placeholder: "是否使用",
          options: [
            { value: null, label: "全部" },
            { value: "1", label: "已使用" },
            { value: "0", label: "未使用" }
          ]
        },
        {
          type: "dateRangePicker",
          key: "created_at_start-created_at_end",
          placeholder: "生成日期",
        },
        {
          type: "dateRangePicker",
          key: "use_at_start-use_at_end",
          placeholder: "使用日期",
        }
      ],
      tableData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      try {
        this.loading = true;
        this.$api.user
          .recommendCodeList({
            ...this.query,
            pageSize: this.pageSize,
            page: this.current
          })
          .then(res => {
            this.loading = false;
            this.tableData = res.data.item;
            this.count = res.data.count;
          })
          .catch(err => {
            this.loading = false;
          });
      } catch (e) {
        this.loading = false;
      }
    },
    async changeStatus({ status, id }) {
      try {
        await this.$api.user.recommendCodeStatus({ status, ids: id });
        this.getData();
      } catch (e) {
        this.tableData.map(val => {
          if (val.id === id)
            this.$set(val, "status", status == "10" ? "0" : "10");
        });
      }
    }
  }
};
</script>
