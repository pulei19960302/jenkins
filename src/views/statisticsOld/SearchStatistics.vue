<template>
    <div class="statistics-trade">
        <div class="statistics-trade-origin">
            <div class="title">
                <p>关键词排行</p>
                <el-button type="primary">导出数据</el-button>
            </div>
            <el-table
                border
                :data="tableData"
                style="margin: 10px auto;">
                <el-table-column
                    align="center"
                    prop="name"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="结果">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="总搜索">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="本月">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="本周">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="今日">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="info" size="mini" plain >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchStatistics",
        data() {
            return {
                tableData: [
                    {name: '王小虎'},
                    {name: '王小虎'},
                    {name: '王小虎'},
                    {name: '王小虎'},
                    {name: '王小虎'}
                ],
                current: 1,
                pageSize: 10,
                count: 9,
            }
        },
        methods: {
            getData() {
                //获取列表数据
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleSelectionChange() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .statistics-trade {
        .title {
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: #fff;
            padding: 0 20px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &-data {
            .line-chart {

            }
        }
    }
</style>
