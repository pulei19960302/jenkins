<template>
    <div>
        <el-button type="warning" class="mb10">开始备份</el-button>
        <!--表单-->
        <template>
            <el-table
                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="p1"
                    label="备份文件名">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="版本号"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="大小(字节)"
                    prop="p3">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="备份时间"
                    prop="sort">
                    <template slot-scope="scope">{{ scope.row.p4 }}</template>
                </el-table-column>
                <el-table-column
                    width="180px"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="success" plain size="mini">恢复</el-button>
                        <el-button type="danger" plain size="mini" @click="handleDel">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @opreateCBK="handleDel"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>
    </div>
</template>

<script>
    //数据库管理
    export default {
        name: "databaseManagement",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 9,
                tableData3: [
                    {
                        p1:'20170810165225.bak',
                        p2: '4.0',
                        p3: 15902208,
                        p4:"2018-11-01 11:02:55",
                    },
                    {
                        p1:'20170810165225.bak',
                        p2: '4.0',
                        p3: 15902208,
                        p4:"2018-11-01 11:02:55",
                    },
                    {
                        p1:'20170810165225.bak',
                        p2: '4.0',
                        p3: 15902208,
                        p4:"2018-11-01 11:02:55",
                    },
                ],
                multipleSelection: [],
                value2:'',
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleDel() {
                this.$confirm('确认删除选中数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>

<style scoped>

</style>
