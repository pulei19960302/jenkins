<template>
  <div class="page">
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户概况" name="first" class="iframe-tabs">
          <iframe
            id="iframe"
            width="100%"
            src="http://jzadb-web.ec-cloudtech.com/#/userGeneralComponents"
          ></iframe>
        </el-tab-pane>
        <el-tab-pane label="用户排行" name="second">
          <iframe
            id="iframe"
            width="100%"
            src="http://jzadb-web.ec-cloudtech.com/#/userAnalyzeComponents"
          ></iframe>
        </el-tab-pane>
        <el-tab-pane label="客群分析" name="third">
          <iframe
            id="iframe"
            width="100%"
            src="http://jzadb-web.ec-cloudtech.com/#/userRankComponents"
          ></iframe>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
.page {
  position: relative;
  .container {
    position: absolute;
    width: 100%;
    #iframe {
      height: calc(100vh - 100px);
      border: none;
    }
  }
}
</style>

<style lang='scss'>
.iframe-tabs {
  .el-tabs__header{
    background: #fff;
  }
  .el-tabs__nav-scroll {
    padding-left: 16px;
  }
}
</style>