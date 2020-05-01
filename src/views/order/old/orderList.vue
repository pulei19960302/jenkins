<template>
  <div>
    <!--顶部-->
    <el-tabs v-model="activeName" @tab-click="handleClick" style="background:#fff;padding: 0 10px;">
      <el-tab-pane name="-1">
        <span slot="label">
          全部订单
          <span>{{ allData.total_count }}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label">
          待付款
          <span>{{ allData.count1 }}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">
          待发货
          <span>{{ allData.count2 }}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label">
          已发货
          <span>{{ allData.count3 }}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane name="5">
        <span slot="label">
          已完成
          <span>{{ allData.count5 }}</span>
        </span>
      </el-tab-pane>
      <el-tab-pane name="7">
        <span slot="label">
          已关闭
          <span>{{ allData.count7 }}</span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <!--搜索--> 
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
        <Export
          :exportOptions="exportOptions"
          :status="status"
          :query="query"
          :url="$api.order.order.export"
          v-permission="[$api.order.order.export]"
        />
    </Search>
    <div class="table-pandect">
      符合搜索条件的数据共
      <span>{{ count }}</span> 个 总价
      <span>{{total_actual_money}}</span> 元 商品
      <span>{{ goods_num }}</span> 件
    </div>
    <!--表单-->
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
        :row-class-name="tableRowClassName"
        :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed width="50" align="center" type="selection"></el-table-column>
        <!-- <el-table-column align="center" prop="id" label="订单ID" width="80"></el-table-column> -->
        <el-table-column align="center" prop="order_sn" label="订单编号" width="140"></el-table-column>
        <el-table-column align="center" prop="status" label="订单状态" show-overflow-tooltip>
          <template slot-scope="scope">{{ transStatus(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column align="center" prop="goods_id" label="商品ID" width="60"></el-table-column>
        <el-table-column align="center" prop="goods_title" label="商品标题" width="100"></el-table-column>
        <el-table-column align="center" prop="skus" label="商品SKU" width="100"></el-table-column>
        <el-table-column align="center" prop="nums" label="数量" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="buyer_nickname" label="用户昵称" width="90"></el-table-column>
        <el-table-column
          align="center"
          width="100"
          prop="receiver_name"
          label="收货人姓名"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" prop="discount_fee" label="优惠金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="actual_fee" label="实付金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="freight_fee" label="邮费" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="下单时间" prop="created_at" width="140"></el-table-column>
        <el-table-column align="center" label="支付时间" prop="pay_time" width="140">
          <template slot-scope="scope">{{ scope.row.pay_time | validDateTime }}</template>
        </el-table-column>
        <el-table-column align="center" prop="pay_type" label="支付方式" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column align="center" prop="user_type_name" label="类型" width="90"></el-table-column> -->
        <!-- <el-table-column
                    align="center"
                    prop="store_name"
                    label="所属店铺"
                    width="90">
        </el-table-column>-->
        <!-- <el-table-column align="center" prop="goods_fee" label="商品总价" show-overflow-tooltip></el-table-column> -->

        <!-- <el-table-column
                    align="center"
                    prop="rebate_fee"
                    width="120"
                    label="返利总金额（元）">
        </el-table-column>-->

        <!-- <el-table-column
                    align="center"
                    width="100"
                    prop="receiver_mobile"
                    label="收货人电话"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="200"
                    prop="receiver_address"
                    label="收货人地址"
                    show-overflow-tooltip>
        </el-table-column>-->

        <!-- <el-table-column align="center" prop="buyer_message" label="买家留言" show-overflow-tooltip></el-table-column> -->

        <!-- <el-table-column align="center" prop="supplier_title" label="供应商" width="80"></el-table-column> -->
        <!-- <el-table-column align="center" prop="export_record" label="导出记录" show-overflow-tooltip></el-table-column> -->
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="order_type"-->
        <!--label="订单类型"-->
        <!--width="80">-->
        <!--</el-table-column>-->
        <!-- <el-table-column align="center" prop="activity_title" label="活动批次" width="100"></el-table-column> -->
        <!-- <el-table-column
          v-if="activeName == 7"
          align="center"
          label="关闭时间"
          prop="close_time"
          width="140"
        >
          <template slot-scope="scope">{{ scope.row.close_time | validDateTime }}</template>
        </el-table-column> -->
        <!-- <el-table-column
                    align="center"
                    width="100"
                    prop="total_fee"
                    label="订单金额">
        </el-table-column>-->

        <!-- <el-table-column
                    align="center"
                    prop="from"
                    label="订单来源"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.from | validVal }}
                    </template>
        </el-table-column>-->
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="goods_name"-->
        <!--label="商品名称"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="sku_properties_name"-->
        <!--label="SKU"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="gifttype"-->
        <!--label="商品类别"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->

        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="remark"-->
        <!--label="买家备注"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <!-- <el-table-column
                    align="center"
                    prop="cost_fee"
                    label="商品成本"
                    show-overflow-tooltip>
        </el-table-column>-->
        <!-- <el-table-column
                    align="center"
                    prop="coupon_name"
                    label="优惠券">
        </el-table-column>-->
        <!-- <el-table-column
                    align="center"
                    prop=""
                    label="商品利润"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.profit  }}
                    </template>
        </el-table-column>-->
        <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="paytime"-->
        <!--label="付款时间"-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <!-- <el-table-column align="center" prop="remark" label="系统备注" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remark | validVal }}</template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" align="center" width="160">
          <template slot-scope="scope">
            <span
              class="look-word"
              type="info"
              plain
              size="mini"
              @click="orderDetail(scope.row.id)"
              v-permission="[$api.order.order.detail]"
            >查看</span>
            <span
              class="look-word"
              type="warning"
              plain
              size="mini"
              @click="closedialogVisible = true; closeForm.actual_fee=scope.row.actual_fee;id=scope.row.id;closeForm.password = ''"
              v-permission="[$api.order.order.close]"
            >关闭</span>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :current="current"
        :options="paginationOptions" 
        @opreateCBK="handleOpreate"
        :count="count"
        :pageSize="pageSize"
        @pageChangeCBK="handlePageChange"
        @sizeChangeCBK="handleSizeChange"
      ></Pagination>
    </template>
    <!--关闭订单-->
    <el-dialog title="关闭订单" :visible.sync="closedialogVisible" width="30%">
      <el-form ref="closeForm" :model="closeForm" label-width="120px" label-position="right">
        <el-form-item label="是否退款：">
          <el-switch v-model="closeForm.is_refund" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item
          v-show="closeForm.is_refund==1"
          label="退款金额："
          prop="actual_fee"
          :rules="[simpleRule]"
        >
          <el-input
            type="number"
            v-model="closeForm.actual_fee"
            style="width: 70%;margin:0 5% 10px 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作密码：" prop="password" :rules="[simpleRule]">
          <el-input
            type="password"
            v-model="closeForm.password"
            style="width: 70%;margin:0 5% 10px 0"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="closeForm.remark" style="width: 70%;margin:0 5% 10px 0"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closedialogVisible = false">取消</el-button>
        <el-button :disabled="!closeForm.password" type="primary" @click="orderClose">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//订单列表
const searchOption = [
  // {
  //     type: 'input',
  //     key: 'id',
  //     placeholder: 'ID'
  // },
  // {
  //     type: 'input',
  //     key: 'order_sn',
  //     placeholder: '订单编号'
  // },
  // {
  //     type: 'input',
  //     key: 'goods_id',
  //     placeholder: '商品ID'
  // },
  {
    type: "input",
    key: "keywords",
    placeholder: "ID/订单编号"
  },
  {
    type: "input",
    key: "goods_id",
    placeholder: "商品ID"
  },


    {
    type: "input",
    key: "buyer_nickname",
    placeholder: "下单人"
  },

  {
    type: "input",
    key: "receiver_name",
    placeholder: "收货人"
  },

    {
    type: "datetimerange",
    key: "start_at-end_at",
    placeholder: "下单时间"
  },
  {
    type: "input",
    key: "goods_title",
    placeholder: "商品标题"
  },
  {
    type: "input",
    key: "supplier_name",
    placeholder: "供应商"
  },
  {
    type: "input",
    key: "batch_name",
    placeholder: "活动批次"
  },


  // {
  //     type: 'dateRangePicker',
  //     key: 'start_at-end_at',
  //     placeholder: '下单时间'
  // },
  {
    type: "select",
    key: "is_coupon",
    placeholder: "是否使用优惠券",
    options: [
      { label: "全部", value: -1 },
      { label: "是", value: 1 },
      { label: "否", value: 2 }
    ]
  },
  {
    type: "input",
    key: "coupon_name",
    placeholder: "优惠券"
  }
];
export default {
  name: "orderList",
  data() {
    return {
      exportOptions: [],
      simpleRule: { required: true, message: "必填项", trigger: "change" },
      id: null,
      closeForm: {
        is_refund: 0,
        password: "",
        actual_fee: 0
      },
      // searchOPtions: [
      //     // {
      //     //     type: 'input',
      //     //     key: 'id',
      //     //     placeholder: 'ID'
      //     // },
      //     // {
      //     //     type: 'input',
      //     //     key: 'order_sn',
      //     //     placeholder: '订单编号'
      //     // },
      //     // {
      //     //     type: 'input',
      //     //     key: 'goods_id',
      //     //     placeholder: '商品ID'
      //     // },
      //     {
      //         type: 'input',
      //         key: 'keywords',
      //         placeholder: 'ID/订单编号/商品ID'
      //     },
      //     {
      //         type: 'input',
      //         key: 'supplier_name',
      //         placeholder: '供应商'
      //     },
      //     {
      //         type: 'input',
      //         key: 'batch_name',
      //         placeholder: '活动批次'
      //     },
      //     {
      //         type: 'input',
      //         key: 'buyer_nickname',
      //         placeholder: '下单人'
      //     },
      //     {
      //         type: 'input',
      //         key: 'receiver_name',
      //         placeholder: '收货人'
      //     }, {
      //         type: 'dateRangePicker',
      //         key: 'start_at-end_at',
      //         placeholder: '下单时间'
      //     }
      // ],
      searchOPtions: [],
      query: {},
      status: 2,
      current: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      tableData: [],
      multipleSelection: [],
      activeName: "2",
      allData: {},
      closedialogVisible: false,
      total_actual_money: "",
      goods_num: "",
      paginationOptions: []
    };
  },
  activated() {
    this.getData();
    // 其他页面跳转至本页面对应的tab
    const { type } = this.$route.query;
    if (type) {
        this.activeName = String(type);
        this.status = type
    }
    this.searchOPtions = [...searchOption];
  },
  methods: {
    transStatus(status) {
      switch (status) {
        case 0:
          return "已取消";
        case 1:
          return "待支付";
        case 2:
          return "待发货";
        case 3:
          return "待收货";
        case 4:
          return "待反馈";
        case 5:
          return "已完成";
        case 6:
          return "售后";
        case 7:
          return "已关闭";
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.export_record > 0) {
        return "row-height-light-normal";
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
      //获取列表数据
      try {
        this.loading = true;
        const { data } = await this.$api.order.orderList({
          ...this.query,
          pageSize: this.pageSize,
          page: this.current,
          status: this.activeName
        });
        this.allData = data;
        this.tableData = data.items;
        this.count = data.count;
        this.total_actual_money = data.total_money.total_actual_money || 0;
        this.goods_num = data.goods_num || 0;
        // 导出字段
        this.exportOptions = data.fields || [];
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    handleSelectionChange(val) {
      const ids = val.map(curr => curr.id);
      this.multipleSelection = ids;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handlePageChange(val) {
      this.current = val;
      this.getData();
    },
    handleOpreate() {
      if (this.multipleSelection.length < 1) {
        this.$message.warning("请选择商品");
        return;
      }
      this.handleDel(this.multipleSelection);
    },
    handleDel(id) {
      console.log(id);
      this.$confirm(`确认删除选中商品？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let ids;
        ids = id.join(",");
        try {
          await this.$api.order.delall({ ids });
          this.getData();
        } catch (e) {
          throw new Error(e);
        }
      });
    },
    handleClick(tab) {
      this.status = tab.name;
      this.getData();
      if (tab.name == 7) {
        this.searchOPtions = [
          ...searchOption,
          {
            type: "dateRangePicker",
            key: "start_close-end_close",
            placeholder: "关闭时间"
          }
        ];
        this.paginationOptions = [{ value: "del", label: "批量删除",type:"danger",permission: [this.$api.order.order.delall] }];
      } else {
        this.searchOPtions = [...searchOption];
        this.paginationOptions = [];
      }
    },
    orderDetail(id) {
      this.$router.push({ name: "orderDetail", params: { id } });
    },
    async orderClose() {
      this.$refs.closeForm.validate(async valid => {
        if (valid) {
          const params = Object.assign({}, this.closeForm);
          const row = this.tableData.filter(it => it.id == this.id);
          if (params.is_refund != 0) {
            if (Number(row[0].actual_fee) < Number(params.actual_fee)) {
              this.$message.error("退款金额高于实付金额！");
              return;
            }
          }
          if (params.is_refund == 0) {
            delete params.actual_fee;
          }
          params.id = this.id;
          try {
            await this.$api.order.orderClose(params);
            this.closedialogVisible = false;
            this.getData();
          } catch (e) {}
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.color-red {
  color: #f24844;
}
.order-active {
  background-color: #1abc9c;
  color: #fff;
}
.order-active .color-red {
  color: #fff;
}
.button-content {
  margin-bottom: 10px;
}
.table-pandect {
  background: #fff;
  padding: 10px;
  span {
    color: red;
  }
}
</style>
<style lang="">
.row-height-light-normal {
  background-color: #f0f9eb !important;
}
</style>
