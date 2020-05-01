<template>
  <div class="page">
    <div class="container">
      <el-tabs v-model="activeName" class="iframe-tabs">
        <el-tab-pane label="返利统计" name="first">
          <iframe
            id="iframe"
            width="100%"
            src="http://jzadb-web.ec-cloudtech.com/#/rebateStatistics"
          ></iframe>
        </el-tab-pane>
        <el-tab-pane label="返利排行" name="second">
          <iframe id="iframe" width="100%" src="http://jzadb-web.ec-cloudtech.com/#/rebateRank"></iframe>
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
      height: calc(100vh - 140px);
      border: none;
    }
  }
}
</style>

<style lang='scss'>
.iframe-tabs{
  .el-tabs__header{
    background: #fff;
  }
  .el-tabs__nav-scroll{
    padding-left: 16px;
  }
}
</style>
