<template>
    <div class="short-msg">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="dialogVisible = true">发送短信</el-button>
            <el-button type="primary" plain @click="dialogVisible = true">群发消息</el-button>
        </Search>
        <div class="short-msg-table">
            <el-checkbox-group v-model="checkList" style="font-size: 14px">
            <div
                class="item"
                v-for="(item, index) in tableData"
                :key="index">
                <el-checkbox :label="item.id" class="mr20" style="width: 15px;"></el-checkbox>
                <div class="header">
                    <div style="display: flex;justify-content: space-between;align-items: center;">
                        <div>
                            <span class="mr20">发布人员：{{ item.user }}</span>
                            <span class="mr20">发送时间：{{ item.time }}</span>
                            <span>接收对象：{{ item.accept }}</span>
                        </div>
                        <el-button type="danger" plain size="mini" style="margin-bottom: 10px;" @click="handleDel">删除</el-button>
                    </div>
                </div>
                <div class="content">
                    {{ item.content }}
                </div>
            </div>
            </el-checkbox-group>
        </div>
        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="群发短信"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="发送对象：">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                        placeholder="输入用户手机号码，多个号码请用逗号隔开"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="短信内容：">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="发送统计：">
                    发送条数：20条     可用短信条数：100000条
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false">
                    发 布
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ShortMsg",
        data() {
            return {
                checkList: [1],
                dialogVisible: false,
                form: {
                    title: '',
                    content: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    content: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords1',
                        placeholder: '关键词'
                    },
                    {
                        type: 'select',
                        key: 'keywords2',
                        placeholder: '发布人员',
                        options: []
                    },
                    {
                        type: 'datePicker',
                        key: 'sdate2',
                        placeholder: '发布时间'
                    },
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 9,
                tableData: [
                    { id: 1, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                    { id: 2, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                    { id: 3, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                    { id: 4, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                    { id: 5, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                    { id: 6, user: 'admin', time: '2018-11-5', accept: 200, content: '尊敬的用户，为了给您带来更好的体验，秒杀专区业务将于2017年4月26日22：00-2017年4月27日09:00期间进行系统升级，升级期间秒杀专区入口将暂时下线。升级后可正常充值和查看充值记录，请有需要的用户提前充值或者在系统升级后再充值。给您带来的不便，敬请谅解。感谢您一如既往的支持。' },
                ]
            }
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
            getData() {
                //获取列表数据
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleDel() {
                this.$confirm('确认删除选中商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";

    .short-msg {
        &-table {
            background: #fff;
            .item {
                border: 1px solid $border;
                margin-bottom: 20px;
                padding: 10px;
                .header {
                    display: inline-block;
                    border-bottom: 1px solid $border;
                    width: calc(100% - 50px);
                }
                .content {
                    padding: 10px 35px;
                }
            }
        }
    }
</style>
