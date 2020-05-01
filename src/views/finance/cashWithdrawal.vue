<template>
    <div class="platformSetting">
        <p class="title">提现</p>
        <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :model="formLabelAlign"
                 :rules="rules" ref="ruleForm">
            <el-form-item label="粉丝账号" prop="member_no">
                <el-input v-model="formLabelAlign.member_no" style="width: 200px" placeholder="请输入粉丝账号"></el-input>
            </el-form-item>
            <el-form-item label="粉丝名称" prop="name">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入粉丝名称"></el-input>
            </el-form-item>
            <el-form-item label="银行卡ID" prop="card_id">
                <el-input v-model="formLabelAlign.card_id" style="width: 200px" placeholder="请输入银行卡ID"></el-input>
            </el-form-item>
            <el-form-item label="转账金额" prop="amount">
                <el-input v-model="formLabelAlign.amount" style="width: 200px"
                          placeholder="请输入转账金额"></el-input>
            </el-form-item>
            <AutoInputFix />
            <el-form-item label="验证码" prop="validate_code">
                <div style="display:flex">
                        <el-input v-model="formLabelAlign.validate_code" style="width: 200px"
                          placeholder="请输入验证码"></el-input>
                          <VerificationCode style="margin-left:10px"></VerificationCode>
                </div>
            </el-form-item>
            <el-button type="primary" class="submit" @click="submit">提交</el-button>
        </el-form>

    </div>
</template>

<script>
import {debounce} from '@/OMS/utils';
import VerificationCode from '@/OMS/components/VerificationCode/VerificationCode'

    //提现
    export default {
        name: "cashWithdrawal",
        components:{
            VerificationCode
        },
        data() {
            return {
                logo: [],
                formLabelAlign: {
                    member_no: '',
                    name: '',
                    amount: '',
                    validate_code: '',
                    card_id: '',
                },
                rules: {
                    member_no: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    amount: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    validate_code: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                    card_id: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
        },
        methods: {
            // submit() {
            //     this.$refs.ruleForm.validate(async (valid) => {
            //         if (valid) {
            //             try {
            //                 const params = Object.assign({}, this.formLabelAlign);
            //                 await this.$api.finance.withdrawRequest(params);
            //             } catch (e) {
            //                 throw new Error(e);
            //             }
            //         }
            //     });
            // },
            submit:debounce(function(){
                this.$refs.ruleForm.validate(async (valid) => {                  
                    if (valid) {
                        let loading = this.$loading({
                            lock: true,
                            text: '处理中，请等待',
                            spinner: 'el-icon-loading',
                        });
                        const params = Object.assign({}, this.formLabelAlign);
                        this.$api.finance.withdrawRequest(params).then(res=>{
                            loading.close();
                            this.$refs.ruleForm.resetFields();
                        }).catch(err=>{
                            loading.close();
                        })
                    }
                });
            },200)
        }
    }
</script>

<style scoped>
    .platformSetting {
        border: 1px solid #E4E4E4;
        background: #fff;
    }

    .platformSetting .title {
        padding: 10px;
        border-bottom: 1px solid #E4E4E4;
        margin-bottom: 20px;
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
