<template>
    <div class="platformSetting">
        <p class="title">验证码设置</p>
        <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="170px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
            <el-form-item label="启用验证码">
                <div class="div-col">
                    <el-checkbox v-model="checked1">新用户注册</el-checkbox>
                    <el-checkbox v-model="checked2">用户登录</el-checkbox>
                    <el-checkbox v-model="checked3">发表相关评论</el-checkbox>
                    <el-checkbox v-model="checked4">后台系统登录</el-checkbox>
                    <div class="garyTips">启用验证码可以避免恶意批量评论或提交信息，推荐打开验证码功能。注意: 启用验证码会使得部分操作变得繁琐，建议仅在必需时打开</div>
                </div>
            </el-form-item>
            <el-form-item label="登录失败时显示验证码" prop="region">
                <template>
                    <el-radio v-model="radio" label="1">关闭</el-radio>
                    <el-radio v-model="radio" label="2">开启</el-radio>
                </template>
                <div class="garyTips">选择“是”将在用户登录失败 3 次后才显示验证码，选择“否”将始终在登录时显示验证码。注意: 只有在启用了用户登录验证码时本设置才有效</div>
            </el-form-item>
            <el-form-item label="验证码方式" prop="type">
                <template>
                    <el-radio v-model="radio" label="1">图形验证码</el-radio>
                    <el-radio v-model="radio" label="2">滑动验证码</el-radio>
                </template>
            </el-form-item>
            <el-form-item label=" 图形验证码宽度" prop="width">
                <el-input v-model="formLabelAlign.width" style="width: 200px" placeholder="范围在 40～145 之间"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码高度" prop="height">
                <el-input v-model="formLabelAlign.height" style="width: 200px" placeholder="范围在 15～50 之间"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码内容大小" prop="size">
                <el-input v-model="formLabelAlign.size" style="width: 200px" placeholder="范围在16-20之间"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码位数" prop="length">
                <el-input v-model="formLabelAlign.length" style="width: 200px" placeholder="图形验证码位数，范围4-6之间"></el-input>
            </el-form-item>
            <el-form-item label="图形验证码预览">
                <img style="width: 100px;height: 50px" src="https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/eac4b74543a98226088e26648a82b9014a90eb22.jpg"/>
            </el-form-item>
            <el-button type="primary" class="submit" @click="submit">提交</el-button>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "verificationCodeSettings",
        data() {
            return {
                formLabelAlign:{
                    region:'',
                    type:'',
                    age:'',
                    day:'',
                    width:'',
                    height:'',
                    length:'',
                    size:'',
                },
                rules: {
                    check: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    width: [
                        { required: true, message: '请输入宽度', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    height: [
                        { required: true, message: '请输入高度', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    length: [
                        { required: true, message: '请输入位数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    size: [
                        { required: true, message: '请输入大小', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    day: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                checked1:'',
                checked2:'',
                checked3:'',
                checked4:'',
                radio:'',
            }
        },
        methods:{
            submit(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .platformSetting{border: 1px solid #E4E4E4;background: #fff;}
    .platformSetting .title{padding: 10px;border-bottom: 1px solid #E4E4E4;margin-bottom: 20px;}
    .platformSetting .lastWore{display: inline-block;width: 200px;margin-left: 10px;text-align: left}
    .submit{margin: 20px 0 20px 150px;}
    .platformSetting .div-col{display: flex;flex-direction: column}
    .platformSetting .div-col .el-checkbox{margin-left: 0}
    .platformSetting .garyTips{color: #999;font-size: 12px;line-height: 22px;margin-top: 10px}
</style>
