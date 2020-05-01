<template>
  <div class="sendEnvelope-container">
    <div class="title">{{$route.params.coupon_name}}</div>
    <el-row :gutter="20" style="height: calc(100% - 40px);">
      <el-col :span="8" class="left">
        <div class="form-container">
          <el-form
            ref="sendEnvelopeForm"
            :model="formData"
            label-width="150px"
            size="mini"
            style="height: 100%"
          >
            <el-form-item prop="number" :rules="[simpleRule]" label="每个用户发放数量">
              <el-input type="number" style="max-width: 180px" v-model="formData.coupon_num"></el-input>
            </el-form-item>
            <p style="color: #222222;font-weight:400;">请勾选右侧列表选择用户：</p>
            <div class="tag-container">
              <el-tag
                @close="delUser(index)"
                style="margin: 4px"
                closable
                v-for="(item,index) in selectUsers"
                :key="item.key"
              >{{item.username}}</el-tag>
            </div>
            <el-button @click="submit" class="form-submit" type="primary" size="mini">立即发放</el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :span="16" class="right" style="padding-right: 20px;">
        <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch"></Search>
        <el-table
          height="calc(100% - 104px)"
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
          <el-table-column fixed width="50" align="center" type="selection"></el-table-column>
          <el-table-column align="center" width="90" prop="id" label="用户ID"></el-table-column>
          <el-table-column align="center" width="140" prop="username" label="账户"></el-table-column>
          <el-table-column align="center"  prop="store_name" label="所属店主"></el-table-column>
          <el-table-column align="center" width="140" prop="typeName" label="用户类型"></el-table-column>
          <el-table-column align="center" width="180" prop="created_at" label="注册时间"></el-table-column>
        </el-table>
        <el-pagination
          :current-pag="current"
          :page-size="pageSize"
          :total="count"
          :page-sizes="[20,30,50]"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { common } from "@/OMS/mixins";
export default {
  mixins: [common],
  data() {
    return {
      simpleRule: { required: true, message: "必填项", trigger: "change" },
      rightPopupVisible: false,
      formData: {
        coupon_num: ""
      },
      selectUsers: [],
      searchOPtions: [
        {
          type: "input",
          key: "keywords",
          placeholder: "用户ID"
        },
        {
          type: "select",
          key: "level",
          title: "用户类型",
          //componentType: 'advanced',
          show: false,
          placeholder: "用户类型",
          options: [
            { label: "粉丝", value: 1 },
            { label: "店主", value: 30 },
            { label: "优秀店主", value: 52 }
          ]
        }
      ]
    };
  },
  watch: {
    selectUsers(v) {
      this.tableData.forEach(it => {
        const ids = this.selectUsers.map(it => it.id);
        this.noChange = true;
        if (ids.includes(it.id)) {
          this.$refs.multipleTable.toggleRowSelection(it, true);
        } else {
          this.$refs.multipleTable.toggleRowSelection(it, false);
        }
        this.noChange = false;
      });
    },
    $route() {
      this.$refreshTab();
    }
  },
  created() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      if (this.noChange) return;

      let { linked, noLink } = this.findLinkId();

      linked = val.map(it => ({
        id: it.id,
        username: it.username
      }));

      console.log(linked);

      this.selectUsers = noLink.concat(linked);
    },
    delUser(index) {
      this.selectUsers.splice(index, 1);
    },

    /**
     * 受分页、搜索影响
     * 需要对数据分开管理
     * return
     *       linked 当前操作数据
     *       noLink 当前未操作
     */
    findLinkId() {
      const ids = this.tableData.map(it => it.id);
      const linked = [];
      const noLink = [];
      this.selectUsers.forEach(it => {
        if (ids.includes(it.id)) {
          linked.push({
            id: it.id,
            username: it.username
          });
        } else {
          noLink.push({
            id: it.id,
            username: it.username
          });
        }
      });
      return { linked, noLink };
    },
    async getData() {
      try {
        this.loading = true;
        const { data } = await this.$api.user.getUserManageList({
          ...this.query,
          pageSize: 20,
          page: this.current
        });

        const copySelectUsers = JSON.parse(JSON.stringify(this.selectUsers));

        this.tableData = data.items;
        if (data.count) {
          this.count = data.count;
        }
        this.$nextTick(() => {
          this.selectUsers = copySelectUsers;
        });
        // 导出字段
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    submit() {
      if (this.selectUsers.length === 0) {
        this.$message({ message: "未选择用户", type: "error" });
        return;
      }
      if (+this.formData.coupon_num <= 0) {
        this.$message({ message: "未填写数量", type: "error" });
        return;
      }
      this.$api.activity
        .couponSend({
          coupon_id: this.$route.params.coupon_id,
          coupon_num: this.formData.coupon_num,
          member_ids: this.selectUsers.map(it => it.id).join(",")
        })
        .then(() => {
          this.$router.back(-1);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.sendEnvelope-container {
  width: 100%;
  height: calc(100vh - 115px);
  background-color: #fff;
  .title {
    padding-left: 10px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    border-bottom: 1px solid #e9e9e9;
  }
  .left {
    position: relative;
    height: 100%;
    border-right: 1px solid #e9e9e9;
  }
  .form-container {
    position: relative;
    height: 100%;
    padding: 20px 10px 40px 14px;
  }
  .tag-container {
    background: #F7F7F7;
    padding: 5px;
    overflow-y: auto;
    margin-top: 8px;
    height: calc(100% - 80px);
  }
  .form-submit {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
  .right {
    height: 100%;
    .search{
        height: 56px;
    }
    .el-table {
      overflow-y: auto;
    }
  }
}
</style>

