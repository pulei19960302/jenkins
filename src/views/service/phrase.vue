<template>
    <div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain size="mini" @click="dialogVisible=true;form={status:10}" v-permission="[$api.order.reason.edit]">添加常用语</el-button>
        </Search>
        <!--表单-->
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
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                @selection-change="handleSelectionChange">
                <el-table-column
                    align="center"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="content"
                    label="常用语">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="排序"
                    prop="sort">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            @change="switchChange($event, scope.row.id)"
                            v-model="scope.row.status"
                            :active-value="10"
                            :inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    width="180px"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <span class="look-word" size="mini" type="primary" plain @click="handelEdit(scope.row)" v-permission="[$api.order.reason.edit]">编辑</span>
                        <span class="look-word" size="mini" type="danger" plain @click="handleDel(scope.row.id)" v-permission="[$api.order.reason.del]">删除</span>
                    </template>
                </el-table-column>
            </el-table>

            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                :options="paginationOptions"
                @opreateCBK="handleOpreate"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>

        <el-dialog
            title="添加常用语"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="常用语：" prop="content">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.content"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="排序："  prop="sort">
                    <el-input
                        v-model="form.sort"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="启用状态："  prop="sort">
                    <el-switch
                        v-model="form.status"
                        :active-value="10"
                        :inactive-value="0">
                    </el-switch>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button
                    type="primary"
                    @click="AddReason(isEdit)">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';

    //常用语
    export default {
        name: "phrase",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 0,
                dialogVisible:false,
                loading:false,
                form: {
                    content: '',
                    sort: '',
                    status: 10
                },
                oldRowData: {},
                rules: {
                    content: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                tableData: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '答案名称/内容'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:10},
                            {label:'禁用',value:0}
                        ]
                    }
                ],
                multipleSelection: [],
                options: [
                    { value: 1, label: '取消订单' },
                    { value: 2, label: '申请售后' },
                ],
                paginationOptions: [
                    { value: 'del', label: '批量删除' },
                ],
                isEdit: false,
                id: null,
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
            // 判断是否有批量操作权限
            // if (!this.button_permissions.includes(this.$api.order.reason.del)) this.paginationOptions = [];
        },
        methods: {
            async switchChange(status, id) {
                await this.$api.service.phraseEetstatus({ status, id });
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            handelEdit({ content, type, sort, status, id }) {
                this.id = id;
                this.isEdit = true;
                this.dialogVisible = true;
                this.form = { content,sort, status };
                this.oldRowData = { content,sort, status };
            },
            AddReason(isEdit) {
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
                            await this.$api.service.phraseEdit(params);
                            this.isEdit = false;
                            this.dialogVisible = false;
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
                }
                todo[type]();
            },
            async getData(){
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.service.phraseList({
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
            handleSelectionChange(val) {
                this.multipleSelection = val.map(curr => curr.id);
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleOpreate() {
                if(this.multipleSelection.length < 1) {
                    this.$message.error('请选择退货原因');
                    return;
                }
                this.handleDel(this.multipleSelection);
            },
            handleDel(id) {
                let ids;
                if(!_.isArray(id)) {
                    // 单个删除
                    ids = id;
                } else {
                    // 批量删除
                    ids = id.join(',');
                }
                this.$confirm('确认删除选中的常用语？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    await this.$api.service.phraseDel({ ids });
                    this.getData();
                })
            },
        }
    }
</script>

<style scoped>

</style>
