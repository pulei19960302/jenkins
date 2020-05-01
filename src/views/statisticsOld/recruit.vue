<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.user.userManage.export" v-permission="[$api.user.userManage.export]" />
        </Search>
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
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        sortable="custom"
                        align="center"
                        prop="id"
                        label="用户ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="profile.nickname"
                        label="用户昵称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="phone"
                        label="用户状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="address"
                        label="一级数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="store_name"
                        label="二级数">
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
    // 招募榜
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';

    export default {
        name: "recruit",
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
                        type: 'input',
                        key: 'keywords',
                        placeholder: '用户ID/账号/昵称'
                    },
                ],
                tableData: [],
                columnSelect:[],
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        activated() {
            this.getData();
        },
        methods: {
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
                    const { data } = await this.$api.user.getUserManageList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.items;
                    this.count = data.count;
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
