<template>
    <div class="add-special">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm" size="mini">
            <p class="title">基础信息</p>
            <el-form-item label="专题名称：" prop="title" :rules="[simpleRule]">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" prop="start_at" :rules="[simpleRule]">
                <el-date-picker
                    value-format="timestamp"
                    size="mini"
                    v-model="ruleForm.start_at"
                    type="datetime"
                    placeholder="">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="end_at" :rules="[simpleRule]">
                <el-date-picker
                    value-format="timestamp"
                    size="mini"
                    v-model="ruleForm.end_at"
                    type="datetime"
                    placeholder="">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="模块：">
                <el-radio-group v-model="ruleForm.template">
                    <el-radio label='1'>模板一</el-radio>
                    <el-radio label='2' disabled>模板二</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上线/下架：">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio :label='10'>上线</el-radio>
                    <el-radio :label='0'>下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="专题图片：" prop="sort">
                <FileUpload
                    :isOnly="true"
                    @successUploadCBK="successUpload($event, 'thumbs')"
                    :fileList="thumbs"
                    width="110px"
                    height="110px">
                </FileUpload>
                <div class="tips">建议尺寸750*350</div>
            </el-form-item>
            <el-form-item label="专题背景颜色：">
                <el-color-picker v-model="ruleForm.bgcolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="专题背景图片：">
                <div class="bgimg">
                    <i class="el-icon-circle-close-outline" @click="bgimg = [{name: 'coupon_thumb', url: ''}]"></i>
                    <FileUpload
                        :isOnly="true"
                        @successUploadCBK="val => bgimg = [{ name: 'coupon_thumb', url: val[0] }]"
                        :fileList="bgimg"
                        width="110px"
                        height="110px">
                    </FileUpload>
                </div>
            </el-form-item>
            <p class="title">专题商品</p>
            <el-row>
                <div class="products-items" v-for="(group, index) in groupData" :key="index">
                    <el-row>
                        <el-col :span="18">
                            <el-form-item label="分组名称：" class="inline" :rules="[simpleRule]">
                                <el-input v-model="group.name"></el-input>
                            </el-form-item>
                            <el-form-item label="分组排序：" prop="sort" class="inline">
                                <el-input v-model="group.sort" style="width: 80px;"></el-input>
                            </el-form-item>
                            <el-form-item label="排列方式：" prop="sort" class="inline">
                                <el-radio-group v-model="group.type">
                                    <el-radio label='horizontal'>横排</el-radio>
                                    <el-radio label='vertical'>竖排</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" circle @click="handleAddGroup"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="removeGroup(group)" v-if="index > 0"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="分组图片：">
                        <img :src="group.img" style="width: 110px;height: 110px;" v-if="typeof group.img === 'string'">
                        <FileUpload
                            :class="group.img && typeof group.img === 'string' ? 'file-button' : ''"
                            :isBotton="group.img && typeof group.img === 'string'"
                            :isOnly="true"
                            @successUploadCBK="val => group.img = [{ name: index, url: val[0] }]"
                            :fileList="typeof group.img === 'object' ? group.img : [{ name: index, url: group.img }]"
                            width="110px"
                            height="110px">
                        </FileUpload>
                        <div class="tips">建议尺寸750*350</div>
                    </el-form-item>
                    <el-form-item label="添加商品：" prop="goods_ids">
                    <div>
                        <el-cascader
                            placeholder="请选择分类"
                            style="width: 300px"
                            change-on-select
                            filterable
                            clearable
                            expand-trigger="hover"
                            :options="allCategories"
                            v-model="group.category_id">
                        </el-cascader>
                        <el-button type="primary" @click="handleSearch(group.category_id)" size="mini">搜索</el-button>
                    </div>
                    <p class="tips mb10">不选择分类默认搜索所有商品</p>
                    <el-select
                        class="cascader"
                        @change="handleChange($event, index)"
                        v-model="group.goods_ids"
                        placeholder="请选择商品"
                        style="width: 300px"
                        multiple
                        collapse-tags
                        filterable
                        clearable>
                        <el-option
                            v-for="item in realGoods"
                            :key="item.goods_id"
                            :label="item.goods_title"
                            :value="item.goods_id">
                        </el-option>
                    </el-select>
                    <p class="mt20 tips">已选择以下商品作为专题活动商品 共<b style="color: #000;">{{ group.goods_ids && group.goods_ids.length}}</b>件商品</p>
                    <el-table
                        max-height="400"
                        size="mini"
                        border
                        ref="multipleTable"
                        :data="group.goods"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            prop="goods_id"
                            label="商品编号">
                        </el-table-column>
                        <el-table-column
                            width="160"
                            align="left"
                            prop="goods_title"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="goods_img"
                            label="商品图片">
                            <template slot-scope="scope">
                                <img :src="scope.row.thumb" class="table-img" @click="previewImg=scope.row.thumb;visible = true" />
                                <FileUpload
                                    class="file-button"
                                    :isOnly="true"
                                    :isBotton="true"
                                    @successUploadCBK="val => scope.row.thumb = val[0]"
                                    :fileList="[{ name: scope.row.goods_id, url: scope.row.thumb }]">
                                </FileUpload>
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
                            align="center"
                            prop="activity_price"
                            label="活动价（元）">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.activity_price" style="width: 80px;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="goods_profit"
                            label="商品利润">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="stock"
                            label="库存">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="sort"
                            label="排序">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.sort" style="width: 80px;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="display"
                            label="是否主页显示">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.display" active-value="10" inactive-value="0"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <p @click="handleDel(scope.row.goods_id, index)" style="color: red;cursor: pointer">删除</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                </div>
            </el-row>
        </el-form>
        <div class="complete">
            <el-button type="success" @click="submitForm('ruleForm')">提 交</el-button>
        </div>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { common } from '@/OMS/mixins';
    import { debounce, _ } from '@/OMS/utils';
    import { Loading } from 'element-ui';

    export default {
        name: "AddSpecial",
        mixins: [common],
        data() {
            const { id, type } = this.$route.params;
            return {
                visible: false,
                previewImg: '',
                id, type,
                ruleForm: {
                    title: '',
                    thumb: '',
                    imgs: '',
                    bgcolor: '',
                    template: '1',
                    status: 10,
                    start_at: null,
                    end_at: null,
                },
                rules: {},
                bgimg: [],
                thumbs: [],
                groupData: [{
                    name: '',
                    sort: '',
                    type: 'vertical', // 竖排：vertical, 横排：horizontal
                    img: [],
                    category_id: [],
                    goods_ids: [],
                    goods: [],
                }],
                pid: null,
                realGoods: []
            };
        },
        computed: {
            ...mapState('product', ['allGoods', 'allCategories']),
            goods() {
                return this.findRealGoods(this.allGoods);
            }
        },
        created() {
            this.realGoods = this.goods;
        },
        mounted() {
            if(this.type === 'edit') this.getDetail();
        },
        methods: {
            ...mapActions('product', ['getAllGoods']),
            findRealGoods(goodsArr) {
                return goodsArr.map(v => {
                    return {
                        goods_id: v.id,
                        goods_title: v.title,
                        market_price: v.market_price,
                        shop_price: v.shop_price,
                        activity_price: v.shop_price, // 未填写活动价，默认销售价
                        cost_price: v.cost_price,
                        goods_profit: v.goods_profit,
                        stock: v.stock,
                        thumb: v.thumb,
                    }
                })
            },
            handleSearch(category_id) {
                const loadingInstance = Loading.service({ target: '.cascader', fullscreen: false, spinner: 'el-icon-loading', customClass: 'cascader-loading' });
                let cate_id = '';
                if(category_id && category_id.length > 0) cate_id = [...category_id].splice(-1, 1)
                this.getAllGoods({ cate_id })
                    .then(arr => {
                        this.realGoods = this.findRealGoods(arr);
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
            async getDetail() {
                try {
                    const { data } = await this.$api.activity.activityTopicDetail({ id: this.id });
                    for(const key in this.ruleForm) {
                        this.ruleForm[key] = data[key];
                    }
                    this.bgimg = [{ name: 'bgimg', url: data.bgimg }];
                    this.ruleForm.start_at = data.start_at * 1000;
                    this.ruleForm.end_at = data.end_at * 1000;
                    this.thumbs = [{ name: 'thumb', url: data.thumb }];
                    const arr = [...data.groups];
                    arr.forEach(v => {
                        v.goods_ids = v.goods.map(c => Number(c.goods_id));
                    })
                    this.groupData = arr;
                } catch (e) {
                    throw new Error(e);
                }
            },
            successUpload(val, type) {
                this[type] = [{ name: type, url: val[0] }];
            },
            handleChange(val, index) {
                if(val && val.length > 0) {
                    this.groupData[index].goods = this.goods.filter(curr => val.includes(curr.goods_id));
                    return;
                }
                this.groupData[index].goods = [];
            },
            handleAddGroup() {
                this.groupData.push({
                    name: '',
                    sort: '',
                    type: 'vertical',
                    img: [],
                    category_id: [],
                    goods_ids: [],
                    goods: [],
                })
            },
            removeGroup(group) {
                const index = this.groupData.indexOf(group);
                if (index !== -1) this.groupData.splice(index, 1);
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.ruleForm);
                        params.thumb = this.thumbs[0] ? this.thumbs[0].url : '';
                        params.bgimg = this.bgimg[0] ? this.bgimg[0].url : '';
                        params.start_at = params.start_at / 1000;
                        params.end_at = params.end_at / 1000;
                        params.groups = this.groupData.map(curr => {
                            return {
                                name: curr.name,
                                sort: curr.sort,
                                type: curr.type,
                                img: typeof curr.img === 'object' ? curr.img[0].url : curr.img,
                                goods: curr.goods,
                                id: curr.id || 0
                            }
                        })
                        try {
                            if(this.type === 'edit') {
                                params.id = this.id;
                                await this.$api.activity.activityTopicEdit(params);
                            } else {
                                await this.$api.activity.activityTopicAdd(params);
                            }
                            this.$router.push({ name: 'specialList' });
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 删除所选商品
            handleDel(id, index) {
                // 删除select所选商品
                this.groupData[index].goods_ids = this.groupData[index].goods_ids.filter(curr => curr != id);
                // 删除table所选商品
                this.groupData[index].goods = this.groupData[index].goods.filter(curr => curr.goods_id != id);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";
    .add-special {
        background: #fff;
        padding: 20px;
        .ruleForm {
            .el-form-item--mini {
                .el-input--mini {
                    width: 300px;
                }
            }
            .products-items {
                padding: 10px;
                margin-bottom: 10px;
                border: 1px dotted $border;
            }
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
        .title {
            border-bottom: 1px solid #000;
            padding: 10px;
            font-size: 15px;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: left
        }
        .tx {
            margin-top: 20px;
        }
        .file-button {
            /deep/ .el-upload {
                border: none;
            }
        }
        .bgimg {
            position: relative;
            width: 110px;
            height: 110px;
            .el-icon-circle-close-outline {
                z-index: 100;
                color: #666;
                top: -5px;
                right: -2px;
                width: 10px;
                height: 10px;
                position: absolute;
                &:hover {
                    color: red;
                    cursor: pointer;
                }
            }
        }
    }
</style>
