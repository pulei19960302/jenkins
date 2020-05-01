<template>
    <div class="login-log">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                align="center"
                prop="date"
                label="时间">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="IP">
            </el-table-column>
            <el-table-column
                align="center"
                prop="address"
                label="地区">
            </el-table-column>
            <el-table-column
                align="center"
                prop="browser"
                label="浏览器">
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
</template>

<script>
    export default {
        name: "LoginLog",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 10,
                tableData: [{
                    date: '2016-05-02',
                    name: '183.14.135.1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    browser: 'Firefox 45'
                }, {
                    date: '2016-05-04',
                    name: '183.14.135.1',
                    address: '上海市普陀区金沙江路 1517 弄',
                    browser: 'Firefox 45'
                }, {
                    date: '2016-05-01',
                    name: '183.14.135.1',
                    address: '上海市普陀区金沙江路 1519 弄',
                    browser: 'Firefox 45'
                }, {
                    date: '2016-05-03',
                    name: '183.14.135.1',
                    address: '上海市普陀区金沙江路 1516 弄',
                    browser: 'Firefox 45'
                }]
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
        }
    }
</script>

<style lang="scss" scoped>
    .pagination {
        float: right;
        margin-top: 10px;
    }
</style>
