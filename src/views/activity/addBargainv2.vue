<template>
    <div class="moreRules-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="mini" class="form">
            <el-form-item label="活动批次:" prop="title" :rules="[simpleRule]">
                <el-input  v-bind:disabled="type=='read'" v-model="form.title" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="开始时间:" prop="start_time" :rules="[simpleRule]">
                <el-date-picker
                    v-bind:disabled="type=='read'"
                    style="width: 300px;"
                    value-format="timestamp"
                    size="mini"
                    v-model="form.start_time"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:" prop="end_time" :rules="[simpleRule]">
                <el-date-picker
                    v-bind:disabled="type=='read'"
                    style="width: 300px;"
                    value-format="timestamp"
                    size="mini"
                    v-model="form.end_time"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上架/下架:">
                <el-radio-group v-bind:disabled="type=='read'" v-model="form.status">
                    <el-radio :label="10">上架</el-radio>
                    <el-radio :label="0">下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-row>
                <el-form-item label="添加商品:" prop="goods_ids" :rules="[simpleRule]">
                    <div>
                        <el-cascader
                            v-bind:disabled="type=='read'"
                            placeholder="请选择分类"
                            style="width: 300px"
                            change-on-select
                            filterable
                            clearable
                            expand-trigger="hover"
                            :options="allCategories"
                            v-model="form.category_id">
                        </el-cascader>
                        <el-button v-if="type!='read'" type="primary" @click="handleSearch(form.category_id)" size="mini">搜索</el-button>
                    </div>
                    <p class="tips mb10">不选择分类默认搜索所有商品</p>
                    <el-select
                        class="cascader"
                        v-bind:disabled="type=='read'"
                        v-model="form.goods_ids"
                        placeholder="请选择商品"
                        style="width: 360px;"
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
                    <p class="mt20 tips">已关联 <b style="color: #000;">{{ form.goods_ids && form.goods_ids.length }}</b> 件商品</p>
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
                            prop="stock"
                            label="库存">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="最少砍价次数">
                            <template slot-scope="scope">
                                <el-input v-bind:disabled="type=='read'" v-model="scope.row.min_count" style="width: 50px!important;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width="180"
                            align="center"
                            prop="sort"
                            label="排序">
                            <template slot-scope="scope">
                                <div v-clickoutside="handleClickoutside">
                        <span v-show="nameEdit != scope.row.id" class="el-icon-edit-content">
                            {{ scope.row.sort }}
                            <i v-if="type!='read'" class="el-icon-edit icon" @click="edit('nameEdit',scope.row.id)"></i>
                        </span>
                                    <div v-show="nameEdit == scope.row.id" style="display: flex">
                                        <el-input v-model="scope.row.sort"></el-input>
                                        <el-button type="text" size="mini" @click="handleSave(scope.row)" style="margin-left: 2px;">保存</el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            align="center"
                            prop="cost_price"
                            label="成本价（元）">
                        </el-table-column>
                        <el-table-column
                            v-if="type!='read'"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <p @click="handleDel(scope.row.id)" style="color: red;cursor: pointer">删除</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-row>
        </el-form>
        <div class="complete">
            <el-button type="success" @click="handelSubmit('form')">提 交</el-button>
        </div>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { Loading } from 'element-ui';

    import clickoutside from '@/OMS/directive/clickoutside';

    export default {
        name: "addBargainv2",
        directives: { clickoutside },
        data() {
            const { id } = this.$route.params;
            const { type } = this.$route.params;
            return {
                visible: false,
                previewImg: '',
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                id,
                type,
                goods: [],
                brands: [],
                suppliers: [],
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                form: {
                    start_time: '',
                    end_time: '',
                    goods_ids: [],
                    title:'',
                    status:10,
                    min_count:[],
                },
                rules: {},
                nameEdit: null,
                seckillData:'',
            }
        },
        computed: {
            ...mapState('product', ['allGoods', 'allCategories'])
        },
        watch: {
            'form.goods_ids'(val) {
                if(val && val.length > 0) {
                    this.tableData = this.allGoods.filter(curr => val.includes(curr.id));
                    if(this.id){
                        //编辑
                        for (let i=0;i<this.tableData.length;i++){
                            this.tableData[i].min_count=this.seckillData.goodsData[i].min_count;
                        }
                    }else {
                        //新增默认为10次
                        for (let i=0;i<this.tableData.length;i++){
                            this.tableData[i].min_count=10;
                        }
                    }
                } else {
                    this.tableData = [];
                }
            },
            '$route'({ params }) {
                if(params.id) {
                    this.id = params.id;
                    this.seckillDetail(params.id);
                } else {
                    this.resetForm('form');
                }
            }
        },
        created() {
            this.goods = this.allGoods;
            console.log(this.type)
            if(this.id) this.seckillDetail(this.id);
        },
        methods: {
            ...mapActions('product', ['getAllGoods']),
            edit(val, id) {
                this[val] = id;
            },
            handleClickoutside() {
                // if(this.nameEdit) this.nameEdit = null;
            },
            handleSearch(category_id) {
                const loadingInstance = Loading.service({ target: '.cascader', fullscreen: false, spinner: 'el-icon-loading', customClass: 'cascader-loading' });
                let cate_id = '';
                if(category_id && category_id.length > 0) cate_id = [...category_id].splice(-1, 1)
                this.getAllGoods({ cate_id })
                    .then(arr => {
                        this.goods = arr;
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                    })
                    .catch(_ => {
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                    })
            },
            // 详情
            async seckillDetail(id) {
                try {
                    const { data } = await this.$api.activity.bargainDetail({ id });
                    this.form.end_time = data.end_time*1000;
                    this.form.start_time = data.start_time*1000;
                    this.form.goods_ids = data.goodsData.map(val => Number(val.goods_id));
                    this.form.title=data.title;
                    this.form.status=data.status;

                    this.seckillData=data;


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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handelSubmit(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            let numStr ='';
                            for (let i=0;i<this.tableData.length;i++){
                                numStr+=(this.tableData[i].min_count||1)+',';
                            }
                            numStr = numStr.substr(0, numStr.length - 1);
                            const params = Object.assign({}, this.form);
                            params.goods_ids = params.goods_ids.join(',');
                            params.end_time = params.end_time/1000;
                            params.start_time = params.start_time/1000;
                            params.min_counts = numStr;
                            // 编辑
                            if(this.id) params.id = this.id;
                            await this.$api.product.bargainAdd(params);
                            this.$router.push({name: 'bargainList'});
                        } catch (e) {
                            throw new Error(e);
                        }
                    } else {
                        this.$message.error('请确认信息是否填写完整');
                    }
                })
            },
            handleSave({ sort, id }){
                this.$api.product.setSort({ id,sort });
                this.nameEdit = null;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";
    .moreRules-content {
        background: #fff;
        border: 1px solid #E4E4E4;
        padding: 10px;
        text-align: center;
        .form {
            text-align: left;
        }
        .complete {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 70;
            width: 100%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background-color: #e4e4e4;
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
    .el-icon-edit-content i{
        margin-left: 10px;
        color: #ff8436!important;
        font-size: 14px!important;
        font-weight: bold;
        cursor: pointer;
    }
</style>
