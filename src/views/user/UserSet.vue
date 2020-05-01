<template>
    <div class="orderSet-content">
        <p class="title">用户设置</p>
        <el-form label-position="right" label-width="150px" :model="formLabelAlign" :rules="rules" ref="ruleForm" style="width: 500px;margin: 0 auto">
            <el-form-item label="黄金：" prop="order_seckill_overtime_close">
                <el-input v-model="formLabelAlign.team_angel1" style="width: 240px" placeholder="">
                    <template slot="prepend">上家</template>
                </el-input>
                <el-input v-model="formLabelAlign.team_angel2" style="width: 240px" placeholder="">
                    <template slot="prepend">上上家</template>
                </el-input>
            </el-form-item>
            <!--<el-form-item label="资深合伙人：" prop="order_seckill_overtime_close">-->
            <!--<el-input v-model="formLabelAlign.team_senior1" style="width: 240px" placeholder="">-->
            <!--<template slot="prepend">普通返利系数</template>-->
            <!--</el-input>-->
            <!--<el-input v-model="formLabelAlign.team_senior2" style="width: 240px" placeholder="">-->
            <!--<template slot="prepend">团队返利系数</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="战略合伙人：" prop="order_seckill_overtime_close">-->
            <!--<el-input v-model="formLabelAlign.team_strategy1" style="width: 240px" placeholder="">-->
            <!--<template slot="prepend">普通返利系数</template>-->
            <!--</el-input>-->
            <!--<el-input v-model="formLabelAlign.team_strategy2" style="width: 240px" placeholder="">-->
            <!--<template slot="prepend">团队返利系数</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="社群团长：" prop="order_seckill_overtime_close">
                <el-input v-model="formLabelAlign.team_sq1" style="width: 240px" placeholder="">
                    <template slot="prepend">上家</template>
                </el-input>
                <el-input v-model="formLabelAlign.team_sq2" style="width: 240px" placeholder="">
                    <template slot="prepend">上上家</template>
                </el-input>
            </el-form-item>
            <el-form-item label="网红达人：" prop="order_seckill_overtime_close">
                <el-input v-model="formLabelAlign.team_wh1" style="width: 240px" placeholder="">
                    <template slot="prepend">上家</template>
                </el-input>
                <el-input v-model="formLabelAlign.team_wh2" style="width: 240px" placeholder="">
                    <template slot="prepend">上上家</template>
                </el-input>
            </el-form-item>
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
                formLabelAlign: {
                    team_angel1: '',
                    team_angel2: '',
                    team_senior1: '',
                    team_senior2: '',
                    team_strategy1: '',
                    team_strategy2: '',
                    team_sq1: '',
                    team_sq2: '',
                    team_wh1: '',
                    team_wh2: '',
                },
                rules: {}
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
                            await this.$api.setting.saveConfig({ group: 'user', 'items': params});
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'user' });
                    this.formLabelAlign = data.keys;
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .orderSet-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .orderSet-content .title{border-bottom: 1px solid #E4E4E4;padding: 10px;margin: 0;font-size: 14px;margin-bottom: 20px;font-weight: 600;text-align: left}
    .submit{margin: 20px 0; text-align: center}
</style>
