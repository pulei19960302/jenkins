<template>
    <div class="coupon">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain>导出数据</el-button>
            <el-button type="primary" plain>添加</el-button>
        </Search>
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
            <!--<el-table-column-->
                <!--type="selection">-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                prop="name"
                label="优惠券名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="type"
                label="类型">
                <template slot-scope="scope">
                    {{ transForm(scope.row.type) }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="max"
                label="满金额">
            </el-table-column>
            <el-table-column
                align="center"
                prop="money"
                label="减金额">
            </el-table-column>
            <el-table-column
                align="center"
                prop="num"
                label="优惠券数量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="user_num"
                label="用户限制数量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_overlay"
                label="是否叠加">
            </el-table-column>
            <el-table-column
                align="center"
                prop="start_at"
                label="开始时间">
                <template slot-scope="scope">
                    {{ scope.row.start_at | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="end_at"
                label="结束时间">
                <template slot-scope="scope">
                    {{ scope.row.end_at | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                width="260"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini">编辑</el-button>
                    <el-button type="danger" plain size="mini">删除</el-button>
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
</template>

<script>
    export default {
        name: "Coupon",
        data() {
            return {
                loading: false,
                opreate: '',
                options: [
                    { value: 'del', label: '删除' }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '优惠券名称'
                    }, {
                        type: 'select',
                        key: 'type',
                        placeholder: '类型',
                        options: [ //1限时 2永久 3定时
                            {label:'限时',value:1},
                            {label:'永久',value:2},
                            {label:'定时',value:3},
                        ]
                    }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            transForm(val) {
                switch (val) { // 1限时 2永久 3定时
                    case 1:
                        return '限时';
                    case 2:
                        return '永久';
                    case 3:
                        return '定时';
                }
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
                    const { data } = await this.$api.activity.couponList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
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

<style scoped>

</style>
