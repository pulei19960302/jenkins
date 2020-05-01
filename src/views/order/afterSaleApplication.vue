<template>
    <div class="afterSaleApplication-container">
        <el-tabs v-model="activeName" @tab-click="getData" style="background: #fff;padding: 0 10px;">
            <el-tab-pane name="1">
                <span slot="label">待处理({{num_data.dai_num}})</span>
            </el-tab-pane>
            <el-tab-pane name="10">
                <span slot="label">退货中({{num_data.tui_num}})</span>
            </el-tab-pane>
            <el-tab-pane name="12">
                <span slot="label">已完成({{num_data.finish_num}})</span>
            </el-tab-pane>
            <el-tab-pane name="3">
                <span slot="label">已拒绝({{num_data.refuse_num}})</span>
            </el-tab-pane>
            <!--<el-tab-pane name="4">-->
                <!--<span slot="label">已关闭</span>-->
            <!--</el-tab-pane>-->
        </el-tabs>
        <!--搜索-->
        <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
            <Export 
            :exportOptions="exportOptions" 
            :query="Object.assign(query, {status: activeName })" 
            :url="$api.order.sale.export"
             />
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
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                :data="tableData">
                <el-table-column
                    align="center"
                    prop="typeName"
                    fixed
                    label="售后类型">
                </el-table-column>
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
                    label="物流查看">
                    <template slot-scope="scope">
                        <logisticsInfo  :logisticssn="scope.row.logistics_sn" :expresscode="scope.row.logistics_code"></logisticsInfo>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="140"
                    label="申请时间"
                    prop="created_at">
                    <template slot-scope="scope">{{ scope.row.created_at | validVal }}</template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="username"
                    label="用户账号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    width="130"
                    label="联系电话">
                    <template slot-scope="scope">{{ scope.row.phone | validVal }}</template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="退款金额"
                    prop="money"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="申请状态"
                    prop="statusName"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="寄出状态"
                    prop="deliveryStatusName"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="处理时间"
                    width="140"
                    prop="end_time"
                    show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.end_time || '--' }}</template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100"
                    fixed="right"
                    align="left">
                    <template slot-scope="scope">
                        <!--<span class="look-word" type="info" plain size="mini" @click="lookDetail(scope.row)" v-permission="[$api.order.sale.detail]">查看详情</span>-->
                        <el-button type="text" style="margin-right: 0 !important;" size="mini" @click.stop="lookDetail(scope.row)" v-permission="[$api.order.sale.detail]">查看详情</el-button>
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
        <RightSidePopup mask :visible.sync="rghtPopupVisible" width="60%">
            <afterSaleApplicationDetail ref="detail" @successCBK="successCallback"/>
        </RightSidePopup>
    </div>
</template>

<script>
    //售后申请 
    import afterSaleApplicationDetail from './afterSaleApplicationDetail';
    import logisticsInfo from './logisticsInfo';

    export default {
        name: "afterSaleApplication",
        components: { afterSaleApplicationDetail,logisticsInfo },
        data() {
            return {
                rghtPopupVisible: false,
                loading: false,
                activeName: '1',
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
                        key: 'goods_ids',
                        placeholder: '商品id'
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
                        type: 'select',
                        key: 'is_post_back',
                        label: '',
                        placeholder: '寄出状态',
                        options: [
                            {label:'未邮寄',value:0},
                            {label:'已邮寄',value:1},
                        ]
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '申请时间'
                    },
                ],
                tableData:[],
                multipleSelection: [],
                exportOptions: [],
                num_data:'',
            }
        },
        activated() {
            this.getData();
        },
        methods: {
            successCallback() {
                this.getData();
                this.rghtPopupVisible = false;
            },
            lookDetail({ id }) {
                this.rghtPopupVisible = true;
                this.$refs.detail.getDetailData(id);
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
            async getData(){
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.order.saleList({
                        ...this.query,
                        status: this.activeName,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.num_data = data.num_data;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
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
            detail(id){
                this.$router.push({
                    name: 'afterSaleApplicationDetail',params:{id:''}
                });
            }
        }
    }
</script>

<style scoped>
    .color-red{color: #F24844}
    .order-active{background-color: #1ABC9C;color: #fff}
    .order-active .color-red{color: #fff}
    .button-content{margin-bottom: 10px}

    .color-green{color:lightgreen;}
</style>
<style lang="scss">
.afterSaleApplication-container{
    .el-tabs{
        padding:0 16px !important;
    }
}
</style>
