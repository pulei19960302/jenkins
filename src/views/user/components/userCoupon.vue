<template>
    <div class="user-coupon">
        <div class="header">
            <div class="card" style="margin-left: 0">
                <div class="card-box">
                    <div class="card-title">已使用</div>
                    <div class="number">{{ used_count }}</div>
                    <img src="../../../assets/user/already.png" alt="">
                </div>
            </div>
            <div class="card">
                <div class="card-box">
                    <div class="card-title">已过期</div>
                    <div class="number">{{ timeout_count }}</div>
                    <img src="../../../assets/user/overdue.png" alt="">
                </div>
            </div>
            <div class="card">
                <div class="card-box">
                    <div class="card-title">剩余</div>
                    <div class="number">{{ usable_count }}</div>
                    <img src="../../../assets/user/coupon.png" alt="">
                </div>
            </div>
            <div class="card" style="margin-right: 0">
                <div class="card-box">
                    <div class="card-title">优惠金额</div>
                    <div class="number">¥{{ used_amount ? used_amount : 0}}</div>
                    <img src="../../../assets/user/money.png" alt="">
                </div>
            </div>
        </div>

        <div class="content">
            <el-row>
                <el-col :span="24">
                    <el-table :data="data" style="width: 100%"
                        :header-cell-style="tableHeaderColor"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                        v-loading="loading"
                    >
                        <el-table-column prop="cid" label="优惠券ID"/>
                        <el-table-column prop="coupon_name" label="优惠券名称"/>
                        <el-table-column
                            prop="type_name"
                            label="优惠券类型"
                        />
                        <el-table-column prop="created_at" label="领取时间" sortable/>
                        <el-table-column
                            prop="is_used"
                            label="使用状态"
                            :filters="filterData"
                            :filter-method="filterTag"
                            filter-placement="bottom-end"
                        >
                            <template slot-scope="scope">
                                <div class="used">
                                    <span :class="[{ un_used: scope.row.is_used == 0 }, 'garden']"/>
                                    <span v-if="scope.row.is_used == 0">未使用</span>
                                    <span v-else>已使用</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="updated_at"
                            label="使用时间"
                            sortable
                        />
                        <el-table-column label="优惠金额">
                            <template slot-scope="scope">
                                <div>￥{{scope.row.money}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-pagination
                @current-change="handleCurrentPage"
                v-if="count !== 0"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui'
    // 优惠价
    export default {
        name: "userCoupon",
        props: {
            uid: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                data: [],
                filterData: [{ text: '已使用', value: '1' }, { text: '未使用', value: '0' }],
                loadingInstance: null,
                loading: false,

                page: 1,
                pageSize: 10,
                count: 0,

                own_count: 0,
                used_count: 0,
                timeout_count: 0,
                usable_count: 0,
                used_amount: 0,
            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.user-coupon'
            });
            this.initData();
        },
        methods: {
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;background: #f2f2f2'
                }
            },

            filterTag(value, row) {
                return value == row.is_used
            },

            async initData () {
                try {
                    const { data } = await this.$api.updateUser.getCoupons(this.getRequestParam());
                    this.data = data && data.items;
                    this.count = data && Number(data.count);
                    this.own_count = data && data.own_count;
                    this.timeout_count = data && data.timeout_count;
                    this.usable_count = data && data.usable_count;
                    this.usable_count = data && data.usable_count;
                    this.used_amount = data && data.used_amount;
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
                    pageSize: this.pageSize
                }
            },

            handleCurrentPage (v) {
                this.page = v;
                this.loading = true;
                this.initData();
            }
        }
    }
</script>

<style scoped lang="scss">
    .user-coupon {
        margin-top: 24px;
        .header {
            display: flex;
            .card {
                width: 25%;
                margin: 0 7.5px;
                .card-box {
                    height: 130px;
                    padding: 35px 24px 22px 24px;
                    border-radius:10px;
                    border:2px solid rgba(237,237,237,1);
                    position: relative;
                    .card-title {
                        font-weight:400;
                        margin-bottom: 8px;
                        font-size:16px;
                        color:rgba(0,0,0,0.45);
                        line-height:22px;
                    }
                    .number {
                        font-weight:600;
                        font-size:20px;
                        color:rgba(0,0,0,0.85);
                        line-height:28px;
                    }
                    img {
                        position: absolute;
                        height: 40px;
                        width: 40px;
                        top: 45px;
                        right: 9px;
                    }
                }
            }
        }
        .content {
            margin: 15px 0 16px 0;
            .used {
                .garden {
                    display: inline-block;
                    border-radius: 50%;
                    width:6px;
                    height:6px;
                    background:rgba(82,196,26,1);
                    margin-right: 10px;
                };
                .un_used {
                    background: rgba(24,144,255,1) !important;
                }
            }
        }
    }
</style>
