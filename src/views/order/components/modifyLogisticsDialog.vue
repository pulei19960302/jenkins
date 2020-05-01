<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="dialogStatus"
            width="30%"
            @close="cancel"
        >
            <el-form
                :model="form"
                ref="form"
                label-width="120px"
                label-position="right"
                v-loading="loading"
            >
                <el-form-item label="快递" prop="code" :rules="[simpleRule]">
                    <el-select v-model="form.code" placeholder="快递公司" @change="form.sn = ''">
                        <el-option
                            v-for="item in express"
                            :key="item.id"
                            :label="item.name"
                            :value="item.express_code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流单号" prop="sn" :rules="[simpleRule]">
                    <el-input v-model="form.sn"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button
                    type="primary"
                    @click="submit">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    // 修改物流模态框
    export default {
        name: "modifyLogisticsDialog",
        props: {
            status: {
                type: Boolean,
                default: false
            },
            id: {
                type: [String, Number],
                default: ''
            },
            initData: {
                type: Function,
                default: () => {}
            },
            isEditOrAdd: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                loading: false,
                dialogStatus: false,
                form: {
                    code: '',
                    sn: '',
                },
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                express: [],
                title: '新增物流信息',
            }
        },
        mounted() {
          this.getExpress();
        },
        methods: {
            async getExpress() {
                try {
                    const { data } = await this.$api.setting.getExpressList({ status: 10 });
                    this.express = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },

            submit () {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        const params = {
                            ...this.form,
                            id:this.id
                        };
                        await this.$api.order.deliverySave({ items:[params] });
                        this.cancel();
                        this.initData && this.initData();
                    }
                })
            },

            cancel () {
                this.$refs.form.resetFields();
                this.dialogStatus = false;
            },

            async getExpressInfo () {
                try {
                    this.loading = true;
                    const { data } = await this.$api.order.getExpressService({id: this.id});
                    this.form = {
                        code: data && data.express_code,
                        sn: data && data.logistics_sn
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false
                }
            }
        },
        watch: {
            status(v) {
                this.dialogStatus = v;
                this.title = !!this.isEditOrAdd ? '新增物流信息' : '修改物流信息';
                !this.isEditOrAdd && this.getExpressInfo();
            },
            dialogStatus(v) {
                this.$emit('update:status', v);
            }
        }
    }
</script>
