
<template>
    <div class="businessArticle-container">
           <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button type="primary" plain @click.stop="showAdd" size="mini">添 加</el-button>
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
        </div>
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
        @selection-change="handleSelectionChange"
    >

            <el-table-column
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="title"
                label="标题">
            </el-table-column>
        
            <el-table-column
                width="90"
                align="center"
                prop="banner"
                label="头图">
                <template slot-scope="scope">
                    <img
                        class="table-img"
                        @click="previewImg=scope.row.banner;visible = true"
                        :src="scope.row.banner">
                </template>
            </el-table-column>


            <el-table-column
                width="100"
                align="center"
                prop="video"
                label="视频">
                <template slot-scope="scope">
                    <el-button style="margin-right:0 !important" v-if="scope.row.video" @click="playVideo(scope.row)" type="text">查看</el-button>
                    <span v-else>--</span>
                </template>
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="breif"
                width="200"
                label="简介">
                <template slot-scope="scope">
                    <div style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis">{{scope.row.breif}}</div>
                </template>
            </el-table-column>
        
            <!-- <el-table-column
                align="center"
                prop="type"
                label="类型">
            </el-table-column> -->
        

        
            <el-table-column
                align="center"
                prop="content"
                label="内容">
                <template slot-scope="scope">
                    <el-button style="margin-right:0 !important" @click.stop="showDetail(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="view"
                label="查看次数">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="10" :inactive-value="0" @change="toogle(scope.row)"></el-switch>
                </template>
            </el-table-column>
                    <el-table-column
                    align="center"
                    prop="id"
                    width="180"
                    label="操作">
                    <template slot-scope="scope">
                    
                    <el-button type="text"  @click.stop="edit(scope.row)">编辑</el-button>
            
                    <el-button type="text" class="danger-color" @click.stop="del(scope.row.id)">删除</el-button>
            
                    </template>
                </el-table-column>
        
    </el-table>
    <el-dialog title="video" :visible.sync="playing" width="50%">
        <div style="display:flex;justify-content:center">
           <video width="300" height="200" ref="playing" controls preload :src="playingSrc"></video>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="playing = false">关闭</el-button>
        </div>
    </el-dialog>
    <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <Pagination
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange"
            :options="multipeOptions"
            @opreateCBK="handleMultipe"
            
        >
        </Pagination>
        
            <RightSidePopup :visible.sync="rightPopupVisible" width="80%">
                
            <div class="businessArticle-form-container">
                <el-row :gutter="20" style="margin-bottom:30px">
                    <span style="font-size:20px;font-weight: bold;margin-bottom:10px;" class="title">{{isEdit?'编辑':'添加'}}文章</span>
                </el-row>
                <el-form ref="businessArticleForm" :model="formData" label-width="100px" size="mini">
                    
            <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="title" :rules="[simpleRule]" label="标题：">
                                <el-input placeholder="请输入" v-model="formData.title"></el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
        
            <el-row>
                <el-col :span="5">
                    <el-form-item class="banner-form" label="头图">
                        <div class="file-upload">
                        <FileUpload
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'banner')"
                            :fileList="formData.banner"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i v-if="formData.banner[0] && formData.banner[0].url" style="right: 0" class="el-icon-circle-close-outline" @click="remove('banner')"></i>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="视频">
                      <div style="display: flex;margin-top: 10px;align-items:flex-end">
                            <div v-if="formData.video[0] && formData.video[0].url" class="goods-vidoe">
                                <i class="el-icon-circle-close-outline" @click="remove('video')"></i>
                                <video  height="80" :src="formData.video[0].url" controls preload></video>
                                <!-- <span>视频 <span class="tips">建议尺寸16:9</span></span> -->
                            </div>
                            <div class="article-video-button">
                                <FileUpload
                                    :isBotton="true"
                                    :isOnly="true"
                                    @successUploadCBK="successUpload($event, 'video')"
                                    class="file-button">视频上传</FileUpload>
                            </div>
                        </div>
                    </el-form-item> 
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col>
                    <el-form-item label="视频">
                      <div style="display: flex;margin-top: 10px;flex-direction:column">
                            <div v-if="formData.video[0] && formData.video[0].url" class="goods-vidoe">
                                <i class="el-icon-circle-close-outline" @click="remove('video')"></i>
                                <video width="100" :src="formData.video[0].url" controls preload></video>
                            </div>
                            <div class="article-video-button">
                                <FileUpload
                                    :isBotton="true"
                                    :isOnly="true"
                                    @successUploadCBK="successUpload($event, 'video')"
                                    class="file-button">视频上传</FileUpload>
                            </div>
                        </div>
                    </el-form-item> 
                </el-col>
            </el-row> -->

        
            <!-- <el-row>
                <el-col>
                    <el-form-item prop="type" label="类型">
                            <el-select
                            v-model="formData.type"
                            placeholder="请选择类型"
                            filterable
                            clearable
                            >
                                <el-option
                                    v-for="item in []"
                                    :key="item.key"
                                    :label="item.val"
                                    :value="item.key">
                                </el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
            </el-row> -->
        


            <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="breif" :rules="[simpleRule]" label="简介：">
                                <el-input type="textarea" placeholder="请输入" v-model="formData.breif"></el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
        
            <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item prop="content" :rules="[simpleRule]" label="内容：">
                                <Tinymce ref="editor" :height="300" v-model="formData.content"/>
                        </el-form-item>
                    </el-col>
            </el-row>
        
            <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="view" :rules="[simpleRule]" label="查看次数：">
                                <el-input placeholder="请输入" v-model="formData.view"></el-input>
                        </el-form-item>
                    </el-col>
            </el-row>
        
            <el-row>
                <el-col>
                    <el-form-item prop="status" label="状态">
                        <el-switch v-model="formData.status" :active-value="10" :inactive-value="0" ></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
        
                    <el-form-item>
                        <el-button type="primary" @click="submit">保存</el-button>
                        <el-button type="default" @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        
            </RightSidePopup>

    <RightSidePopup :visible.sync="showArticleDetail" width="80%">  
        <ArticleDetail :data="articleDetail"></ArticleDetail>
    </RightSidePopup>      
    </div>
</template>
<script>
import { common } from '@/OMS/mixins';
import ArticleDetail from './components/ArticleDetail'
export default {
    name: "businessArticle",
    mixins: [common],
    components:{
        ArticleDetail
    },
    data(){
        return {
            searchOPtions:[
                {
                    type: 'input',
                    key: 'keywords',
                    placeholder: '编号或标题'
                },
                {
                    type: 'select',
                    key: 'status',
                    placeholder: '状态',
                                            options: [
                            {label:'启用',value:10},
                            {label:'禁用',value:0},
                        ]
                },
            ],
            tableData:[],
            visible:false,
            previewImg:'',
            rightPopupVisible:false,
            showArticleDetail:false,
            articleDetail:{},
            isEdit:false,
            formData:{
                title:'',
                banner:[],
                breif:'',
                // type:'',
                video:[],
                content:'',
                view:0,
                status:'',
            },
            multipeOptions:[
                { value: 'del', label: '批量删除', type: 'danger' }
            ],
            playingSrc:'',
            playing:false
        }
    },
    created(){
        this.getData()
    },
    methods:{
        playVideo(row){
            this.playingSrc = row.video
            this.playing = true
        },
        showDetail(row){
            this.showArticleDetail = true;
            this.articleDetail = row
        },
        toogle(row){
            this.$api.activity.businessArticleStatus({
                status:row.status,
                id:row.id
            }).catch((err)=>{
                row.status = row.status==10?0:10
            })
        },
        showAdd(){
            this.rightPopupVisible = true
            this.isEdit = false
            this.$refs.businessArticleForm.resetFields();
            this.formData.banner = [{url:''}]
            this.formData.video = []
            delete this.formData.id
            this.$refs.editor.setContent('')
        },
        edit(row){
            this.rightPopupVisible = true
            this.isEdit = true
            Object.keys(this.formData).forEach(it=>{
                this.formData[it] = row[it]
            })
            this.formData.banner = [{url:row.banner}]
            this.formData.video = [{url:row.video}]
            this.$refs.editor.setContent(this.formData.content)
            this.formData.id = row.id
        },
        
        del(id){
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDel(id);
                })
            },
        handleDel(id){
            this.$api.activity.businessArticleDel({ ids:id }).then(res=>{
                this.getData()
            })
        },
        handleMultipe(key){
            const choosed = this.multipleSelection
            if(choosed.length===0){
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'error'
                })
                return;
            }
            switch (key){
                
            case 'del':
            console.log('del',this.multipleSelection)
            break
        
            }
        },
        getData(){
            try{
                this.loading = true
                this.$api.activity.businessArticleList({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current
                }).then(res=>{
                    this.loading = false
                    this.tableData = res.data.items
                    this.count = res.data.count
                    this.searchOPtions.forEach(it=>{
                        if(it.key==='status'){
                            it.options = res.data.statusType
                        }
                    })
                }).catch(err=>{
                    this.loading = false
                })
            }catch(e){
                this.loading = false
            }
            
        },
        
        remove(key){
            this.formData[key] = [{url:''}]
        },
        successUpload(val,name){
            this.formData[name] = [{url:val[0]}]
        },
            
            submit(){
                this.$refs.businessArticleForm.validate(val=>{
                    if(val){
                        const params = {...this.formData}
                        params.banner = params.banner[0]?params.banner[0].url:''
                        params.video = params.video[0]?params.video[0].url:''
                        // if(this.isEdit){
                        //     this.$api.activity.businessArticleEdit(params).then(res=>{
                        //         this.$refreshTab()
                        //     })
                        //     return 
                        // }
                        this.$api.activity.businessArticleAdd(params).then(res=>{
                            this.getData()
                            this.rightPopupVisible = false
                        })
                    }
                })
            },
            
            cancel(){
                this.$refs.businessArticleForm.resetFields();
                this.rightPopupVisible = false
            },
        
    
    }
}
</script>
<style lang="scss" scope>
       .goods-vidoe {
            display: flex;
            justify-content: center;
            padding: 10px;
            position: relative;
            width:200px;
            border:1px dashed rgb(217, 217, 217);
            .el-icon-circle-close-outline {
                color: #666;
                top: -5px;
                right: -5px;
                width: 10px;
                height: 10px;
                position: absolute;
                &:hover {
                    color: red;
                    cursor: pointer;
                }
            }
        }
        .article-video-button{
            margin-left: 20px;
            .el-button{
                margin-right:0 !important;
                padding: 10px;
            }
        }
.file-upload {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    .el-icon-circle-close-outline{
        position: absolute;
        right: 10px;
        top: 0;
        &:hover {
            color: red;
            cursor: pointer;
        }
    }
}     
</style>

