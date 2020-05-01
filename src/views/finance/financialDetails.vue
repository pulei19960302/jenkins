<template>
    <div class="br4 financialDetails">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.balance_record.export" v-permission="[$api.finance.balance_record.export]" />-->
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.balance_record.export" />-->

            <el-button plain size="small" @click="dialogVisible=true">加扣款</el-button>
        </Search>

        <div style="padding: 0 16px 16px 16px">
            <div class="summaryBar">
                <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                符合搜索条件的数据：<span class="fcorange mr24">{{ count }}</span>
                总价：<span class="fcorange">{{ total_actual_money }}</span>
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
                    @selection-change="handleSelectionChange">
                    <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="uid"
                        label="用户ID">
                    </el-table-column>
                    <el-table-column
                        label="用户名"
                        prop="username"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="收支类型"
                        prop="type_name"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="160"
                        label="来源"
                        prop="order_no"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        align="right"
                        label="资金（元）"
                        prop="money"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        align="right"
                        label="交易后余额（元）"
                        prop="balance"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        prop="created_at"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="操作人"
                        prop="admin_username"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.admin_username | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="备注"
                        prop="remark"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <Pagination
            :page-choose="[10,30,50]"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>

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
                    placeholder="请输入用户ID搜索"
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
                <AutoInputFix />
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

    // 对账列表
    export default {
        name: "financialDetails",
        data() {
            return {
                loading: false,
                dialogVisible: false,
                current: 1,
                pageSize: 30,
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
                        placeholder: '用户ID'
                    },{
                        type: 'input',
                        key: 'username',
                        placeholder: '用户名'
                    },{
                        type: 'input',
                        key: 'admin_username',
                        placeholder: '操作人'
                    },{
                        type: 'input',
                        key: 'order_no',
                        placeholder: '来源'
                    },{
                        type: 'select',
                        key: 'type',
                        placeholder: '收支类型',
                        options:[...finance.PAYMENT_TYPES]
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
                total_actual_money:'',
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
                                this.$refs['form'].resetFields();
                                this.getData();
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
                            return String(item.value).indexOf(query) > -1;
                        });
                    }, 200);
                } else {
                    this.options4 = [];
                }
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
                    const { data } = await this.$api.finance.balanceRecordList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.total_actual_money = data.total_money||0;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handelClick(){

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";

    .financialDetails {
        background: #fff;
        height: 100%;
        min-height: calc(100vh - 135px);
    }

    .note-mune{margin-bottom: 10px}
    .mune-content{
        display: flex;flex-direction: row;
        align-items: center;
    }
   .mune-content .el-button{margin: 0 10px 10px 0!important;}
    .block{margin-top: 10px}

    .fcblue { color: rgba(34, 149, 255, 1); }

    .fcorange {
        color: $warning-color;
        font-weight: 500;
    }

    .summaryBar {
        margin-bottom: 16px;
        padding-left: 16px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: rgba(240,248,255,1);
        border-radius: 4px;
        border: 1px solid rgba(145,213,255,1);
    }

</style>
