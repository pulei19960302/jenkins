<template>
    <div class="taskReward-content">
        <p class="title">服务单信息</p>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">服务单号</div>
                        <div class="table-right">
                            <span class="s1">313860326</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">申请状态</div>
                        <div class="table-right">
                            <span class="s1">待处理</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">订单编号</div>
                        <div class="table-right">
                            <span class="s1">201707196398345 </span>
                            <el-button @click="detail"  type="info" plain size="mini">查看</el-button>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">申请时间</div>
                        <div class="table-right">
                            <span class="s1">2017-07-19 14:48:38</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">用户账号</div>
                        <div class="table-right">
                            <span class="s1">18000000000</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">订单金额</div>
                        <div class="table-right">
                            <span class="s1">¥200.00</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">确认退款金额</div>
                        <div class="table-right">
                            <span class="s1">¥200.00</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">退款方式</div>
                        <div class="table-right">
                            <span class="s1">退回到原支付渠道</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">退款类型</div>
                        <div class="table-right">
                            <span class="s1">取消订单</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">退款原因</div>
                        <div class="table-right">
                            <span class="s1">原因描述</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">处理备注</div>
                        <div class="table-right">
                            <span class="s1"><el-input placeholder="备注"></el-input></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center;margin-bottom: 20px">
            <el-button type="primary">确认退款</el-button>
            <el-button type="danger">拒绝退款</el-button>
        </div>
    </div>
</template>

<script>
    //退款处理-服务单信息
    export default {
        name: "refundDetail",
        data(){
            return {
            }
        },
        methods:{
            detail(){
                this.$router.push({
                    name: 'orderDetail',params:{id:''}
                });
            }
        }
    }
</script>

<style scoped>
    .taskReward-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .taskReward-content .title{padding: 10px;border-bottom:1px solid #E4E4E4; }
    .taskReward-content .f16{font-size: 16px}
    .taskReward-content .card{margin: 20px}
    /*表格*/
    .table-content{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom: 0;margin-top: 15px}
    .table-content .table-row{display: flex;flex-direction: row;align-items: center;border-bottom: 1px solid #E4E4E4;height: 50px}
    .table-content .table-left{padding: 0 10px;width: 200px;text-align: right}
    .table-content .table-right{display: flex;flex-direction: row;align-items: center;padding: 10px 20px 10px 0;border-left: 1px solid #E4E4E4;height: 50px}
    .table-content .table-right .s1{width: 150px;display: inline-block;margin:0 10px;text-align: left;}
    .card .icon{color: #666;font-size: 18px}
</style>
