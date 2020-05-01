<template>
    <div class="label-manage">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" size="mini" plain @click="dialogVisible=true;form={status:2}" v-permission="[$api.product.search.edit]">添 加</el-button>
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
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                width="110"
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="关键词">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sort"
                label="排序">
            </el-table-column>
            <el-table-column
                align="center"
                label="状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        :active-value="1"
                        :inactive-value="2"
                        @change="changeStatus(scope.row)"
                        :disabled="!button_permissions.includes($api.product.search.edit)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200"
                align="center">
                <template slot-scope="scope">
                    <span class="look" type="primary" plain size="mini" @click="handelEdit(scope.row)" v-permission="[$api.product.search.edit]">编辑</span>
                    <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.product.search.del]">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :options="paginationOptions"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            :title="isEdit ? '编辑搜索关键词' : '添加搜索关键词'"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="关键词：" prop="name" :rules="[simpleRule]">
                    <el-input
                        v-model="form.name"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="label">
                    <el-input
                        v-model="form.sort"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button
                    type="primary"
                    @click="AddLabel(isEdit)">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';
    import { common } from '@/OMS/mixins';

    export default {
        name: "SearchKeywordsManage",
        mixins: [common],
        data() {
            return {
                opreate: '',
                dialogVisible: false,
                form: {
                    status: null
                },
                loading: false,
                show: true,
                paginationOptions: [
                    { value: 'del', label: '批量删除',type:'danger',permission:[this.$api.product.search.del] }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '关键词ID / 名称'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:1},
                            {label:'隐藏',value:2}
                        ]
                    }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                columnSelect:[],
                rules: {},
                isEdit: false,
                id: null,
                oldRowData: {}
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        activated(){
            this.getData();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.product.search.del)) this.paginationOptions = [];
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.product.searchSetStatus({ status, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 1 ? 2 : 1);
                    })
                }
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            handelEdit({ name, sort, status, id }) {
                this.id = id;
                this.isEdit = true;
                this.dialogVisible = true;
                this.oldRowData = { name, sort, status };
                this.form = { name, sort, status };
            },
            AddLabel(isEdit) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            if(isEdit) {
                                if (_.isEqual(this.oldRowData, this.form)) {
                                    this.$message({ message: '暂无数据变更', type: 'warning' });
                                    return;
                                }
                                params.id = this.id;
                            }
                            await this.$api.product.searchEdit(params);
                            this.dialogVisible = false;
                            this.isEdit = false;
                            this.resetForm();
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
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
            async getData() {
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.searchList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
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
            handleSelectionChange(val) {
                const select = [];
                if (val.length < 1) {
                    this.columnSelect = [];
                    return;
                }
                val.map(curr => {
                    select.push(curr.id);
                })
                this.columnSelect = select;
            },
            handleDel(id) {
                if(id=='many' && this.columnSelect.length < 1) {
                    this.$message({
                        message: '请选择标签',
                        type: 'error'
                    })
                    return;
                }
                this.$confirm('确认删除选中搜索词？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id)
                })
            },
            async del(id){
                let ids;
                if(id == 'many'){
                    ids = this.columnSelect.join(',');
                } else {
                    ids = id;
                }
                try {
                    await this.$api.product.searchDel({ ids });
                    this.getData();
                } catch (e) {

                }
            }
        }
    }
</script>

<style scoped>
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
