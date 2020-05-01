<template>
    <div>
        <!--顶部卡片-->
        <div class="top-card">
            <div class="single">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jichangjiedai"></use>
                </svg>
                <div class="right-word">
                    <div>历史接待此数</div>
                    <div class="number">100</div>
                </div>
            </div>
            <div class="single">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-line-chart_icon"></use>
                </svg>
                <div class="right-word">
                    <div>历史接待人数</div>
                    <div class="number">100</div>
                </div>
            </div>
            <div class="single">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gongwujiedai"></use>
                </svg>
                <div class="right-word">
                    <div>今日接待次数</div>
                    <div class="number">100</div>
                </div>
            </div>
            <div class="single">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-people"></use>
                </svg>
                <div class="right-word">
                    <div>今日接待人数</div>
                    <div class="number">100</div>
                </div>
            </div>
        </div>

        <!--表单-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" class="mb10" @click="dialogVisible = true">添 加</el-button>
        </Search>
        <template>
            <el-table
                border
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="p1"
                    label="成员账号">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="客服昵称"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="登陆时间"
                    prop="sort">
                    <template slot-scope="scope">{{ scope.row.p3 }}</template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="下班时间"
                    prop="sort">
                    <template slot-scope="scope">{{ scope.row.p4 }}</template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="工作时长"
                    prop="p2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="usernum"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="value2"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    width="300px"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="info" plain size="mini" @click="read">查看记录</el-button>
                        <el-button type="primary" plain size="mini" @click="dialogVisible = true">编辑</el-button>
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
        </template>
        <el-dialog
            title="添加客服"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                style="width: 70%;"
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="客服昵称：" prop="name">
                    <el-input
                        v-model="form.name"
                        autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label=" 成员账号：" prop="name">
                    <el-select v-model="value" placeholder="选择部门" class="mb10" style="width: 49%;">
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="选择成员"  style="width: 49%;">
                        <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注信息：">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.word"
                        autocomplete="off">
                    </el-input>
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
    //客服管理
    export default {
        name: "customerServiceManagement",
        data() {
            return {
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '客户名称'
                    },
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '工作时长'
                    }
                ],
                dialogVisible:false,
                current: 1,
                pageSize: 10,
                count: 0,
                tableData3: [
                    {
                        p1:'windir',
                        p2: '小优',
                        p3: '2017-08-05 15:47:44',
                        p4:"2018-11-01 11:02:55",
                    }
                ],
                multipleSelection: [],
                value2:'',
                value:'',
                form: {
                    name: '',
                    word: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    word: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                options1:[
                    {value:'财务部',lable:'1'},
                    {value:'行政部',lable:'2'},
                ],
                options2:[
                    {value:'张三',lable:'1'},
                    {value:'李四',lable:'2'},
                ]
            }
        },
        methods: {
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.page = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.page = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            read(){
                this.$router.push({
                    path: 'customerServiceSecord'
                });
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
    @import "../../styles/variables.scss";
    .top-card{display: flex;width: 100%;flex-direction: row;margin-bottom: 15px;}
    .top-card .single{
        display: flex;flex: 1;margin-right: 20px;
        border: 1px solid #f0f0f0;height: 100px;
        flex-direction: row;
        justify-content: center;align-items: center;
        background: #fff;
    }
    .top-card .single:last-child{margin-right: 0}
    .top-card .single .right-word{font-size: 16px;}
    .top-card .single .right-word .number{font-size: 18px;margin-top: 10px}
    //.top-card .single .iconfont{font-size: 40px;margin-right: 10px;color:$theme}
    .top-card .single .icon{font-size: 40px;margin-right: 10px;color:$theme}
</style>
