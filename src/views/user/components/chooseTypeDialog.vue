<template>
    <div>
        <el-dialog
            title="选择类型"
            :visible.sync="dialogVisibletype"
            width="30%"
            @close="resetForm"
        >
            <el-form
                :model="typeObj"
                :rules="rules"
                ref="chooseForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择类型：" prop="level" :rules="[simpleRule]">
                    <el-select filterable v-model="typeObj.level" placeholder="请选择">
                        <el-option
                            v-for="item in optionsType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-input v-model="store_id"></el-input>-->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submitType()"
                    :loading="btnLoading"
                >
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {common} from '@/OMS/mixins'

    export default {
        name: "chooseTypeDialog",
        mixins: [common],
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
        data() {
            return {
                dialogVisibletype: false,
                typeObj: {
                    level: '',
                },
                rules: {},
                optionsType: [
                    // {label: '粉丝', value: 1},
                    // {label: '店主', value: 30},
                    // {label: '优秀店主', value: 52},

                    {label: '会员', value: 1 },
                    {label: 'svip', value: 20 },
                    {label: '白银', value: 30 },
                    {label: '黄金', value: 52 },
                    {label: '钻石', value: 51 },
                ],
                btnLoading: false,
            }
        },
        methods: {
            submitType() {

                try {
                    this.$refs.chooseForm.validate(async (valid) => {
                        if (valid) {
                            this.btnLoading = true;
                            let obj = {...this.typeObj};
                            obj.uid=this.id;
                            await this.$api.user.partnerType(obj);
                            this.resetForm();
                            this.initData && this.initData();
                        }
                    });
                } catch (e) {
                    console.log(e)
                } finally {
                    this.btnLoading = false;
                }

            },
            resetForm () {
                this.typeObj.level = '';
                this.$refs.chooseForm.resetFields();
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
