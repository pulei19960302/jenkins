<template>
    <div>
        <el-dialog
            title="转移团队"
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
                <el-form-item label="迁移用户id：">
                    {{id}}
                </el-form-item>
                <el-form-item label="上级id：" prop="newFirstUid">
                    <el-select style="" filterable remote reserve-keyword v-model="formModel.newFirstUid" placeholder="请输入id搜索"
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
        name: "transferTeam",
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
        },
        data () {
            return {
                rules: {
                    newFirstUid: [{ required: true, message: '请输入id查询上级', trigger: 'change' }]
                },
                showDialog: false,
                loading: false,
                btnLoading: false,
                options: [],
                formModel: {
                    newFirstUid: ''
                }
            }
        },

        methods: {
            submitType () {
                this.btnLoading = true;
                try {
                    this.$refs.updateSuperiorForm.validate( async v => {
                        if (v) {
                            const params = { oldFirstUid: this.id, newFirstUid: this.formModel.newFirstUid };
                            this.$api.user.modifyTeam(params).then(res=>{
                                this.showDialog = false;
                                this.resetForm();
                                this.initData && this.initData();
                            });
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
