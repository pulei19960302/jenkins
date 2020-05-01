<template>
    <section>
        <span class="text" type="text" @click="look">查看物流</span>
        <el-dialog
            title="物流信息"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form
                label-width="120px"
                label-position="right">
                <el-steps direction="vertical" :active="0">
                    <el-step :title="index.context" :description="index.ftime" v-for="index in list" v-bind:key="index"></el-step>
                </el-steps>
                <div class="noTips" v-if="list.length==0">暂无信息</div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    //物流信息
    export default {
        name: "logisticsInfo",
        props:['logisticssn','expresscode'],
        data() {
            return {
                dialogVisible:false,
                list:[]
            }
        },
        created(){},
        methods: {
            async getData(){
                const { data } = await this.$api.order.logistics({
                    express_code:this.expresscode,
                    logistics_sn:this.logisticssn
                });
                this.list = data.items;
            },
            look(){
                this.dialogVisible=true;
                this.getData();
            },
        }
    }
</script>

<style scoped>
    .text{
        border: 0;
        color: #2d8cf0;
        background: transparent;
        padding-left: 0;
        padding-right: 0;
        font-size: 12px;
        /*margin-left: 10px;*/
        cursor: pointer;
    }
    .noTips{text-align: center}
</style>
