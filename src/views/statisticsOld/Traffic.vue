<template>
    <div class="statistics-trade">
        <div class="statistics-trade-data">
            <div class="title">
                <p>页面流量</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="最近7天"></el-radio-button>
                        <el-radio-button label="最近30天"></el-radio-button>
                        <el-radio-button label="最近90天"></el-radio-button>
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
            <LineChart :chartData="lineChartData" width="80%" />
        </div>

        <div class="statistics-trade-origin">
            <div class="title">
                <p>各个端口浏览占比</p>
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
            <PieChart :chartData="pieChartData"/>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/OMS/components/chart/LineChart';
    import PieChart from '@/OMS/components/chart/PieChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "Traffic",
        components: {
            LineChart,
            PieChart
        },
        data() {
            return {
                time: '最近7天',
                value6: '',
                pickerOptions,
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    series: [
                        { name: '付款金额', data: [120, 82, 91, 154, 162, 140, 145] },
                        { name: '退款金额', data: [10, 82, 91, 54, 62, 40, 145] }
                    ]
                },
                pieChartData: {
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

        }
    }
</script>

<style scoped lang="scss">
    .statistics-trade {
        >div {
            background: #fff;
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
