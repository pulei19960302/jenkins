<template>
    <div>
        <el-dialog title="增减积分" :visible.sync="dialogVisibletype" width="30%" @close="cancel">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" label-position="right">

                <el-form-item label="收支类型：" prop="type">
                    <el-select v-model="form.type" style="width: 70%;">
                        <el-option
                            v-for="item in options5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="积分：" prop="point">
                    <el-input v-model="form.point" autocomplete="off" style="width: 70%;"/>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        :rows="2"
                        autocomplete="off"
                        style="width: 70%;"
                    />
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" style="width: 70%;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="updateintegral()" :loading="btnLoading">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "integrationOperation",
        props: {
            id: {
                type: [String, Number],
                default: ''
            },
            visable: {
                type: Boolean,
                default: false,
            },
            initData: {
                type: Function,
                default: () =>{}
            }
        },
        data () {
            return {
                btnLoading: false,
                dialogVisibletype: false,
                options5: [],
                form: {
                    password: '',
                    remark: '',
                    point: '',
                    type: '',
                },
                rules: {
                    type: [{ required: true, message: "请选择", trigger: "change" }],
                    point: [{ required: true, message: "请输入", trigger: "change" }],
                    remark: [{ required: true, message: "请选择", trigger: "change" }],
                    password: [{ required: true, message: "请选择", trigger: "change" }],
                    sort: [{ required: true, message: "请输入", trigger: "change" }]
                }
            }
        },

        mounted() {
            this.balanceRecordType()
        },
        methods: {
            async balanceRecordType() {
                const { data } = await this.$api.user.integralType();
                this.options5 = data;
            },
            updateintegral() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        try {
                            this.btnLoading = true;
                            const params = Object.assign({}, this.form, {uids: this.id});
                            const { code } = await this.$api.updateUser.integerUpdateService(params);
                            if (code == 0) {
                                this.dialogVisible = false;
                                this.cancel();
                                this.initData && this.initData();
                            }
                        } catch (e) {
                            throw new Error(e);
                        } finally {
                            this.btnLoading = false;
                        }
                    }
                });
            },

            cancel () {
                this.$refs.form.resetFields();
                this.dialogVisibletype = false;
            }
        },
        watch: {
            visable(v) {
                this.dialogVisibletype = v;
            },
            dialogVisibletype(v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>

<style scoped>

</style>
