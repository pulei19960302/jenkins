<template>
    <div class="platformSetting" id="platformInfoSetting">
        <p class="title">平台信息设置</p>
        <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :model="formLabelAlign"
                 :rules="rules" ref="ruleForm">
            <el-form-item label="平台名称" prop="platform_name">
                <el-input v-model="formLabelAlign.platform_name" style="width: 320px" placeholder="请输入平台名称"></el-input>
            </el-form-item>
            <el-form-item label="平台标题" prop="platform_title">
                <el-input v-model="formLabelAlign.platform_title" style="width: 320px" placeholder="请输入平台标题"></el-input>
            </el-form-item>
            <el-form-item label="平台描述" prop="platform_describe">
                <el-input v-model="formLabelAlign.platform_describe" style="width: 320px"
                          placeholder="请输入平台描述"></el-input>
            </el-form-item>
            <!-- <el-form-item label="关键词" prop="platform_keywords">
                <el-input v-model="formLabelAlign.platform_keywords" style="width: 320px"
                          placeholder="请输入关键词"></el-input>
            </el-form-item> -->
            <el-form-item label="客服热线" prop="platform_service_hotline">
                <el-input v-model="formLabelAlign.platform_service_hotline" style="width: 320px"
                          placeholder="请输入客服热线"></el-input>
            </el-form-item>
            <el-form-item label="平台LOGO">
                <FileUpload
                    width="100px"
                    height="100px"
                    :isOnly="true"
                    :fileList="logo"
                    @successUploadCBK="getsuccessUpload">
                </FileUpload>
            </el-form-item>
            <el-button type="primary" class="submit" @click="submit" v-permission="[$api.setting.config.save]">提交</el-button>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "platformSetting",
        data() {
            return {
                logo: [],
                formLabelAlign: {
                    platform_name: '',
                    platform_title: '',
                    platform_describe: '',
                    platform_keywords: '',
                    platform_logo: '',
                    platform_service_hotline: '',
                    platform_service_email: '',
                    platform_sort: ''
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
                            params.platform_logo = this.logo[0].url;
                            await this.$api.setting.saveConfig({ group: 'platform','items': params});
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'platform' });
                    this.formLabelAlign = data.keys;
                    this.logo = [{ name:'logo', url:data.keys.platform_logo }];
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .platformSetting {
        border-radius: 4px;
        background: #fff;
        min-height: calc(100vh - 135px);
    }

    .platformSetting .title {
        padding: 0 24px;
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        line-height: 56px;
        border-bottom: 1px solid #E4E7ED;
        margin-bottom: 40px;
    }

    .platformSetting .lastWore {
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        text-align: left
    }

    .submit {

        margin: 20px 0 20px 150px;
    }
</style>
