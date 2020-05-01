<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.balance_record.export" v-permission="[$api.finance.balance_record.export]" />
            <!--<el-button type="primary" plain size="mini" @click="dialogVisible=true">加扣款</el-button>-->
        </Search>
        <div class="top-slot" style="padding: 10px">
            货款金额 <span>{{ total_money }}</span> 元
        </div>
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
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="order_id"
                    label="订单ID">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="goods_id"
                    label="商品ID">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="goods_title"
                    label="商品">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="to_id"
                    label="供应商ID">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="供应商"
                    prop="username"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="结算类型"
                    prop="type_name"
                    show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column-->
                <!--align="center"-->
                <!--label="来源"-->
                <!--prop="target_id"-->
                <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column
                    align="center"
                    label="来源"
                    prop="order_sn">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="资金（元）"
                    prop="money"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="结算状态"
                    prop="pay_name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="创建时间"
                    prop="created_at"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="结算时间"
                    prop="pay_time"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="remark"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>

            <Pagination
                :options="paginationOptions" 
                @opreateCBK="handleOpreate"
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>

        <el-dialog
            title="加扣款"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <!--<el-form-item label="用户id：" prop="content">-->
                <!--<el-input-->
                <!--v-model="form.uid"-->
                <!--autocomplete="off"-->
                <!--style="width: 70%;">-->
                <!--</el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="用户名：" prop="uid">
                    <el-select
                        style="width: 70%;"
                        v-model="form.uid"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="用户名："
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收支类型："  prop="type">
                    <el-select v-model="form.type" style="width: 70%;">
                        <el-option
                            v-for="item in options5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资金："  prop="money">
                    <el-input
                        v-model="form.money"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注："  prop="remark">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        :rows="2"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码："  prop="password">
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button
                    type="primary"
                    @click="updatemoney()">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { finance } from '@/assets/constant';

    // 供应商款
    export default {
        name: "supplierAccount",
        data() {
            return {
                loading: false,
                dialogVisible: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query:{},
                exportOptions: [],
                tableData: [],
                multipleSelection: [],
                value2:'',
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'uid',
                        placeholder: '供应商ID'
                    },{
                        type: 'input',
                        key: 'username',
                        placeholder: '供应商'
                    },{
                        type: 'input',
                        key: 'order_id',
                        placeholder: '订单ID'
                    },{
                        type: 'input',
                        key: 'goods_id',
                        placeholder: '商品ID'
                    },{
                        type: 'select',
                        key: 'is_pay',
                        placeholder: '结算状态',
                        options:[
                            {label:'未结算',value:1},
                            {label:'已结算',value:2},
                            {label:'已取消',value:0},
                        ]
                    },{
                        type: 'datetimerange',
                        key: 'start_at-end_at',
                        placeholder: '创建时间'
                    }
                ],
                value:'',
                form: {
                    uid: '',
                    type: '',
                    money: '',
                    remark: '',
                    password:'',
                },
                rules: {
                    uid: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    money: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    remark: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    password: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                options4: [],
                options5: [],
                list: [],
                total_money:0,
                paginationOptions: [{ value: 'check', label: '批量结算',permission:[this.$api.finance.finance.payall] },]
            }
        },
        created() {
            this.getData();
            this.balanceRecordType();
        },
        methods: {
            async balanceRecordType(){
                const { data } = await this.$api.finance.balanceRecordType();
                this.options5=data;
            },
            async updatemoney(){
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            const {code}=await this.$api.finance.updatemoney(params);
                            if(code==0){
                                this.dialogVisible= false;
                                this.getData();
                } else {
                    this.options4 = [];
                }
            } catch (e) {
                throw new Error(e);
            }
        }
    });
    },
    async remoteMethod(query) {
        if (query !== '') {
            this.loading = true;
            const { data } = await this.$api.finance.balanceRecordUser({name:query});
            this.list = data.map(item => {
                return { value: item.id, label: item.name };
            });
            setTimeout(() => {
                this.loading = false;
                this.options4 = this.list.filter(item => {
                    return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
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
                    const { data } = await this.$api.finance.orderclearingList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        type:1
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.total_money= data.total_money;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handleOpreate() {
                if(this.multipleSelection.length < 1) {
                    this.$message.warning('请选择商品');
                    return;
                }
                this.handleCheck(this.multipleSelection);
            },
            handleCheck(id) {
                console.log(id)
                this.$confirm(`确认结算选中货款？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let ids;
                    ids = id.join(',');
                    try {
                        await this.$api.finance.payAll({ ids });
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
    .note-mune{margin-bottom: 10px}
    .mune-content{
        display: flex;flex-direction: row;
        align-items: center;
    }
    .mune-content .el-button{margin: 0 10px 10px 0!important;}
    .block{margin-top: 10px}
</style>
