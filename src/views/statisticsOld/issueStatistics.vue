<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
                <Export :exportOptions="exportOptions"  :query="query" :url="$api.statistics.sta2.export"/>
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
                    @sort-change="sortChange"
                    :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        align="center"
                        prop="name"
                        label="用户名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="uid"
                        label="用户id">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="team_name"
                        label="所属团队">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="tian_name"
                        label="一级黄金">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="tian_name2"
                        label="二级黄金">
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="income"-->
                        <!--label="利润">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        align="center"
                        sortable="order_num"
                        prop="order_num"
                        label="有效单量">
                        <template slot-scope="scope">
                            <span class="look-word" type="info" plain size="mini" @click="goodsTeamrank(scope.row.uid,1)">{{scope.row.order_num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        sortable="drainage_num"
                        prop="drainage_num"
                        label="引流订单">
                        <template slot-scope="scope">
                            <span class="look-word" type="info" plain size="mini" @click.stop="goodsTeamrank(scope.row.uid,2)">{{scope.row.drainage_num}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        sortable="real_num"
                        prop="real_num"
                        label="实际单量">
                        <template slot-scope="scope">
                            <span class="look-word" type="info" plain size="mini" @click.stop="goodsTeamrank(scope.row.uid,3)">{{scope.row.real_num}}</span>
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
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%"><issueStatisticsDetail :uid="uid" :type="type" :queryObj="query"/></RightSidePopup>
    </div>
</template>

<script>
    // 出单排行
    import { mapState } from 'vuex';
    import { user } from '@/assets/constant';
    import issueStatisticsDetail from './issueStatisticsDetail'

    export default {
        name: "issueStatistics",
        components: {
            issueStatisticsDetail
        },
        data() {
            return {
                exportOptions: [],
                loading: false,
                rghtPopupVisible: false,
                current: 1,
                uid: 0,
                type: 1,
                pageSize: 10,
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'uid',
                        placeholder: '用户id'
                    },
                    {
                        type: 'input',
                        key: 'username',
                        placeholder: '用户昵称'
                    },
                    {
                        type: 'input',
                        key: 'team',
                        placeholder: '团队'
                    },
                    {
                        type: 'input',
                        key: 'first_team_name',
                        placeholder: '一级合伙人'
                    },
                    {
                        type: 'input',
                        key: 'second_team_name',
                        placeholder: '二级合伙人'
                    },
                    // {
                    //     type: 'datetimerange',
                    //     key: 'register_start_time-register_end_time',
                    //     placeholder: '注册开始时间'
                    // },
                    {
                        type: 'datetimerange',
                        key: 'order_start_time-order_end_time',
                        placeholder: '下单开始时间'
                    }, 

                    {
                        type: 'datetimerange',
                        key: 'register_start_time-register_end_time',
                        placeholder: '注册开始时间'
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
        created() {
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
                    const { data } = await this.$api.statistics.orderRank({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    this.tableData = data.list;
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
            async goodsTeamrank(id,type){
                this.uid = id;
                this.type = type;
                this.rghtPopupVisible = true;
            },
            sortChange({ prop, order }) {
                if(order === 'ascending' || !order) {
                    this.query.sort = prop+' desc';
                } else {
                    this.query.sort = `${prop}`+' asc';
                }
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
