<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <template>
            <div style="padding: 0 16px 16px 16px; background: #fff; border-radius: 0 0 4px 4px; width: 100%;">
            <el-table
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="true"
                v-loading="loading"
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                header-cell-class-name="n-table-header-cell-class"
                cell-class-name="n-table-cell-class"
            >
                <el-table-column width="120" label="操作者" prop="admin_name" />
                <el-table-column width="120" label="操作者ID" prop="uid" />
                <el-table-column width="140px" label="操作时间" prop="created_at" />
                <el-table-column width="120px" label="IP地址" prop="admin_ip" />
                <el-table-column label="操作记录" prop="describe" show-overflow-tooltip />
            </el-table>
            </div>

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
    //操作日志
    export default {
        name: "note",
        data() {
            return {
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query:{},
                tableData: [],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '操作者 / 操作者ID'
                    },{
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '操作时间'
                    }
                ]
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
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
            // 部门列表数据
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.jurisdiction.getOperatelogList({
                        ...this.query,
                        page: this.current,
                        pageSize: this.pageSize
                    });
                    this.loading = false;
                    this.tableData = data.items;
                    this.count = data.count;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped>
    .note-mune{margin-bottom: 10px}
</style>
