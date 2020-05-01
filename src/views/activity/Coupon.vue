<template>
  <div class="coupon">
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <el-button
        type="primary"
        plain
        @click="addOrEditCoupon()"
        size="small"
        v-permission="[$api.activity.coupon.add]"
      >添加</el-button>
      <el-button
        type="primary"
        plain
        @click="couponRecordVisible=true"
        size="small"
        v-permission="[$api.activity.coupon.recordList]"
      >记录</el-button>
      <Export
        :exportOptions="exportOptions"
        :query="query"
        :url="$api.activity.coupon.export"
        v-permission="[$api.activity.coupon.export]"
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
      :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
      @selection-change="handleSelectionChange"
    >
      <!--<el-table-column-->
      <!--type="selection">-->
      <!--</el-table-column>-->
      <el-table-column align="center" prop="name" width="150" label="优惠券名称"></el-table-column>
      <!--<el-table-column-->
      <!--align="center"-->
      <!--prop="type"-->
      <!--label="类型">-->
      <!--<template slot-scope="scope">-->
      <!--{{ transForm(scope.row.type) }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" prop="max" label="满金额"></el-table-column>
      <el-table-column align="center" prop="money" label="减金额"></el-table-column>
      <el-table-column align="center" prop="num" label="优惠券数量"></el-table-column>
      <el-table-column align="center" prop="user_num" label="用户限制数量"></el-table-column>
      <el-table-column align="center" label="是否叠加">
        <template slot-scope="scope">{{ scope.row.is_overlay==1 ?'可叠加':'不能叠加' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="start_at" width="140" label="领取开始时间">
        <template slot-scope="scope">{{ scope.row.start_at | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="end_at" width="140" label="领取结束时间">
        <template slot-scope="scope">{{ scope.row.end_at | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="start_at" width="140" label="使用开始时间">
        <template slot-scope="scope">{{ scope.row.ding_at | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="end_at" width="140" label="使用结束时间">
        <template slot-scope="scope">{{ scope.row.ding_at_end | validDateTime }}</template>
      </el-table-column>
      <el-table-column width="180" label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <span
            class="look-word"
            type="primary"
            plain
            size="mini"
            @click="addOrEditCoupon(scope.row.id)"
            v-permission="[$api.activity.coupon.edit]"
          >编辑</span>
          <span
            class="look-word"
            type="danger"
            plain
            size="mini"
            @click="del(scope.row.id)"
            v-permission="[$api.activity.coupon.del]"
          >删除</span>
          <span
            class="look-word"
            type="danger"
            plain
            size="mini"
            v-permission="[$api.activity.coupon.send]"
            @click="showSend(scope.row)"
          >发放</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :current="current"
      :pageSize="pageSize"
      :count="count"
      @pageChangeCBK="handlePageChange"
      @sizeChangeCBK="handleSizeChange"
    ></Pagination>
    <RightSidePopup :visible.sync="couponRecordVisible" width="80%" noOutside>
      <div style="margin-top: -20px">
        <couponRecord />
      </div>
    </RightSidePopup>
    <RightSidePopup :visible.sync="addCouponVisible" width="1050px" noOutside>
      <addCoupon :id="this.couponId" @refresh="this.refesh" />
    </RightSidePopup>
  </div>
</template>

<script>
import { activity } from "@/assets/constant";
import couponRecord from "@/views/activity/couponRecord";
import addCoupon from "@/views/activity/components/AddCoupon";
export default {
  name: "Coupon",
  components: { couponRecord, addCoupon },
  data() {
    return {
      couponId: "",
      couponRecordVisible: false,
      addCouponVisible: false,
      exportOptions: [],
      loading: false,
      opreate: "",
      options: [{ value: "del", label: "删除" }],
      searchOPtions: [
        {
          type: "input",
          key: "name",
          placeholder: "优惠券名称"
        },
        {
          type: "select",
          key: "member_type",
          placeholder: "使用人群",
          options: []
        },
        {
          type: "select",
          key: "is_overlay",
          placeholder: "是否叠加",
          options: [
            { value: "1", label: "叠加" },
            { value: "0", label: "不叠加" }
          ]
        },
        // {
        //     type: 'select',
        //     key: 'type',
        //     placeholder: '类型',
        //     options: [...activity.COUPON_TYPES]
        // },
        {
          type: "dateRangePicker",
          key: "start_at-end_at",
          placeholder: "发放时间"
        },
        {
          type: "dateRangePicker",
          key: "ding_at-ding_at_end",
          placeholder: "使用时间"
        }
      ],
      query: {},
      current: 1,
      pageSize: 10,
      count: 0,
      tableData: []
    };
  },
  created() {
    this.getData();
    this.memberType();
  },
  methods: {
    addOrEditCoupon(id) {
      this.couponId = id;
      this.addCouponVisible = true;
    },
    refesh() {
      this.addCouponVisible = false;
      this.couponId = "";
      this.getData();
    },
    del(ids) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$api.activity.couponDel({ ids }).then(()=>{
            this.getData();
          })
      });
    },
    showSend(row) {
      this.$router.push({
        name: "sendCoupon",
        params: {
          coupon_id: row.id,
          coupon_name: row.name
        }
      });
    },
    jumpTo(name, type, id = "add") {
      this.$router.push({ name, params: { type, id } });
    },
    transForm(val) {
      switch (
        val // 1限时 2永久 3定时
      ) {
        case 1:
          return "限时";
        case 2:
          return "永久";
        case 3:
          return "定时";
      }
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
        const { data } = await this.$api.activity.couponList({
          ...this.query,
          pagesize: this.pageSize,
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
    async memberType() {
      const { data } = await this.$api.activity.memberType({});
      for (let i = 0, l = this.searchOPtions.length; i < l; i++) {
        if (this.searchOPtions[i].key === "member_type") {
          this.searchOPtions[i].options = data;
          break;
        }
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
    handleSelectionChange() {}
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
