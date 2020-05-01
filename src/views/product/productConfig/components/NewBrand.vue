<template>
<RightSidePopup mask :visible.sync="visible" width="50%">
    <div style="font-size:20px;font-weight: bold;margin-bottom:40px;" class="title">{{this.id?'编辑品牌':'添加品牌'}}</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm">
            <el-form-item label="品牌名称：" prop="name">
                <el-input v-model="ruleForm.name" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="品牌首字母：" prop="initial">
                <el-input v-model="ruleForm.initial" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="包含的分类：">
                <el-select v-model="ruleForm.cat_arr" multiple collapse-tags placeholder="请选择" style="width: 200px;">
                    <el-option
                        v-for="item in secondArycatoptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="ruleForm.sort" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="品牌故事：">
                <el-input type="textarea" :rows="6" v-model="ruleForm.description" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="是否显示：" prop="display_index">
                <el-radio-group v-model="ruleForm.display">
                    <el-radio :label=1>是</el-radio>
                    <el-radio :label=0>否</el-radio>
                </el-radio-group>
                <div class="tips">当品牌下还没有商品的时候，分类页的品牌区将不会显示该品牌</div>
            </el-form-item>
            <el-form-item label="品牌制造商：" prop="is_maker">
                <el-radio-group v-model="ruleForm.is_maker">
                    <el-radio :label='1'>是</el-radio>
                    <el-radio :label='0'>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="品牌LOGO：" prop="logo">
                <FileUpload v-bind:width="imgWidth" v-bind:height="imgHeight" v-bind:isOnly="true" v-bind:fileList="ruleForm.logo" v-on:successUploadCBK="getsuccessUpload"></FileUpload>
            </el-form-item>
            <el-form-item label="缩略图：" prop="thumb" class="thumb-class">
                <FileUpload v-bind:width="imgWidth" v-bind:height="imgHeight" v-bind:isOnly="true" v-bind:fileList="ruleForm.thumb" v-on:successUploadCBK="getsuccessUploadthumb"></FileUpload>
            </el-form-item>
            <el-form-item label="图集：">
                <FileUpload v-bind:width="imgWidth" v-bind:height="imgHeight" v-bind:isOnly="true" v-bind:fileList="ruleForm.imgs" v-on:successUploadCBK="getsuccessUploadImg"></FileUpload>
            </el-form-item>
            <el-form-item style="width: 100%;text-align: center">
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重 置</el-button> -->
            </el-form-item>
        </el-form>
    </RightSidePopup>
</template>

<script>
const formConstans = _=>{
    return {
                    name: '',
                    sort:'',
                    display:0,
                    is_maker:0,
                    thumb:[{url:''}],
                    imgs:[{url:''}],
                    logo:[{url:''}],
                    initial:'',
                    description:'',
                    cat_ids:'',
                    cat_arr:[],
                }
}
    export default {
        name: "NewBrand",
        props:{
            show:[Boolean],
            id:{},
        },
        data() {
            return {
                visible:false,
                ruleForm: formConstans(),
                areaList:[],
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    description: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    initial: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    describe: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    keywords: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    thumb: [
                        { required: true, message: '请上传', trigger: 'change' }
                    ],
                    logo: [
                        { required: true, message: '请上传', trigger: 'change' }
                    ],
                },
                secondArycatoptions:[],
                imgWidth:'100px',
                imgHeight:'100px',
            };
        },
        created() {
            // if(this.type =='edit'){
            //     this.getData();
            // }
            this.secondArycat();
        },
        watch:{
            visible(v){
                this.$emit('update:show',v)
            },
            show(v){
                this.visible = v
            },
            id(v){
                if(v){
                    this.getData()
                }
                if(!v){
                    this.ruleForm = formConstans()
                }
            }
        },
        methods: {
            async getData() {
                try {
                    const { data } = await this.$api.product.brandDetail({id:this.id});
                    let obj = {...data};
                    this.ruleForm = obj;
                    this.ruleForm.thumb = [{ name:data.id, url:data.thumb }];
                    this.ruleForm.logo=[{ name:data.id, url:data.logo }];
                    let arr = [];
                    for (let i=0;i<obj.imgs.length;i++){
                        arr.push({ name:obj.imgs[i], url:obj.imgs[i] });
                    }
                    this.ruleForm.imgs = arr;
                } catch (e) {
                }
            },
            async secondArycat() {
                try {
                    const { data } = await this.$api.product.secondArycat();
                    this.secondArycatoptions = data;
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
                const params = Object.assign({}, this.ruleForm);
                try{
                    params.logo = params.logo[0].url;
                    params.thumb = params.thumb[0].url;
                }catch(e){
                }
                params.cat_ids=params.cat_arr;
                if(this.id){
                    await this.$api.product.brandEdit(params);
                }else {
                    await this.$api.product.brandAdd(params);
                }
                this.$emit('fresh')
                this.visible = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getsuccessUpload(val){
                this.ruleForm.logo = [{ name:val, url:val }];
            },
            getsuccessUploadImg(val){
                
                this.ruleForm.imgs = ({ name:val, url:val });
            },
            getsuccessUploadthumb(val){
                this.ruleForm.thumb = [{ name:val, url:val }];
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
            min-width: 650px;
            margin: 0 auto;
            padding: 10px;
        }
    }
    /*.el-input--small .el-input__inner{width: 120px}*/
    /*.thumb-class .el-form-item__label{width: 120px!important;}*/
</style>
