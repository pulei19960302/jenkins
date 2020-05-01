<template>
    <div class="user">
        <div style="padding: 0 10px;">
            <el-tabs :stretch="true" v-model="activeName">
                <el-tab-pane :label="'处理中['+historyProcessing.count+']'" name="processing"></el-tab-pane>
                <el-tab-pane :label="'已完成['+historyCompelete.count+']'" name="complete"></el-tab-pane>
            </el-tabs>
            <el-input
                v-show="activeName=='complete'"
                class="mt10"
                placeholder="请输入用戶名"
                prefix-icon="el-icon-search"
                @keyup.enter.native="search"
                v-model="serachname">
            </el-input>
            <div class="chat-filters" style="display:flex;align-items:center;padding-top:10px">
            <el-input
                v-show="activeName=='processing'"
                placeholder="请输入用戶名"
                prefix-icon="el-icon-search"
                @keyup.enter.native="searchHandle"
                v-model="searchHandleName">
            </el-input>
            <el-checkbox style="margin-left:10px" v-show="activeName=='processing'" v-model="isRead">未读消息</el-checkbox>
            </div>
            
        </div>
        <div class="list">
            <ul ref="scrollList" class="items">
                <li v-for="item in showBody" :key="item.session_id" @click="selectUser(item.id,item.session_id,item)" :class="active === item.session_id ? 'active' : ''">
                   <div class="info">
                        <img :src="item.avatar" />
                        <div style="flex: 1">
                            <span>{{ item.username }} <span style="color:red">{{ item.moreInfo }}</span> </span>
                            <div class="time-content">
                                <span style="display: inline-block" class="time" v-show="item.last_time">{{ item.last_time | validDateTime }}</span>
                                <span style="display: inline-block" class="time"  v-show="item.time">{{ item.time | validDateTime }}</span>
                                <span v-show="item.unread" class="badge">{{item.unread>99?'99':item.unread}}</span>
                                <span v-show="item.time" class="getin" style="display: inline-block">接入</span>
                            </div>
                        </div>              
                    </div>
                </li>
            </ul>
           
        </div>
    </div>
</template>

<script>
    import store from '../../../store';
    export default {
        name: 'User',
        props: {
            userBody: [Array],
            userObj:[Object],
        },
        data() {
            return {
                activeName: 'processing',
                active: null,
                mark: '',

                /**
                 * 已完成
                 */
                historyCompeleteCurrent:1,
                historyCompeletePage:1,
                historyCompeletePageTotal:1,
                historyCompelete:{
                    count:0,
                    items:[]
                },
                /**
                 * 处理中
                 */
                historyProcessingCurrent:1,
                historyProcessingPage:1,
                historyProcessingPageTotal:1,
                historyProcessing:{
                    count:0,
                    items:[]
                },

                showBody:[],
                serachname:'',
                pageSize:20,
                showUserBody:[],
                searchHandleName:'',

                isRead:false,//未读消息过滤

            }
        },
        watch: {
            'activeName'(val){
                switch(val){
                    case 'processing':
                    this.showBody = this.historyProcessing.items
                    // this.historyProcessingCurrent = 1
                    // this.historyCompelete.itmes = []
                    // this.getHistory(1,this.historyProcessingCurrent)
                    break;
                    case 'complete':
                    this.showBody = this.historyCompelete.items
                    // this.historyCompeleteCurrent = 1
                    // this.getHistory(2,this.historyCompeleteCurrent)
                    break;
                }
            },
            isRead(v){
               this.resetAll('historyProcessing')
               this.getHistory(1,1);
            },
            'historyProcessing.items':{
                handler(val){
                    if(this.activeName === 'processing'){
                        this.showBody = JSON.parse(JSON.stringify(val))
                    }
                },
                deep:true
            }
        },
        created() {
            this.getHistory(1,1)
            this.getHistory(2,1)
        },
        mounted(){
            this.bindScrollEvent()
        },
        methods: {

            bindScrollEvent(){
                this.$refs.scrollList.onscroll = ()=>{
                    const el = this.$refs.scrollList
                    const distance = this.$refs.scrollList.scrollHeight-el.clientHeight-el.scrollTop
                    if(distance<50){
                        if(this.activeName==='processing' && this.historyProcessingPageTotal>this.historyProcessingCurrent){
                            this.historyProcessingCurrent++
                            this.getHistory(1,this.historyProcessingCurrent)
                        }
                        if(this.activeName==='complete' && this.historyCompeletePageTotal>this.historyCompeleteCurrent){
                            this.historyCompeleteCurrent++
                            this.getHistory(2,this.historyCompeleteCurrent)
                        }
                    }
                }
            },
            search(){
                this.resetAll('historyCompelete')
                this.getHistory(2,1);
            },
            searchHandle(){
                this.resetAll('historyProcessing')
                this.getHistory(1,1);
            },
            resetAll(target){
                this[`${target}`].count = 0
                this[`${target}`].items = []
                this[`${target}Current`] = 1
                this.showBody=[];
            },
            async getHistory(status,page){
                const params = {
                    service_id :store.state.user.userInfo.id,
                    size: this.pageSize,
                    username: status===2?this.serachname:this.searchHandleName,
                    page,
                    status // 1处理中  2已完成
                }
                if(this.activeName === 'processing'){
                    params.unread = +this.isRead
                }
                const {data} = await this.$api.service.sessionHistory(params);
                // const testdata = new Array(30).fill(0).map((it,i)=>{
                //     return {
                //         avatar: "https://img.bingovip.shop/img/img_default_user.png",
                //         id: "68865",
                //         last_time: `${i}`,
                //         session_id: `${i}`,
                //         time: 0,
                //         username: "肖浪",
                //     }
                // })
                // const data = {
                //     count:666,items:testdata
                // }
                if(status===1){
                    this.historyProcessing.count = data.count
                    this.historyProcessingPageTotal = Math.ceil(data.count/this.pageSize)
                    this.historyProcessing.items = this.historyProcessing.items.concat(data.items)
                }
                if(status===2){
                    this.historyCompelete.count = data.count
                    this.historyCompeletePageTotal = Math.ceil(data.count/this.pageSize)
                    this.historyCompelete.items = this.historyCompelete.items.concat(data.items)
                }
                if(this.activeName === 'processing'){
                    this.showBody=this.historyProcessing.items
                }
                if(this.activeName === 'complete'){
                    this.showBody=this.historyCompelete.items
                }
            },
            selectUser(receiver_id,session_id,userObj) {
                this.$emit('update:chatBody', {data:[]});
                userObj.unread = 0
                this.active = session_id;
                this.$emit('update:receiver_id', receiver_id);
                this.$emit('update:session_id', session_id);
                this.$emit('update:userObj', userObj);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../styles/variables";
    $color: #EEF6FE;
    .urgency {
        background: $danger-color;
    }
    .important {
        background: $success-color;
    }
    .priority {
        background: $theme;
    }
    .general {
        background: $info-color;
    }
    @mixin flex {
        display: flex;
        justify-content: space-between;
    }
    .user {
        position: relative;
        width: 20%;
        height: 100%;
        .list {
            width: 100%;
            height: 100%;
            padding-top:10px;
            .filters {
                @include flex;
                padding: 16px 20px;
                p {
                    cursor: pointer;
                }
            }
            .items {
                width: 100%;
                height: calc(100% - 100px);
                overflow-y: scroll;
                overflow-x: hidden;
                .info {
                    position: relative;
                    display: flex;
                    flex: 1;
                    align-items: center;
                    img {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    span {
                        display: block;
                        &:first-child {
                            margin-bottom: 6px;
                            font-weight: 400;
                        }
                        &:last-child {
                            color: #c0c4cc;
                            font-size: 12px;
                        }
                    }
                }
                &::-webkit-scrollbar {
                    width: 6px;
                    &-thumb {
                        width: 32px;
                        height: 32px;
                        background-color: $theme;
                        border-radius: 4px;
                    }
                    &-track {
                        background-color: transparent;
                        border-radius: 4px;
                    }
                }
            }
            li {
                @include flex;
                align-items: center;
                padding: 10px 20px;
                cursor: pointer;
                position: relative;
                &:not(:last-child) {
                    border-bottom: 1px solid #f2fbff;
                }
                &:hover {
                    background: $color;
                }
                .tag {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .badge {
                    position: absolute;
                    top:0;
                    right:0;
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    border-radius: 50%;
                    background: red;
                    font-size: 12px;
                    color: #fff;
                    margin-left: 10px;
                }
                .mark {
                    position: absolute;
                    top: 20px;
                    right: 90px;
                    background-color: #fff;
                    border: 1px solid #ebeef5;
                    border-radius: 4px;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    z-index: 1;
                    p {
                        padding: 10px 15px;
                        &:hover {
                            background: $color;
                        }
                        &:not(:last-child) {
                            border-bottom: 1px solid $border;
                        }
                    }
                }
            }
            .active {
                background: $color;
            }
        }
        .pagation {
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .sort-active {
            color: $theme;
        }
        .time-content  {
            .time{font-size: 12px;
                /*display: inline-block!important;*/
            }
            .getin{
                background: red;
                text-align: center;
                border-radius: 5px;
                color: #fff!important;
                padding: 3px 7px;
            }
        }
    }
</style>
<style lang="scss">
.chat-filters{
    .el-checkbox__label{
        color:#ccc !important;
    }
    .is-checked{
        .el-checkbox__label{
             color:#1890ff !important;
        }
    }
}
</style>

