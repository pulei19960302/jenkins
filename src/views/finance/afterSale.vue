<template>
    <div class="after-sale">
        <div class="card-box">
            <div class="assets">
                <div class="title">售后量（单）</div>
                <div class="money-number" style="color:#2E9BFF;">{{count}}</div>
                <img src="../../assets/fms/goods.png" alt="" width="44">
            </div>

            <div class="assets">
                <div class="title">售后总额（元）</div>
                <div class="money-number" style="color:#FF9F2E;">{{ total_amount | money }}</div>
                <img src="../../assets/fms/money.png" alt="" width="44">
            </div>

            <div class="assets">
                <div class="title">售后退款（元）</div>
                <div class="money-number" style="color:#31AC45;">{{total_money | money}}</div>
                <img src="../../assets/fms/111.png" alt="" width="44">
            </div>

            <div class="assets">
                <div class="title">补偿总额（元）</div>
                <div class="money-number" style="color: #F05959">{{ total_bu | money }}</div>
                <img src="../../assets/fms/receive.png" alt="" width="44">
            </div>

            <div class="assets" style="margin-right: 0">
                <div class="title">补平台运费（元）</div>
                <div class="money-number" style="color: #496DD0">{{ total_plat | money }}</div>
                <img src="../../assets/fms/increase.png" alt="" width="44">
            </div>
        </div>

        <div class="table br4">

            <!--搜索条件-->
            <div style="margin: -15px -10px -5px -10px">
                <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
                    <Export :exportOptions="exportOptions" :query="query" :url="$api.finance.finance.exportSale"/>
                </Search>
            </div>

            <!-- 渲染表格 -->
            <card-table
                :loading="isCardTableLoading"
                :cardListData="listData.items"
                rowKey="id"
                :showCardFooter="false"
            >
                <!-- 表头 -->
                <template #thead>
                    <card-table-th :width="220">商品信息</card-table-th>
                    <card-table-th :width="140">单价/售后数量</card-table-th>
                    <card-table-th :width="140">售后类型</card-table-th>
                    <card-table-th :width="120">售后状态</card-table-th>
                    <card-table-th :width="110">支付金额</card-table-th>
                    <card-table-th :width="110">售后总额</card-table-th>
                    <card-table-th :width="110">售后退款</card-table-th>
                    <card-table-th :width="110">售后补偿</card-table-th>
                    <card-table-th :width="135">运费补偿</card-table-th>
                    <card-table-th :width="135">补平台运费</card-table-th>
                </template>

                <!-- 用于循环渲染的 卡片头 -->
                <template #cardheader="{ cardRowData }">
                    <span class="fcgrey">订单号：</span><span class="mr20">{{ cardRowData.order_sn }}</span>
                    <span class="fcgrey">售后服务单：</span><span class="mr20">{{ cardRowData.return_sn }}</span>
                    <span class="fcgrey">申请时间：</span><span class="mr20">{{ cardRowData.created_at }}</span>
                    <span class="fr">
                        <span class="fcgrey">用户昵称：</span><span class="mr6">{{ cardRowData.user_nickname }}</span>
                    </span>
                </template>

                <!-- 用于循环渲染的 卡片主体区域 -->
                <template #cardRow="{ cardRowData }">
                    <!-- 商品信息、单价/数量 -->
                    <card-table-td :width="330">
                        <div class="cardTableGood" v-for="goodData in cardRowData.goods_list" :key="goodData.goods_id">
                            <img class="cardTableGoodImg" :src="goodData.goods_thumb"/>
                            <div class="flex1 lh18 fs12">
                                <div class="dpflex">
                                    <div class="flex1  mr8 mb8">{{ goodData.goods_title }}</div><!-- 商品名称 -->
                                    <div class="taright fcgrey width80">单价：¥{{ goodData.shop_price }}</div><!-- 商品单价 -->
                                </div>
                                <div class="dpflex">
                                    <div class="flex1 mr8"><!-- 商品规格、ID -->
                                        <p class="fcgray">{{ goodData.sku_properties_name }}</p>
                                        <p class="fcgray">商品ID：{{ goodData.goods_id }}</p>
                                    </div>
                                    <div class="taright fcgrey width80">售后数量：{{ goodData.nums }}</div>
                                </div>
                            </div>
                        </div>
                    </card-table-td>

                    <!-- 售后类型 -->
                    <card-table-td :width="140">
                        <div class="cardTablePrice">
                            <div style="text-align: center;margin: auto">
                                {{ cardRowData.type_name }}
                            </div>
                        </div>
                    </card-table-td>

                    <!-- 售后状态 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo fcredFont">{{ cardRowData.status_name }}</div>
                    </card-table-td>

                    <!-- 支付金额 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">¥{{ cardRowData.actual_fee }}</div>
                    </card-table-td>

                    <!-- 售后总额 -->
                    <card-table-td :width="100">
                        <div class="cardTableInfo">¥{{ cardRowData.sales_amount }}</div>
                        <div class="cardTableInfo"> （{{ cardRowData.pay_type_name }}）</div>
                    </card-table-td>

                    <!--售后退款-->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">
                            <p>¥{{ cardRowData.money }}</p>
                        </div>
                        <div class="cardTableInfo"> （{{ cardRowData.pay_type_name }}）</div>
                    </card-table-td>

                    <!-- 售后补偿 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">¥{{ cardRowData.add_fee }}</div>
                    </card-table-td>

                    <!-- 运费补偿 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">¥{{ cardRowData.user_freight_fee }}</div>
                    </card-table-td>

                    <!-- 补平台运费 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">¥{{ cardRowData.plat_freight_fee }}</div>
                    </card-table-td>
                </template>
            </card-table>
        </div>

        <!-- Fixed 分页 -->
        <Pagination
            :current="page"
            :pageSize="pageSize"
            :count="count"
            :pageChoose="[10, 20, 30, 40, 50]"
            @pageChangeCBK="handlePageCrtChange"
            @sizeChangeCBK="handlePageSizeChange"
        />
    </div>
</template>

<script>
    // 售后服务

    import CardTable from '@/components/card-table/index.vue'
    import CardTableTh from '@/components/card-table/card-table-th.vue'
    import CardTableTd from '@/components/card-table/card-table-td.vue'

    export default {
        name: "afterSale",
        components: {
            'card-table': CardTable,
            'card-table-th': CardTableTh,
            'card-table-td': CardTableTd,
        },
        data() {
            return {
                isCardTableLoading: false,
                listData: {
                    items: []
                },
                count: 0,
                total_amount: 0,
                total_money: 0,
                total_bu: 0,
                total_plat: 0,

                page: 1,
                pageSize: 10,
                query:{},
                exportOptions: [], // 导出
                searchOPtions: [
                    {
                        type: "input",
                        key: "keywords",
                        placeholder: '请输入用户昵称/用户ID'
                    },
                    {
                        type: "input",
                        key: "order_sn",
                        placeholder: "请输入订单号"
                    },
                    {
                        type: "input",
                        key: "goods_title",
                        placeholder: "请输入商品名称"
                    },
                    {
                        type: "dateRangePicker",
                        key: 'start_time-end_time',
                    }
                ]
            }
        },
        mounted() {
            this.getSalesFinance()
        },
        filters: {
            money (money) {
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
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.page = 1;
                        this.getSalesFinance();
                    },
                    reset: () => {
                        this.query = {};
                        this.getSalesFinance();
                    }
                };
                todo[type]();
            },

            getParams() {
                return {
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.page
                }
            },

            getSalesFinance() {
                this.isCardTableLoading = true;
                this.$api.finance.getSaleFinance(this.getParams()).then(res => {
                    this.listData = res.data;

                    this.count = res.data && res.data.count;
                    this.total_amount = res.data && res.data.total_amount;
                    this.total_money = res.data && res.data.total_money;
                    this.total_bu = res.data && res.data.total_bu;
                    this.total_plat = res.data && res.data.total_plat;

                    this.isCardTableLoading = false;
                    console.log(this.listData, 'listData')
                });
            },
            // 分页器当前页变化
            handlePageCrtChange(page) {
                this.page = page;
                this.getSalesFinance();
            },
            // 分页器 pageSize 变化
            handlePageSizeChange(size) {
                this.pageSize = size;
                this.getSalesFinance();
            },
        }
    }
</script>

<style scoped lang="scss">
    .after-sale {
        .card-box {
            margin-bottom: 16px;
            display: flex;

            .assets {
                width: 20%;
                position: relative;
                background: #fff;
                padding: 34px 0 20px 16px;
                margin-right: 18px;
                height: 110px;
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

                > img {
                    position: absolute;
                    right: 10px;
                    top: 35px;
                }
            }

        }

        .table {
            padding: 16px;
            background: #fff;

            .pageWrapper {
                padding: 10px;
                background: #fff;
            }

            .summaryBar {
                margin-top: 16px;
                margin-bottom: 16px;
                padding-left: 16px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: rgba(240, 248, 255, 1);
                border-radius: 4px;
                border: 1px solid rgba(145, 213, 255, 1);
            }

            /* 调用卡片式表格 */
            .cardTableGood {
                display: flex;
                padding: 10px;
                border-bottom: 1px solid rgba(232, 232, 232, 1);
            }

            .cardTableGood:last-child {
                border-bottom: none;
            }

            .cardTableGoodImg {
                margin-right: 8px;
                display: block;
                width: 80px;
                height: 80px;
            }

            .cardTablePrice {
                padding: 10px;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
                color: #949494;
            }

            .cardTableInfo {
                padding: 10px;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
            }

            .operationLink {
                margin-right: auto;
                margin-left: auto;
                width: 60px;
                color: #1890FF;
                cursor: pointer;
            }
        }

        .width80 {
            width: 80px;
        }

        .fcblue {
            color: rgba(34, 149, 255, 1);
        }

        .fcgrey {
            color: #949494;
        }

        .fcred {
            color: #F56C6C;
        }

        .fcredFont {
            color: #F5222D;
        }

        .fcorange {
            color: #E6A23C;
        }

        .fcblack65 {
            color: rgba(0, 0, 0, 0.65)
        }

    }
</style>
