<template>
    <div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button
                v-permission="[$api.jurisdiction.admincp_group.add]"
                size="mini"
                type="primary"
                plain
                @click="dialogVisible=true;form={}">
                添 加
            </el-button>
        </Search>
        <template>
            <div class="contnet-product">
                <el-tree style="width: 150px;margin-top: 4px;" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            <el-table
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="true"
                v-loading="loading"
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="name"
                    label="部门名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="职能描述"
                    prop="describe">
                    <template slot-scope="scope">
                        {{ scope.row.describe | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="成员数量"
                    prop="num">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="添加时间"
                    sortable
                    prop="sort">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | validDateTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="300px"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <span class="look-word"
                            v-permission="[$api.jurisdiction.admincp_group.edit]"
                            type="primary"
                            plain
                            size="mini"
                            @click="handleEdit(scope.row)">
                            编辑
                        </span>
                        <span class="look-word"
                            v-permission="[$api.jurisdiction.admincp_group.del]"
                            type="danger"
                            plain
                            size="mini"
                            @click="DelAdminGroup(scope.row)">
                            删除
                        </span>
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
        <el-dialog
            title="添加部门"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="上级部门ID：" prop="pid">
                    <span>{{ query.group_id || 0}}</span>
                </el-form-item>
                <el-form-item label="部门名称：" prop="name">
                    <el-input
                        v-model="form.name"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="职能描述：" prop="word">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.describe"
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
        name: "departmentManagement",
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
                multipleSelection: [],
                value2:'',
                oldRowData: {},
                form: {
                    name: '',       // 部门名称
                    describe: '',   // 部门描述
                },
                current:1,
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    describe: [
                        { required: false, message: '请输入', trigger: 'change' },
                    ]
                },
                id: null,
                data:[],
                query:{},
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '部门名称'
                    }
                ],
            }
        },
        created() {
            this.getData();
            this.getTree();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        if(query.cate_id) query.cate_id = [...query.cate_id].splice(-1, 1);
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
            handleNodeClick(data) {
                this.query.group_id = data.id;
                this.getData();
            },
            handlePageChange(val) {
                this.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            // 部门tree
            async getTree(){
                const { data } = await this.$api.jurisdiction.tree();
                this.data = data.tree;
            },
            // 部门列表数据
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.jurisdiction.getAdminGroupList({
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
            // 新增/编辑部门
            AddAdminGroup(isEdit) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            params.pid = this.query.group_id || 0;
                            if(isEdit) {
                                if (_.isEqual(this.oldRowData, this.form)) {
                                    this.$message({ message: '暂无数据变更', type: 'warning' });
                                    return;
                                }
                                params.id = this.id;
                                await this.$api.jurisdiction.EditAdminGroup(params);
                            } else {
                                await this.$api.jurisdiction.AddAdminGroup(params);
                            }
                            this.resetForm();
                            this.dialogVisible = false;
                            this.isEdit = false;
                            this.getData();
                            this.getTree();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            // 删除部门
            async DelAdminGroup({ id }) {
                try {
                    await this.$api.jurisdiction.DelAdminGroup({ id });
                    this.getData();
                    this.getTree();
                } catch (e) {
                    throw new Error(e);
                }
            },
            handleEdit({ name, describe, id }) {
                this.id = id;
                this.oldRowData = { name, describe };
                this.form = { name, describe };
                this.dialogVisible = true;
                this.isEdit = true;
            }
        }
    }
</script>

<style scoped>
    .contnet-product {display: flex;flex-direction: row}
</style>
