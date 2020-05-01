<template>
    <div class="remove-product">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="add" size="mini" v-permission="[$api.setting.banner.add]">添 加</el-button>
        </Search>
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
                fixed
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                label="编号"
                width="60">
            </el-table-column>
            <el-table-column
                align="center"
                prop="banner"
                label="图片地址">
            </el-table-column>
            <el-table-column
                align="center"
                label="图片预览">
                <template slot-scope="scope">
                    <img
                        class="photo"
                        style="width: 40px;height: 40px"
                        @click="previewImg=scope.row.banner;visible = true"
                        :src="scope.row.banner">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="goto_url"
                label="跳转地址">
            </el-table-column>
            <el-table-column
                align="center"
                label="图片主色">
                <template slot-scope="scope">
                   <el-color-picker disabled :value="scope.row.main_color"></el-color-picker>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="description"
                label="描述">
                <template slot-scope="scope">
                    {{ scope.row.description | validVal }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="sort"
                label="排序"
                width="100">
            </el-table-column>
            <el-table-column
                align="center"
                label="是否启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" @change="showEdit(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                width="180"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="edit(scope.row)" v-permission="[$api.setting.banner.edit]">编辑</el-button>
                    <el-button type="danger" plain size="mini" @click="handleDel(scope.row.id)" v-permission="[$api.setting.banner.del]">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :options="pageOptions"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @opreateCBK="handleDel('many')"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">"
        </Pagination>
        <el-dialog
            title="添加类型"
            :visible.sync="dialogVisible"
            width="600px">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-width="120px"
                label-position="right">
                <el-form-item label="图片上传">
                    <FileUpload :isOnly="true" :fileList="banner" @successUploadCBK="getsuccessUploadthumb"></FileUpload>
                </el-form-item>
                <el-form-item label="图片主色">
                    <el-color-picker v-model="form.main_color"></el-color-picker>
                </el-form-item>
                <!-- <el-form-item label="跳转地址：" prop="goto_url">
                    <el-row>
                        <el-select v-model="form.goto_url_prefix" placeholder="请选择"  style="width: 70%;">
                            <el-option
                                v-for="item in jumpOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>
                    <el-row>
                        <el-input v-model="form.goto_url" :placeholder="gotoUrlPlaceholder(form.goto_url_prefix)" style="width: 70%">
                        </el-input>
                    </el-row>
                </el-form-item> -->
                <el-form-item label="跳转页面：">
                    <el-radio v-for="item in pages" :key="item.value" v-model="form.type" :label="item.value">{{item.name}}</el-radio>
                </el-form-item>
                <el-form-item label="参数">
                    <el-input  type="textarea" autosize v-model="form.param"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sort">
                    <el-input v-model="form.sort" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input type="textarea" v-model="form.description" style="width:70%"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-switch v-model="form.status" :disabled="!button_permissions.includes($api.setting.banner.edit)"></el-switch>
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
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import pages from '@/OMS/components/jumpSet/pages'
    const detail_prefix = '/pages/productDetail/productDetail?id='; // 小程序详情页前缀
    const active_prefix = '/pages/active/active?id='; // 小程序活动页前缀
    export default {
        name: 'bannerList',
        props: {},
        components: {},
        data() {
            return {
                pageOptions: [
                    { value: 'del', label: '批量删除' }
                ],
                pages,
                loading: false,
                visible: false,
                previewImg: '',
                dialogVisible: false,
                rules: {
                    goto_url: [
                        { required: false, message: '请输入', trigger: 'change' },
                    ],banner: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
                isSwitch: true,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'description',
                        placeholder: '描述'
                    }, {
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
                type:'',
                typeName:'',
                editId:'',
                columnSelect:[],
                banner: [],
                form:{
                    goto_url_prefix: '',
                    goto_url: '',
                    sort: 1,
                    description: '',
                    id: '',
                    type:'',
                    param:'',
                    status: true,
                    main_color:''
                },
                jumpOptions: [
                    { value: detail_prefix, label: '商品详情页' },
                    { value: active_prefix, label: '活动页' },
                    { value: '', label: '自定义' },
                ]
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        watch: {},
        created() {
            this.getData();
            // 判断是否有批量操作权限
            if (!this.button_permissions.includes(this.$api.setting.banner.del)) this.pageOptions = [];
        },
        mounted() {
        },
        methods: {
            // 提示
            gotoUrlPlaceholder(val) {
                switch (val) {
                    case detail_prefix: return '请填写商品ID';
                    case active_prefix: return '请填写活动ID';
                    case '': return '请填写完整的网页地址';
                    default: '请先选中类型'
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
                    const { data } = await this.$api.setting.bannerList({
                        ...this.query,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    for (let i=0;i<data.items.length;i++){
                        data.items[i].status= data.items[i].status==0?false:true;
                    }
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
                this.$refs.form && this.$refs.form.resetFields()
                this.dialogVisible=true;
                this.banner = []
                this.type='add';
                delete this.form.id
            },
            edit(row){
                this.type='edit';
                this.dialogVisible=true;
                // 编辑正确回显url地址
                this.$nextTick(()=>{
                    
                    if(row.goto_url && row.goto_url !== 'undefined') {
                        if(row.goto_url.includes(detail_prefix)) {
                            this.form.goto_url = row.goto_url ? row.goto_url.replace(detail_prefix, '') : '';
                            this.form.goto_url_prefix = detail_prefix;
                        } else if(row.goto_url.includes(active_prefix)) {
                            this.form.goto_url = row.goto_url ? row.goto_url.replace(active_prefix, '') : '';
                            this.form.goto_url_prefix = active_prefix;
                        } else {
                            this.form.goto_url = row.goto_url || '';
                            this.form.goto_url_prefix = '';
                        }
                    } else {
                        this.form.goto_url = '';
                    }

                    this.form.type = row.type;
                    this.form.param = row.param;
                    this.form.sort=row.sort;
                    this.form.description=row.description;
                    this.form.id=row.id;
                    this.form.main_color = row.main_color
                    this.banner = [{ name:row.banner, url:row.banner }];
                    
                })

            },
            submit(){
                let  _this = this;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let obj = {...this.form};
                        obj.status = obj.status == true ? 10 : 0;
                        obj.banner = this.banner[0].url;
                        // 组合新的跳转地址
                        obj.goto_url = `${obj.goto_url_prefix}${obj.goto_url}`;
                        delete obj.goto_url_prefix;
                        if(!obj.banner) return;
                        if (this.type == 'add') {
                            this.$api.setting.bannerAdd(obj).then(function () {
                                _this.refresh();
                            });
                        } else {
                            this.$api.setting.bannerEdit(obj).then(function () {
                                _this.refresh();
                            });
                        }
                    }
                });
            },
            refresh(){
                this.dialogVisible = false;
                this.banner = [];
                this.form.goto_url = '';
                this.form.sort = 1;
                this.form.description = '';
                this.form.status = true;
                this.$refs.form.resetFields();
                this.form.type = '';
                this.form.param = '';
                this.getData();
            },
            handleDel(id) {
                this.$confirm('确认删除选中banner图？', '提示', {
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
                    this.$api.setting.bannerDel({ids: this.columnSelect.join(',')}).then(function () {
                        _this.getData();
                    });
                }else {
                    this.$api.setting.bannerDel({ids:id}).then(function () {
                        _this.getData();
                    });
                }
            },
            showEdit(row){
                let obj = {...row};
                obj.status = obj.status==true?10:0;
                this.$api.setting.bannerEdit(obj);
            },
            getsuccessUploadthumb(val){
                this.banner  = [{ name:'banner', url:val[0] }];
            },
        }
    }
</script>

<style scoped lang="scss">
    .remove-product {

    }
</style>
