<template>
<div style="min-height: calc(100vh - 135px); background: #fff;">
    <!--搜索-->
    <Search
        :searchOPtions=searchOPtions
        @searchCallback=handelSearch>
        <el-button type="primary" plain @click.stop="id=null; drawerVisible=true; avatar=[]; resetForm('ruleForm');" size="small" v-permission="[$api.jurisdiction.admincp_member.add]">添加</el-button>
    </Search>
    <!--表单-->
    <template>
        <div style="padding: 0 16px 16px 16px; background: #fff; border-radius: 0 0 4px 4px;">
        <el-table
            element-loading-spinner="el-icon-loading"
            :highlight-current-row="true"
            v-loading="loading"
            border
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            header-cell-class-name="n-table-header-cell-class"
            cell-class-name="n-table-cell-class"
        >
            <el-table-column prop="username" label="用户名" min-width="180" />
            <el-table-column label="头像" prop="avatar" min-width="140">
                <template slot-scope="scope">
                    <span v-if="!scope.row.avatar">--</span>
                    <img v-if="scope.row.avatar" :src="scope.row.avatar" style="width: 40px;height:40px;" @click="previewImg=scope.row.avatar;visible = true">
                </template>
            </el-table-column>
            <el-table-column label="工作手机" prop="phone" min-width="140" />
            <el-table-column label="所属部门" prop="group_id" min-width="140">
                <template slot-scope="scope">{{ scope.row.group_name === '' ? '--' : scope.row.group_name }}</template>
            </el-table-column>
            <el-table-column label="对应角色" prop="role" min-width="140">
                <template slot-scope="scope">{{ scope.row.role | validVal }}</template>
            </el-table-column>
            <el-table-column label="客服类型" prop="service_type" min-width="140">
                <template slot-scope="scope">{{ service_map[scope.row.service_type] }}</template>
            </el-table-column>
            <el-table-column label="添加时间" prop="created_at" min-width="140">
                <template slot-scope="scope">{{ scope.row.created_at | validDateTime }}</template>
            </el-table-column>
            <el-table-column label="最后登录" prop="login_time" min-width="140">
                <template slot-scope="scope">{{ scope.row.login_time | validDateTime }}</template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <span class="look-word" type="primary" plain size="mini" @click.stop="handleEdit(scope.row.id)" v-permission="[$api.jurisdiction.admincp_member.edit]">编辑</span>
                    <span class="look-word" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.jurisdiction.admincp_member.del]">删除</span>
                </template>
            </el-table-column>
        </el-table>
        </div>

        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
    </template>
    <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>

    <!-- 侧边弹窗 -->
    <RightSidePopup mask :visible.sync="drawerVisible" width="50%">
      <p class="title">{{ id ? '编辑' : '添加' }}成员</p>
      <el-form autocomplete="off" label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :rules="rules" :model="ruleForm" ref="ruleForm">
          <el-form-item label="用户名" prop="username" :rules="[simpleRule]">
              <el-input v-model="ruleForm.username" style="width: 200px" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone" style="width: 200px" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
              <FileUpload :isOnly="true" :fileList="avatar" @successUploadCBK="getsuccessUpload" width="80px" height="80px"></FileUpload>
          </el-form-item>
          <el-form-item label="所属部门" prop="group_id">
              <el-cascader
                  style="width: 200px"
                  change-on-select
                  filterable
                  expand-trigger="hover"
                  :options="adminGroup"
                  v-model="ruleForm.group_id">
              </el-cascader>
          </el-form-item>
          <el-form-item label="对应角色" prop="role" :rules="[simpleRule]">
              <el-select
                  v-model="ruleForm.role"
                  placeholder="请选择"
                  prop="role"
                  style="width: 200px"
                  filterable
                  autocomplete="off"
                  clearable>
                  <el-option
                      v-for="item in roles"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="客服类型" prop="service_type" :rules="[simpleRule]">
              <el-select
                  name="service_type"
                  v-model="ruleForm.service_type"
                  placeholder="请选择"
                  prop="role"
                  style="width: 200px"
                  clearable>
                  <el-option
                      v-for="item in [{name:'无',id:0},{name:'咨询',id:1},{name:'售后',id:10}]"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="登录密码" prop="password" :rules="id ? [] : [simpleRule]">
              <el-input v-model="ruleForm.password" style="width: 200px" placeholder="请输入密码" type="password"></el-input>
              <p class="tips" v-if="id">不修改密码可不填写</p>
          </el-form-item>
          <el-button type="primary" class="submit" @click="submit">提 交</el-button>
      </el-form>
    </RightSidePopup>
</div>
</template>

<style scoped>
/* 抽屉样式 */
.title {
  margin-bottom: 40px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
}
.platformSetting .lastWore {
    display: inline-block;
    width: 200px;
    margin-left: 10px;
    text-align: left
}
.submit {
    margin: 20px 0 20px 150px;
}
</style>

<script src="./index.js" />
