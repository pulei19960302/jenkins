<template>
    <div class="order-base">
        <el-card shadow="never">
            <div slot="header">
                <span class="card-header">基本信息</span>
            </div>
            <div class="card-context">
                <div class="box">
                    <div class="title">用户信息</div>
                    <div class="card-box">
                        <div class="infor">
                            <span class="op45">账号名称：</span>
                            <span class="op65">
                                {{ base_info.user_nickname }}
                                <a style="color: #1890ff" @click="look" v-permission="[$api.user.userManage.detail]">
                                    {{ `（用户ID：${base_info.user_id}）` }}
                                </a>
                            </span>
                        </div>

                        <div class="infor">
                            <span class="op45">支付方式：</span>
                            <span class="op65">{{ base_info.pay_type_name }}</span>
                        </div>

                        <div class="infor">
                            <span class="op45">订单来源：</span>
                            <span class="op65">{{ base_info.from_name }}</span>
                        </div>
                    </div>
                </div>

                <div class="base-box">
                    <div class="base-box-left">
                        <div class="title">
                            收货地址
                        </div>
                        <div class="box">
                            <el-row>
                                <el-col :span="7" class="op45">收货姓名：</el-col>
                                <el-col :span="17" class="op65">{{ base_info.receiver_name }}</el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="7" class="op45">收货电话：</el-col>
                                <el-col :span="17" class="op65">{{ base_info.receiver_mobile }}</el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="7" class="op45">收货地址：</el-col>
                                <el-col :span="17" class="op65">
<!--                                    四川省 成都市 武侯区-->
<!--                                    环球中心环球中心-->
                                    {{ base_info.receiver_address }}
                                </el-col>
                            </el-row>

                        </div>
                    </div>
                    <div class="base-box-right">
                        <div class="title">
                            物流信息
                        </div>
                        <div class="base-title">
                            <div class="infor">
                                <span class="op45">物流公司：</span>
                                <span class="op65">{{ base_info.logistics_name }}</span>
                            </div>
                            <div class="infor">
                                <span class="op45">快递单号：</span>
                                <span class="op65">{{ base_info.logistics_sn }}</span>
                            </div>
                        </div>
                        <div class="step-box">
                            <easy-step-component :data-source="base_info.logistics_info"/>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import EasyStepComponent from "./easyStepComponent";
    export default {
        name: "orderBase",
        components: {EasyStepComponent},
        props: {
            base_info: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            look () {
                this.$router.push({ name: 'userDetail', params: { type:'read', id: this.base_info.user_id, listType: 1 }});
            },
        }
    }
</script>

<style scoped lang="scss">
    .order-base {
        margin-bottom: 16px;

        .card-header {
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            line-height: 24px;
        }

        .card-context {
            .box {
                .title {
                    font-size: 14px;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.85);
                    line-height: 22px;
                    margin-bottom: 12px;
                }

                .card-box {
                    display: flex;
                    margin-bottom: 32px;
                    :last-child {
                        margin-right: 0 !important;
                    }

                    .infor {
                        font-size: 14px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 1);
                        line-height: 22px;
                        margin-right: 178px;

                        .op45 {
                            opacity: 0.45;
                        }

                        .op65 {
                            opacity: 0.65;
                        }
                    }
                }

            }

            .base-box {
                display: flex;

                .base-box-left {
                    width: 324px;
                    border-right: 1px solid #E8E8E8;
                    .title {
                        font-size: 14px;
                        font-weight: 500;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 22px;
                        margin-bottom: 16px;
                    }

                    .box {
                        width: 300px;
                        height: 200px;
                        border-radius: 4px;
                        padding: 35px 14px 39px 24px;
                        overflow-y: auto;
                        background:url("../../../assets/order/bg.png") no-repeat;
                        box-sizing: border-box;
                        .op45 {
                            margin-bottom: 12px;
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 1);
                            line-height: 22px;
                            opacity: 0.45;
                        }

                        .op65 {
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 1);
                            line-height: 22px;
                            opacity: 0.65;
                        }
                    }
                }

                .base-box-right {
                    padding-left: 24px;
                    .title {
                        font-size: 14px;
                        font-weight: 500;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 22px;
                        margin-bottom: 16px;

                    }
                    .base-title {
                        display: flex;
                        margin-bottom: 16px;
                        :last-child {
                            margin-right: 0 !important;
                        }
                        .infor {
                            font-size: 14px;
                            font-weight: 400;
                            color: rgba(0, 0, 0, 1);
                            line-height: 22px;
                            margin-right: 178px;

                            .op45 {
                                opacity: 0.45;
                            }

                            .op65 {
                                opacity: 0.65;
                            }
                        }
                    }
                    .step-box {
                        height: calc(200px - 38px);
                        overflow-y: auto;
                    }
                }
            }
        }
    }
</style>
