<template>
    <div class="platformSetting">
        <p class="title">{{ id ? '编辑' : '添加' }}成员</p>
        <el-form label-position="right" style="width: 565px;margin: 0 auto" label-width="150px" :rules="rules" :model="ruleForm" ref="ruleForm">
            <el-form-item label="用户名" prop="username" :rules="[simpleRule]">
                <el-input v-model="ruleForm.username" style="width: 200px" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <!-- <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" style="width: 200px" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="ruleForm.sex" :label="1">男</el-radio>
                <el-radio v-model="ruleForm.sex" :label="2">女</el-radio>
            </el-form-item> -->
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" style="width: 200px" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <FileUpload :isOnly="true" :fileList="avatar" @successUploadCBK="getsuccessUpload" width="80px" height="80px"></FileUpload>
            </el-form-item>
            <!-- <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="ruleForm.email" style="width: 200px" placeholder="请输入邮箱"></el-input>
            </el-form-item> -->
            <el-form-item label="所属部门" prop="group_id">
                <el-cascader
                    style="width: 200px"
                    change-on-select
                    filterable
                    expand-trigger="hover"
                    :options="adminGroup"
                    v-model="ruleForm.group_id">
                </el-cascader>
            </el-form-item>
            <el-form-item label="对应角色" prop="role" :rules="[simpleRule]">
                <el-select
                    v-model="ruleForm.role"
                    placeholder="请选择"
                    prop="role"
                    style="width: 200px"
                    filterable
                    clearable>
                    <el-option
                        v-for="item in roles"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客服类型" prop="service_type" :rules="[simpleRule]">
                <el-select
                    v-model="ruleForm.service_type"
                    placeholder="请选择"
                    prop="role"
                    style="width: 200px"
                    filterable
                    clearable>
                    <el-option
                        v-for="item in [{name:'无',id:0},{name:'咨询',id:1},{name:'售后',id:10}]"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="登录密码" prop="password" :rules="id ? [] : [simpleRule]">
                <el-input v-model="ruleForm.password" style="width: 200px" placeholder="请输入密码" type="password"></el-input>
                <p class="tips" v-if="id">不修改密码可不填写</p>
            </el-form-item>
            <el-button type="primary" class="submit" @click="submit">提 交</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "addMember",
        data() {
            const { id } = this.$route.params;
            return {
                id,
                adminGroup: [],
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                ruleForm: {
                    username: '',
                    name: '',
                    role: '',
                    sex: 1,
                    phone: '',
                    email: '',
                    group_id: [],
                    password: '',
                    service_type:'',
                },
                roles: [],
                rules: {},
                avatar: []
            }
        },
        /**
         * 多页面同时存在编辑与新增时，新增重置，编辑回填
         */
        watch: {
            '$route'({ params }) {
                if(params.id) {
                    this.id = params.id;
                    this.resetForm('ruleForm');
                    this.getAdminMemberDetail(params.id);
                } else {
                    this.id = null;
                    this.avatar = [{ name: '',url: '' }];
                    this.resetForm('ruleForm');
                }
            }
        },
        // created() {
        //     this.gettAdminGroupData();
        //     this.getRoles();
        //     if(this.id) this.getAdminMemberDetail(this.id);
        // },
        methods:{
            /**
             * 递归格式化为合法数据
             * @param arr
             * @returns {*}
             */
            // format(arr) {
            //     const formatArr = arr.map(val => {
            //         if(val.children && val.children.length > 0) {
            //             return {
            //                 value: `${val.id}`,
            //                 label: val.name,
            //                 children: this.format(val.children)
            //             }
            //         }
            //         return {
            //             value: `${val.id}`,
            //             label: val.name
            //         }
            //     })
            //     return formatArr;
            // },
            // // 部门列表数据
            // async gettAdminGroupData() {
            //     try {
            //         const { data } = await this.$api.jurisdiction.tree();
            //         // 回填部门树
            //         this.adminGroup = this.format(data.tree);
            //     } catch (e) {
            //         throw new Error(e);
            //     }
            // },
            // 所有角色数据
            // async getRoles() {
            //     try {
            //         const { data } = await this.$api.jurisdiction.getRoleList();
            //         this.roles = data.items;
            //     } catch (e) {
            //         throw new Error(e);
            //     }
            // },
            // 详情
            // async getAdminMemberDetail(id) {
            //     try {
            //         const { data } = await this.$api.jurisdiction.getAdminMemberDetail({ id });
            //         for(const key in this.ruleForm) {
            //             this.ruleForm[key] = data[key];
            //         }
            //         this.avatar = [{ name:'avatar', url: data.avatar }];
            //         this.ruleForm.group_id = [...data.position.split(',')];
            //     } catch (e) {
            //         throw new Error(e);
            //     }
            // },
            // getsuccessUpload(val){
            //     this.avatar = [{ name:'avatar', url:val[0] }];
            // },
            // submit(){
            //     this.$refs.ruleForm.validate(async (valid) => {
            //         if (valid) {
            //             try {
            //                 const params = Object.assign({}, this.ruleForm);
            //                 params.position = [...params.group_id].join(',') || ',';
            //                 params.group_id = [...params.group_id].splice(-1, 1)[0] || 0;
            //                 if(this.avatar.length > 0) params.avatar = this.avatar[0].url;
            //                 if(this.id) {
            //                     params.id = this.id;
            //                     await this.$api.jurisdiction.EditAdminMember(params);
            //                 } else {
            //                     await this.$api.jurisdiction.AddAdminMember(params);
            //                 }
            //                 this.$router.push({ name: 'memberManagement' });
            //             } catch (e) {
            //                 throw new Error(e);
            //             }
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // }
        }
    }
</script>

<style scoped>
    .platformSetting {
        border: 1px solid #E4E4E4;
        background: #fff;
    }

    .platformSetting .title {
        padding: 10px;
        border-bottom: 1px solid #E4E4E4;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .platformSetting .lastWore {
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        text-align: left
    }

    .submit {
        margin: 20px 0 20px 150px;
    }
</style>
