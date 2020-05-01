<template>
    <div class="createSpecial">
        <!-- <p class="title">专题/活动板式</p> -->
        <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="专题/活动名称：" prop="name" :rules="[simpleRule]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="专题/活动数量：">
                <el-radio-group v-model="form.num" @change="onRadioChange">
                    <el-radio v-for="item in [1, 2, 3]" :key="item" :label="item">{{item}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="板式：" class="banner-style">
                <div v-for="(item) in ['1', '2', '3']" :key="item" class="banner-line" v-show="form.num === parseInt(item, 10)">
                    <div class="banner-in" v-if="item === '1'" @click="onChooseBanner('style_1_1', '1')"
                        :class="'style_1_1' + (form.plate_index === 'style_1_1' ? ' choose' : '')">
                        <div class="block">图一</div>
                    </div>
                    <div v-for="itemIn in ['style_2_1', 'style_2_2']" :key="itemIn" class="banner-in"
                        @click="onChooseBanner(itemIn, '2')" v-else-if="item === '2'"
                        :class="itemIn + (form.plate_index === itemIn ? ' choose' : '')">
                        <div class="block">图一</div>
                        <div class="block">图二</div>
                    </div>
                    <div v-for="itemIn in ['style_3_1', 'style_3_2', 'style_3_3']" :key="itemIn" class="banner-in"
                        @click="onChooseBanner(itemIn, '3')" v-else-if="item === '3'"
                        :class="itemIn + (form.plate_index === itemIn ? ' choose' : '')">
                        <div class="block">图一</div>
                        <div class="block">图二</div>
                        <div class="block">图三</div>
                    </div>
                </div>
            </el-form-item>
            <div>专题/活动内容：</div>
            <div class="special" v-for="(item, index) in ['图一', '图二', '图三']" :key="item" v-show="form.num >= index + 1">
                <div style="text-align: center">{{`${item}设置`}}</div>
                <el-form-item label="主图：" :class="form.plate_index" style="width: 500px">
                    <FileUpload
                        width="100px"
                        height="100px"
                        :isOnly="true"
                        :fileList="form.contents[index].image ? [{ name: 'imgae', url: form.contents[index].image }] : undefined"
                        @successUploadCBK="img => getsuccessUpload(img, index)"/>
                </el-form-item>
                <div class="el-upload__tip" style="text-indent: 150px;margin-bottom:10px;" slot="tip">
                    建议尺寸 {{
                        getSizeText(index)
                    }}
                </div>
                <el-form-item label="类型：">
                    <el-radio-group v-model="form.contents[index].type">
                        <el-radio v-for="(value, key) in TARGET_ID" :key="key"
                            :label="key">{{value}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="详细内容：" v-show="form.contents[index].type === '1'">
                    <el-select v-model="form.contents[index].target_id" placeholder="请选择">
                        <el-option
                            v-for="item in targetList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-select v-model="form.contents[index].goods_id" placeholder="请选择" v-show="form.contents[index].type === '2'">
                        <el-option
                            v-for="item in goodsList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select> -->
                </el-form-item>
            </div>
        </el-form>
        <div class="submit-btn">
            <el-button type="primary" size="medium" @click="submit('form')" v-permission="[$api.setting.specialActivity.edit]">提交</el-button>
        </div>
    </div>
</template>

<script>
    const TARGET_ID = {
        '1': '专题',
        // '2': '拼团'
    }
    const FORM = {
        plate_index: 'style_3_1',
        plate_type: '1',
        num: 3,
        contents: [{
            type: '1'
        }, {
            type: '1'
        } ,{
            type: '1'
        }],
    }
    export default {
        name: 'createSpecial',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: undefined
            }
        },
        data() {
            return {
                form: {...FORM},
                TARGET_ID,
                simpleRule: {required: true, message: '必填项', trigger: 'change'},
                oldForm: {...FORM},
                targetList: [],
                goodsList: [],
                rules: {}
            }
        },
        computed: {
            getSizeText() {
                return function(index) {
                    let text
                    let { plate_index } = this.form
                    if (index === 0) {
                        if (plate_index === 'style_1_1' ) {
                            return '710px×180px'
                        } else if (plate_index === 'style_2_2' || plate_index === 'style_3_1') {
                            return '710px×160px'
                        } else if (plate_index === 'style_2_1') {
                            return '346px×260px'
                        } else if (plate_index === 'style_3_3') {
                            return '220px×220px'
                        } else if (plate_index === 'style_3_2') {
                            return '346px×160px'
                        }
                    }
                    if (index === 1) {
                        if (plate_index === 'style_2_1') {
                            return '346px×260px'
                        } else if (plate_index === 'style_2_2') {
                            return '710px×220px'
                        } else if (plate_index === 'style_3_1') {
                            return '346px×220px'
                        } else if (plate_index === 'style_3_2') {
                            return '346px×160px'
                        } else if (plate_index === 'style_3_3') {
                            return '220px×220px'
                        }
                    }
                    if (index === 2) {
                        if (plate_index === 'style_3_1') {
                            return '346px×220px'
                        } else if (plate_index === 'style_3_2') {
                            return '710px×220px'
                        } else if (plate_index === 'style_3_3') {
                            return '220px×220px'
                        }
                    }
                }
            }
        },
        watch: {
            visible (val) {
                if (this.isChange) {
                    this.isChange = false
                    return
                }
                if (!val) {
                    if (JSON.stringify(this.form) !== JSON.stringify(this.oldForm)) {
                        this.$confirm('您还未提交内容，是否要退出？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.init()
                        }).catch(() => {
                            this.$emit('update:visible', !val)
                            this.isChange = true
                        })
                    } else {
                        this.init()
                    }
                } else {
                    if (this.data) {
                        let { content, ...other } = this.data
                        for (let i = content.length; i < 3; i++) {
                            content[i] = {
                                type: '1'
                            }
                        }
                        other.num = parseInt(other.num, 10)
                        this.form = {
                            ...other,
                            contents: [...content]
                        }
                        this.oldForm = {
                            ...other,
                            contents: [...content]
                        }
                    } else {
                        this.init()
                    }
                }
            }
        },
        mounted() {
            this.$api.activity.getSpecialList({}).then(res => {
                this.targetList = res.data.data
            }).catch((err)=>{ })
        },
        methods: {
            onRadioChange(v) {
                this.form.plate_type = v.toString()
                this.form.plate_index = `style_${v}_1`
            },
            init () {
                this.form = {...FORM}
                this.oldForm = {...FORM}
                this.form.contents.forEach(v => {
                    v.image = ''
                })
            },
            onChooseBanner (plate_index, plate_type) {
                this.form.plate_index = plate_index // 板式编号
                this.form.plate_type = plate_type // 板式数
            },
            getsuccessUpload(img, num) {
                if (!this.form.contents[num]) this.form.contents[num] = {}
                this.form.contents[num][`image`] = img[0]
            },
            vail (form) {
                let isVail = true
                let propmtText = ''
                for (let i = 0; i < this.form.num; i++) {
                    if (!this.form.contents[i].image) {
                        propmtText = '请上传板式图片'
                        isVail = false
                        break
                    }
                    if (this.form.contents[i].type === '1' && !this.form.contents[i].target_id) {
                        propmtText = '请选择专题详细内容'
                        isVail = false
                        break
                    }
                }
                if (!isVail) {
                    this.$message({
                        showClose: true,
                        message: propmtText,
                        type: 'error'
                    })
                }
                return isVail
            },
            submit (formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid && this.vail()) {
                        let contents = [...this.form.contents]
                        for (let i = 2; i >= parseInt(this.form.num); i--) {
                            contents.splice(i, 1)
                        }
                        let data = {
                            ...this.form,
                            contents
                        }
                        let app
                        if (data.id) {
                            app = this.$api.setting.editSpecialActivity(data)
                        } else {
                            app = this.$api.setting.addSpecialActivity(data)
                        }
                        app.then(res => {
                            this.$message({
                                type: 'success',
                                message: data.id ? '修改成功!' : '添加成功!'
                            })
                            if(this.visible) {
                                this.init()
                                this.$emit('update:visible', false)
                            }
                        }).catch((err)=>{ })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-form-item {
        width: 400px
    }
    .banner-style {
        width: 780px;
        .banner-line {
            margin-top: 20px;
            overflow: hidden;
            
            &:first-child {
                margin-top: 0;
            }
            .banner-in {
                float: left;
                width: 200px;
                height: 140px;
                border: 1px solid #eeeeee;
                cursor: pointer;
                .block {
                    color: #eeeeee;
                    background-color: #eeeeee;
                    text-align: center;
                }
                margin-left: 10px;
                &:first-child {
                    margin-left: 0;
                }
                &.style_1_1 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 100%;
                        height: 70px;
                        margin-top: 25px;
                        line-height: 70px;
                    }
                }
                &.style_2_1 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 46%;
                        line-height: 80px;
                        float: left;
                        margin-left: 8%;
                        margin-top: 20px;
                        &:first-child {
                            margin-left: 0;
                        }
                    }
                }
                &.style_2_2 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 100%;
                        line-height: 55px;
                        margin-top: 10px;
                        &:first-child {
                            line-height: 35px;
                        }
                    }
                }
                &.style_3_1 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 100%;
                        line-height: 35px;
                        margin-top: 10px;
                        &:nth-child(2), &:nth-child(3){
                            line-height: 55px;
                            width: 45%;
                            float: left;
                        }
                        &:nth-child(3){
                            margin-left: 17px;
                        }
                    }
                }
                &.style_3_2 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 100%;
                        line-height: 55px;
                        margin-top: 55px;
                        &:nth-child(1), &:nth-child(2){
                            line-height: 35px;
                            width: 45%;
                            float: left;
                            margin-top: 10px;
                        }
                        &:nth-child(2){
                            margin-left: 17px;
                            &::after{
                                clear:both;content:'';display:block;width:0;height:0;visibility:hidden;
                            }
                        }
                    }
                }
                &.style_3_3 {
                    margin-top: 0px;
                    padding: 10px;
                    .block {
                        width: 30%;
                        line-height: 60px;
                        float: left;
                        margin-left: 4.5%;
                        margin-top: 30px;
                        &:first-child {
                            margin-left: 0;
                        }
                    }
                }
                &:hover, &.choose {
                    border: 1px solid #1890ff;
                }
                &.choose {
                    .block {
                        color: #ffffff;
                        background-color: #1890ff !important;
                    }
                }
            }
        }
    }
    
    .special {
        widows: 100%;
        padding-top: 15px;
        padding-bottom: 5px;
        margin-top: 10px;
        background-color: #f3f3f3;
        overflow: hidden;
        .a {
            .banner-label {
                .in2, .in3 {
                    display: none;
                }
            }
            .file-up:nth-child(2), .file-up:nth-child(3) {
                display: none;
            }
        }
        .b {
            .banner-label {
                .in3 {
                    display: none;
                }
            }
            .file-up:nth-child(3) {
                display: none;
            }
        }
        .banner-label {
            overflow: hidden;
            .in {
                float: left;
                width: 100px;
                text-align: center;
                margin-left: 10px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
        /deep/ .file-up{
            float: left;
            width: 100px;
            margin-left: 10px;
            &.first {
                margin-left: 0;
            }
            & /deep/ .el-upload {
                width: 100%;
                .el-upload-dragger {
                    min-width: auto;
                    height: 100px;
                    & > img {
                        width: 100%;
                    }
                }
            }
        }
    }
    .submit-btn {
        text-align: center;
        margin-top: 20px;
    }
    /deep/ .el-form-item__label {
        width: 140px !important;
    }
    /deep/ .el-form-item__content {
        margin-left: 140px !important;
    }
    
    
</style>
