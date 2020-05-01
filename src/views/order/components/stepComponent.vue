<template>
    <div class="step-component">
        <div class="step-box">
            <el-row>
                <el-col :span="8">
                    <div class="step-btn">
                        <div class="btn">
                            <div>
                                <img src="../../../assets/order/1.png" width="40" alt="">
                            </div>
                            <div class="title" :style="{'opacity': orderStatus >= 0 ? '0.65' : '0.25' }">
                                提交订单
                            </div>
                            <div class="time" v-if="orderStatus >= 0">
                                {{ created_at }}
                            </div>
                        </div>
                        <div class="line">
                            <div v-for="item in roundNum" :key="item"
                                 :class="[
                                     calculationClass(item, 0)
                                ]"
                            ></div>
                        </div>

                        <div class="status-text" v-if="orderStatus === 0 && !isClose">
                            待付款
                        </div>

                        <div class="status-text" style="color: red" v-if="isClose && closeNode === 0">已关闭</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="step-btn">
                        <div class="btn">
                            <div>
                                <img src="../../../assets/order/2-on.png" width="40" alt="" v-if="orderStatus >= 1">
                                <img src="../../../assets/order/2-off.png" width="40" alt="" v-else>
                            </div>

                            <div class="title" :style="{'opacity': orderStatus >= 1 ? '0.65' : '0.25' }">
                                付款成功
                            </div>
                            <div class="time" v-if="orderStatus >= 1">
                                {{ pay_time }}
                            </div>
                        </div>
                        <div class="line">
                            <div v-for="item in roundNum" :key="item"
                                 :class="[
                                    calculationClass(item, 1)
                                 ]"
                            ></div>
                        </div>

                        <div class="status-text" v-if="orderStatus === 1 && !isClose">
                            待发货
                        </div>

                        <div class="status-text" style="color: red" v-if="isClose && closeNode === 1">已关闭</div>

                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="step-btn">
                        <div class="btn">
                            <div>
                                <img src="../../../assets/order/3-on.png" alt="" width="40" v-if="orderStatus >= 2">
                                <img src="../../../assets/order/3-off.png" width="40" alt="" v-else>

                            </div>
                            <div class="title" :style="{'opacity': orderStatus >= 2 ? '0.65' : '0.25' }">
                                订单发货
                            </div>
                            <div class="time" v-if="orderStatus >= 2">
                                {{ send_time }}
                            </div>
                        </div>

                        <div class="line">
                            <div v-for="item in roundNum" :key="item"
                                 :class="[
                                     calculationClass(item, 2)
                                 ]"
                            ></div>
                        </div>

                        <div class="status-text" v-if="orderStatus === 2 && !isClose">
                            已发货
                        </div>

                        <div class="status-text" style="color: red" v-if="isClose && closeNode === 2">已关闭</div>

                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="btn rightBtn">
            <div>
                <img src="../../../assets/order/4-on.png" alt="" width="40" v-if="orderStatus >= 3">
                <img src="../../../assets/order/4-off.png" alt="" width="40" v-else>
            </div>
            <div class="title" :style="{'opacity': orderStatus >= 3 ? '0.65' : '0.25' }">
                订单完成
            </div>
            <div class="time" v-if="orderStatus >= 3">
                {{ finish_time }}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "stepComponent",
        props: {
            orderStatus: {
                type: Number,
                default: 0
            },
            // 创建时间
            created_at: {
                type: String,
                default: ''
            },
            // 支付时间
            pay_time: {
                type: String,
                default: ''
            },

            // 发货时间
            send_time: {
                type: String,
                default: ''
            },

            // 完成时间
            finish_time: {
                type: String,
                default: ''
            },
            roundNum: {
                type: Number,
                default: 11 // 奇数好看点呀，字也能对齐。。。
            },
            isClose: {
                type: Boolean,
                default: false
            },

            closeNode: {
                type: Number,
                default: -1
            }
        },
        computed: {
            // 定义中间点的计算方式。偶数不会太好看。奇数好看点。
            roundMid() {
                return this.roundNum % 2 === 0 ? this.roundNum >> 1 : (this.roundNum >> 1) + 1;
            }
        },
        methods: {
            calculationClass (item, value) {
                // 当前状态的中间点变大
                let isBigClass = item === this.roundMid && this.orderStatus === value ? 'big' : '';


                // 定义当前状态前边点的颜色
                let isSuccessClass = (this.orderStatus > value && !this.isClose)  ?  'success' : (this.orderStatus === value && this.roundMid >= item ? 'success': 'error');

                // 关闭点状态
                let isCloseNodeClass = this.closeNode === value ? (this.isClose && this.roundMid >= item ? 'close' : 'error') : 'success';

                // 关闭点
                let isCloseClass = this.closeNode > value && this.isClose ? 'close' : '';

                let classArr = [isBigClass, isSuccessClass, isCloseNodeClass, isCloseClass ];

                return Array.from(new Set(classArr)).filter(Boolean);

            }
        }
    }
</script>

<style scoped lang="scss">
    .step-component {
        width: 100%;
        display: flex;
        position: relative;

        .step-box {
            flex: 1;
            padding-right: 79px;

            .step-btn {
                display: flex;
                position: relative;

                .btn {
                    height: 120px;
                    width: 79px;
                    min-width: 79px;
                    text-align: center;
                    margin: auto;

                    .title {
                        margin-top: 12px;
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 1);
                        line-height: 22px;
                    }

                    .time {
                        margin-top: 9px;
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(148, 148, 148, 1);
                        line-height: 22px;
                    }
                }

                .line {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    margin-top: 17px;

                    > div {
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                    }

                    .big {
                        width: 8px;
                        height: 8px;
                        margin-top: -2px;
                    }
                }


                .status-text {
                    position: absolute;
                    top: -28px;
                    left: calc(50% + 17px);
                    color: rgba(24, 144, 255, 1);
                }
            }
        }

        .rightBtn {
            position: absolute;
            right: 0;
            height: 120px;
            width: 79px;
            min-width: 79px;
            text-align: center;
            margin: auto;

            .title {
                margin-top: 12px;
                font-size: 16px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                line-height: 22px;
            }

            .time {
                margin-top: 9px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(148, 148, 148, 1);
                line-height: 22px;
            }
        }

        // 定义此流程已经经过和没经过的的颜色
        .success {
            background: #1890FF;
        }

        .error {
            background: #D8D8D8;
        }

        .close {
            background: #F5222D;
        }
    }
</style>
