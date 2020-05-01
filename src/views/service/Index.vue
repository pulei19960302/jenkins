<template>
    <div :key="key" class="im-wrap">
        <!--<div @click="clickstate">clickstateclickstateclickstate</div>-->
        <user ref="user"  :receiver_id.sync="receiver_id"  :session_id.sync="session_id" :userObj.sync="userObj" />
        <chat @changeKefu="changeKefu" :chatBody="chatBody" :hotChat="hotChat" @finishChat="finishChat" :receiver_id.sync="receiver_id" :session_id="session_id" :operation="operation" :userObj="userObj"/>
        <order :userObj="userObj"/>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import store from '../../store';
    import User from './components/User';
    import Chat from './components/Chat';
    import Order from './components/order/Index';
    
    export default {
        name: 'Service',
        components: {
            User,
            Chat,
            Order
        },
        data() {
            return {
                chatBody: {},
                hotChat:{},
                receiver_id: null,//50006
                operation:0,
                session_id:'',
                userObj:{},
                serachname:'',
                pageSize:10,
                current:1,
                key:0,
                heartTimer:null
            }
        },
        watch: {
            session_id(val){
                let sendObj={
                    operation:13,
                    time:Date.parse(new Date())/1000,
                    body:{session_id:val}
                }
                let obj = JSON.stringify({...sendObj});
                if(this.$socket) this.$socket.send(obj)//{"operation":3,"time":1551684667,"body":{id:10}}
            },
        },
        created() {
            let timer = setInterval(()=>{
                if(this.$connect){
                    this.init()
                    clearInterval(timer)
                    this.heartTimer = setInterval(()=>{
                        const param = JSON.stringify({operation:9,body:'',time:Date.parse(new Date())/1000,})
                        if(this.$socket) this.$socket.send(param)
                    },30000)
                }
            },500)
        },
        beforeDestroy() {
            this.$disconnect();
            clearInterval(this.heartTimer)
        },
        methods: {
            ...mapMutations('socket',['SOCKET_ONMESSAGE']),
            SOCKET_RECONNECT(state, message){
                console.log('78667676')
            },
            init(){
                this.$connect();
                this.$socket.onopen = () => {
                }
                this.$socket.onmessage = ({ data }) => {
                    const { operation, body } = JSON.parse(data);
                    let arr =[];
                    this.operation = operation;
                    const dataType = {
                        // 会话消息
                        1: () => {
                            let processingUsers = this.$refs.user.historyProcessing.items
                            // this.chatBody = body;
                            this.hotChat = body;

                            // 更新会话时间
                            processingUsers.forEach(it=>{
                                if(it.session_id==body.session_id){
                                    it.last_time = body.time
                                }
                            })
                            if(body.session_id!=this.session_id){ //如果不是当前会话
                                processingUsers.forEach(it=>{
                                    if(it.session_id==body.session_id){
                                        it.unread++
                                    }
                                })
                                const h = this.$createElement;
                                const _this = this
                                this.$notify.info({
                                    title: '您有一条新消息',
                                    message: h('i', { style: 'color: teal'}, `${body.member_name}：${body.message}`),
                                    onClick(){
                                        const userInfo = processingUsers.filter(it=>it.session_id==body.session_id)[0]
                                        if(!userInfo)return
                                        _this.$refs.user.activeName = 'processing'
                                        _this.$refs.user.selectUser(userInfo.id,userInfo.session_id,userInfo)
                                    }
                                });
                            }else{
                                processingUsers.forEach(it=>{
                                    if(it.id==body.member_id){
                                        it.unread = 0
                                    }
                                })
                                this.readed([body.id])
                            }
                            processingUsers = processingUsers.sort((a,b)=>Number(b.last_time)-Number(a.last_time))
                        }, 
                        // 历史消息
                        13: () => { 
                            this.chatBody = body
                            const readedIds = body.data.filter(it=>it.is_read==0 && it.sender_type!=1).map(it=>it.id);
                            if(readedIds.length===0)return
                            this.readed(readedIds)
                        }, 
                        // 反馈 未读变已读
                        16:()=>{
                            try{
                                
                                this.chatBody.data.forEach(it=>{
                                    body.msgIds.forEach(item=>{
                                        if(item==it.id){
                                            it.is_read = 1
                                        }
                                    })
                                    // if(body.msgIds.includes(it.id)){
                                    //     it.is_read = 1
                                    // }
                                })
                            }catch(err){
                                console.log(err)
                            }
                        }, 
                        12:()=>{
                            console.log('接入成功 可更改用户状态 1 在线 2 忙碌 3离开->',body.status)
                            // store.state.app.userImStatus.opened = Number(body.status)
                            store.state.app.userImStatus.opened = Number(body.status)
                            if(store.state.app.userImStatus.waitSend){
                                this.$socket.send(store.state.app.userImStatus.waitSend);
                                store.state.app.userImStatus.waitSend = null
                            }
                        },
                        // 新人接入
                        23:()=>{
                            let processingUsers = this.$refs.user.historyProcessing.items
                            let flag = false;
                            let index
                            processingUsers.forEach((it,i)=>{
                                if(it.session_id==body.session_id){
                                    flag = true
                                    index = i
                                }
                            })
                            if(!flag){
                                processingUsers.unshift(body)
                                this.$refs.user.historyProcessing.count++
                            }else{
                                processingUsers[index].last_time = body.time
                                processingUsers[index].moreInfo = ''
                                processingUsers = processingUsers.sort((a,b)=>Number(b.last_time)-Number(a.last_time))
                            }
                        },
                        // 离开
                        24:()=>{
                            let processingUsers = this.$refs.user.historyProcessing.items
                            processingUsers.forEach(it=>{
                                if(it.session_id==body.session_id){
                                    it.moreInfo = '(已离开)'
                                }
                            })
                            this.$refs.user.historyProcessing.items = JSON.parse(JSON.stringify(processingUsers))
                        },
                        // 断线
                        25:()=>{
                            let processingUsers = this.$refs.user.historyProcessing.items
                            processingUsers.forEach(it=>{
                                if(it.session_id==body.session_id){
                                    it.moreInfo = '(已断线)'
                                }
                            })
                            this.$refs.user.historyProcessing.items = JSON.parse(JSON.stringify(processingUsers))
                        },
                        // 断开
                        5:()=>{
                            this.$disconnect();
                        }
                    }
                    if(dataType[operation]){
                        dataType[operation]();
                    }else{
                        console.log(`code ${operation} 未定义处理方式`)
                    }
                }
            },
            // 置为已读
            readed(readedIds){
                const param = JSON.stringify({operation:16,body:{session_id:this.session_id,msgIds:readedIds},time:Date.parse(new Date())/1000,})
                if(this.$socket) this.$socket.send(param)
            },
            // 完成会话
            finishChat(session_id){
                let processingUsers = this.$refs.user.historyProcessing.items
                this.$refs.user.historyProcessing.count--
                this.$refs.user.historyCompelete.count++
                processingUsers = processingUsers.filter(it=>it.session_id!=session_id)
                this.$refs.user.historyProcessing.items = JSON.parse(JSON.stringify(processingUsers))
            },
            socket(state, message){
                console.log('regergreger')
            },
            clickstate(){
                console.log(this.$store.state.socket.socket)
            },
            // 转接客服
            changeKefu(session_id){
                let processingUsers = this.$refs.user.historyProcessing.items
                this.$refs.user.historyProcessing.count--
                processingUsers = processingUsers.filter(it=>it.session_id!=session_id)
                this.$refs.user.historyProcessing.items = JSON.parse(JSON.stringify(processingUsers))
            },
        }
    }
</script>

<style lang="scss">
    @import "../../styles/variables";
    $color: #EEF6FE;
    @mixin flex {
        display: flex;
        justify-content: space-between;
    }
    .im-wrap {
        @include flex;
        width: 100%;
        height: 100%;
        height:calc(100vh - 206px);
        background: #fff;
    }
</style>
