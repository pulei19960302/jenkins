<template>
  <div class="insite">
    <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
      <el-button
        type="primary"
        plain
        @click="dialogVisible = true"
        size="mini"
        v-permission="[$api.operate.message.add]"
      >发布消息</el-button>
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
    >
      <el-table-column width="60" align="center" prop="id" label="编号"></el-table-column>
      <el-table-column align="center" prop="title" label="消息标题"></el-table-column>
      <el-table-column align="center" prop="category" label="消息分类">
        <template slot-scope="scope">{{ categoryFomat(scope.row.category) }}</template>
      </el-table-column>
      <el-table-column align="center" prop="type" label="消息类型">
        <template slot-scope="scope">{{ typeFomat(scope.row.type) }}</template>
      </el-table-column>
      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">{{ scope.row.created_at | validDateTime }}</template>
      </el-table-column>
      <el-table-column align="center" prop="from_user" label="发布人员"></el-table-column>
      <el-table-column width="200px" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click.stop="lookDetails(scope.row)">查看</el-button>
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
    <el-dialog top="4vh" title="发送站内信" :visible.sync="dialogVisible" width="40%">
      <el-form :model="form" ref="form" label-width="100px" label-position="right">
        <el-form-item label="消息类型：" :rules="[simpleRule]" prop="type">
          <el-select v-model="form.type" filterable clearable>
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收者：" v-if="form.type != 4" :rules="[simpleRule]" prop="to_id">
          <el-select
            v-model="form.to_id"
            collapse-tags
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="关键词搜索"
            :remote-method="querySearchAsync"
            :loading="searchLoading"
          >
            <el-option
              v-for="item in filterData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <p class="tips">请选择消息类型后，此处搜索关键字查询对应用户</p>
        </el-form-item>
        <el-form-item label="消息分类：" :rules="[simpleRule]" prop="category">
          <el-select v-model="form.category" filterable clearable>
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div v-if="form.category === 3">
          <el-form-item label="活动链接：" :rules="[simpleRule]" prop="url">
            <el-input v-model="form.url" style="width: 214px"></el-input>
          </el-form-item>
          <el-form-item label="活动图片：" :rules="[simpleRule]">
            <FileUpload :isOnly="true" @successUploadCBK="getsuccessUpload"></FileUpload>
          </el-form-item>
          <el-form-item label="结束时间：" :rules="[simpleRule]" prop="end_time">
            <el-date-picker
              value-format="timestamp"
              size="mini"
              v-model="form.end_time"
              type="datetime"
            ></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="消息标题：" :rules="[simpleRule]" prop="title">
          <el-input v-model="form.title" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
        <el-form-item label="消息内容：" :rules="[simpleRule]" prop="content">
          <!--<Tinymce ref="editor" :height="300" v-model="form.content"/>-->
          <el-input type="textarea" v-model="form.content" autocomplete="off" style="width: 70%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="messageAdd">发 布</el-button>
      </div>
    </el-dialog>
    <RightSidePopup :visible.sync="rghtPopupVisible" width="40%">
      <div class="insite-details">
        <h3>站内信详情</h3>
        <el-form label-width="100px" class="form" size="mini">
          <el-form-item label="消息标题:" prop="title">{{ detailData.title }}</el-form-item>
          <el-form-item label="消息分类:" prop="title">{{ categoryFomat(detailData.category) }}</el-form-item>
          <el-form-item label="消息类型:" prop="title">{{ typeFomat(detailData.type) }}</el-form-item>
          <!-- 仅活动显示信息 -->
          <div v-if="detailData.category === 3">
            <el-form-item label="活动链接:" prop="title">
              <a :href="detailData.url" target="_blank">{{ detailData.url }}</a>
            </el-form-item>
            <el-form-item label="活动图片:" prop="title">
              <img :src="detailData.img" style="width: 80px;height: 80px;">
            </el-form-item>
            <el-form-item label="结束时间:" prop="title">{{ detailData.end_time | validDateTime }}</el-form-item>
          </div>
          <el-form-item label="消息内容:" prop="title">
            <div v-html="detailData.content"></div>
          </el-form-item>
        </el-form>
      </div>
    </RightSidePopup>
  </div>
</template>

<script>
import { common } from "@/OMS/mixins";

export default {
  name: "Insite",
  mixins: [common],
  data() {
    return {
      filterData: [{ value: "", label: "" }],
      opreate: "",
      searchLoading: false,
      rghtPopupVisible: false,
      detailData: {},
      loading: false,
      dialogVisible: false,
      form: {
        title: "",
        content: ""
      },
      imgs: "",
      rules: {},
      categories: [
        { value: 1, label: "系统消息" },
        { value: 2, label: "服务消息" },
        { value: 3, label: "活动消息" },
        { value: 4, label: "售后消息" },
        { value: 5, label: "群聊消息" }
      ],
      types: [
        { value: 1, label: "对用户" },
        { value: 2, label: "对群" },
        { value: 3, label: "对团队" },
        { value: 4, label: "对全站用户" },
        { value: 5, label: "对全部普通用户" },
        { value: 6, label: "对全部白银" },
        { value: 7, label: "对全部钻石" },
        { value: 8, label: "对全部合伙人" }
      ],
      searchOPtions: [
        {
          type: "input",
          key: "keywords",
          placeholder: "消息标题",
        },
        {
          type: "dateRangePicker",
          key: "start_at-end_at",
          placeholder: "发布时间",
        }
      ],
      query: {},
      current: 1,
      pageSize: 10,
      count: 0,
      tableData: []
    };
  },
  watch: {
    // 切换类型，清空对应远程搜索数据
    "form.type"(val) {
      this.form.to_id = [];
      this.filterData = [];
    }
  },
  activated() {
    this.getData();
  },
  methods: {
    getsuccessUpload(val) {
      this.imgs = val;
    },
    lookDetails(val) {
      this.detailData = Object.assign({}, val);
      this.rghtPopupVisible = true;
    },
    // 关键字-用户查询
    async getUserData(keywords) {
      try {
        const { data } = await this.$api.user.getUserManageList({ keywords });
        this.filterData = data.items.map(val => {
          return {
            value: val.id,
            label: val.username
          };
        });
      } catch (e) {}
    },
    // 关键字-群查询
    async getGroupData(name) {
      try {
        const { data } = await this.$api.user.groupList({ name });
        this.filterData = data.items.map(val => {
          return {
            value: val.id,
            label: val.name
          };
        });
      } catch (e) {}
    },
    // 关键字-团队查询
    async getPartnerData(title) {
      try {
        const { data } = await this.$api.user.partnerlist({ title });
        this.filterData = data.items.map(val => {
          return {
            value: val.id,
            label: val.title
          };
        });
      } catch (e) {}
    },
    // 不同类型远程搜索
    querySearchAsync(queryString) {
      if (queryString) {
        if (this.form.type == 1) this.getUserData(queryString);
        if (this.form.type == 2) this.getGroupData(queryString);
        if (this.form.type == 3) this.getPartnerData(queryString);
      } else {
        this.filterData = [];
      }
    },
    categoryFomat(category) {
      switch (category) {
        case 1:
          return "系统消息";
        case 2:
          return "服务消息";
        case 3:
          return "活动消息";
        case 4:
          return "售后消息";
        case 5:
          return "群聊消息";
      }
    },
    typeFomat(type) {
      switch (type) {
        case 1:
          return "对用户";
        case 2:
          return "对群";
        case 3:
          return "对团队";
        case 4:
          return "对全站用户";
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
        const { data } = await this.$api.operate.messageList({
          ...this.query,
          pageSize: this.pageSize,
          page: this.current
        });
        this.tableData = data;
        this.count = data.length;
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
    // 发送站内信
    async messageAdd() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const params = Object.assign({}, this.form);
            // 站内所有用户to_id为0
            if (this.form.type == 4) params.to_id = 0;
            // 活动消息
            if (this.form.category === 3) params.img = this.imgs;
            params.end_time = params.end_time / 1000;
            await this.$api.operate.messageAdd(params);
            this.dialogVisible = false;
            this.getData();
          } catch (e) {
            throw new Error(e);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../styles/variables";

.insite {
  .el-select__tags {
    height: 100%;
  }
  &-details {
    padding: 10px;
    .el-form-item__label {
      color: #666;
    }
    h3 {
      margin-bottom: 10px;
      border-bottom: 1px solid $border;
      padding-bottom: 10px;
    }
  }
}
.look {
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
