<template>
    <el-menu class="navbar" mode="horizontal"></el-menu>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('app', ['sidebar'])
        },
        methods: {
            ...mapActions('app', ['ToggleSideBar']),
            ...mapActions('user', ['LogOut']),
            toggleSideBar() {
                this.ToggleSideBar();
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0 !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 10px;
                    font-size: 20px;
                }
            }
        }
    }
</style>

