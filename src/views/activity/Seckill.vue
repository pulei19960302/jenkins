<template>
    <div class="seckill">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="jumpTo('AddSeckill')" size="mini" v-permission="[$api.activity.sec_kill.add]">添 加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.activity.sec_kill.export" v-permission="[$api.activity.sec_kill.export]" />
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
                    :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        fixed
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="id"
                        width="60"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="title"
                        label="活动批次">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="total"
                        width="60"
                        label="商品总数">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="id"-->
                        <!--label="参与商品">-->
                        <!--<template slot-scope="scope">-->
                            <!--<p v-for="item in scope.row.killGoods" :key="item.goods_id">-->
                                <!--<img-->
                                    <!--@click="previewImg=item.goods.thumb;visible = true"-->
                                    <!--:src="item.goods.thumb"-->
                                    <!--style="width: 40px;height: 40px;vertical-align: middle;">-->
                                <!--{{ item.goods.title }}-->
                            <!--</p>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        align="center"
                        prop="start_time"
                        label="团购开始时间">
                        <template slot-scope="scope">{{ scope.row.start_time | validDateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="end_time"
                        label="团购结束时间">
                        <template slot-scope="scope">{{ scope.row.end_time | validDateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="上架状态"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="10"
                                :inactive-value="0"
                                @change="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="250"
                        align="center"
                        prop="process_name"
                        label="活动状态">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200px"
                        align="center">
                        <template slot-scope="scope">
                            <span class="look" type="primary" plain size="mini" @click="jumpTo('EditSeckill', scope.row.id,)" v-permission="[$api.activity.sec_kill.add]">编辑</span>
                            <span class="look" type="primary" plain size="mini" @click="jumpTo('readSeckill', scope.row.id,'read')" v-permission="[$api.activity.sec_kill.add]">查看</span>
                            <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.activity.sec_kill.del]">删除</span>
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
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    // 秒杀列表
    export default {
        name: "Seckill",
        data() {
            return {
                exportOptions: [
                    { value: 'killGoods', label: '参与商品' },
                    { value: 'start_time', label: '团购开始时间' },
                    { value: 'end_time', label: '团购结束时间' },
                ],
                // pageOptions: [{ value: 'del', label: '批量删除' }],
                visible: false,
                previewImg: '',
                loading: false,
                current: 1,
                pageSize: 10,
                status:10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '团购开始时间'
                    },
                    {
                        type: 'input',
                        key: 'title',
                        placeholder: '活动批次'
                    }, {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'上架',value:10},
                            {label:'下架',value:0},
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
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.activity.sec_kill.del)) this.pageOptions = [];
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.activity.seckillSetStatus({ status, id });
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
                        this.status = 10;
                        this.getData();
                    }
                }
                todo[type]();
            },
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.activity.seckillList({
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
            jumpTo(name, id,readtype) {
                this.$router.push({ name, params: { id,readtype } });
            },
            handleDel(id) {
                if(id == 'many' && this.columnSelect.length < 1){
                    this.$message({
                        message: '请至少选择一条申请',
                        type: 'error'
                    })
                    return;
                }
                this.$confirm('确认删除选中限时团购？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                }).catch(() => {

                });
            },
            async del(id){
                let ids;
                if(id == 'many'){
                    ids = this.columnSelect.join(',');
                } else {
                    ids = id;
                }
                try {
                    await this.$api.activity.seckillDel({ ids });
                    this.getData();
                } catch (e) {

                }
            },
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
<style lang="scss">
    .seckill {
        .el-table .cell {
            padding-left: 0;
            padding-right: 0;
            p {
                padding-left: 10px;
                text-align: left;
                &:not(:last-child) {
                    border-bottom: 1px solid #ebeef5;
                }
            }
        }
    }
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
