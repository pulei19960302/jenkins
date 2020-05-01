<template>
    <div class="ad-list">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click.stop="jumpTo('NewSupplier','add')" size="small" v-permission="[$api.product.supplier.add]">添 加</el-button>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.product.supplier.export" v-permission="[$api.product.supplier.export]"/>
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
                label="供应商名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="en_name"
                label="英文名称">
                <template slot-scope="scope">
                    {{ scope.row.en_name | validVal }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态">
                <template slot-scope="scope">
                    <el-switch
                        :disabled="!button_permissions.includes($api.product.supplier.edit)"
                        v-model="scope.row.status"
                        :active-value="10"
                        :inactive-value="0"
                        @change="changeStatus(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="200"
                align="center">
                <template slot-scope="scope">
                    <span class="look" type="primary" plain size="mini"  @click.stop="jumpTo('EditSupplier', 'edit',scope.row.id)" v-permission="[$api.product.supplier.edit]">编辑</span>
                    <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.product.supplier.del]">删除</span>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <Pagination
            :options="pageOptions"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <NewSupplier @fresh="getData" :show.sync="showAdd" :id="id"></NewSupplier>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import NewSupplier from './components/NewSupplier'
    export default {
        name: "SupplierManage",
        components:{
            NewSupplier
        },
        data() {
            return {
                showAdd:false,
                id:undefined,

                exportOptions: [],
                opreate: '',
                loading: false,
                show: true,
                pageOptions: [
                    { value: 'del', label: '批量删除',type:"danger",permission:[this.$api.product.supplier.del] }
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '供应商ID / 名称'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        label: '',
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
            async changeStatus({ status, id }) {
                try {
                    await this.$api.product.supplierSetStatus({ status, id });
                    this.getData();
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
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
                //获取列表数据
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.supplierList({
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
            jumpTo(name, type, id = null) {
                this.id = id
                this.showAdd = true
            },
            handleDel(id) {
                this.$confirm('确认删除选中供应商？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.del(id)
                })
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
                    this.$api.product.supplierDelall({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.supplierDel({id:id}).then(function () {
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
