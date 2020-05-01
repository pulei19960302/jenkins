<template>
    <div class="platformSetting">
        <p class="title">接入设置</p>
        <el-form label-position="top" style="margin-left: 20px" label-width="150px" :model="formLabelAlign"
                 :rules="rules" ref="ruleForm">
            <el-form-item label="是否启用自动接入" prop="platform_name">
                <el-radio-group v-model="formLabelAlign.auto_access" class="radio-content">
                    <el-radio label=1>不启用自动接入，全部手动接入(适用于咨询等待较多，手动接入，留言回复)</el-radio>
                    <el-radio label="2">启用自动接入，系统智能分配等待中的客户(适用咨询人数等待较少的时，快速处理)</el-radio>
                    <el-radio label="3">启用智能应答，系统自动回复用户相关问题(适用于售后周期较长咨询和较大咨询量)</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接入客户时，是否启用自动问候语" prop="platform_title">
                <!--<el-radio-group v-model="formLabelAlign.platform_title">-->
                    <!--<el-radio label=1>不启用自动问候语</el-radio>-->
                    <!--<el-radio label="2">启用自动问候语</el-radio>-->
                <!--</el-radio-group><br>-->
                <el-input v-model="formLabelAlign.access_reply" style="width: 500px" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="离开时，是否启用自动回复" prop="platform_keywords">
                <!--<el-radio-group v-model="formLabelAlign.platform_sort">-->
                    <!--<el-radio label=1>不启用自动回复</el-radio>-->
                    <!--<el-radio label="2">启用自动回复</el-radio>-->
                <!--</el-radio-group><br>-->
                <el-input v-model="formLabelAlign.leave_reply" style="width: 500px" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-button type="primary" class="submit" @click="submit">保存</el-button>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "serviceSetting",
        data() {
            return {
                logo: [],
                formLabelAlign: {
                    auto_access:1,
                    access_reply:'',
                    leave_reply:'',
                },
                rules: {
                    key: [
                        {required: true, message: '请输入关键字', trigger: 'blur'},
                        {min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    detail: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    day: [
                        {required: true, message: '请输入天数', trigger: 'blur'},
                        {min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getsuccessUpload(img) {
                this.logo = [{ name:'logo', url:img[0] }];
            },
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.formLabelAlign);
                            await this.$api.setting.saveConfig({ group: 'service','items': params});
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'service' });
                    this.formLabelAlign = data.keys;
                    this.logo = [{ name:'logo', url:data.keys.platform_logo }];
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped >
    .platformSetting {
        border: 1px solid #E4E4E4;
        background: #fff;
    }

    .platformSetting .title {
        padding: 10px;
        border-bottom: 1px solid #E4E4E4;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .platformSetting .lastWore {
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        text-align: left
    }

    .submit {
        margin: 20px 0 20px ;
    }

    .radio-content{
        display: flex;
        flex-direction: column;
    }
    .el-radio + .el-radio{
        margin-left: 0;

    }
    .el-radio{
       margin-bottom: 10px;
    }
</style>
