<template>
    <div class="types-list">
        <div style="margin-bottom: 10px;">
            <!--<el-button type="primary" @click="jumpTo('NewTypesOrParameters', 'new')">添 加</el-button>-->
            <el-button type="primary" @click="open('add')">添 加</el-button>
        </div>
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
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="value"
                label="参数值">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sort"
                label="排序">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="open('edit',scope.row)">编辑</el-button>
                    <el-button type="danger" plain size="mini" @click="handleDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="添加商品参数值"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="submit"
                :rules="rules"
                ref="submit"
                label-width="120px"
                label-position="right">
                <el-form-item label="参数值：" prop="value">
                    <el-input v-model="submit.value"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="submit.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="add">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ParametersValusList",
        data() {
            return {
                show: true,
                options: [
                    { value: 'del', label: '删除' }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                dialogVisible:false,
                submit:{
                    type_id:this.$route.params.pid,
                    param_id:this.$route.params.id,
                    value:'',
                    sort:'',
                    id:'',
                },
                rules: {
                    value: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                columnSelect:[],
                addType:'',
                param_id:this.$route.params.id,
                type_id:this.$route.params.pid,
            }
        },
        created() {
            this.getData();
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
            async getData() {
                //获取列表数据
                try {
                    const { data } = await this.$api.product.paramValueList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        param_id:this.param_id,
                        type_id:this.type_id
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                } catch (e) {
                }
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleSelectionChange(val) {
                const select = [];
                if (val.length < 1) {
                    this.columnSelect = [];
                    return;
                }
                val.map(curr => {
                    select.push(curr.id);
                })
                this.columnSelect = select;
            },
            jumpTo(name, type) {
                this.$router.push({ name, query: { type } });
            },
            open(type,row){
                this.dialogVisible=true;
                this.addType=type;
                if(row){
                    this.submit.id=row.id;
                    this.submit.value=row.value;
                    this.submit.sort=row.sort;
                }
            },
            add(){
                let _this=this;
                this.$refs.submit.validate((valid) => {
                    if (valid) {
                        if(this.addType == 'add'){
                            this.$api.product.paramValueAdd(this.submit).then(function () {
                                _this.submit.name='';
                                _this.submit.sort='';
                                _this.dialogVisible=false;
                                _this.getData();
                            });
                        }else {
                            this.$api.product.paramValueEdit(this.submit).then(function () {
                                _this.submit.name='';
                                _this.submit.sort='';
                                _this.dialogVisible=false;
                                _this.submit.id='';
                                _this.getData();
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleDel(id) {
                this.$confirm('确认删除选中商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                })
            },
            del(id){
                let _this = this;
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.paramValueDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.paramValueDel({id:id}).then(function () {
                        _this.getData();
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .types-list {

    }
</style>
