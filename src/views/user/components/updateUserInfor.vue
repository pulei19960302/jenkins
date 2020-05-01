<template>
    <div>
        <el-dialog
            title="修改用户"
            width="30%"
            :visible.sync="dialogVisible"
            @close="resetForm"
        >
            <el-form :rules="rules" label-position="right" label-width="130px" :model="formLabelAlign" ref="form" v-loading="loading">
                <el-form-item label="用户昵称：" prop="nickname">
                    <el-input v-model="formLabelAlign.nickname" style="width: 220px" placeholder="请输入昵称"/>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="formLabelAlign.phone" style="width: 220px" placeholder="请输入手机号码"/>
                </el-form-item>
                <el-form-item label="性别：">
                    <el-radio v-model="formLabelAlign.gender" :label="0">保密</el-radio>
                    <el-radio v-model="formLabelAlign.gender" :label="1">男</el-radio>
                    <el-radio v-model="formLabelAlign.gender" :label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="生日：" style="width: 220px">
                    <el-date-picker
                        v-model="formLabelAlign.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="职业：">
                    <el-input v-model="formLabelAlign.occupation" style="width: 220px" placeholder="请输入职业"/>
                </el-form-item>
                <el-form-item label="个性签名：" >
                    <el-input type="textarea" :rows="4" v-model="formLabelAlign.signature" style="width: 220px" placeholder="请输入个性签名"/>
                </el-form-item>
<!--                <el-form-item label="新密码：" >-->
<!--                    <el-input v-model="formLabelAlign.password" style="width: 220px" placeholder="请输入密码" type="password"/>-->
<!--                    <p class="tips">不修改密码可不填写</p>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button
                    :loading="btnLoading"
                    type="primary"
                    @click="submitForm">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "updateUserInfor",
        props: {
            sendCouponUserId: {
                type: String,
                default: ''
            },
            initData: {
                type: Function,
                default: () => {}
            },
            visable: {
                type: Boolean,
                default: false,
            },
            id: {
                type: [String, Number],
                default: ''
            }
        },
        data () {
            return {
                loading: false,
                dialogVisible: false,
                btnLoading: false,
                formLabelAlign: {
                    password: '',
                    signature: '',
                    occupation: '',
                    birthday: '',
                    gender: '',
                    phone: '',
                    nickname: ''
                },

                rules: {
                    nickname: [{ required: true, message: '请输入', trigger: 'blur' }]
                }

            }
        },
        methods: {
            resetForm () {
                this.$refs.form.resetFields();
                this.dialogVisible = false;
            },

            submitForm () {
                try {
                    this.$refs.form.validate(async v => {
                        if (v) {
                            this.btnLoading = true;
                            const params = {
                                password: this.formLabelAlign.password,
                                signature: this.formLabelAlign.signature,
                                occupation: this.formLabelAlign.occupation,
                                birthday: this.formLabelAlign.birthday,
                                sex: this.formLabelAlign.gender,
                                phone: this.formLabelAlign.phone,
                                nickname: this.formLabelAlign.nickname,
                                id: this.id
                            };
                            await this.$api.user.userEdit(params);
                            this.resetForm();
                            this.initData && this.initData();
                        }
                    })
                } catch (e) {
                    console.log(e)
                } finally {
                    this.btnLoading = false;
                }
            },
            async getUserInfo () {
                try {
                    this.loading = true;
                    const { data } = await this.$api.updateUser.getUserDetail({uid: this.id});
                    this.formLabelAlign = { ...this.formLabelAlign, ...data };

                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false;
                }
            }
        },
        watch: {
            visable(v) {
                this.dialogVisible = v;
                this.getUserInfo();
            },
            dialogVisible (v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>

<style scoped>

</style>
