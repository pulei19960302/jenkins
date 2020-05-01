<template>
    <div style="background: #fff;height: 100%; min-height: calc(100vh - 135px)" class="br4">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.recharge.export"-->
<!--                    v-permission="[$api.finance.recharge.export]"/>-->
<!--            <Export :export-options="exportOptions" :query="query" :url="$api.finance.recharge.export"/>-->
        </Search>


        <div style="padding: 0 16px 16px 16px">
            <div class="summaryBar">
                <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                符合搜索条件的数据：<span class="fcorange mr24">{{ count }}</span>
                成功充值总额：<span class="fcorange">{{ total_money }}</span>
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
                        show-overflow-tooltip
                        prop="recharge_sn"
                        label="充值单号">
                    </el-table-column>
                    <el-table-column
                        align="right"
                        prop="money"
                        label="充值金额（元）">
                    </el-table-column>
                    <el-table-column
                        prop="uid"
                        label="用户ID">
                    </el-table-column>
                    <el-table-column
                        label="用户昵称"
                        prop="nickname"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="支付方式"
                        prop="type_name">
                    </el-table-column>
                    <el-table-column
                        width="150"
                        label="支付时间"
                        prop="pay_time"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.pay_time | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        prop="status_name"
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import {finance} from '@/assets/constant';

    // 对账列表
    export default {
        name: "reconciliationsList",
        data() {
            return {
                current: 1,
                pageSize: 30,
                count: 0,
                query: {
                    type: -1,
                    status: -1
                },
                tableData: [],
                exportOptions: [],
                loading: false,
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
                        options: [...finance.RECHARGE_TYPES]
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '充值状态',
                        options: [...finance.RECHARGE_STATUS]
                    }, {
                        type: 'datetimerange',
                        key: 'start_at-end_at',
                        placeholder: '支付时间'
                    },{
                        type: 'input',
                        key: 'recharge_sn',
                        placeholder: '充值单号'
                    }
                ],
                total_money: '',
                finish_money: '',
                fail_money: '',
            }
        },
        created() {
            this.query.status = 2;
            this.getData();
        },
        computed: {
          ...mapGetters(['button_permissions'])
        },
        methods: {
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
                        this.query = {
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
                    const {data} = await this.$api.finance.rechargeList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.total_money = data.total_money;
                    this.finish_money = data.finish_money;
                    this.fail_money = data.fail_money;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";

    .note-mune {
        margin-bottom: 10px
    }

    .mune-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .mune-content .el-button {
        margin: 0 10px 10px 0 !important;
    }

    .block {
        margin-top: 10px
    }

    .table-pandect {
        background: #fff;
        padding: 10px;

        span {
            color: red;
        }
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
