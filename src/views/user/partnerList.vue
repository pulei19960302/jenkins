<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.user.partner.export" />
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <span>{{ count }}</span> 个， 余额总计 <span>{{total_money}}</span> 元
        </div>
        <div>
            <template>
                <el-table
                    element-loading-spinner="el-icon-loading"
                    :highlight-current-row="true"
                    v-loading="loading"
                    border
                    max-height="600"
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
                        label="用户ID">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="username"
                        label="账号">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="typeName"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="100"
                        prop="phone"
                        label="手机号">
                    </el-table-column>

                    <!-- <el-table-column
                        align="center"
                        width="100"
                        prop="wechat"
                        label="微信号">
                    </el-table-column> -->

                    <el-table-column
                        align="center"
                        prop="team_name"
                        label="钻石">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="teams"
                        width="110"
                        label="团队人数">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="integral"
                        label="积分">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="order_num"
                        width="110"
                        label="订单">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="consumption"
                        label="消费">
                    </el-table-column>


                    <el-table-column
                        align="center"
                        prop="team_fee"
                        label="收益">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="balance"
                        label="余额">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="reward"
                        label="待收益">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="freeze"
                        label="提现中">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="group_name"
                        label="群">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        prop="team_order_num"
                        label="个人团队单量">
                    </el-table-column>

                    <el-table-column
                        align="center"
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <!--<el-switch v-model="scope.row.status" @change="show(scope.row)"></el-switch>-->
                            <el-switch
                                :disabled="!button_permissions.includes($api.user.userManage.edit)"
                                v-model="scope.row.status"
                                active-value="10"
                                inactive-value="0"
                                @change="changeStatus(scope.row)"></el-switch>
                        </template>
                    </el-table-column>

                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="title"-->
                        <!--label="昵称">-->
                    <!--</el-table-column>-->
                    

                    <el-table-column
                        width="140"
                        align="center"
                        prop="created_at"
                        label="注册时间">
                    </el-table-column>




                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="first_name"-->
                        <!--label="上级">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="second_name"-->
                        <!--label="上上级">-->
                    <!--</el-table-column>-->


                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="regfromName"-->
                        <!--label="来源">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="profile.login_num"-->
                        <!--label="登陆数">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="created_at"-->
                        <!--label="注册时间">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="profile.address"-->
                        <!--label="收货地址">-->
                    <!--</el-table-column>-->

                    <!-- <el-table-column
                        align="center"
                        width="100"
                        label="是否达标">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.is_standard"
                                active-value="10"
                                inactive-value="0"
                                @change="changeSetstandard(scope.row)"></el-switch>
                        </template>
                    </el-table-column> -->

                    <el-table-column
                        label="操作"
                        width="100px"
                        fixed="right"
                        align="center">
                        <template slot-scope="scope">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">操作
                                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                                    </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="composeValue('userDetail', 'read',scope.row.id,5)" v-permission="[$api.user.userManage.detail]"> 查看</el-dropdown-item>
                                    <el-dropdown-item :command="composeValue('userDetail', 'edit',scope.row.id,5)" v-permission="[$api.user.userManage.edit]"> 编辑</el-dropdown-item>
                                    <!--<el-dropdown-item :command="composeValue('listDel','',scope.row.id)"> 删除</el-dropdown-item>-->
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    :current="current"
                    :pageSize="pageSize"
                    :count="count"
                    :pageChoose="pageChoose"
                    @pageChangeCBK="handlePageChange"
                    @sizeChangeCBK="handleSizeChange">
                </Pagination>
            </template>
        </div>
    </div>
</template>

<script>
    // 合伙人列表
    import { mapState } from 'vuex';

    export default {
        name: "partnerList",
        data() {
            return {
                exportOptions: [],
                loading: false,
                current: 1,
                pageSize: 50,
                pageChoose:[50, 100, 200],
                count: 0,
                query: {},
                searchOPtions: [
                    {
                        type: 'input', 
                        key: 'keywords',
                        placeholder: '用户ID/账号/手机号',
                    },

                    {
                        type: 'input',
                        key: 'partner_name',
                        placeholder: '合伙人',
                    },

                    {
                        type: 'input',
                        key: 'team_name',
                        placeholder: '钻石',
                    },
                    // {
                    //     type: 'select',
                    //     key: 'status',
                    //     placeholder: '状态',
                    //     options: [
                    //         {label:'启用',value:10},
                    //         {label:'禁用',value:0},
                    //     ]
                    // },
                    // {
                    //     type: 'select',
                    //     key: 'type',
                    //     placeholder: '用户类型',
                    //     options: []
                    // },
                    // {
                    //     type: 'input',
                    //     key: 'group_name',
                    //     placeholder: '所属群'
                    // },

                    // {
                    //     type: 'datetimerange',
                    //     key: 'start_time-end_time',
                    //     placeholder: '注册日期'
                    // },
                    // {
                    //     type: 'select',
                    //     key: 'is_standard',
                    //     placeholder: '是否达标',
                    //     options: [
                    //         {label:'是',value:10},
                    //         {label:'否',value:0},
                    //     ]
                    // },
                ],
                options: [
                    {label: '选中用户', value: 1},
                    {label: '所有用户', value: 2},
                ],
                multipleSelection: [],
                tableData: [],
                total_money:'',
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
                    await this.$api.user.partnerSetStatus({ status, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
                    })
                }
            },
            async changeSetstandard({ is_standard, id }) {
                try {
                    await this.$api.user.partnerSetstandard({ is_standard, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'is_standard', is_standard == 10 ? 0 : 10);
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
                    const { data } = await this.$api.user.partnerlist({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                    });
                    for (let i=0;i<data.items.length;i++){
                        let created_at = data.items[i].created_at;
                        data.items[i].created_at = this.$moment(created_at).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.tableData = data.items;
                    this.count = data.count;
                    this.searchOPtions[2].options=data.member_type;
                    this.total_money=data.total_money;
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
            handleCommand(command) {
                if(command.name=='listDel'){
                    this.handleDel(command.id);
                    return;
                }
                this.$router.push({ name:command.name, params: { type:command.type, id:command.id,listType:command.listType }});
            },
            composeValue(name, params,id,listType) {
                return {
                    'name':name,
                    'type':params,
                    'id':id,
                    'listType':listType
                }
            },
            handleDel(id) {
                this.$confirm('确认删除选中白银？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id)
                })
            },
            del(id){

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
