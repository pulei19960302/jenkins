<template>
    <div
        class="app-wrapper"
        :class="{ hideSidebar:false }">
        <!-- 头部 -->
        <!-- <div class="header">
            <div class="header-nav">
                <div class="logo">
                    <p @click="jumpRouter('Index')">
                        控制台
                    </p>
                </div>
                <ul>
                    <li
                        v-for="(item, index) in mainRouters"
                        :key="index"
                        :class="$route.path.includes(item.name) ? 'active' : ''"
                        @click="item.children[0].children ? jumpRouter(item.children[0].children[0].name) : jumpRouter(item.children[0].name)">
                        <svg-icon :icon-name="item.meta.icon"/>
                        {{ item.meta.shortTitle }}
                    </li>
                </ul>
            </div>
        </div> -->
        <!-- 左侧导航 -->
        <sidebar class="sidebar-container">
            <!-- <div class="toggleSideBar" @click="toggleSideBar">
                <p class="slide-bar" :class="{ 'moveOut': !isCollapse}">
                    <i class="fa" :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
                       aria-hidden="true"></i>
                </p>
            </div> -->
        </sidebar>
        <!-- 主体内容 -->
        <div class="main-container">
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import { mapMutations } from 'vuex';
    import screenfull from 'screenfull';
    import {Navbar, Sidebar, AppMain} from './components/index';
    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        data() {
            return {
                isFullscreen: true,
                // serviceStatusOptions,
                // imShow:false,
            }
        },
        computed: {
            ...mapState('app', ['sidebar']),
            ...mapState('permission', ['routers']),
            // 头部主要模块
            mainRouters() {
                return this.routers.filter(val => {
                    return val.children && val.children.length > 0;
                });
            },
            isCollapse() {
                return !this.sidebar.opened;
            },
            isOnline() {
                return !this.userImStatus.opened;
            },
        },
        methods: {
            ...mapActions('user', ['LogOut']),
            ...mapActions('app', ['ToggleSideBar']),
            ...mapMutations('socket',['SOCKET_ONMESSAGE']),
            jumpRouter(name) {
                this.$router.push({name});
                if(name=='PanelData'){
                    this.imShow=true
                }else {
                    this.imShow=false
                }
            },
            screenfull() {
                screenfull.toggle();
                this.$nextTick(_ => {
                    this.isFullscreen = screenfull.isFullscreen;
                });
            },
            handleCheck(){
                if(this.$route.path!='/Service/Service'){
                    this.imShow=false;
                }
                else {
                    this.imShow=true;
                }
            },
            toggleSideBar() {
                this.ToggleSideBar();
            },
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../styles/variables";
    @import "../../styles/mixin";

    .app-wrapper {
        position: relative;
        max-width: 100vw;
        min-width:1200px;
        height: 100vh;
        .toggleSideBar {
            position: absolute;
            top: calc(50% - 40px);
            bottom: 0;
            z-index: 1001;
            right: -20px;
        }
        @include clearfix;
        .header {
            width: 100%;
            height: 50px;
            background: $menuBg;
            display: flex;
            justify-content: space-between;
            background-size: 100% 100%;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 2000;
            &-nav {
                height: 100%;
                display: flex;
                .logo {
                    min-width: 200px;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    &:hover {
                        cursor: pointer;
                        opacity: .7;
                    }
                    > p {
                        margin: 0;
                        padding-left: 18px;
                    }
                    img {
                        width: 30px;
                        vertical-align: -1px;
                        margin-top: 6px;
                        &:hover {
                            opacity: .8;
                            cursor: pointer;
                        }
                    }
                }
                ul {
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-size: 14px;
                    li {
                        height: 50px;
                        line-height: 50px;
                        padding: 0 20px;
                        cursor: pointer;
                        &:hover {
                            background-color: #001528;
                        }
                    }
                    .active {
                        background-color: #828690;
                    }
                }
            }
        }
        .im {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            text-align: center;
            line-height: 60px;
            position: fixed;
            right: 20px;
            bottom: 160px;
            z-index: 999;
            background: #fff;
            box-shadow: 0 0px 16px 1px rgba(0, 0, 0, 0.3);
            transition: all .3s ease;
            cursor: pointer;
            .el-icon-service {
                font-size: 32px;
                color: $theme;
                vertical-align: middle;
            }
        }
    }

    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: $side-bar-width;
        background-color: #f0f2f5;
        // padding-top: 50px;
    }

    .slide-bar {
        background: $menuBg;
        cursor: pointer;
        width: 20px;
        height: 80px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        font-size: 14px;
    }

    .moveOut {
        &:hover {
            i {
                transform: translateX(-300px);
                transition: 3s all ease-in-out;
            }
        }
    }
@media screen and (min-width: 800px){ // 1024-1152
    .app-wrapper .header .header-nav ul{
        font-size: 12px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 3px;
    }
}
@media screen and (min-width: 1024px){ // 1024-1152
    .app-wrapper .header .header-nav ul{
        font-size: 12px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 7px;
    }
}
@media screen and (min-width: 1152px){
    .app-wrapper .header .header-nav ul{
        font-size: 13px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 10px;
    }
}
@media screen and (min-width: 1280px){
    .app-wrapper .header .header-nav ul{
        font-size: 14px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 14px;
    }
}
@media screen and (min-width: 1360px){
    .app-wrapper .header .header-nav ul{
        font-size: 14px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 15px;
    }
}
@media screen and (min-width: 1440px){
    .app-wrapper .header .header-nav ul{
        font-size: 14px;
    }
    .app-wrapper .header .header-nav ul li{
        padding:0 20px;
    }
}
</style>
