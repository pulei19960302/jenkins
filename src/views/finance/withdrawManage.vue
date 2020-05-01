<template>
    <div class="br4 withdrawManage">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.withdraw.export"-->
<!--                    v-permission="[$api.finance.withdraw.export]"/>-->

            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.withdraw.export"/>
        </Search>

        <div style="padding: 0 16px 16px 16px">
            <div class="summaryBar">
                <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                符合搜索条件的数据：<span class="fcorange mr24">{{ count }}</span>
                总金额：<span class="fcorange">{{ total_actual_money }}</span>
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
                    style="width: 100%">
                    <el-table-column
                        width="150"
                        prop="withdraw_sn"
                        label="提现单号">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="uid"
                        label="用户">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="username"
                        label="用户昵称">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="right"
                        label="提现金额(元)"
                        prop="money"
                        show-overflow-tooltip>
                    </el-table-column>
<!--                    <el-table-column-->
<!--                        width="110"-->
<!--                        label="手续费比例(%)"-->
<!--                        prop="fee_scale">-->
<!--                    </el-table-column>-->
                    <el-table-column
                        width="100"
                        align="right"
                        label="实际提现(元)"
                        prop="real_money"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        width="100"
                        label="提现支付类型"
                        prop="pay_type"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ payTypeFormat(scope.row.pay_type) }}
                        </template>
                    </el-table-column>

                    <!-- 2020 01/16 新增 无字段 start -->
<!--                    <el-table-column label="渠道" prop="pay_type" show-overflow-tooltip/>-->
                    <el-table-column label="真实姓名" prop="real_name" show-overflow-tooltip/>
                    <el-table-column label="提现账号" prop="open_name" show-overflow-tooltip/>
<!--                    <el-table-column label="交易单号" prop="" show-overflow-tooltip/>-->
                    <!--end-->

                    <!-- 2020 02/5 新增 无字段 start -->
                    <el-table-column label="提现银行卡" prop="bank_card" width="200" show-overflow-tooltip/>
                    <!--end -->


                    <el-table-column
                        width="140"
                        label="创建时间"
                        prop="created_at"
                        show-overflow-tooltip>
                    </el-table-column>

                    <!-- 2020 01/16 新增 无字段 start -->
                    <el-table-column label="发放时间" prop="pay_time" width="150" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.pay_time | timestampToTime }}
                        </template>
                    </el-table-column>
                    <!--end-->


                    <el-table-column
                        width="100"
                        label="提现状态"
                        prop="status"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ statusFormat(scope.row.status) }}
                        </template>
                    </el-table-column>
                    <el-table-column width="100" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <!-- 只有被拒绝/已完成状态查看，其余状态均可继续审核 -->
                            <span
                                class="look-word"
                                v-permission="[$api.finance.withdraw.verify]"
                                type="primary"
                                plain
                                size="mini"
                                @click.stop="handleVerify(scope.row)"
                                v-if="scope.row.status != 2 && scope.row.status != 3">
                            审核
                        </span>
                            <span class="look-word"
                                  type="info"
                                  plain
                                  size="mini"
                                  @click.stop="handleVerify(scope.row)"
                                  v-else>
                            查看
                        </span>
                        </template>
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

        <RightSidePopup mask no-outside :visible.sync="rghtPopupVisible" width="650px">
            <Details :detailData="detailData" @success="handelSuccess"/>
        </RightSidePopup>
    </div>
</template>

<script>
    import {finance} from '@/assets/constant';
    import Details from './components/reconciliationsDetail';

    // 对账列表
    export default {
        name: "withdrawManage",
        components: {Details},
        data() {
            return {
                detailData: {},
                rghtPopupVisible: false,
                loading: false,
                current: 1,
                pageSize: 30,
                count: 0,
                query: {},
                exportOptions: [],
                tableData: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'withdraw_sn',
                        placeholder: '提现单号 / 用户ID'
                    }, {
                        type: 'select',
                        key: 'pay_type',
                        placeholder: '提现方式',
                        options: [...finance.RECHARGE_TYPES]
                    }, {
                        type: 'select',
                        key: 'status',
                        placeholder: '提现状态',
                        options: [...finance.WITHDRAW_STATUS]
                    }, {
                        type: 'datetimerange',
                        key: 'start_at-end_at',
                        placeholder: '提现时间'
                    }
                ],
                total_actual_money: '',
            }
        },
        created() {
            this.getData();
        },
        filters: {
            timestampToTime(timestamp) {
                if (!!Number(timestamp)) {
                    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
                    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
                    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
                    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
                    return Y+M+D+h+m+s;
                } else {
                    return ''
                }

            }
        },
        methods: {
            payTypeFormat(payType) {
                switch (payType) {
                    case '0': return '全部';
                    case '1': return '银行卡';
                    case '2': return '支付宝';
                    case '3': return '微信小程序';
                    case '4': return '微信APP';
                    case '5': return '微信公众号';
                    case '6': return '消费余额';
                    case '7': return '旺旺薪银行';
                    case '8': return '旺旺薪微信';
                    case '9': return '旺旺薪支付宝';
                }
            },
            statusFormat(status) {
                switch (status) {
                    case '0':
                        return '未审核';
                    case '1':
                        return '审核中';
                    case '2':
                        return '拒绝申请';
                    case '3':
                        return '提现成功';
                    case '4':
                        return '转银行处理';
                    case '5':
                        return '银行处理中';
                    case '6':
                        return '银行退回';
                    case '7':
                        return '微信拒绝';
                    case '9':
                        return '旺旺薪处理中';
                    case '10':
                        return '旺旺薪退回';
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
                    const {data} = await this.$api.finance.withdrawList({
                        ...this.query,
                        type: 1,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.total_actual_money = data.total_money || 0;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handleVerify(row) {
                this.detailData = Object.assign({}, row);
                this.rghtPopupVisible = true;
            },
            handelSuccess() {
                this.rghtPopupVisible = false;
                this.getData();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";

    .withdrawManage {
        background: #fff;
        height: 100%;
        min-height: calc(100vh - 135px);

    }

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


    .fcblue {
        color: rgba(34, 149, 255, 1);
    }

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
        background: rgba(240, 248, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(145, 213, 255, 1);
    }


</style>
