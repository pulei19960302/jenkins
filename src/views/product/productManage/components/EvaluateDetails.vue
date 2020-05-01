<template>
    <div class="evaluate-details">
        <div class="left">
            <div class="header">
                <img :src="detailsData.avatar" class="icon">
                <p>{{ detailsData.nickname | validVal }}</p>
            </div>
            <div class="left-content">
                <p><span>商品：</span>{{ detailsData.title | validVal }}</p>
                <p><span>购买：</span>{{ detailsData.sku_properties_name | validVal}}</p>
                <p>
                    <span>评价：</span>
                    <el-rate
                        style="display: inline-block"
                        show-text
                        v-model="detailsData.score"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}">
                    </el-rate>
                </p>
                <p><span>日期：</span> {{ detailsData.created_at | validDateTime }}</p>
                <!--<p><span>IP地址：</span>192.168.1.92</p>-->
            </div>
        </div>
        <div class="center">
            <div class="pviews">
                <!--<span>-->
                    <!--<svg class="icon" aria-hidden="true" style="color: red;">-->
                        <!--<use xlink:href="#icon-icon3"></use>-->
                    <!--</svg>-->
                    <!--<span>收藏 1000</span>-->
                <!--</span>-->
                <!--<span>-->
                    <!--<svg class="icon" aria-hidden="true" >-->
                        <!--<use xlink:href="#icon-eye"></use>-->
                    <!--</svg>-->
                    <!--<span>阅读 5000</span>-->
                <!--</span>-->
                <b>评价内容</b>
            </div>
            <div class="center-content">
                {{ detailsData.content | validVal }}
            </div>
            <!--<div class="all-reviews">-->
                <!--<div class="pviews">-->
                    <!--<span>-->
                        <!--<svg class="icon" aria-hidden="true">-->
                            <!--<use xlink:href="#icon-pinglunzu"></use>-->
                        <!--</svg>-->
                        <!--<span>全部评论 2000</span>-->
                    <!--</span>-->
                <!--</div>-->
                <!--<div class="reviews" v-for="(item, index) in 4" :key="index">-->
                    <!--<svg class="icon" aria-hidden="true">-->
                        <!--<use xlink:href="#icon-icon-test1"></use>-->
                    <!--</svg>-->
                    <!--<div>-->
                        <!--<p class="nickname">Jay</p>-->
                        <!--<p><span>回复</span>Windir：看来大家都是懒人呀！</p>-->
                        <!--<p>-->
                            <!--<span class="mr20">2017-06-15 14:35:51</span>-->
                            <!--<el-button type="text" @click="handleOperate('hide')">隐藏</el-button>-->
                            <!--<el-button type="text" style="color: red;" @click="handleOperate('del')">删除</el-button>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<el-pagination-->
                    <!--small-->
                    <!--@current-change="handlePageChange"-->
                    <!--:current-page="current"-->
                    <!--layout="total, prev, pager, next"-->
                    <!--:total="count">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
        <!--<div class="right">-->
            <!--<div class="pviews">-->
                <!--<svg class="icon" aria-hidden="true" >-->
                    <!--<use xlink:href="#icon-huifu"></use>-->
                <!--</svg>-->
                <!--<span>-->
                    <!--回复评价-->
                <!--</span>-->
            <!--</div>-->
            <!--<div class="right-content">-->
                <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">-->
                    <!--<el-form-item label="用户名：" prop="name">-->
                        <!--<el-input v-model="ruleForm.name" size="small" disabled></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="Email：" prop="email">-->
                        <!--<el-input v-model="ruleForm.email" size="small" disabled></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="回复内容：" prop="content">-->
                        <!--<el-input type="textarea" v-model="ruleForm.content" size="small" :rows="6"></el-input>-->
                        <!--<p class="tips">管理员回复内容会在前台显示</p>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="submitForm('ruleForm')">回复</el-button>-->
                        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: 'EvaluateDetails',
        props: {
            detailsData: [Object]
        },
        components: {},
        data() {
            return {
                query:{},
                current: 1,
                pageSize: 10,
                count: 4,
                rateValue: 4,
                ruleForm: {
                    name: '',
                    email: '',
                    content: '',
                },
                rules: {
                    content: [
                        { required: true, message: '请填写回复内容', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
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
            handleOperate(type) {
                const msg = type === 'del' ? '删除' : '隐藏';
                // this.$confirm(`确认${msg}该条评论？`, '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                    this.$message({
                        type: 'success',
                        message: `${msg}成功!`
                    });
                // }).catch((e) => {
                //     throw new Error(e);
                // });
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../styles/variables";

    .evaluate-details {
        background: #fff;
        display: flex;
        justify-content: space-between;
        .left {
            width: 40%;
            padding: 10px;
            border-right: 1px solid $border;
            .header {
                text-align: center;
                .icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                }
            }
            &-content {
                margin-top: 20px;
                p {
                    margin-bottom: 10px;
                    span {
                        font-weight: 600;
                    }
                }
            }
        }
        .pviews {
            padding: 10px 0;
            span:first-child {
                margin-right: 10px;
            }
            border-bottom: 1px solid $border;
        }
        .center {
            width: 60%;
            padding: 20px;
            &-content {
                padding: 20px 0;
                line-height: 2;
                text-indent: 28px;
            }
            .all-reviews {
                .reviews {
                    display: flex;
                    align-items: center;
                    width: 90%;
                    padding: 20px;
                    border-bottom: 1px solid $border;
                    .icon {
                        font-size: 42px;
                        margin-right: 20px;
                    }
                    div {
                        display: inline-block;
                        line-height: 2;
                        span {
                            color: #ccc;
                        }
                    }
                }
            }
        }
        /*.right {*/
            /*width: 30%;*/
            /*padding: 10px;*/
            /*&-content {*/
                /*padding: 20px 0;*/
            /*}*/
        /*}*/
    }
</style>
