<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="dialogVisible=true;form={status:0}" size="small" v-permission="[$api.setting.express.add]">添加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.setting.express.export" v-permission="[$api.setting.express.export]"/>
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
                <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                    width="60"
                    prop="id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    label="快递名称"
                    prop="name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="快递代码"
                    prop="express_code">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    prop="phone">
                    <template slot-scope="scope">
                        {{ scope.row.phone | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            :disabled="!button_permissions.includes($api.setting.express.edit)"
                            v-model="scope.row.status"
                            @change="changeStatus(scope.row)"
                            :active-value="10"
                            :inactive-value="0"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="更新时间"
                    prop="updated_at">
                    <template slot-scope="scope">
                        {{ scope.row.updated_at | validDateTime }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120px"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <span class="look-word" type="primary" plain size="mini" @click="handelEdit(scope.row)" v-permission="[$api.setting.express.edit]">编辑</span>
                        <!--<el-button type="info" plain size="mini">设置打印模板</el-button>-->
                        <span class="look-word" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.setting.express.del]">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            </div>

            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @opreateCBK="handleDel"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
            <el-dialog
                title="添加物流公司"
                :visible.sync="dialogVisible"
                width="30%">
                <el-form
                    :model="form"
                    :rules="rules"
                    ref="form"
                    label-width="100px"
                    label-position="right">
                    <el-form-item label="快递名称：" prop="name">
                        <el-input
                            v-model="form.name"
                            autocomplete="off"
                            style="width: 70%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="快递代码："  prop="express_code">
                        <el-input
                            v-model="form.express_code"
                            style="width: 70%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="联系电话："  prop="phone">
                        <el-input
                            v-model="form.phone"
                            style="width: 70%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否启用："  prop="status">
                        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
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
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';

    //物流公司
    export default {
        name: "logisticsCompany",
        data() {
            return {
                loading: false,
                isEdit: false,
                dialogVisible: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                exportOptions: [],
                tableData: [],
                multipleSelection: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'id',
                        placeholder: '快递id'
                    },
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '关键词'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:10},
                            {label:'禁用',value:0},
                        ]
                    }
                ],
                form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.setting.setStatusExpress({ status, id });
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
            handelEdit({ name, express_code, phone, status, id }) {
                this.id = id;
                this.isEdit = true;
                this.dialogVisible = true;
                this.oldRowData = { name, express_code, phone, status };
                this.form = { name, express_code, phone, status };
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
                                await this.$api.setting.editExpress(params);
                            } else {
                                await this.$api.setting.addExpress(params);
                            }
                            this.isEdit = false;
                            this.dialogVisible = false;
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
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
                try {
                    this.loading = true;
                    const { data } = await this.$api.setting.getExpressList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            handleDel(ids) {
                this.$confirm('确认删除选中快递公司？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        await this.$api.setting.delExpress({ ids });
                        this.getData();
                    } catch (e) {
                        throw new Error(e);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .block{margin-top: 10px}
</style>
