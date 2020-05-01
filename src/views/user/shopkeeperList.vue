<template>
  <div>
    <!--搜索-->
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <Export :exportOptions="exportOptions" :query="query" :url="$api.user.store.export" v-permission="[$api.user.store.export]" />
    </Search>
    <div class="table-pandect table-pandect-hidden">
      符合搜索条件的数据共
      <b>{{ count }}</b> 条,余额总计
      <span>{{total_money}}</span> 元
    </div>
    <div>
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
          <!--fixed-->
          <!--type="selection"-->
          <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column fixed width="50" align="center" type="selection"></el-table-column>
          <el-table-column fixed width="50" align="center" prop="id" label="ID"></el-table-column>
          <el-table-column fixed align="center" prop="username" label="账号"></el-table-column>
          <el-table-column
                align="center"
                prop="typeName"
                label="用户类型">
          </el-table-column>
          <el-table-column align="center" prop="phone" label="手机号">
            <template slot-scope="scope">{{ scope.row.phone | validVal }}</template>
          </el-table-column>

          <!-- <el-table-column align="center" prop="profile.wechat" label="微信号"></el-table-column> -->

          <el-table-column align="center" prop="first_name" label="上级"></el-table-column>

          <el-table-column align="center" prop="second_name" label="上上级"></el-table-column>

          <!-- 合伙人(直属合伙人) -->
          <el-table-column align="center" prop="first_team_name" width="100" label="直属合伙人">
            <template slot-scope="scope">{{ scope.row.first_team_name | validVal }}</template>
          </el-table-column>

          <el-table-column
                        align="center"
                        prop="second_team_name"
                        width="100"
                        label="二级合伙人">
                        <template slot-scope="scope">
                            {{ scope.row.second_team_name | validVal }}
                        </template>
          </el-table-column>

          <!-- <el-table-column
                        align="center"
                        prop="second_team_name"
                        width="100"
                        label="二级级合伙人">
                        <template slot-scope="scope">
                            {{ scope.row.second_team_name | validVal }}
                        </template>
          </el-table-column> -->

          <!-- <el-table-column
                        width="100"
                        align="center"
                        prop="first_num"
                        label="一级数">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        prop="second_num"
                        label="二级数">
          </el-table-column>-->
          <!-- 一级数二级数合并成团队数 -->

          <el-table-column align="center" prop="team_name" label="钻石"></el-table-column>

          <el-table-column align="center" prop="teams" label="团队人数"></el-table-column>

          <el-table-column align="center" prop="order_num" label="订单"></el-table-column>

          <!-- <el-table-column
                        align="center"
                        prop="member_num"
                        label="粉丝数">
          </el-table-column>-->

          <!-- <el-table-column
                        align="center"
                        prop="diff_fee"
                        label="下单差价">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="first_fee"
                        label="一级奖励">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="second_fee"
                        label="二级奖励">
          </el-table-column>-->
          <!-- 合并成累计收益 -->

          <el-table-column align="center" prop="consumption" label="消费"></el-table-column>

          <el-table-column align="center" prop="total_profit" label="收益"></el-table-column>

          <el-table-column width="100" align="center" label="余额">
            <template slot-scope="scope">{{ scope.row ? scope.row.balance : '' }}</template>
          </el-table-column>

          <el-table-column align="center" prop="" label="积分"></el-table-column>

          <el-table-column align="center" prop="group_name" label="群"></el-table-column>

          <el-table-column
            width="140"
            align="center"
            prop="created_at"
            label="注册时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{ scope.row.created_at | validDateTime }}</template>
          </el-table-column>

          <!-- <el-table-column
                        align="center"
                        prop="member.integral"
                        label="积分">
          </el-table-column>-->
          <!-- <el-table-column
                        width="100"
                        align="center"
                        label="冻结">
                        <template slot-scope="scope">
                            {{ scope.row.member ? scope.row.member.freeze : '' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="member.reward"
                        label="冻结佣金">
          </el-table-column>-->
          <!-- <el-table-column
                        align="center"
                        prop="member.code"
                        label="邀请码">
          </el-table-column>-->
          <!-- <el-table-column
                        align="center"
                        prop="store_fans"
                        label="店粉丝">
          </el-table-column>-->

          <!-- <el-table-column
                        align="center"
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1" class="warning-color">待审核</span>
                            <span v-if="scope.row.status == 10" class="success-color">启用</span>
                            <span v-if="scope.row.status == 0" class="danger-color">禁用</span>
                        </template>
          </el-table-column>-->

          <el-table-column fixed="right" label="操作" width="160px" align="center">
            <template slot-scope="scope">
                <el-button
                type="text"
                size="mini"
                @click="handleCommand({
                    name: 'userDetail',
                    type: 'read',
                    id: scope.row.id,
                    row: scope.row
                })"
                v-permission="[$api.user.userManage.detail]"
              >查看</el-button>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="cursor: pointer">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item
                    :command="composeValue('userDetail', 'read', scope.row.id,scope.row)"
                    v-permission="[$api.user.userManage.detail]"
                  >查看</el-dropdown-item> -->
                  <el-dropdown-item
                    :command="composeValue('changeStatus', '10', scope.row.id,scope.row)"
                    v-if="scope.row.status == 0"
                    style="color: #67C23A;"
                    v-permission="[$api.user.store.setStatus]"
                  >启用</el-dropdown-item>
                  <el-dropdown-item
                    :command="composeValue('changeStatus', '0', scope.row.id,scope.row)"
                    v-if="scope.row.status == 10"
                    style="color: #F56C6C;"
                    v-permission="[$api.user.store.setStatus]"
                  >禁用</el-dropdown-item>
                  <el-dropdown-item
                    :command="composeValue('audit','',scope.row.id)"
                    style="color: #f56c6c;"
                    v-if="scope.row.status == 1"
                  >审核</el-dropdown-item>
                  <el-dropdown-item
                    :command="composeValue('userDetail', 'edit', scope.row.id,scope.row)"
                    v-permission="[$api.user.userManage.edit]"
                  >编辑</el-dropdown-item>
                  <!--<el-dropdown-item :command="composeValue('listDel','',scope.row.id)"> 删除</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!--审核-->
        <el-dialog title="审核" :visible.sync="auditdialogVisible" width="30%">
          <el-form ref="closeForm" :model="auditForm" label-width="120px" label-position="right">
            <el-form-item label="是否通过：">
              <el-switch v-model="auditForm.status" :active-value="10" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="送优惠券：">
              <el-switch v-model="auditForm.coupon" :active-value="10" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditdialogVisible = false">取消</el-button>
            <el-button type="primary" @click="auditUser">确定</el-button>
          </div>
        </el-dialog>
        <Pagination
          :options="paginationOptions"
          :current="current"
          :pageSize="pageSize"
          :count="count"
          @opreateCBK="handleOpreate"
          @pageChangeCBK="handlePageChange"
          @sizeChangeCBK="handleSizeChange"
        ></Pagination>
      </template>
    </div>
  </div>
</template>

<script>
// 白银代理
import { common } from "@/OMS/mixins";
import { user } from "@/assets/constant";

export default {
  name: "shopkeeperList",
  mixins: [common],
  data() {
    return {
      exportOptions: [],
      searchOPtions: [
        {
          type: "input",
          key: "keywords",
          placeholder: "用户ID/账户/手机号",
        },

        {
          type: "input",
          key: "first_name",
          placeholder: "上级",
        },
        {
          type: "input",
          key: "second_name",
          placeholder: "上上级",
        },
        {
          type: "input",
          key: "first_team_name",
          placeholder: "直属合伙人",
        },

        {
          type: "input",
          key: "second_team_name",
          placeholder: "上级合伙人",
        },

        {
          type: "input",
          key: "team_name",
          placeholder: "钻石",
        },
        {
          type: "select",
          key: "status",
          placeholder: "状态",
          options: [
            {
              label: "待审核",
              value: 1
            },
            {
              label: "启用",
              value: 10
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        },
        {
          type: "input",
          key: "group_name",
          placeholder: "群",
        },
        {
          type: "datetimerange",
          key: "start_at-end_at",
          placeholder: "时间",
        }

        // {
        //     type: 'input',
        //     key: '',
        //     placeholder: '上级合伙人'
        // },
      ],
      options: [
        {
          label: "选中用户",
          value: 1
        },
        {
          label: "所有用户",
          value: 2
        }
      ],
      total_money: "",
      paginationOptions: [
        // {
        //   value: "edits",
        //   label: "编辑"
        // },
        // {
        //   value: "up",
        //   label: "启用"
        // },
        {
          value: "disable",
          label: "批量禁用",
          type: "warning"
        },
        {
          value: "dels",
          label: "批量删除",
          type: "danger"
        }
        // {
        //   value: "audit",
        //   label: "审核"
        // }
        // {value: 'dels', label: '批量删除', type: 'danger'},
      ],
      auditdialogVisible: false,
      auditForm: {
        status: 0,
        coupon: 0
      },
      columnSelect: [],
      audit_id: 0
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    // 仅改变状态
    async changeStatus({ status, id, cb }) {
      try {
        await this.$api.user.userSetStatus({
          status,
          id
        });
        cb && cb();
      } catch (e) {
        // 后端保存出错，强制变回原状态
        this.tableData.map(val => {
          if (val.id === id) this.$set(val, "status", status == 10 ? 0 : 10);
        });
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
    async auditUser() {
      const params = Object.assign({}, this.auditForm);
      params.id = this.audit_id;
      try {
        await this.$api.user.storeAudit(params);
        this.auditdialogVisible = false;
        this.getData();
        this.audit_id = 0;
      } catch (e) {}
    },
    async handleCommand(command) {
      if (command.name == "listDel") {
        this.handleDel(command.id);
        return;
      }
      // 审核
      if (command.name == "audit") {
        this.auditdialogVisible = true;
        this.audit_id = command.id;
        return;
      }
      if (command.name === "changeStatus") {
        try {
          await this.$api.user.storeSetStatus({
            id: command.id,
            status: command.type
          });
          this.getData();
        } catch (e) {
          throw new Error(e);
        }
        return;
      }
      this.$router.push({
        name: command.name,
        params: {
          type: command.type,
          id: command.id,
          listType: command.row.type
        }
      });
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    async getData() {
      try {
        this.loading = true;
        const { data } = await this.$api.user.storelist({
          ...this.query,
          pageSize: this.pageSize,
          page: this.current
        });
        this.tableData = data.items;
        this.count = data.count;
        this.total_money = data.total_money;
        // 导出字段
        this.exportOptions = data.fields || [];
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    // handlePageChange(val) {
    //     this.current = val;
    //     this.getData();
    // },
    // handleSizeChange(val) {
    //     this.pageSize = val;
    //     this.getData();
    // },
    //composeValue(name, params,id,listType) {
    composeValue(name, params, id, row) {
      return {
        name: name,
        type: params,
        id: id,
        row: row
      };
    },
    handleOpreate(type) {
      if (this.columnSelect.length < 1) {
        this.$message.error("请选择用户");
        return;
      }
      switch (type) {
        case "disable":
          this.changeStatus({
            id: this.columnSelect.join(","),
            status: 0,
            cb: this.getData
          });
          break;
        case "up":
          this.changeStatus({
            id: this.columnSelect.join(","),
            status: 10,
            cb: this.getData
          });
          break;
        case "audit":
          this.auditdialogVisible = true;
          this.audit_id = this.columnSelect.join(",");
          break;
      }
    },
    handleDel(id) {
      this.$confirm("确认删除选中白银？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.del(id);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.el-dropdown-link {
  font-size: 12px;
  cursor: pointer;
  color: $theme;
}

.select-content {
  padding: 10px;
  background: #fff;

  .el-select {
    width: 200px;
    margin-right: 5px;
  }
}

.block {
  margin-top: 10px;
}
</style>
