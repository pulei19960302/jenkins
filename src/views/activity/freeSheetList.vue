<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="jumpTo('addfreeSheet','add','_')" size="mini">添加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.activity.free.export" />
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
                    <!--<el-table-column-->
                        <!--fixed-->
                        <!--type="selection"-->
                        <!--width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        width="60"
                        align="center"
                        prop="id"
                        label="免单ID">
                    </el-table-column>
                    <el-table-column
                        width="60"
                        align="center"
                        prop="goods_id"
                        label="商品ID">
                    </el-table-column>
                    <el-table-column
                        width="250"
                        align="center"
                        prop="goodsName"
                        label="商品名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="price"
                        label="商品原价（元）">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="stock"
                        label="库存">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="sale_num"
                        label="销量">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="like_num"
                        label="点赞数">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="start_time"
                        label="开始时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="end_time"
                        label="结束时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" :active-value="10" :inactive-value="0" @change="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200px"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" plain size="mini" @click="jumpTo('addfreeSheet','edit',scope.row.id,)">编辑</el-button>
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
    //拼团列表
    export default {
        name: "freeSheetList",
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
                        placeholder: 'ID / 商品名称'
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
                columnSelect: [],
                tableData: [],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.activity.freeSetStatus({ status, id });
                    this.getData();
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
                    const { data } = await this.$api.activity.freeList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current,
                    });
                    for (let i = 0; i < data.items.length; i++) {
                        let start_time = data.items[i].start_time;
                        let end_time = data.items[i].end_time;
                        data.items[i].start_time = this.$moment(start_time).format('YYYY-MM-DD HH:mm:ss');
                        data.items[i].end_time = this.$moment(end_time).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.tableData = data.items;
                    // 导出字段
                    this.exportOptions = data.fields || [];
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
            jumpTo(name, type, id) {
                this.$router.push({name, params: {type, id}});
            },
            handleDel(id) {
                this.$confirm('确认删除选中免单？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                })
            },
            del(id) {
                let _this = this;
                if (id == 'many') {
                    if (this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.activity.freeDel({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                } else {
                    this.$api.activity.freeDel({ids: id}).then(function () {
                        _this.getData();
                    });
                }
            },
            show(row){
                let obj = {...row};
                obj.status = obj.status==false?0:10;
                this.$api.activity.freeEdit(obj);
            }
        }
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
