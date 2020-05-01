<template>
    <div>
        <el-dialog
            title="加扣款"
            :visible.sync="showDialog"
            width="30%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-form-item v-if="showUserFilter" label="用户名：" prop="uid">
                <el-select
                    clearable
                    style="width: 70%;"
                    v-model="form.uid"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入用户ID搜索"
                    :remote-method="remoteMethod"
                    :loading="loading">
                    <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="收支类型："  prop="type">
                    <el-select v-model="form.type" style="width: 70%;" clearable>
                        <el-option
                            v-for="item in options5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="加扣渠道："  prop="to">
                    <el-select v-model="form.to" style="width: 70%;" clearable>
                        <el-option
                            v-for="item in money_way_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资金："  prop="money">
                    <el-input
                        v-model="form.money"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注："  prop="remark">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        :rows="2"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <AutoInputFix />
                <el-form-item label="密码："  prop="password">
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="updatemoney()">
                    确定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
export default {
    props:{
        money_way_options:[Array],
        visable:[Boolean],
        showUserFilter:{
            type:Boolean,
            default:true
        },
        uid:{}
    },
    data(){
        return {
            form: {
                uid: '',
                type: '',
                money: '',
                remark: '',
                password:'',
                to:''
            },
            showDialog:false,
            options4:[],
            options5:[],
            loading:false,
            rules: {
                    uid: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    money: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    remark: [
                        { required: true, message: '请填写', trigger: 'change' },
                    ],
                    password: [
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
                    sort: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    to:[
                        { required: true, message: '请选择', trigger: 'change' },
                    ],
            },
        }
    },
    computed: {
        ...mapState('user', ['button_permissions'])
    },
    watch:{
        visable(v){
            this.showDialog = v
        },
        showDialog(v){
            this.$emit('update:visable',v)
        },
        uid(v){
            this.form.uid = v
        }
    },
    created(){
        this.balanceRecordType()
    },
    methods:{
        async remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                const { data } = await this.$api.finance.balanceRecordUser({name:query});
                this.list = data.map(item => {
                    return { value: item.id, label: item.name };
                });
                setTimeout(() => {
                    this.loading = false;
                    this.options4 = this.list.filter(item => {
                        return String(item.value).indexOf(query) > -1;
                    });
                }, 200);
            } else {
                this.options4 = [];
            }
        },
        async balanceRecordType(){
            const { data } = await this.$api.finance.balanceRecordType();
            this.options5=data;
        },
        async updatemoney(){
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        const params = Object.assign({}, this.form);
                        if(params.to==1){
                            await this.$api.finance.updatemoney(params);
                        }
                        if(params.to==2){
                            await this.$api.finance.updatemoney2(params);
                        }
                        this.showDialog= false;
                        this.$refs['form'].resetFields();
                    } catch (e) {
                        throw new Error(e);
                    }
                }
            });
        },
    }
}
</script>
