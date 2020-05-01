<template>
    <div style="min-height: calc(100vh - 135px); background: #fff;">
        <!--表单-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="jumpTo('addFreightFormwork')" size="small" v-permission="[$api.setting.freight_template.add]">添加</el-button>
        </Search>
        <template>
            <div style="padding: 0 16px 16px 16px; background: #fff; border-radius: 0 0 4px 4px; width: 100%;">
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
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    label="模板名称"
                    prop="name"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="供应商"
                    prop="supplier"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="计价方式"
                    prop="type">
                    <template slot-scope="scope">
                        {{ pricingManner(scope.row.type) }}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120px"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <span class="look-word" type="primary" plain size="mini" @click="jumpTo('editFreightFormwork' ,'edit', scope.row.id)" v-permission="[$api.setting.freight_template.edit]">编辑</span>
                        <span class="look-word" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.setting.freight_template.del]">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            </div>

            <Pagination
                :options="paginationOptions"
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @opreateCBK="handleDel(multipleSelection)"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';
    //运费模板
    export default {
        name: "freightFormwork",
        data() {
            return {
                paginationOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                current: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                tableData: [],
                multipleSelection: [],
                value2:'',
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'id',
                        placeholder: '模板ID'
                    },
                    {
                        type: 'input',
                        key: 'name',
                        placeholder: '模板名称'
                    }, {
                        type: 'select',
                        key: 'supplier_id',
                        placeholder: '供应商',
                        options: []
                    },
                ],
                query: {},
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        created() {
            this.getFreightTemplateList();
            this.getSupplierData();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.setting.freight_template.del)) this.paginationOptions = [];
        },
        methods: {
            async getSupplierData() {
                try {
                    const { data } = await this.$api.product.supplierList();
                    this.searchOPtions.forEach(curr => {
                        if(curr.key === 'supplier_id') {
                            curr.options =  data.items.map(val => {
                                return {
                                    value: val.id,
                                    label: val.name
                                }
                            })
                        }
                    })
                } catch (e) {
                    throw new Error(e);
                }
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getFreightTemplateList();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getFreightTemplateList();
                    }
                }
                todo[type]();
            },
            pricingManner(type) {
                if(type == 1) return '按件数';
                if(type == 2) return '按重量';
                if(type == 3) return '按体积';
            },
            async getFreightTemplateList() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.setting.getFreightTemplateList({
                        ...this.query,
                        pagesize: this.pageSize,
                        page: this.current
                    });
                    this.tableData = data.items;
                    this.count = data.count;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.map(curr => curr.id);
            },
            handlePageChange(val) {
                this.current = val;
                this.getFreightTemplateList();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getFreightTemplateList();
            },
            jumpTo(name, type, id){
                this.$router.push({ name ,params:{ type, id }});
            },
            handleDel(id) {
                this.$confirm('确认删除选中模板？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let ids;
                    if(!_.isArray(id)) {
                        // 单个删除
                        ids = id;
                    } else {
                        // 批量删除
                        ids = id.join(',');
                    }
                    try {
                        await this.$api.setting.delFreightTemplate({ ids });
                        this.getFreightTemplateList();
                    } catch (e) {
                        throw new Error(e);
                    }
                }).catch((e) => {
                    throw new Error(e);
                });
            },
        }
    }
</script>

<style scoped>
    .block{margin-top: 10px}
</style>
