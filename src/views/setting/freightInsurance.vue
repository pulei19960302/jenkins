<template>
    <div>
        <!--表单-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="dialogVisible=true;form={status:0}" size="small" v-permission="[$api.setting.freight_insurance.add]">添加</el-button>
        </Search>
        <template>
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
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    label="模板名称"
                    prop="name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="运费险"
                    prop="money"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="赔付金额"
                    prop="compensate"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="money"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" :active-value="10" :inactive-value="0" @change="changeStatus(scope.row)" :disabled="!button_permissions.includes($api.setting.freight_insurance.edit)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180px"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <span class="look-word" type="primary" plain size="mini" @click="handelEdit(scope.row)" v-permission="[$api.setting.freight_insurance.edit]">编辑</span>
                        <span class="look-word" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.setting.freight_insurance.del]">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            </div>

            <Pagination
                :options="paginationOptions"
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @opreateCBK="handleDel(multipleSelection)"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>
        <el-dialog
            title="添加运费险"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="运费险名称：" prop="name" :rules="[simpleRule]">
                    <el-input
                        v-model="form.name"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="运费险：" prop="money" :rules="[simpleRule]">
                    <el-input
                        v-model="form.money"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="赔付金额：" prop="compensate" :rules="[simpleRule]">
                    <el-input
                        v-model="form.compensate"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="status">
                    <el-switch v-model="form.status" :active-value="10" :inactive-value="0"></el-switch>
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
    // 运费模板
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';
    import { common } from '@/OMS/mixins';

    export default {
        name: "freightInsurance",
        mixins: [common],
        data() {
            return {
                dialogVisible: false,
                isEdit: false,
                loading: false,
                form: {
                    status: null
                },
                paginationOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                multipleSelection: [],
                value2:'',
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '模板ID / 名称'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            { label: '启用', value: 10},
                            { label: '禁用', value: 0},
                        ]
                    }
                ],
                query: {},
                oldRowData: {},
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getInsuranceList();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.setting.freight_insurance.del)) this.paginationOptions = [];
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.setting.setStatusInsurance({ status, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
                    })
                }
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            // 回填数据
            handelEdit({ name, money, status, id ,compensate}) {
                this.id = id;
                this.isEdit = true;
                this.dialogVisible = true;
                this.oldRowData = { name, money, status, compensate };
                this.form = { name, money, status, compensate };
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
                                await this.$api.setting.editInsurance(params);
                            } else {
                                await this.$api.setting.addInsurance(params);
                            }
                            this.dialogVisible = false;
                            this.isEdit = false;
                            this.resetForm();
                            this.getInsuranceList();
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
                        this.getInsuranceList();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getInsuranceList();
                    }
                }
                todo[type]();
            },
            async getInsuranceList() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.setting.getInsuranceList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            handleSelectionChange(val) {
                const ids = val.map(curr => curr.id);
                this.multipleSelection = ids;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            jumpTo(type, id){
                this.$router.push({ name: 'addFreightFormwork',params:{ type, id }});
            },
            handleDel(id) {
                this.$confirm('确认删除选中运费险？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let ids;
                    if(!_.isArray(id)) {
                        // 单个删除
                        ids = id;
                    } else {
                        // 批量删除
                        ids = id.join(',');
                    }
                    try {
                        await this.$api.setting.delInsurance({ id: ids });
                        this.getInsuranceList();
                    } catch (e) {
                        throw new Error(e);
                    }
                }).catch((e) => {
                    throw new Error(e);
                });
            },
        }
    }
</script>

<style scoped>
    .block{margin-top: 10px}
</style>
