<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain size="mini">导出数据</el-button>
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条 总金额<b>{{total_money}}</b> 元
        </div>
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
            <!--<el-table-column-->
                <!--type="selection"-->
                <!--width="55">-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                prop="uid"
                label="用户ID">
            </el-table-column>
            <el-table-column
                align="center"
                prop="userName"
                label="用户名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="typeName"
                label="交易类型">
            </el-table-column>
            <el-table-column
                align="center"
                label="支付类型"
                prop="payTypeName">
            </el-table-column>
            <el-table-column
                align="center"
                label="系统订单号"
                prop="order_no">
            </el-table-column>
            <el-table-column
                align="center"
                label="银行交易号"
                prop="trade_no">
            </el-table-column>
            <!--<el-table-column-->
                <!--align="center"-->
                <!--label="商户号"-->
                <!--prop="mchid">-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                label="金额"
                prop="money">
            </el-table-column>
            <el-table-column
                align="center"
                label="对账人员"
                prop="adminName">
            </el-table-column>
            <el-table-column
                align="center"
                label="对账时间">
                <template slot-scope="scope">
                    {{ scope.row.check_time | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="备注"
                prop="remark">
            </el-table-column>
            <el-table-column
                align="center"
                label="手续费"
                prop="commission">
            </el-table-column>
            <el-table-column
                align="center"
                label="对账状态"
                prop="statusName">
            </el-table-column>
            <el-table-column
                align="center"
                label="订单创建时间">
                <template slot-scope="scope">
                    {{ scope.row.created_at | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="订单支付时间">
                <template slot-scope="scope">
                    {{ scope.row.pay_time | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="对账时间">
                <template slot-scope="scope">
                    {{ scope.row.updated_at | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="billAmendRecord(scope.row)" v-if="scope.row.status != 0">对账</el-button>
                    <span v-else>--</span>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :options="pageOptions"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="billAmendRecord"
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
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'uid',
                        placeholder: '用户'
                    },
                    {
                        type: 'input',
                        key: 'order_no',
                        placeholder: '系统订单号'
                    },
                    {
                        type: 'input',
                        key: 'trade_no',
                        placeholder: '银行交易号'
                    },
                    {
                        type: 'select',
                        key: 'type',
                        placeholder: '交易类型',
                        options: []
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '对账状态',
                        options: []
                    },
                    {
                        type: 'datetimerange',
                        key: 'update_start_at-update_end_at',
                        placeholder: '对账时间'
                    },
                    {
                        type: 'datetimerange',
                        key: 'create_start_at-create_end_at',
                        placeholder: '订单创建时间'
                    }
                ],
                value: '',
                pageOptions: [
                    // { label: '批量对账', value: 1 }
                ],
                closedialogVisible:false,
                checkForm:{
                    remark:'',
                    status:1,
                    id:'',
                },
                total_money:0,
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.finance.billList({
                        ...this.query,
                        page: this.current,
                        pageSize: this.pageSize
                    });
                    this.loading = false;
                    this.tableData = data.items;
                    this.count = data.count;
                    this.total_money = data.total_money;
                    this.searchOPtions[3].options=data.type_data;
                    this.searchOPtions[4].options=data.status_data;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            billAmendRecord({status,id,remark}) {
                this.closedialogVisible=true;
                this.checkForm.status=parseInt(status);
                this.checkForm.id=id;
                this.checkForm.remark=remark;
            },
            async submit(){
                await this.$api.finance.checkBill(this.checkForm);
                this.closedialogVisible=false;
                this.getData();
            }
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
