<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
                <Export :exportOptions="exportOptions"  :query="query" :url="$api.statistics.sta2.refererexport"/>
        </Search>
        <div class="top-slot" v-show="msg!=''">
            <span>{{ msg }}</span>
        </div>
        <div>
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
                    <el-table-column
                        align="center"
                        prop="name"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="goods_num"
                        label="白银出单">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="first_goods_num"
                        label="金牌出单">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="second_goods_num"
                        label="银牌出单">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="total_goods_num"
                        label="出单合计">
                    </el-table-column>
                </el-table>
                <Pagination
                    :current="current"
                    :pageSize="pageSize"
                    :count="count"
                    @pageChangeCBK="handlePageChange"
                    @sizeChangeCBK="handleSizeChange">
                </Pagination>
            </template>
        </div>
    </div>
</template>

<script>
    // 杰出推荐人
    export default {
        name: "outstanding",
        data() {
            return {
                exportOptions: [],
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'datetimerange',
                        key: 'order_start_time-order_end_time',
                        placeholder: '下单时间'
                    },
                ],
                tableData: [],
                columnSelect:[],
                msg:'',
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.refererRank();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.refererRank();
                    }
                }
                todo[type]();
            },
            async refererRank(){
                this.loading = true;
                try {
                    await this.$api.statistics.refererRank({
                        ...this.query,
                    });
                    await this.getData();
                }catch (e) {
                    this.loading = false;
                }
            },
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.statistics.refererList({
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.list;
                    this.count = data.count;
                    this.msg = data.msg;
                    // 导出字段
                    this.exportOptions = data.fields || [];
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
</style>
