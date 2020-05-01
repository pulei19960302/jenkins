<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="jumpTo('addMember')" size="small" v-permission="[$api.jurisdiction.admincp_member.add]">添加</el-button>
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
                <!-- <el-table-column
                    align="center"
                    label="姓名"
                    prop="name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="性别"
                    prop="sex"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex == 1">男</span>
                        <span v-else-if="scope.row.sex == 2">女</span>
                        <span v-else>未知</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="头像" prop="avatar" min-width="140">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.avatar">--</span>
                        <img v-if="scope.row.avatar" :src="scope.row.avatar" style="width: 40px;height:40px;" @click="previewImg=scope.row.avatar;visible = true">
                    </template>
                </el-table-column>
                <el-table-column label="工作手机" prop="phone" min-width="140" />
                <!-- <el-table-column
                    width="200px"
                    align="center"
                    label="邮箱地址"
                    prop="email">
                    <template slot-scope="scope">{{ scope.row.email | validVal }}</template>
                </el-table-column> -->
                <el-table-column label="所属部门" prop="group_id" min-width="140">
                    <template slot-scope="scope">{{ scope.row.group_id }}</template>
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
                        <span class="look-word" type="primary" plain size="mini" @click="jumpTo('editMember', scope.row.id)" v-permission="[$api.jurisdiction.admincp_member.edit]">编辑</span>
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
    </div>
</template>

<script>
const service_map = {
    0:'无',
    10:'售后',
    1:'咨询'
}
    export default {
        name: "memberManagement",
        data() {
            return {
                visible: false,
                previewImg: '',
                loading: false,
                page: 1,
                pageSize: 10,
                count: 0,
                current: 1,
                query:{},
                tableData: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'username',
                        placeholder: '用户名'
                    },
                    {
                        type: 'cascader',
                        key: 'group_id',
                        placeholder: '所属部门',
                        options:[]
                    },
                ],
                service_map
            }
        },
        created() {
            this.gettAdminGroupData()
                .then(bool => {
                    if(bool) this.getData();
                })
        },
        methods: {
            /**
             * 递归格式化为合法数据
             * @param arr
             * @returns {*}
             */
            format(arr) {
                const formatArr = arr.map(val => {
                    if(val.children && val.children.length > 0) {
                        return {
                            value: val.id,
                            label: val.name,
                            children: this.format(val.children)
                        }
                    }
                    return {
                        value: val.id,
                        label: val.name
                    }
                })
                return formatArr;
            },
            // 部门列表数据
            async gettAdminGroupData() {
                try {
                    const { data } = await this.$api.jurisdiction.tree();
                    // 回填对应搜索项
                    const arr = this.format(data.tree);
                    this.searchOPtions.map(val => {
                        if(val.key === 'group_id') {
                            val.options = [...arr];
                        }
                    })
                    return Promise.resolve(true);
                } catch (e) {
                    throw new Error(e);
                    return Promise.reject(false);
                }
            },
            handlePageChange(val) {
                this.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        if(query.group_id) query.group_id = [...query.group_id].splice(-1, 1);
                        this.query = {...query};
                        this.page = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.page = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            // 部门列表数据
            async getData() {
                try {
                    this.loading = true;
                    const params = Object.assign({}, this.query);
                    params.page = this.page;
                    params.pageSize = this.pageSize;
                    const { data } = await this.$api.jurisdiction.getAdminMemberList(params);
                    this.loading = false;
                    this.tableData = data.items;
                    this.count = data.count;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            jumpTo(name, id) {
                this.$router.push({ name, params: { id } });
            },
            handleDel(id) {
                this.$confirm('确认删除选中成员？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        await this.$api.jurisdiction.DelAdminMember({ id });
                        this.getData();
                    } catch (e) {
                        throw new Error(e);
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
