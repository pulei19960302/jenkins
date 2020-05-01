<template>
    <div class="user-logs">
        <div class="table1">
            <el-row>
                <el-col :span="10">
                    <div class="title">团队变动</div>
                </el-col>
                <el-col :span="14" style="text-align: right">
                    <el-date-picker
                        value-format="yyyy-MM-DD HH:mm:ss"
                        style="height: 34px !important;margin-right: 8px"
                        v-model="value4"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-row>
                    <el-col :span="24">
                        <el-table :data="data" style="width: 100%" :header-cell-style="tableHeaderColor"
                        >
                            <el-table-column prop="id" label="变动日期"/>
                            <el-table-column prop="id" label="变动类型"/>
                            <el-table-column prop="id" label="变动人员"/>
                            <el-table-column prop="id" label="备注"/>
                        </el-table>
                    </el-col>
                </el-row>
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </el-row>
        </div>
        <div class="table2">
            <el-row>
                <el-col :span="10">
                    <div class="title">操作日志</div>
                </el-col>
                <el-col :span="14" style="text-align: right">
                    <el-date-picker
                        style="height: 34px !important;margin-right: 8px"
                        v-model="value1"
                        type="datetime"
                        value-format="yyyy-MM-DD HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                    <el-button type="primary">搜索</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-top: 20px">
                <el-row>
                    <el-col :span="24">
                        <el-table :data="data" style="width: 100%" :header-cell-style="tableHeaderColor">
                            <el-table-column prop="id" label="操作时间"/>
                            <el-table-column prop="id" label="操作人"/>
                            <el-table-column prop="id" label="对象"/>
                            <el-table-column prop="id" label="变更前"/>
                            <el-table-column prop="id" label="变更后"/>
                            <el-table-column prop="id" label="备注"/>
                        </el-table>
                    </el-col>
                </el-row>
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </el-row>
        </div>

    </div>
</template>

<script>
    // 用户日志
    export default {
        name: "userLogs",
        data() {
            return {
                data: [],
                value4: [],
                value1: ''
            }
        },
        methods: {
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return'font-size:14px;font-weight:500;color:rgba(0,0,0,0.85);line-height:22px;text-align:center;'
                }
            }
        },
        watch: {
            value4 (old, newV) {
                console.log(old, newV)
            }
        }
    }
</script>

<style scoped lang="scss">
.user-logs {
    margin-top: 15px;
    .table1, .table2 {
        .title {
            font-size:20px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:28px;
        }
    }
    .table2 {
        margin-top: 16px;
    }
}
</style>
