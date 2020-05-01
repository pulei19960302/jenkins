<template>
    <div class="order-component-detail">
        <div class="header">
            <el-row :gutter="32">
                <el-col :span="8">
                    <div class="card">
                        <div class="card-title">订单数</div>
                        <div class="number">{{ order_count }}</div>
                        <img src="../../../assets/user/order.png" alt="">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="card">
                        <div class="card-title">商品数</div>
                        <div class="number">{{ goods_num }}</div>
                        <img src="../../../assets/user/goods.png" alt="">

                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="card">
                        <div class="card-title">订单金额</div>
                        <div class="number">{{ order_amount }}</div>
                        <img src="../../../assets/user/money.png" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content">
            <el-row style="margin-bottom: 14px">
                <el-col :span="24">
                    <el-input v-model="order_sn" placeholder="请输入订单号" clearable style="width: 240px; margin-right: 16px"/>
                    <el-input v-model="goods_title" placeholder="请输入商品名称" clearable style="width: 240px; margin-right: 16px"/>
                    <el-date-picker
                        @change="dateChange"
                        value-format="yyyy-MM-dd"
                        style="width: 240px; margin-right: 16px"
                        v-model="times"
                        align="right"
                        type="daterange"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" @click="loading=true;initData()">搜索</el-button>
                </el-col>
            </el-row>
            <el-row class="table">
<!--                <el-col :span="24">-->
<!--                    <el-table style="width: 100%">-->
<!--                        <el-table-column label="商品信息"/>-->
<!--                        <el-table-column label="单价/数量"/>-->
<!--                        <el-table-column label="订单类型"/>-->
<!--                        <el-table-column label="订单状态"/>-->
<!--                        <el-table-column label="实付金额"/>-->
<!--                        <el-table-column label="总计返利"/>-->
<!--                    </el-table>-->
<!--                </el-col>-->
                <el-col :span="4">商品信息</el-col>
                <el-col :span="4" align="center">单价/数量</el-col>
                <el-col :span="4" align="center">订单类型</el-col>
                <el-col :span="4" align="center">订单状态</el-col>
                <el-col :span="4" align="center">实付金额</el-col>
                <el-col :span="4" align="center">总计返利</el-col>
            </el-row>
            <el-row v-loading="loading" class="card-box" v-if="tableData && tableData.length !== 0">
                <el-row v-for="item in tableData" :key="item.id" class="goods-card">
                    <el-row>
                        <el-col :span="24">
                            <div class="order-info-title">
                                <el-row>
                                    <el-col :span="6">
                                        订单号：{{item.order_sn}}
                                    </el-col>
                                    <el-col :span="6">
                                        下单时间：{{ item.created_at }}
                                    </el-col>
                                    <el-col :span="6">
                                        订单来源：{{ item.from_name }}
                                    </el-col>
<!--                                    <el-col :span="6">-->
<!--                                        <div style="text-align: right">-->
<!--                                            账户名称：{{item.buyer_nickname}}-->
<!--                                        </div>-->
<!--                                    </el-col>-->
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="padding: 14px;">
                        <el-col :span="4">
                            <div class="goods-info" v-for="recoed in item.goods_list" :key="recoed.goods_id">
                                <div class="goods-img">
                                    <img :src="recoed.goods_thumb" alt="">
<!--                                    <img src="http://file02.16sucai.com/d/file/2014/0903/7512230abc4724321254dcac513c6ec8.jpg" alt="">-->
                                </div>
                                <div class="goods-base">
                                    <div class="goods-title jz-els-2">
                                        {{recoed.goods_title}}
<!--                                        圣所 进阶 王德兰 我们很好 我继续 那些你很冒险的梦 圣所2019世界巡回演唱会成都站-->
                                    </div>
                                    <div class="good">
                                        <span class="name">规格：</span>
                                        <span>
                                            {{recoed.sku_properties_name}}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </el-col>
                        <el-col :span="4">
                            <div class="good-number" v-for="recoed in item.goods_list" :key="recoed.goods_id">
                                <div class="number">
                                    <!-- 单价 金额 -->
                                    ¥ {{recoed.shop_price }}
                                </div>
                                <div class="moon">
                                    <!--（1件）-->
                                    （{{recoed.nums}}）件
                                </div>
                            </div>
                        </el-col>

                        <el-col :span="4">
                            <div class="goods-type">
<!--                                 礼包商品-->
                                {{item.type_name}}
                            </div>
                        </el-col>

                        <el-col :span="4">
                            <div class="goods-status">
                                <!-- 订单状态 -->
                                {{ item.status_name  }}
                            </div>
                        </el-col>

                        <el-col :span="4">
                            <div class="good-pay">
                                <div class="money">¥{{item.actual_fee}}</div>
                                <div class="cost">含运费:¥{{item.freight_fee}}</div>
                                <div class="cost">运费险:¥{{item.insurance_fee}}</div>
                                <div class="pay-type">
                                    <!-- 余额支付+微信支付-->
                                    {{item.pay_type_name}}
                                </div>
                            </div>
                        </el-col>

                        <el-col :span="4">
                            <div class="good-money">
                                ¥{{item.rebate_fee}}
                            </div>
                        </el-col>
                    </el-row>
                </el-row>
            </el-row>

            <el-row v-else>
                <el-col :span="24" style="text-align: center;min-height: 60px;line-height: 60px;color: #909399">
                    暂无数据
                </el-col>
            </el-row>
            <el-pagination
                v-if="count !== 0"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui';
    import moment from 'moment';
    export default {
        name: "orderDetail",
        props: {
            uid: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                isLoading: false,
                loading: false,
                value2: '',
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [date, date]);
                        }
                    }, {
                        text: '三天内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 *3);
                            picker.$emit('pick', [date, new Date()])
                        }
                    }, {
                        text: '一周内',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [date, new Date()]);
                        }
                    }]
                },
                loadingInstance: null,
                page: 1,
                pageSize: 10,
                order_sn: '',
                goods_title: '',
                start_time: '',
                end_time: '',
                count: 0,
                times: [], // string
                tableData: [],


                order_count: 0, // 订单总数
                goods_num: 0, // 商品总数
                order_amount: 0.00,// 订单总额
            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.order-component-detail'
            });
            this.initData();
        },
        methods: {
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;background: #f2f2f2'
                }
            },

            async initData () {
                try {
                    const { data } = await this.$api.updateUser.getOrders(this.getRequestParam());
                    console.log(data);
                    this.count = data && Number(data.count);
                    this.tableData = data && data.items;
                    this.order_count = data && data.count; // 订单总数
                    this.goods_num = data && data.goods_num; // 商品数量
                    this.order_amount = data && data.order_amount; // 商品总价格
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loadingInstance.close();
                    this.loading = false;
                }
            },

            getRequestParam() {
                return {
                    uid: this.uid,
                    page: this.page,
                    pageSize: this.pageSize,
                    order_sn: this.order_sn,
                    goods_title: this.goods_title,
                    start_time: this.start_time,
                    end_time: this.end_time,
                }
            },
            handleCurrentChange (v) {
                this.page = v;
                this.loading = true;
                this.initData();
            },

            dateChange () {
                console.log(this.times);
                if (!!this.times) {
                    this.start_time = this.times[0];
                    this.end_time = this.times[1];
                } else {
                    this.start_time = "";
                    this.end_time = "";
                }
            //    this.end_time = !!this.start_time ? moment().format('YYYY-MM-DD') : '';
            }
        }
    }
</script>

<style scoped lang="scss">
    .order-component-detail {
        margin-top: 25px;
        .header {
            .card {
                height: 130px;
                padding: 24px 24px 22px 24px;
                border-radius:10px;
                border:2px solid rgba(237,237,237,1);
                position: relative;
                .card-title {
                    font-size:16px;
                    font-weight:400;
                    color:rgba(119,119,119,1);
                    line-height:28px;
                    margin-bottom: 8px;
                }
                .number {
                    font-size:34px;
                    font-weight:600;
                    line-height:48px;
                }
                img {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    top: 45px;
                    right: 9px;
                }
            }
        }
        .content {
            margin: 15px 0 16px 0;
            .card-box {
                /*height: 450px;*/
                /*overflow-y: scroll;*/
                .goods-card {
                    border-radius:4px;
                    border:1px solid rgba(232,232,232,1);
                    margin-bottom: 16px;
                    .order-info-title {
                        padding: 0 14px;
                        height: 40px;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(0,0,0,0.65);
                        line-height:40px;
                        border-bottom:1px solid rgba(232,232,232,1);
                    }
                    .goods-info {
                        display: flex;
                        .goods-img {
                            width: 60px;
                            height: 60px;
                            margin-right: 6px;
                            img {
                                width: 60px;
                                height: 60px;
                            }
                        }
                        .goods-base {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .goods-title {
                                font-size:12px;
                                font-weight:400;
                                color:rgba(0,0,0,0.85);
                            }
                            .good {
                                .name {
                                    color: rgba(0, 0, 0, 0.45) !important;
                                }
                                color: rgba(0, 0, 0, 0.65);
                            }
                        }

                    }
                    .good-number {
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(0,0,0,0.45);
                        line-height:17px;
                        .moon {
                            margin-top: 17px;
                        }
                    }
                    .goods-type {
                        text-align: center;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(0,0,0,0.85);
                        line-height:17px;
                    }

                    .good-pay {
                        height: 100%;
                        text-align: center;
                        .money {
                            font-size:14px;
                            font-weight:600;
                            color:rgba(0,0,0,0.85);
                            line-height:20px;
                            margin-bottom: 5px;
                        }
                        .cost {
                            font-weight:400;
                            color:rgba(0,0,0,0.85);
                            line-height:17px;
                            font-size:12px;
                            margin-bottom: 5px;
                        }
                        .pay-type {
                            font-size:12px;
                            font-weight:400;
                            color:rgba(0,0,0,0.45);
                            line-height:17px;
                        }
                    }
                    .goods-status {
                        text-align: center;
                        font-size:12px;
                        font-weight:400;
                        color:rgba(0,0,0,0.85);
                        line-height:17px;
                    }
                    .good-money {
                        text-align: center;
                        font-size:14px;
                        font-weight:600;
                        color:rgba(0,0,0,0.85);
                        line-height:20px;
                    }

                    .jz-els-2{
                        display: -webkit-box;
                        //   display: box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        word-break: break-all;
                        white-space: normal !important;
                        -webkit-line-clamp: 2;
                        /* 下面这个注释不能删掉 删掉了会炸 */
                        /* autoprefixer: off */
                        -webkit-box-orient: vertical !important;
                    }
                }
            }

        }
    }
</style>

<style lang="scss">
    .order-component-detail {
        .content {
            .table {
                border-bottom: 1px solid #ffffff;
                margin-bottom: 20px;
                .el-table__empty-block {
                    display: none;
                }
            }
        }
    }
</style>
