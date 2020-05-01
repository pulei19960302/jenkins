<template>
    <div class="orderFollow">
        <p class="title">订单跟踪</p>
        <div style="margin: 20px">
            <el-steps direction="vertical" :active="1" :space="70">
                <el-step title="订单已签收，期待再次为您服务" description="2017-04-01 12:00:00"></el-step>
                <el-step title="到达目的地网点广东深圳公司，快件将很快进行派送" description="2017-04-01 12:00:00"></el-step>
                <el-step title="在广东深圳公司进行发出扫描" description="2017-04-01 12:00:00"></el-step>
            </el-steps>
        </div>
    </div>
</template>

<script>
    //订单跟踪
    export default {
        name: "orderFollow"
    }
</script>

<style scoped>
    .orderFollow{border:1px solid #E4E4E4;
        background: #fff;}
    .orderFollow .title{padding: 10px;border-bottom:1px solid #E4E4E4; }
</style>
