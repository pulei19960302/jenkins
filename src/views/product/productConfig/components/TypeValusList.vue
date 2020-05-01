<template>
    <div class="types-value-list-container">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="open('add')">添 加</el-button>
        </Search>
        <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                width="55"
                type="selection">
            </el-table-column>
            <el-table-column
                width="60"
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="attr_name"
                label="属性名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="value"
                label="属性值">
            </el-table-column>
            <el-table-column
                align="center"
                prop="color"
                label="色值">
                <template slot-scope="scope">
                    {{ scope.row.color | validVal }}
                </template>
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
            :options="pageOptions"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="添加商品属性值"
            :visible.sync="dialogVisible"
            :modal="false"
            width="30%">
            <el-form
                :model="submit"
                :rules="rules"
                ref="submit"
                label-width="150px"
                label-position="right">
                <el-form-item label="属性名：">
                    <span>{{ attr_name }}</span>
                </el-form-item>
                <el-form-item label="属性值：" prop="value">
                    <el-input v-model="submit.value"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="submit.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否设置单独sku图：" prop="is_color">
                    <el-switch v-model="submit.is_color" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="色值：">
                    <el-input v-model="submit.color"></el-input>
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
        name: "TypeValusList",
        props:{
            id1:{},
            id2:{},
        },
        data() {
            return {
                attr_name: '',
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'value',
                        placeholder: '属性值'
                    }
                ],
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
                    // type_id:this.$route.params.pid,
                    // attr_id:this.$route.params.id,
                    value:'',
                    sort: '10',
                    id:'',
                    color:'',
                    is_color:0
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
                // attr_id:this.$route.params.id,
                // type_id:this.$route.params.pid,
            }
        },
        // created() {
        //     this.getData();
        // },
        watch:{
            id2(){
                this.reset()
            }
        },
        methods: {
            reset(){
                this.query = {};
                this.pageSize = 10;
                this.current = 1;
                this.getData();
            },
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
                    const { data } = await this.$api.product.attrValueList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        attr_id:this.id2,
                        type_id:this.id1
                    });
                    this.tableData = data.items;
                    this.attr_name = data.items[0].attr_name;
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
                if(type === 'edit'){
                    this.submit.id=row.id;
                    this.submit.value=row.value;
                    this.submit.sort=row.sort;
                } else {
                    for(const key in this.submit) {
                        this.submit[key] = '';
                        this.submit.is_color = 0;
                    }
                }
            },
            add(){
                let _this=this;
                const params = Object.assign({}, this.submit);
                params.type_id = this.id1;
                params.attr_id = this.id2;
                this.$refs.submit.validate((valid) => {
                    if (valid) {
                        if(this.addType == 'add'){
                            this.$api.product.attrValueAdd(params).then(function () {
                                for(const key in _this.submit) {
                                    _this.submit[key] = '';
                                    _this.submit.is_color = 0;
                                }
                                _this.dialogVisible=false;
                                _this.getData();
                            });
                        }else {
                            this.$api.product.attrValueEdit(params).then(function () {
                                for(const key in _this.submit) {
                                    _this.submit[key] = '';
                                    _this.submit.is_color = 0;
                                }
                                _this.dialogVisible=false;
                                _this.submit.id='';
                                _this.getData();
                            });
                        }
                    }
                });

            },
            handleDel(id) {
                this.$confirm('确认删除选中商品属性值？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id);
                }).catch(() => {

                });
            },
            del(id){
                let _this = this;
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条商品属性值',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.attrValueDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.attrValueDel({id:id}).then(function () {
                        _this.getData();
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .types-value-list-container {
        .pagination{
            width:65% !important;
        }
    }
</style>
