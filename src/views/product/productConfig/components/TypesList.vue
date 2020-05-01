<template>
    <div class="types-list types-list-container">
        <div style="margin-bottom: 10px;">

        </div>
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
            <!--<el-table-column-->
                <!--type="selection">-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                label="属性名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="values"
                label="可选值列表">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sort"
                label="排序">
            </el-table-column>
            <el-table-column
                label="操作"
                width="300"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini"  @click="open('edit',scope.row)">编辑</el-button>
                    <el-button type="primary" plain size="mini" @click="jumpTo('TypeValusList', 'ValusList',param_id,scope.row.id)">编辑属性值</el-button>
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
            title="添加商品属性"
            :visible.sync="dialogVisible"
            :modal="false"
            width="30%">
            <el-form
                :model="submit"
                :rules="rules"
                ref="submit"
                label-width="150px"
                label-position="right">
                <el-form-item label="属性名称：" prop="name">
                    <el-input v-model="submit.name"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="submit.sort"></el-input>
                </el-form-item>
                <div v-if="addType === 'add'">
                    <el-form-item label="属性值：" prop="attr_value">
                        <el-input v-model="submit.attr_value"></el-input>
                        <p class="tips">多个属性请用 , 分割</p>
                    </el-form-item>
                    <el-form-item label="是否设置单独sku图：" prop="is_color">
                        <el-switch v-model="submit.is_color" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                    <el-form-item label="色值：">
                        <el-input v-model="submit.color"></el-input>
                        <p class="tips">多个颜色请用 , 分割</p>
                    </el-form-item>
                </div>
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
        name: "TypesList",
        props:{
            id:{}
        },
        data() {
            return {
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '属性名称'
                    }
                ],
                options: [
                    { value: 'del', label: '删除' }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                columnSelect:[],
                addType:'',
                dialogVisible:false,
                submit:{
                    is_color: 0,
                    name:'',
                    sort:'',
                    attr_value:'',
                    color:''
                },
                param_id:this.$route.params.id,
                rules: {
                    name: [
                        { required: true, message: '必填项', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '必填项', trigger: 'change' },
                    ]
                },
            }
        },
        watch: {
            id(v){
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
                    const { data } = await this.$api.product.attrList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current,
                        type_id:this.id
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
            jumpTo(name, type,pid,id) {
                // this.$router.push({ name, params: { type,pid,id } });
                this.$emit('showValueList',id)
            },
            handleDel(id) {
                this.$confirm('确认删除选中商品属性？', '提示', {
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
                            message: '请至少选择一条商品属性',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.attrDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.attrDel({id:id}).then(function () {
                        _this.getData();
                    });
                }
            },
            open(type,row){
                this.dialogVisible=true;
                this.addType=type;
                if(type === 'edit'){
                    this.submit.id=row.id;
                    this.submit.name=row.name;
                    this.submit.sort=row.sort;
                    this.submit.attr_value=row.values;
                    this.submit.is_color=row.is_color;
                } else {
                    for(const key in this.submit) {
                        this.submit[key] = '';
                        this.submit.is_color = 0;
                    }
                }
            },
            add(){
                const params = Object.assign({}, this.submit);
                params.type_id = this.id;
                this.$refs.submit.validate(async (valid) => {
                    if (valid) {
                        try {
                            if(this.addType == 'add'){
                                await this.$api.product.attrAdd(params);
                            } else {
                                await this.$api.product.attrEdit(params);
                            }
                            for(const key in this.submit) {
                                this.submit[key] = '';
                                this.submit.is_color = 0;
                            }
                            this.dialogVisible=false;
                            this.getData();
                        } catch (e) {

                        }
                    }
                });

            },
        }
    }
</script>

<style lang="scss">
    .types-list-container {
        .pagination{
            width:75% !important;
        }
    }
</style>