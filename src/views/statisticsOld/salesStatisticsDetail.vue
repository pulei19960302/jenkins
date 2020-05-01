<template>
    <div class="content">
            <div style="margin-top: 10px">
                <div class="top-slot" style="padding: 10px 0">
                    商品总数 <span>{{ count }}</span> 个
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
                            prop="team_name"
                            label="钻石">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="order_num"
                            label="下单数量">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="nums"
                            label="商品数量">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="actual_fee"
                            label="下单金额">
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
    // 团队购买力排行
    export default {
        name: "salesStatisticsDetail",
        props: {
            goods_id: {
                type: [String, Number],
                default:'0'
            }
        },
        components: {

        },
        data() {
            return {
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                columnSelect:[],
            }
        },
        created() {
        },
        watch:{
            'goods_id'(val){
                this.getData();
            }
        },
        methods: {
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.goodsTeamrank({
                        goods_id:this.goods_id,
                        page:this.current,
                        pageSize:this.pageSize
                    });
                    this.tableData = data.list;
                    this.count = data.count;
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
