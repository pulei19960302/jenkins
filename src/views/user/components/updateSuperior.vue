<template>
    <div>
        <el-dialog
            title="修改上级"
            :visible.sync="showDialog"
            width="30%"
        >
            <el-form
                ref="updateSuperiorForm"
                :rules="rules"
                label-width="120px"
                label-position="right"
                :model="formModel"
            >
                <el-form-item label="当前上级ID：">
                    {{superiorId}}
                </el-form-item>
                <el-form-item label="修改上级ID：" prop="store_id">
                    <el-select style="" filterable remote reserve-keyword v-model="formModel.store_id" placeholder="请输入id搜索"
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
        name: "updateSuperior",
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
                default: () => {}
            },
            superiorId: {
                type: [String, Number],
                default: ''
            }
        },
        data () {
            return {
                rules: {
                    store_id: [{ required: true, message: '请输入id查询上级', trigger: 'change' }]
                },
                showDialog: false,
                loading: false,
                btnLoading: false,
                options: [],
                formModel: {
                    store_id: ''
                }
            }
        },

        methods: {
            submitType () {
                this.btnLoading = true;
                try {
                    this.$refs.updateSuperiorForm.validate( async v => {
                        if (v) {
                            const params = { id: this.id, store_id: this.formModel.store_id };
                            await this.$api.user.changeStore(params);
                            this.resetForm();
                            this.initData && this.initData();
                        }
                    })
                } catch (e) {
                    console.log(e);
                }finally {
                    this.btnLoading = false;
                }
            },

            resetForm () {
                this.$refs.updateSuperiorForm.resetFields();
                this.options = [];
                this.showDialog = false;
            },

            async remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    const { data } = await this.$api.user.storeUser({name:query});
                    this.options = data;
                    this.loading = false;
                } else {
                    this.options = [];
                }
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
