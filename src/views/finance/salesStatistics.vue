<template>
    <div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" size="mini">导出数据</el-button>
        </Search>
        <template>
            <el-table
                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    prop="p1"
                    label="订单号">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="商品名称"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="货号"
                    sortable
                    prop="p3">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="商品数量"
                    prop="p4"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="订单金额"
                    prop="p5"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="订单状态"
                    prop="p6"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="下单时间"
                    prop="p7"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="发货时间"
                    prop="p8"
                    show-overflow-tooltip>
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
        </template>
    </div>
</template>

<script>
    //销售统计
    export default {
        name: "salesStatistics",
        data(){
            return{
                current: 1,
                pageSize: 10,
                count: 9,
                query:{},

                searchOPtions: [
                    {
                        type: 'datePicker',
                        key: 'sdate',
                        placeholder: '起止日期'
                    },
                    {
                        type: 'input',
                        key: 'keywords2',
                        placeholder: '货号'
                    },
                    {
                        type: 'select',
                        key: 'sdate3',
                        placeholder: '订单时间类型',
                        options:[
                            {label:'发货时间 ',value:1},
                            {label:'下单时间',value:2}
                        ]
                    }
                ],
                labelWidth:'100px',
                tableData3: [
                    {
                        p1:201707196398345,
                        p2: '银色星芒刺绣网纱底裤',
                        p3: 'No86577',
                        p4:'1',
                        p5:"¥2000.00",
                        p6: '待付款',
                        p7:'2017-07-03 14:36:21',
                        p8:"2017-07-03 14:36:21",
                    },
                    {
                        p1:201707196398345,
                        p2: '银色星芒刺绣网纱底裤',
                        p3: 'No86577',
                        p4:'1',
                        p5:"¥2000.00",
                        p6: '待付款',
                        p7:'2017-07-03 14:36:21',
                        p8:"2017-07-03 14:36:21",
                    },
                    {
                        p1:201707196398345,
                        p2: '银色星芒刺绣网纱底裤',
                        p3: 'No86577',
                        p4:'1',
                        p5:"¥2000.00",
                        p6: '待付款',
                        p7:'2017-07-03 14:36:21',
                        p8:"2017-07-03 14:36:21",
                    },
                ],
            }
        },
        methods:{
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
            getData(){

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
            handleDel() {

            }
        }
    }
</script>

<style scoped>
.block{margin-top: 10px}

</style>
