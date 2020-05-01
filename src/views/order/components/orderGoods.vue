<template>
    <div class="order-goods">
        <el-card shadow="never">
            <div slot="header">
                <span class="card-header">商品信息</span>
            </div>
            <div class="card-context">
                <el-table
                    :data="goods_info.goods_list"
                    border
                    :header-cell-style="tableHeaderColor"
                    header-align="center"
                >
                    <el-table-column label="商品图片" align="center">
                        <template slot-scope="scope">
                            <div @click="showBigImg(scope.row.goods_thumb)">
                                <img :src="scope.row.goods_thumb" alt="" width="80"/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="goods_title" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.goods_title }}
                            <a style="color: #1890ff" @click.stop="lookDetails(scope.row)" v-permission="[$api.product.addGoods.detail]">
                                {{ `（商品ID：${scope.row.goods_id}）` }}
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品规格" prop="sku_properties_name" align="center"/>
                    <el-table-column label="单价" align="center">
                        <template slot-scope="scope">
                            <div>
                                ¥{{scope.row.shop_price}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" prop="nums" align="center"/>
                    <el-table-column label="小计" align="center">
                        <template slot-scope="scope">
                            <div>
                                ¥{{scope.row.shop_price_total}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="remarks">
                    <span style="opacity: 0.45">
                        买家备注：
                    </span>
                    <span style="opacity: 0.4">
                        {{ goods_info.buyer_message }}
                    </span>
                </div>

                <div class="remarks">
                    <span style="opacity: 0.45">
                        卖家备注：
                    </span>
                    <span style="opacity: 0.4">
                        {{ goods_info.remark }}
                    </span>
                </div>

                <div class="total">
                    <div class="infor">
                        <span class="label">商品总额：</span>
                        <span class="value">¥{{goods_info.goods_fee}}</span>
                    </div>
                    <div class="infor">
                        <span class="label">下单立减：</span>
                        <span class="value">¥{{goods_info.diff_fee}}</span>
                    </div>
                    <div class="infor">
                        <span class="label">订单运费：</span>
                        <span class="value">¥{{goods_info.freight_fee}}</span>
                    </div>
                    <div class="infor">
                        <span class="label">退换省心：</span>
                        <span class="value">¥{{ goods_info.insurance_fee }}</span>
                    </div>
                    <div class="infor">
                        <span class="label">实付金额：</span>
                        <span class="value" style="color: #F5222D">¥{{goods_info.actual_fee}}</span>
                    </div>
                </div>
            </div>
        </el-card>

        <PreviewImg :visible.sync="visible" :img-src="previewImg"/>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%"><ProductDetail :detailData="detailData"/></RightSidePopup>
    </div>
</template>

<script>
    import ProductDetail from '@/views/product/productManage/components/ProductDetail';
    export default {
        name: "orderGoods",
        props: {
            goods_info: {
                type: Object,
                default: () => {
                }
            }
        },
        components: {ProductDetail},
        data () {
            return {
                visible: false,
                previewImg: '',
                detailData: {},
                rghtPopupVisible: false,
            }
        },
        methods: {
            async lookDetails(row) {
                const { data } = await this.$api.product.getdetail({ id: row.goods_id });
                this.detailData = Object.assign({}, data.detail);
                this.rghtPopupVisible = true;
            },
            tableHeaderColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;background: #fff'
                }
            },

            showBigImg (imgUrl) {
                this.visible = true;
                this.previewImg = imgUrl;
            }
        }
    }
</script>

<style scoped lang="scss">
    .order-goods {
        margin-bottom: 16px;

        .card-header {
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            line-height: 24px;
        }

        .card-context {
            .remarks {
                height: 30px;
                border: 1px solid rgba(232, 232, 232, 1);
                border-top: none;
                line-height: 30px;
                padding-left: 16px;
                font-size: 12px;
                font-weight: 400;
                color: #000000;
            }

            .total {
                height: 40px;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;

                border: 1px solid rgba(232, 232, 232, 1);
                border-top: none;
                line-height: 40px;
                display: flex;
                justify-content: flex-end;
                padding-right: 16px;

                :last-child {
                    margin-right: 0 !important;
                }

                .infor {
                    margin-right: 58px;
                    font-size: 14px;
                    font-weight: 400;

                    .label {
                        color: rgba(148, 148, 148, 1);
                    }

                    .value {
                        color: rgba(0, 0, 0, 0.65);
                    }
                }
            }
        }
    }
</style>
