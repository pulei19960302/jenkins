<template>
    <div class="funds-detail">
        <div class="header">
            <el-row :gutter="32">
<!--                <el-col :span="12">-->
<!--                    <div class="card">-->
<!--                        <div class="card-title">账户余额</div>-->
<!--                        <div class="number">-->
<!--                            ¥{{wallet}}-->
<!--                        </div>-->
<!--                        <img src="../../../assets/user/withdrawal.png" alt="">-->
<!--                    </div>-->
<!--                </el-col>-->
                <el-col :span="12">
                    <div class="card">
                        <div class="card-title">账户余额</div>
                        <div class="number">
                            ¥{{balance}}
                        </div>
                        <img src="../../../assets/user/increase.png" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content">
            <el-row style="text-align: left;margin-bottom: 16px">
                <el-col :span="24">
                    <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="height: 32px !important;margin-right: 16px"
                    >
                    </el-date-picker>
                    <el-select v-model="type"  placeholder="请选择变动类型" style="width: 240px;margin-right: 16px" clearable>
                        <el-option
                            v-for="item in type_map"
                            :key="item.key"
                            :label="item.text"
                            :value="item.key"
                        />
                    </el-select>
                    <el-button type="primary" @click="loading=true;initData()">搜索</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="tableHeaderColor"
                >
                    <el-table-column
                        prop="created_at"
                        label="变动时间">
                    </el-table-column>
                    <el-table-column
                        prop="type_name"
                        label="变动类型">
                    </el-table-column>
                    <el-table-column
                        sortable
                        :sort-method="(a, b) => sortMethod(a, b, 'money')"
                        prop="money"
                        label="变动资金">
                        <template slot-scope="scope">
                            <div> ¥{{ scope.row.money }} </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        :sort-method="(a, b) => sortMethod(a, b, 'balance')"
                        prop="balance"
                        label="累计资金">
                        <template slot-scope="scope">
                            ¥{{ scope.row.balance }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="order_no"
                        label="交易单号">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注">
                    </el-table-column>
                </el-table>
                <el-pagination
                    v-if="count !== 0"
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="count">
                </el-pagination>
            </el-row>

        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui'
    // 资金明细
    export default {
        name: "fundsDetail",
        props: {
            uid: {
                type: [String, Number],
                default: ''
            }
        },
        data(){
            return {
                loading: false,
                loadingInstance: '',
                tableData: [],
                time: '',
                page: 1,
                pageSize: 10,
                order_no: '',
                count: 0,
                type: '',
                sort: '',
                start_time: '',
                end_time: '',

                type_map: [
                    { key: '1', text: '售后退款 ' },
                    { key: '2', text: '取消退款' },
                    { key: '3', text: '用户充值' },
                    { key: '4', text: '公司奖金' },
                    { key: '5', text: '支付宝支付' },
                    { key: '6', text: '金牌奖励' },
                    { key: '20', text: '下单消费' },
                    { key: '21', text: '用户提现' },
                    { key: '22', text: '后台扣款' },
                ],


                balance: 0,
                balance_partner: 0,
                wallet: 0,

            }
        },
        mounted() {
            this.loadingInstance = Loading.service({
                target: '.funds-detail'
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
                    const { data } =await this.$api.updateUser.getFundDetail(this.getRequestParam());
                    this.count = data && Number(data.count);
                    this.balance = data && data.balance;
                    this.balance_partner = data && data.balance_partner;
                    this.tableData = data && data.items;
                    this.type_map = data && data.type_map;
                    this.wallet = data && data.wallet;
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
                    type: this.type,
                    sort: this.sort,
                    start_time: this.start_time,
                    end_time: this.end_time
                };
            },

            handleCurrentChange (v) {
                this.loading = true;
                this.page = v;
                this.initData();
            },

            sortMethod(a,b,type) {
                const at = a[type];
                const bt = b[type];
                return (Number(at) > Number(bt)) ? 1 : -1;
            }
        },
        watch: {
            time(newV, old) {
                console.log(newV, old);
                if (newV) {
                    this.start_time = newV[0];
                    this.end_time = newV[1];
                } else {
                    this.start_time = '';
                    this.end_time = '';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .funds-detail {
        margin-top: 25px;

        .header {
            .card {
                height: 130px;
                padding: 24px 24px 22px 24px;
                border-radius: 10px;
                border: 2px solid rgba(237, 237, 237, 1);
                position: relative;
                .card-title {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(119, 119, 119, 1);
                    line-height: 28px;
                    margin-bottom: 8px;
                }
                .number {
                    font-weight: 600;
                    line-height: 48px;
                    font-size:30px;
                    color:rgba(0,0,0,0.85);
                }
                img {
                    position: absolute;
                    width:42px;
                    height:40px;
                    right: 9px;
                    top: 45px;
                }
            }
        }
        .content {
            margin: 15px 0 16px 0;
        }
    }
</style>
