<template>
    <div class="statistics-trade">
        <div class="statistics-trade-data">
            <div class="title">
                <p>交易数据</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="昨天"></el-radio-button>
                        <el-radio-button label="最近7天"></el-radio-button>
                        <el-radio-button label="最近30天"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="flex">
                <LineChart :chartData="lineChartData" width="50%" />
                <div style="width: 50%;">
                    <el-table
                        border
                        :data="tableDataUserLine1">
                        <el-table-column
                            align="center"
                            prop="name"
                            label="浏览人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="订单数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单件数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="有效订单数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单金额">
                        </el-table-column>
                    </el-table>
                    <el-table
                        border
                        :data="tableDataUserLine2">
                        <el-table-column
                            align="center"
                            prop="name"
                            label="浏览人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单人数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="订单数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单件数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="有效订单数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="下单金额">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="statistics-trade-user">
            <div class="title">
                <p>新老客户交易构成</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="本月"></el-radio-button>
                        <el-radio-button label="上月"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        :picker-options="pickerOptions"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="flex">
                <PieChart :chartData="pieChartDataUser" width="50%"/>
                <el-table
                    border
                    :data="tableDataUser">
                    <el-table-column
                        width="200"
                        align="center"
                        type="index"
                        :index="indexMethodUser">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="付款金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="较前一月">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="付款人数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="较前一月">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="statistics-trade-data2">
            <div class="title">
                <p>交易数据</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="昨天"></el-radio-button>
                        <el-radio-button label="最近7天"></el-radio-button>
                        <el-radio-button label="最近30天"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <BarChart width="80%" :chartData="barChartData"/>
        </div>
        <div class="statistics-trade-origin">
            <div class="title">
                <p>订单来源构成</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="本月"></el-radio-button>
                        <el-radio-button label="上月"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <PieChart :chartData="pieChartDataOrigin"/>
            <el-table
                border
                :data="tableData"
                style="width: 80%;margin: 0 auto;">
                <el-table-column
                    width="200"
                    align="center"
                    type="index"
                    :index="indexMethod">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="付款金额">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="较前一月">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="付款人数">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="较前一月">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/OMS/components/chart/LineChart';
    import PieChart from '@/OMS/components/chart/PieChart';
    import BarChart from '@/OMS/components/chart/BarChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "Trade",
        components: {
            LineChart,
            PieChart,
            BarChart
        },
        data() {
            return {
                tableData: [
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' }
                ],
                pickerOptions,
                tableDataUser: [
                    { name: '王小虎' },
                    { name: '王小虎' }
                ],
                tableDataUserLine1: [
                    { name: 1000 },
                ],
                tableDataUserLine2: [
                    { name: 2000 },
                ],
                time: '昨天',
                value6: '',
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    series: [
                        { name: '付款金额', data: [120, 82, 91, 154, 162, 140, 145] },
                        { name: '退款金额', data: [10, 82, 91, 54, 62, 40, 145] }
                    ]
                },
                barChartData: {
                    xAxis: ['0-50元', '51-100元', '101-200元', '201-500元', '501-1000元', '1001-5000元', '5000-10000元', '10000元以上'],
                    series: {
                        name: '交易数据',
                        data: [10, 20, 30, 40, 100, 200, 100, 30]
                    }
                },
                pieChartDataUser: {
                    legend: ['老客户', '新客户'],
                    series: {
                        name: '占比',
                        data: [
                            {value: 20, name: '老客户'},
                            {value: 140, name: '新客户'}
                        ]
                    }
                },
                pieChartDataOrigin: {
                    legend: ['app', '微信端', 'pc端', '小程序', '其他'],
                    series: {
                        name: '占比',
                        data: [
                            {value: 20, name: 'app'},
                            {value: 140, name: '微信端'},
                            {value: 400, name: 'pc端'},
                            {value: 240, name: '小程序'},
                            {value: 100, name: '其他'},
                        ]
                    }
                }
            }
        },
        methods: {
            indexMethod(index) {
                switch (index) {
                    case 0:
                        return 'app';
                    case 1:
                        return '微信端';
                    case 2:
                        return 'pc端';
                    case 3:
                        return '小程序';
                    case 4:
                        return '其他';
                }
            },
            indexMethodUser(index) {
                switch (index) {
                    case 0:
                        return '新客户';
                    case 1:
                        return '老客户';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .statistics-trade {
        >div {
            background: #fff;
        }
        .flex {
            display: flex;
            justify-content: space-around;
            align-items: center
        }
        .title {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fff;
            padding: 0 20px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
