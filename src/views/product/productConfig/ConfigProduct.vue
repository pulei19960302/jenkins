<template>
    <div class="remove-product">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click.stop="jumpTo('NewConfigProduct', 'add',null)" size="small" v-permission="[$api.product.product.add]">添 加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.product.product.export" v-permission="[$api.product.product.export]"/>
        </Search>
        <div class="contnet-product common-table-wrapper">
            <el-tree style="width: 150px;margin-top: 4px;" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            <el-table
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="true"
                v-loading="loading"
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
                @selection-change="handleSelectionChange">
                <!--<el-table-column-->
                    <!--fixed-->
                    <!--type="selection"-->
                    <!--width="55">-->
                <!--</el-table-column>-->
                <el-table-column
                    align="center"
                    prop="id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="分类名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="分类图片">
                    <template slot-scope="scope">
                        <img class="photo" style="width: 40px;height: 40px"
                             @click="previewImg=scope.row.thumb;visible = true"
                             :src="scope.row.thumb" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="num"
                    label="商品数量">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="是否启用">
                    <template slot-scope="scope">
                        <!--<el-switch v-model="scope.row.display" @change="show(scope.row)"></el-switch>-->
                        <el-switch
                            :disabled="!button_permissions.includes($api.product.product.edit)"
                            v-model="scope.row.display"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeDisplayStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100"
                    label="是否主推">
                    <template slot-scope="scope">
                        <!--<el-switch v-model="scope.row.display_index" @change="show(scope.row)"></el-switch>-->
                        <el-switch
                            :disabled="!button_permissions.includes($api.product.product.edit)"
                            v-model="scope.row.display_index"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeDisplayIndexStatus(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="sort"
                    label="排序">
                </el-table-column>
                <el-table-column
                    width="180"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <!-- <el-button v-if="scope.row.level != 3" type="text" size="mini" @click.stop="jumpTo('NewConfigProduct', 'add',scope.row.id)">新增下级</el-button> -->
                        <!-- <el-button type="text" size="mini" @click="jumpTo('TypesList','list',scope.row.id)">属性</el-button> -->

                        <el-button type="text" size="mini" @click.stop="jumpTo('EditConfigProduct', 'edit',scope.row.id)">编辑</el-button>

                        <el-button type="text" size="mini" style="color: #fb6a6e;"  @click="handleDel(scope.row.id)">删除</el-button>


                        <!-- <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="composeValue('EditConfigProduct', 'edit',scope.row.id)" v-permission="[$api.product.product.edit]">编辑</el-dropdown-item>
                                <el-dropdown-item :command="composeValue('listDel','',scope.row.id)" v-permission="[$api.product.product.del]">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->
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
            title="转移商品"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="原商品分类：">
                    <el-select v-model="form.content" placeholder="请选择" style="width: 70%;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标商品分类：">
                    <el-select v-model="form.content" placeholder="请选择" style="width: 70%;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="warning"
                    @click="dialogVisible = false">
                    开始转移
                </el-button>
            </div>
        </el-dialog>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <NewConfigProduct @fresh="getData" :show.sync="showAdd" :id="id"></NewConfigProduct>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import NewConfigProduct from './components/NewConfigProduct'
    export default {
        name: 'ConfigProduct',
        props: {},
        components: {
            NewConfigProduct
        },
        data() {
            return {
                showAdd:false,
                id:undefined,

                exportOptions: [],
                visible: false,
                loading: false,
                previewImg: '',
                options: [],
                dialogVisible: false,
                form: {
                    title: '',
                    content: ''
                },
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
                        placeholder: '分类名称'
                    },
                    {
                        type: 'select',
                        key: 'display',
                        label: '',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:1},
                            {label:'禁用',value:0},
                        ]
                    }
                ],
                query:{display:-1},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                columnSelect:[],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        watch: {},
        activated() {
            this.getData();
            this.getTree();
        },
        methods: {

            test(id) {
                console.log(id);
            },

            // 仅改变状态
            async changeDisplayStatus({ display, id }) {
                try {
                    await this.$api.product.goodSetDisplay({ status: display, id });
                     this.getData()
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'display', display == 1 ? 0 : 1);
                    })
                }
            },
            // 仅改变状态
            async changeDisplayIndexStatus({ display_index, id }) {
                try {
                    await this.$api.product.goodSetDisplayIndex({ status: display_index, id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'display_index', display_index == 1 ? 0 : 1);
                    })
                }
            },
            handleNodeClick(data) {
                this.query.cat_id = data.id;
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
                        this.getTree();
                    }
                }
                todo[type]();
            },
            async getTree(){
                const { data } = await this.$api.product.tree();
                this.data = data.category;
            },
            async getData() {
                this.id = undefined
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.goodsList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    // 导出字段
                    this.exportOptions = data.fields || [];
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
            jumpTo(name, type, id) {
                // this.$router.push({ name, params: { type, id }});
                this.id = id
                this.showAdd = true
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
            handleDel(id) {
                this.$confirm('确认删除选中分类？', '提示', {
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
                            message: '请至少选择一条分类',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.goodDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                        _this.getTree();
                    });
                }else {
                    this.$api.product.goodDel({id:id}).then(function () {
                        _this.getData();
                        _this.getTree();
                    });;
                }
            },
            handleCommand(command) {
                if(command.name=='listDel'){
                    this.handleDel(command.id);
                    return;
                }
                this.$router.push({ name:command.name, params: { type:command.type, id:command.id }});
            },
            composeValue(name, params,id) {
                return {
                    'name':name,
                    'type':params,
                    'id':id,
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .contnet-product {display: flex;flex-direction: row}
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
