<template>
    <div style="display: flex;height: 40px;">
        <navbar />
        <el-breadcrumb
            class="app-breadcrumb"
            separator-class="el-icon-arrow-right">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item :to="{ path: '/Index/Index' }" key="path">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home"></use>
                    </svg>当前位置
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    v-for="(item,index) in levelList"
                    :key="item.path"
                    v-if="item.meta.title">
                    <span
                        v-if="item.redirect==='noredirect' || index == levelList.length - 1"
                        class="no-redirect">
                        {{ item.meta.title }}
                    </span>
                    <router-link
                        v-else
                        :to="item.redirect || item.path">
                        {{ item.meta.title }}
                    </router-link>
                </el-breadcrumb-item>
            </transition-group>
            <!--<div style="float: right;margin-right: 20px;">-->
                <!--<el-button-->
                    <!--type="primary"-->
                    <!--size="mini"-->
                    <!--icon="el-icon-refresh">-->
                    <!--刷新-->
                <!--</el-button>-->
            <!--</div>-->
        </el-breadcrumb>
    </div>
</template>

<script>
    import { Navbar } from './index';
    /**
     * 面包屑组件
     * 默认首页
     */
    export default {
        data() {
            return {
                levelList: []
            }
        },
        components: {
            Navbar
        },
        watch: {
            $route(val) {
                this.getBreadcrumb();
            }
        },
        created() {
            this.getBreadcrumb();
        },
        methods: {
            getBreadcrumb() {
                const matched = this.$route.matched.filter(item => item.name);
                this.levelList = matched;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/variables";
    .app-breadcrumb.el-breadcrumb {
        width: 100%;
        padding-left: 10px;
        // border-radius: 4px;
        background: #fff;
        font-size: 14px;
        line-height: 40px;
        border-bottom: solid 1px #e6e6e6;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
