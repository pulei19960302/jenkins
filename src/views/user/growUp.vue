<template>
    <div>
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
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
                    prop="p1"
                    label="用户ID">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="用户账号"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="用户昵称"
                    prop="p3">
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="粉丝等级"
                    prop="p4"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="可用优币"
                    prop="p5"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="历史优币"
                    prop="p6"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    sortable
                    label="成长值"
                    prop="p7"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="340px"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="info" plain size="mini" @click="monetaryDetails">优币明细</el-button>
                        <el-button type="info" plain size="mini" @click="growUpDetail">成长值明细</el-button>
                        <el-button type="primary" plain size="mini" @click="dialogVisible = true">修改数值</el-button>
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
        <el-dialog
            title="修改优币或成长值"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="调整优币：" prop="number">
                    <el-radio v-model="number1" label="1">增加</el-radio>
                    <el-input
                        v-model="form.number"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                    <el-radio v-model="number1" label="2">减少</el-radio>
                    <el-input
                        v-model="form.number"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="调整成长值："  prop="growup">
                    <el-radio v-model="growup" label="1">增加</el-radio>
                    <el-input
                        v-model="form.growup"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                    <el-radio v-model="growup" label="2">减少</el-radio>
                    <el-input
                        v-model="form.growup"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-switch
                        v-model="value2"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "growUp",
        data() {
            return {
                current: 1,
                pageSize: 10,
                count: 9,
                query:{},
                dialogVisible:false,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '用户账号'
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
                        options:[
                            {label:'普通用户',value:1},
                            {label:'黄金用户',value:2},
                        ],
                    },
                ],
                tableData3: [
                    {
                        p1:'1000001',
                        p2: 18000000000,
                        p3:'Windir',
                        p4:'黄金粉丝',
                        p5: 8700,
                        p6: 78700,
                        p7: 700,
                    },
                    {
                        p1:'1000001',
                        p2: 18000000000,
                        p3:'Windir',
                        p4:'黄金粉丝',
                        p5: 8700,
                        p6: 78700,
                        p7: 700,
                    },
                    {
                        p1:'1000001',
                        p2: 18000000000,
                        p3:'Windir',
                        p4:'黄金粉丝',
                        p5: 8700,
                        p6: 78700,
                        p7: 700,
                    },
                ],
                options:[
                    {label:'选中用户',value:1},
                    {label:'所有用户',value:2},
                ],
                value1:'',
                multipleSelection:[],
                form: {
                    number: '',
                    growup: ''
                },
                rules: {
                    number: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    growup: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                number1:'',
                value2:'',
                growup:'',
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

            },
            monetaryDetails(){
                this.$router.push({
                    name: 'monetaryDetails',params:{id:''}
                });
            },
            growUpDetail(){
                this.$router.push({
                    name: 'growUpDetail',params:{id:''}
                });
            }
        }
    }
</script>

<style scoped>
    .search{padding-left: 0}
    .block{margin-top: 10px}
</style>
