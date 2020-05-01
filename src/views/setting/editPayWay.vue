<template>
    <div class="editMessage">
        <p class="title">编辑支付方式</p>
        <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="220px" :rules="rules" ref="ruleForm">
            <el-form-item label="支付方式名称：" prop="name">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="支付方式描述：">
                <el-input type="textarea" v-model="formLabelAlign.name" style="width: 300px;" :autosize="{ minRows: 10}" placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号AppId：">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入AppId"></el-input>
            </el-form-item>
            <el-form-item label="微信公众号AppSecret：">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入AppSecret"></el-input>
            </el-form-item>
            <el-form-item label="商户支付密钥Key：">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入支付密钥"></el-input>
            </el-form-item>
            <el-form-item label="受理商ID(即微信支付商户号)：">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入ID"></el-input>
            </el-form-item>
            <el-form-item label="支付手续费：">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入支付手续费"></el-input>
            </el-form-item>
            <el-form-item label="货到付款：">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="在线支付：">
                <el-radio v-model="radio2" label="1">是</el-radio>
                <el-radio v-model="radio2" label="2">否</el-radio>
            </el-form-item>
            <div style="width: 100%;text-align: center">
                <el-button type="primary" style="margin:0 10px 10px 0" @click="handelSubmit">提交</el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    //编辑消息
    export default {
        name: "editPayWay",
        data(){
            return{
                titleName:this.$route.params.title,
                formLabelAlign:{
                    name:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                radio:'1',
                radio2:'1',
            }
        },
        created(){
            console.log(this.$route.params.title)
        },
        methods:{
            handelSubmit() {
                this.$refs.richTextEditor.getContent()
                    .then(val => {
                        console.log(val, 'vall')
                    });
            }
        }
    }
</script>

<style scoped>
    .editMessage{border: 1px solid #E4E4E4}
    .editMessage .title{border-bottom: 1px solid #E4E4E4;padding: 10px;margin: 0;font-size: 14px;margin-bottom: 20px;}

    .info-content{display: flex;flex-direction: column}
    .info-content .row{display: flex;flex-direction: row}
    .info-content .row span{display: flex;flex: 1;font-size: 12px}
</style>
