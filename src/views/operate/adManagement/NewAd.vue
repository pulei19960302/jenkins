<template>
    <div class="new-ad">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="广告名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
                <p class="tips">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</p>
            </el-form-item>
            <el-form-item label="广告位置" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 50%;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" required>
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 50%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="结束时间" required>
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 50%;"></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="上线/下线" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="上线"></el-radio>
                    <el-radio label="下线"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告图片" prop="name">
                <el-upload
                    style="width: 50%;"
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="广告链接" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="广告备注" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NewAd",
        data() {
            return {
                ruleForm: {
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
                    ],
                    region: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ]
                }
            };
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
    .new-ad {
        padding-top: 30px;
        background: #fff;
        .ruleForm {
            width: 40%;
            margin: 0 auto;
            padding: 10px;
        }
    }
</style>
