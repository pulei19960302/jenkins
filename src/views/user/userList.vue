<template>
    <div class="br4 userList">
        <div style="padding-left: 16px ">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="全部成员" name=""/>
                <el-tab-pane label="会员" name="1"/>
                <el-tab-pane label="svip" name="20"/>
                <el-tab-pane label="白银" name="30"/>
                <el-tab-pane label="黄金" name="52"/>
                <el-tab-pane label="钻石" name="51"/>
            </el-tabs>
        </div>

        <!--搜索-->
        <Search :searchOPtions="searchOPtions" @searchCallback="handelSearch">
            <Export :exportOptions="exportOptions" :query="query" :url="$api.user.userManage.export"/>
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共
            <span>{{ count }}</span> 个， 余额总计
            <span>{{total_money}}</span> 元
        </div>
        <div style="padding: 0 16px 16px 16px">
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
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column fixed width="50"  type="selection"/>

                    <el-table-column sortable="custom" prop="id" label="用户ID"/>

                    <el-table-column  width="90" label="用户头像">
                        <template slot-scope="scope">
                            <img v-if="scope.row.avatar !== 'https://img.ryg0212.com/img/img_default_user.png' && !!scope.row.avatar" width="60px" @click="previewImg=scope.row.avatar;visible = true"
                                 :src="scope.row.avatar" alt="" class="table-img br4">

                            <img v-else src="https://img.bingovip.shop/img/img_default_user.png" alt="" class="table-img br4" @click="previewImg='https://img.bingovip.shop/img/img_default_user.png';visible=true">
                        </template>
                    </el-table-column>

                    <el-table-column label="账户" prop="username" show-overflow-tooltip/>

                    <el-table-column label="用户类型" prop="type_name"/>



                    <el-table-column label="直属上级" prop="first_superior_name"/>

                    <el-table-column label="间接上级" prop="second_superior_name"/>

<!--                    <el-table-column label="直属合伙人" prop="team_superior_name"/>-->

<!--                    <el-table-column label="间接合伙人" prop="second_team_superior_name"/>-->



                    <el-table-column label="一级黄金" prop="team_superior_name"/>

                    <el-table-column label="二级黄金" prop="second_team_superior_name"/>

                    <el-table-column label="所属钻石" prop="diamond_superior"/>

                    <el-table-column label="余额" align="right" sortable="custom" prop="balance" show-overflow-tooltip/>


<!--                    <el-table-column label="佣金"/>-->

                    <el-table-column label="注册时间" width="140" prop="created_at" show-overflow-tooltip/>


<!--                    <el-table-column  width="150" prop="store_name" label="所属白银"/>-->

<!--                    <el-table-column  prop="first_team_name" width="140" label="直属合伙人"/>-->

<!--                    <el-table-column  prop="typeName" label="用户类型"/>-->
<!--                    <el-table-column  prop="team_name" label="钻石"/>-->

<!--                    <el-table-column prop="order_num" width="100" label="累计订单"/>-->
<!--                    <el-table-column prop="consumption" width="120" label="累计消费"/>-->
<!--                    <el-table-column sortable="custom" label="余额" prop="balance" show-overflow-tooltip/>-->

<!--                    <el-table-column width="100" sortable="custom" label="积分列表" prop="integral"/>-->

                    <el-table-column label="状态" prop="p5" width="80">
                        <template slot-scope="scope">
                            <el-switch
                                :disabled="!button_permissions.includes($api.user.userManage.edit)"
                                v-model="scope.row.status"
                                :active-value="10"
                                :inactive-value="0"
                                @change="changeStatus(scope.row)"
                            />
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="160px" >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="mini"
                                @click="jumpTo('read',scope.row.id,scope.row.type)"
                                v-permission="[$api.user.userManage.detail]"
                            >查看
                            </el-button>

                            <el-button
                                type="text"
                                size="mini"
                                @click="updateUserFun(scope.row)"
                                v-permission="[$api.user.userManage.edit]"
                            >
                                编辑
                            </el-button>

                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link" style="cursor: pointer;font-weight: 500">更多<i
                                    class="el-icon-arrow-down el-icon--right"/></span>
                                <el-dropdown-menu slot="dropdown">

<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('setstatus', 'edit',scope.row.id,scope.row,10)"-->
<!--                                        style="color: #2d8cf0;"-->
<!--                                        v-permission="[$api.user.userManage.setstatus]"-->
<!--                                    >启用-->
<!--                                    </el-dropdown-item>-->

<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('setstatus', 'edit',scope.row.id,scope.row,0)"-->
<!--                                        style="color: #2d8cf0;"-->
<!--                                        v-permission="[$api.user.userManage.setstatus]"-->
<!--                                    >禁用-->
<!--                                    </el-dropdown-item>-->

<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('listDel','',scope.row.id)"-->
<!--                                        style="color: #f56c6c;"-->
<!--                                        v-permission="[$api.user.userManage.del]"-->
<!--                                    >删除-->
<!--                                    </el-dropdown-item>-->

<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('audit','',scope.row.id)"-->
<!--                                        style="color: #f56c6c;"-->
<!--                                        v-if="scope.row.status == 1"-->
<!--                                    >审核-->
<!--                                    </el-dropdown-item>-->
<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('userType',scope.row.type==1?3:1,scope.row.id)"-->
<!--                                        style="color: #f56c6c;"> {{ scope.row.type == 1 ? '改为白银' : '改为普通用户' }}-->
<!--                                    </el-dropdown-item>-->

                                    <el-dropdown-item
                                        :command="composeValue('editSuperior', scope.row.first_superior_id , scope.row.id, scope.row)"
                                        style="color: #2d8cf0"
                                    > 修改上级
                                    </el-dropdown-item>

                                    <el-dropdown-item
                                        :command="composeValue('editType', '', scope.row.id, scope.row)"
                                        style="color: #2d8cf0"
                                    > 修改类型
                                    </el-dropdown-item>

                                    <el-dropdown-item
                                        :command="composeValue('sendCoupon', 'edit',scope.row.id,scope.row,0)"
                                        style="color: #2d8cf0;"
                                        v-permission="[$api.activity.coupon.send]"
                                    >发优惠券
                                    </el-dropdown-item>

                                    <el-dropdown-item
                                        :command="composeValue('sendMoney', 'edit',scope.row.id,scope.row,0)"
                                        style="color: #2d8cf0;"
                                        v-if="showMoneyBtn"
                                    >加扣款项
                                    </el-dropdown-item>

                                    <el-dropdown-item
                                        :command="composeValue('updataUserPwd', 'edit', scope.row.id, scope.row)"
                                        style="color: #2d8cf0"
                                        v-permission="[$api.user.userManage.edit]"
                                    >
                                        修改密码
                                    </el-dropdown-item>

                                    <!-- <el-dropdown-item
                                      :command="composeValue('listDel','',scope.row.id)"
                                      style="color: #f56c6c;"
                                      v-permission="[$api.user.userManage.del]"
                                    >删除</el-dropdown-item> -->

<!--                                    <el-dropdown-item-->
<!--                                        :command="composeValue('mergeData', scope.row.username, scope.row.id, scope.row)"-->
<!--                                        style="color: #2d8cf0"-->
<!--                                    >合并数据-->
<!--                                    </el-dropdown-item>-->


                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>


            </template>
        </div>

        <Pagination
            :options="paginationOptions"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            :pageChoose="pageChoose"
            @opreateCBK="handleOpreate"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange"
        />

        <!--审核-->
        <el-dialog title="审核" :visible.sync="auditdialogVisible" width="30%">
            <el-form ref="closeForm" :model="auditForm" label-width="120px" label-position="right">
                <el-form-item label="是否通过：">
                    <el-switch v-model="auditForm.status" :active-value="10" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="送优惠券：">
                    <el-switch v-model="auditForm.coupon" :active-value="10" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="auditdialogVisible = false">取消</el-button>
                <el-button type="primary" @click="auditUser">确定</el-button>
            </div>
        </el-dialog>


        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"/>


        <SendCoupon :visable.sync="showSendCoupon" :id="sendCouponUserId"/>


        <sendMoney :uid="sendMoneyUid" :showUserFilter="false" :visable.sync="sendMoneyVisable" :money_way_options="money_way_options"/>

        <choose-type-dialog :initData="getData" :visable.sync="chooseTypeStatus" :id="sendCouponUserId"/>

        <update-superior :init-data="getData" :superiorId="firstSuperiorId" :visable.sync="updateSuperior" :id="sendCouponUserId"/>


        <merge-data :user-name="userName" :init-data="getData" :visable.sync="mergeDataStatus" :id="sendCouponUserId"/>

        <update-user-infor :id="sendCouponUserId" :visable.sync="updateUserStatus" :init-data="getData"/>

        <send-message-dialog :column-select-name="columnSelectName" :column-select="columnSelect" :id="sendCouponUserId" :visable.sync="sendMessageStatus" :init-data="getData"/>

        <updata-password :id="sendCouponUserId" :visable.sync="updateUserPwd" :init-data="getData"/>

    </div>
</template>

<script>
    // 用户列表
    import {mapState} from "vuex";
    import {user} from "@/assets/constant";
    import SendCoupon from './components/SendCoupon'
    import sendMoney from './components/sendMoney'
    import ChooseTypeDialog from "./components/chooseTypeDialog";
    import UpdateSuperior from "./components/updateSuperior";
    import MergeData from "./components/mergeData";
    import UpdateUserInfor from "./components/updateUserInfor";
    import SendMessageDialog from "./components/sendMessageDialog";
    import UpdataPassword from "./components/updataPassword";



    export default {
        name: "userList",
        components: {
            UpdataPassword,
            SendMessageDialog,
            UpdateUserInfor,
            MergeData,
            UpdateSuperior,
            ChooseTypeDialog,
            SendCoupon,
            sendMoney
        },
        data() {
            return {


                showSendCoupon: false,

                sendCouponUserId: '', // id
                // 改变类型字段
                chooseTypeStatus: false,
                // end
                // update 上级
                updateSuperior: false,
                firstSuperiorId: '',
                // end


                // 合并数据
                mergeDataStatus: false,
                userName: '',
                //end

                // 编辑用户
                updateUserStatus: false,
                // end

                // 发送站类信息
                sendMessageStatus: false,
                columnSelectName: '',
                // end

                // 修改密码
                updateUserPwd: false,
                // end

                sendMoneyVisable:false,
                sendMoneyUid: '',
                money_way_options: [],
                showMoneyBtn: false,


                exportOptions: [],
                loading: false,
                current: 1,
                pageSize: 30,
                count: 0,
                query: {},

                // 头像大图
                visible: false,
                previewImg: '',
                //

                searchOPtions: [
                    {
                        type: "input",
                        key: "uid",
                        placeholder: "用户ID"
                    },
                    {
                        type: "input",
                        key: "keywords",
                        placeholder: "用户名称"
                    },
                    // {
                    //     type: 'select',
                    //     key: 'level',
                    //     title: '用户类型',
                    //     //componentType: 'advanced',
                    //     show: false,
                    //     placeholder: '用户类型',
                    //     options: [
                    //         { label: '默认', value: '' },
                    //         {label: '会员', value: 1 },
                    //         {label: 'svip', value: 20 },
                    //         {label: '白银', value: 30 },
                    //         {label: '钻石', value: 51 },
                    //         {label: '黄金', value: 52 },
                    //         // {label:'资深合伙人',value:53},
                    //         // {label:'战略合伙人',value:54},
                    //     ],
                    // },
                    {
                        type: "select",
                        key: "status",
                        placeholder: "状态",
                        options: [
                            // 添加审核中
                            {label: "启用", value: 10},
                            {label: "禁用", value: 0}
                        ]
                    },
                    // {
                    //   type: "input",
                    //   key: "keywords",
                    //   placeholder: "账号"
                    // },

                    // {
                    //   type: "input",
                    //   key: "keywords",
                    //   placeholder: "手机"
                    // },

                    // 2020 0105
                    {
                        type: 'input',
                        key: 'first_uid',
                        placeholder: '直接上级ID'
                    },
                    {
                        type: 'input',
                        key: 'second_uid',
                        placeholder: '间接上级ID'
                    },
                    {
                        type: 'input',
                        key: 'first_team_id',
                        placeholder: '一级黄金ID'
                    },
                    {
                        type: 'input',
                        key: 'second_team_id',
                        placeholder: '二级黄金ID'
                    },
                    {
                        type: 'input',
                        key: 'team_id',
                        placeholder: '所属钻石ID'
                    },
                    // end 结束



                    // {
                    //     type: "input",
                    //     key: "store_name",
                    //     placeholder: "所属店铺"
                    // },
                    // {
                    //     type: "input",
                    //     key: "first_name",
                    //     placeholder: "上级白银"
                    // },
                    // {
                    //     type: "input",
                    //     key: "team_name",
                    //     placeholder: "钻石"
                    // },
                    // {
                    //     type: "input",
                    //     key: "first_team_name",
                    //     placeholder: "合伙人"
                    // },
                    {
                        type: "datetimerange",
                        key: "start_time-end_time",
                        placeholder: "开始时间",
                    }

                    //  {
                    //     type: 'input',
                    //     key: 'group_name',
                    //     placeholder: '所属群'
                    // },
                ],
                tableData: [],
                columnSelect: [],
                total_money: "",
                auditForm: {
                    status: 0,
                    coupon: 0
                },
                auditdialogVisible: false,
                audit_id: 0,
                member_type: [],
                pageChoose: [10, 30, 50,],
                paginationOptions: [
                    {value: "up", label: "批量启用", permission: [this.$api.user.userManage.setstatus]},
                    {
                        value: "disable",
                        label: "批量禁用",
                        type: "warning",
                        permission: [this.$api.user.userManage.setstatus]
                    },
                    {value: "dels", label: "批量删除", type: "danger", permission: [this.$api.user.userManage.del]}
                ],
                // add pulei 2019/12/24
                activeName: '',
                // end
            };
        },
        computed: {
            ...mapState("user", ["button_permissions"])
        },

        created() {
            if (this.button_permissions.includes(this.$api.finance.balance_record.updatemoney)) {
                this.money_way_options.push({label: '余额', value: 1})
            }
            if (this.button_permissions.includes(this.$api.finance.balance_record.updatemoney2)) {
                this.money_way_options.push({label: '可提现', value: 2})
            }
            if (this.money_way_options.length > 0) {
                this.showMoneyBtn = true
            }
        },

        mounted() {
            this.getData();
        },

        activated() {
            this.getData();
        },
        methods: {
            // 排序
            sortChange({prop, order}) {
                if (order === "ascending" || !order) {
                    this.query.sort = prop;
                } else {
                    this.query.sort = `-${prop}`;
                }
                this.getData();
            },
            // 仅改变状态
            async changeStatus({status, id, cb}) {
                try {
                    await this.$api.user.userSetStatus({status, id});
                    cb && cb();
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if (val.id === id) this.$set(val, "status", status == 10 ? 0 : 10);
                    });
                }
            },
            filterTag(value, row) {
                return row.type == value;
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query, ...{level: this.activeName == 0 ? '' : this.activeName }};
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.activeName = '';
                        this.query = {};
                        this.pageSize = 30;
                        this.current = 1;
                        this.getData();
                    }
                };
                todo[type]();
            },
            async getData() {
                try {
                    this.loading = true;
                    const {data} = await this.$api.updateUser.getList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    if (data.count) {
                        this.count = Number(data.count);
                    }
                    this.total_money = data.total_money;
                    this.member_type = data.member_type;
                    this.searchOPtions[4].options = data.member_type;
                    // 导出字段
                    const exportOptions  = [];


                    for (const it in data && data.fields) {
                        if (data.fields.hasOwnProperty(it)) {
                            exportOptions.push({ value: it, label: data.fields[it]})
                        }
                    }

                    console.log(exportOptions)
                    this.exportOptions = exportOptions || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }

                //
                // try {
                //     this.loading = true;
                //     const {data} = await this.$api.user.getUserManageList({
                //         ...this.query,
                //         pageSize: this.pageSize,
                //         page: this.current
                //     });
                //     this.tableData = data.items;
                //     if (data.count) {
                //         this.count = data.count
                //     }
                //     this.total_money = data.total_money;
                //     this.member_type = data.member_type;
                //     this.searchOPtions[4].options = data.member_type;
                //     // 导出字段
                //     this.exportOptions = data.fields || [];
                //     this.loading = false;
                // } catch (e) {
                //     this.loading = false;
                // }
            },
            handleSelectionChange(val) {
                const select = [];
                if (val.length < 1) {
                    this.columnSelect = [];
                    return;
                }
                val.map(curr => {
                    select.push(curr.id);
                });
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
            jumpTo(type, id, listType) {
                this.$router.push({name: "userDetail", params: {type, id, listType}});
            },
            async setStatus(row) {
                let obj = {...row};
                obj.status = obj.status == true ? 10 : 0;
                await this.$api.user.Usersetstatus(obj);
                this.getData();
            },
            async auditUser() {
                const params = Object.assign({}, this.auditForm);
                params.id = this.audit_id;
                try {
                    await this.$api.user.storeAudit(params);
                    this.auditdialogVisible = false;
                    this.getData();
                    this.audit_id = 0;
                } catch (e) {
                }
            },
            handleOpreate(type) {
                if (this.columnSelect.length < 1) {
                    this.$message.error("请选择用户");
                    return;
                }
                switch (type) {
                    case "dels":
                        this.handleDel("many");
                        break;
                    case "disable":
                        this.changeStatus({
                            id: this.columnSelect.join(","),
                            status: 0,
                            cb: this.getData
                        });
                        break;
                    case "up":
                        this.changeStatus({
                            id: this.columnSelect.join(","),
                            status: 10,
                            cb: this.getData
                        });
                        break;
                }
            },
            handleDel(id) {
                this.$confirm("确认删除选中用户？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.del(id);
                });
            },
            del(id) {
                let _this = this;
                if (id == "many") {
                    if (this.columnSelect.length < 1) {
                        this.$message({
                            message: "请至少选择一条申请",
                            type: "error"
                        });
                        return;
                    }
                    this.$api.user
                        .Userdel({id: this.columnSelect.join(",")})
                        .then(function () {
                            _this.getData();
                        });
                } else {
                    this.$api.user.Userdel({id: id}).then(function () {
                        _this.getData();
                    });
                }
            },
            handleUserType(id, type) {
                this.$confirm("确认改变用户类型？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.editUserType(id, type);
                });
            },
            editUserType(id, type) {
                let _this = this;
                if (id == "many") {
                    // if (this.columnSelect.length < 1) {
                    //     this.$message({
                    //         message: '请至少选择一条申请',
                    //         type: 'error'
                    //     })
                    //     return;
                    // }
                    // this.$api.user.Userdel({id:this.columnSelect.join(',')}).then(function () {
                    //     _this.getData();
                    // });
                } else {
                    this.$api.user.editUserType({id: id, type: type}).then(function () {
                        _this.getData();
                    });
                }
            },
            handleCommand(command) {
                console.log(command);
                // if (command.name == "audit") {
                //     this.auditdialogVisible = true;
                //     this.audit_id = command.id;
                //     return;
                // }
                // if (command.name == "listDel") {
                //     this.handleDel(command.id);
                //     return;
                // }
                // if (command.name == "userType") {
                //     console.log(command);
                //     this.handleUserType(command.id, command.type);
                //     return;
                // }
                // if (command.name == "setstatus") {
                //     console.log(command);
                //     this.changeStatus({
                //         id: command.id,
                //         status: command.status,
                //         cb: this.getData
                //     })
                //     return;
                // }

                if (command.name == "sendCoupon") {
                    this.showSendCoupon = true
                    this.sendCouponUserId = command.id
                    return;
                }
                if (command.name == "sendMoney") {
                    this.sendMoneyVisable = true;
                    this.sendMoneyUid = command.id;
                    return;
                }
                // 修改上级
                if (command.name == 'editSuperior') {
                    this.updateSuperior = true;
                    this.sendCouponUserId = command.id;
                    this.firstSuperiorId = command.type; //没有字段，使用type
                    return;
                }

                // 修改类型
                if (command.name == 'editType') {

                    this.chooseTypeStatus = true;
                    this.sendCouponUserId = command.id;
                    return;
                }


                if (command.name == 'mergeData') {
                    this.mergeDataStatus = true;
                    this.sendCouponUserId = command.id;
                    this.userName = command.type; //没有字段，使用type
                    return;
                }

                if (command.name == 'updataUserPwd') {
                    this.updateUserPwd = true;
                    this.sendCouponUserId = command.id
                    return;
                }



                this.$router.push({
                    name: command.name,
                    params: {
                        type: command.type,
                        id: command.id,
                        listType: command.listType
                    }
                });
            },
            composeValue(name, params, id, row, status) {
                return {
                    name: name,
                    type: params,
                    id: id,
                    listType: row ? row.type : "",
                    status: status ? status : '',
                };
            },

            updateUserFun (row) {
                this.sendCouponUserId = row.id;
                this.updateUserStatus = true;
            },
            // add pulei 2019/12/31
            handleTabClick(tab) {
                this.query['level'] = tab.name;
                if (!this.query['level']) {
                    Reflect.deleteProperty(this.query, 'level')
                }
                this.getData();
            },
            // end
        }
    };
</script>

<style scoped lang="scss">

    .userList {
        background: #ffffff;
        height: 100%;
        min-height: calc(100vh - 135px);
    }

    .select-content {
        padding: 10px;
        background: #fff;

        .el-select {
            width: 200px;
            margin-right: 5px;
        }
    }

    .block {
        margin-top: 10px;
    }

    .table-pandect {
        padding: 10px;

        span {
            color: red;
        }
    }

    .look {
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
