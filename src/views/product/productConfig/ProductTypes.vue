<template>
    <div class="remove-product">
        <el-row>
                <Search
                    :searchOPtions=searchOPtions
                    @searchCallback=handelSearch>
                <el-button type="primary" plain @click="add">添 加</el-button>
                </Search>
        </el-row>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
        </div>
         <div class="common-table-wrapper">
        <el-table
            element-loading-spinner="el-icon-loading"
            :highlight-current-row="true"
            v-loading="loading"
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                fixed
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                width="140"
                label="类目ID">
            </el-table-column>
            <el-table-column
                align="center"
                prop="name"
                width="300"
                label="类目名称">
            </el-table-column>
            <!--<el-table-column-->
                <!--align="center"-->
                <!--prop="attr_num"-->
                <!--label="属性数量">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--align="center"-->
                <!--prop="param_num"-->
                <!--label="参数数量">-->
            <!--</el-table-column>-->
            <el-table-column
                label="规格"
                prop="attr"
                align="center">
            </el-table-column>
            <el-table-column
                width="180"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="showRightPopup1(scope.row.id)">规格</el-button>
                    <el-button size="mini" type="text" @click="showCopyModel(scope.row.id)">复制</el-button>
                    <el-button size="mini" type="text" @click="edit(scope.row.id,scope.row.name)">编辑</el-button>
                    <el-button size="mini" type="text" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="添加类型"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="类型名称：">
                    <el-input v-model="typeName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="submit">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="复制规格"
            :visible.sync="copyDialogVisable"
            width="30%">
            <el-form
                ref="copyForm"
                :model="copyForm"
                label-width="120px"
                label-position="right">
                <el-form-item :rules="copyRule" prop="name" label="类目名称：">
                    <el-input v-model="copyForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="copyDialogVisable = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="copySubmit">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <RightSidePopup mask noOutside width="80%" :zIndex="1000" :visible.sync="rightPopup1">
            <div style="font-size:20px;font-weight: bold;margin-bottom:40px;" class="title">规格列表</div>
            <TypesList @showValueList="showRightPopup2" :id="id1"></TypesList>
        </RightSidePopup>
        <RightSidePopup mask noOutside width="70%" :zIndex="1003" :visible.sync="rightPopup2">
            <div style="font-size:20px;font-weight: bold;margin-bottom:40px;" class="title">属性列表</div>
            <TypeValusList :id1="id1" :id2="id2"></TypeValusList>
        </RightSidePopup>
    </div>
</template>

<script>
    import TypesList from './components/TypesList'
    import TypeValusList from './components/TypeValusList'
    export default {
        name: 'ProductTypes',
        props: {},
        components: {
            TypesList,
            TypeValusList
        },
        data() {
            return {
                rightPopup1:false,
                rightPopup2:false,
                id1:undefined,
                id2:undefined,


                loading: false,
                dialogVisible: false,
                rules: {
                    title: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    content: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                isSwitch: true,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '规格名称',
                    },{
                        type: 'input',
                        key: 'id',
                        placeholder: '规格id'
                    }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                type:'',
                typeName:'',
                editId:'',
                columnSelect:[],
                copyDialogVisable:false,
                copyForm:{
                    name:'',
                    id:'',
                },
                copyRule:{ required: true, message: '必填项', trigger: 'change' },
                searchForm:{
                    keywords:null,
                    id:null
                }
            }
        },
        computed: {},
        watch: {},
        created() {
            this.getData();
        },
        mounted() {
        },
        methods: {
            showCopyModel(id){
                this.copyForm.id = id
                this.copyDialogVisable = true
            },
            copySubmit(){
                this.$refs.copyForm.validate(val=>{
                        if(val){
                            this.$api.product.typeCopy(this.copyForm).then(res=>{
                            this.copyDialogVisable = false
                            this.getData();
                        })
                    }
                })
                
            },
            handelSearch(type, query) {
                this.current = 1
                this.searchForm = query
                this.getData()
            },
            async getData() {
                const params = {
                    pageSize:this.pageSize,
                    page:this.current,
                    ...this.searchForm
                }
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.typeList(params);
                    this.tableData = data.items;
                    this.count = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
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
            jumpTo(name, type,id) {
                this.$router.push({ name, params: { type,id } });
            },
            showRightPopup1(id){
                this.id1 = id
                this.rightPopup1 = true
            },
            showRightPopup2(id){
                this.id2 = id
                this.rightPopup2 = true
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
            add(){
                this.dialogVisible=true;
                this.type='add';
            },
            edit(id,name){
                this.dialogVisible=true;
                this.type='edit';
                this.editId = id;
                this.typeName = name;
            },
            submit(){
                if(this.type=='add'){
                    this.$api.product.typeAdd({name:this.typeName});
                    this.dialogVisible=false;
                    this.typeName = '';
                    this.getData();
                }else {
                    this.$api.product.typeEdit({name:this.typeName,id:this.editId});
                    this.dialogVisible=false;
                    this.editId='';
                    this.typeName = '';
                    this.getData();
                }
            },
            handleDel(id) {
                this.$confirm('确认删除选中商品？', '提示', {
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
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.typeDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });

                }else {
                    this.$api.product.typeDel({id:id}).then(function () {
                        _this.getData();
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .remove-product {

    }
</style>
