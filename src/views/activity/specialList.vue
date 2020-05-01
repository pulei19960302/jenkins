<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain size="mini" @click="jumpTo('AddSpecial', 'add', '_')">添加</el-button>
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
                        width="60"
                        align="center"
                        prop="id"
                        label="专题ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="title"
                        label="专题标题">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="pv"
                        label="PV">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="uv"
                        label="UV">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="orders"
                        label="订单数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="订单金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="开始时间">
                        <template slot-scope="scope">
                            {{ scope.row.start_at | validDateTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="money"
                        label="结束时间">
                        <template slot-scope="scope">
                            {{ scope.row.end_at | validDateTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="100"
                        label="上线/下架">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" @change="changeStatus(scope.row)" :active-value="10" :inactive-value="0"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="240px"
                        align="center">
                        <template slot-scope="scope">
                            <!--<el-button type="info" plain size="mini" @click="handleDel(scope.row.id)">查看</el-button>-->
                            <el-button type="primary" plain size="mini" @click="jumpTo('AddSpecial','edit',scope.row.id)">编辑</el-button>
                            <el-button type="danger" plain size="mini" @click="handleDel(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    :current="current"
                    :pageSize="pageSize"
                    :count="count"
                    @opreateCBK="handleDel('many')"
                    @pageChangeCBK="handlePageChange"
                    @sizeChangeCBK="handleSizeChange">
                </Pagination>
            </template>
        </div>
    </div>
</template>

<script>
    //专题列表
    export default {
        name: "specialList",
        data() {
            return {
                loading: false,
                current: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '专题ID / 名称'
                    },
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '开始时间'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:10},
                            {label:'禁用',value:0},
                        ]
                    }
                ],
                options: [
                    {label: '选中用户', value: 1},
                    {label: '所有用户', value: 2},
                ],
                tableData: [],
                columnSelect:[],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.activity.activityTopicSetStatus({ status, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
                    })
                }
            },
            filterTag(value, row) {
                return row.tag === value;
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
                    const { data } = await this.$api.activity.activityTopicList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.items;
                    this.count = Number(data.count);
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
            jumpTo(name, type,id) {
                this.$router.push({ name, params: { type,id } });
            },
            handleDel(id) {
                this.$confirm('确认删除选中专题？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                }).catch(() => {

                });
            },
            del(id){
                let _this = this;
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条专题',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.activity.activityTopicDel({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                } else {
                    this.$api.activity.activityTopicDel({ id }).then(function () {
                        _this.getData();
                    });
                }
            }
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
