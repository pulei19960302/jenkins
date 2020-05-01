<template>
    <div class="ad-list">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="$router.push({ name: 'NewAd' })">添加广告</el-button>
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
                align="center"
                label="广告名称">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="money"
                label="广告位置">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="广告图片">
                <template slot-scope="scope">
                    <img src="http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png" style="width: 100px;">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="时间">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="上线/下线">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="点击次数">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="生成订单">
            </el-table-column>
            <el-table-column
                width="240"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="jumpRouter('NewAd', 'edit')">编辑</el-button>
                    <el-button type="warning" plain size="mini">置顶</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "AdList",
        data() {
            return {
                opreate: '',
                options: [
                    { value: 'del', label: '删除' }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '广告名称'
                    },
                    {
                        type: 'select',
                        key: 'keywords2',
                        placeholder: '广告位置',
                        options: []
                    },
                    {
                        type: 'datePicker',
                        key: 'sdate2',
                        placeholder: '到期时间'
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
                ],
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
            jumpRouter(name, type) {
                this.$router.push({ name, query: { type } })
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
