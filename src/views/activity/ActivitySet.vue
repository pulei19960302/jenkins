<template>
    <div class="activity-set">
        <el-form label-position="right" label-width="120px" :model="form" :rules="rules" ref="ruleForm" class="ruleForm">
            <section v-if="setType=='set'">
                <p class="title">精选活动设置</p>
                <el-form-item  label="是否开启："  prop="show_act">
                    <el-switch v-model="form.show_act" active-value="1" inactive-value="2"></el-switch>
                </el-form-item>
                <el-form-item label="活动主图：">
                    <div class="file-upload">
                        <FileUpload
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'act_pic1')"
                            :fileList="act_pic1"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" style="right: 0" @click.stop="removeMinorImgs('act_pic1')"></i>
                        <div class="tips tx"><p>左侧主图</p>建议尺寸346*362</div>
                    </div>
                    <div class="file-upload">
                        <FileUpload
                            class="file-upload"
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'act_pic2')"
                            :fileList="act_pic2"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" @click.stop="removeMinorImgs('act_pic2')"></i>
                        <div class="tips tx"><p>右上侧主图</p>建议尺寸346*176</div>
                    </div>
                    <div class="file-upload">
                        <FileUpload
                            class="file-upload"
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'act_pic3')"
                            :fileList="act_pic3"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" @click.stop="removeMinorImgs('act_pic3')"></i>
                        <div class="tips tx"><p>右下侧主图</p>建议尺寸346*176</div>
                    </div>
                    <div class="file-upload">
                        <FileUpload
                            class="file-upload"
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'act_pic4')"
                            :fileList="act_pic4"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" @click.stop="removeMinorImgs('act_pic4')"></i>
                        <div class="tips tx"><p>&nbsp;</p>建议尺寸346*176</div>
                    </div>
                    <div class="file-upload">
                        <FileUpload
                            class="file-upload"
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'act_pic5')"
                            :fileList="act_pic5"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" @click.stop="removeMinorImgs('act_pic5')"></i>
                        <div class="tips tx"><p>&nbsp;</p>建议尺寸346*176</div>
                    </div>
                    <div class="tips tx" style="text-align: left;margin-top: 10px">注：如果只传前两张图，小程序界面将只展示并排的两个活动图,此时请上传一样大小的两张图。</div>
                </el-form-item>
                    <p class="title">礼包页面设置</p>
                    <el-form-item label="礼包页面主图：">
                    <div class="file-upload">
                        <FileUpload
                            class="file-upload"
                            :isOnly="true"
                            @successUploadCBK="successUpload($event, 'gift_banner')"
                            :fileList="gift_banner"
                            width="107px"
                            height="107px">
                        </FileUpload>
                        <i class="el-icon-circle-close-outline" v-if="gift_banner.length>0" @click.stop="removeMinorImgs('gift_banner')"></i>
                    </div>
                     </el-form-item>
                     <el-row>
                         <el-col :span="8">
                             <el-form-item :rules="[simpleRule]" label="白银返利："  prop="gift_store_fee">
                                <el-input
                                    type="number"
                                    v-model="form.gift_store_fee"
                                    style="width: 100%;">
                                </el-input>
                            </el-form-item>
                         </el-col>
                         <el-col :span="8">
                        <el-form-item :rules="[simpleRule]" label="上级返利："  prop="gift_first_fee">
                        <el-input
                            type="number"
                            v-model="form.gift_first_fee"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                         </el-col>
                <el-col :span="8">
                    <el-form-item :rules="[simpleRule]" label="上上级返利："  prop="gift_second_fee">
                        <el-input
                            type="number"
                            v-model="form.gift_second_fee"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                        </el-col>
                     </el-row>
                    
                    <el-row>

                        <el-col :span="8">
                    <el-form-item :rules="[simpleRule]" label="黄金返："  prop="gift_team_angel1_fee">
                        <el-input
                            type="number"
                            v-model="form.gift_team_angel1_fee"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                        </el-col>

                        <el-col :span="8">
                                            <el-form-item :rules="[simpleRule]" label="资深合伙人返："  prop="gift_team_senior1_fee">
                        <el-input
                            type="number"
                            v-model="form.gift_team_senior1_fee"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                        </el-col>
                        <el-col :span="8">
                    <el-form-item :rules="[simpleRule]" label="战略合伙人返："  prop="gift_team_strategy1_fee">
                        <el-input
                            type="number"
                            v-model="form.gift_team_strategy1_fee"
                            style="width: 100%;">
                        </el-input>
                    </el-form-item>
                        </el-col>
                    </el-row>
                    <p class="title">分享图设置</p>
                    <el-form-item label="分享主图：">
                        <multiImgUpload :limit="6" :imgs.sync="share_imgs"></multiImgUpload>
                        <div class="tips tx"><p>&nbsp;</p>建议尺寸456*700</div>
                    </el-form-item>
                    <p class="title">招募设置</p>
            <el-form-item label="招募图片：">
                <div class="file-upload">
                    <FileUpload
                        class="file-upload"
                        :isOnly="true"
                        @successUploadCBK="successUpload($event, 'recruit_img')"
                        :fileList="recruit_img"
                        width="107px"
                        height="107px">
                    </FileUpload>
                    <i class="el-icon-circle-close-outline" v-if="recruit_img.length>0" @click.stop="removeMinorImgs('recruit_img')"></i>
                </div>
            </el-form-item>
            <el-form-item prop="status" label="招募开关">
                <el-switch v-model="form.recruit_open" active-value="1" inactive-value="0" ></el-switch>
            </el-form-item>
            <p class="title">收益文案设置</p>

            <el-form-item label="服务收益说明：" prop="commission_service_explain">
                <el-input
                    type="textarea"
                    v-model="form.commission_service_explain">
                </el-input>
            </el-form-item>

            <el-form-item label="推广收益说明：" prop="share_service_explain">
                <el-input
                    type="textarea"
                    v-model="form.share_service_explain">
                </el-input>
            </el-form-item>

            <el-form-item label="累计收益说明：" prop="total_service_explain">
                <el-input
                    type="textarea"
                    v-model="form.total_service_explain">
                </el-input>
            </el-form-item>

            <el-form-item label="售后说明：" prop="aftersale_explain">
                <Tinymce ref="editor" :height="300" v-model="form.aftersale_explain"/>
            </el-form-item>
            </section>
            <section v-if="setType!='set'">
                <p class="title">砍价设置</p>
                <el-form-item label="砍价主图：">
                    <FileUpload
                        :isOnly="true"
                        @successUploadCBK="successUpload($event, 'bargainBanner')"
                        :fileList="bargainBanner"
                        width="107px"
                        height="107px">
                    </FileUpload>
                    <div class="tips"><p>砍价主图</p>建议尺寸750*375</div>
                </el-form-item>
                <el-form-item label="砍价规则：" prop="order_seckill_overtime_close">
                    <Tinymce ref="editor" :height="300" v-model="form.bargain_rule"/>
                </el-form-item>
            </section>
            
        </el-form>
        <div class="submit">
            <el-button type="primary" size="medium" @click="submit">提 交</el-button>
        </div>
    </div>
</template>

<script>
import multiImgUpload from '@/OMS/components/multiImgUpload/multiImgUpload'
    // 促销设置
    export default {
        name: "ActivitySet",
        components:{
            multiImgUpload
        },
        data() {
            return {
                form: {
                    show_act:'2', //是否开启精选活动
                    bargain_rule: '',
                    gift_store_fee:'',
                    gift_first_fee:'',
                    gift_second_fee:'',
                    gift_team_angel1_fee:'',
                    gift_team_senior1_fee:'',
                    gift_team_strategy1_fee:'',
                    aftersale_explain:'', // 售后说明
                    commission_service_explain:'',// 服务收益说明
                    share_service_explain:'',//推广收益说明
                    total_service_explain:''// 累计收益说明
                },
                rules: {},
                bargainBanner: [],
                act_pic1: [],
                act_pic2: [],
                act_pic3: [],
                act_pic4: [],
                act_pic5: [],
                setType:'set',
                gift_banner:[],
                recruit_img:[],
                share_imgs:[],
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
            }
        },
        watch: {
            '$route'(val){
                const { params } = val;
                this.setType = params.type||'set';
                this.getData();
            }
        },
        created() {
            this.getData();
            this.setType =this.$route.params.type||'set';
        },
        methods: {
            successUpload(val, name) {
                this[name] = [{ name, url: val[0] }];
            },
            submit() {
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        try {
                            const params = Object.assign({}, this.form);
                            params.bargain_banner = this.bargainBanner[0].url;
                            params.act_pic1 = this.act_pic1[0].url;
                            params.act_pic2 = this.act_pic2[0].url;
                            params.act_pic3 = this.act_pic3[0].url;
                            params.act_pic4 = this.act_pic4[0].url;
                            params.act_pic5 = this.act_pic5[0].url;
                            params.gift_banner = this.gift_banner[0]?this.gift_banner[0].url:'';
                            params.recruit_img = this.recruit_img[0]?this.recruit_img[0].url:'';
                            params.share_imgs = this.share_imgs.map(it=>it.url)
                            await this.$api.setting.saveConfig({ group: 'activity', 'items': params });
                        } catch (e) {
                            throw new Error(e);
                        }
                    }
                });
            },
            async getData() {
                try {
                    const { data } = await this.$api.setting.getConfigList({ group: 'activity' });
                    Object.keys(this.form).forEach(it=>{
                        this.form[it] = data.keys[it]
                    })
                    this.bargainBanner = [{ name: 'bargainBanner', url: data.keys.bargain_banner }];
                    this.act_pic1 = [{ name: 'act_pic1', url: data.keys.act_pic1 }];
                    this.act_pic2 = [{ name: 'act_pic2', url: data.keys.act_pic2 }];
                    this.act_pic3 = [{ name: 'act_pic3', url: data.keys.act_pic3 }];
                    this.act_pic4 = [{ name: 'act_pic4', url: data.keys.act_pic4 }];
                    this.act_pic5 = [{ name: 'act_pic5', url: data.keys.act_pic5 }];
                    this.gift_banner = [{ url: data.keys.gift_banner }];
                    this.recruit_img = [{url:data.keys.recruit_img}]
                    this.share_imgs = data.keys.share_imgs || []
                } catch (e) {
                    throw new Error(e);
                }
            },
            removeMinorImgs(index) {
                this[index]=[{ name: index, url: '' }];
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
