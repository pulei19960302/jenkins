<template>
    <div class="messageReminding">
        <p class="title">消息提醒</p>
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
                    label="消息类型"
                    prop="p1"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="电子邮件"
                    align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.p2">是否发送</el-checkbox>
                        <el-button type="text" size="small" @click="edit('电子邮件')">编辑内容</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="站内消息"
                    align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.p3">是否发送</el-checkbox>
                        <el-button type="text" size="small" @click="edit('站内消息')">编辑内容</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="手机短信"
                    align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.p4">是否发送</el-checkbox>
                        <el-button type="text" size="small" @click="edit('手机短信')">编辑内容</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="APP消息推送"
                    align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.p5">是否发送</el-checkbox>
                        <el-button type="text" size="small" @click="edit('APP消息推送')">编辑内容</el-button>
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
</template>

<script>
    export default {
        name: "messageReminding",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 9,
                query:{},
                checked:'',
                tableData3: [
                    {
                        p1:'订单创建时',
                        p2: '',
                        p3:'',
                        p4:'',
                        p5:'',
                    },
                    {
                        p1:'消息类型名称',
                        p2: '',
                        p3:'',
                        p4:'',
                        p5:'',
                    },
                    {
                        p1:'消息类型名称',
                        p2: '',
                        p3:'',
                        p4:'',
                        p5:'',
                    },
                ],
            }
        },
        methods:{
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
            edit(title){
                this.$router.push({
                    name: 'editMessage',params:{title:title}
                });
            }
        }
    }
</script>

<style>
    .messageReminding{border: 1px solid #E4E4E4;}
    .messageReminding .title{border-bottom: 1px solid #E4E4E4;padding: 10px;margin: 0;font-size: 14px;}
    .block{margin-top: 10px}
    .messageReminding .el-checkbox__label{font-size: 12px;margin-right: 10px}
</style>
