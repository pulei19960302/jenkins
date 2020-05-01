<template>
    <div class="page">
        <div class="container">
            <iframe id="iframe" width="100%" src="http://jzadb-web.ec-cloudtech.com/#/totalDataComponents"></iframe>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
        mounted() {

        }
    }
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