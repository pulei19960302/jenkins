<template>
    <div class="AddMemberType">
        <p class="title">添加粉丝类型</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="form">
            <el-form-item label="粉丝等级名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="成长值满足点" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="设为默认粉丝等级" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="0">否</el-radio>
                    <el-radio label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="免运费标准" prop="name">
                <el-input v-model="ruleForm.name">
                    <template slot="append">元/每笔</template>
                </el-input>
            </el-form-item>
            <el-form-item label="奖励评价" prop="name">
                <el-input v-model="ruleForm.name">
                    <template slot="append">成长值/条</template>
                </el-input>
            </el-form-item>
            <el-form-item label="满免运费特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="签到奖励特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="评价奖励特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="专享活动特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="粉丝特价特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="生日礼包特权" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'AddMemberType',
        props: {},
        components: {},
        data() {
            return {ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";
    .AddMemberType {
        .title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid $border;
            padding: 10px 0;
        }
        .form {
            padding-top: 10px;
            width: 60%;
        }
    }
</style>
