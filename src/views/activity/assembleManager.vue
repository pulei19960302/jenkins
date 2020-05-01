<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <!-- <el-button type="primary" plain>导出</el-button> -->
            <el-button type="primary" plain @click="jumpTo('addAssembleManager','add','_')" v-permission="[$api.activity.assembleManager.add]">添 加</el-button>
        </Search>
        <div>
            <template>
                <el-table
                    :loading="loading"
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <!--<el-table-column-->
                        <!--fixed-->
                        <!--type="selection"-->
                        <!--width="30">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        align="center"
                        prop="id"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="group_type"
                        label="拼团类型">
                        <template slot-scope="scope">
                            {{ scope.row.group_type | groupType | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="good_name"
                        label="拼团商品">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="success_num"
                        label="成团人数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="market_price"
                        label="市场价">
                        <template slot-scope="scope">
                            {{ scope.row.market_price | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="shop_price"
                        label="销售价">
                        <template slot-scope="scope">
                            {{ scope.row.shop_price | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="shop_price"
                        label="会员拼团价">
                        <template slot-scope="scope">
                            {{ scope.row.member_group_price | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="store_group_price"
                        label="店主拼团价">
                        <template slot-scope="scope">
                            {{ scope.row.store_group_price | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="partner_group_price"
                        label="合伙人拼团价">
                        <template slot-scope="scope">
                            {{ scope.row.partner_group_price | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="start_time"
                        width="140"
                        label="开始时间">
                        <template slot-scope="scope">
                            {{ scope.row.start_time | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="140"
                        prop="end_time"
                        label="结束时间">
                        <template slot-scope="scope">
                            {{ scope.row.end_time | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="valid_hours"
                        width="140"
                        label="拼团有效时间">
                        <template slot-scope="scope">
                            {{ scope.row.valid_hours | validVal }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="is_enable"
                        label="是否启用">
                        <template slot-scope="scope">
                            <!--<el-switch v-model="scope.row.status" @change="show(scope.row)"></el-switch>-->
                            <el-switch v-permission="[$api.activity.assembleManager.status]" v-model="scope.row.is_enable" :active-value="'1'" :inactive-value="'0'" @change="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="goods_sale_num"
                        label="商品销量">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="270px"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" @click="openJoinUser(scope.row)" v-permission="[$api.activity.assembleManager.joinPeople]">参与人员</el-button>
                            <el-button type="primary" plain size="mini" @click="jumpTo('editAssembleManager','edit',scope.row.id,)" v-permission="[$api.activity.assembleManager.edit]">编辑</el-button>
                            <el-button type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.activity.assembleManager.delete]">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    :current="current"
                    :pageSize="pageSize"
                    :count="count"
                    @opreateCBK="handleDel('many')"
                    @pageChangeCBK="handlePageChange"
                    @sizeChangeCBK="handleSizeChange">
                </Pagination>
            </template>
        </div>
        <el-dialog title="参与人员" :visible.sync="joinUserDialogVisible">
            <el-table
                :loading="joinLoading"
                border
                ref="multipleTable"
                :data="joinUserList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <!--<el-table-column-->
                    <!--fixed-->
                    <!--type="selection"-->
                    <!--width="30">-->
                <!--</el-table-column>-->
                <el-table-column
                    align="center"
                    prop="order_sn"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="buyer_nickname"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="buyer_cellphone"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="logistics_sn"
                    label="快递编号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="logistics_name"
                    label="快递名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="status"
                    label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status | getStatus }}
                    </template>
                </el-table-column>
            </el-table>
            <el-button style="float:right;margin-top:20px;" @click="joinUserDialogVisible = false">确定</el-button>
        </el-dialog>
    </div>
</template>

<script>
    const GROUP_TYPE = {
        '0': '拼团'
    }
    const STATUS = {
        '0': '取消',
        '1': '待支付',
        '2': '待发货',
        '3': '待收货',
        '4': '待反馈',
        '5': '已完成',
        '6': '售后',
        '7': '已关闭'
    }
    //拼团列表
    export default {
        name: "assembleList",
        data() {
            return {
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'good_name',
                        placeholder: '商品名称'
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_time-end_time',
                        placeholder: '拼团时间'
                    },
                ],
                options: [
                    {label: '选中用户', value: 1},
                    {label: '所有用户', value: 2},
                ],
                tableData: [],
                columnSelect:[],
                joinUserDialogVisible: false,
                joinLoading: false,
                joinUserList: []
            }
        },
        created() {
            this.getData();
        },
        filters: {
            groupType (val) {
                return GROUP_TYPE[val]
            },
            getStatus (val) {
                return STATUS[val]
            }
        },
        methods: {
            // 打开参与人员弹窗
            openJoinUser (row) {
                this.joinLoading = true
                this.joinUserDialogVisible = true
                this.$api.activity.getJoinPeople({
                    id: row.id,
                    is_enable: row.is_enable
                }).then(res => {
                    this.joinUserList = res.data
                }).finally(_ => {
                    this.joinLoading = false
                })
            },
            // 仅改变状态
            async changeStatus(row) {
                let data = {
                    id: row.id,
                    is_enable: row.is_enable
                }
                try {
                    await this.$api.activity.changeAssembleStatus(data);
                    this.getData();
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === row.id) this.$set(val, 'is_enable', row.is_enable === '0' ? 1 : 0);
                    })
                }
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            async getData() {
                try {
                    this.loading = true;
                    let { data } = await this.$api.activity.getAssembleList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current,
                    });
                    for (let i=0;i<data.data.length;i++){
                        // data.data[i].status= data.data[i].status==0?false:true;
                        // let start_time = data.data[i].start_time;
                        // let end_time = data.data[i].end_time;
                        // data.data[i].start_time = this.$moment(start_time).format('YYYY-MM-DD HH:mm:ss');
                        // data.data[i].end_time = this.$moment(end_time).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.tableData = data.data;
                    this.count = data.total;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handleSelectionChange(val) {
                const select = [];
                if (val.length < 1) {
                    this.columnSelect = [];
                    return;
                }
                val.map(curr => {
                    select.push(curr.id);
                })
                this.columnSelect = select;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            jumpTo(name, type,id) {
                this.$router.push({ name, params: { type,id } });
            },
            handleDel(id) {
                this.$confirm('确认删除选中项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                }).catch(() => {

                });
            },
            del (id) {
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.activity.deleteAssemble({id: this.columnSelect.join(',')}).then(() => {
                        this.getData();
                    });
                }else {
                    this.$api.activity.deleteAssemble({id:id}).then(() => {
                        this.getData();
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .select-content {
        padding: 10px;
        background: #fff;
        .el-select {
            width: 200px;
            margin-right: 5px
        }
    }
    .block {
        margin-top: 10px
    }
    /deep/ .el-dialog__body {
        overflow: hidden;
    }
</style>
