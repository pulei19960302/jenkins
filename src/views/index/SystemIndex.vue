<template>
    <div class="system-index" >
        <div v-if="!isAdmin">
            <PanelGroup  :firstData="firstData"></PanelGroup>
            <div class="waiting">
                <p class="title">待处理事务</p>
                <ul class="waiting-content">
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('orderList', 1, '/order/list')">
                        <p>完成订单</p>
                        <p>{{secondData.finishNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('DeliveryList', 20 , '/order-delivery/list')">
                        <p>待发货</p>
                        <p>{{secondData.waitSendNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('orderList', 3, '/order/list')">
                        <p>已发货</p>
                        <p>{{secondData.waitGetNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('orderList', 5, '/order/list')">
                        <p>待支付</p>
                        <p>{{secondData.waitPayNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('afterSaleApplication', 20, '/order-sale/sale-list')">
                        <p>售后待处理</p>
                        <p>{{secondData.waitSalesNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('afterSaleApplication', 1, '/order-sale/sale-list')">
                        <p>售后换货处理</p>
                        <p>{{secondData.waitSalesExchangeNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('afterSaleApplication', 20, '/order-sale/sale-list')">
                        <p>售后退货处理</p>
                        <p>{{secondData.waitSalesRefundNum}}</p>
                    </li>
                    <li
                        class="gradient-border-bottom"
                        @click="jumpRouter('orderList', 2, '/order/list')">
                        <p>等待财务审核</p>
                        <p>{{secondData.waitFinanceNum}}</p>
                    </li>
                </ul>
            </div>
            <div class="entry">
                <p class="title">运营快捷入口</p>
                <ul class="entry-content">
                    <li
                        v-for="(item, index) in entrys"
                        :key="index"
                        @click="jumpRouter(item.router, null, item.permission)"
                    >
                        <svg class="icon" aria-hidden="true" style="font-size: 40px;">
                            <use :xlink:href="`#${item.icon}`"></use>
                        </svg>
                        <p style="margin-top: 20px;">{{ item.name }}</p>
                    </li>
                </ul>
            </div>
            <div class="overview">
                <div class="overview-product">
                    <p class="title">商品总览</p>
                    <ul class="entry-content">
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{goods_data.start_tuan}}</p>
                            <p style="margin-top: 20px;">已开团</p>
                        </li>
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{goods_data.wei_tuan}}</p>
                            <p style="margin-top: 20px;">未开团</p>
                        </li>
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{goods_data.goods_num}}</p>
                            <p style="margin-top: 20px;">全部商品</p>
                        </li>
                    </ul>
                </div>
                <div class="overview-user">
                    <p class="title">用户总览</p>
                    <ul class="entry-content">
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{member_data.todayMemberNum}}</p>
                            <p style="margin-top: 20px;">今日新增</p>
                        </li>
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{member_data.yesTodayMemberNum}}</p>
                            <p style="margin-top: 20px;">昨日新增</p>
                        </li>
                        <li style="cursor: auto;font-weight: normal">
                            <p>{{member_data.monthMemberNum}}</p>
                            <p style="margin-top: 20px;">本月新增</p>
                        </li>
                        <!--<li style="cursor: auto;font-weight: normal">-->
                        <!--<p>410</p>-->
                        <!--<p style="margin-top: 20px;">粉丝总数</p>-->
                        <!--</li>-->
                    </ul>
                </div>
            </div>
            <div class="order">
                <p class="title">订单统计</p>
                <div class="order-content">
                    <div class="order-content-left">
                        <div>
                            <p>本月订单总数</p>
                            <p>{{orderData.monthOrderNum}}</p>
                            <!--<p>-->
                            <!--<span>-->
                            <!--<svg-icon icon-name="arrowgraphupright" />-->
                            <!--9%-->
                            <!--</span>-->
                            <!--同比上周-->
                            <!--</p>-->
                        </div>
                        <div style="margin-top: 40px;">
                            <p>本周订单数量</p>
                            <p>{{orderData.weekOrderNum}}</p>
                            <!--<p>-->
                            <!--<span style="color: red;">-->
                            <!--<svg-icon icon-name="arrowgraphdownright" />-->
                            <!--6%-->
                            <!--</span>-->
                            <!--同比上周-->
                            <!--</p>-->
                        </div>
                    </div>
                    <div class="order-content-right">
                        <div style="text-align: right">
                            <el-radio-group v-model="date_type1" @change="line1" size="mini" style="vertical-align: 5px;">
                                <el-radio-button label="1">昨日</el-radio-button>
                                <el-radio-button label="2">本周</el-radio-button>
                                <el-radio-button label="3">本月</el-radio-button>
                            </el-radio-group>
                            <el-date-picker
                                @change="chooseDetail"
                                size="mini"
                                v-model="datePickerValue1"
                                :picker-options="pickerOptions"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <LineChart :chart-data="lineChartDataOrder" />
                    </div>
                </div>
            </div>
            <div class="order">
                <p class="title">销售统计</p>
                <div class="order-content">
                    <div class="order-content-left">
                        <div>
                            <p>本月销售总额</p>
                            <p>{{saleData.monthOrderFee}}</p>
                            <!--<p>-->
                            <!--<span>-->
                            <!--<svg-icon icon-name="arrowgraphupright" />-->
                            <!--10%-->
                            <!--</span>-->
                            <!--同比上周-->
                            <!--</p>-->
                        </div>
                        <div style="margin-top: 40px;">
                            <p>本周销售总额</p>
                            <p>{{saleData.weekOrderFee}}</p>
                            <!--<p>-->
                            <!--<span style="color: red;">-->
                            <!--<svg-icon icon-name="arrowgraphdownright" />-->
                            <!--8%-->
                            <!--</span>-->
                            <!--同比上周-->
                            <!--</p>-->
                        </div>
                    </div>
                    <div class="order-content-right">
                        <div style="text-align: right">
                            <el-radio-group v-model="date_type2" @change="line2" size="mini" style="vertical-align: 5px;">
                                <el-radio-button label="1">昨日</el-radio-button>
                                <el-radio-button label="2">本周</el-radio-button>
                                <el-radio-button label="3">本月</el-radio-button>
                            </el-radio-group>
                            <el-date-picker
                                @change="chooseDetail2"
                                size="mini"
                                v-model="datePickerValue2"
                                :picker-options="pickerOptions"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <LineChart :chart-data="lineChartDataSale"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <iframe id="iframe" width="100%" src="http://jzadb.ec-cloudtech.com/web/indexMYCP.html?customer_code=MYCP&customer_id=MYCP_101&customer_secret=58717039d9256527a7bfad0342766132"></iframe>
        </div>
    </div>


</template>

<script>
    import { mapGetters } from 'vuex';
    import PanelGroup from './components/PanelGroup';
    import LineChart from '@/OMS/components/chart/LineChart';
    import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'

    export default {
        name: "SystemIndex",
        components: {
            PanelGroup,
            LineChart
        },
        data() {
            return {
                isAdmin: false,
                datePickerValue1: '',
                datePickerValue2: '',
                pickerOptions,
                lineChartDataOrder: {
                    legend: ['近一周订单统计'],
                    xAxis: ['11-12 周一', '11-13 周二', '11-14 周三', '11-15 周四', '11-16 周五', '11-17 周六', '11-18 周天'],
                    series: [
                        { name: '近一周订单统计', data: [100, 60, 150, 200, 100, 50, 60] }
                    ]
                },
                lineChartDataSale: {
                    legend: ['近一周销售统计'],
                    xAxis: ['11-12 周一', '11-13 周二', '11-14 周三', '11-15 周四', '11-16 周五', '11-17 周六', '11-18 周天'],
                    series: [
                        { name: '近一周销售统计', data: [1000, 3000, 4000, 2800, 3000, 2800, 1000] }
                    ]
                },
                entrys: [
                    { name: '添加商品', icon: 'icon-jiufuqianbaoicon06', router: 'AddProduct', permission: '/goods/save' },
                    { name: '订单列表', icon: 'icon-order', router: 'orderList', permission: '/order/list' },
                    { name: '用户管理', icon: 'icon-yonghuguanli', router: 'userList', permission: '/member/list' },
                    { name: '交易统计', icon: 'icon-zengchang', router: 'Trade', permission: '/dasdas' }, // 交易统计权限乱写。没有这个页面了
                    // { name: '短信营销', icon: 'icon-shoujiduanxin', router: 'ShortMsg' },
                    // { name: '广告管理', icon: 'icon-ad', router: 'AdList' },
                    // { name: '专题管理', icon: 'icon-zhuanti', router: 'SpecialTopicList' },
                    // { name: '秒杀管理', icon: 'icon-miaosha', router: 'Seckill' },
                    // { name: '新品推荐', icon: 'icon-xinpinicon', router: '/' },
                ],
                firstData:{},
                secondData:{},
                goods_data:{},
                member_data:{
                    todayMemberNum:0,
                    yesTodayMemberNum:0,
                    monthMemberNum:0
                },
                orderData:{},
                saleData:{},
                date_type1:1,//1今天   2一周  3月
                date_type2:1,//1今天   2一周  3月
            }
        },
        created(){
            this.getData();
            this.line1();
            this.line2();
            this.getMember();
        },

        computed: {
            ...mapGetters(['get_userInfo']),
        },

        mounted() {
            if (this.get_userInfo && this.get_userInfo.role && this.get_userInfo.role.includes('admin')) {
                this.isAdmin = true;
            }
        },
        methods: {
            jumpRouter(name, type, authority) {
                const permissions = this.get_userInfo.menu_permissions;
                if (!!authority && permissions) {
                    console.log(permissions.includes(authority));
                    if (permissions.includes(authority)) {
                        this.$router.push({ name, query: { type } })
                    } else {
                        // 不成功操作
                    }
                } else if (!authority) {
                    this.$router.push({ name, query: { type } })
                }
                // this.$router.push({ name, query: { type } })
            },
            getMember(){
                this.$api.login.SystemMember().then(res=>{
                    Object.assign(this.member_data,res.data.member_data)
                })
            },
            async getData(){
                const {data}= await this.$api.login.SystemIndex();
                let first_Data=data.data1;
                for(let index in first_Data){
                    first_Data[index]=Number(first_Data[index])
                }
                this.firstData=first_Data;
                this.secondData=data.data2;
                this.goods_data=data.goods_data;
                // this.member_data=data.member_data;
            } ,
            async line1(detail){
                const {data}= await this.$api.login.SystemOrder({
                    date_type:this.date_type1,
                    ...detail,
                });
                this.lineChartDataOrder.xAxis=data.line.x;
                this.lineChartDataOrder.series[0].data=data.line.y;
                this.orderData=data.stat;
            },
            chooseDetail(e){
                let start_time=this.$moment(e[0]).format('YYYY-MM-DD');
                let end_time=this.$moment(e[1]).format('YYYY-MM-DD');
                this.line1({
                    start_time:start_time,
                    end_time:end_time
                });
            },
            async line2(detail){
                const {data}= await this.$api.login.SystemMoney({
                    date_type:this.date_type2,
                    ...detail,
                });
                this.lineChartDataSale.xAxis=data.line.x;
                this.lineChartDataSale.series[0].data=data.line.y;
                this.saleData=data.stat;
            },
            chooseDetail2(e){
                let start_time=this.$moment(e[0]).format('YYYY-MM-DD');
                let end_time=this.$moment(e[1]).format('YYYY-MM-DD');
                this.line2({
                    start_time:start_time,
                    end_time:end_time
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/variables";

    @mixin box-shadow() {
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
        margin-bottom: 20px;
        background: #fff;
    }
    .system-index {
        width: 100%;
        height: 100%;
        .waiting {
            @include box-shadow;
            &-content {
                padding: 0 40px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li {
                    position: relative;
                    width: 26%;
                    padding: 12px;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid $border;
                    p:last-child {
                        color: red;
                    }
                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
        .entry {
            @include box-shadow;
            &-content {
                padding: 10px 46px;
                display: flex;
                justify-content: space-between;
                li {
                    text-align: center;
                    &:hover {
                        cursor: pointer;
                        font-weight: bold;
                        color: $theme;
                        .entry-icon {
                            color: $theme;
                        }
                    }
                }
            }
            &-icon {
                color: #999;
                font-size: 50px;
            }
        }
        .overview {
            background: transparent;
            display: flex;
            justify-content: space-between;
            &-product, &-user {
                width: 49%;
                background: #fff;
                @include box-shadow;
            }
            ul {
                li {
                    p:first-child {
                        font-size: 20px;
                        color: red;
                    }
                }
            }
        }
        .order {
            @include box-shadow;
            &-content {
                display: flex;
                justify-content: space-between;
                &-left {
                    width: 20%;
                    border-right: 1px solid $border;
                    text-align: center;
                    padding-top: 100px;
                    svg {
                        font-size: 22px;
                    }
                    p {
                        &:nth-of-type(2) {
                            font-weight: 600;
                            font-size: 20px;
                            margin: 10px 0;
                        }
                        &:nth-of-type(3) {
                            span {
                                color: green;
                                margin-right: 10px;
                            }
                        }
                    }
                }
                &-right {
                    width: 80%;
                    background: #fff;
                    padding: 20px;
                }
            }
        }
        .title {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fff;
            padding-left: 20px;
            font-weight: 600;
            font-size: 16px;
        }

        #iframe {
            height: calc(100vh - 114px);
            border: none;
        }
    }
</style>
