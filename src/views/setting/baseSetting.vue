<template>
    <div class="moreRules-content">
        <el-form label-position="right" style="" label-width="200px" :rules="rules" ref="ruleForm">
        <div class="card">
            <div class="left">
                <div class="left-gary">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>常规设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <el-form-item label="热门搜索关键字" prop="name">
                        <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="请用半角逗号(,)分隔多个关键字"></el-input>
                    </el-form-item>
                </div>
                <div class="row">
                    <el-form-item label="时间格式" prop="name">
                        <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="Y-m-d H:i:s"></el-input>
                    </el-form-item>
                </div>
                <div class="row">
                    <el-form-item label="退货上传图片凭证">
                        <el-input v-model="formLabelAlign.name" style="width: 200px" placeholder="设置数量限制"></el-input>
                    </el-form-item>
                </div>
                <div class="row">
                    <span class="word">商品评价是否需要审核：</span>
                    <template>
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="2">否</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">站点统计代码：</span>
                    <el-input style="max-width: 500px" type="textarea"></el-input>
                </div>
                <div class="row" prop="name">
                    <span class="word">商品默认图片：</span>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
            </div>
        </div>
        <div class="card span-bottom">
            <div class="left">
                <div class="left-gary">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>购物设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <span class="word">最小购物金额：</span>
                    <el-input style="max-width: 500px" placeholder="达到此购物金额才能提交订单"></el-input>
                </div>
                <div class="row">
                    <span class="word">是否开启自动确认收货：</span>
                    <template>
                        <el-radio v-model="radio" label="1">关闭</el-radio>
                        <el-radio v-model="radio" label="2">开启</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">能否开发票：</span>
                    <template>
                        <el-radio v-model="radio" label="1">能</el-radio>
                        <el-radio v-model="radio" label="2">不能</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">发票内容选项：</span>
                    <el-select v-model="value5" multiple placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="row">
                    <span class="word">减库存的时机：</span>
                    <template>
                        <el-radio v-model="radio" label="1">下订单时</el-radio>
                        <el-radio v-model="radio" label="2">发货时</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">增加销量的时机：</span>
                    <template>
                        <el-radio v-model="radio" label="1">发货时</el-radio>
                        <el-radio v-model="radio" label="2">付款时</el-radio>
                    </template>
                </div>
            </div>
        </div>
        <div class="card span-bottom">
            <div class="left">
                <div class="left-gary">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon_favorite"></use>
                    </svg>
                    <p>备注设置</p>
                </div>
            </div>
            <div class="right">
                <div class="row">
                    <span class="word">修改订单“发票信息”时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">修改订单“收货人信息”时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">修改订单“商品信息”时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">修改订单“费用信息”时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">关闭订单时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">取消订单时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">退货处理时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">退货确认收货时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">退款处理时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>
                <div class="row">
                    <span class="word">修改优币或成长值时：</span>
                    <template>
                        <el-radio v-model="radio" label="1">必须填写备注</el-radio>
                        <el-radio v-model="radio" label="2">无需填写备注</el-radio>
                    </template>
                </div>

            </div>

        </div>
            <div class="card span-bottom">
                <div class="left">
                    <div class="left-gary">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon_favorite"></use>
                        </svg>
                        <p>备注设置</p>
                    </div>
                </div>
                <div class="right">
                    <Tinymce ref="editor" :height="400" v-model="formLabelAlign.content"/>
                    <!--<RichTextEditor></RichTextEditor>-->
                </div>
            </div>
            <div class="bottom">
                <el-button type="primary">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "baseSetting",
        data() {
            return {
                value5:'',
                radio:'',
                formLabelAlign:{
                    name:'',
                    region:'',
                    type:'',
                    age:'',
                    day:'',
                    content: ''
                },
                rules: {
                    age: [
                        { required: true, message: '请输入天数', trigger: 'blur' },
                        { min: 1, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入分钟数', trigger: 'blur' },
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
                options:[
                    {value: 1, label: '日用品'},
                    {value: 2, label: '家居用品'},
                    {value: 3, label: '食品'},
                    {value: 4, label: '酒/饮料'},
                ]
            }
        }
    }
</script>

<style scoped>
    .moreRules-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .moreRules-content .left{  border-right: 1px solid #E4E4E4;width: 180px;padding-top: 50px}
    .moreRules-content .icon{color: #fff;font-size: 20px;}
    .left-gary{background-color: #9EA7B4;color: #fff;width: 180px;height: 50px;display: flex;flex-direction: row;
        justify-content: center;text-align: center;align-items: center;position: relative;
    }
    .card{display: flex;}
    .left-gary p{margin-left: 5px}
    .left-gary:after{
        content: '';
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 20px solid #9EA7B4;
        border-bottom: 25px solid transparent;
        position: absolute;
        right: -20px;
    }
    .right{display: flex;flex-direction: column;margin: 60px 50px 0;display: flex;justify-content: center;width: 100%}
    .right .row{display: flex;flex-direction: row;align-items: center;margin-bottom: 20px}
    .right .row .word{display: flex;width: 200px;justify-content: flex-end}
    .right .el-input{width: 200px}
    .right .row .supplement{margin-left: 10px}
    .bottom{
        margin: 10px 0;
        text-align: center;}
    .span-bottom .row{padding-bottom: 20px}
</style>
