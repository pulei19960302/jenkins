<template>
    <div class="user-abstract">
        <!-- 资产信息 -->
        <div class="card">
            <div class="card-title">
                资产信息
            </div>
            <div class="card-box">
<!--                <div class="assets" style="margin-left: 0;width: 33%">-->
<!--                    <div class="assets-title mb10">账户余额</div>-->
<!--                    <div class="assets-content">￥{{ capital.wallet }}</div>-->
<!--                    <img src="../../../assets/user/withdrawal.png" alt=""/>-->
<!--                </div>-->
                <div class="assets" style="width: 33%;margin-left: 0">
                    <div class="assets-title mb10">账户余额</div>
                    <div class="assets-content">￥ {{ capital.balance }}</div>
                    <img src="../../../assets/user/increase.png" alt=""/>
                </div>

                <div class="assets" style="width: 33%;margin-right: 0">
                    <div class="assets-title mb10">优惠券</div>
                    <div class="assets-content">{{ capital.usable_coupon_count }}</div>
                    <img src="../../../assets/user/coupon.png" alt="">
                </div>
            </div>
        </div>
        <!-- 交易信息 -->
        <div class="card">
            <div class="card-title">
                团队信息
            </div>
            <div class="card-box">
                <div class="infor">
                    <div class="assets-content mt17 text-center">{{ trade.team_count }}</div>
                    <div class="assets-title text-center">总人数</div>
                </div>

                <div class="infor">
                    <div class="assets-content mt17 text-center">{{ trade.general_count }}</div>
                    <div class="assets-title text-center">会员数</div>
                </div>

<!--                新增 无字段-->
                <div class="infor">
                    <div class="assets-content mt17 text-center">{{ trade.member_count }}</div>
                    <div class="assets-title text-center">SVIP数</div>
                </div>
                <div class="infor">
                    <div class="assets-content mt17 text-center">{{ trade.store_count }}</div>
                    <div class="assets-title text-center">白银人数</div>
                </div>
                <div class="infor" style="border-right: none">
                    <div class="assets-content mt17 text-center">{{ trade.partner_count }}</div>
                    <div class="assets-title text-center">黄金人数</div>
                </div>

            </div>
        </div>

        <!-- 收货地址 -->
        <div class="card">
            <div class="card-title">
                收货地址
            </div>
            <div>
                <el-table :data="member_addresses"
                    style="width: 100%"
                >
                    <el-table-column prop="name" label="收货人"/>
                    <el-table-column prop="phone" label="电话/手机"/>
                    <el-table-column prop="full_address"  label="详细地址"/>
                    <el-table-column label="默认地址" prop="sort">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.is_default" active-value="1" inactive-value="0" disabled />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {Loading} from 'element-ui';

    export default {
        // 用户摘要信息
        name: "userAbstract",
        props: {
            uid: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                loadingInstance: null,
                capital: {
                    balance: 0,
                    usable_coupon_count: 0,
                    wallet: 0,
                },
                trade: {
                    team_count: 0,
                    store_count: 0,
                    general_count: 0,
                    member_count: 0,
                    partner_count: 0
                },
                member_addresses: [],
            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.user-abstract'
            });
            this.initData(this.uid);
        },
        methods: {
            async initData(id) {
                const {data} = await this.$api.updateUser.getUserAbstract({uid: id});
                this.capital = data && data.capital;
                this.trade = data && data.trade;
                this.member_addresses = data && data.member_addresses && data.member_addresses.map(v => {
                    v.is_default = String(v.is_default);
                    return v;
                });
                this.loadingInstance.close();
            },
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;background: #f2f2f2'
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .user-abstract {
        .card {
            margin-top: 20px;
            .card-title {
                margin-bottom: 16px;
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
                line-height: 24px;
            }

            .card-box {
                display: flex;
                /*资产摘要css*/
                .assets {
                    margin: 0 7.5px;
                    width: 20%;
                    border-radius: 10px;
                    border:2px solid rgba(237,237,237,1);
                    box-sizing: border-box;
                    padding: 35px 0 35px 16px;
                    height: 130px;
                    position: relative;

                    .assets-title {
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.45);
                        line-height: 22px;
                    }

                    .assets-content {
                        font-size: 20px;
                        font-weight: 600;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 28px;
                    }

                    .text-center {
                        text-align: center;
                    }

                    img {
                        width: 42px;
                        height: 40px;
                        position: absolute;
                        right: 9px;
                        top: 45px;
                    }
                }

                .infor {
                    width: 20%;
                    height: 130px;
                    position: relative;
                    border-right:1px solid rgba(237,237,237,1);
                    .assets-title {
                        font-size: 16px;
                        font-weight: 400;
                        color: rgba(0, 0, 0, 0.45);
                        line-height: 22px;
                    }

                    .assets-content {
                        margin-top: 30px ;
                        font-size: 20px;
                        font-weight: 600;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 28px;
                    }

                    .text-center {
                        text-align: center;
                    }

                    img {
                        width: 42px;
                        height: 40px;
                        position: absolute;
                        right: 9px;
                        top: 45px;
                    }
                }
            }

            .col-title-black-black {
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85)
            }

            .add-address {
                margin-top: 8px;
                height: 32px;
                border-radius: 4px;
                border: 1px dashed rgba(217, 217, 217, 1);
                line-height: 32px;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
            }
        }

        .mt17 {
            margin-bottom: 17px;
        }

        .color-gray {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.65);
        }


    }
</style>
