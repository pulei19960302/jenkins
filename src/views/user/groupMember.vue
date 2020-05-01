<template>
    <div class="groupMember-transfer">
        <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入名字"
            :titles="['用户列表', '群成员列表']"
            :button-texts="['移出', '移入']"
            @change="handleChange"
            @left-check-change="leftCheck"
            @right-check-change="rightCheck"
            v-model="value2"
            :data="data2">
        </el-transfer>
    </div>
</template>

<script>
    export default {
        name: "groupMember",
        data() {
            return {
                data2: [],
                value2: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                groupId:this.$route.params.id,
                leftArr:[],
                rightArr:[],
            };
        },
        created() {
            this.getUser();
            this.getgroupUser();
        },
        methods:{
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
                value = value.join(',');
                console.log(this.rightArr)
                if(direction=='right'){
                    this.addMerber(this.leftArr.join(','));
                    this.leftArr=[];
                }else {
                    this.delMerber(this.rightArr.join(','));
                   this.rightArr=[];
                }
            },
            leftCheck(val){
                this.leftArr=val;
            },
            rightCheck(val){
                this.rightArr=val;
            },
            addMerber(uids){
                this.$api.user.groupmemberPush({id:this.groupId,uids:uids});
            },
            delMerber(uids){
                this.$api.user.groupmemberPop({id:this.groupId,uids:uids});
            },
            async getUser(){
                try {
                    // const { data } = await this.$api.user.getUserManageList();
                    // for (let i=0;i<data.items.length;i++){
                    //     this.data2.push({label:data.items[i].username,key:data.items[i].id,pinyin:data.items[i].username});
                    // }
                    const { data } = await this.$api.user.memberGroup();
                    for (let i=0;i<data.items.length;i++){
                        this.data2.push({label:data.items[i].username,key:data.items[i].uid,pinyin:data.items[i].username});
                    }
                } catch (e) {
                }
            },
            async getgroupUser(){
                try {
                    const { data } = await this.$api.user.groupmemberlist({id:this.groupId});
                    for (let i=0;i<data.items.length;i++){
                        this.value2.push(data.items[i].uid);
                        this.data2.push({label:data.items[i].username,key:data.items[i].uid,pinyin:data.items[i].username});
                    }
                } catch (e) {
                }
            },

        }
    }
</script>

<style>
    .groupMember-transfer{ display: flex;justify-content: center;
        padding: 20px;
        background: #fff}
    .groupMember-transfer .el-transfer-panel{max-height: 1000px}
</style>
