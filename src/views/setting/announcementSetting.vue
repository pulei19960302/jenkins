<template>
    <div class="activity-set">
        <el-form label-position="right" label-width="120px" :model="form" ref="ruleForm" class="ruleForm">
            <section>
               
                    <p class="title">公告设置</p>
                    <el-form-item :rules="[simpleRule]" label="标题："  prop="title">
                                <el-input
                                    v-model="form.title"
                                    style="width: 100%;">
                                </el-input>
                    </el-form-item>
                    <el-form-item label="公告信息：" prop="content">
                        <!-- <Tinymce ref="editor" :height="300" v-model="form.content"/> -->
                        <el-input
                            v-model="form.content"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="生效时间:">
                        <el-date-picker
                            v-model="form.time"
                            type="datetimerange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="status" label="是否启用">
                            <el-switch v-model="form.status" :active-value="10" :inactive-value="0" ></el-switch>
                    </el-form-item>

            </section>
            
        </el-form>
        <div class="submit">
            <el-button type="primary" size="medium" @click="submit">提 交</el-button>
        </div>
    </div>
</template>

<script>
    // 促销设置
    export default {
        name: "announcementSetting",
        data() {
            return {
                form: {
                    title:'',
                    content:'',
                    time:[],
                    status:0
                },
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
            }
        },
        created() {
            this.getData();
        },
        methods: {
            successUpload(val, name) {
                this[name] = [{ name, url: val[0] }];
            },
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        const  { time } = this.form
                        this.form.start_at = time[0]
                        this.form.end_at = time[1]
                        await this.$api.setting.saveConfig2({
                            group:'notice',
                            key:'notice',
                            key_value:JSON.stringify(this.form),
                            type:8,
                            status:this.form.status
                        })
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'notice' });
                    Object.keys(this.form).forEach(it=>{
                        this.form[it] = data.items.notice.key_value[it]
                    })
                } catch (e) {
                    throw new Error(e);
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .activity-set {
        position: relative;
        border: 1px solid #E4E4E4;
        background: #fff;
        padding-bottom:36px;
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
            width: 80%;
            margin: 0 auto;
            padding-right: 100px;
        }
        .submit {
            // position: fixed;
            // bottom:114px;
            // left:50%;
            // transform: translateX(-50%);
            text-align: center
        }
        .tips {
            margin-top: 4px;
        }
    }
</style>
