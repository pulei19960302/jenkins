<template>
    <div class="remove-product">
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click="handleAdd" size="small" v-permission="[$api.product.evaluate.add]">添加</el-button>
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
                width="60"
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="nickname"
                label="用户昵称">
                <template slot-scope="scope">
                    {{ scope.row.nickname | validVal }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="title"
                label="商品名称">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goods_id"
                label="商品ID">
            </el-table-column>
            <el-table-column
                align="center"
                prop="score"
                label="评价">
                <template slot-scope="scope">
                    <el-rate
                        show-score
                        v-model="scope.row.score"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_anonymity"
                label="是否为匿名评价">
                <template slot-scope="scope">
                    {{ scope.row.is_anonymity == '0' ? '否' : '是' }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="created_at"
                width="140"
                label="评论时间">
                <template slot-scope="scope">
                    {{ scope.row.created_at | validDateTime }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="status"
                label="来源">
                <template slot-scope="scope">
                    {{ scope.row.status == 2 ? '后台添加' : '用户' }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="status"
                width="100"
                label="是否显示">
                <template slot-scope="scope">
                    <el-switch
                        :disabled="!button_permissions.includes($api.product.evaluate.add)"
                        v-model="scope.row.status"
                        active-value="10"
                        inactive-value="0"
                        @change="changeStatus(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <!--<el-button-->
                    <!--type="info"-->
                    <!--plain-->
                    <!--size="mini"-->
                    <!--@click="lookDetails.stop(scope.row)">-->
                    <!--查看-->
                    <!--</el-button>-->
                    <el-button
                        v-permission="[$api.product.evaluate.add]"
                        type="text"
                        size="mini"
                        @click="handleEdit(scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        v-permission="[$api.product.evaluate.del]"
                        type="text"
                        size="mini"
                        @click="handleDel(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <Pagination
            :options="pageOptions"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="handleOpreate"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="40%">
            <EvaluateDetails :detailsData="detailsData" />
        </RightSidePopup>
        <el-dialog
            top="4vh"
            title="添加商品评论"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form
                :model="form"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item label="用户昵称：" prop="nickname" :rules="[simpleRule]">
                    <el-input v-model="form.nickname" style="width: 240px"> </el-input>
                </el-form-item>
                <el-form-item label="用户头像：" >
                    <FileUpload :fileList="avatarDetail" @successUploadCBK="getsuccessUpload($event, 'avatar')" isOnly width="80px" height="80px"></FileUpload>
                </el-form-item>
                <!--<el-form-item label="用户职业：" prop="job" :rules="[simpleRule]">-->
                    <!--<el-input v-model="form.job" style="width: 240px"> </el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="用户评分：" prop="score" :rules="[simpleRule]">
                    <el-rate
                        style="margin-top: 6px;"
                        show-score
                        v-model="form.score"
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                </el-form-item>
                <el-form-item label="评价内容：" prop="content" :rules="[simpleRule]">
                    <el-input
                        :rows="4"
                        type="textarea"
                        v-model="form.content"
                        autocomplete="off"
                        style="width: 240px">
                    </el-input>
                </el-form-item>
                <el-form-item label="评价时间：" prop="created_time" :rules="[simpleRule]">
                    <el-date-picker
                        style="width: 240px"
                        value-format="timestamp"
                        size="mini"
                        v-model="form.created_time"
                        type="datetime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="图片：">
                    <li
                        v-for="(item, index) in imgs"
                        :key="index"
                        :style="{ backgroundImage: `url(${item})` }"
                        class="imgs"
                        @click="handlePreview(item)">
                    </li>
                    <FileUpload @successUploadCBK="getsuccessUpload($event, 'imgs')" width="100px" height="100px" :limit="5" isBotton></FileUpload>
                </el-form-item>
                <el-form-item label="视频：">
                    <li
                        v-for="(item, index) in videos"
                        :key="index"
                        class="videos">
                        <video :src="item" controls preload v-if="item"></video>
                    </li>
                    <FileUpload @successUploadCBK="getsuccessUpload($event, 'video')" width="100px" height="100px" :limit="2" isVideo isBotton></FileUpload>
                </el-form-item>
                <el-form-item label="是否匿名：" prop="is_anonymity">
                    <el-switch v-model="form.is_anonymity" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="添加商品："  prop="goods_id" :rules="[simpleRule]">
                    <el-select
                        style="width: 240px"
                        v-model="form.goods_id"
                        placeholder="请选择商品"
                        filterable
                        clearable>
                        <el-option
                            v-for="item in goods"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="addEvaluate">
                    发 布
                </el-button>
            </div>
        </el-dialog>
        <PreviewImg :visible.sync="visible" :imgSrc="imgSrc"></PreviewImg>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { _ } from '@/OMS/utils';
    import { common } from '@/OMS/mixins';
    import EvaluateDetails from './components/EvaluateDetails';

    export default {
        name: 'EvaluateProduct',
        mixins: [common],
        components: { EvaluateDetails },
        data() {
            return {
                visible: false,
                imgSrc: '',
                pageOptions: [
                    { value: 'del', label: '删除',type:'danger' }
                ],
                rghtPopupVisible: false,
                detailsData: {},
                loading: false,
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'username',
                        placeholder: '用户昵称',
                    },{
                        type: 'input',
                        key: 'title',
                        placeholder: '商品名称/商品货号'
                    },{
                        type: 'select',
                        key: 'status',
                        placeholder: '状态',
                        options: [
                            { value: '0', label: '隐藏' },
                            { value: '10', label: '显示' },
                        ]
                    },{
                        type: 'select',
                        key: 'from',
                        placeholder: '来源',
                        options: [
                            { value: '1', label: '用户评论' },
                            { value: '2', label: '后台添加' },
                        ]
                    }
                ],
                query:{},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                multipleSelection: [],

                form: {
                    nickname: '',
                    job: '',
                    score: 5,
                    content: '',
                    imgs: [],
                    video: [],
                    goods_id: '',
                    is_anonymity: 0
                },
                dialogVisible: false,
                avatar: [],
                avatarDetail: [],
                imgs: [],
                videos: [],
                goods: [],
                id: null
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        activated() {
            this.getData();
            this.getGoodsList();
        },
        methods: {
            handlePreview(img) {
                this.visible = true;
                this.imgSrc = img;
            },
            handleAdd() {
                this.dialogVisible = true;
                this.id = null;
                for (const key in this.form) {
                    this.form[key] = '';
                }
                this.form.is_anonymity = 0;
                this.form.score = 5;
                this.imgs = [];
                this.avatarDetail = [{ name: '', url: '' }];
                this.avatar = [];
                this.videos = [];
            },
            handleEdit(row) {
                for (const key in this.form) {
                    this.form[key] = row[key];
                }
                this.id = row.id;
                this.imgs = row.imgs ? row.imgs.slice(-5) : [];
                this.videos = row.video ? row.video.slice(-1) : [];
                this.form.goods_id = Number(row.goods_id);
                this.form.is_anonymity = Number(row.is_anonymity);
                this.form.created_time = row.created_time*1000;
                this.avatar = [row.avatar];
                this.avatarDetail = [{ name: 'avatar', url: row.avatar }];
                this.dialogVisible = true;
            },
            // 商品列表
            async getGoodsList() {
                try {
                    const { data } = await this.$api.common.getGoodsSelect();
                    this.goods = data.list.items;
                    return Promise.resolve(true);
                } catch (e) {
                    throw new Error(e);
                }
            },
            getsuccessUpload(val, type) {
                switch (type) {
                    case 'avatar':
                        this.avatar = val;
                        break;
                    case 'imgs':
                        this.imgs = val;
                        break;
                    case 'video':
                        this.videos = val;
                        break;
                    default:
                }
            },
            // 后台增加反馈
            async addEvaluate(){
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            params.created_time = params.created_time / 1000;
                            params.avatar = this.avatar[0];
                            params.video = this.videos.slice(-1);
                            params.imgs = this.imgs.slice(-5);
                            if(this.id) params.id = this.id;
                            await this.$api.product.addEvaluate(params);
                            this.dialogVisible = false;
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            // 仅改变状态
            async changeStatus({ status, id }) {
                try {
                    await this.$api.product.evaluateSetStatus({ status, ids: id });
                } catch (e) {
                    // 后端保存出错，强制变回原状态
                    this.tableData.map(val => {
                        if(val.id === id) this.$set(val, 'status', status == 10 ? 0 : 10);
                    })
                }
            },
            lookDetails(row) {
                this.detailsData = { ...row };
                this.rghtPopupVisible = true;
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
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            async getData() {
                try {
                    this.loading = true;
                    const { data } = await this.$api.product.evaluateList({
                        ...this.query,
                        page: this.current,
                        pageSize: this.pageSize
                    });
                    this.loading = false;
                    // score
                    data.list.forEach(curr => {
                        curr.score = Number(curr.score);
                    })
                    this.tableData = data.list;
                    this.count = Number(data.num);
                } catch (e) {
                    this.loading = false;
                    throw new Error(e);
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val.map(curr => curr.id);
            },
            handleOpreate() {
                if(this.multipleSelection.length < 1) {
                    this.$message.error('请至少选择一条反馈');
                    return;
                }
                this.handleDel(this.multipleSelection);
            },
            handleDel(id) {
                this.$confirm('确认删除选中反馈？', '提示', {
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
                        await this.$api.product.evaluateDel({ ids });
                        this.getData();
                    } catch (e) {
                        throw new Error(e);
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .remove-product {
        .imgs {
            width: 60px;
            height: 60px;
            background-size: 100% 100%;
            display: inline-block;
            margin-right: 10px;
        }
        .videos {
            width: 300px;
            height: 150px;
            video {
                width: 100%;
                height: 100%;
            }
        }
    }
    .look{
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;
    }
</style>
