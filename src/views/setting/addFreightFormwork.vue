<template>
    <div class="platformSetting" style="min-height: calc(100vh - 135px); background: #fff;">
        <p class="title">添加模板</p>
        <el-form style="max-width:100%" label-position="right" label-width="100px" :model="formLabelAlign"
                 :rules="rules" ref="formLabelAlign" class="form">
            <el-form-item label=" 模板名称：" prop="name">
                <el-input v-model="formLabelAlign.name" style="width: 200px" ></el-input>
            </el-form-item>
            <el-form-item label="供应商:" prop="brand_id">
                <el-select
                    v-model="formLabelAlign.supplier_id"
                    placeholder="请选择"
                    style="width: 200px;"
                    filterable
                    clearable>
                    <el-option
                        v-for="item in supplier"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计价方式：" prop="region">
                <template>
                    <el-radio-group v-model="formLabelAlign.type">
                        <el-radio :label="1">按件数</el-radio>
                        <el-radio :label="2">按重量</el-radio>
                        <!--<el-radio :label="3">按体积</el-radio>-->
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item label="运送方式：" prop="region">
                <el-checkbox-group v-model="formLabelAlign.transports" class="eliveryType">
                    <div>
                        <el-checkbox :label="1">快递</el-checkbox>
                    </div>
                    <!--<div>-->
                        <!--<el-checkbox :label="2">EMS</el-checkbox>-->
                        <!--<AdressSet @successCBK="successCBK" type="2" :priceType="formLabelAlign.type" ref="adressSet2" v-if="formLabelAlign.transports.includes(2)"></AdressSet>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<el-checkbox :label="3">平邮</el-checkbox>-->
                        <!--<AdressSet @successCBK="successCBK" type="3" :priceType="formLabelAlign.type" ref="adressSet3" v-if="formLabelAlign.transports.includes(3)"></AdressSet>-->
                    <!--</div>-->
                </el-checkbox-group>
                <AdressSet @successCBK="successCBK" type="1" :priceType="formLabelAlign.type" ref="adressSet1" v-if="formLabelAlign.transports.includes(1)" :detailData="detailData"></AdressSet>
            </el-form-item>
            <el-button type="primary" class="submit" @click="handelSubmit">提交</el-button>
        </el-form>

    </div>
</template>

<script>
    import AdressSet from './commpnts/AdressSet';

    let i = 0;
    export default {
        name: "addFreightFormwork",
        components: { AdressSet },
        data() {
            const { type, id } = this.$route.params;
            return {
                type, id,
                detailData: [],
                stock: '',
                activeId: null,
                salePrice: '',
                costPrice: '',
                options: [],
                provinceData: [],
                cityData: [],
                provinceChecked: [],
                cityChecked: [],
                dialogVisible: true,
                submit:{
                    name:'',
                    id:'',
                },
                formLabelAlign: {
                    transports: []
                },
                rules: {
                //     name: [
                //         {required: true, message: '请输入名称', trigger: 'blur'},
                //     ],
                },
                checked1: '',
                checked2: '',
                checked3: '',
                checked4: '',
                radio: '1',
                cityPid: null,
                supplier: [],
                transports: [],
            }
        },
        /**
         * 多页面同时存在编辑与新增时，新增重置，编辑回填
         */
        watch: {
            '$route'({ params }) {
                if(params.id) {
                    this.type = params.type;
                    this.getFreightTemplateDetail(params.id);
                } else {
                    this.type = 'add';
                    this.detailData = [];
                    this.resetForm('formLabelAlign');
                }
            }
        },
        created() {
            this.getSupplierData();
            if(this.type === 'edit') this.getFreightTemplateDetail(this.id);
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            successCBK(val, type) {
                if(val) this.transports = [...val];
            },
            async getSupplierData() {
                try {
                    const { data } = await this.$api.product.supplierList({ pageSize: 0 });
                    this.supplier = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },
            async getFreightTemplateDetail(id) {
                try {
                    const { data } = await this.$api.setting.getFreightTemplateDetail({ id });
                    this.detailData = data.transports;
                    this.formLabelAlign = data;
                    const arr = data.transports.map(val => val.type);
                    this.formLabelAlign.transports = [...arr];
                } catch (e) {
                    throw new Error(e);
                }
            },
            checkTransportsDetail(){
                let flag = true
                this.transports.forEach(it=>{
                    if(!it.first_num || !it.first_price || !it.follow_num || !it.follow_price){
                        flag = false
                    }
                })
                if(!flag){
                    this.$message.error('请把物流信息填写完整');
                }
                return flag
            },
            handelSubmit() {
                this.$refs.formLabelAlign.validate(async (valid) => {
                    if (valid) {
                        this.$refs.adressSet1.handlecallBack();
                        const params = Object.assign({}, this.formLabelAlign);
                        this.transports.forEach(val => {
                            // 类型为string的id为前端动态生成id，非真实id
                            if(typeof val.id === 'string') val.id = 0;
                            // 选地址优化
                            if (val.area_id !== undefined) {
                                val.area_ids = val.area_id || []
                            } else {
                                val.area_ids = val.area_ids.map(curr => curr.id);
                            }
                        });
                        params.transports = this.transports;
                        if(params.supplier_name) delete params.supplier_name;
                        if(!this.checkTransportsDetail())return
                        try {
                            if(this.type === 'edit') {
                                // 编辑
                                params.id = this.id;
                                await this.$api.setting.editFreightTemplate(params);
                            } else {
                                // 新增
                                await this.$api.setting.addFreightTemplate(params);
                            }
                            this.$router.push({ name: 'freightFormwork' });
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },

        }
    }
</script>

<style lang="scss">
    @import "../../styles/variables";
    .platformSetting {
        border-radius: 4px;
        background: #fff;
        .province {
            position: relative;
            .city {
                position: absolute;
                width: 200px;
                background: #ccc;
                z-index: 10;
                padding: 10px;
                display: flex;
                flex-wrap: wrap;
            }
        }
        .form {
            max-width: 70%;
            .eliveryType {
                .temp {
                    font-size: 12px;
                    padding: 4px;
                    border: 1px solid $border;
                    .item {
                        box-shadow: 0 0 6px rgba(0,0,0,.3);
                    }
                }
            }
        }
    }

    .platformSetting .title {
        padding: 0 24px;
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        line-height: 56px;
        border-bottom: 1px solid #E4E7ED;
        margin-bottom: 40px;
    }

    .platformSetting .lastWore {
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        text-align: left
    }

    .submit {
        margin: 20px 0 20px 170px;
    }

    .platformSetting .div-col {
        display: flex;
        flex-direction: column
    }

    .platformSetting .div-col .el-checkbox {
        margin-left: 0
    }

    .platformSetting .garyTips {
        color: #999;
        font-size: 12px;
        line-height: 22px;
        margin-top: 10px
    }
</style>
