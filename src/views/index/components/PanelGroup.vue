<template>
    <el-row :gutter="60" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-name="order" class="card-panel-icon"></svg-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">今日订单总数</div>
                    <count-to :start-val="0" :end-val="firstData.todayOrderNum" :duration="2000" class="card-panel-num"/>
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('messages')">
                <div class="card-panel-icon-wrapper icon-message">
                    <svg-icon icon-name="cir-cny" class="card-panel-icon"></svg-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">今日销售总额</div>
                    ￥<count-to :start-val="0" :end-val="firstData.todayOrderFee" :duration="2000" class="card-panel-num"/>
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('purchases')">
                <div class="card-panel-icon-wrapper icon-money">
                    <svg-icon icon-name="jifen-xianxing" class="card-panel-icon"></svg-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">昨日销售总额</div>
                    ￥<count-to :start-val="0" :end-val="firstData.yesTodayOrderFee" :duration="2000" class="card-panel-num"/>
                </div>
            </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('shoppings')">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg-icon icon-name="zengchang" class="card-panel-icon"></svg-icon>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">近7天销售总额</div>
                    ￥<count-to :start-val="0" :end-val="firstData.sevenDayOrderFee" :duration="2000" class="card-panel-num"/>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import CountTo from 'vue-count-to';

    export default {
        name: 'PanelGroup',
        props: {
            firstData: {
                type: Object,
                default: () => {}
            }
        },
        components: {
            CountTo
        },
        watch: {
            'firstData'(val){}
        },
        methods: {
            handleSetLineChartData(type) {
                // this.$emit('handleSetLineChartData', type)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .panel-group {
        margin-top: 10px;
        .card-panel-col {
            margin-bottom: 20px;
        }
        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            background: #fff;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, .1);
            border-color: rgba(0, 0, 0, .1);
            border-radius: 8px;
            .card-panel-icon-wrapper {
                color: #fff;
            }
            .icon-people {
                background: #40c9c6;
            }
            .icon-message {
                background: #36a3f7;
            }
            .icon-money {
                background: #f4516c;
            }
            .icon-shopping {
                background: #34bfa3
            }
            &:hover {
                .icon-people, .icon-message, .icon-money, .icon-shopping {
                    color: #666;
                    background: #fff;
                }
                box-shadow: 4px 4px 40px rgba(0, 0, 0, .2);
                border-color: rgba(0, 0, 0, .2);
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>
