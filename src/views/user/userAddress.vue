<template>
    <div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
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
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="uid"
                    width="200"
                    label="编号">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="收货人姓名"
                    prop="name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="收货人电话"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="收货人地址"
                    prop="address">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="info" plain size="mini" @click="jumpTo(scope.row.id, 'read')">查看</el-button>
                        <el-button type="primary" plain size="mini" @click="jumpTo(scope.row.id, 'edit')">编辑</el-button>
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
        </template>
    </div>
</template>

<script>
    export default {
        name: "userAddress",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 0,
                query:{},
                loading: false,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'uid',
                        placeholder: '用户编号'
                    },
                    {
                        type: 'input',
                        key: 'nickname',
                        placeholder: '用户昵称'
                    },
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '收货人姓名'
                    },
                ],
                tableData: []
            }
        },
        created() {
            this.getData();
        },
        methods:{
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
                this.loading = true;
                try {
                    const { data } = await this.$api.user.getUserManageAddressList({
                        page: this.current,
                        pageSize: this.pageSize,
                        ...this.query
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
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
            jumpTo(id, type){
                this.$router.push({
                    name: 'userDetail',
                    query:{ id, type }
                });
            }
        }
    }
</script>

<style scoped>
    .search{padding-left: 0}
    .block{margin-top: 10px}
</style>
