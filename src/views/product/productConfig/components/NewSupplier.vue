<template>
<RightSidePopup mask :visible.sync="visible" width="55%">
    <div style="font-size:20px;font-weight: bold;margin-bottom:40px;" class="title">{{this.id?'编辑供应商':'添加供应商'}}</div>
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="ruleForm">
            <el-form-item label="供应商名称：" prop="name" >
                <el-input v-model="ruleForm.name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="供应商英文名称：" prop="en_name">
                <el-input v-model="ruleForm.en_name"  style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact">
                <el-input v-model="ruleForm.contact" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
                <el-input v-model="ruleForm.phone" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号：" prop="bankno">
                <el-input v-model="ruleForm.bankno" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="银行账户：" prop="bank_name">
                <el-input v-model="ruleForm.bank_name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="银行开户行：" prop="bank_name">
                <el-input v-model="ruleForm.open_name" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="支付宝账号：" prop="alipay">
                <el-input v-model="ruleForm.alipay" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="微信号：" prop="weixin">
                <el-input v-model="ruleForm.weixin" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="ruleForm.address" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="ruleForm.sort" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-radio-group v-model="ruleForm.status" style="width: 180px;display: flex;height: 32px;align-items: center;">
                    <el-radio :label='10'>启用</el-radio>
                    <el-radio :label='0'>禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="简介：" prop="brief">
                <el-input type="textarea" :rows="4" v-model="ruleForm.brief" style="width: 180px;"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%;text-align: center">
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重 置</el-button> -->
            </el-form-item>
        </el-form>
    </RightSidePopup>
</template>

<script>
    export default {
        name: "NewSupplier",
        props:{
            show:[Boolean],
            id:{},
        },
        data() {
            return {
                visible:false,

                ruleForm: {
                    name: '',
                    en_name:'',
                    brief:'',
                    status:10,
                    bank_name:'',
                    open_name:'',
                    alipay:'',
                    weixin:'',
                    sort:10,
                },
                areaList:[],
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    sort: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                },
            };
        },
        watch: {
            visible(v){
                this.$emit('update:show',v)
            },
            show(v){
                this.visible = v
            },
            id(v){
                this.resetForm('ruleForm')
                if(v){
                    this.getData()
                }
            }
        },
        // created() {
        //     if(this.type =='edit'){
        //         this.getData();
        //     }
        // },
        methods: {
            async getData() {
                try {
                    const { data } = await this.$api.product.supplierDetail({id:this.id});
                    this.ruleForm = data;
                } catch (e) {
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.save();
                    }
                });
            },
            async save(){
                //编辑
                if(this.id){
                    this.ruleForm.id=this.id;
                    await this.$api.product.supplierEdit(this.ruleForm);
                }else {
                    await this.$api.product.supplierAdd(this.ruleForm);
                }
                this.$emit('fresh')
                this.visible = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped lang="scss">
    .new-ad {
        padding-top: 30px;
        background: #fff;
        .ruleForm {
            width: 60%;
            min-width: 600px;
            margin: 0 auto;
            padding: 10px;
        }
    }
    /*.new-ad .el-form-item--small.el-form-item{width: 260px}*/
</style>
