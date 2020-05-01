<template>
    <div class="moreRules-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="mini" class="form">
            <div class="col-one">
                <el-form-item label="优惠券名称:" prop="name" :rules="[simpleRule]">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="总发行量:" prop="num" :rules="[simpleRule]">
                    <el-input type="number" v-model="form.num" placeholder="只能输入正整数，最小为1">
                        <template slot="append">张</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="面额:" prop="money" :rules="[simpleRule]">
                    <el-input type="number" v-model="form.money" placeholder="只能在0.01-10000之间">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="限制数量:" prop="user_num" :rules="[simpleRule]">
                    <el-input type="number" maxlength="2" v-model="form.user_num" placeholder="只能输入正整数，最小为1">
                        <template slot="append">张</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="满金额:" >
                    <el-radio-group v-model="lessMoney">
                        <el-radio :label="0">无限制</el-radio>
                        <el-radio :label="1">满
                            <el-input type="number" v-model="form.max" style="width: 162px;"><template slot="append">可用</template></el-input>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否叠加:" prop="is_overlay">
                    <el-switch v-model="form.is_overlay" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="领取开始时间:" prop="start_at" :rules="[simpleRule]">
                    <el-date-picker
                        value-format="timestamp"
                        size="mini"
                        v-model="form.start_at"
                        type="datetime"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="领取结束时间:" prop="end_at" :rules="[simpleRule]">
                    <el-date-picker
                        value-format="timestamp"
                        size="mini"
                        v-model="form.end_at"
                        type="datetime"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="优惠券开始时间:" prop="ding_at" :rules="[simpleRule]">
                    <el-date-picker
                        value-format="timestamp"
                        size="mini"
                        v-model="form.ding_at"
                        type="datetime"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="优惠券结束时间:" prop="ding_at_end" :rules="[simpleRule]">
                    <el-date-picker
                        value-format="timestamp"
                        size="mini"
                        v-model="form.ding_at_end"
                        type="datetime"
                        placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="参与用户:" prop="member_type" :rules="[simpleRule]">
                    <el-checkbox-group
                        v-model="form.member_type"
                        :min="1">
                        <el-checkbox v-for="user in users" :label="user.value" :key="user.value">{{user.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="优惠券描述:" prop="description" :rules="[simpleRule]">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </div>
            <!--<div class="card">-->
                <!--<div class="right">-->
                    <!--<el-row :gutter="20">-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="优惠券名称:" prop="name" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.name"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="优惠券描述:" prop="description" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.description"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="优惠券数量:" prop="num" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.num"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="排序:" prop="sort" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.sort"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row :gutter="20">-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="优惠券类型:" prop="type" :rules="[simpleRule]">-->
                                <!--<el-select v-model="form.type" style="width: 200px;" clearable filterable>-->
                                    <!--<el-option-->
                                        <!--v-for="item in types"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.label"-->
                                        <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="商品供应商:" prop="supplier_id">-->
                                <!--<el-select v-model="form.supplier_id" style="width: 200px;" clearable filterable>-->
                                    <!--<el-option-->
                                        <!--v-for="item in suppliers"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="商品分类:" prop="cat_id">-->
                                <!--<el-select v-model="form.cat_id" style="width: 200px;" clearable filterable>-->
                                    <!--<el-option-->
                                        <!--v-for="item in allCategories"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="商品品牌:" prop="brand_id">-->
                                <!--<el-select v-model="form.brand_id" style="width: 200px;" clearable filterable>-->
                                    <!--<el-option-->
                                        <!--v-for="item in brands"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row :gutter="20">-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="满金额:" prop="max" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.max"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="减金额:" prop="money" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.money"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="限制数量:" prop="user_num" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.user_num"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="是否叠加:" prop="is_overlay">-->
                                <!--<el-switch v-model="form.is_overlay" :active-value="1" :inactive-value="0"></el-switch>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row :gutter="20">-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="开始时间:" prop="start_at" :rules="[simpleRule]">-->
                                <!--<el-date-picker-->
                                    <!--value-format="timestamp"-->
                                    <!--size="mini"-->
                                    <!--v-model="form.start_at"-->
                                    <!--type="datetime"-->
                                    <!--placeholder="">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="结束时间:" prop="end_at" :rules="[simpleRule]">-->
                                <!--<el-date-picker-->
                                    <!--value-format="timestamp"-->
                                    <!--size="mini"-->
                                    <!--v-model="form.end_at"-->
                                    <!--type="datetime"-->
                                    <!--placeholder="">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="指定日期:" prop="ding_at">-->
                                <!--<el-date-picker-->
                                    <!--value-format="timestamp"-->
                                    <!--size="mini"-->
                                    <!--v-model="form.ding_at"-->
                                    <!--type="datetime"-->
                                    <!--placeholder="">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--<el-form-item label="有效天数:" prop="day" :rules="[simpleRule]">-->
                                <!--<el-input v-model="form.day"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--</div>-->
            <!--</div>-->
            <el-form-item label="可使用商品:" >
                <el-radio-group v-model="addProduct">
                    <el-radio :label="0">全场通用</el-radio>
                    <el-radio :label="1">指定商品</el-radio>
                </el-radio-group>
            </el-form-item>
            <div class="card" v-if="addProduct==1">
                <div class="right">
                    <el-form-item label="添加商品:" prop="goods_ids">
                        <el-select
                            v-model="form.goods_ids"
                            placeholder="请选择商品"
                            style="width: 620px"
                            multiple
                            collapse-tags
                            filterable
                            clearable>
                            <el-option
                                v-for="item in goods"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <p class="mt20 tips">已关联 <b style="color: #000;">{{form.goods_ids.length}}</b> 件商品</p>
                        <el-table
                            max-height="400"
                            size="mini"
                            border
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                                width="100"
                                align="center"
                                prop="id"
                                label="商品编号">
                            </el-table-column>
                            <el-table-column
                                align="left"
                                prop="title"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="商品图片">
                                <template slot-scope="scope">
                                    <img :src="scope.row.thumb" class="table-img" @click="previewImg=scope.row.thumb;visible = true" />
                                </template>
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="shop_price"
                                label="售价（元）">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="cost_price"
                                label="成本价（元）">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                    <p @click="handleDel(scope.row.id)" style="color: red;cursor: pointer">删除</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="complete">
            <el-button type="success" @click="handelSubmit('form')">提 交</el-button>
        </div>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { activity } from '@/assets/constant';

    export default {
        name: "AddCoupon",
        props:["id"],
        data() {
            const validateCommon = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项'));
                    return;
                }
                callback();
            };
            const {id} = this.$route.params;
            return {
                visible: false,
                previewImg: '',
                simpleRule: {required: true, message: '必填项', trigger: 'change'},
                types: [...activity.COUPON_TYPES],
                goods: [],
                brands: [],
                suppliers: [],
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                form: {
                    name: '',
                    num: '',
                    money: '',
                    user_num: '',
                    max: '',
                    is_overlay: 0,
                    goods_ids: [],
                    member_type:['1'],
                    start_at: '',
                    end_at: '',
                    ding_at: '',
                    ding_at_end: '',
                    description: ''

                },
                rules: {},
                lessMoney:0,
                users:[
                    {value:'1',label:'普通用户'},
                    {value:'2',label:'会员'},
                    {value:'3',label:'白银'},
                    {value:'5',label:'合伙人'},
                ],
                addProduct:0
            }
        },
        computed: {
            ...mapState('product', ['allGoods', 'allCategories'])
        },
        watch: {
            'form.goods_ids'(val) {
                if (val && val.length > 0) {
                    this.tableData = this.goods.filter(curr => val.includes(curr.id));
                } else {
                    this.tableData = [];
                }
            },
            lessMoney(){
                if(this.lessMoney==0){
                    this.form.max='';
                }
            },
            'form.max'(val){
                if(val!=''){
                    this.lessMoney=1
                }
            },
            id(v){
                if(v){
                    this.id = v
                    this.couponDetail(this.id)
                }else{
                    console.log(111)
                    this.$refs['form'].resetFields();
                }
            }
        },
        mounted() {
            this.goods = this.allGoods;
            this.getBrands();
            this.getSuppliers();
        },
        methods: {
            // 商品品牌
            async getBrands() {
                try {
                    const {data} = await this.$api.product.brandList();
                    this.brands = data.items;
                } catch (e) {
                }
            },
            // 商品供应商
            async getSuppliers() {
                try {
                    const {data} = await this.$api.product.supplierList();
                    this.suppliers = data.items;
                } catch (e) {
                }
            },
            // 优惠券详情
            async couponDetail(id) {
                try {
                    const {data} = await this.$api.activity.couponDetail({id});
                    this.form = data;
                    this.form.ding_at = data.ding_at * 1000;
                    this.form.ding_at_end=data.ding_at_end * 1000;
                    this.form.end_at = data.end_at * 1000;
                    this.form.start_at = data.start_at * 1000;
                    this.form.cat_id = String(data.cat_id);
                    this.form.goods_ids = !data.goods_ids ? [] : data.goods_ids.split(',').map(val => Number(val));
                    if(data.goods_ids!=''){this.addProduct=1}
                } catch (e) {
                    throw new Error(e);
                }
            },
            handlePreview(item) {
                if (!item) return;
                this.imgSrc = item;
                this.visible = true;
            },
            imgSuccessUploadCBK(val, type) {
                this[type] = [...val];
            },
            // 删除所选商品
            handleDel(id) {
                this.form.goods_ids = this.form.goods_ids.filter(curr => curr != id);
            },
            handelSubmit(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            params.goods_ids = params.goods_ids.join(',');
                            params.ding_at = params.ding_at / 1000;
                            params.ding_at_end = params.ding_at_end / 1000;
                            params.end_at = params.end_at / 1000;
                            params.start_at = params.start_at / 1000;

                            params.member_type=params.member_type.join(',');
                            if(this.lessMoney==0){
                                params.max=0;
                            }
                            // 编辑
                            if (this.id) {
                                params.id = this.id;
                                await this.$api.activity.couponEdit(params);
                                // 新建
                            } else {
                                await this.$api.activity.couponAdd(params);
                            }
                            this.$emit('refresh')
                        } catch (e) {
                            throw new Error(e);
                        }
                    } else {
                        this.$message.error('请确认信息是否填写完整');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";

    .moreRules-content {
        background: #fff;
        padding: 10px;
        text-align: center;
        .form {
            text-align: left;
        }
        .complete {
            position: fixed;
            bottom: 0;
            // left: 0;
            z-index: 70;
            width: 1050px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background-color: #fff;
            opacity: 0.9;
            button {
                width: 140px;
            }
        }
    }

    .moreRules-content .left {
        border-right: 1px solid #E4E4E4;
        width: 180px;
        padding-top: 20px
    }

    .moreRules-content .icon {
        color: #fff;
        font-size: 20px;
    }

    .left-gary {
        background-color: #9EA7B4;
        color: #fff;
        width: 180px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        align-items: center;
        position: relative;
    }

    .card {
        display: flex;
    }

    .left-gary p {
        margin-left: 5px
    }

    .left-gary:after {
        content: '';
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 20px solid #9EA7B4;
        border-bottom: 25px solid transparent;
        position: absolute;
        right: -20px;
    }

    .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 10px 20px;
        width: 100%
    }

    .right .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px
    }

    .right .row .word {
        display: flex;
        width: 200px;
        justify-content: flex-end
    }

    .right .el-input {
        width: 200px
    }

    .right .row .supplement {
        margin-left: 10px
    }

    .bottom {
        margin: 10px 0 10px 200px
    }

    .img-display {
        display: flex;
        .img-wrap {
            width: 140px;
            img {
                width: 100%;
                height: 140px;
            }
            p {
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-top: 1px solid $border;
            }
            border: 1px solid $border;
        }
    }

    .goods {
        &-img {
            display: flex;
            li {
                width: 100px;
                height: 100px;
                line-height: 100px;
                border: 1px solid $border;
                text-align: center;
                overflow: hidden;
                margin-right: 10px;
                background-size: 100% 100%;
                color: $border;
            }
        }
        &-vidoe {
            width: 300px;
            height: 150px;
            text-align: center;
            line-height: 150px;
            color: $border;
            border: 1px solid $border;
            margin-right: 20px;
            overflow: hidden;
            video {
                width: 100%;
                height: 100%;
            }
        }
    }
    .table-img {
        width: 40px;
        height: 40px;
    }

    .col-one .el-input{width: 300px}
</style>
