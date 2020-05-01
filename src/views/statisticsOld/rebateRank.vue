<template>
    <div class="content">
        <div>
            <el-button :type="topType==2?'primary':''" @click="topType=2">返利统计</el-button>
            <el-button :type="topType==1?'primary':''" @click="topType=1">返利排行</el-button>
        </div>
        <section v-show="topType==2">
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
                        v-model="date_detail"
                        :picker-options="pickerOptions"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="top">
                <p>用户总览</p>
                <div class="table-content">
                    <div class="row">
                        <div class="col">
                            <div>奖励总额</div>
                            <div>{{stat.total_fee}}</div>
                        </div>
                        <!--<div class="col">-->
                            <!--<div>钻石奖励总额</div>-->
                            <!--<div>{{stat.team_fee}}</div>-->
                        <!--</div>-->
                        <div class="col">
                            <div>战略合伙人奖励</div>
                            <div>{{stat.zhan_fee}}</div>
                        </div>
                        <div class="col">
                            <div>黄金奖励</div>
                            <div>{{stat.tian_fee}}</div>
                        </div>
                        <div class="col">
                            <div>一级推荐人奖励</div>
                            <div>{{stat.first_fee}}</div>
                        </div>
                        <div class="col">
                            <div>二级推荐人奖励</div>
                            <div>{{stat.second_fee}}</div>
                        </div>
                        <div class="col">
                            <div>白银下单差价</div>
                            <div>{{stat.diff_fee}}</div>
                        </div>
                        <div class="col">
                            <div>白银佣金</div>
                            <div>{{stat.share_fee}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line" v-if="date_type!=-1">
                <el-select v-model="tableValue" placeholder="数据指标" @change="detailTime">
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
                        :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            align="center"
                            prop="date_time"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="total_fee"
                            label="全部奖励总额">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="team_fee"-->
                            <!--label="钻石奖励总额">-->
                        <!--</el-table-column>-->
                        <el-table-column
                            align="center"
                            prop="zhan_fee"
                            label="战略合伙人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="tian_fee"
                            label="黄金奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="first_fee"
                            label="一级推荐人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="second_fee"
                            label="二级推荐人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="diff_fee"
                            label="利润">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="share_fee"-->
                            <!--label="分享佣金">-->
                        <!--</el-table-column>-->
                    </el-table>
                    <Pagination
                        v-if="topType==2"
                        :current="current2"
                        :pageSize="pageSize2"
                        :count="count2"
                        @pageChangeCBK="handlePageChange2"
                        @sizeChangeCBK="handleSizeChange2">
                    </Pagination>
                </template>
            </div>
        </section>
        <section v-show="topType==1">
            <div style="margin-top: 10px">
                <Search
                    :searchOPtions=searchOPtions
                    @searchCallback=handelSearch>
                </Search>
                <div class="top-slot">
                    用户总数 <span>{{ count }}</span> 人， 奖励总额 <span>{{ total_fee }}</span> 元
                </div>
                <template>
                    <el-table
                        element-loading-spinner="el-icon-loading"
                        :highlight-current-row="true"
                        v-loading="loading"
                        border
                        ref="multipleTable"
                        :data="tableData2"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            align="center"
                            prop="id"
                            label="用户ID">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="用户昵称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="type_name"
                            label="用户类型">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="total_fee"
                            label="奖励总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="tian_fee"
                            label="黄金奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="zhan_fee"
                            label="战略合伙人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="first_fee"
                            label="一级推荐人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="second_fee"
                            label="二级推荐人奖励">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="diff_fee"
                            label="白银下单差价">
                        </el-table-column>
                    </el-table>
                    <Pagination
                        v-if="topType==1"
                        :current="current"
                        :pageSize="pageSize"
                        :count="count"
                        @pageChangeCBK="handlePageChange"
                        @sizeChangeCBK="handleSizeChange">
                    </Pagination>
                </template>
            </div>
        </section>
    </div>
</template>

<script>
    // 返利统计
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';

    import LineChart from '@/OMS/components/chart/LineChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "rebateRank",
        components: {
            LineChart
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                pickerOptions,
                current: 1,
                current2: 1,
                pageSize: 10,
                pageSize2: 10,
                count: 0,
                count2: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '用户ID/账号/昵称'
                    },
                    {
                        type: 'input',
                        key: 'first_fee',
                        placeholder: '一级奖励'
                    },
                    {
                        type: 'input',
                        key: 'second_fee',
                        placeholder: '二级奖励'
                    },
                    {
                        type: 'input',
                        key: 'team_fee',
                        placeholder: '钻石奖励'
                    },
                    {
                        type: 'select',
                        key: 'member_type',
                        placeholder: '用户类型',
                        options: []
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_time-end_time',
                        placeholder: '开始时间'
                    },
                ],
                tableData: [],
                tableData2: [],
                columnSelect:[],
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                topType:2,
                date_type:-1,
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: [],
                    series: [
                        { name: '', data: [] },
                    ]
                },
                total_money:0,
                options: [
                    {value: 'total_fee', label: '奖励总额'},
                    {value: 'team_fee', label: '钻石奖励'},
                    {value: 'zhan_fee', label: '战略合伙人奖励'},
                    {value: 'tian_fee', label: '黄金奖励'},
                    {value: 'first_fee', label: '一级推荐人奖励'},
                    {value: 'second_fee', label: '二级推荐人奖励'},
                    {value: 'diff_fee', label: '白银下单差价'},
                ],
                tableValue:'total_fee',
                date_detail:'',
                stat:'',
                total_fee:0,
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
            this.getDetail();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getDetail();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getDetail();
                    }
                }
                todo[type]();
            },
            async getData(detail) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.rebate({
                        ...this.query,
                        ...detail,
                        date_type:this.date_type,
                        pageSize: this.pageSize2,
                        page: this.current2,
                    });
                    this.tableData = data.excel;
                    this.stat= data.stat;
                    this.lineChartData.xAxis=data.line.x;
                    this.lineChartData.series[0].data=data.line.y;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.count2 = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            async getDetail() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.rebaterank({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData2 = data.list;
                    this.total_fee=data.total_fee;
                    this.count = data.count;
                    this.searchOPtions[4].options=data.member_type;
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
                this.getDetail();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getDetail();
            },
            handlePageChange2(val) {
                this.current2 = val;
                this.getData();
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getData();
            },
            chooseDetail(e){
                let start_time=this.$moment(e[0]).format('YYYY-MM-DD');
                let end_time=this.$moment(e[1]).format('YYYY-MM-DD');
                this.getData({
                    start_time:start_time,
                    end_time:end_time
                });
            },
            detailTime(e){
                this.getData({line:e,});
            }
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
</style>
