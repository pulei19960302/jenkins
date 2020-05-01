<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.recharge.export"  v-permission="[$api.finance.recharge.export]"/>
        </Search>
        <div class="top-slot">
            符合搜索条件的数据共 <b>{{ count }}</b> 条，余额总计 <span>{{total_actual_money}}</span> 元
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
                <el-table-column
                    align="center"
                    prop="money"
                    label="类型">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="uid"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="用户昵称/供应商"
                    prop="nickname"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="结算资金"
                    prop="type_name">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="订单日期"
                    prop="pay_time"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.pay_time | validVal }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="结算日期"
                    prop="pay_time"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.pay_time | validVal }}
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
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
    import { common } from '@/OMS/mixins';
    import { finance } from '@/assets/constant';

    // 对账列表
    export default {
        name: "MoneyStatistics",
        mixins: [common],
        data() {
            return {
                query: {
                    type: -1,
                    status: -1
                },
                exportOptions: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '用户昵称 / ID'
                    },
                    {
                        type: 'select',
                        key: 'type',
                        placeholder: '充值类型',
                        options:[...finance.RECHARGE_TYPES]
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '充值状态',
                        options:[...finance.RECHARGE_STATUS]
                    },{
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '支付时间'
                    }
                ],
                total_actual_money:'',
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {
                            ...this.query,
                            ...query
                        };
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {
                            type: -1,
                            status: -1
                        };
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
                    const { data } = await this.$api.finance.rechargeList({
                        ...this.query,
                        pagesize: this.pageSize,
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
            }
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
