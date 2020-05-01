<template>
    <div class="page">
        <div class="container">
            <iframe id="iframe" width="100%" src="http://jzadb-web.ec-cloudtech.com/#/storeAchievementComponents?customer_code=WZG&customer_id=WZG_100&customer_secret=4e76787934a033689628268a86453bdd&today=2020-01-10"></iframe>
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