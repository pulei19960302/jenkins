<template>
    <div class="new-ad">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm">
            <el-form-item label="相册名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="相册封面：" prop="name">
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
            <el-form-item label="相册描述：" prop="desc">
                <el-input
                    type="textarea"
                    v-model="ruleForm.desc"
                    :autosize="{ minRows: 5, maxRows: 10}"></el-input>
            </el-form-item>
            <el-form-item label="排序：" required>
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NewPictureLibrary",
        data() {
            return {
                ruleForm: {
                    name: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
            width: 30%;
            margin: 0 auto;
            padding: 10px;
        }
    }
</style>
