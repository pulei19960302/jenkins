<template>
    <div class="sourcing-center">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <div class="sourcing-center-content">
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
                    width="60"
                    align="center"
                    prop="id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="supplier_name"
                    label="供应商">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="title"
                    label="商品分类">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="缩略图">
                    <template slot-scope="scope">
                        <img class="photo" style="width: 50px;height: 50px"
                             @click="previewImg=scope.row.thumb;visible = true"
                             :src="scope.row.thumb" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="price"
                    label="价格&规格">
                    <template slot-scope="scope">
                        <p>价格：￥{{ scope.row.shop_price }}</p>
                        <p>货号：{{ scope.row.goods_sn }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    align="center"
                    label="标签">
                    <template slot-scope="scope">
                        <el-tag
                            style="margin-right: 10px;margin-bottom: 3px;"
                            @close="delLabel(tag.id, scope.row.id)"
                            v-for="tag in scope.row.labels"
                            :key="tag.id"
                            size="mini"
                            closable
                            type="warning">
                            {{ tag.label }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="sort"
                    label="价格竞争指数">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="stock"
                    label="库存">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="sale_num"
                    label="销量">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="status"
                    label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 10" style="color: green;">启用</span>
                        <span v-else style="color: red;">禁用</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="warning"
                            plain
                            size="mini"
                            @click="putaway(scope.row)">
                            上架
                        </el-button>
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
    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {},
        components: {},
        data() {
            return {
                loading: false,
                visible: false,
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
                        placeholder: '商品编号 / 商品名称'
                    }, {
                        type: 'select',
                        key: 'supplier_id',
                        placeholder: '供应商',
                        options: []
                    }, {
                        type: 'select',
                        key: 'brand_id',
                        placeholder: '商品品牌',
                        options: []
                    }, {
                        type: 'cascader',
                        key: 'cate_id',
                        placeholder: '商品分类',
                        options: []
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:10},
                            {label:'禁用',value:0},
                        ]
                    }
                ],
                query:{},
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
        computed: {},
        watch: {},
        activated() {
            this.getData();
            this.getTree();
        },
        methods: {
            // table行内编辑商品标签
            async delLabel(label_id, id) {
                await this.$api.product.delLabelTable({ label_id, id });
                // 数据库删除成功后，本地作对应删除
                this.tableData.forEach(curr => {
                    if(curr.id === id) {
                        const newLabelArr = curr.labels.filter(val => val.id !== label_id);
                        this.$set(curr, 'labels', newLabelArr);
                    }
                });
            },
            putaway({id}) {
                this.$router.push({ name: 'EditProduct', params: { id, type: 'addBySourcingCenter' } });
            },
            handleNodeClick(data) {
                this.query.cate_id = data.id;
                this.getData();
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        if(query.cate_id) query.cate_id = [...query.cate_id].splice(-1, 1);
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
            async getTree(){
                const { data } = await this.$api.product.tree();
                this.data = data.category;
            },
            async getData() {
                //获取列表数据
                this.loading = true;
                try {
                    const { data } = await this.$api.product.getGoodsList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.list.items;
                    this.count = data.list.count;
                    // 回填对应搜索项
                    this.searchOPtions.forEach(curr => {
                        switch (curr.key) {
                            case 'supplier_id':
                                curr.options = data.supplier.map(val => {
                                    return {
                                        value: val.id,
                                        label: val.name
                                    }
                                });
                                break;
                            case 'brand_id':
                                curr.options = data.brand.map(val => {
                                    return {
                                        value: val.id,
                                        label: val.name
                                    }
                                });
                                break;
                            case 'cate_id':
                                curr.options = data.category;
                                break;
                        }
                    })
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    throw new Error();
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
            jumpTo(name, type, id = 'add') {
                this.$router.push({ name, params: { type, id }});
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
                    this.$api.product.goodDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.goodDel({id:id}).then(function () {
                        _this.getData();
                    });;
                }
            },
            show(row){
                let obj = {...row};
                obj.display_index = obj.display_index==true?1:0;
                obj.display = obj.display==true?1:0;
                this.$api.product.goodEdit(obj);
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
    .sourcing-center {
        &-content {
            display: flex;
            flex-direction: row
        }
    }
</style>
