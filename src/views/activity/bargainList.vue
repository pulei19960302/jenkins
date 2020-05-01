<template>
    <div class="seckill">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="jumpTo('addBargainv2','add','')" size="mini" v-permission="[$api.activity.bargain.add]">添 加</el-button>
            <el-button type="primary" plain @click="jumpTo('ActivitySet2','cut','')" size="mini">砍价设置</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.activity.bargain.export"  v-permission="[$api.activity.bargain.export]"/>
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
                    <!--<el-table-column-->
                        <!--fixed-->
                        <!--type="selection"-->
                        <!--width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        align="center"
                        prop="id"
                        width="50"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        width="50"
                        align="center"
                        prop="id"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        align="center"
                        prop="title"
                        label="活动批次">
                    </el-table-column>
                    <el-table-column
                        width="50"
                        align="center"
                        prop="bargainGoods.length"
                        label="商品总数">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="id"-->
                        <!--label="参与商品">-->
                        <!--<template slot-scope="scope">-->
                            <!--<p v-for="item in scope.row.bargainGoods" :key="item.goods_id">-->
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
                        label="开始时间">
                        <template slot-scope="scope">{{ scope.row.start_time | validDateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="结束时间">
                        <template slot-scope="scope">{{ scope.row.end_time | validDateTime }}</template>
                    </el-table-column>
                    <el-table-column
                        width="250"
                        align="center"
                        prop="process_name"
                        label="活动状态">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <!--<el-switch v-model="scope.row.status" @change="show(scope.row)"></el-switch>-->
                            <el-switch
                                :disabled="!button_permissions.includes($api.activity.bargain.edit)"
                                v-model="scope.row.status"
                                :active-value="10"
                                :inactive-value="0"
                                @change="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="200px"
                        align="center">
                        <template slot-scope="scope">
                            <span class="look" type="primary" plain size="mini" @click="jumpTo('editBargain','edit',scope.row.id,)" v-permission="[$api.activity.bargain.edit]">编辑</span>
                            <span class="look" type="primary" plain size="mini" @click="jumpTo('readBargain','read',scope.row.id,)" v-permission="[$api.activity.bargain.edit]">查看</span>
                            <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.activity.bargain.del]">删除</span>
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
    // 砍价列表
    import { mapState } from 'vuex';
    export default {
        name: "bargainList",
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
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '砍价开始时间'
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
                columnSelect: [],
                tableData: [],
                visible:false,
                previewImg:'',
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getData();
        },
        methods: {
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.activity.bargainSetStatus({ status, id });
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
                    const { data } = await this.$api.product.bargainBuylist({
                        ...this.query,
                        pagesize: this.pageSize,
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
            selectMsg() {
                console.log('群发短信')
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
                this.$confirm('确认删除选中商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                })
            },
            del(id){
                let _this = this;
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.activity.bargainDel({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.activity.bargainDel({ids:id}).then(function () {
                        _this.getData();
                    });
                }
            },
            show(row){
                let obj = {...row};
                obj.status = obj.status==false?0:10;
                this.$api.activity.bargainEdit(obj);
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
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
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
</style>
