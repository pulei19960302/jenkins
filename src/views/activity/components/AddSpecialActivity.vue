<template>
    <div class="add-special">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="ruleForm" size="mini">
            <p class="title">基础信息</p>
            <el-form-item label="活动名称：" prop="title" :rules="[simpleRule]">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" prop="start_at" :rules="[simpleRule]">
                <el-date-picker
                    value-format="timestamp"
                    size="mini"
                    v-model="ruleForm.start_at"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" prop="end_at" :rules="[simpleRule]">
                <el-date-picker
                    value-format="timestamp"
                    size="mini"
                    v-model="ruleForm.end_at"
                    type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下架：">
                <el-radio-group v-model="ruleForm.status" style="width: 150px;">
                    <el-radio :label='10'>上线</el-radio>
                    <el-radio :label='0'>下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动图片：" prop="sort">
                <FileUpload
                    :isOnly="true"
                    @successUploadCBK="successUpload($event, 'thumbs')"
                    :fileList="thumbs"
                    width="110px"
                    height="110px">
                </FileUpload>
                <div class="tips">建议尺寸750*350</div>
            </el-form-item>
            <el-form-item label="活动背景颜色：">
                <el-color-picker v-model="ruleForm.bgcolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="活动背景图片：">
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
            <p class="title">优惠券</p>
            <el-row>
                <el-form-item label="标题图：" prop="sort">
                    <FileUpload
                        :isOnly="true"
                        @successUploadCBK="val => coupon_thumb = [{ name: 'coupon_thumb', url: val[0] }]"
                        :fileList="coupon_thumb"
                        width="110px"
                        height="110px">
                    </FileUpload>
                    <div class="tips">建议尺寸750*350</div>
                </el-form-item>
                <el-form-item label="优惠券描述：">
                    <el-input v-model="desc"></el-input>
                </el-form-item>
                <div class="products-items" v-for="(item, index) in couponData" :key="index">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="优惠券：" prop="sort">
                                <FileUpload
                                    :isOnly="true"
                                    @successUploadCBK="val => item.thumb = [{ name: index, url: val[0] }]"
                                    :fileList="typeof item.thumb == 'object' ? item.thumb : [{ name: index, url: item.thumb }]"
                                    width="110px"
                                    height="110px">
                                </FileUpload>
                                <div class="tips">建议尺寸750*350</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="选择优惠券：" :rules="[simpleRule]">
                                <el-select clearable filterable v-model="item.id">
                                    <el-option
                                        v-for="item in coupons"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" circle @click="handleAddGroup('coupon')"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="removeGroup(couponData, item)" v-if="index > 0"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-row>

            <p class="title">免单活动</p>
            <el-form-item label="是否启用免单：">
                <el-radio-group v-model="free.flag" style="width: 150px;">
                    <el-radio :label='1'>是</el-radio>
                    <el-radio :label='0'>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标题图：" prop="sort">
                <FileUpload
                    :isOnly="true"
                    @successUploadCBK="val => free_thumb = [{ name: 'free_thumb', url: val[0] }]"
                    :fileList="free_thumb"
                    width="110px"
                    height="110px">
                </FileUpload>
                <div class="tips">建议尺寸750*350</div>
            </el-form-item>

            <p class="title">秒杀活动</p>
            <el-form-item label="是否启用秒杀：">
                <el-radio-group v-model="seckill.flag" style="width: 150px;">
                    <el-radio :label='1'>是</el-radio>
                    <el-radio :label='0'>否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标题图：" prop="sort">
                <FileUpload
                    :isOnly="true"
                    @successUploadCBK="val => seckill_thumb = [{ name: 'seckill_thumb', url: val[0] }]"
                    :fileList="seckill_thumb"
                    width="110px"
                    height="110px">
                </FileUpload>
                <div class="tips">建议尺寸750*350</div>
            </el-form-item>

            <p class="title">特惠活动专区</p>
            <el-row>
                <el-form-item label="标题图：" prop="sort">
                    <FileUpload
                        :isOnly="true"
                        @successUploadCBK="val => discounts_thumb = [{ name: 'discounts_thumb', url: val[0] }]"
                        :fileList="discounts_thumb"
                        width="110px"
                        height="110px">
                    </FileUpload>
                    <div class="tips">建议尺寸750*350</div>
                </el-form-item>
                <div class="products-items" v-for="(item, index) in saleData" :key="index">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="活动banner：" prop="sort">
                                <FileUpload
                                    :isOnly="true"
                                    @successUploadCBK="val => item.thumb = [{ name: index, url: val[0] }]"
                                    :fileList="typeof item.thumb == 'object' ? item.thumb : [{ name: index, url: item.thumb }]"
                                    width="110px"
                                    height="110px">
                                </FileUpload>
                                <div class="tips">建议尺寸750*350</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动名称：" :rules="[simpleRule]">
                                <el-input v-model="item.name" style="width: 70%"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="跳转链接：" :rules="[simpleRule]">
                                <el-select v-model="item.type" placeholder="请选择" style="width: 48%;display: inline-block">
                                    <el-option
                                        v-for="item in jumpOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="item.id" :placeholder="gotoUrlPlaceholder(item.type)" style="width: 48%;display: inline-block"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" circle @click="handleAddGroup('sale')"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="removeGroup(saleData, item)" v-if="index > 0"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-row>

            <p class="title">选择专题</p>
            <el-row>
                <el-form-item label="标题图：" prop="sort">
                    <FileUpload
                        :isOnly="true"
                        @successUploadCBK="val => topic_thumb = [{ name: 'topic_thumb', url: val[0] }]"
                        :fileList="topic_thumb"
                        width="110px"
                        height="110px">
                    </FileUpload>
                    <div class="tips">建议尺寸750*350</div>
                </el-form-item>
                <div class="products-items" v-for="(item, index) in specialData" :key="index">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="专题：" prop="sort">
                                <FileUpload
                                    :isOnly="true"
                                    @successUploadCBK="val => item.thumb = [{ name: index, url: val[0] }]"
                                    :fileList="typeof item.thumb == 'object' ? item.thumb : [{ name: index, url: item.thumb }]"
                                    width="110px"
                                    height="110px">
                                </FileUpload>
                                <div class="tips">建议尺寸750*350</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选择专题："  :rules="[simpleRule]" class="inline">
                                <el-select clearable filterable v-model="item.id">
                                    <el-option
                                        v-for="item in topics"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="排序：" class="inline" :rules="[simpleRule]">
                                <el-input v-model="item.sort" style="width: 60px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" circle @click="handleAddGroup('special')"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="removeGroup(specialData, item)" v-if="index > 0"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-row>

            <p class="title">推荐商品</p>
            <el-row>
                <div class="products-items" v-for="(group, index) in groupData" :key="index">
                    <el-row>
                        <el-col :span="18">
                            <el-form-item label="商品分组：">
                                <el-radio-group v-model="group.type">
                                    <el-radio label='1'>自定义</el-radio>
                                    <el-radio label='2'>系统分类</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-plus" circle @click="handleAddGroup('group')"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="removeGroup(groupData, group)" v-if="index > 0"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="商品分类：" class="inline" :rules="[simpleRule]">
                        <el-input v-model="group.cate_name" v-if="group.type == 1"></el-input>
                        <el-cascader
                            v-else
                            style="width: 300px"
                            change-on-select
                            filterable
                            clearable
                            expand-trigger="hover"
                            :options="allCategories"
                            v-model="group.category_id">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="标题图片：" prop="sort">
                        <FileUpload
                            :isOnly="true"
                            @successUploadCBK="val => group.img = [{ name: index, url: val[0] }]"
                            :fileList="typeof group.img == 'object' ? group.img : [{ name: index, url: group.img }]"
                            width="110px"
                            height="110px">
                        </FileUpload>
                        <div class="tips">建议尺寸750*350</div>
                    </el-form-item>
                    <el-form-item label="添加商品：" prop="goods_ids">
                        <div>
                            <el-cascader
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
                                    <img :src="scope.row.thumb" class="table-img"  @click="previewImg=scope.row.thumb;visible = true" />
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

    const detail_prefix = '/pages/productDetail/productDetail?id='; // 小程序详情页前缀
    const active_prefix = '/pages/active/active?id='; // 小程序活动页前缀
    export default {
        name: "AddSpecialActivity",
        mixins: [common],
        data() {
            const { id, type } = this.$route.params;
            return {
                visible: false,
                previewImg: '',
                id, type,
                free: {
                    flag: 0
                },
                seckill: {
                    flag: 0
                },
                desc: '',
                bgimg: [],
                coupon_thumb: [],
                free_thumb: [],
                seckill_thumb: [],
                discounts_thumb: [],
                topic_thumb: [],
                jumpOptions: [
                    { value: detail_prefix, label: '商品详情页' },
                    { value: active_prefix, label: '活动页' },
                    { value: '', label: '自定义' },
                ],
                couponData: [{
                    id: '',
                    thumb: '',
                }],
                saleData: [{
                    thumb: '',
                    name: '',
                    type: '',
                    id: '',
                }],
                specialData: [{
                    thumb: '',
                    coupon_id: '',
                    rank: '',
                }],
                coupons: [],
                topics: [],
                ruleForm: {
                    title: '',
                    bgcolor: null,
                    thumb: '',
                    imgs: '',
                    template: '',
                    status: 10,
                    start_at: null,
                    end_at: null,
                },
                rules: {},
                act_pic1: [],
                groupData: [{
                    name: '',
                    rank: '',
                    type: '1',
                    cate_name: '',
                    img: [],
                    category_id: [],
                    goods_ids: [],
                    goods: [],
                }],
                pid: null,
                thumbs: [],
                realGoods: [],
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
            this.getCoupons();
            this.getTopics();
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
                        activity_price: v.shop_price,
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
                    const { data } = await this.$api.activity.activitiesDetail({ id: this.id });
                    for(const key in this.ruleForm) {
                        this.ruleForm[key] = data[key];
                    }
                    this.ruleForm.start_at = data.start_at * 1000;
                    this.ruleForm.end_at = data.end_at * 1000;
                    this.thumbs = [{ name: 'thumb', url: data.thumb }];
                    this.bgimg = [{ name: 'bgimg', url: data.bgimg }];
                    //
                    this.coupon_thumb = [{ name: 'coupon_thumb', url: data.coupon.thumb }];
                    this.couponData = data.coupon.items;
                    this.desc = data.coupon.desc;
                    //
                    this.free_thumb = [{ name: 'free_thumb', url: data.free.thumb }];
                    this.free.flag = data.free.flag;
                    //
                    this.seckill_thumb = [{ name: 'seckill_thumb', url: data.seckill.thumb }];
                    this.seckill.flag = data.seckill.flag;
                    //
                    this.discounts_thumb = [{ name: 'discounts_thumb', url: data.discounts.thumb }];
                    this.saleData = data.discounts.items;
                    //
                    this.topic_thumb = [{ name: 'topic_thumb', url: data.topic.thumb }];
                    this.specialData = data.topic.items;
                    //
                    this.topic_thumb = [{ name: 'topic_thumb', url: data.topic.thumb }];
                    this.specialData = data.topic.items;

                    const arr = [...data.recommend];
                    arr.forEach(v => {
                        v.goods_ids = v.goods.map(c => Number(c.goods_id));
                    })
                    this.groupData = arr;
                } catch (e) {
                    throw new Error(e);
                }
            },
            findCateName(idArr) {
                if(idArr.length < 1) return;
                const arr = [];
                this.allCategories.map(v => {
                    if(v.id === idArr[0]) {
                        arr.push(v.name);
                        if(idArr[1]) {
                            v.children.map(c => {
                                if(c.id === idArr[1]) {
                                    arr.push(c.name);
                                    if(idArr[2]) {
                                        c.children.map(m => {
                                            if(m.id === idArr[2]) {
                                                arr.push(m.name);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
                return arr.join('/');
            },
            async getTopics() {
                try {
                    const { data } = await this.$api.activity.activityTopicList();
                    this.topics = data.items;
                } catch (e) {
                }
            },
            async getCoupons() {
                try {
                    const { data } = await this.$api.activity.couponList();
                    this.coupons = data.items;
                } catch (e) {
                }
            },
            // 提示
            gotoUrlPlaceholder(val) {
                switch (val) {
                    case detail_prefix: return '请填写商品ID';
                    case active_prefix: return '请填写活动ID';
                    case '': return '请填写完整的网页地址';
                    default: '请先选中类型'
                }
            },
            handleChange(val, index) {
                if(val && val.length > 0) {
                    this.groupData[index].goods = this.goods.filter(curr => val.includes(curr.goods_id));
                    return;
                }
                this.groupData[index].goods = [];
            },
            handleAddGroup(type) {
                switch (type) {
                    case 'group':
                        this.groupData.push({
                            name: '',
                            rank: '',
                            type: '1',
                            cate_name: '',
                            img: [],
                            category_id: [],
                            goods_ids: [],
                            tableData: [],
                        });
                        break;
                    case 'coupon':
                        this.couponData.push({
                            id: '',
                            thumb: '',
                        })
                        break;
                    case 'sale':
                        this.saleData.push({
                            name: '',
                            type: '',
                            id: '',
                            thumb: '',
                        })
                        break;
                    case 'special':
                        this.specialData.push({
                            coupon_id: '',
                            rank: '',
                            thumb: '',
                        })
                        break;
                }

            },
            removeGroup(data, item) {
                const index = data.indexOf(item);
                if (index !== -1) data.splice(index, 1);
            },
            successUpload(val, type) {
                this[type] = [{ name: type, url: val[0] }];
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const params = Object.assign({}, this.ruleForm);
                        params.thumb = this.thumbs[0] ? this.thumbs[0].url : '';
                        params.start_at = params.start_at / 1000;
                        params.end_at = params.end_at / 1000;
                        //
                        params.bgimg = this.bgimg[0] ? this.bgimg[0].url : '';
                        // 优惠券
                        this.couponData.map(v => {
                            v.thumb = typeof v.thumb === 'object' ? v.thumb[0].url : v.thumb;
                        })
                        params.coupon = {
                            thumb: this.coupon_thumb[0] ? this.coupon_thumb[0].url : '',
                            desc: this.desc,
                            items: this.couponData
                        }
                        // 免单
                        params.free = {
                            thumb: this.free_thumb[0] ? this.free_thumb[0].url : '',
                            flag: this.free.flag
                        }
                        // 秒杀
                        params.seckill = {
                            thumb: this.seckill_thumb[0] ? this.seckill_thumb[0].url : '',
                            flag: this.seckill.flag
                        }

                        this.saleData.map(v => {
                            v.thumb = typeof v.thumb === 'object' ? v.thumb[0].url : v.thumb;
                        })
                        // 特惠活动
                        params.discounts = {
                            thumb: this.discounts_thumb[0] ? this.discounts_thumb[0].url : '',
                            items: this.saleData
                        }
                        this.specialData.map(v => {
                            v.thumb = typeof v.thumb === 'object' ? v.thumb[0].url : v.thumb;
                        })
                        params.topic = {
                            thumb: this.topic_thumb[0] ? this.topic_thumb[0].url : '',
                            items: this.specialData
                        }
                        params.recommend = this.groupData.map(curr => {
                            return {
                                type: curr.type,
                                cate_name: curr.type == 2 ? this.findCateName(curr.category_id) : curr.cate_name, // 系统分类筛选对应name，自定义则直接提交
                                img: typeof curr.img === 'object' ? curr.img[0].url : curr.img,
                                category_id: curr.category_id,
                                name: curr.name,
                                sort: curr.sort,
                                goods: curr.goods,
                                id: curr.id || 0
                            }
                        })
                        try {
                            if(this.type === 'edit') {
                                params.id = this.id;
                                await this.$api.activity.activitiesEdit(params);
                            } else {
                                await this.$api.activity.activitiesAdd(params);
                            }
                            this.$router.push({ name: 'specialActivityList' });
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
                padding: 10px 0;
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
            width: 110px;
            height: 110px;
            position: relative;
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
