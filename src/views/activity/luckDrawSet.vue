<template>
    <div class="luck-draw-set">
            <el-form label-position="right" label-width="120px" :model="form" ref="ruleForm" class="ruleForm">
            <p class="title">基本设置</p>
            <el-form-item label="标题：" :rules="[simpleRule]" prop="title">
                <el-input
                    type="text"
                    style="width: 50%;"
                    v-model="form.title">
                </el-input>
            </el-form-item>
            <el-form-item label="活动时间：" :rules="[simpleRule]" prop="date">
                <el-date-picker
                    size="mini"
                    v-model="form.date"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="是否启用：" prop="status">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item label="主办方介绍：" prop="aftersale_explain">
                <Tinymce ref="editor1" :height="300" v-model="form.remark"/>
            </el-form-item>
            <el-form-item label="活动规则：" prop="aftersale_explain">
                <Tinymce ref="editor2" :height="300" v-model="form.description"/>
            </el-form-item>
            <p class="title">奖品设置</p>
            <div style='text-align:right;margin-bottom:10px'>
                <el-button type="primary" @click="addLuckDraw">添加奖品</el-button>
            </div>
            <el-table border :data="tableData">
                <el-table-column
                        align="center"
                        width="120"
                        label="名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100px"
                        label="图标">
                     <template slot-scope="scope">
                        <FileUpload
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, scope.$index)"
                            :fileList="scope.row.thumb"
                            width="80px"
                            height="80px">
                        </FileUpload>
                    </template>   
                </el-table-column>
                <el-table-column
                        align="center"
                        label="无奖品">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.type" :active-value="0" :inactive-value="1"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="排序">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.sort"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="中奖权重">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.weight"></el-input>
                    </template>
                </el-table-column>
                 <el-table-column
                        align="center"
                        prop="img"
                        label="奖品数量(-1为无限)">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.num"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="200px"
                        label="指定用户">
                    <template slot-scope="scope">
                        <div>
                            <el-select
                                style="width: 100%;"
                                v-model="scope.row.searchUserKey"
                                filterable
                                remote
                                reserve-keyword
                                placeholder="输入用户名搜索"
                                :remote-method="searchUser"
                                @change="(e)=>{userChange(e,scope.$index)}"
                                :loading="loading">
                                <el-option
                                    v-for="item in users"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <div style="margin-top: 10px;">
                                <el-tag
                                    v-for="(user,index) in scope.row.user_list"
                                    :key="user.id"
                                    closable
                                    @close="delUser(index,scope.$index)"
                                    style="margin-right:10px;margin-top:3px" 
                                    >
                                    {{user.name}}
                                </el-tag>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="img"
                        width="180px"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="delPrize(scope.row,scope.$index)">删除</el-button>
                        <!-- <el-button type="primary" plain size="mini" @click="savePrize(scope.row)">保存</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="submit">
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
            </el-form> 
    </div>
</template>
<script>
const BaseItem = {
    name:'',
    thumb:[{url:""}],
    user_ids:[],
    user_list:[],
    num:'',
    weight:'',
    sort:'',
    type:1,
    searchUserKey:'', // 搜索用户
    uuid:+new Date
}
export default {
    name: "luckDrawSet",
     data() {
            return {
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                form: {
                    title:'',
                    date:'',
                    start_time:'',
                    end_time:'',
                    description:'',
                    remark:'',
                    status:'1'
                },
                tableData:[],
                users:[],
                loading:false
            }   
     },
    created() {
        this.getData();
    },
     methods:{
         submit(){
             this.$refs.ruleForm.validate(async (valid) => {
                 if (valid) {
                     const items = JSON.parse(JSON.stringify(this.tableData))
                     if(items.length<6){
                         return this.$message.error('至少设置六个奖品');
                     }
                     items.forEach(it=>{
                        it.user_ids = it.user_list.map(it=>it.id).join(',');
                        it.thumb = it.thumb[0].url;
                        //  delete it.uuid;
                        //  delete it.user_list;
                        //  delete it.searchUserKey
                     })
                     const params = Object.assign(this.form,{
                         start_time:this.form.date[0],
                         end_time:this.form.date[1],
                         items
                     })
                     this.$api.activity.saveLuckDraw(params).then(res=>{
                         this.getData()
                     })
                 }
             })
         },
         makeItem(){
             BaseItem.uuid = +new Date;
             return JSON.parse(JSON.stringify(BaseItem))
         },
         addLuckDraw(){
             this.tableData.push(this.makeItem())
         },
         delPrize(row,index){
             if(row.id){
                this.$api.activity.delPrize({id:row.id}).then(res=>{
                    this.tableData.splice(index,1)
                })
             }else{
                 this.tableData.splice(index,1)
             }
         },
         savePrize(row){
             if(row.id){
                this.$api.activity.editPrize(row)
             }
             this.$api.activity.savePrize(row)
         },
        successUpload(val, index) {
            this.tableData[index].thumb = [{url:val[0]}]
        },
        delUser(i,index){
            this.tableData[index].user_list.splice(i,1)
        },
        userChange(e,index){
            const findUser = this.users.filter(it=>it.value===e)[0]
            if(!this.tableData[index].user_list.map(it=>it.id).includes(findUser.value)){
                this.tableData[index].user_list.push({
                    id:findUser.value,
                    name:findUser.label
                })
            }
        },
        async getData(){
            const { data } = await this.$api.activity.getLuckDraw();
                Object.keys(this.form).forEach(it=>{
                    this.form[it] = data[it]
                })
                this.form.date = [data.start_time,data.end_time]
                data.items.forEach((it,index)=>{
                    it.thumb = [{url:it.thumb}];
                    it.searchUserKey = '';
                    it.uuid = `${+new Date}${index}`
                })
                this.tableData = data.items;
         },
        async searchUser(query) {
                if (query !== '') {
                    this.loading = true;
                    const { data } = await this.$api.finance.balanceRecordUser({name:query});
                    this.list = data.map(item => {
                        return { value: item.id, label: item.name };
                    });
                    setTimeout(() => {
                        this.loading = false;
                        this.users = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.users = [];
                }
        },
     }       
}
</script>
<style scoped lang="scss">
    .luck-draw-set {
        border: 1px solid #E4E4E4;
        background: #fff;
        .file-upload {
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
            position: relative;
            .el-icon-circle-close-outline{
                position: absolute;
                right: 10px;
                top: 0;
            }
        }
        .title {
            border-bottom: 1px solid #E4E4E4;
            padding: 10px;
            margin: 0;
            font-size: 15px;
            margin-bottom: 20px;
            font-weight: 600;
            text-align: left
        }
        .ruleForm {
            width: 90%;
            margin: 0 auto;
            padding-right: 100px;
        }
        .submit {
            margin: 20px 0;
            text-align: center
        }
        .tips {
            margin-top: 4px;
        }
    }
</style>
