<template>
    <div class="order-status">
        <el-card>
            <div slot="header">
                <span class="card-header">订单状态</span>
            </div>
            <div class="card-context">
                <div class="card-context-box">
                    <div class="card-box-left">
                        <div class="card-box-left-box">
                            <div class="order-number">
                                订单号：{{ status_info.order_sn }}
                            </div>
                            <div class="order-base-status">
                                {{ status_info.status_name }}
                            </div>
                            <div v-if="!isShowBtn">
                                <div class="btn" v-if="orderStatus === 2">
                                    <el-button type="primary" plain @click="modify(false)">修改物流</el-button>
                                </div>

                                <div class="btn" v-if="orderStatus === 1">
                                    <el-button plain @click="modify(true)">填写物流</el-button>
                                </div>

                                <div class="btn" v-if="orderStatus === 1 || orderStatus === 2">
                                    <el-button plain @click="editAddress">修改地址</el-button>
                                </div>

                                <div class="btn">
                                    <el-button @click="remark" v-if="orderStatus === 3 || orderStatus === 0">备注订单</el-button>
                                </div>
                                <div class="btn">
                                    <el-button @click="close" v-if="orderStatus === 0">关闭订单</el-button>
                                </div>

                                <div class="line">
                                    <div class="line-btn" @click="remark" v-if="orderStatus === 1 || orderStatus === 2">
                                        <i class="el-icon-edit-outline"/>
                                        备注订单
                                    </div>
                                    <div class="line-btn" @click="close" v-if="orderStatus === 1 || orderStatus === 2">
                                        <i class="el-icon-remove-outline"/>
                                        关闭订单
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="card-box-right">
                        <el-row>
                            <el-col :span="24">
                                <step-component
                                    :is-close="isCloseOrder"
                                    :order-status="orderStatus"
                                    :created_at="status_info.created_at"
                                    :finish_time="status_info.finish_time"
                                    :pay_time="status_info.pay_time"
                                    :send_time="status_info.send_time"
                                    :close-node="closeNode"
                                />
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { INSTANCE } from '../constant'
    import StepComponent from "./stepComponent";
    import ModifyLogisticsDialog from "./modifyLogisticsDialog";
    export default {
        name: "orderStatus",
        components: {ModifyLogisticsDialog, StepComponent},
        props: {
            operation: {
                type: Function,
                default: () => {}
            },
            status_info: {
                type: Object,
                default: () => {}
            }
        },
        data () {
            return {
                orderStatus: 1,
                isCloseOrder: false,
                closeNode: -1,
                isShowBtn: false
            }
        },
        methods: {
            modify(type) {
                this.$emit('operation', {key: INSTANCE.MODIFY, value: true, type})
            },
            remark () {
                this.$emit('operation', {key: INSTANCE.REMARK, value: true})
            },
            editAddress () {
                this.$emit('operation', {key: INSTANCE.EDIT, value: true})
            },
            close () {
                this.$emit('operation', {key: INSTANCE.CLOSE, value: true})
            },

            /**
             *
             * @param val
             * @description 前端这边  0 - 待付款  1 - 代发货  2-已发货 3 - 已完成, 7-已关闭
             *
             */
            mapOrderStatus(val) {
                switch (Number(val.status)) {
                    case 1:
                        this.orderStatus = 0;
                        break;
                    case 2:
                        this.orderStatus = 1;
                        break;
                    case 3:
                        this.orderStatus = 2;
                        break;
                    case 5:
                        this.orderStatus = 3;
                        break;
                    case 7:
                        this.isCloseOrder = true;
                        this.isShowBtn = true;
                        if (val.created_at && !val.pay_time) {
                            this.orderStatus = 0;
                            this.closeNode = 0;
                        }
                        if (val.pay_time && !val.send_time) {
                            this.orderStatus = 1;
                            this.closeNode = 1;
                        }
                        if (val.send_time && !val.finish_time) {
                            this.orderStatus = 2;
                            this.closeNode = 2;
                        }
                        break;
                }
            }
        },
        watch: {
            'status_info'(val) {
                if (val && val.status) {
                  this.mapOrderStatus(val)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .order-status {
        margin-bottom: 16px;

        /deep/ .el-card.is-always-shadow {
            box-shadow: none !important;
        }
        .card-header {
            font-size:16px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:24px;
        }

        .card-context {
            .card-context-box {
                display: flex;
                padding: 20px 0;
                .card-box-left {
                    width: 320px;
                    text-align: center;
                    border-right: 1px solid #E8E8E8;
                    .card-box-left-box {
                        .order-number {
                            margin-bottom: 16px;
                            font-size:16px;
                            font-weight:400;
                            color:rgba(0,0,0,1);
                            line-height:24px;
                        }
                        .order-base-status {
                            margin-bottom: 16px;
                            font-size:20px;
                            font-weight:600;
                            color:rgba(24,144,255,1);
                            line-height:22px;
                        }
                        .btn {
                            margin-bottom: 10px;
                        }
                        .line {
                            margin-top: 21px;
                            display: flex;
                            justify-content: space-around;
                            font-size:14px;
                            font-weight:400;
                            color:rgba(96,98,102,1);
                            line-height:20px;
                            cursor: pointer;
                        }
                    }
                }
                .card-box-right {
                    flex: 1;
                    padding: 0 76px;
                    margin: auto 0;
                }
            }

        }
    }
</style>
