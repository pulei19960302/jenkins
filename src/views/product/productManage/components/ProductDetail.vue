<template>
    <div class="productDetail">
        <div style="font-size:20px;font-weight: bold;margin-bottom:40px;margin-top:-30px">
            商品详情
        </div>
        <el-form label-width="160px" class="form" size="mini">
            <div class="information model">
                <div class="title">
                    商品基本信息
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="商品标题:" prop="title" >
                                {{ detailData.title }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="副标题:" prop="subtitle" >
                                {{ detailData.subtitle  | validVal}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="上架时间:" prop="start_at">
                                {{ detailData.start_at }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="下架时间:" prop="end_at">
                                {{ detailData.end_at }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="商品品牌:" prop="brand_id" >
                                {{ detailData.brand_name }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="商品货号:" prop="goods_sn">
                                {{ detailData.goods_sn | validVal}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="供应商:" prop="supplier_id" >
                                {{ detailData.supplier_name }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="运费模板:" prop="weight">
                                {{ detailData.freight_id }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="排序:" prop="sort" >
                                {{ detailData.sort | validVal}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="24">
                            <el-form-item label="商品描述:" prop="factory_remark" >
                                {{ detailData.description | validVal }}
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </div>
            </div>
            <div class="sales model">
                <div class="title">
                    推荐促销
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-form-item label="">
                            <el-col
                                :span="8">
                                <el-tag
                                    style="margin-right: 10px;"
                                    v-for="tag in detailData.labels"
                                    :key="tag.id"
                                    size="mini"
                                    type="warning">
                                    {{ tag.label }}
                                </el-tag>
                            </el-col>
                        </el-form-item>
                    </el-row>
                </div>
            </div>

            <div class="attribute model">
                <div class="title">
                    销售属性
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="市场价:" prop="market_price" >
                                {{ detailData.market_price }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="团购价:" prop="shop_price" >
                                {{ detailData.shop_price }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="白银价格:" prop="store_price" >
                                {{ detailData.store_price }}
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="成本价:" prop="cost_price" >
                                {{ detailData.cost_price }}
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="黄金价:" prop="partner_price" >
                                {{ detailData.partner_price }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="钻石价:" prop="team_price" >
                                {{ detailData.team_price }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="白银平级返利:" prop="first_fee" >
                                {{ detailData.first_fee }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="黄金平级返利:" prop="team_angel1" >
                                {{ detailData.team_angel1 }}
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="合伙人价:" prop="partner_price" >
                                {{ detailData.partner_price }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="一级返利:" prop="first_fee" >
                                {{ detailData.first_fee }}
                            </el-form-item>
                        </el-col> -->
                        
                        <!-- <el-col :span="8">
                            <el-form-item label="二级返利:" prop="second_fee" >
                                {{ detailData.second_fee }}
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="商品数量:" prop="stock" >
                                {{ detailData.stock }}个
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售数量:" prop="sale_num" >
                                {{ detailData.sale_num }}个
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="运费险:" prop="sale_num" >
                                {{ detailData.insurance }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="组合几件:" prop="stock" >
                                {{ detailData.zu_num }}个
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-table
                            border
                            ref="multipleTable"
                            :data="detailData.skuData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                                align="center"
                                prop="properties_name"
                                label="属性">
                            </el-table-column>
                            <el-table-column
                                width="100"
                                align="center"
                                prop="shop_price"
                                label="团购价格（元）">
                            </el-table-column>
                            <!-- <el-table-column
                                width="100"
                                align="center"
                                prop="cost_price"
                                label="成本价格（元）">
                            </el-table-column> -->
                            <el-table-column
                                width="100"
                                align="center"
                                prop="stock"
                                label="商品库存">
                            </el-table-column>
                            <!-- <el-table-column
                                width="100"
                                align="center"
                                prop="user_price"
                                label="普通用户价格（元）">
                            </el-table-column> -->
                            <!--<el-table-column-->
                                <!--width="100"-->
                                <!--align="center"-->
                                <!--prop="member_price"-->
                                <!--label="粉丝价格（元）">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                width="100"
                                align="center"
                                prop="member_price"
                                label="svip价格（元）">
                            </el-table-column>
                            <el-table-column
                                width="100"
                                align="center"
                                prop="store_price"
                                label="白银价格（元）">
                            </el-table-column>
                            <el-table-column
                                width="100"
                                align="center"
                                prop="partner_price"
                                label="黄金价格（元）">
                            </el-table-column>
                           <el-table-column
                                width="100"
                                align="center"
                                prop="team_price"
                                label="钻石价格（元）">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </div>
            </div>
            <div class="setting model">
                <div class="title">
                    功能设置
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="24h最大购买数:" prop="day_max">
                                {{ detailData.day_max }}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="单次最多购买:" prop="single_max">
                                {{ detailData.single_max }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="单次最低购买:" prop="single_min">
                                {{ detailData.single_min }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="最多购买:" prop="limit_max">
                                {{ detailData.limit_max }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="parameter model">
                <div class="title">
                    商品属性
                </div>
                <div class="form" style="margin-left: 100px;">
                    <el-row>
                        <el-col
                            style="margin: 6px 0;"
                            :span="8"
                            v-for="(item, index) in detailData.param"
                            :key="index">
                            {{ item.key }}：{{ item.value }}
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="imgs model">
                <div class="title">
                    图片管理
                </div>
                <div class="form">
                    <el-form-item>
                        <ul class="goods-img">
                            <li v-for="(item, index) in imgs" :key="index" :style="{ backgroundImage: `url(${item})` }"></li>
                        </ul>
                        <div style="display: flex;margin-top: 10px;">
                            <div class="goods-vidoe" v-if="detailData.video">
                                <video :src="detailData.video" controls></video>
                            </div>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <!-- <div class="describe model">
                <div class="title">
                    商品描述
                </div>
                <div class="form">
                    <el-form-item>
                        <div v-html="detailData.content"></div>
                    </el-form-item>
                </div>
            </div> -->
            <div class="logistics model">
                <div class="title">
                    商品物流
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="[包装]长:" prop="volume_length">
                                {{ detailData.volume_length }}mm
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="[包装]宽:" prop="volume_width">
                                {{ detailData.volume_width }}mm
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="[包装]高:" prop="volume_height">
                                {{ detailData.volume_height }}mm
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="商品毛重:" prop="weight">
                                {{ detailData.weight }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- <div class="afterSale model">
                <div class="title">
                    商品售后
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="包装清单:" prop="aftersale_invoice">
                                {{ detailData.aftersale_invoice | validVal }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="售后服务:" prop="aftersale_service">
                                {{ detailData.aftersale_service | validVal }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="售后说明:" prop="aftersale_info">
                                {{ detailData.aftersale_info | validVal }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div> -->
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'ProductDetail',
        props: {
            detailData: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            // 头图+次图
            imgs() {
                return [this.detailData.thumb].concat(this.detailData.imgs);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../styles/variables";
    .productDetail {
        .model {
            border: 1px solid $border;
            border-top: 2px solid #999;
            margin: 10px 0;
             box-sizing:border-box;
        }
        .title {
            font-weight: bold;
            padding: 10px;
            background: #f7f7f7;
            margin-top:0 !important;
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
        .el-form-item--mini.el-form-item {
            margin-bottom: 8px;
        }
    }
</style>
