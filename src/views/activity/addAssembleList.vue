<template>
    <div class="new-ad">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm">
            <el-form-item label="最少参团人数" prop="min_num">
                <el-input v-model="ruleForm.min_num" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="最多团购数量"  prop="max_buy">
                <el-input v-model="ruleForm.max_buy"  style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="成团时长上限"  prop="keep_time">
                <el-input placeholder="请填写小时" v-model="ruleForm.keep_time" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="拼团返利金额"  prop="rebate">
                <el-input v-model="ruleForm.rebate" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="团购开始时间"  prop="start_time">
                <el-date-picker
                    style="width: 150px"
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="团购结束时间"  prop="end_time">
                <el-date-picker
                    style="width: 150px"
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="团购销量"  prop="sale_num">
                <el-input v-model="ruleForm.sale_num" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="团购状态">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label='10'>是</el-radio>
                    <el-radio :label='0'>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <!--<el-form-item label="选择商品：" prop="goods_id">-->
                <!--<el-select v-model="ruleForm.goods_id" placeholder="请选择">-->
                    <!--<el-option-->
                        <!--v-for="item in goodsoptions"-->
                        <!--:key="item.id"-->
                        <!--:label="item.title"-->
                        <!--:value="item.id">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="搜索商品">
                <el-input v-model="search" style="width: 150px"></el-input>
                <el-button type="primary" @click="serchData">搜索</el-button>
                <el-button type="primary" @click="getgoodsoptions">重置</el-button>
            </el-form-item>
            <el-form-item label="已选商品">
            <el-input v-model="chooseName" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="选择商品" prop="goods_id">
                <el-table
                    ref="singleTable"
                    :data="goodsoptions"
                    highlight-current-row
                    @cell-click="cellClick"
                    style="width: 100%">
                    <el-table-column
                        property="id"
                        label="id"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        property="title"
                        label="商品名称"
                        width="120">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <!--<el-form-item label="已选商品"  prop="sale_num">-->
                <!--<el-input v-model="ruleForm.sale_num" style="width: 150px"></el-input>-->
            <!--</el-form-item>-->

            <el-form-item style="width: 100%;text-align: center">
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "addAssembleList",
        data() {
            return {
                ruleForm: {
                    min_num: '',
                    max_buy: '',
                    start_time: '',
                    end_time: '',
                    keep_time: '',
                    sale_num:'',
                    status:10,
                    rebate:'',
                    id:'',
                    goods_id:''
                },
                rules: {
                    min_num: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    max_buy: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    start_time: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    keep_time: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    sale_num: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    rebate: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    goods_id: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                },
                id:this.$route.params.id,
                type:this.$route.params.type,
                goodsoptions:[],
                search:'',
                chooseName:'',
            };
        },
        created() {
            if(this.type == 'edit'){
                this.getData();
            }
            this.getgoodsoptions();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.save();
                    }
                });
            },
            async getgoodsoptions() {
                const {data} = await this.$api.activity.select();
                this.goodsoptions = data.list.items;
            },
            save() {
                //编辑
                const params = Object.assign({}, this.ruleForm);
                if (typeof params.start_time == 'object') {
                    params.start_time = params.start_time.getTime() / 1000;
                }
                if (typeof params.end_time == 'object') {
                    params.end_time = params.end_time.getTime() / 1000;
                }
                if (this.type == 'edit') {
                    this.$api.activity.groupbuyEdit(params);
                } else {
                    this.$api.activity.groupbuyAdd(params);
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async getData() {
                try {
                    if (this.type == 'edit') {
                        const {data} = await this.$api.activity.groupbuyDetail({id: this.id});
                        // data.status = data.status==0?false:true;
                        this.ruleForm = data;
                        this.chooseName = data.goodsName;
                    } else {
                        this.ruleForm.pid = this.$route.params.id;
                    }

                } catch (e) {
                }
            },
            cellClick(row) {
                console.log(row)
                this.ruleForm.goods_id = row.id;
                this.chooseName = row.title;
            },
            async serchData(){
                const {data} = await this.$api.activity.select({title:this.search});
                console.log(data)
                this.goodsoptions = data.list.items;
            },
        }
    }
</script>

<style scoped lang="scss">
    .new-ad {
        padding-top: 30px;
        background: #fff;
        .ruleForm {
            width: 40%;
            min-width: 690px;
            margin: 0 auto;
            padding: 10px;
        }
    }
    .el-input--small .el-input__inner{width: 120px}
</style>
