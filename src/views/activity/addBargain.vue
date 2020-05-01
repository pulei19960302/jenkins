<template>
    <div class="new-ad">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm">
            <el-form-item label="砍价商品" prop="goods_id">
                <el-select
                    @change="handleChange($event, allGoods)"
                    v-model="ruleForm.goods_id"
                    placeholder="请选择商品"
                    filterable
                    clearable>
                    <el-option
                        v-for="item in allGoods"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品原价" prop="price">
                <el-input v-model="ruleForm.price" style="width: 220px">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="成本价">
                <el-input v-model="cost_price" style="width: 220px" disabled>
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="商品销量"  prop="sale_num">
                <el-input v-model="ruleForm.sale_num"  style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="商品库存"  prop="stock">
                <el-input v-model="ruleForm.stock" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="最低砍价次数" prop="min_count">
                <el-input v-model="ruleForm.min_count" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="开始时间"  prop="start_time">
                <el-date-picker
                    value-format="timestamp"
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间"  prop="end_time">
                <el-date-picker
                    value-format="timestamp"
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label='10'>开启</el-radio>
                    <el-radio :label='0'>关闭</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="width: 100%;text-align: center">
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: "addBargain",
        data() {
            return {
                cost_price: '',
                ruleForm: {
                    price: '',
                    start_time: '',
                    end_time: '',
                    stock: '',
                    sale_num:'',
                    status:10,
                    id:'',
                    goods_id:''
                },
                rules: {
                    price: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],start_time: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    stock: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    sale_num: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    goods_id: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    min_count: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                },
                id:this.$route.params.id,
                type:this.$route.params.type,
                search:'',
                chooseName:'',
            };
        },
        computed: {
            ...mapState('product', ['allGoods'])
        },
        created() {
            if(this.type == 'edit') this.getData();
        },
        methods: {
            handleChange(goods_id, allGoods) {
                this.ruleForm.price = allGoods.filter(v => v.id === goods_id)[0].shop_price;
                this.cost_price = allGoods.filter(v => v.id === goods_id)[0].cost_price;
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
                params.start_time= params.start_time/1000;
                params.end_time= params.end_time/1000;
                if(this.type == 'edit'){
                    await this.$api.activity.bargainEdit(params);
                }else {
                    await this.$api.activity.bargainAdd(params);
                }
                this.$router.push({ name: 'bargainList' });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async getData() {
                try {
                    if(this.type == 'edit'){
                        const { data } = await this.$api.activity.bargainDetail({id:this.id});
                        this.ruleForm = data;
                        this.ruleForm.start_time = data.start_time*1000;
                        this.ruleForm.end_time = data.end_time*1000;
                    }else {
                        this.ruleForm.pid = this.$route.params.id;
                    }
                } catch (e) {
                }
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
    /*.el-input--small .el-input__inner{width: 120px}*/
</style>
