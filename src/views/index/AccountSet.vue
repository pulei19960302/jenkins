<template>
    <div class="account-set">
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="上传头像：">
                    <FileUpload :isOnly="true" @successUploadCBK="successUpload" :fileList="avatar" width="100px" height="100px"></FileUpload>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Email：" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="旧密码：" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                    <p class="tips">不修改密码可不填写</p>
                </el-form-item>
                <el-form-item label="新密码：" prop="newpassword">
                    <el-input v-model="ruleForm.newpassword" type="password"></el-input>
                    <p class="tips">不修改密码可不填写</p>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="newpassword2">
                    <el-input v-model="ruleForm.newpassword2" type="password"></el-input>
                    <p class="tips">不修改密码可不填写</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                    <el-button @click="resetForm('ruleForm')">重 置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { Validate } from '@/OMS/utils';

    export default {
        name: "AccountSet",
        data() {
            const validateOldPassword = (rule, value, callback) => {
                if (this.ruleForm.newpassword && !this.ruleForm.password) {
                    callback(new Error('请输入旧密码'));
                    return;
                }
                callback();
            };
            const validatePassword = (rule, value, callback) => {
                if (this.ruleForm.password && !Validate('PASSWORD', value)) {
                    callback(new Error('密码必须为6-20位'));
                    return;
                }
                callback();
            };
            const validatePassword2 = (rule, value, callback) => {
                if (this.ruleForm.newpassword !== this.ruleForm.newpassword2) {
                    callback(new Error('两次输入的密码不一致'));
                    return;
                }
                callback();
            };
            return {
                avatar: [],
                ruleForm: {
                    name: '',
                    email: '',
                    password: '',
                    newpassword: '',
                    newpassword2: ''
                },
                rules: {
                    password: [
                        { required: false, trigger: 'change', validator: validateOldPassword },
                    ],
                    newpassword: [
                        { required: false, trigger: 'change', validator: validatePassword },
                    ],
                    newpassword2: [
                        { required: false, trigger: 'change', validator: validatePassword2 },
                    ]
                }
            };
        },
        computed: {
            ...mapState('user', ['userInfo']),
        },
        mounted() {
            this.avatar = [{ name: 'avatar', url: this.userInfo.avatar }];
            this.ruleForm.name = this.userInfo.name;
            this.ruleForm.email = this.userInfo.email;
        },
        methods: {
            ...mapActions('user', ['GetUserInfo']),
            successUpload(val) {
                this.avatar = [{ name:'avatar', url: val[0] }];
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.ruleForm);
                        params.avatar = this.avatar[0].url;
                        try {
                            await this.$api.login.modifyInfo(params);
                            this.GetUserInfo();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    .account-set {
        width: 100%;
        background: #fff;
        padding: 20px 0;
        >div {
            width: 20%;
            margin: 0 auto;
        }
        .head {
            text-align: center;
            p {
                margin: 10px 0;
            }
            .icon {
                font-size: 60px;
            }
            cursor: pointer;
        }
    }
</style>
