<template>
    <div>
        <el-dialog top="4vh" title="发送站内信" :visible.sync="dialogVisible" width="40%">
            <el-form :model="form" ref="form" label-width="100px" label-position="right">
                <el-form-item label="消息类型：" :rules="[simpleRule]" prop="type">
                    <el-select v-model="form.type" filterable clearable disabled>
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="接收者：" v-if="form.type !== 4" :rules="[simpleRule]" prop="to_id">
<!--                    <el-select-->
<!--                        v-model="form.to_id"-->
<!--                        collapse-tags-->
<!--                        multiple-->
<!--                        filterable-->
<!--                        remote-->
<!--                        reserve-keyword-->
<!--                        placeholder="关键词搜索"-->
<!--                        :remote-method="querySearchAsync"-->
<!--                        :loading="searchLoading"-->
<!--                    >-->
<!--                        <el-option-->
<!--                            v-for="item in filterData"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value"-->
<!--                        />-->
<!--                    </el-select>-->
<!--                    <p class="tips">请选择消息类型后，此处搜索关键字查询对应用户</p>-->
                    {{ columnSelectName }}
                </el-form-item>
                <el-form-item label="消息分类：" :rules="[simpleRule]" prop="category">
                    <el-select v-model="form.category" filterable clearable>
                        <el-option
                            v-for="item in categories"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <div v-if="form.category === 3">
                    <el-form-item label="活动链接：" :rules="[simpleRule]" prop="url">
                        <el-input v-model="form.url" style="width: 214px"/>
                    </el-form-item>
                    <el-form-item label="活动图片：" :rules="[simpleRule]">
                        <FileUpload :isOnly="true" @successUploadCBK="getSuccessUpload"/>
                    </el-form-item>
                    <el-form-item label="结束时间：" :rules="[simpleRule]" prop="end_time">
                        <el-date-picker
                            value-format="timestamp"
                            size="mini"
                            v-model="form.end_time"
                            type="datetime"
                        />
                    </el-form-item>
                </div>
                <el-form-item label="消息标题：" :rules="[simpleRule]" prop="title">
                    <el-input v-model="form.title" autocomplete="off" style="width: 70%;"/>
                </el-form-item>
                <el-form-item label="消息内容：" :rules="[simpleRule]" prop="content">
                    <!--<Tinymce ref="editor" :height="300" v-model="form.content"/>-->
                    <el-input type="textarea" v-model="form.content" autocomplete="off" style="width: 70%;"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMessage">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { common } from "@/OMS/mixins";
    export default {
        name: "sendMessageDialog",
        mixins: [common],
        props: {
            columnSelect: {
                type: Array,
                default: () => []
            },
            columnSelectName: {
                type: String,
                default: ''
            },
            sendCouponUserId: {
                type: String,
                default: ''
            },
            initData: {
                type: Function,
                default: () => {}
            },
            visable: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            return {
                form: {
                    type: 1,
                    to_id: '',
                },
                searchLoading: false,
                filterData: [],
                dialogVisible: false,
                rules: {},
                categories: [
                    { value: 1, label: "系统消息" },
                    { value: 2, label: "服务消息" },
                    { value: 3, label: "活动消息" },
                    { value: 4, label: "售后消息" },
                    { value: 5, label: "群聊消息" }
                ],
                types: [
                    { value: 1, label: "对用户" },
                    { value: 2, label: "对群" },
                    { value: 3, label: "对团队" },
                    { value: 4, label: "对全站用户" },
                    { value: 5, label: "对全部普通用户" },
                    { value: 6, label: "对全部店主" },
                    { value: 7, label: "对全部团队长" },
                    { value: 8, label: "对全部合伙人" }
                ],
            }
        },
        methods: {
            getSuccessUpload(val) {
                this.imgs = val;
            },

            submitMessage () {
                this.form.to_id = this.columnSelect;
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            // 站内所有用户to_id为0
                            if (this.form.type === 4) params.to_id = 0;
                            // 活动消息
                            if (this.form.category === 3) params.img = this.imgs;
                            params.end_time = params.end_time / 1000;
                            await this.$api.operate.messageAdd(params);
                            this.dialogVisible = false;
                            this.initData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            querySearchAsync(queryString) {
                if (queryString) {
                    if (this.form.type === 1) this.getUserData(queryString);
                    if (this.form.type === 2) this.getGroupData(queryString);
                    if (this.form.type === 3) this.getPartnerData(queryString);
                } else {
                    this.filterData = [];
                }
            },
            // 关键字-用户查询
            async getUserData(keywords) {
                try {
                    const { data } = await this.$api.user.getUserManageList({ keywords });
                    this.filterData = data.items.map(val => {
                        return {
                            value: val.id,
                            label: val.username
                        };
                    });
                } catch (e) {}
            },
            // 关键字-群查询
            async getGroupData(name) {
                try {
                    const { data } = await this.$api.user.groupList({ name });
                    this.filterData = data.items.map(val => {
                        return {
                            value: val.id,
                            label: val.name
                        };
                    });
                } catch (e) {}
            },
            // 关键字-团队查询
            async getPartnerData(title) {
                try {
                    const { data } = await this.$api.user.partnerlist({ title });
                    this.filterData = data.items.map(val => {
                        return {
                            value: val.id,
                            label: val.title
                        };
                    });
                } catch (e) {}
            },
        },
        watch: {
            visable(v) {
                this.dialogVisible = v;
            },
            dialogVisible (v) {
                this.$emit('update:visable', v)
            },
        }
    }
</script>

<style scoped>

</style>
