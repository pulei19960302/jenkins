<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisibletype"
            title="合并数据"
            width="30%"
            @close="cancel"
        >
            <el-form ref="form" :model="formModel" :rules="rules" label-width="140px" label-position="right">
                <el-form-item label="合并账号：">
                    {{userName}}
                </el-form-item>

                <el-form-item label="被合并账号：" prop="to_uid">
                    <el-select style="" filterable remote reserve-keyword v-model="formModel.to_uid" placeholder="请输入id搜索"
                               :remote-method="remoteMethod"
                               :loading="loading">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="禁用被合并账号：" prop="is_frozen_to_uid">
                    <el-switch v-model="formModel.is_frozen_to_uid" active-value="1" inactive-value="0"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit()">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "mergeData",
        props: {
            id: {
                type: [String, Number],
                default: ''
            },
            userName: {
              type: String,
              default: ''
            },
            visable: {
                type: Boolean,
                default: false,
            },
            initData: {
                type: Function,
                default: () => {}
            }
        },
        data () {
            return {
                rules: {
                    to_uid: [{ required: true, message: "请输入用户id", trigger: "change" }],
                    is_frozen_to_uid: [{ required: true, message: "请选择", trigger: "change" }],
                },
                dialogVisibletype: false,
                loading: true,
                options: [],
                formModel: {
                    to_uid: '',
                    is_frozen_to_uid: '0'
                }
            }
        },
        methods: {
            submit () {
                console.log(this.formModel);
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const params = { ...this.formModel, uid: this.id };
                        await this.$api.updateUser.mergeDataService(params);
                        this.cancel();
                        this.initData && this.initData();
                    }
                });
            },
            cancel () {
                this.$refs.form.resetFields();
                this.dialogVisibletype = false;
            },
            async remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    const { data } = await this.$api.updateUser.searchUserService({uid:query});
                    this.options = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
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
