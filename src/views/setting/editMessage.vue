<template>
    <div class="editMessage">
        <p class="title" v-text="titleName"></p>
        <el-form label-position="right" style="width: 800px;margin: 0 auto" label-width="100px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
            <el-form-item label="消息类型：">
                <p>订单创建时</p>
            </el-form-item>
            <el-form-item label="标签说明：">
                <div class="info-content">
                    <div class="row">
                        <span>用户名：$Username$</span>
                        <span>订单号：$OrderId$</span>
                        <span>订单金额：$Total$</span>
                    </div>
                    <div class="row">
                        <span>配送方式：$Shipping_Type$</span>
                        <span>收货人姓名：$Shipping_Name$</span>
                        <span>收货人地址：$Shipping_Addr$</span>
                    </div>
                    <div class="row">
                        <span>收货人邮编：$Shipping_Zip$</span>
                        <span>收货人电话：$Shipping_Phone$</span>
                        <span>收货人手机：$Shipping_Cell$</span>
                    </div>
                    <div class="row">
                        <span>收货人Email：$Shipping_Email$</span>
                        <span>商城名称：$SiteName$</span>
                        <span>备注：$Memo$</span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="邮件标题：" prop="name">
                <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容模板：" prop="name">
                <!--<RichTextEditor  ref="richTextEditor"></RichTextEditor>-->
                <Tinymce ref="editor" :height="400" v-model="formLabelAlign.content"/>
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
        name: "editMessage",
        data(){
            return{
                titleName:this.$route.params.title,
                formLabelAlign:{
                    name:'',
                    content:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 1,  message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
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
