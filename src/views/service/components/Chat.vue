
<!-- tips：由统一html（注释代码）变更为1：文本 2：图片 3：视频 4：其他文件 -->

<template>
    <div class="chat">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="'当前会话:'+username" name="current">
                <div class="session" ref="session">
                    <div class="session-more" v-show="lookMore && receiver_id" @click="getMore">查看更多</div>
                    <div v-for="(item, index) in msgs" :key="index" class="session-item" style="position:relative" :id="'id'+item.id" :ref="item.id">
                        <div v-if="item.sender_type!==3" :class="item.sender_type === 2 ? 'left' : 'right'">
                            <div class="user-info">
                                <span>{{item.sender_name}}</span>
                                <span>{{item.time | validDateTime('showToday') }}</span>
                            </div>
                            <!-- <div v-html="item.message" v-if="item.type == 1" :class="['content', item.sender_type == 2 ? 'white':'green']"></div> -->
                            <el-input v-if="item.type == 1" :class="['content', item.sender_type == 2 ? 'white':'green']" type="textarea" disabled autosize :value="item.message" />
                            <img style="max-width: 200px;" :src="item.message" v-if="item.type == 2" @click="handleClickMsg(item.message)" />
                            <video style="max-width: 300px;" :src="item.message" controls="controls" v-if="item.type == 3"></video>
                            <span v-if="item.sender_type === 1" style="position:absolute;right:0;bottom:0px">
                                <span style="color:#00CD66" v-if="item.is_read==0">未读</span>
                                <span style="color:#ccc" v-else>已读</span>
                            </span>
                        </div>
                        <div v-if="item.sender_type===3" class="system-msg-box">
                            <div class="system-msg">系统消息:{{item.message}}</div>
                        </div>
                        <div style="height:20px;float:right;width:100%"></div>
                    </div>
                    <div class="session-over" v-show="sessionOver">会话已结束</div>
                </div>
                <div class="operate">
                    <emoji
                        :showEmoji.sync="showEmoji"
                        v-show="showEmoji"
                        @select="selectEmoji">
                    </emoji>
                    <div class="icon-bar">
                        <svg-icon icon-name="biaoqing" @click.native="showEmoji = !showEmoji"  v-clickoutside="clickoutside" />
                        <el-tooltip class="item" effect="light" content="图片 / 视频" placement="bottom-start">
                            <FileUpload isSvg icon-name="fasongwenjian" class="file-button mr10 ml10" width="30px" height="30px" @successUploadCBK="uploadCBK"></FileUpload>
                        </el-tooltip>
                        <el-popover
                            popper-class="fast-replies fuck"
                            placement="top"
                            width="650"
                            max-height="250"
                            v-model="popverVisible"
                            trigger="click">
                                <el-input v-model="fastRepliesKeywords" placeholder="输入关键字快速检索"></el-input>
                                <ul style="font-size:16px">
                                    <li v-for="(item, idx) in fastRepliesFilter" :key="idx" @click="handleFastReply(item)">{{ item }}</li>
                                </ul>
                            <svg-icon icon-name="kuaijiehuifu1" slot="reference" />
                        </el-popover>
                        <i class="el-icon-time ml10 mr10" @click.stop="showHistorySession"></i>

                        <el-tooltip class="item" effect="light" content="转接客服" placement="bottom-start">
                            <el-popover
                                popper-class="fast-replies fuck"
                                placement="top"
                                width="200"
                                max-height="250"
                                v-model="anotherkefuVisible"
                                trigger="click">
                                <el-input v-model="kefuKeywords" placeholder="输入用户名搜索"></el-input>
                                    <ul style="font-size:16px">
                                        <li v-for="(item, idx) in allKefuFilter" :key="idx" @click="changeKefu(item)">{{ item.username }}</li>
                                    </ul>
                                        <svg-icon v-show="session_id" icon-name="huifu" slot="reference" />
                            </el-popover>
                        </el-tooltip>
                    </div>
                </div>
                <div class="type-writing">
                    <!--<div contenteditable="true" v-html="message" class="textarea" @keydown.enter="sendMsg" ref="textarea" @click="handleClickMsg"></div>-->
                    <el-input :maxlength="1000" v-model="message" type="textarea" @keyup.down.native="sendMsg" @keyup.enter.native="sendMsg" placeholder="请输入，字数限制为1000字" ref="textarea"></el-input>
                </div>
                <div class="send-bar">
                    <div></div>
                    <el-button :type="receiver_id?`primary`:'info'" size="mini" @click="sendMsg">发 送</el-button>
                </div>
            </el-tab-pane>
            <!--<el-tab-pane label="历史会话" name="history" disabled>历史会话</el-tab-pane>-->
        </el-tabs>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <el-button type="text" class="close-session" :class="{'open-color':receiver_id}" @click="closeSession">关闭对话</el-button>
        <el-dialog class="im-history-dialog" title="历史记录" :visible.sync="historyVisible">
            <div>
                <el-row style="margin-bottom:10px">
                    <el-col :span="16">
                <el-date-picker
                    v-model="history_filter_time"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
                </el-col>
                <el-col :span="4">
                <el-button
                    size="mini"
                    icon="el-icon-search"
                    type="primary"
                    @click="onHistorySearch">
                    查询
                </el-button>
                </el-col>
                </el-row>
            </div>
            <div class="session-history">
                <div class="no-msg" v-if="historyList.length===0">暂无聊天记录</div>
                <div v-for="(item, index) in historyList" :key="index" class="session-item">
                    <div v-if="item.sender_type!==3" :class="item.sender_type === 2 ? 'left' : 'right'">
                        <div class="user-info">
                            <span>{{item.sender_name}}</span>
                            <span>{{item.time | validDateTime('showToday') }}</span>
                        </div>
                        <!-- <div v-html="item.message" v-if="item.type == 1" :class="['content', item.sender_type == 2 ? 'white':'green']"></div> -->
                        <el-input v-if="item.type == 1" :class="['content', item.sender_type == 2 ? 'white':'green']" type="textarea" disabled autosize :value="item.message" />
                        <img style="max-width: 200px;" :src="item.message" v-if="item.type == 2" @click="handleClickMsg(item.message)" />
                        <video style="max-width: 300px;" :src="item.message" controls="controls" v-if="item.type == 3"></video>
                    </div>
                     <div v-if="item.sender_type===3" class="system-msg-box">
                            <div class="system-msg">系统消息:{{item.message}}</div>
                    </div>
                </div>
            </div>
            <el-pagination
                class="pagation"
                small
                :total="count"
                :page-size="pageSize"
                :current-page="page"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                layout="total, prev, pager, next">
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
    import clickoutside from '@/OMS/directive/clickoutside';
    import Emoji from '../components/Emoji.vue';
    import store from '../../../store';
    // const fastReplies = ['你好，请问有什么可以帮您', '再见，祝你生活愉快'];
    export default {
        name: 'Chat',
        props: {
            receiver_id: [String, Number], // 接收用户id
            operation: [Number], // 接收用户id
            chatBody: [Array,Object],             // 消息内容
            session_id:[Number,String],
            userObj:[Object],
            hotChat:Object,
        },
        components: { Emoji },
        directives: { clickoutside },
        data() {
            return {
                count: 0,
                current: 1,
                anotherkefuVisible:false,
                historyVisible: false,
                sessionOver: false,
                visible: false,
                lookMore: true,
                previewImg: '',
                activeName: 'current',
                message: '',
                msgs: [],
                emNode: null,
                showEmoji: false,
                username:'',
                last_id:'',
                fastReplies:[],
                fastRepliesFilter:[],
                fastRepliesKeywords:'',
                firstSession_id:'',
                history_filter_time:null,
                popverVisible:false,
                historyList:[],
                pageSize:50,
                page:1,
                allKefu:[],
                allKefuFilter:[],
                kefuKeywords:''
            }
        },
        watch: {
            fastRepliesKeywords(v){
                this.fastRepliesFilter = this.fastReplies.filter(it=>it.includes(v))
            },
            kefuKeywords(v){
                this.allKefuFilter = this.allKefu.filter(it=>it.username.includes(v))
            },
            message(v){
                const res = this.fastReplies.filter(it=>it.includes(v))
                if(res.length!==0 && res.length!==this.fastReplies.length){
                    if(res.length===1 && res[0]===v)return
                    this.popverVisible = true
                    this.fastRepliesFilter = res
                }else{
                    this.popverVisible = false
                    this.fastRepliesFilter = this.fastReplies
                }
            },
            hotChat(val){
                if(this.operation==1){
                    if(this.session_id==val.session_id){
                        this.msgs.push(val);
                       setTimeout(()=>{this.$refs.session.scrollTo(0, 99999);},100)
                    }
                }
            },
            chatBody(val) {
                this.last_id=val.last_id;
                this.sessionOver=false;
                // if(this.operation==1){
                //     if(this.session_id==val.session_id){
                //         this.msgs.push(val);
                //        setTimeout(()=>{this.$refs.session.scrollTo(0, 99999);},100)
                //     }
                // }else {
                    if(this.firstSession_id==this.session_id){
                        this.msgs= val.data.reverse().concat(this.msgs);
                        let num = val.data.length;
                        this.$refs.session.scrollTo(0, num*100-200);
                        if(val.data.length==0){
                            this.$message({
                                message: '没有更多消息了',
                                type: 'warning'
                            });
                        }
                    }else {
                        this.msgs= val.data.reverse();
                        this.firstSession_id = this.session_id;
                        setTimeout(()=>{this.$refs.session.scrollTo(0, 99999);},100)
                    }
                // }
            },
            receiver_id(val) {
                // console.log('receiver_id现在是'+val)
                //this.sessionOver = false;
            },
            userObj(val){
                this.username= val.username
            },
            msgs(val){
                //console.log(val);
            }
        },
        created(){
            this.getPhrase();
            this.getKeFus()
            this.firstSession_id = this.session_id;
        },
        methods: {
            changeKefu(v){
                const params = {
                    session_id:this.session_id,
                    service_id:v.id
                }
                // 拒绝转接给本人
                if(v.id==store.state.user.userInfo.id){
                    this.$message.error('转接失败');
                    return 
                }
                this.$api.service.changeKefu(params).then(()=>{
                    this.$emit('changeKefu',this.session_id)
                    this.anotherkefuVisible = false
                })

            },
            async getKeFus(){
                const {data} = await this.$api.service.getKefus();
                this.allKefu = data.items
                this.allKefuFilter = data.items
            },
            async getPhrase(){
                const {data} = await this.$api.service.phraselist();
                this.fastReplies=data;
                this.fastRepliesFilter = data
            },
            onHistorySearch(){
                this.page = 1
                this.getIMHistory()
            },
             // 获取聊天记录
            getIMHistory(){
                this.$api.service.phraseHistory({
                    session_id:this.session_id,
                    page:this.page,
                    size:this.pageSize,
                    start_time:this.history_filter_time && this.history_filter_time[0],
                    end_time:this.history_filter_time && this.history_filter_time[1],
                }).then(res=>{
                    this.historyList = res.data.items
                    this.count = Number(res.data.count)
                })
            },
            getMore(){
                let sendObj={
                    operation:13,
                    time:Date.parse(new Date())/1000,
                    body:{
                        session_id:this.session_id,
                        last_id:this.last_id,
                        size:50
                    }
                }
                let obj = JSON.stringify({...sendObj});
                this.$socket.send(obj)//{"operation":3,"time":1551684667,"body":{id:10}}

            },
//            // 点击对话框内图片预览
//            handleClickMsg({ toElement }) {
//                // 找到对应的IMG及src
//                const { nodeName, currentSrc } = toElement;
//                if(nodeName === 'IMG' && currentSrc) {
//                    this.visible = true;
//                    this.previewImg = currentSrc;
//                }
//            },
            // 点击对话框内图片预览
            handleClickMsg(img) {
                this.visible = true;
                this.previewImg = img;
            },
            // 快捷回复
            handleFastReply(val) {
                this.popverVisible = false;
                this.message = val
                // this.commonSendMessage(1, val);
            },
            // 点击emoji层tab不关闭，点击外部关闭
            clickoutside({ toElement }) {
                const pannels = ['表情', '自然', '物品'];
                for (const [idx, curr] of pannels.entries()) {
                    if (toElement.innerHTML.includes(curr)) {
                        if(this.showEmoji) this.showEmoji = true;
                        return;
                    }
                }
                if(this.showEmoji) this.showEmoji = false;
            },
            // 勾选emoji
            selectEmoji (code) {
                this.showEmoji = false;
                this.message += code;
            },
            /**
             * 文件上传后的显示【img、video】
             * @param val  七牛返回的地址
             * @param type 文件类型
             */
            uploadCBK(val, fileType) {
//                let file = '';
                let type;
                const videoTypes = ['video/ogg', 'video/mp4', 'video/webm'];              // 支持的视频格式
                const imgTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];   // 支持的图片格式
                if(videoTypes.includes(fileType)) {
//                    file = `<video style="width: 300px;" src="${val[0]}" controls="controls"></video>`;
                    type = 3;
                } else if (imgTypes.includes(fileType)) {
//                    file = `<img style="width: 200px;" src="${val[0]}" />`;
                    type = 2;
                } else {
                    this.$message({ message: '不支持的文件格式！', type: 'warning' });
                    type = 4;
                }
                this.commonSendMessage(type, val[0]);
            },
            // 发送消息
            sendMsg(e) {
                console.log(e)
                if(e.key==='ArrowDown'){
                    this.message = this.message+'\n'
                    return 
                }
//                const message = this.$refs.textarea.innerHTML.trim();
//                // 禁止发送空文本
//                if(!message || message == '<div><br></div><div><br></div>') {
//                    this.$refs.textarea.innerHTML = '';
//                    this.message = '';
//                    return;
//                }
//                // 禁止文本超过1000字
//                if(message.length >= 1000) {
//                    this.$message({ message: '文本不能超过1000字！', type: 'warning' });
//                    return;
//                }
                if(!this.message) return;
                if(!this.receiver_id)return
                const msg = this.message.replace(/(.?)(\n)$/,'$1')
                if(msg==='')return
                this.commonSendMessage(1, msg)
            },
            /**
             * 发送文件
             * @param type  // 1：文本 2：图片 3：视频 4：其他文件
             * @param message
             * @returns {Promise.<void>}
             */
            async commonSendMessage(type, message) {
                if(!this.session_id)return
                try {
                    const resData = await this.$api.common.sendMessage({
                        session_id: this.session_id,
                        message,
                        type
                    });
                    this.msgs.push(
                        {
                            sender_name: store.state.user.userInfo.username, // 客服账号登录昵称
                            time: +new Date(),
                            type,
                            message,
                            sender_type: 1,
                            is_read:0,
                            id:resData.data.id
                        }
                    )
                    // 发送成功后，清空内容并滚动条到最底部
                    this.$nextTick(_ => {
                        this.message = '';
                        this.$refs.session.scrollTo(0, 99999);
                    })
                } catch (e) {
                    throw new Error(e);
                }
            },
            closeSession() {
                if(this.receiver_id!==0 && !this.receiver_id)return
                this.$confirm('当前会话是否已完成？', '提示', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                    type: 'warning'
                }).then(_ => {
                    this.closeChat(1)
                }).catch(()=>{
                    this.closeChat(0)
                })
            },
            closeChat(isFinish){
                if(isFinish===1){
                    this.$emit('finishChat',this.session_id)
                }
                try {
                    let sendObj={
                        operation:7,
                        time:Date.parse(new Date())/1000,
                        body:{session_id:this.session_id,is_finish:isFinish}
                    }
                    let obj = JSON.stringify({...sendObj});
                    this.$socket.send(obj)//{"operation":3,"time":1551684667,"body":{id:10}}
                    setTimeout(()=>{ this.sessionOver = true;},500)
                }catch (e) {
                    console.log(e)
                }
                this.$emit('update:receiver_id', null);
            },
            showHistorySession() {
                if(this.session_id){
                    this.historyVisible = true;
                    this.getIMHistory()
                }
            },
            handlePageChange(page) {
                this.page = page
                this.getIMHistory()
            },
            handleSizeChange(size) {
            },
        }
    }
</script>

<style lang="scss">
    @import "../../../styles/variables";
    $color: #EEF6FE;
    .green {
        background: #aee56e;
    }
    .white {
        background: #fff;
    }
    .chat {
        width: 55%;
        height: 100%;
        position: relative;
        .green{
          .el-textarea__inner{
            background: #aee56e;
            color: #000;
            border: none;
            resize: none;
            cursor:inherit;
          }
        }
        .white{
          .el-textarea__inner{
            background: #fff;
            color: #000;
            border: none;
            resize: none;
            cursor:inherit;
          }
        }

        .close-session {
            position: absolute;
            top: 6px;
            right: 20px;
            color: #909399;
            .wrap {
                display: flex;
                align-items: center;
                button {
                    margin-left: 20px;
                    color: $danger-color;
                }
            }
            .avatar {
                font-size: 28px;
                cursor: pointer;
            }
        }
        .open-color{
            color: $danger-color;
        }
        .el-tabs--border-card {
            height: 100%;
            & > .el-tabs__content {
                height: 100%;
                padding: 0;
                .el-tab-pane {
                    height: 100%;
                }
            }
        }
        .session {
            width: 100%;
            height: calc(100% - 266px);
            overflow-y: auto;
            overflow-x: hidden;
            background-color: $color;
            padding: 10px;
            &-over {
                width: 200px;
                height: 28px;
                line-height: 28px;
                margin: 0 auto;
                font-size: 12px;
                text-align: center;
                background: #ccc;
                border-radius: 4px;
            }
            &-more{
                width: 100px;
                height: 28px;
                line-height: 28px;
                margin: 0 auto;
                font-size: 12px;
                text-align: center;
                background: #ccc;
                border-radius: 4px;
                color: #1890ff;
                cursor: pointer;
            }
            &-item {
                overflow: hidden;
                margin: 20px 0;
            }
            .user-info {
                height: 30px;
                width: 100%;
                color: #999;
                display: flex;
                font-size: 13px;
                justify-content: start;
                align-items: center;
                margin-bottom: 2px;
                img {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    margin-right: 4px;
                }
                span {
                    margin-right: 10px;
                    &:last-child {
                        font-size: 12px;
                    }
                }
            }
            .content {
                display: inline-block;
                // padding: 6px 16px;
                border-radius: 4px;
            }
            .right {
                max-width: 60%;
                float: right;
                .user-info {
                    justify-content: flex-end;
                }
                .content {
                    float: right;
                }
            }
            .left {
                max-width: 60%;
                float: left;
            }
        }
        .session-history {
            width: 100%;
            height: 400px;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: $color;
            padding: 10px;
            &-over {
                width: 200px;
                height: 28px;
                line-height: 28px;
                margin: 0 auto;
                font-size: 12px;
                text-align: center;
                background: #ccc;
                border-radius: 4px;
            }
            &-more{
                width: 100px;
                height: 28px;
                line-height: 28px;
                margin: 0 auto;
                font-size: 12px;
                text-align: center;
                background: #ccc;
                border-radius: 4px;
                color: #1890ff;
                cursor: pointer;
            }
            &-item {
                overflow: hidden;
                margin: 20px 0;
            }
            .user-info {
                height: 30px;
                width: 100%;
                color: #999;
                display: flex;
                font-size: 13px;
                justify-content: start;
                align-items: center;
                margin-bottom: 2px;
                img {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    margin-right: 4px;
                }
                span {
                    margin-right: 10px;
                    &:last-child {
                        font-size: 12px;
                    }
                }
            }
            .no-msg{
                position: absolute;
                left:50%;
                top:50%;
                transform: translate(-50%,-50%);
                text-align: center;
                color:#ccc;
            }
            .content {
                display: inline-block;
                // padding: 6px 16px;
                border-radius: 4px;
            }
            .right {
                max-width: 60%;
                float: right;
                .user-info {
                    justify-content: flex-end;
                }
                .content {
                    float: right;
                }
            }
            .left {
                max-width: 60%;
                float: left;
            }
        }
        .operate {
            padding: 10px 15px;
            font-size: 20px;
            position: relative;
            .icon-bar {
                display: flex;
                align-items: center;
                color: #999;
                .el-icon-time {
                    cursor: pointer;
                }
            }
            svg {
                margin-right: 6px;
                cursor: pointer;
                &:hover {
                    color: $theme;
                }
            }
            #emoji {
                position: absolute;
                top: 40px;
                background: #ccc;
                padding: 10px;
                img {
                    width: 25px;
                    cursor: pointer;
                }
            }
            .file-button {
                /deep/ .el-upload {
                    border: none;
                }
            }
        }
        .type-writing {
            width: 100%;
            height: 140px;
            textarea {
                padding: 10px;
                padding-top: 0;
                width: 100%;
                height: 140px !important;
                border: none;
                resize: none;
                overflow-y: auto;
            }
        }
        .send-bar {
            width: 100%;
            height: 40px;
            background: $color;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }
    }
    .fast-replies {
        li {
            padding: 4px 0;
            cursor: pointer;
            &:hover {
                color: $theme;
            }
        }
    }
    .system-msg-box{
        .system-msg{
            text-align: center;
            padding: 10px;
            color: #919191;
            font-size: 14px;
        }
    }
    .fuck{
        max-height: 250px;
        overflow-y: scroll;
    }
</style>
