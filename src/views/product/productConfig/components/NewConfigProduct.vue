<template>
<RightSidePopup mask :visible.sync="visible" width="50%">
    <div style="font-size:20px;font-weight: bold;margin-bottom:40px;" class="title">{{this.id?'编辑分类':'添加分类'}}</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="pid">
                <el-cascader
                    style="width: 200px"
                    change-on-select
                    filterable
                    expand-trigger="hover"
                    :options="areaList"
                    v-model="ruleForm.pid">
                </el-cascader>
                <p class="tips">不选择分类默认为顶级分类</p>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input v-model="ruleForm.num" disabled style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="ruleForm.sort" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="display">
                <el-radio-group v-model="ruleForm.display">
                    <el-radio :label='1'>是</el-radio>
                    <el-radio :label='0'>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否显示在导航栏" prop="display_index">
                <el-radio-group v-model="ruleForm.display_index">
                    <el-radio :label=1>是</el-radio>
                    <el-radio :label=0>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分类图标" prop="thumb">
               <FileUpload v-bind:isOnly="true" v-bind:fileList="ruleForm.thumb" v-on:successUploadCBK="getsuccessUpload"></FileUpload>
            </el-form-item>
            <el-form-item label="主推图" prop="thumb">
                <FileUpload v-bind:isOnly="true" v-bind:fileList="ruleForm.imgs" v-on:successUploadCBK="getsuccessUpload2"></FileUpload>
            </el-form-item>
            <div style="width: 100%;text-align: center">
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重 置</el-button> -->
            </div>
        </el-form>
    </RightSidePopup>  
</template>

<script>
    export default {
        name: "NewConfigProduct",
        props:{
            show:[Boolean],
            id:{}
        },
        data() {
            return {
                visible:false,

                ruleForm: {
                    name: '',
                    num: '',
                    delivery: false,
                    resource: '',
                    desc: '',
                    display:0,
                    display_index:0,
                    pid: [],
                    thumb:[],
                    imgs:[],
                    sort: 10
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    pid: [
                        { required: false, message: '请选择', trigger: 'change' }
                    ],
                    num: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    describe: [
                        { required: false, message: '请填写', trigger: 'blur' }
                    ],
                    keywords: [
                        { required: false, message: '请填写', trigger: 'blur' }
                    ]
                },
                areaList: [],
            };
        },
        watch:{
            visible(v){
                this.$emit('update:show',v)
            },
            show(v){
                this.visible = v
            },
            id(v){
                this.resetForm('ruleForm')
                if(!v){
                    this.ruleForm.thumb = [{url:''}]
                    this.ruleForm.imgs = [{url:''}]
                }
                this.getData()
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.save();
                    }
                });
            },
            async save(){
                // 编辑
                const params = Object.assign({}, this.ruleForm);
                if(params.thumb && params.thumb.length > 0) {
                    params.thumb = [params.thumb[0].url];
                } else {
                    params.thumb = [];
                }
                if(params.imgs && params.imgs.length > 0) {
                    params.imgs = [params.imgs[0].url];
                } else {
                    params.imgs = [];
                }
                if(params.pid) {
                    params.position = [...this.ruleForm.pid].join(','); // 全路径
                    params.pid = [...this.ruleForm.pid].splice(-1, 1)[0]; // pid
                }
                if(this.id){
                    await this.$api.product.goodEdit(params);
                }else {
                    await this.$api.product.goodAdd(params);
                }
                this.$emit('fresh')
                this.visible = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async getData() {
                try {
                    const { data } = await this.$api.product.goodsDetail({ id: this.id });
                    this.areaList = this.delEmypt(data.allCat.children);
                    if(!this.id)return
                    this.ruleForm = data.detail;
                    this.ruleForm.pid = [...data.detail.position.split(',')];
                    this.ruleForm.thumb=[{ name:data.detail.id, url:data.detail.thumb[0] }];
                    this.ruleForm.imgs=[{ name:data.detail.id, url:data.detail.imgs[0] }];
                } catch (e) {
                }
            },
            /**
             * 递归删除空子集
             * @param arr
             * @returns {*}
             */
            delEmypt(arr) {
                arr.map(val => {
                    if(val.children && val.children.length > 0) this.delEmypt(val.children);
                    if(val.children && val.children.length === 0) delete val.children;
                })
                return arr;
            },
            getsuccessUpload(val){
                this.ruleForm.thumb = [{ name:'thumb', url:val[0] }];
            },
            getsuccessUpload2(val){
                this.ruleForm.imgs = [{ name:'imgs', url:val[0] }];
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
            min-width: 630px;
            margin: 0 auto;
            padding: 10px;
        }
    }
    .el-input--small .el-input__inner{width: 120px}
</style>
