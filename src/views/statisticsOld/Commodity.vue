<template>
    <div class="statistics-commodity">
        <div class="statistics-commodity-origin mb20">
            <div class="title">
                <p>订单来源构成</p>
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
            <div style="display: flex">
                <PieChart :chartData="pieChartDataLeft"/>
                <PieChart :chartData="pieChartDataRight"/>
            </div>
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
        <div class="statistics-commodity-details mb20">
            <div class="title">
                <p>商品销售情况</p>
                <div>
                    <el-button type="primary">导出数据</el-button>
                    <el-radio-group v-model="time">
                        <el-radio-button label="最近7天"></el-radio-button>
                        <el-radio-button label="最近30天"></el-radio-button>
                        <el-radio-button label="最近90天"></el-radio-button>
                    </el-radio-group>
                    <el-date-picker
                        v-model="value6"
                        :picker-options="pickerOptions"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
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
    import PieChart from '@/OMS/components/chart/PieChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "Commodity",
        components: {
            PieChart
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
                time: '最近7天',
                value6: '',
                pieChartDataLeft: {
                    legend: ['老客户', '新客户'],
                    series: {
                        name: '占比',
                        data: [
                            {value: 20, name: '老客户'},
                            {value: 140, name: '新客户'}
                        ]
                    }
                },
                pieChartDataRight: {
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
                    case 0: return 'app';
                    case 1: return '微信端';
                    case 2: return 'pc端';
                    case 3: return '小程序';
                    case 4: return '其他';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .statistics-commodity {
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
