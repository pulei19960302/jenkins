<template>
    <div class="order-after">
        <el-card shadow="never">
            <div slot="header">
                <span class="card-header">售后记录</span>
            </div>
           <div class="table-content">
                <div class="table-row">
                    <div class="table-row-col">
                        <div class="">时间</div>
                        <div class="for-div" :key="index" v-for="(item, index) in info">{{ item.created_at }}</div>
                    </div>
                    <div class="table-row-col">
                        <div class="">内容</div>
                        <div class="for-div" :key="index" v-for="(item, index) in info">{{ item.content }}</div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "orderFMS",
        props: {
            info: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped lang="scss">
    .order-after {
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
    /*表格*/
    .table-content{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom: 0;margin-top: 15px}
    .table-content .table-row{display: flex;flex-direction: row;align-items: stretch;}
    .card .icon{color: #666;font-size: 18px}
    .table-content .table-row-col{display: flex;flex: 1;align-items: center;justify-content: center;
        flex-direction: column;
    }
    .table-row-col div:first-child{height: 45px;display: flex;width: 100%;align-items: center;justify-content: center;
        font-weight: bold;font-size: 15px;
    }
    .table-row-col div:last-child{display: flex;width: 100%;align-items: center;justify-content: center;padding: 10px;flex: 1;line-height: 20px}
    .table-row-col div{border-bottom: 1px solid #E4E4E4;min-height: 45px;border-right: 1px solid #E4E4E4}
    .table-content .table-row-col:last-child div{border-right: 0}
    .table-content .table-row-col img{width: 70px;height: 50px;background-size: cover}
    .table-content .table-row-col .for-div{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
