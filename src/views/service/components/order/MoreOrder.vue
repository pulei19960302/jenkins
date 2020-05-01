<template>
    <div class="customer">
        <section class="list" v-for="item in list" :key="item.id">
            <div class="sale-info border-bottom">
                <p><span>工单编号：</span><span>{{item.return_sn}}</span><span class="span-btn">{{item.type_name}}</span></p>
                <p><span>订单编号：</span><span>{{item.order.order_sn}}</span><span class="span-btn">{{item.status_name}}</span></p>
                <p><span>物流单号：</span><span>{{item.order.logistics_sn}}</span></p>
                <p><span>运费险：</span><span>{{item.order.insurance_fee}}</span></p>
                <el-button type="primary" @click.stop="handleChange(item.id)" v-if="item.status==1||item.status==10||item.status==15||item.status==11">处理</el-button>
                <el-button type="primary" @click.stop="handleChange(item.id)" v-if="item.status==12">查看</el-button>
            </div>
            <div class="product-info border-bottom" v-for="second in item.orderExtend" :key="second.id">
                <img v-bind:src="second.goods_thumb" @click="handlePreviewImg(second.goods_thumb)"/>
                <p>
                    <span>{{second.goods_name}}</span>
                    <span>{{second.sku_properties_name}}</span>
                    <span>数量：{{second.nums}}</span>
                </p>
            </div>
        </section>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <el-pagination
            v-show="count!=0"
            class="pagation"
            small
            :total="count"
            :page-size="pageSize"
            :current-page="current"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            layout="total, prev, pager, next">
        </el-pagination>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%">
            <afterSaleApplicationDetail ref="detail" @successCBK="successCallback"/>
        </RightSidePopup>
    </div>
</template>

<script>
    import afterSaleApplicationDetail from '../../../order/afterSaleApplicationDetail';
    export default {
        name: 'MoreOrder',
        props: {
            userObj:[Object],
            refresh:[Number],
        },
        components: {afterSaleApplicationDetail},
        data() {
            return {
                visible: false,
                rghtPopupVisible: false,
                previewImg: '',
                pageSize:5,
                uid:'',
                list:[],
                count:0,
                current: 1,
            }
        },
        computed: {},
        watch: {
            'userObj'(val){
                this.uid = val.id;
                this.getMore();
            },
            'refresh'(val){
                this.getMore();
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleChange(id) {
                if(!id) return;
                this.rghtPopupVisible = true;
                this.$refs.detail.getDetailData(id);
            },
            successCallback() {
                this.getMore();
                this.rghtPopupVisible = false;
            },
            handlePreviewImg(img) {
                this.visible = true;
                this.previewImg = img;
            },
            async getMore(){
                const { data } = await this.$api.order.orderlist({uid:this.uid,pageSize:this.pageSize,page:this.current});
                this.list=data.items;
                this.count=data.total_num;
            },
            handlePageChange(val) {
                this.current = val;
                this.getMore();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getMore();
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../styles/variables";
    .customer {
        color: #333;
        .border-bottom {
            border-bottom: 2px solid #eef6fe;
        }
        @mixin base-flex {
            display: flex;
            align-items: center;
        }
        .user-info {
            @include base-flex;
            padding: 10px;
            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 10px;
            }
            span {
                display: block;
                &:first-child {
                    margin-bottom: 6px;
                    font-weight: 400;
                }
                &:last-child {
                    color: #c0c4cc;
                    font-size: 12px;
                }
            }
        }
        .sale-info {
            padding: 10px;
            p {
                line-height: 1.5;
            }
        }
        .product-info {
            @include base-flex;
            padding: 10px;
            img {
                width: 60px;
                margin-right: 10px;
            }
            span {
                display: block;
                &:first-child {
                    margin-bottom: 6px;
                    font-weight: 400;
                }
            }
        }
        .list{
            margin-bottom: 15px;
            border-top: 1px solid $border;
        }
        .span-btn{
            float: right;
            color: #1890FF;
        }
    }
    .customer .list:first-child{border-top: 0}
</style>
