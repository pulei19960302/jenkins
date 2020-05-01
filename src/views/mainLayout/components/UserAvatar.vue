<template>
    <div class="header-info">
        <div class="header-info-user" style=" display: flex;align-items: center;">
            <!-- tips：仅有客服才会显示 -->

<!--            <el-dropdown-->
<!--                @command="handleCommand"-->
<!--                @visible-change="handleCheck"-->
<!--                placement="bottom-start"-->
<!--                class="avatar-container"-->
<!--                trigger="click">-->
                <div style="margin-right: 20px;display:flex;align-items:center">
<!--                     <svg-icon style="margin-right: 5px" :icon-name="serviceStatus.icon"/>-->
<!--                    <span style="min-width: 28px;">{{ serviceStatus.label }}</span>-->
                    <div style="margin-left:5px;">
                        <img
                            :src="userInfo.avatar"
                            class="user-via"
                            v-if="userInfo.avatar">
                        <svg-icon icon-name="icon-test1" class="icon" v-else/>
                    </div>
                </div>
<!--                <el-dropdown-menu-->
<!--                    class="user-dropdown"-->
<!--                    slot="dropdown">-->
<!--                    <el-dropdown-item :disabled="!imShow" :command="item" v-for="item in serviceStatusOptions" :key="item.icon">-->
<!--                        <svg-icon :icon-name="item.icon"/>-->
<!--                        <span>{{ item.label }}</span>-->
<!--                    </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--            </el-dropdown>-->
                <div class="welcome">
                    欢迎您,{{ userInfo.username }}
                </div>
        </div>
        <el-dropdown
            class="avatar-container"
            size="mini"
            trigger="click">
            <div class="avatar-wrapper">
                <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu
                class="user-dropdown"
                slot="dropdown">
                <el-dropdown-item>
                    <span style="
                    display: flex;
                    flex: 1;
                    height: 35px;
                    align-items: center;
                    justify-content: center;" @click="handleClick('changePassword')">账户设置</span>
                </el-dropdown-item>
                <el-dropdown-item>
                    <span
                    style="
                    display: flex;
                    flex: 1;
                    height: 35px;
                    align-items: center;
                    justify-content: center;"
                            @click="LogOut">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import store from '@/store'
import { mapMutations } from 'vuex';
const serviceStatusOptions = [
    { label: '在线', icon: 'On-line',status:1 },
    { label: '忙碌', icon: 'iconlikai14',status:2 },
    { label: '离线', icon: 'tuichu',status:3 }
]
export default {
    data(){
        return {
            serviceStatusOptions,
            imShow:false,
        }
    },
    computed:{
        ...mapState('app', ['userImStatus']),
        ...mapState('user', ['userInfo']),
        serviceStatus(){
            switch (this.userImStatus.opened){
                case 1:
                return { label: '在线', icon: 'On-line' }
                case 2:
                return { label: '忙碌', icon: 'iconlikai14' }
                case 3:
                return { label: '离开', icon: 'iconlikai14' }
                default:
                return { label: '忙碌', icon: 'iconlikai14' }
            }
        }
    },
    methods:{
        ...mapActions('user', ['LogOut']),
        ...mapMutations('socket',['SOCKET_ONMESSAGE']),
        handleCommand(v){
            let sendObj={
                operation:12,
                time:Date.parse(new Date())/1000,
                body:{}
            }
            sendObj.body.status = v.status
            let obj = JSON.stringify({...sendObj});
            try{
                this.$socket.send(obj);
            }catch(err){
                // this.$connect()
                // this.$socket.send(obj);
                store.state.app.userImStatus.waitSend = obj
                this.$refreshTab()
            }
            // if(v.status==3){
            //     this.$disconnect();
            // }
        },
        handleCheck(){
            if(this.$route.path!='/Service/Service'){
                this.imShow=false;
            }
            else {
                this.imShow=true;
            }
        },
        handleClick(type) {
            switch (type) {
                case 'changePassword':
                    this.$router.push({name: 'AccountSet'});
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/variables";
    .header-info {
        // padding-right: 5%;
        // line-height: 50px;
        overflow: hidden;
        padding-right: 30px;
        height:$nav-bar-height;
        color: #000;
        display: flex;
        align-items: center;
        .screenfull {
            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }
        }
        img {
            width: 14px;
            vertical-align: -2px;
        }
        .header-info-user {
            font-size: 14px;
            min-width: 120px;
            .icon {
                font-size: 28px;
                vertical-align: middle;
            }
            .welcome {
                width: 100px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-left: 5px;
                font-size: 12px;
                color: #000;
                margin-right: 4px;
                text-align:right;
            }
            .user-via {
                height: 28px;
                width: 28px;
                border-radius: 100%;
                display: inline-block;
                vertical-align: middle;
                background: #ccc;
            }
            img {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                vertical-align: middle;
                cursor: pointer;
            }
            span{display: flex}
        }
        .email {
            cursor: pointer;
            img {
                width: 18px;
                vertical-align: -4px;
            }
            min-width: 55px;
        }
        .avatar-container {
            // height: 50px;
            display: inline-block;
            right: -15px;
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
                    right: 0px;
                    top: -14px;
                    font-size: 20px;
                    color: #000;
                }
            }
        }
    }
</style>

