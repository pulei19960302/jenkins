<template>
    <div class="content">
            <div style="margin-top: 10px">
                <div class="top-slot" style="padding: 10px 0">
                    订单 <span>{{ count }}</span> 个 商品总数 <span>{{ goods_num }}</span> 个
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
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            align="center"
                            prop="status_name"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="buyer_nickname"
                            label="下单用户">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="id"
                            label="订单ID">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_sn"
                            label="订单编号 ">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="goods_title"
                            label="商品名称 ">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="nums"
                            label="商品数">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="drainage_name"
                            label="订单类型 ">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="created_at"
                            label="下单时间 ">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        :current-page.sync="current"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="count">
                    </el-pagination>
                    <!--<Pagination-->
                        <!--v-if="topType==1"-->
                        <!--:current="current"-->
                        <!--:pageSize="pageSize"-->
                        <!--:count="count"-->
                        <!--@pageChangeCBK="handlePageChange"-->
                        <!--@sizeChangeCBK="handleSizeChange">-->
                    <!--</Pagination>-->
                </template>
            </div>
    </div>
</template>

<script>
    // 出单排行详情
    export default {
        name: "issueStatisticsDetail",
        props: {
            uid: {
                type: [String, Number],
                default:'0'
            },
            type: {
                type: [String, Number],
                default:'1'
            },
            queryObj: {
                type: [Object],
                // default:{
                //     order_end_time: "",
                //     order_start_time: ""
                // }
            },
        },
        components: {

        },
        data() {
            return {
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                goods_num: 0,
                tableData: [],
                columnSelect:[],
            }
        },
        created() {
        },
        watch:{
            'uid'(val){
                this.getData();
            },
            'type'(val){
                this.getData();
            },
        },
        methods: {
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.orderList({
                        uid:this.uid,
                        page:this.current,
                        type:this.type,
                        order_end_time:this.queryObj.order_end_time,
                        order_start_time:this.queryObj.order_start_time,
                    });
                    this.tableData = data.list;
                    this.count = data.count;
                    this.goods_num=data.goods_num;
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
        },
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


    .content{
        background: #fff;
        padding: 20px;
        .row{
            display: flex;
            flex-direction: row;
            width: 100%;
            margin: 10px auto;
            border: solid 1px #d2cfcf;
            .col{
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                flex: 1;
                justify-content: center;
                align-items: center;
                border-right: solid 1px #d2cfcf;
                div{
                    height: 30px;
                    display: flex;
                    align-items: center;
                }

            }
        }
    }
    .row .col:last-child{border-right: 0}
    .row .col div:first-child{font-size: 12px;color: #999}
    .row .col div:last-child{font-size: 20px}
    .content{
        .search{
            padding-left: 0;
        }
    }
    .table-content{
        margin: 10px auto;
        border-bottom: solid 1px #d2cfcf;
        .row{
            margin: 0;
            border-bottom: 0;
        }
    }
    .pie{
        display: flex;
        .col-1{
            display: flex;
            flex: 1;
            flex-direction: column;
            .row-1{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 10px 0;
                align-items: center;
            }
        }
    }
</style>
