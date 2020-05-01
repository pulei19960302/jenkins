<template>
    <div class="rebateDetail br4">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.balance_record.export" v-permission="[$api.finance.balance_record.export]" />-->
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.balance_record.export"/>-->

        </Search>

        <div style="padding: 0 16px">
            <div class="summaryBar">
                <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                符合搜索条件的数据：<span class="fcorange">{{ count }}</span>
                <span>条</span>
                总金额：<span class="fcorange">{{ total_money }}</span>
            </div>
        </div>
        <div style="padding: 0 16px">
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
                        width="100"
                        fixed="left"
                        prop="order_id"
                        label="订单ID">
                    </el-table-column>

                    <el-table-column
                        width="100"
                        show-overflow-tooltip
                        prop="uid"
                        label="下单人ID"
                    >
                    </el-table-column>
                    <el-table-column
                        width="100"
                        label="下单人用户名"
                        prop="buyer_nickname"
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        width="100"
                        prop="goods_id"
                        label="商品ID">
                    </el-table-column>
                    <el-table-column
                        prop="goods_title"
                        show-overflow-tooltip
                        label="商品">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="to_id"
                        show-overflow-tooltip
                        label="收益人ID">
                    </el-table-column>
                    <el-table-column
                        width="120"
                        label="收益人用户名"
                        prop="username"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        label="返利类型"
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
                        width="100"
                        label="来源"
                        show-overflow-tooltip
                        prop="order_sn">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="right"
                        label="资金（元）"
                        prop="money"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        label="返利状态"
                        prop="pay_name"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="150"
                        label="创建时间"
                        prop="created_at"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="150"
                        label="返利时间"
                        prop="pay_time"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="130"
                        label="备注"
                        prop="remark"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </template>
        </div>


        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>

        <el-dialog
            title="手动返利"
            :visible.sync="dialogVisible"
            width="30%">
<!--            <el-form-->
<!--                :model="form"-->
<!--                :rules="rules"-->
<!--                ref="form"-->
<!--                label-width="100px"-->
<!--                label-position="right">-->
<!--                &lt;!&ndash;<el-form-item label="用户id：" prop="content">&ndash;&gt;-->
<!--                &lt;!&ndash;<el-input&ndash;&gt;-->
<!--                &lt;!&ndash;v-model="form.uid"&ndash;&gt;-->
<!--                &lt;!&ndash;autocomplete="off"&ndash;&gt;-->
<!--                &lt;!&ndash;style="width: 70%;">&ndash;&gt;-->
<!--                &lt;!&ndash;</el-input>&ndash;&gt;-->
<!--                &lt;!&ndash;</el-form-item>&ndash;&gt;-->
<!--                <el-form-item label="用户名：" prop="uid">-->
<!--                    <el-select-->
<!--                        style="width: 70%;"-->
<!--                        v-model="form.uid"-->
<!--                        filterable-->
<!--                        remote-->
<!--                        reserve-keyword-->
<!--                        placeholder="用户名："-->
<!--                        :remote-method="remoteMethod"-->
<!--                        :loading="loading">-->
<!--                        <el-option-->
<!--                            v-for="item in options4"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="收支类型："  prop="type">-->
<!--                    <el-select v-model="form.type" style="width: 70%;">-->
<!--                        <el-option-->
<!--                            v-for="item in options5"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="资金："  prop="money">-->
<!--                    <el-input-->
<!--                        v-model="form.money"-->
<!--                        autocomplete="off"-->
<!--                        style="width: 70%;">-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="备注："  prop="remark">-->
<!--                    <el-input-->
<!--                        v-model="form.remark"-->
<!--                        type="textarea"-->
<!--                        :rows="2"-->
<!--                        autocomplete="off"-->
<!--                        style="width: 70%;">-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="密码："  prop="password">-->
<!--                    <el-input-->
<!--                        type="password"-->
<!--                        v-model="form.password"-->
<!--                        autocomplete="off"-->
<!--                        style="width: 70%;">-->
<!--                    </el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->


            <el-form
                @close="resetForm"
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="订单号：" prop="order_id">
                    <el-input
                        v-model="form.order_id"
                        placeholder="请输入订单号"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm()">取消</el-button>
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

    // 返利明细
    export default {
        name: "rebateDetails",
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
                        placeholder: '下单人ID'
                    },{
                        type: 'input',
                        key: 'to_id',
                        placeholder: '收益人ID'
                    },{
                        type: 'input',
                        key: 'order_id',
                        placeholder: '订单编号'
                    },{
                        type: 'input',
                        key: 'goods_id',
                        placeholder: '商品ID'
                    },{
                        type: 'select',
                        key: 'type',
                        placeholder: '返利类型',
                        options:[
                            // {label:'佣金奖励',value:11},
                            {label:'钻石差价',value:12},
                            {label:'白银平级返',value:13},
                            // {label:'银牌奖励',value:14},
                            {label:'白银差价',value:15},
                            {label:'黄金差价',value:16},
                            {label:'黄金平级返',value:17},
                            // {label:'佣金奖励扣除',value:21},
                            {label:'钻石差价扣除',value:22},
                            {label:'白银平级返扣除',value:23},
                            // {label:'银牌奖励扣除',value:24},
                            {label:'白银差价扣除',value:25},
                            {label:'黄金差价扣除',value:26},
                            {label:'黄金平级返扣除',value:27},
                        ]
                    },{
                        type: 'select',
                        key: 'is_pay',
                        placeholder: '返利状态',
                        options:[
                            {label:'待结算',value:1},
                            {label:'已结算',value:2},
                            {label:'待付款',value:3},
                            {label:'已删除',value:0},
                        ]
                    },{
                        type: 'datetimerange',
                        key: 'start_at-end_at',
                        placeholder: '创建时间'
                    },
                    // 新增
                    {
                        type: 'datetimerange',
                        key: 'rebate_start-rebate_end',
                        placeholder: '返利时间'
                    }
                    // end
                ],
                value:'',
                form: {
                    form: {
                        order_id: '',
                        password: ''
                    },
                },
                rules: {
                    order_id: [
                        { required: true, message: '必填项', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '必填项', trigger: 'change' }
                    ],

                },
                options4: [],
                options5: [],
                list: [],
                total_money:0,
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
                            const { code } = this.$api.finance.manualRebate(params);
                            if(code==0){
                                this.resetForm();
                                this.getData();
                            }
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },

            resetForm () {
                this.$refs.form.resetFields();
                this.dialogVisible = false;
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
                    const { data } = await this.$api.finance.orderclearingList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.total_money = data.total_money;
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

    .note-mune{margin-bottom: 10px}
    .mune-content{
        display: flex;flex-direction: row;
        align-items: center;
    }
    .mune-content .el-button{margin: 0 10px 10px 0!important;}
    .block{margin-top: 10px}

    .rebateDetail {
        min-height: calc(100vh - 135px);
        background: #fff;
        height: 100%;
        padding-bottom: 16px;
    }

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
