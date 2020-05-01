<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash;搜索&ndash;&gt;-->
<!--        <Search-->
<!--            :searchOPtions=searchOPtions-->
<!--            @searchCallback=handelSearch>-->
<!--            <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.recharge.export"  v-permission="[$api.finance.recharge.export]"/>-->
<!--        </Search>-->
<!--        <div class="top-slot">-->
<!--            符合搜索条件的数据共 <b>{{ count }}</b> 条-->
<!--        </div>-->
<!--        <template>-->
<!--            <el-table-->
<!--                element-loading-spinner="el-icon-loading"-->
<!--                :highlight-current-row="true"-->
<!--                v-loading="loading"-->
<!--                border-->
<!--                ref="multipleTable"-->
<!--                :data="tableData"-->
<!--                tooltip-effect="dark"-->
<!--                style="width: 100%"-->
<!--                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" -->
<!--                @selection-change="handleSelectionChange">-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="日期"-->
<!--                    prop="pay_time"-->
<!--                    show-overflow-tooltip>-->
<!--                    <template slot-scope="scope">-->
<!--                        {{ scope.row.date | validVal }}-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    prop="balance"-->
<!--                    label="账户余额">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="冻结资金"-->
<!--                    prop="freeze"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="冻结佣金"-->
<!--                    prop="reward"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="提现金额"-->
<!--                    prop="withdraw">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="用户充值"-->
<!--                    prop="recharge">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="下单消费"-->
<!--                    prop="order_fee">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="佣金"-->
<!--                    prop="diff_fee">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="一级奖励"-->
<!--                    prop="first_fee">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="二级奖励"-->
<!--                    prop="second_fee">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="团队奖励"-->
<!--                    prop="team_fee"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="一级合伙人奖励"-->
<!--                    prop="first_team_fee"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="二级合伙人奖励"-->
<!--                    prop="second_team_fee"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="售后退款"-->
<!--                    prop="sale_refund"-->
<!--                    show-overflow-tooltip>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="取消退款"-->
<!--                    prop="cancel_refund">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="后台录款"-->
<!--                    prop="admin_add">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="售后补款"-->
<!--                    prop="sale_add">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="后台扣款"-->
<!--                    prop="admin_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="售后扣款"-->
<!--                    prop="sale_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="佣金扣款"-->
<!--                    prop="diff_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="一级扣款"-->
<!--                    prop="first_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="二级扣款"-->
<!--                    prop="second_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="团队扣款"-->
<!--                    prop="team_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="一级合伙人扣款"-->
<!--                    prop="first_team_minus">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    align="center"-->
<!--                    label="二级合伙人扣款"-->
<!--                    prop="second_team_minus">-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--            <Pagination-->
<!--                :current="current"-->
<!--                :pageSize="pageSize"-->
<!--                :count="count"-->
<!--                @pageChangeCBK="handlePageChange"-->
<!--                @sizeChangeCBK="handleSizeChange">-->
<!--                <div class="slot" slot="left-content"></div>-->
<!--            </Pagination>-->
<!--        </template>-->
<!--    </div>-->
<!--</template>-->

<template>
    <div class="money-statistics">

        <div class="card-box">
            <div class="box" :style="{background: (flag ===1 ? '#fff':'#DBEEFF')}">
                <div class="padding0 box1">
                    <div class="title">
                        订单金额（元）
                        <el-tooltip class="item" effect="dark" content="订单金额=已付款-取消订单" placement="top-start">
                            <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                        </el-tooltip>
                    </div>
                    <div class="money-number" style="color:#2E9BFF;">
                        {{ requestBody.total_amount | money }}
                    </div>

                    <div class="l-title">
                        <div class="label">已付款（元）</div>
                        <div class="value">{{ requestBody.payed_amount | money }}</div>
                    </div>

                    <div class="l-title" style="margin-bottom: 0">
                        <div class="label">取消订单（元）</div>
                        <div class="value">{{ requestBody.cancel_amount | money }}</div>
                    </div>
                </div>

                <div class="box2">
                    <div class="box-content-total">
                        <div class="total">
                            <div class="img">
                                <img src="../../assets/fms/balance.png" alt="" width="32">
                            </div>
                            <div class="content">
                                <div class="label">余额支付金额（元）</div>
                                <div class="value">{{ requestBody.wallet_amount | money }}</div>
                            </div>
                        </div>

                        <div class="total">
                            <div class="img">
                                <img src="../../assets/fms/wxchat.png" alt="" width="32">
                            </div>
                            <div class="content">
                                <div class="label">微信支付金额（元）</div>
                                <div class="value">{{ requestBody.wx_amount | money }}</div>
                            </div>
                        </div>

                        <div class="total">
                            <div class="img">
                                <img src="../../assets/fms/alipay.png" alt="" width="32">
                            </div>
                            <div class="content">
                                <div class="label">支付宝支付金额（元）</div>
                                <div class="value">{{ requestBody.ali_amount| money }}</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="changeBtn" :class="[flag !== 1 ? 'label-tag-two': '', 'label-tag']" @click="handleClickTranForm">
                    <span v-if="flag !== 1">明细</span>
                    <span v-else>合计</span>
                </div>

                <img src="../../assets/fms/goods.png" alt="" width="44">
            </div>

            <div class="assets wd20">
                <div class="title">返利金额（元）
                    <el-tooltip class="item" effect="dark" content="返利金额=用户返利-扣除返利" placement="top-start">
                        <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                    </el-tooltip>
                </div>
                <div class="money-number" style="color:#FF9F2E;">{{ requestBody.total_fanli | money }}</div>

                <div class="l-title">
                    <div class="label" style="width: 110px">用户返利（元）
                        <el-tooltip class="item" effect="dark" content="用户返利=已结算+待结算+已删除" placement="top-start">
                            <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                        </el-tooltip>
                    </div>
                    <div class="value">{{ requestBody.total_plat_fanli | money }}</div>
                </div>

                <div class="l-title" style="margin-bottom: 0">
                    <div class="label" style="width: 110px">扣除返利（元）
                        <el-tooltip class="item" effect="dark" content="扣除返利=取消订单扣除+售后扣除" placement="top-start">
                            <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                        </el-tooltip>
                    </div>
                    <div class="value">{{ requestBody.total_kou_fanli | money }}</div>
                </div>

                <img src="../../assets/fms/money.png" alt="" width="44">

            </div>

            <div class="assets wd20">
                <div class="title">总售后金额（元）
                    <el-tooltip class="item" effect="dark" content="总售后金额=总退款金额+总补偿金额" placement="top-start">
                        <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                    </el-tooltip>
                </div>
                <div class="money-number" style="color:#31AC45;">{{ requestBody.total_sales | money }}</div>

                <div class="l-title">
                    <div class="label">总退款金额（元）</div>
                    <div class="value">{{ requestBody.total_tui | money }}</div>
                </div>

                <div class="l-title" style="margin-bottom: 0">
                    <div class="label">总补偿金额（元）</div>
                    <div class="value">{{ requestBody.total_bu | money }}</div>
                </div>

                <img src="../../assets/fms/111.png" alt="" width="44">
            </div>

            <div class="assets wd20">
                <div class="title">充提款总额（元）
                    <el-tooltip class="item" effect="dark" content="充提款总额=用户充值+用户提现" placement="top-start">
                        <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                    </el-tooltip>
                </div>
                <div class="money-number" style="color: #F05959">{{ requestBody.total_ct | money }}</div>

                <div class="l-title">
                    <div class="label">用户充值（元）</div>
                    <div class="value">{{ requestBody.total_chongz | money }}</div>
                </div>

                <div class="l-title" style="margin-bottom: 0">
                    <div class="label">用户提现（元）</div>
                    <div class="value">{{ requestBody.total_tixian | money }}</div>
                </div>

                <img src="../../assets/fms/receive.png" alt="" width="44">
            </div>

            <div class="assets wd20" style="margin-right: 0">
                <div class="title">录扣款总额（元）
                    <el-tooltip class="item" effect="dark" content="录扣款总额=录款总额+扣款总额" placement="top-start">
                        <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                    </el-tooltip>
                </div>
                <div class="money-number" style="color: #496DD0">{{ requestBody.total_kl | money }}</div>

                <div class="l-title">
                    <div class="label">录款总额（元）</div>
                    <div class="value">{{ requestBody.total_lu | money }}</div>
                </div>

                <div class="l-title" style="margin-bottom: 0">
                    <div class="label">扣款总额（元）</div>
                    <div class="value">{{ requestBody.total_kou | money }}</div>
                </div>

                <img src="../../assets/fms/increase.png" alt="" width="44">

            </div>

        </div>
        <div style="background: #ffffff;padding-bottom: 16px; min-height: calc(100vh - 300px)" class="br4">
            <!--搜索-->
            <div>
                <Search
                    :searchOPtions=searchOPtions
                    @searchCallback=handelSearch>
                    <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.finance.detailsExport"/>
                </Search>
            </div>
            <div style="padding: 0 16px">
                <div class="summaryBar">
                    <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
                    符合搜索条件的数据：<span class="fcorange">{{ count }}</span>
                    <span>条</span>
                </div>
            </div>


            <div style="padding: 0 16px">
                <el-table
                    element-loading-spinner="el-icon-loading"
                    :highlight-current-row="true"
                    v-loading="loading"
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column fixed label="日期" prop="dt" width="120" show-overflow-tooltip align="left"/>
                    <el-table-column width="120" prop="payed_amount" show-overflow-tooltip align="right">
                        <template slot="header" slot-scope="scope">
                            <span>订单已付金额
                                <el-tooltip class="item" effect="dark" content="本日用户支付的所有订单金额（包含支付后的取消金额）" placement="top-start">
                                    <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                                </el-tooltip>
                            </span>
                        </template>

                    </el-table-column>
                    <el-table-column label="订单退款金额" width="100" prop="return_amount" show-overflow-tooltip align="right"/>
                    <el-table-column label="微信支付金额" width="100" prop="wallet_amount" show-overflow-tooltip align="right"/>
                    <el-table-column label="支付宝支付金额" width="110" prop="ali_amount" show-overflow-tooltip align="right"/>
                    <el-table-column label="余额支付金额" width="100" prop="wallet_amount" show-overflow-tooltip align="right"/>
                    <el-table-column label="优惠券使用金额" width="110" prop="coupon_amount" show-overflow-tooltip align="right"/>
                    <el-table-column label="商家货款" width="100" prop="total_huokuan" show-overflow-tooltip align="right"/>
<!--                    <el-table-column label="退换省心金额" width="100" prop="insurance_amount" show-overflow-tooltip align="right"/>-->
                    <el-table-column label="售后退款金额" width="100" prop="total_money" show-overflow-tooltip align="right"/>
                    <el-table-column label="售后补偿金额" width="100" prop="total_add_fee" show-overflow-tooltip align="right"/>
                    <el-table-column label="运费补偿金额" width="100" prop="user_freight_fee" show-overflow-tooltip align="right"/>
                    <el-table-column label="待结算返利" width="100" prop="total_plat_fanli" show-overflow-tooltip align="right"/>
                    <el-table-column label="已删除返利" width="100" prop="total_kou_fanli" show-overflow-tooltip align="right"/>
                    <el-table-column label="已结算返利" width="100" prop="total_payed_fanli" show-overflow-tooltip align="right"/>
                    <el-table-column label="用户充值" width="100" prop="total_chongz" show-overflow-tooltip align="right"/>
                    <el-table-column label="用户提现" width="100" prop="total_tixian" show-overflow-tooltip align="right"/>
                    <el-table-column width="100" prop="total_dongjie" show-overflow-tooltip align="right">
                        <template slot="header" slot-scope="scope">
                            <span>冻结资金
                                <el-tooltip class="item" effect="dark" content="本日用户提现的待审核资金" placement="top-start">
                                    <i class="el-icon-question" style="font-size: 14px; color: #d1d1d1"/>
                                </el-tooltip>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="后台录款" width="100" prop="total_lu" show-overflow-tooltip align="right"/>
                    <el-table-column label="后台扣款" width="100" prop="total_kou" show-overflow-tooltip align="right"/>
                </el-table>
            </div>

        </div>

        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
            <div class="slot" slot="left-content"></div>
        </Pagination>
    </div>
</template>



<script>
    import { common } from '@/OMS/mixins';
    import { finance } from '@/assets/constant';

    // 对账列表
    export default {
        name: "MoneyStatistics",
        mixins: [common],
        data() {
            return {
                query: {
                    type: -1,
                    status: -1
                },
                count:0,
                exportOptions: [],
                searchOPtions: [
                    {
                        type: 'dateRangePicker',
                        key: 'start_time-end_time',
                    }
                ],
                tableData:[],
                multipleSelection: [],
                current: 1,
                pageSize: 30,

                loading: false,

                flag: 1, // change 的标志位

                requestBody: {
                    total_amount: 0,
                    payed_amount: 0,
                    cancel_amount: 0,
                    wallet_amount: 0,
                    ali_amount: 0,
                    wx_amount: 0,
                    wallet_extend_amount: 0,
                    total_fanli: 0,
                    total_plat_fanli: 0,
                    total_kou_fanli: 0,
                    total_sales: 0,
                    total_tui: 0,
                    total_bu: 0,
                    total_ct: 0,
                    total_chongz: 0,
                    total_tixian: 0,
                    total_kl: 0,
                    total_kou: 0,
                    total_lu: 0
                }

            }
        },
        filters: {
            money(money) {
                if (!!money) {
                    money = String(money);
                    const moneyArr = money.split('.');
                    let left = moneyArr[0];
                    let right = moneyArr[1];
                    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
                    const temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                    return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
                } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                    return '0.00';
                } else {
                    return '';
                }

            }
        },
        created() {
            this.getData();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = { ...query };
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {
                            type: -1,
                            status: -1
                        };
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            async getData() {
                // try {
                //     this.loading = true;
                //     const { data } = await this.$api.finance.moneyStat({
                //         ...this.query,
                //         pagesize: this.pageSize,
                //         page: this.current
                //     });
                //     this.tableData = data.items;
                //     this.count = data.count;
                //     // 导出字段
                //     this.exportOptions = data.fields || [];
                //     this.loading = false;
                // } catch (e) {
                //     this.loading = false;
                // }

                try {
                    this.loading = true;
                    const {data} = await this.$api.finance.getDetailsInfor({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.requestBody = {...this.requestBody, ...data.total};
                    this.tableData = data.items;
                    this.count = data.count;

                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },

            handleClickTranForm() {
                const ele = document.querySelector(".box1");
                const ele1 = document.querySelector(".box2");

                if (this.flag === 1) {
                    ele.style.transform = 'rotateY(180deg)';
                    ele1.style.transform = 'rotateY(0deg)';
                    this.flag = 2;
                } else {
                    ele1.style.transform = 'rotateY(180deg)';
                    ele.style.transform = 'rotateY(0deg)';
                    this.flag = 1;
                }
            }
        }
    }
</script>

<style scoped>
    .note-mune{margin-bottom: 10px}
    .mune-content{
        display: flex;flex-direction: row;
        align-items: center;
    }
    .mune-content .el-button{margin: 0 10px 10px 0!important;}
    .block{margin-top: 10px}
</style>

<style lang="scss" scoped>
    @import "../../styles/variables.scss";
    .money-statistics {
        height: 100%;
        .card-box {
            background: #f0f2f5;
            margin-bottom: 16px;
            display: flex;
            .box {
                min-width: 220px;
                width: 20%;
                position: relative;
                transition: all 0.8s ease-in-out;

                #changeBtn {
                    transition: all 0.8s ease-in-out;
                }

                .box1, .box2 {
                    position: absolute;
                    backface-visibility: hidden;
                    transition: all 0.8s ease-in-out;
                }

                .box2 {
                    transform: rotateY(180deg);

                    .box-content-total {
                        margin-top: -12px;

                        .total {
                            display: flex;
                            margin-bottom: 12px;

                            .img {
                                margin-right: 12px;
                            }

                            .content {
                                .label {
                                    font-size: 12px;
                                    font-weight: 400;
                                    color: rgba(0, 0, 0, 0.45);
                                    margin-bottom: 8px;
                                }

                                .value {
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: rgba(0, 0, 0, 0.85);
                                }
                            }
                        }
                    }

                }

                .label-tag {
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    bottom: 40px;
                    width: 36px;
                    height: 20px;
                    background: rgba(213, 235, 255, 1);
                    border-radius: 4px 0 0 4px;

                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;
                    color: rgba(24, 144, 255, 1);
                    text-align: center;
                }

                .label-tag-two {
                    background: rgba(255, 255, 255, 1);
                    color: #1890FF;
                }
            }

            .assets, .box {
                position: relative;
                background: #fff;
                padding: 24px 0 20px 16px;
                margin-right: 18px;
                height: 150px;
                background: rgba(255, 255, 255, 1);
                border-radius: 4px;

                .title {
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.45);
                    line-height: 12px;
                    margin-bottom: 10px;
                }

                .money-number {
                    font-size: 18px;
                    font-weight: 500;
                    line-height: 18px;
                    margin-bottom: 30px;

                }

                .l-title {
                    display: flex;
                    font-size: 12px;
                    align-items: center;
                    margin-bottom: 6px;

                    .label {
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.45);
                        width: 96px;
                    }

                    .value {
                        font-weight: 600;
                        color: rgba(0, 0, 0, 0.85);
                    }
                }

                > img {
                    position: absolute;
                    right: 10px;
                    top: 22px;
                }
            }

            .wd20 {
                width: 20%;
            }

            .padding0 {
                padding: 0 !important;
            }
        }

        .fcblue { color: rgba(34, 149, 255, 1); }
        .fcorange {
            color: $warning-color;
            font-weight: 500;
        }

        .summaryBar {
            margin-bottom: 16px;
            padding-left: 16px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: rgba(240,248,255,1);
            border-radius: 4px;
            border: 1px solid rgba(145,213,255,1);
        }
    }
</style>
