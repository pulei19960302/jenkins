<template>
    <div class="new-ad">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="ruleForm">
            <el-form-item label="参数名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="参数排序" prop="sort">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>
            <!--<el-form-item label="商品类型" prop="region">-->
                <!--<el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width: 50%;">-->
                    <!--<el-option label="区域一" value="shanghai"></el-option>-->
                    <!--<el-option label="区域二" value="beijing"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="分类筛选样式" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="普通"></el-radio>-->
                    <!--<el-radio label="颜色"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="能否进行检索" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="不需要检索"></el-radio>-->
                    <!--<el-radio label="关键字检索"></el-radio>-->
                    <!--<el-radio label="范围检索"></el-radio>-->
                <!--</el-radio-group>-->
                <!--<p class="tips">不需要该属性成为检索商品条件的情况请选择不需要检索，需要该属性进行关键字检索商品时选择关键字检索，如果该属性检索时希望是指定某个范围时，选择范围检索。</p>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="相同属性值的商品是否关联" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="是"></el-radio>-->
                    <!--<el-radio label="否"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="属性是否可选" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="唯一属性"></el-radio>-->
                    <!--<el-radio label="单选属性"></el-radio>-->
                    <!--<el-radio label="复选属性"></el-radio>-->
                <!--</el-radio-group>-->
                <!--<p class="tips">选择"单选/复选属性"时，可以对商品该属性设置多个值，同时还能对不同属性值指定不同的价格加价，用户购买商品时需要选定具体的属性值。选择"唯一属性"时，商品的该属性值只能设置一个值，用户只能查看该值。</p>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="该属性值的录入方式" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="手工录入"></el-radio>-->
                    <!--<el-radio label="从下面的列表中选择（一行代表一个可选值）"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <el-form-item label="参数值可选值列表">
                <el-input type="textarea" v-model="ruleForm.name"></el-input>
                <p class="tips">请用 , 分隔开</p>
            </el-form-item>
            <!--<el-form-item label="数量单位" required>-->
                <!--<el-input v-model="ruleForm.name"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="参数值排序">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!--<el-form-item label="是否显示" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="是"></el-radio>-->
                    <!--<el-radio label="否"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="是否支持手动新增" prop="resource">-->
                <!--<el-radio-group v-model="ruleForm.resource">-->
                    <!--<el-radio label="是"></el-radio>-->
                    <!--<el-radio label="否"></el-radio>-->
                <!--</el-radio-group>-->
            <!--</el-form-item>-->

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <!-- <el-button plain @click="resetForm('ruleForm')">重 置</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NewParameters",
        data() {
            const colors = ['黑色', '红色', '白色', '粉色'];
            return {
                checkedColors: ['黑色', '白色'],
                colors,
                ruleForm: {
                    name: '',
                    sort: '',
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
                    sort: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
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
            },
            handleCheckedChange(value) {

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


    .card{display: flex;}
    .right{display: flex;flex-direction: column;margin: 0px 50px 0;display: flex;justify-content: center;width: 100%}
    .right .row{display: flex;flex-direction: row;align-items: center;margin-bottom: 20px;justify-content: center}
    .right .row .word{display: flex;width: 200px;justify-content: flex-end}
    .right .el-input{width: 200px}
    .right .row .supplement{margin-left: 10px}
</style>
