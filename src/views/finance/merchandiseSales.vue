<template>
    <div class="content br4">

        <div style="display: flex; padding: 15px 16px 0 16px">
            <el-radio-group v-model="type" @change="getData" style="margin-right: 10px">
                <el-radio-button label="-1">全部</el-radio-button>
                <el-radio-button label="1">昨日</el-radio-button>
                <el-radio-button label="2">最近一周</el-radio-button>
                <el-radio-button label="3">最近30天</el-radio-button>
            </el-radio-group>
            <div>
                <el-date-picker
                    @change="chooseDetail(date_type1)"
                    v-model="date_type1"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.finance.goodsexport"/>
        </Search>


        <div style="padding: 0 16px 10px 16px">
            <div class="summaryBar">
                <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                符合搜索条件的数据：<span class="fcorange mr24">{{ count }}</span>
                平台利润总额：<span class="fcorange">{{ platform_profit_total_fee }}</span>
            </div>
        </div>

        <div style="padding: 0 16px 16px 16px">
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
                    :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        prop="goods_id"
                        label="商品编号"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        width="150"
                        prop="goods_name"
                        label="商品名称"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="supplier"
                        label="供应商"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sale_num"
                        label="销售总量"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        prop="order_num"
                        label="订单总数"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        prop="total_fee"
                        label="销售总额"
                        show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column
                        align="right"
                        prop="total_fee"
                        label="商品成本"
                        show-overflow-tooltip>
                    </el-table-column>

<!--                    <el-table-column-->
<!--                        align="right"-->
<!--                        prop="cost_fee"-->
<!--                        label="订单商品成本"-->
<!--                        show-overflow-tooltip-->
<!--                    >-->
<!--                    </el-table-column>-->
                    <el-table-column
                        align="right"
                        prop="rebate_fee"
                        label="返利金额"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        align="right"
                        prop="freight_fee"
                        label="订单运费"
                    >
                    </el-table-column>
                    <!-- add pulei add 2020/2/28 start -->
                    <el-table-column
                        width="100"
                        align="right"
                        prop="piece_platform_profit_fee"
                        label="单个销售净利"
                        show-overflow-tooltip>
                    </el-table-column>
                    <!-- end -->
                    <el-table-column
                        align="right"
                        prop="platform_profit_fee"
                        label="平台利润"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="160">
                        <template slot-scope="scope">
                            <span class="look-word" type="info" plain size="mini"
                                  @click.stop="goodsTeamrank(scope.row.goods_id)">团队购买力排行</span>
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

        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%">
            <salesStatisticsDetail :goods_id="goods_id"/>
        </RightSidePopup>
    </div>
</template>

<script>
    // 商品销售
    import {mapState} from 'vuex';
    import {user} from '@/assets/constant';
    import LineChart from '@/OMS/components/chart/LineChart';
    import PieChart from '@/OMS/components/chart/PieChart';
    import salesStatisticsDetail from './components/salesStatisticsDetail';
    import {pickerOptions} from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "merchandiseSales",
        components: {
            LineChart, PieChart, salesStatisticsDetail
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                rghtPopupVisible: false,
                current: 1,
                pageSize: 10,
                pickerOptions,
                count: 0,
                query: {
                    type: 1,
                    start_time: '',
                    end_time: '',
                },
                firstQuery: {
                    type: 1,
                    start_time: '',
                    end_time: '',
                },
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'goods',
                        placeholder: '商品编号/名称'
                    },
                    // 暂时隐藏 2020/03/05
                    // {
                    //     type: 'input',
                    //     key: 'min_sale_num',
                    //     placeholder: '销量最小值'
                    // },
                    // {
                    //     type: 'input',
                    //     key: 'max_sale_num',
                    //     placeholder: '销量最大值'
                    // },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '上架状态',
                        options: [
                            {label: '全部', value: -1},
                            {label: '上架', value: 10},
                            {label: '预上架', value: 1},
                            {label: '下架', value: 0},
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
                    }
                ],
                tableData: [],
                columnSelect: [],
                pageOptions: [
                    // { value: 'del', label: '批量删除' }
                ],
                type: 1,
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: [],
                    series: [
                        {name: '', data: []},
                    ]
                },
                options: [
                    {value: 'total_fee', label: '商品消费总额'},
                    {value: 'sale_num', label: '商品销售总数'},
                    {value: 'rebate_fee', label: '商品返利总额'},
                    {value: 'profit_fee', label: '商品毛利总额'},
                    // {value: 5, label: '商品均价'},
                ],
                goodList: [],
                total_goods_num: 0,
                total_order_num: 0,
                platform_profit_total_fee: 0,
                goods_id: 0,
                date_type1: '',
                pickerOptions0: {
                    //限制三个月
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
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
                        // this.query = {...query};
                        this.query = Object.assign({...this.query}, query);
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        // this.query = {};
                        this.query = {...this.firstQuery};
                        this.date_type1 = '';
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            async goodsTeamrank(id) {
                this.goods_id = id;
                this.rghtPopupVisible = true;
            },
            async getData() {
                try {
                    this.loading = true;
                    this.query.type = this.type;
                    this.firstQuery.type == this.type;
                    const {data} = await this.$api.finance.goodsList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        type: this.type,
                    });
                    this.goodList = data.list;
                    this.searchOPtions[2].options = data.supplier;
                    this.searchOPtions[3].options = data.brand;
                    this.count = data.count;
                    this.total_goods_num = data.total_goods_num;
                    this.total_order_num = data.total_order_num;
                    this.platform_profit_total_fee = data.platform_profit_total_fee;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    console.log(e)
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
            chooseDetail(e) {
                let query = {
                    start_time: e[0],
                    end_time: e[1]
                }
                this.query = {...query}
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


    .content {
        background: #fff;
        height: 100%;
        min-height: calc(100vh - 130px);


        .row {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin: 10px auto;
            border: solid 1px #d2cfcf;

            .col {
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                align-items: center;
                border-right: solid 1px #d2cfcf;

                div {
                    height: 30px;
                    display: flex;
                    align-items: center;
                }

            }
        }
    }

    .row .col:last-child {
        border-right: 0
    }

    .row .col div:first-child {
        font-size: 12px;
        color: #999
    }

    .row .col div:last-child {
        font-size: 20px
    }


    .table-content {
        margin: 10px auto;
        border-bottom: solid 1px #d2cfcf;

        .row {
            margin: 0;
            border-bottom: 0;
        }
    }

    .pie {
        display: flex;

        .col-1 {
            display: flex;
            flex: 1;
            flex-direction: column;

            .row-1 {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 0;
                align-items: center;
            }
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
