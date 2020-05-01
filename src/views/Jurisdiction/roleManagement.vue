<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button
                v-permission="[$api.jurisdiction.role.add]"
                size="small"
                type="primary"
                plain
                @click="dialogVisible=true;form={}">
                添 加
            </el-button>
        </Search>
        <template>
            <div class="contnet-product">
                <div style="padding: 0 16px 16px 16px; background: #fff; border-radius: 0 0 4px 4px; width: 100%;">
                <el-table
                    element-loading-spinner="el-icon-loading"
                    :highlight-current-row="true"
                    v-loading="loading"
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-cell-class-name="n-table-header-cell-class"
                    cell-class-name="n-table-cell-class"
                >
                    <el-table-column prop="name" label="角色名称" />
                    <el-table-column label="角色描述" prop="description">
                        <template slot-scope="scope">{{ scope.row.description | validVal }}</template>
                    </el-table-column>
                    <el-table-column width="300px" label="操作">
                        <template slot-scope="scope">
                            <span class="look-word"
                                v-permission="[$api.jurisdiction.role.assign]"
                                type="primary"
                                plain
                                size="mini"
                                @click="permissionsSettings(scope.row)">
                                权限设置
                            </span>
                            <span class="look-word"
                                v-permission="[$api.jurisdiction.role.edit]"
                                type="primary"
                                plain
                                size="mini"
                                @click="handleEdit(scope.row)">
                                编辑
                            </span>
                            <span class="look-word"
                                v-permission="[$api.jurisdiction.role.del]"
                                type="danger"
                                plain
                                size="mini"
                                @click="DelRole(scope.row)">
                                删除
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>
        <el-dialog
            title="添加角色"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="角色名称：" prop="name">
                    <el-input
                        :disabled="isEdit"
                        v-model="form.name"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="角色描述：" prop="description">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.description"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button type="primary" @click="AddAdminGroup(isEdit)">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { _ } from '@/OMS/utils';

    export default {
        // 部门管理
        name: "roleManagement",
        data() {
            return {
                pid: '',
                dialogVisible:false,
                isEdit: false,
                loading: false,
                page: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                oldRowData: {},
                form: {
                    name: '',       // 部门名称
                    description: '',   // 部门描述
                },
                current:1,
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    description: [
                        { required: false, message: '请输入', trigger: 'change' },
                    ]
                },
                name: null,
                query:{},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '角色名称'
                    }
                ],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            permissionsSettings({ name }){
                this.$router.push({ name: 'permissions', params: { id: name } });
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            handlePageChange(val) {
                this.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.jurisdiction.getRoleList({
                        ...this.query,
                        page: this.page,
                        pageSize: this.pageSize
                    });
                    this.loading = false;
                    this.tableData = data.items;
                    this.count = data.count;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            // 新增/编辑角色
            AddAdminGroup(isEdit) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            if(isEdit) {
                                if (_.isEqual(this.oldRowData, this.form)) {
                                    this.$message({ message: '暂无数据变更', type: 'warning' });
                                    return;
                                }
                                params.name = this.name;
                                await this.$api.jurisdiction.EditRole(params);
                            } else {
                                await this.$api.jurisdiction.AddRole(params);
                            }
                            this.resetForm();
                            this.dialogVisible = false;
                            this.isEdit = false;
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            // 删除角色
            async DelRole({ name }) {
                this.$confirm('确认删除该角色？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        try {
                            await this.$api.jurisdiction.DelRole({ name });
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                });
            },
            handleEdit({ name, description }) {
                this.name = name;
                this.oldRowData = { name, description };
                this.form = { name, description };
                this.dialogVisible = true;
                this.isEdit = true;
            }
        }
    }
</script>

<style scoped>
    .contnet-product {display: flex;flex-direction: row}
</style>
