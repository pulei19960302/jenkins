<template>
    <div class="content">
        <div class="top">
            <p>用户活跃数据统计</p>
            <div class="row">
                <div class="col">
                    <div>今日活跃数</div>
                    <div>2</div>
                </div>
                <div class="col">
                    <div>昨日活跃数</div>
                    <div>2</div>
                </div>
                <div class="col">
                    <div>近一周累计数</div>
                    <div>2</div>
                </div>
                <div class="col">
                    <div>近30日累计数</div>
                    <div>2</div>
                </div>
            </div>
        </div>
        <div class="line">
            <LineChart :chartData="lineChartData" width="80%" />
        </div>
    </div>
</template>

<script>
    import LineChart from '@/OMS/components/chart/LineChart';
    //活跃统计
    export default {
        name: "active",
        components: {
            LineChart
        },
        data() {
            return {
                lineChartData: {
                    legend: ['近一周订单统计'],
                    xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    series: [
                        { name: '人数', data: [120, 82, 91, 154, 162, 140, 145] },
                    ]
                },
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";
    .content{
        background: #fff;
        padding: 20px;
        .top{
            p{
                font-size: 20px;
                color:$theme;
                text-align: center;
                padding: 10px;
            }
        }
        .row{
            display: flex;
            flex-direction: row;
            width: 80%;
            margin: 0 auto;
            background-color:#F8F7F7;
            color: #B5B4B4;
            border: solid 1px #d2cfcf;
            .col{
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
</style>
