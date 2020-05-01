<template>
    <div>
        <el-dialog
            :visible.sync="showDialog"
            title="修改密码"
            width="30%"
            @close="resetForm"
        >
            <el-form label-width="100px" ref="form" :rules="rules" :model="form">
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button
                    :loading="btnLoading"
                    type="primary"
                    @click="submitType">
                    确定
                </el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "updataPassword",
        props: {
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
                btnLoading: false,
                showDialog: false,
                rules: {
                    password: [{ required: true, message: '请输入你的密码', trigger: 'blur'   }]
                },
                form: {
                    password: ''
                }
            }
        },

        methods: {
            submitType () {

                try {
                    this.$refs.form.validate(async v => {
                        if (v) {
                            this.btnLoading = true;
                            const params = {
                                password: this.form.password,
                                id: this.id
                            };
                            await this.$api.updateUser.updatePwdService(params);
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

            resetForm () {
                this.$refs.form.resetFields();
                this.options = [];
                this.showDialog = false;
            },
        },
        watch: {
            visable(v) {
                this.showDialog = v;
            },
            showDialog(v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>

<style scoped>

</style>
