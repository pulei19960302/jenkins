<template>
    <div class="not-found">
        <svg-icon icon-name="404" class="icon"/>
        <div class="mt20">
            <h3>页面未找到 / 你无权访问该页面，<span>{{ second }}</span>s后返回上一页</h3>
            <p class="mt20">若未正常跳转， <el-button type="text" size="mini" @click="jumpTo('Index')">点击此处</el-button>返回系统首页</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                second: 5
            }
        },
        mounted() {
            const inter = setInterval(() => {
                this.second--;
                if(this.second === 0) {
                    clearInterval(inter);
                    this.$router.go(-1);
                }
            }, 1000);
        },
        methods: {
            jumpTo(name) {
                this.$router.push({ name });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .not-found {
        width: 100vw;
        height: 100vh;
        text-align: center;
        margin-top: 100px;
        .icon {
            font-size: 120px;
            color: red;
        }
        span {
            color: #2D8CF0;
            font-size: 16px;
        }
    }
</style>
