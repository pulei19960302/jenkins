<template>
    <div class="statistics-member">
        <div class="statistics-member-data">
            <div class="title">
                <p>粉丝增长情况</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-select v-model="increaseSelect" placeholder="请选择" style="width: 100px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="value6"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <LineChart :chartData="lineChartData" width="80%" />
        </div>

        <div class="statistics-member-origin">
            <div class="title">
                <p>粉丝端口来源</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-select v-model="increaseSelect" placeholder="请选择" style="width: 100px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="value6"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <PieChart :chartData="pieChartDataOrigin"/>
        </div>

        <div class="statistics-member-data2">
            <div class="title">
                <p>粉丝消费金额分布</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-select v-model="increaseSelect" placeholder="请选择" style="width: 100px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        v-model="value6"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <BarChart width="80%" :chartData="barChartData"/>
        </div>
    </div>
</template>

<script>
    import LineChart from '@/OMS/components/chart/LineChart';
    import PieChart from '@/OMS/components/chart/PieChart';
    import BarChart from '@/OMS/components/chart/BarChart';

    export default {
        name: "Member",
        components: {
            LineChart,
            PieChart,
            BarChart
        },
        data() {
            return {
                increaseSelect: 'month',
                options: [{
                    value: 'month',
                    label: '按月统计'
                }, {
                    value: 'year',
                    label: '按年统计'
                }],
                tableData: [
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' },
                    { name: '王小虎' }
                ],
                time: '昨天',
                value6: '',
                lineChartData: {
                    legend: ['新增粉丝数'],
                    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    series: [
                        { name: '付款金额', data: [120, 82, 91, 154, 162, 140, 145] }
                    ]
                },
                barChartData: {
                    xAxis: ['0-50元', '51-100元', '101-200元', '201-500元', '501-1000元', '1001-5000元', '5000-10000元', '10000元以上'],
                    series: {
                        name: '交易数据',
                        data: [10, 20, 30, 40, 100, 200, 100, 30]
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

        }
    }
</script>

<style scoped lang="scss">
    .statistics-member {
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


