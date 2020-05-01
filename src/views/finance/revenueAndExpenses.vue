<template>
    <div class="revenueAndExpenses">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export
                :exportOptions="exportOptions"
                :query="query"
                :url="$api.finance.finance.exportRevenueAndExpenses"
                v-permission="[$api.finance.finance.exportRevenueAndExpenses]"
            />
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
        </div>
        <template>
            <el-table
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="true"
                v-loading="loading"
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                @selection-change="handleSelectionChange">
                <!-- <el-table-column
                    type="selection"
                    width="55">
                </el-table-column> -->
                <!-- <el-table-column
                    label="操作"
                    width="120"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" class="info-color" @click="jumpTo('revenueAndExpensesDetail',scope.row.id)">查看详情</el-button>
                        <el-button type="text" size="mini" @click="billAmendRecord(scope.row)">对账</el-button>
                        <el-button type="text" size="mini" @click="handleDeliverySave(scope.row)">保存</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="对账状态"
                    prop="statusName">
                </el-table-column> -->
                <el-table-column
                    align="center"
                    prop="date"
                    label="日期">
                </el-table-column>
                <!--<el-table-column-->
                    <!--align="center"-->
                    <!--label="类型"-->
                    <!--prop="type"-->
                    <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column
                    align="center"
                    width="100"
                    prop="shop_initial"
                    label="系统初始资金">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.shop_initial | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100" 
                    prop="shop_recharge" 
                    label="系统充值资金">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.shop_recharge | validVal }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="110"
                    prop="shop_pay"
                    label="系统消费资金">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.shop_pay | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_refund"
                    label="系统退款资金">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.bank_refund | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="shop_user_withdraw"
                    label="系统用户提现">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.shop_user_withdraw | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_fee"
                    label="手续费">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.bank_fee | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="shop_surplus" 
                    label="系统剩余资金">
                    <template slot-scope="scope">
                        <div class="system-style">{{scope.row.shop_surplus | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100" 
                    prop="bank_initial" 
                    label="银行初始资金">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_initial | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_recharge" 
                    label="银行充值资金">
                    <template slot-scope="scope">
                         <div class="bank-style">{{scope.row.bank_recharge | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_pay"
                    label="银行消费资金">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_pay | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_refund"
                    label="银行退款资金">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_refund | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_withdraw"
                    label="银行提现资金">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_withdraw | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_fee"
                    label="银行手续费">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_fee | validVal}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    prop="bank_surplus"
                    label="银行剩余资金">
                    <template slot-scope="scope">
                        <div class="bank-style">{{scope.row.bank_surplus | validVal}}</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    align="center"
                    label="管理员"
                    prop="admin_uid">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.remark"></el-input>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    align="center"
                    label="对账时间"
                    prop="check_time">
                </el-table-column> -->
                <el-table-column
                    align="center"
                    label="更新时间"
                    prop="updated_at">
                </el-table-column>
            </el-table>

            <Pagination
                :options="pageOptions"
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>

            <el-dialog
                title="对账操作"
                :visible.sync="closedialogVisible"
                width="40%">
                <el-form
                    ref="checkForm"
                    :model="checkForm"
                    label-width="120px"
                    label-position="right">
                    <el-form-item label="类型：">
                        <el-radio-group v-model="checkForm.status">
                            <el-radio :label="1">未对账</el-radio>
                            <el-radio :label="2">已对账</el-radio>
                            <el-radio :label="3">异常</el-radio>
                            <el-radio :label="4">已冲正</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input
                            type="textarea"
                            :rows="2"
                            v-model="checkForm.remark"
                            style="width: 70%;margin:0 5% 10px 0">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closedialogVisible = false">取消</el-button>
                    <el-button
                        type="primary"
                        @click="submit">
                        确定
                    </el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>

<script>
    // 对账列表
    import {common} from '@/OMS/mixins';
    import {finance} from '@/assets/constant';

    export default {
        name: "reconciliationsList",
        mixins: [common],
        data() {
            return {
                exportOptions:[],
                searchOPtions: [
                    {
                        type: 'select',
                        key: 'sdate3',
                        placeholder: '对账状态',
                        options: []
                    },
                    {
                        type: 'datetimerange',
                        key: 'update_start_at-update_end_at',
                        placeholder: '对账时间',
                    },
                    {
                        type: 'datetimerange',
                        key: 'create_start_at-create_end_at',
                        placeholder: '订单创建时间',
                    }
                ],
                value: '',
                pageOptions: [
                    { label: '批量对账', value: 1 }
                ],
                closedialogVisible:false,
                checkForm:{
                    remark:'',
                    status:1,
                    id:'',
                },
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.finance.totalBill({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                    this.searchOPtions[0].options=data.status_data;
                } catch (e) {
                    this.loading = false;
                }
            },
            jumpTo(name,id) {
                this.$router.push({ name, params: { id } });
            },
            billAmendRecord({status,id,remark}) {
                console.log(status)
                this.closedialogVisible=true;
                this.checkForm.status=parseInt(status);
                this.checkForm.id=id;
                this.checkForm.remark=remark;
            },
            async submit(){
                await this.$api.finance.checkTotal(this.checkForm);
                this.closedialogVisible=false;
                this.getData();
            },
            async handleDeliverySave(val) {
                try {
                    await this.$api.finance.saveTotal(val);
                    this.getData();
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .note-mune {
        margin-bottom: 10px
    }

    .mune-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .mune-content .el-button {
        margin: 0 10px 10px 0 !important;
    }

    .block {
        margin-top: 10px
    }
</style>
<style lang="scss">
    .revenueAndExpenses{
        .el-table__row{
            td{
                padding: 0 !important;
                .cell{
                    padding: 0 !important;
                    .system-style{
                        background-color: #f0f9eb;
                        padding: 5px 10px;
                    }
                    .bank-style{
                        background-color: oldlace;
                        padding: 5px 10px;
                    }
                }
            }
        }
    }
</style>