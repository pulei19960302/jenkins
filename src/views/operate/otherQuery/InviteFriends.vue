<template>
    <div class="invite-friends">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain>导出数据</el-button>
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
                label="用户ID">
            </el-table-column>
            <el-table-column
                align="center"
                label="用户账号">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="money"
                label="用户昵称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="粉丝等级">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="邀请好友">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="成功交易好友">
            </el-table-column>
            <el-table-column
                align="center"
                prop="usernum"
                label="累计奖励">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="mini">查看明细</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "InviteFriends",
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
                        placeholder: '用户ID/账号'
                    },
                    {
                        type: 'input',
                        key: 'keywords2',
                        placeholder: '用户昵称'
                    },
                    {
                        type: 'select',
                        key: 'keywords3',
                        placeholder: '粉丝等级',
                        options: []
                    }
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

            }
        }
    }
</script>

<style scoped>
    .invite-friends {

    }
</style>
