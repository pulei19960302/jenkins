<template>
    <div class="content">
        <div class="top">
            <p>今日数据总览</p>
            <!--<div class="table-content">-->
                <!--<div class="row">-->
                    <!--<div class="col">-->
                        <!--<div>正在咨询客户数</div>-->
                        <!--<div>{{stat.total_person_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>正在排队客户数</div>-->
                        <!--<div>{{stat.normal_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日会话总量</div>-->
                        <!--<div>{{stat.store_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日未接入会话量</div>-->
                        <!--<div>{{stat.store_num}}</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<div class="col">-->
                        <!--<div>当前在线客服数</div>-->
                        <!--<div>{{stat.total_person_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日平均排队时长</div>-->
                        <!--<div>{{stat.normal_num}}<span class="f14">秒</span></div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日平均会话时长</div>-->
                        <!--<div>{{stat.store_num}}<span class="f14">分钟</span></div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>接入率</div>-->
                        <!--<div>{{stat.store_num}}<span class="f14">%</span></div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<div class="col">-->
                        <!--<div>预计接入时间</div>-->
                        <!--<div>{{stat.active_num}}<span class="f14">分</span></div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日排队总数</div>-->
                        <!--<div>{{stat.normal_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>今日平均客服会话量</div>-->
                        <!--<div>{{stat.active_num}}</div>-->
                    <!--</div>-->
                    <!--<div class="col">-->
                        <!--<div>平均排队时间</div>-->
                        <!--<div>{{stat.active_num}}<span class="f14">分钟</span></div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="card-row">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>正在咨询客户数</span><br>
                    <div class="text-number">999</div>
                </div>
                <div class="text item">正在咨询客户数 999</div>
                <div class="text item">预计接入时间 999</div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>正在排队客户数</span>
                    <div class="text-number">999</div>
                </div>
                <div class="text item">今日平均排队时长 999</div>
                <div class="text item">今日排队总数 999</div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>今日会话总量</span>
                    <div class="text-number">999</div>
                </div>
                <div class="text item">今日平均会话时长 999</div>
                <div class="text item">今日平均客服会话量 999</div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>今日未接入会话量</span>
                    <div class="text-number">999</div>
                </div>
                <div class="text item">接入率 99%</div>
                <div class="text item">平均排队时间 999</div>
            </el-card>
        </div>


        <p>客户咨询趋势</p>
        <LineChart :chartData="lineChartData" width="80%" />
    </div>
</template>

<script>
    // 数据面板
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';

    import LineChart from '@/OMS/components/chart/LineChart';

    export default {
        name: "dataStatistics",
        components: {
            LineChart
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '用户ID/昵称'
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
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData2 = data.list;
                    this.totalcount= data.count;
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
    .f14{font-size: 14px}

    .card-row{
        display: flex;
        flex-direction: row;
        margin: 20px 0;
        .el-card{
            display: flex;
            flex: 1;
            flex-direction: column;
            margin-right: 20px;
            justify-content: center;
            text-align: center;
        }
        .text-number{
            font-size: 20px;
            margin-top: 10px;
            color: #5AB6DF;
        }
        .el-card__body{
            background-color: #F4F5F7!important;
        }
    }
    .box-card .item{
        margin-top: 10px;
    }
    .card-row .el-card:last-child{margin-right: 0}
</style>
