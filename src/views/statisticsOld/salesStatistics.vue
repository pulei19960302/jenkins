<template>
    <div class="content">
        <div>
            <el-button :type="topType==2?'primary':''" @click="topType=2">商品销量统计</el-button>
            <!-- <el-button :type="topType==1?'primary':''" @click="topType=1">商品明细</el-button> -->
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
                        @change="chooseDetail(date_type1,'getData')"
                        v-model="date_type1"
                        :picker-options="pickerOptions"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="top">
                <p>商品销量总览</p>
                <div class="table-content">
                    <div class="row">
                        <div class="col">
                            <div>商品销售总额</div>
                            <div>{{stat.total_fee}}</div>
                        </div>
                        <div class="col">
                            <div>商品销售总数</div>
                            <div>{{stat.sale_num}}</div>
                        </div>
                        <div class="col">
                            <div>商品返利总额</div>
                            <div>{{stat.rebate_fee}}</div>
                        </div>
                        <div class="col">
                            <div>商品毛利总额</div>
                            <div>{{stat.profit_fee}}</div>
                        </div>
                        <div class="col">
                            <div>商品均价</div>
                            <div>{{stat.avg_fee}}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="line" v-if="date_type!=-1">
                <el-select v-model="tableValue" placeholder="数据指标"  @change="choosetype">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <LineChart :chartData="lineChartData" width="80%" />
            </div>
            <div style="display:flex">
            <div class="pie">
                <div class="col-1">
                    <div class="row-1">
                        <div class="row-title">销售额类别占比</div>
                        <div style="margin: 10px 0;display: flex">
                            <el-radio-group v-model="pie1"  @change="getPie1" style="margin-right: 10px">
                                <el-radio-button label="-1">全部</el-radio-button>
                                <!--<el-radio-button label="1">今日</el-radio-button>-->
                                <el-radio-button label="2">昨日</el-radio-button>
                            </el-radio-group>
                            <div>
                                <el-date-picker
                                    @change="chooseDetail(date_type2,'getPie1')"
                                    v-model="date_type2"
                                    :picker-options="pickerOptions"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <PieChart :chartData="pieChartData1" :height="pieHeight"/>
                </div>
            </div>
            <div class="pie">
                <div class="col-1">
                    <div class="row-1">
                        <div class="row-title">供应商占比</div>
                        <div style="margin: 10px 0;display: flex">
                            <el-radio-group v-model="pie2"  @change="getPie2" style="margin-right: 10px">
                                <el-radio-button label="-1">全部</el-radio-button>
                                <!--<el-radio-button label="1">今日</el-radio-button>-->
                                <el-radio-button label="2">昨日</el-radio-button>
                            </el-radio-group>
                            <div>
                                <el-date-picker
                                    @change="chooseDetail(date_type3,'getPie2')"
                                    v-model="date_type3"
                                    :picker-options="pickerOptions"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <PieChart :chartData="pieChartData2" :height="pieHeight"/>
                </div>
            </div>
            </div>
            <!--10名-->
            <section v-show="false">
                <div class="pie">
                    <div class="col-1">
                        <div class="row-1">
                            <div>商品销售排行</div>
                            <div style="margin: 10px 0;display: flex">
                                <el-radio-group v-model="topdata"  @change="chooseToptenDate" style="margin-right: 10px">
                                    <el-radio-button label="-1">全部</el-radio-button>
                                    <!--<el-radio-button label="1">今日</el-radio-button>-->
                                    <el-radio-button label="2">昨日</el-radio-button>
                                </el-radio-group>
                                <div>
                                    <el-date-picker
                                        @change="chooseDetail(date_type4,'getTopten')"
                                        :picker-options="pickerOptions"
                                        v-model="date_type4"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <el-table
                            element-loading-spinner="el-icon-loading"
                            :highlight-current-row="true"
                            v-loading="loading"
                            border
                            ref="multipleTable"
                            :data="topTen"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                align="center"
                                type="index"
                                label="序号"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="goods_name"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="sale_num"
                                label="销量">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </section>
            <div v-show="false">
                <div style="margin: 20px 0 10px">数据明细</div>
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
                            prop="total_fee"
                            label="商品销售总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="sale_num"
                            label="商品销售总数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="rebate_fee"
                            label="商品返利总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="profit_fee"
                            label="商品毛利总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="avg_fee"
                            label="商品均价">
                        </el-table-column>
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
                <div class="top-slot" style="padding: 10px 0">
                    商品总数 <span>{{ total_goods_num }}</span> 个，  订单总数 <span>{{ total_order_num }}</span> 笔
                </div>
                <template>
                    <el-table
                        element-loading-spinner="el-icon-loading"
                        :highlight-current-row="true"
                        v-loading="loading"
                        border
                        ref="multipleTable"
                        :data="goodList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            align="center"
                            prop="goods_id"
                            label="商品编号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="goods_name"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="status"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="supplier"
                            label="供应商">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="brand"
                            label="品牌">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="sale_num"
                            label="销售总量">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_num"
                            label="订单总数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="profit_fee"
                            label="订单商品毛利">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="total_fee"
                            label="销售总额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="cost_fee"
                            label="订单商品成本">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="rebate_fee"
                            label="商品返利金额">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="freight_fee"
                            label="运费">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="xx"
                            label="订单总计">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="xx"
                            label="订单详情">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="platform_profit_fee"
                            label="平台利润">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                            width="160">
                            <template slot-scope="scope">
                                <span class="look-word" type="info" plain size="mini" @click.stop="goodsTeamrank(scope.row.goods_id)">团队购买力排行</span>
                            </template>
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
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%"><salesStatisticsDetail :goods_id="goods_id"/></RightSidePopup>
    </div>
</template>

<script>
    // 销量统计
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';
    import LineChart from '@/OMS/components/chart/LineChart';
    import PieChart from '@/OMS/components/chart/PieChart';
    import salesStatisticsDetail from './salesStatisticsDetail';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'
    export default {
        name: "salesStatistics",
        components: {
            LineChart,PieChart,salesStatisticsDetail
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                rghtPopupVisible: false,
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
                        key: 'goods',
                        placeholder: '商品编号/名称'
                    },
                    {
                        type: 'input',
                        key: 'min_sale_num',
                        placeholder: '销量最小值'
                    },
                    {
                        type: 'input',
                        key: 'max_sale_num',
                        placeholder: '销量最大值'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '上架状态',
                        options: [
                            {label:'全部',value:-1},
                            {label:'上架',value:10},
                            {label:'预上架',value:1},
                            {label:'下架',value:0},
                        ]
                    },
                    {
                        type: 'select',
                        key: 'supplier_id',
                        placeholder: '供应商',
                        options: []
                    },
                    {
                        type: 'select',
                        key: 'brand_id',
                        placeholder: '品牌',
                        options: []
                    },
                    {
                        type: 'datetimerange',
                        key: 'start_at-end_at',
                        placeholder: '开始时间'
                    },
                ],
                tableData: [],
                columnSelect:[],
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                topType:2,
                date_type:-1,
                date_type1:'',
                date_type2:'',
                date_type3:'',
                date_type4:'',
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: [],
                    series: [
                        { name: '', data: [] },
                    ]
                },
                total_money:0,
                options: [
                    {value: 'total_fee', label: '商品消费总额'},
                    {value: 'sale_num', label: '商品销售总数'},
                    {value: 'rebate_fee', label: '商品返利总额'},
                    {value: 'profit_fee', label: '商品毛利总额'},
                    // {value: 5, label: '商品均价'},
                ],
                tableValue:'total_fee',
                pieChartData1: {
                    legend: [],
                    series: {
                        name: '占比',
                        data: []
                    }
                },
                pieChartData2: {
                    legend: [],
                    series: {
                        name: '占比',
                        data: []
                    }
                },
                pie1:-1,
                pie2:-1,
                stat:'',
                topTen:[],
                topdata:-1,
                goodList:[],
                total_goods_num:0,
                total_order_num:0,
                pieHeight:'500px',
                goods_id:0,
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
           this.getData(-1);
           this.getPie1(-1);
        //    this.getTopten(-1);
           this.getPie2(-1);
        //    this.getListData();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getListData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getListData();
                    }
                }
                todo[type]();
            },
            async getTopten(date_type,query){
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goodssalenum({
                        date_type:date_type,
                        ...query,
                    });
                    this.topTen = data.list;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            async goodsTeamrank(id){
                this.goods_id = id;
                this.rghtPopupVisible = true;
            },
            async getListData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goodslist({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.goodList = data.list;
                    this.searchOPtions[4].options=data.supplier;
                    this.searchOPtions[5].options=data.brand;
                    this.count = data.count;
                    this.total_goods_num=data.total_goods_num;
                    this.total_order_num=data.total_order_num;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            async getData(query) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goods({
                        date_type:this.date_type,
                        ...query,
                        pageSize: this.pageSize2,
                        page: this.current2,
                    });
                    this.tableData = data.excel;
                    this.count2 = data.count;
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
            //销售额类别占比stat
            async getPie1(date_type,query) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goodscate({
                        date_type:date_type,
                        ...query,
                    });
                    this.pieChartData1.legend = data.legend;
                    this.pieChartData1.series.data = data.data;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            //商品统计-供应商-
            async getPie2(date_type,query) {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goodssupplier({
                        date_type:date_type,
                        ...query,
                    });
                    this.pieChartData2.legend = data.legend;
                    this.pieChartData2.series.data = data.data;
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
                this.getListData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getListData();
            },
            handlePageChange2(val) {
                this.current2 = val;
                this.getData();
            },
            handleSizeChange2(val) {
                this.pageSize2 = val;
                this.getData();
            },
            chooseDetail(e,type){
                let start_time=this.$moment(e[0]).format('YYYY-MM-DD');
                let end_time=this.$moment(e[1]).format('YYYY-MM-DD');
                let query={
                    start_time:start_time,
                    end_time:end_time
                }
                this[type](query)
            },
            chooseToptenDate(e){
                this.getTopten(e)
            },
            choosetype(e){
                this.getData({line:e});
            }
        },
    }
</script>

<style scoped lang="scss">
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
    .pie{
        display: flex;
        .col-1{
            display: flex;
            flex: 1;
            flex-direction: column;
            .row-1{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 10px;
                align-items: center;
                .row-title{
                    margin-right:2px;
                }
            }
        }
    }
</style>
