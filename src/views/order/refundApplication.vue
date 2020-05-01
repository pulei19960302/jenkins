<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="background: #fff;padding: 0 10px;">
            <el-tab-pane name="20">
                <span slot="label">待处理({{num_data.dai_num}})</span>
            </el-tab-pane>
            <el-tab-pane name="12;">
                <span slot="label">已完成({{num_data.finish_num}})</span>
            </el-tab-pane>
            <el-tab-pane name="3">
                <span slot="label">已拒绝({{num_data.refuse_num}})</span>
            </el-tab-pane>
        </el-tabs>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="Object.assign(query, {status: activeName })" :url="$api.order.refund.export" v-permission="[$api.order.refund.export]" />
        </Search>
        <!--表单-->
        <template>
             <div class="common-table-wrapper">
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
                <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                    align="center"
                    prop="return_sn"
                    width="150"
                    label="服务单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="order_sn"
                    width="150"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="申请时间"
                    width="140"
                    prop="created_at">
                </el-table-column>
                 <el-table-column
                    align="center"
                    label="转财务时间"
                    width="140"
                    prop="finance_receive_time">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="退款金额"
                    prop="money"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="140"
                    label="退款/退货原因"
                    prop="reason"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注"
                    prop="remark"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.remark | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="username"
                    label="用户账号">
                    <template slot-scope="scope">
                        {{ scope.row.username | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="联系电话"
                    width="140"
                    prop="phone"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.phone | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="220"
                    fixed="right"
                    align="center">
                    <template slot-scope="scope">
                        <span v-if="activeName == 20" class="look-word" type="primary" plain size="mini" @click="refundMoney(scope.row.id)" v-permission="[$api.order.refund.money]">同意退款</span>
                        <span v-if="activeName == 20" class="look-word" type="danger" plain size="mini" @click="handelDeny(scope.row.id)" v-permission="[$api.order.sale.deny]">拒绝退款</span>
                        <span class="look-word" type="info" plain size="mini" @click.stop="lookDetail(scope.row)" v-permission="[$api.order.sale.detail]">查看详情</span>
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
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%">
            <afterSaleApplicationDetail ref="detail" @successCBK="successCallback"/>
        </RightSidePopup>
    </div>
</template>

<script>
    import afterSaleApplicationDetail from './afterSaleApplicationDetail';
    // 售后申请
    export default {
        name: "refundApplication",
        components: { afterSaleApplicationDetail },
        data() {
            return {
                exportOptions: [],
                activeName: '20',
                loading: false,
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'return_sn',
                        placeholder: '服务单号'
                    },
                    {
                        type: 'input',
                        key: 'phone',
                        placeholder: '联系电话'
                    },
                    {
                        type: 'input',
                        key: 'order_sn',
                        placeholder: '订单号'
                    },
                    {
                        type: 'input',
                        key: 'username',
                        placeholder: '用户账号'
                    },
                    {
                        type: 'select',
                        key: 'type',
                        label: '',
                        placeholder: '售后类型',
                        options: [
                            {label:'退款',value:0},
                            {label:'退货',value:1},
                            {label:'换货',value:2},
                            // {label:'物流',value:3},
                            {label:'取消',value:4},
                        ]
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '申请时间'
                    },
                    {
                        type: 'datetimerange',
                        key: 'finance_receive_time_start-finance_receive_time_end',
                        placeholder: '转财务时间'
                    },
                ],
                tableData:[],
                multipleSelection: [],
                rghtPopupVisible:false,
                num_data:'',
            }
        },
        activated() {
            this.getData();
        },
        methods: {
            // 同意退款
            async refundMoney(sale_id) {
                try {
                    await this.$api.order.refundMoney({ sale_id });
                    this.getData();
                } catch (e) {
                    throw new Error(e);
                }
            },
            lookDetail({ id }) {
                this.rghtPopupVisible = true;
                this.$refs.detail.getDetailData(id);
            },
            successCallback() {
                this.getData();
                this.rghtPopupVisible = false;
            },
            // 拒绝退款
            async handelDeny(sale_id) {
                try {
                    await this.$api.order.saleDeny({ sale_id });
                    this.getData();
                } catch (e) {
                    throw new Error(e);
                }
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
            detail(id){
                this.$router.push({
                    name: 'refundDetail',params:{id:''}
                });
            },
            handleClick() {
                this.getData();
            },
            async getData(){
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.order.refundList({
                        ...this.query,
                        status: this.activeName,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.num_data=data.num_data;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
        }
    }
</script>

<style scoped>
    .color-red{color: #F24844}
    .order-active{background-color: #1ABC9C;color: #fff}
    .order-active .color-red{color: #fff}
    .button-content{margin-bottom: 10px}
</style>
