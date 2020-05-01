<template>
  <div style="background:#fff">
    <div style="width:100%">
      <div class="integrationConfig-container">
        <el-form
          :model="integralForm"
          ref="integralForm"
          label-width="150px"
          label-position="right"
        >

          <p class="title">合伙人权益配置</p>

          <div class="partner-wrap">
            <el-form-item :rules="[simpleRule]" label="合伙人一级称呼：" prop="first_partner">
              <el-input
                v-model="integralForm.first_partner_name"
                autocomplete="off"
                style="width: 150px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="积分：" prop="first_partner">
              <el-input
                v-model="integralForm.first_partner"
                autocomplete="off"
                style="width: 100px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="奖励：" prop="team_angel1">
              <el-input v-model="integralForm.team_angel1" autocomplete="off" style="width: 100px;"></el-input>
            </el-form-item>
          </div>

          <div class="partner-wrap">
            <el-form-item :rules="[simpleRule]" label="合伙人二级称呼：" prop="first_partner">
              <el-input
                v-model="integralForm.second_partner_name"
                autocomplete="off"
                style="width: 150px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="积分：" prop="second_partner">
              <el-input
                v-model="integralForm.second_partner"
                autocomplete="off"
                style="width: 100px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="奖励：" prop="team_senior1">
              <el-input
                v-model="integralForm.team_senior1"
                autocomplete="off"
                style="width: 100px;"
              ></el-input>
            </el-form-item>
          </div>

          <div class="partner-wrap">
            <el-form-item :rules="[simpleRule]" label="合伙人三级称呼：" prop="first_partner">
              <el-input
                v-model="integralForm.third_partner_name"
                autocomplete="off"
                style="width: 150px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="积分：" prop="third_partner">
              <el-input
                v-model="integralForm.third_partner"
                autocomplete="off"
                style="width: 100px;"
              ></el-input>
            </el-form-item>

            <el-form-item :rules="[simpleRule]" label="奖励：" prop="team_strategy1">
              <el-input
                v-model="integralForm.team_strategy1"
                autocomplete="off"
                style="width: 100px;"
              ></el-input>
            </el-form-item>
          </div>

          <p class="title">积分奖励</p>

          <el-form-item :rules="[simpleRule]" label="顾客下单奖励积分：" prop="integral_customer_point">
            <el-input
              v-model="integralForm.integral_customer_point"
              autocomplete="off"
              style="width: 100px;"
            ></el-input>
          </el-form-item>
          <el-form-item :rules="[simpleRule]" label="下单奖励积分：" prop="buyer_point">
            <el-input v-model="integralForm.buyer_point" autocomplete="off" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item :rules="[simpleRule]" label="一级奖励积分：" prop="first_point">
            <el-input v-model="integralForm.first_point" autocomplete="off" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item :rules="[simpleRule]" label="二级奖励积分：" prop="second_point">
            <el-input v-model="integralForm.second_point" autocomplete="off" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item :rules="[simpleRule]" label="积分规则设置：" prop="point_rule">
            <Tinymce ref="editor" :height="300" v-model="integralForm.point_rule"/>
          </el-form-item>

          <!-- <el-form-item :rules="[simpleRule]" label="合伙人三级称呼：" prop="first_partner">
            <el-input
              v-model="integralForm.third_partner_name"
              autocomplete="off"
              style="width: 50%;"
            ></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item :rules="[simpleRule]" label="合伙人一级积分：" prop="first_partner">
                <el-input
                  v-model="integralForm.first_partner"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="70px" :rules="[simpleRule]" label="奖励：" prop="team_angel1">
                <el-input
                  v-model="integralForm.team_angel1"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item :rules="[simpleRule]" label="合伙人二级积分：" prop="second_partner">
                <el-input
                  v-model="integralForm.second_partner"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label-width="70px"
                :rules="[simpleRule]"
                label="奖励："
                prop="team_senior1"
              >
                <el-input
                  v-model="integralForm.team_senior1"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="10">
              <el-form-item :rules="[simpleRule]" label="合伙人三级积分：" prop="third_partner">
                <el-input
                  v-model="integralForm.third_partner"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label-width="70px"
                :rules="[simpleRule]"
                label="奖励："
                prop="team_strategy1"
              >
                <el-input
                  v-model="integralForm.team_strategy1"
                  autocomplete="off"
                  style="width: 100%;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->

          <p class="title">合伙人权益说明</p>
          <el-form-item label="背景图：">
            <FileUpload
              :isOnly="true"
              @successUploadCBK="successUpload($event, 'background_img')"
              :fileList="background_img"
              width="107px"
              height="107px"
            ></FileUpload>
            <!-- <div class="tips"><p>背景图</p>建议尺寸750*375</div> -->
          </el-form-item>
          <!-- <el-form-item :rules="[simpleRule]" label="页面标语："  prop="tagline">
                    <el-input
                        v-model="integralForm.tagline"
                        autocomplete="off"
                        style="width: 100%;">
                    </el-input>
                </el-form-item>
                <el-form-item :rules="[simpleRule]" label="合伙人权益标题："  prop="rule_title">
                    <el-input
                        v-model="integralForm.rule_title"
                        autocomplete="off"
                        style="width: 100%;">
                    </el-input>
          </el-form-item>-->
          <el-form-item :rules="[simpleRule]" label="合伙人权益文案：" prop="rule_content">
            <Tinymce ref="editor" :height="300" v-model="integralForm.rule_content"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button type="primary" @click="submitIntegral">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      simpleRule: { required: true, message: "必填项", trigger: "change" },
      integralForm: {
        buyer_point: 0,
        first_partner: 0,
        first_partner_name: "",
        second_partner_name: "",
        third_partner_name: "",
        first_point: 0,
        second_partner: 0,
        second_point: 0,
        third_partner: 0,
        point_rule: "",
        team_angel1: 0,
        team_senior1: 0,
        team_strategy1: 0,
        rule_content: "",
        integral_customer_point: ""
        // rule_title:'',
        // tagline:''
      },
      background_img: []
    };
  },
  created() {
    this.getIntegral();
  },
  methods: {
    successUpload(val, name) {
      this[name] = [{ url: val[0] }];
    },
    getIntegral() {
      this.$api.setting.getConfigList({ group: "Integral" }).then(res => {
        Object.keys(res.data.keys).forEach(it => {
          this.integralForm[it] = res.data.keys[it];
        });
        this.background_img = [{ url: res.data.keys.background_img }];
      });
    },
    submitIntegral() {
      this.$refs.integralForm.validate(async valid => {
        if (valid) {
          try {
            const params = Object.assign({}, this.integralForm);
            params.background_img = this.background_img[0]
              ? this.background_img[0].url
              : "";
            await this.$api.setting.saveConfig({
              group: "Integral",
              items: params
            });
            this.integralDialogVisible = false;
          } catch (e) {
            throw new Error(e);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integrationConfig-container {
  margin: 0 auto;
  width: 850px;
  padding-top: 30px;
  padding-bottom: 30px;
}
.title {
  border-bottom: 1px solid #e4e4e4;
  padding: 10px;
  margin: 0;
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: left;
}

.partner-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
