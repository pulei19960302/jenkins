<template>
    <div class="app-push">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="dialogVisible = true">发布消息</el-button>
        </Search>
        <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                align="center"
                prop="number"
                label="编号">
            </el-table-column>
            <el-table-column
                label="消息标题"
                align="center">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="money"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="usernum"
                label="发布人员"
                align="center">
            </el-table-column>
            <el-table-column
                width="200px"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="mini">查看</el-button>
                    <el-button type="danger" plain size="mini" @click="handleDel">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="handleDel"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="收货地址"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="消息标题：">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="消息内容：">
                    <el-input
                        v-model="form.content"
                        autocomplete="off"
                        type="textarea"
                        style="width: 70%;">
                    </el-input>
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
        name: "AppPush",
        data() {
            return {
                options: [
                    { value: 'del', label: '删除' }
                ],
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
                        placeholder: '消息标题'
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
                    {
                        number:16184187118941,
                        date: '2016-05-03',
                        usernum: '王小虎',
                        money:"￥1894",
                        payway: '支付宝',
                        orderway:'APP订单',
                        status:"未支付",
                        giftname:'耐克篮球鞋',
                        SKU:'484',
                        gifttype:'鞋子',
                        amount:'10',
                        word:'快递发货',
                        byname:'刘三',
                        byarea:"上海市普陀区金沙江路 1518 弄",
                        totalmoney:'￥9999',
                        yunfei:'￥10',
                        lastpay:'￥484848',
                        paytime:'2018-11-01 11:02:55',
                        beizhu:'各自颜色都要一个'
                    },
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
            handleSelectionChange() {

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

<style scoped>

</style>
