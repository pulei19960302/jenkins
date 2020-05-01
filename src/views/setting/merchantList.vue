<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <!--表单-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click.stop="handleAdd" size="small" v-permission="[$api.setting.merchant_setting.edit]">添加</el-button>
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
                        sortable
                        prop="id"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        label="商户号"
                        prop="merchant_no"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="终端ID"
                        prop="terminal_id"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="260px"
                        label="Token"
                        prop="token"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="是否启用"
                        prop="is_enable">
                        <template slot-scope="scope">
                            <el-switch
                                :disabled="!button_permissions.includes($api.setting.merchant_setting.setEnable)"
                                v-model="scope.row.is_enable"
                                :active-value="'1'"
                                :inactive-value="'0'"
                                @change="changeDisplayStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="120px"
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <span class="look-word" type="primary" plain size="mini" @click.stop="handleEdit(scope.row.id)" v-permission="[$api.setting.merchant_setting.edit]">编辑</span>
                            <span class="look-word" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.setting.merchant_setting.delete]">删除</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <RightSidePopup mask :visible.sync="drawerVisible" width="50%">
                <div class="platformSetting">
                    <p class="title">{{ isAdd ? '添加商户号' : '编辑商户号' }}</p>
                    <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :model="form" :rules="rules" ref="ruleForm">
                        <el-form-item label="商户号：" prop="merchant_no">
                            <el-input v-model="form.merchant_no" style="width: 200px" placeholder="请输入商户号"></el-input>
                        </el-form-item>
                        <el-form-item label="终端ID：" prop="terminal_id">
                            <el-input v-model="form.terminal_id" style="width: 200px" placeholder="请输入终端ID"></el-input>
                        </el-form-item>
                        <el-form-item label="Token：" prop="token">
                            <el-input v-model="form.token" style="width: 200px" placeholder="请输入Token"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用：" prop="is_enable">
                            <el-switch v-model="form.is_enable" :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-button type="primary" class="submit" @click="submit" v-permission="[$api.setting.config.save]">提交</el-button>
                    </el-form>
                </div>
            </RightSidePopup>

            <Pagination
                :options="paginationOptions"
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';

    //运费模板
    export default {
        name: "freightFormwork",
        data() {
            return {
                // 抽屉
                isAdd: true, // 区分 添加 OR 编辑
                drawerVisible: false,
                form: {
                    merchant_no: '',
                    terminal_id: '',
                    status: 0
                },
                rules: {
                    merchant_no: [
                        { required: true, message: '请输入商户号', trigger: 'blur' },
                        { min: 6, message: '应该包含至少6个字符', trigger: 'blur' }
                    ],
                    terminal_id: [
                        { required: true, message: '请输入终端ID', trigger: 'blur' },
                        { min: 6, message: '应该包含至少6个字符', trigger: 'blur' }
                    ],
                    token: [
                        { required: true, message: '请输入Token', trigger: 'blur' },
                        { min: 16, message: '应该包含至少16个字符', trigger: 'blur' }
                    ],
                },

                // 列表页
                paginationOptions: [],
                current: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                tableData: [],
                multipleSelection: [],
                value2:'',
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keyword',
                        placeholder: '搜索关键字'
                    }
                ],
                query: {},
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getMerchantList();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.setting.merchant_setting.delete)) this.paginationOptions = [];
        },
        methods: {
            // 抽屉相关
            handleAdd() {
                this.isAdd = true
                this.drawerVisible = true
                this.form = {
                    merchant_no: '',
                    terminal_id: '',
                    status: 0
                }
            },
            handleEdit(id) {
                this.isAdd = false
                this.drawerVisible = true
                this.getData(id)
            },
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form)
                            await this.$api.setting.editMerchant(params)
                            this.drawerVisible = false
                            this.getMerchantList()
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData(id) {
                try {
                    const { data } = await this.$api.setting.getMerchantInfo({ id });
                    this.form = data
                } catch (e) {
                    throw new Error(e);
                }
            },

            // 页面相关
            // 仅改变状态
            async changeDisplayStatus({ is_enable, id }) {
                try {
                    await this.$api.setting.setEnableMerchant({ is_enable, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'is_enable', is_enable == 1 ? 0 : 1);
                    })
                }
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getMerchantList();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getMerchantList();
                    }
                }
                todo[type]();
            },
            async getMerchantList() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.setting.getMerchantList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.data;
                    this.count = Number(data.total)
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.map(curr => curr.id);
            },
            handlePageChange(val) {
                this.current = val;
                this.getMerchantList();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getMerchantList();
            },
            jumpTo(name, type, id){
                this.$router.push({ name ,params:{ type, id }});
            },
            handleDel(id) {
                this.$confirm('确认删除选中设置？', '提示', {
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
                        await this.$api.setting.deleteMerchant({ id });
                        this.getMerchantList();
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

    /* 抽屉 */
    .platformSetting {
        background: #fff;
    }

    .platformSetting .title {
        font-size:20px;
        padding: 10px;
        margin-bottom: 40px;
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
