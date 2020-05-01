<template>
    <scroll-bar>
        <div class="company-logo">
            <router-link :to="{name:'Index'}">
                <img height="50" :src="platform_config && platform_config.keys && platform_config.keys.platform_logo" alt="">
            </router-link>
        </div>
        <!-- <el-menu
            mode="vertical"
            unique-opened
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            background-color="#304156"
            text-color="#ffffffa6"
            active-text-color="#fff">
            <sidebar-item :routes="realRouters" />
        </el-menu> -->
        <div class="jz-side-bar">
            <SaasSideBarItems :routes="realRouters"></SaasSideBarItems>
        </div>
        <slot></slot>
    </scroll-bar>
</template>

<script>
    import { mapState } from 'vuex';
    import SaasSideBarItems from './SaasSideBarItems';
    import ScrollBar from '@/OMS/components/ScrollBar/index';

    export default {
        components: { SaasSideBarItems, ScrollBar },
        data() {
            return {
            }
        },
        computed: {
            ...mapState('app', ['sidebar']),
            ...mapState('permission', ['routers']),
            ...mapState('user', ['platform_config']),
            isCollapse() {
                // return !this.sidebar.opened;
                return true
            },
            // 筛选对应模块路由
            realRouters() {
                return this.routers
                // .filter(val => {
                //     return this.$route.path.includes(val.name);
                // });
            }
        },
        created(){
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../styles/variables";
.company-logo{
    display: flex;
    align-items: center;
    justify-content: center;
    height:56px;
    color:#fff;
    cursor: pointer;
    background-color:rgba(0,0,0,0.2)
}
</style>
