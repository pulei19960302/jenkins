<template>
    <div>
        <el-dialog
            title="关闭订单"
            :visible.sync="dialogStatus"
            width="30%">
            <el-form
                ref="closeForm"
                :model="closeForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="是否退款：">
                    <el-switch v-model="closeForm.is_refund" :active-value="1" :inactive-value="0"/>
                </el-form-item>
                <el-form-item v-show="closeForm.is_refund===1" label="退款金额：" prop="actual_fee" :rules="[simpleRule]">
                    <el-input
                        type="number"
                        v-model="closeForm.actual_fee"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="操作密码：" prop="password" :rules="[simpleRule]">
                    <el-input
                        type="password"
                        v-model="closeForm.password"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <!-- 测试liu bug ID1002482  增加备注  add pulei 2020/3/2  start-->
                <el-form-item label="备注">
                    <el-input v-model="closeForm.remark" style="width: 70%;margin:0 5% 10px 0" />
                </el-form-item>
                <!-- end -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button
                    :disabled="!closeForm.password"
                    type="primary"
                    @click="orderClose">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "closeOrderDialog",
        props: {
            visable: {
                type: Boolean,
                default: false,
            },
            id: {
                type: [String, Number],
                default: ''
            },

            initData: {
                type: Function,
                default: () => {}
            },
            money: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                simpleRule: {required: true, message: '必填项', trigger: 'change'},
                dialogStatus: false,
                closeForm: {
                    is_refund: 0,
                    password: '',
                    actual_fee: 0,
                    remark: '',
                },
                cacheMoney: 0
            }
        },
        methods: {
            orderClose() {
                this.$refs.closeForm.validate(async valid => {
                    if (valid) {
                        const params = { ...this.closeForm, ...{id: this.id} };
                        if (params.is_refund !== 0) {
                            if (Number(this.cacheMoney) < Number(params.actual_fee)) {
                                this.$message.error('退款金额高于实付金额！');
                                return
                            }
                        }
                        if (params.is_refund === 0) {
                            Reflect.deleteProperty(params, 'actual_fee');
                        }
                        try {
                            await this.$api.order.orderClose(params);
                            this.cancel();
                            this.initData && this.initData();
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            },
            cancel () {
                this.$refs.closeForm.resetFields();
                this.is_refund = 0;
                this.closeForm = {
                    is_refund: 0,
                    password: '',
                    actual_fee: 0,
                    remark: ''
                };
                this.dialogStatus = false;
            }
        },
        watch: {
            money (v) {
                this.cacheMoney = v;
                this.closeForm.actual_fee = v;
            },
            visable(v) {
                this.dialogStatus = v;
                this.closeForm.actual_fee = this.cacheMoney; // 缓存
            },
            dialogStatus(v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>
