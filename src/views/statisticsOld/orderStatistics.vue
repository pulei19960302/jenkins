<template>
    <div class="content">
        <div style="margin: 10px 0;display: flex">
            <el-radio-group v-model="date_type"  @change="getData" style="margin-right: 10px">
                <el-radio-button label="-1">全部</el-radio-button>
                <el-radio-button label="1">昨日</el-radio-button>
                <el-radio-button label="2">最近一周</el-radio-button>
                <el-radio-button label="3">最近30天</el-radio-button>
            </el-radio-group>
            <div>
                <el-date-picker
                    @change="chooseDetail"
                    v-model="date_type2"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    :picker-options="pickerOptions"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
        <div class="top">
            <p>订单总览</p>
            <div class="table-content">
                <div class="row">
                    <div class="col">
                        <div>订单总额</div>
                        <div>{{stat.total_fee }}</div>
                    </div>
                    <div class="col">
                        <div>有效订单总额</div>
                        <div>{{stat.valid_fee}}</div>
                    </div>
                    <div class="col">
                        <div>取消订单金额</div>
                        <div>{{stat.cancel_fee}}</div>
                    </div>
                    <div class="col">
                        <div>完成订单金额</div>
                        <div>{{stat.finish_fee}}</div>
                    </div>
                    <div class="col">
                        <div>售后订单金额</div>
                        <div>{{stat.sales_fee}}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div>订单总数/人</div>
                        <div>{{stat.total_num}}<span class="f14">笔</span>/{{stat.member_num}}<span class="f14">人</span></div>
                    </div>
                    <div class="col">
                        <div>有效订单数</div>
                        <div>{{stat.valid_num}}<span class="f14">笔</span></div>
                    </div>
                    <div class="col">
                        <div>取消订单数</div>
                        <div>{{stat.cancel_num}}<span class="f14">笔</span></div>
                    </div>
                    <div class="col">
                        <div>完成订单数</div>
                        <div>{{stat.finish_num}}<span class="f14">笔</span></div>
                    </div>
                    <div class="col">
                        <div>售后订单数</div>
                        <div>{{stat.sales_num}}<span class="f14">笔</span></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="line" v-if="date_type!=-1">
            <el-select v-model="tableValue" placeholder="数据指标"  @change="getData">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <LineChart :chartData="lineChartData" width="80%" />
        </div>
        <div>
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
                        prop="date_time"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="total_num"
                        label="订单总数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="total_fee"
                        label="订单总额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="valid_num"
                        label="有效订单数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="valid_fee"
                        label="有效订单金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="cancel_num"
                        label="取消订单数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="cancel_fee"
                        label="取消订单金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="finish_num"
                        label="完成订单数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="finish_fee"
                        label="完成订单金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="sales_num"
                        label=" 售后订单数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="sales_fee"
                        label="售后订单金额">
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
    </div>
</template>

<script>
    // 订单统计
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';

    import LineChart from '@/OMS/components/chart/LineChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "orderStatistics",
        components: {
            LineChart
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                pickerOptions,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '用户ID/账号/昵称'
                    },
                ],
                tableData: [],
                columnSelect:[],
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                date_type:-1,
                topType:2,
                date_type2:'',
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: [],
                    series: [
                        { name: '', data: [] },
                    ]
                },
                total_money:0,
                options: [
                    {value: 'total_num', label: '订单总数'},
                    {value: 'total_fee', label: '有效订单总额'},
                    {value: 'valid_num', label: '有效订单数'},
                    {value: 'valid_fee', label: '有效订单金额'},
                    {value: 'cancel_num', label: '取消订单数'},
                    {value: 'cancel_fee', label: '取消订单金额'},
                    {value: 'finish_num', label: '完成订单数'},
                    {value: 'finish_fee', label: '完成订单金额'},
                    {value: 'sales_num', label: '售后订单数'},
                    {value: 'sales_fee', label: '售后订单金额'},
               ],
                tableValue:'total_num',
                stat:'',
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
        },
        methods: {
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
                    this.query.date_type=this.date_type;
                    const { data } = await this.$api.statistics.goodsProfits({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        line: this.tableValue,
                        date_type:this.date_type
                    });
                    this.tableData = data.excel;
                    this.count = data.count;
                    this.stat = data.stat;
                    this.lineChartData.xAxis=data.line.x;
                    this.lineChartData.series[0].data=data.line.y;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handleSelectionChange(val) {
                const select = [];
                if (val.length < 1) {
                    this.columnSelect = [];
                    return;
                }
                val.map(curr => {
                    select.push(curr.id);
                })
                this.columnSelect = select;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            rank(){
                console.log(this.topType)
                this.topType=1;
            },
            statistics(){
                console.log(this.topType)
                this.topType=2;
            },
            chooseDetail(e){
                let start_time=this.$moment(e[0]).format('YYYY-MM-DD');
                let end_time=this.$moment(e[1]).format('YYYY-MM-DD');
                this.query.start_time=start_time;
                this.query.end_time=end_time;
                this.getData();
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";
    .select-content {
        padding: 10px;
        background: #fff;
        .el-select {
            width: 200px;
            margin-right: 5px
        }
    }
    .block {
        margin-top: 10px
    }

    .content{
        background: #fff;
        padding: 20px;
        .row{
            display: flex;
            flex-direction: row;
            width: 100%;
            margin: 10px auto;
            border: solid 1px #d2cfcf;
            .col{
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                align-items: center;
                border-right: solid 1px #d2cfcf;
                div{
                    height: 30px;
                    display: flex;
                    align-items: center;
                }

            }
        }
    }

    .row .col:last-child{border-right: 0}
    .row .col div:first-child{font-size: 12px;color: #999}
    .row .col div:last-child{font-size: 20px}
    .content{
        .search{
            padding-left: 0;
        }
    }

    .table-content{
        margin: 10px auto;
        border-bottom: solid 1px #d2cfcf;
        .row{
            margin: 0;
            border-bottom: 0;
        }
    }
    .f14{font-size: 14px}
</style>
