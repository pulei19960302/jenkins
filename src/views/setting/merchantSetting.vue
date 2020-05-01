<template>
<RightSidePopup mask :visible.sync="curVisible" width="50%">
        <div class="platformSetting">
            <p class="title">平台信息设置</p>
            <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :model="form"
                    :rules="rules" ref="ruleForm">
                <el-form-item label="商户号：" prop="merchant_no">
                    <el-input v-model="form.merchant_no" style="width: 200px" placeholder="请输入商户号"></el-input>
                </el-form-item>
                <el-form-item label="终端ID：" prop="terminal_id">
                    <el-input v-model="form.terminal_id" style="width: 200px" placeholder="请输入终端ID"></el-input>
                </el-form-item>
                <el-form-item label="Token：" prop="token">
                    <el-input v-model="form.token" style="width: 200px" placeholder="请输入Token"></el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="is_enable">
                    <el-switch v-model="form.is_enable" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-button type="primary" class="submit" @click="submit" v-permission="[$api.setting.config.save]">提交</el-button>
            </el-form>
        </div>
</RightSidePopup>
</template>

<script>
    export default {
        name: "MerchantSetting",
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
            drawerVisible: {
                type: Boolean,
                required: true
            },
        },
        data() {
            return {
                curVisible: false,

                form: {
                    merchant_no: '',
                    terminal_id: '',
                    status: 0
                },
                rules: {
                    merchant_no: [
                        { required: true, message: '请输入商户号', trigger: 'blur' },
                        { min: 6, message: '应该包含至少6个字符', trigger: 'blur' }
                    ],
                    terminal_id: [
                        { required: true, message: '请输入终端ID', trigger: 'blur' },
                        { min: 6, message: '应该包含至少6个字符', trigger: 'blur' }
                    ],
                    token: [
                        { required: true, message: '请输入Token', trigger: 'blur' },
                        { min: 16, message: '应该包含至少16个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        watch: {
            drawerVisible(val) {
console.log('>>>>>> watch drawerVisible, val:', val)
                this.curVisible = val           
            },
//             curVisible(val) {
// console.log('>>>>>> watch curVisible, val:', val)
//                 this.$emit('update:drawerVisible', val)
//             }
        },
        methods: {
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            await this.$api.setting.editMerchant(params);
                            this.$router.push({ name: 'merchantList' });
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData(id) {
                try {
                    const { data } = await this.$api.setting.getMerchantInfo({ id });
                    this.form = data
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .platformSetting {
        background: #fff;
    }

    .platformSetting .title {
        font-size:20px;
        padding: 10px;
        margin-bottom: 40px;
        font-weight: bold;
    }

    .platformSetting .lastWore {
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        text-align: left
    }

    .submit {
        margin: 20px 0 20px 150px;
    }
</style>
