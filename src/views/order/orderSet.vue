<template>
    <div class="orderSet-content">
        <p class="title">订单设置</p>
        <el-form label-position="right" label-width="150px" :model="formLabelAlign" :rules="rules" ref="ruleForm" style="width: 500px;margin: 0 auto">
            <el-form-item label="秒杀订单超过" prop="order_seckill_overtime_close">
                <el-input v-model="formLabelAlign.order_seckill_overtime_close" class="formIpt" placeholder="请输入分钟数" />
                <span class="fcgrey">分未付款，订单自动关闭</span>
            </el-form-item>
            <el-form-item label="正常订单超过" prop="order_overtime_close">
                <el-input v-model="formLabelAlign.order_overtime_close" class="formIpt" placeholder="请输入分钟数" />
                <span class="fcgrey">分未付款，订单自动关闭</span>
            </el-form-item>
            <el-form-item label="发货超过" prop="order_auto_complete">
                <el-input v-model="formLabelAlign.order_auto_complete" class="formIpt" placeholder="请输入天数" />
                <span class="fcgrey">天未收货，订单自动完成</span>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_aftersale_day">
                <el-input v-model="formLabelAlign.order_aftersale_day" class="formIpt" placeholder="请输入天数" />
                <span class="fcgrey">天自动结束交易，不能申请售后</span>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_evaluate_day">
                <el-input v-model="formLabelAlign.order_evaluate_day" class="formIpt" placeholder="请输入天数" />
                <span class="fcgrey">天自动五星好评</span>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_rebate_day">
                <el-input v-model="formLabelAlign.order_rebate_day" class="formIpt" placeholder="请输入天数" />
                <span class="fcgrey">天自动返利</span>
            </el-form-item>

            <!-- <el-form-item label="秒杀订单超过" prop="order_seckill_overtime_close">
                <el-input v-model="formLabelAlign.order_seckill_overtime_close" style="width: 300px" placeholder="请输入分钟数">
                    <template slot="append">分未付款，订单自动关闭</template>
                </el-input>
            </el-form-item>
            <el-form-item label="正常订单超过" prop="order_overtime_close">
                <el-input v-model="formLabelAlign.order_overtime_close" style="width: 300px" placeholder="请输入分钟数">
                    <template slot="append">分未付款，订单自动关闭</template>
                </el-input>
            </el-form-item>
            <el-form-item label="发货超过" prop="order_auto_complete">
                <el-input v-model="formLabelAlign.order_auto_complete" style="width: 300px" placeholder="请输入天数">
                    <template slot="append">天未收货，订单自动完成</template>
                </el-input>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_aftersale_day">
                <el-input v-model="formLabelAlign.order_aftersale_day" style="width: 300px" placeholder="请输入天数">
                    <template slot="append">天自动结束交易，不能申请售后</template>
                </el-input>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_evaluate_day">
                <el-input v-model="formLabelAlign.order_evaluate_day" style="width: 300px" placeholder="请输入天数">
                    <template slot="append">天自动五星好评</template>
                </el-input>
            </el-form-item>
            <el-form-item label="订单完成超过" prop="order_rebate_day">
                <el-input v-model="formLabelAlign.order_rebate_day" style="width: 300px" placeholder="请输入天数">
                    <template slot="append">天自动返利</template>
                </el-input>
            </el-form-item> -->
        </el-form>
        <div class="submit">
            <el-button type="primary" @click="submit">提 交</el-button>
        </div>
    </div>
</template>

<script>
    //订单设置
    export default {
        name: "orderSet",
        data() {
            return {
                formLabelAlign:{
                    order_overtime_close:'',
                    order_seckill_overtime_close:'',
                    order_auto_complete:'',
                    order_aftersale_day:'',
                    order_evaluate_day:'',
                    order_rebate_day:'',
                },
                rules: {
                    age: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    day: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.formLabelAlign);
                            await this.$api.setting.saveConfig({ group: 'order','items': params});
                            this.$router.go(-1);
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'order' });
                    this.formLabelAlign = data.keys;
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .fcgrey { color: #606266; }
    .formIpt {
        width: 100px;
        margin-right: 8px;
    }
    .orderSet-content {
        background: #fff;
        border-radius: 0 0 4px 4px;
        min-height: calc(100vh - 135px);
    }
    .orderSet-content .title{border-bottom: 1px solid #E4E4E4;padding: 10px;margin: 0;font-size: 14px;margin-bottom: 20px;font-weight: 600;text-align: left}
    .submit{margin: 20px 0; text-align: center}
</style>
