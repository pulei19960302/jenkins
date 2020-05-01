<template>
    <div class="ad-list">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click.stop="jumpTo('NewBrand', 'new',null)" size="small" v-permission="[$api.product.brand.add]">添 加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.product.brand.export" v-permission="[$api.product.brand.export]"/>
        </Search>
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
            :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}"
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
                prop="name"
                label="品牌名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="initial"
                label="品牌首字母">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sort"
                label="排序">
            </el-table-column>
            <el-table-column
                align="center"
                label="是否是品牌制造商">
                <template slot-scope="scope">
                    {{ scope.row.is_maker ? '是' : '否' }}
                    <!--<el-switch v-model="scope.row.is_maker" :active-value="1" :inactive-value="0" disabled></el-switch>-->
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="是否显示">
                <template slot-scope="scope">
                    <el-switch
                        :disabled="!button_permissions.includes($api.product.brand.edit)"
                        v-model="scope.row.display"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeStatus(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200"
                align="center">
                <template slot-scope="scope">
                    <span class="look" type="primary" plain size="mini" @click.stop="jumpTo('EditBrand', 'edit',scope.row.id)" v-permission="[$api.product.brand.edit]">编辑</span>
                    <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.product.brand.del]">删除</span>
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
        <NewBrand @fresh="getData" :show.sync="showAdd" :id="id"></NewBrand>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import NewBrand from './components/NewBrand'
    export default {
        name: "BrandManage",
        components:{
            NewBrand
        },
        data() {
            return {
                showAdd:false,
                id:undefined,

                exportOptions: [],
                opreate: '',
                show: true,
                loading: false,
                options: [
                    { value: 'del', label: '删除' }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'id',
                        placeholder: '品牌id'
                    },
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '品牌名称'
                    },
                    {
                        type: 'select',
                        key: 'display',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:1},
                            {label:'禁用',value:0}
                        ]
                    }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                columnSelect:[],
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        activated(){
            this.getData();
        },
        methods: {
            // 仅改变状态
            async changeStatus({ display, id }) {
                try {
                    await this.$api.product.brandSetStatus({ display, id });
                    this.getData();
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'display', display == 1 ? 0 : 1);
                    })
                }
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
                this.id = undefined
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.brandList({
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
            jumpTo(name, type, id) {
                // this.$router.push({ name, params: { type, id }});
                this.id = id
                this.showAdd = true
            },
            handleDel(id) {
                this.$confirm('确认删除选中品牌？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id)
                }).catch(() => {

                });
            },
            del(id){
                let _this =this;
                if(id=='many'){
                    if(this.columnSelect.length < 1) {
                        this.$message({
                            message: '请至少选择一条申请',
                            type: 'error'
                        })
                        return;
                    }
                    this.$api.product.brandDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.brandDel({id:id}).then(function () {
                        _this.getData();
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
