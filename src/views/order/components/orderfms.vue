<template>
    <div class="order-fms">
        <el-card shadow="never">
            <div slot="header">
                <span class="card-header">{{title}}</span>
            </div>
            <div class="card-context">
                <el-row>
                    <el-col :span="8" v-for="(item, index) in finance_info" :key="index">
                        <div class="info">
                            <span class="label">{{item.text}}：</span>
                            <span class="value">¥{{item.commission}}（{{item.to_user}}）</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "orderFMS",
        props: {
            finance_info: {
                type: Array,
                default: () => []
            },
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .order-fms {
        margin-bottom: 16px;
        .card-header {
            font-size:16px;
            font-weight:500;
            color:rgba(0,0,0,0.85);
            line-height:24px;
        }
        .card-context {
            .info {
                font-size:14px;
                font-weight:400;
                margin-bottom: 16px;
                .label {
                    color:rgba(148,148,148,1);
                }
                .value {
                    color:rgba(0,0,0,0.65);
                }
            }
        }
        .mr0 {
            margin-bottom: 0 !important;
        }
    }
</style>
