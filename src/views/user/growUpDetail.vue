<template>
    <div>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">用户账号</div>
                            <div class="">1800000000</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">用户昵称</div>
                            <div class="">Windir</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">粉丝等级</div>
                            <div class="">黄金粉丝</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">可用优币</div>
                            <div class="">1000</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">历史优币</div>
                            <div class="">1000</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">成长值</div>
                            <div class="">1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <el-select v-model="value1" placeholder="导出数据" @change="selectMsg">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <template>
            <el-table
                border
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 10px"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="p1"
                    label="成长值来源">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="成长值变化"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="时间"
                    prop="p3">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="备注"
                    prop="p4">
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
</template>

<script>
    //成长明细
    export default {
        name: "growUpDetail",
        data() {
            return {
                query:{},
                current: 1,
                pageSize: 10,
                count: 9,
                value1:'',
                labelWidth:'90px',
                searchOPtions: [
                    {
                        type: 'select',
                        key: 'sdate',
                        placeholder: '成长值来源',
                        options:[
                            {value:1,label:'来源1'},
                            {value:2,label:'来源2'},
                        ]
                    },
                    {
                        type: 'datePicker',
                        key: 'sdate2',
                        placeholder: '操作时间',
                    },
                ],
                tableData3:[
                    {
                        p1:'购物奖励',
                        p2:'+100',
                        p3:'2017-07-14 18:00:49',
                        p4:'操作人员：admin  操作备注：无',
                    },
                    {
                        p1:'购物奖励',
                        p2:'+100',
                        p3:'2017-07-14 18:00:49',
                        p4:'操作人员：admin  操作备注：无',
                    },
                    {
                        p1:'购物奖励',
                        p2:'+100',
                        p3:'2017-07-14 18:00:49',
                        p4:'操作人员：admin  操作备注：无',
                    },
                    {
                        p1:'购物奖励',
                        p2:'+100',
                        p3:'2017-07-14 18:00:49',
                        p4:'操作人员：admin  操作备注：无',
                    },
                    {
                        p1:'购物奖励',
                        p2:'+100',
                        p3:'2017-07-14 18:00:49',
                        p4:'操作人员：admin  操作备注：无',
                    },
                ],
                multipleSelection: [],
                options:[
                    {label:'选中用户',value:1},
                    {label:'所有用户',value:2},
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
            selectMsg(){

            }
        }
    }
</script>

<style scoped>
    .table-content{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom: 0;margin-top: 15px}
    .table-content .table-row{display: flex;flex-direction: row;align-items: stretch;}
    .table-content .table-row-col{display: flex;flex: 1;align-items: center;justify-content: center;
        flex-direction: column;
    }
    .table-row-col div:first-child{height: 45px;display: flex;width: 100%;align-items: center;justify-content: center;
        font-weight: bold;font-size: 15px;
    }
    .table-row-col div:last-child{display: flex;width: 100%;align-items: center;justify-content: center;padding: 10px;flex: 1;line-height: 20px}
    .table-row-col div{border-bottom: 1px solid #E4E4E4;min-height: 45px;border-right: 1px solid #E4E4E4}
    .table-content .table-row-col:last-child div{border-right: 0}
    .table-content .table-row-col img{width: 70px;height: 50px;background-size: cover}

    .block{margin-top: 10px}
</style>
