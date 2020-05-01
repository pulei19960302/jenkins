<template>
    <div class="comprehensiveStatistics-content">
        <div class="header">
            <span style="width: 70px;">粉丝排名</span>
            <div class="header-right">
                <span class="s1" style="margin-right: 10px">导出数据</span>
                <span class="s1 s3 active">全部</span>
                <span class="s1" style="border-right:0;border-left: 0 ">最近30天</span>
                <span class="s1 s2">最近90天</span>
                <el-date-picker
                    v-model="value6"
                    :picker-options="pickerOptions"
                    style="width:380px"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
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
                    label="排行">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="粉丝名"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="订单数(单位:个)"
                    sortable
                    prop="p3">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="购物金额"
                    prop="p4"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </template>

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
import { pickerOptions } from '@/OMS/globalComponents/lib/searchConfig.js'
    //粉丝排名
    export default {
        name: "membershipRankings",
        data(){
            return{
                current: 1,
                pageSize: 10,
                count: 9,
                query:{},
                value6:'',
                pickerOptions,
                tableData3: [
                    {
                        p1:'1000001',
                        p2: 'Windir',
                        p3: 1789,
                        p4:'¥10000.00',
                    },
                    {
                        p1:'1000001',
                        p2: 'Windir',
                        p3: 1789,
                        p4:'¥10000.00',
                    },
                    {
                        p1:'1000001',
                        p2: 'Windir',
                        p3: 1789,
                        p4:'¥10000.00',
                    },
                ],
            }
        },
        methods:{
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

<style scoped lang="scss">
    @import "../../styles/variables.scss";
    .comprehensiveStatistics-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .comprehensiveStatistics-content .header{border-bottom: 1px solid #E4E4E4;display: flex;align-items: center;padding: 10px;font-size: 12px}
    .comprehensiveStatistics-content  .header-right{display: flex;
        justify-content: flex-end;
        width: 100%;
        align-items: center;}
    .comprehensiveStatistics-content  .header-right .s1{padding: 10px 15px;border: 1px solid #E4E4E4;cursor: pointer;width: 90px;text-align: center}
    .comprehensiveStatistics-content .header-right .s2{margin-right: 10px;border-top-right-radius: 3px;border-bottom-right-radius: 3px;}
    .header-right .s3{border-top-left-radius: 3px;border-bottom-left-radius: 3px;}
    .header-right .active{background-color: $theme;color: #fff}
    .block{    display: flex;justify-content: flex-end;margin: 10px;}
</style>
