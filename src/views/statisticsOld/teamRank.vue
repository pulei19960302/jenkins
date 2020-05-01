<template>
    <div class="content">
        <div>
            <el-button :type="topType==2?'primary':''" @click="topType=2">团队统计</el-button>
            <el-button :type="topType==1?'primary':''" @click="topType=1">团队排行</el-button>
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
                <p>团队销量总览</p>
                <div class="table-content">
                    <div class="row">
                        <div class="col">
                            <div>团队总人数</div>
                            <div>{{stat.person_num}}</div>
                        </div>
                        <div class="col">
                            <div>团队下单总额</div>
                            <div>{{stat.total_fee}}</div>
                        </div>
                        <div class="col">
                            <div>白银下单人数</div>
                            <div>{{stat.order_store}}</div>
                        </div>
                        <div class="col">
                            <div>团队下单人次</div>
                            <div>{{stat.order_member}}</div>
                        </div>
                        <div class="col">
                            <div>团队下单率</div>
                            <div>{{stat.order_rate}}%</div>
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
                            prop="person_num"
                            label="团队总人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="total_fee"
                            label="团队消费总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_member"
                            label="平均每日下单人次">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_store"
                            label="白银下单人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_rate"
                            label="团队下单率">
                            <template slot-scope="scope">
                                {{ scope.row.order_rate +'%' }}
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
        </section>
        <section v-show="topType==1">
            <div style="margin-top: 10px">
                <Search
                    :searchOPtions=searchOPtions
                    @searchCallback=handelSearch>
                </Search>
                <div class="top-slot">
                    团队总数 <span>{{ teamcount }}</span> 个,  下单总人数 <span>{{ total_order_member }}</span> 人, 消费总额 <span>{{ total_fee }}</span> 元
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
                            prop="team_name"
                            label="团队名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="uid"
                            label="团队ID">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="type_name"
                            label="团队类型">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="person_num"
                            label="团队总人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_num"
                            label="团队订单数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="total_fee"
                            label="团队下单总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_member"
                            label="平均每日下单人次">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="团队下单率">
                            <template slot-scope="scope">
                                {{ scope.row.order_rate +'%' }}
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination
                        :current="current2"
                        :pageSize="pageSize2"
                        :count="count2"
                        @pageChangeCBK="handlePageChange2"
                        @sizeChangeCBK="handleSizeChange2">
                    </Pagination>
                </template>
            </div>
        </section>
    </div>
</template>

<script>
    // 团队排行
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';

    import LineChart from '@/OMS/components/chart/LineChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "teamRank",
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
                        key: 'team_name',
                        placeholder: '团队名称'
                    },
                    {
                        type: 'input',
                        key: 'uid',
                        placeholder: '团队ID'
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_time-end_time',
                        placeholder: '开始时间'
                    },
                    {
                        type:'select',
                        key:'type',
                        placeholder:'团队类型',
                        options:[
                             {value:-1,label:'全部'},
                            {value:1,label:'钻石'},
                            {value:2,label:'黄金'},
                            {value:3,label:'白银'},
                        ]
                    }
                ],
                tableData: [],
                tableData2: [],
                columnSelect:[],
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                date_type:-1,
                topType:2,
                date_detail:'',
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: [],
                    series: [
                        { name: '人数', data: [] },
                    ]
                },
                total_money:0,
                options: [
                    {value: 'person_num', label: '团队总人数'},
                    {value: 'total_fee', label: '团队下单总额'},
                    {value: 'order_member', label: '平均每日下单人次'},
                ],
                tableValue:'person_num',
                stat:'',
                teamcount:0,
                total_fee:0,
                total_order_member:0,
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
            this.teamrank();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.teamrank();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.teamrank();
                    }
                }
                todo[type]();
            },
            async getData(detail) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.team({
                        ...this.query,
                        ...detail,
                        pageSize: this.pageSize,
                        page: this.current,
                        date_type:this.date_type,
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
            async teamrank(detail) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.teamrank({
                        ...this.query,
                        ...detail,
                        pageSize: this.pageSize2,
                        page: this.current2,
                        date_type:this.date_type,
                    });
                    this.tableData2 = data.list;
                    this.teamcount = data.count;
                    this.total_fee = data.total_fee;
                    this.total_order_member = data.total_order_member;
                    this.count2=data.count;
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
            handlePageChange2(val) {
                this.current2 = val;
                this.teamrank();
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.teamrank();
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
