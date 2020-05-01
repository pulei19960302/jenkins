<template>
    <div class="comprehensiveStatistics-content">
        <!--<div class="header">-->
            <!--<span style="width: 70px;">综合统计</span>-->
            <!--<div class="header-right">-->
                <!--&lt;!&ndash;<span class="s1" style="margin-right: 10px">导出数据</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="s1 s3 active">全部</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="s1" style="border-right:0;border-left: 0 ">最近30天</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="s1 s2">最近90天</span>&ndash;&gt;-->
                <!--<el-radio-group v-model="tabPosition" style="margin-right: 10px;">-->
                    <!--<el-radio-button label="1">全部</el-radio-button>-->
                    <!--<el-radio-button label="2">昨日</el-radio-button>-->
                    <!--<el-radio-button label="3">最近一周</el-radio-button>-->
                    <!--<el-radio-button label="4">最近30天</el-radio-button>-->
                    <!--<el-radio-button label="5">最近90天</el-radio-button>-->
                <!--</el-radio-group>-->
                <!--<el-date-picker-->
                    <!--v-model="value6"-->
                    <!--style="width:380px"-->
                    <!--type="daterange"-->
                    <!--range-separator="至"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
            <!--</div>-->
        <!--</div>-->

        <div class="card">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon_favorite"></use>
            </svg>
            <span class="f16">账户统计</span>
            <div class="table">
                <div class="row">
                    <span>用户总余额</span>
                    <span>¥{{dataObj.balance}}</span>
                </div>
                <div class="row">
                    <span>冻结提现金额</span>
                    <span>¥{{dataObj.freeze}}</span>
                </div>
                <div class="row">
                    <span>冻结返利金额</span>
                    <span>¥{{dataObj.reward}}</span>
                </div>
                <!--<div class="row">-->
                    <!--<span>销售总额</span>-->
                    <!--<span>¥1000000.00</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>有效订单总数</span>-->
                    <!--<span>1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>有效订单总额</span>-->
                    <!--<span>¥1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>无效订单总数(关闭或取消)</span>-->
                    <!--<span>1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>无效订单总额</span>-->
                    <!--<span>¥1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>已成交订单总数</span>-->
                    <!--<span>1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>已成交订单总额</span>-->
                    <!--<span>¥1000000</span>-->
                <!--</div>-->
            </div>
        </div>
        <!--<div class="card">-->
            <!--<svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-icon_favorite"></use>-->
            <!--</svg>-->
            <!--<span class="f16">粉丝统计</span>-->
            <!--<div class="table">-->
                <!--<div class="row">-->
                    <!--<span>粉丝总数</span>-->
                    <!--<span>1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>有订单粉丝数</span>-->
                    <!--<span>33235</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>粉丝订单总数</span>-->
                    <!--<span>90000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>粉丝购物总额</span>-->
                    <!--<span>¥1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>粉丝购买率</span>-->
                    <!--<span>80%</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>每粉丝订单数</span>-->
                    <!--<span>0.1</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>每粉丝购物额</span>-->
                    <!--<span>¥1000</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="card">-->
            <!--<svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-icon_favorite"></use>-->
            <!--</svg>-->
            <!--<span class="f16">积分统计</span>-->
            <!--<div class="table">-->
                <!--<div class="row">-->
                    <!--<span>总赠送消费积分(优币)</span>-->
                    <!--<span>1000000</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>总赠送等级积分(成长值)</span>-->
                    <!--<span>33235</span>-->
                <!--</div>-->
                <!--<div class="row">-->
                    <!--<span>操作</span>-->
                    <!--<span>-->
                        <!--<div class="themeColor" style="margin-right: 10px">查看商品</div>-->
                        <!--<div class="themeColor">查看订单</div>-->
                    <!--</span>-->
                <!--</div>-->

            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    //综合统计
    export default {
        name: "comprehensiveStatistics",
        data(){
            return{
                value6:'',
                tabPosition: '1',
                dataObj:{},
            }
        },
        created(){
            this.financeIndex();
        },
        methods: {
            async financeIndex(){
                const { data } = await this.$api.finance.financeIndex();
                this.dataObj=data;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";
    .comprehensiveStatistics-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .comprehensiveStatistics-content .header{border-bottom: 1px solid #E4E4E4;display: flex;align-items: center;padding: 10px;font-size: 12px}
    .comprehensiveStatistics-content  .header-right{display: flex;
        justify-content: flex-end;
        width: 100%;
        align-items: center;}
    .comprehensiveStatistics-content  .header-right .s1{padding: 10px 15px;border: 1px solid #E4E4E4;cursor: pointer;width: 90px;text-align: center}
    .comprehensiveStatistics-content .header-right .s2{margin-right: 10px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;}
    .header-right .s3{border-top-left-radius: 3px;border-bottom-left-radius: 3px;}
    .header-right .active{background-color: $theme;color: #fff}
    .card{margin: 20px}
    .card .icon{color: #666;font-size: 18px}
    .comprehensiveStatistics-content .f16{font-size: 16px}
    .card .table{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom:0;margin-top: 20px}
    .card .table .row{display: flex;flex-direction: row;border-bottom: 1px solid #E4E4E4 }
    .card .table .row span{display: flex;flex: 1;height: 50px;justify-content: center;align-items: center}
    .card .table .row span:first-child{border-right: 1px solid #E4E4E4}
    .themeColor{color: $theme;cursor: pointer}
</style>
