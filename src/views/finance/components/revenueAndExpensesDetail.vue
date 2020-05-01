<template>
    <div class="revenueAndExpensesDetail">
        <div class="statisticalPattern">
            <p>请选择统计方式：</p>
            <el-select v-model="increaseSelect" placeholder="请选择" style="width: 120px;margin-right: 10px;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                style="width: 180px;"
                v-model="date"
                :type="increaseSelect"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <el-row style="display: flex;justify-content: space-between">
            <el-col :span="12" class="system">
                <p class="title"><b>系统资金</b> {{ currDate }}</p>
                <PieChart :chartData="pieChartDataSystem" />
            </el-col>
            <el-col :span="12" class="bank">
                <p class="title"><b>银行资金</b> {{ currDate }}</p>
                <PieChart :chartData="pieChartDataBank" />
            </el-col>
        </el-row>
        <el-row class="mt20">
            <mul-table :data="seriesDataSystem" table-name="系统资金明细" :row-fields="10" />
            <mul-table :data="seriesDataBank" table-name="银行资金明细" :row-fields="10" />
        </el-row>
    </div>
</template>

<script>
    import { common } from '@/OMS/mixins';
    import PieChart from '@/OMS/components/chart/PieChart';
    import MulTable from '@/OMS/components/MulTable/MulTable';
    

    export default {
        name: 'revenueAndExpensesDetail',
        props: {},
        components: { PieChart, MulTable },
        mixins: [common],
        data() {
            const { id } = this.$route.params;
            return {
                id,
                increaseSelect: 'date',
                options: [{
                    value: 'date',
                    label: '按天统计'
                },{
                    value: 'month',
                    label: '按月统计'
                }, {
                    value: 'year',
                    label: '按年统计'
                }],
                date: '',
                pieChartDataSystem: {
                    legend: ['用户余额', '供应商货款', '平台利润', '返利资金', '用户充值', '下单消费', '用户提现'],
                    series: {
                        name: '占比',
                        data: [
                            { value: 20, name: '用户余额' },
                            { value: 140, name: '供应商货款' },
                            { value: 140, name: '平台利润' },
                            { value: 140, name: '返利资金' },
                            { value: 140, name: '用户充值' },
                            { value: 140, name: '下单消费' },
                            { value: 140, name: '用户提现' },
                        ]
                    }
                },
                pieChartDataBank: {
                    legend: ['平台余额', '平台利润', '供应商货款', '用户充值', '下单消费', '用户提现', '平台提现', '平台充值'],
                    series: {
                        name: '占比',
                        data: [
                            { value: 20, name: '平台余额' },
                            { value: 140, name: '平台利润' },
                            { value: 140, name: '供应商货款' },
                            { value: 140, name: '用户充值' },
                            { value: 140, name: '下单消费' },
                            { value: 140, name: '用户提现' },
                            { value: 140, name: '平台提现' },
                            { value: 140, name: '平台充值' },
                        ]
                    }
                },
            }
        },
        computed: {
            currDate() {
                const date = this.$moment(this.date || + new Date());
                switch (this.increaseSelect) {
                    case 'date': return date.format('YYYY年MM月DD日');
                    case 'month': return date.format('YYYY年MM月');
                    case 'year': return date.format('YYYY年');
                }
            },
            seriesDataSystem() {
                return this.pieChartDataSystem.series.data;
            },
            seriesDataBank() {
                return this.pieChartDataBank.series.data;
            }
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";
    $titleBg:  #f8f9fb;
    .revenueAndExpensesDetail {
        background: #fff;
        padding: 10px;
        .statisticalPattern {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .system, .bank {
            width: 45%;
            border: 1px solid $border;
        }
        .bank {
            &-content {
                padding: 10px;
            }
        }
        .title {
            padding: 10px;
            border-bottom: 1px solid $border;
            font-size: 12px;
            color: #333;
            background: $titleBg;
            b {
                color: #000;
                font-size: 14px;
                margin-right: 4px;
            }
        }
    }
</style>
