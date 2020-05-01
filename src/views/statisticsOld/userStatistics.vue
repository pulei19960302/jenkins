<template>
    <div class="content">
        <div>
            <el-button :type="topType==2?'primary':''" @click="topType=2">用户统计</el-button>
            <el-button :type="topType==1?'primary':''" @click="topType=1">招募总榜</el-button>
        </div>
        <section v-show="topType==2">
            <div style="margin: 10px 0;display: flex">
                <el-radio-group v-model="date_type"  @change="getData" style="margin-right: 10px">
                    <el-radio-button label="-1">全部</el-radio-button>
                    <el-radio-button label="1">今日</el-radio-button>
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
                            <div>用户总数</div>
                            <div>{{stat.total_person_num}}</div>
                        </div>
                        <div class="col">
                            <div>新增用户</div>
                            <div>{{stat.normal_num}}</div>
                        </div>
                        <div class="col">
                            <div>新增白银</div>
                            <div>{{stat.store_num}}</div>
                        </div>
                        <div class="col">
                            <div>活跃白银人数</div>
                            <div>{{stat.active_store_num}}</div>
                        </div>
                        <div class="col">
                            <div>总活跃人数</div>
                            <div>{{stat.active_num}}</div>
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
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            align="center"
                            prop="date_time"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="normal_num"
                            label="新增普通用户">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="store_num"
                            label="新增白银">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="active_store_num"
                            label="活跃白银人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="active_num"
                            label="总活跃人数">
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
                <div class="table-pandect table-pandect-hidden">
                    用户总数 <span>{{ totalcount }}</span> 个
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
                        @sort-change="sortChange"
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
                            prop="member_type_name"
                            label="用户角色">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable="first_num"
                            prop="first_num"
                            label="一级数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable="second_num"
                            prop="second_num"
                            label="二级数">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="recharge_fee"-->
                            <!--label="充值金额">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="withdraw_fee"-->
                            <!--label="提现金额">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="total_num"-->
                        <!--label="订单总数">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="total_num"-->
                            <!--label="有效订单数">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="valid_fee"-->
                            <!--label="有效订单金额">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="diff_fee"-->
                            <!--label="商品利润">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="team_fee"-->
                            <!--label="钻石返利">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="zhan_fee"-->
                            <!--label="战略合伙人返利">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="tian_fee"-->
                            <!--label="黄金返利">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="first_fee"-->
                            <!--label="一级返利">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="second_fee"-->
                            <!--label="二级返利">-->
                        <!--</el-table-column>-->
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
    // 用户统计
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    import LineChart from '@/OMS/components/chart/LineChart';

    export default {
        name: "userStatistics",
        components: {
            LineChart
        },
        data() {
            return {
                exportOptions: [],
                pickerOptions,
                loading: false,
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
                        placeholder: '用户ID/昵称'
                    },
                    // {
                    //     type: 'dateRangePicker',
                    //     key: 'start_time-end_time',
                    //     placeholder: '开始时间'
                    // },
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
                    {value: 'normal_num', label: '新增普通用户'},
                    {value: 'store_num', label: '新增白银'},
                    {value: 'active_num', label: '活跃人数'},
                ],
                tableValue:'normal_num',
                stat:'',
                totalcount:0,
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
            sortChange({ prop, order }) {
                if(order === 'ascending' || !order) {
                    this.query.sort = prop+' desc';
                } else {
                    this.query.sort = `${prop}`+' asc';
                }
                this.getDetail();
            },
            async getData(detail) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.member({
                        ...this.query,
                        ...detail,
                        date_type:this.date_type,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.excel;
                    this.count = data.count;
                    this.stat= data.stat;
                    this.lineChartData.xAxis=data.line.x;
                    this.lineChartData.series[0].data=data.line.y;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            async getDetail(){
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.memberrank({
                        ...this.query,
                        pageSize: this.pageSize2,
                        page: this.current2,
                    });
                    this.tableData2 = data.list;
                    this.totalcount= data.count;
                    this.count2= data.count;
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
                this.getDetail()
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getDetail()
            },
            chooseDate(e){
                //选择日期
                this.getData(e);
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
