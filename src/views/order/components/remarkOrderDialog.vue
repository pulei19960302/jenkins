<template>
    <div>
        <el-dialog
            title="备注订单"
            :visible.sync="dialogStatus"
            width="30%">
            <el-form
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="操作备注：">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="remark"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button
                    :disabled="!remark"
                    type="primary"
                    @click="submit">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "remarkOrderDialog",
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
            }
        },
        data() {
            return {
                dialogStatus: false,
                remark: ''
            }
        },
        methods: {
            async submit() {
                try {
                    await this.$api.order.orderRemark({id: this.id, remark: this.remark});
                    this.cancel();
                    this.initData && this.initData();
                } catch (e) {
                    console.log(e)
                }
            },
            cancel () {
                this.remark = '';
                this.dialogStatus = false;
            }
        },
        watch: {
            visable (v) {
                this.dialogStatus = v;
            },
            dialogStatus (v) {
                this.$emit('update:visable', v)
            }
        }
    }
</script>

<style scoped>

</style>
