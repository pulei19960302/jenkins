<template>
    <div class="label-manage">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="dialogVisible=true;form={status:0}" size="small" v-permission="[$api.product.label.add]">添 加</el-button>
        </Search>
         <div class="common-table-wrapper">
        <el-table
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
                width="110"
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="label"
                label="商品标签">
            </el-table-column>
            <el-table-column
                align="center"
                label="标签背景色">
                <template slot-scope="scope">
                   <el-color-picker disabled :value="scope.row.back_color"></el-color-picker>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="标签字体色">
                <template slot-scope="scope">
                   <el-color-picker disabled :value="scope.row.font_color"></el-color-picker>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="状态">
                <template slot-scope="scope">
                    <el-switch
                        :disabled="!button_permissions.includes($api.product.label.edit)"
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
                    <span class="look" type="primary" plain size="mini"  @click="handelEdit(scope.row)" v-permission="[$api.product.label.edit]">编辑</span>
                    <span class="look" type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.product.label.del]">删除</span>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <Pagination
            :options="paginationOptions"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="添加商品标签"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="标签名称：" prop="label" :rules="[simpleRule]">
                    <el-input
                        v-model="form.label"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="status">
                    <el-switch v-model="form.status" :active-value="10" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="标签背景色">
                    <el-color-picker v-model="form.back_color"></el-color-picker>
                </el-form-item>
                <el-form-item label="标签字体色">
                    <el-color-picker v-model="form.font_color"></el-color-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button
                    type="primary"
                    @click="AddLabel(isEdit)">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';
    import { common } from '@/OMS/mixins';

    export default {
        name: "LabelManage",
        mixins: [common],
        data() {
            return {
                opreate: '',
                dialogVisible: false,
                form: {
                    status: null,
                    back_color:'',
                    font_color:'',
                    label:''
                },
                show: true,
                paginationOptions: [
                    { value: 'del', label: '批量删除',type:'danger',permission:[this.$api.product.label.del] },
                    { value: 'up', label: '批量上架' },
                    { value: 'down', label: '批量下架' },
                ],
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '标签名'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            {label:'启用',value:10},
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
                rules: {},
                isEdit: false,
                id: null,
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
                    await this.$api.product.setStatusLabel({ status, id });
                    this.getData();
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
                    })
                }
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            handelEdit(row) {
                this.isEdit = true;
                this.dialogVisible = true;
                this.$nextTick(()=>{
                    Object.assign(this.form,row)
                })
            },
            AddLabel(isEdit) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            if(isEdit) {
                                await this.$api.product.editLabel(params);
                            } else {
                                delete params.id
                                await this.$api.product.addLabel(params);
                            }
                            this.dialogVisible = false;
                            this.isEdit = false;
                            this.resetForm();
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
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
                    const { data } = await this.$api.product.getLabelList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
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
            handleDel(id) {
                if(id=='many') {
                    if (this.columnSelect.length < 1) {
                        this.$message({
                            message: '请选择标签',
                            type: 'error'
                        })
                        return;
                    }
                }
                this.$confirm('确认删除选中商品标签？', '提示', {
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
                    this.$api.product.delLabel({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.product.delLabel({id:id}).then(function () {
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
