<template>
    <div class="picture-list">
        <div style="margin-bottom: 10px;">
            <el-button type="primary" @click="dialogVisible=true">上 传</el-button>
        </div>
        <div class="picture-list-content">
            <el-card :body-style="{ padding: '0px' }" class="card" v-for="(item, index) in pictures" :key="index">
                <img :src="item.src" class="image">
                <div>
                    {{ item.style }} ({{ item.size }})
                </div>
                <div style="padding: 2px;">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <el-button type="text" class="button">转移相册</el-button>
                    <el-button type="text" class="button" style="color: red;">删除图片</el-button>
                </div>
            </el-card>
        </div>
        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <el-dialog
            title="上传图片"
            :visible.sync="dialogVisible"
            width="40%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="选择相册：" prop="name">
                    <el-select placeholder="批量操作" style="width: 100px;">
                        <el-option
                            size="small"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择图片：" prop="name">
                    <el-upload
                        style="width: 50%;"
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'PictureList',
        props: {},
        components: {},
        data() {
            return {
                checked: false,
                // options: [],
                pictures: [
                    { src: 'http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png',style: '100*100', size: '100k' },
                    { src: 'http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png',style: '100*100', size: '100k' },
                    { src: 'http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png',style: '100*100', size: '100k' },
                    { src: 'http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png',style: '100*100', size: '100k' },
                    { src: 'http://img.ryg0212.com/goods/thumb/2018/11/5becc9512aec2.png',style: '100*100', size: '100k' },
                ],
                opreate: 'del',
                options: [
                    { value: 'del', label: '删除' }
                ],
                dialogVisible: false,
                query:{},
                current: 1,
                pageSize: 10,
                count: 9,
                form: {
                    content: ''
                },
                rules: {
                    content: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ]
                },
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            getData() {
                //获取列表数据
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
        }
    }
</script>

<style scoped lang="scss">
    .picture-list {
        &-content {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            .card {
                width: calc(100%/10 - 10px);
                margin-right: 10px;
                margin-bottom: 10px;
                text-align: center;
                img {
                    width: 100%;
                    height: 100px;
                }
            }
        }
    }
</style>
