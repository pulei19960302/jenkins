<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            // document.oncontextmenu = new Function("return false");
        }
    };
</script>
<style lang="scss">
    #app {
        width: 100%;
        height: 100vh;
        font-size: 14px;
        .look-word{
            font-size: 14px;
            cursor: pointer;
            margin-right: 10px;
        }
        .table-pandect{
            background-color: #e6f4fe;
            border: 1px solid #9cd4fd;
            border-radius: 4px;
            padding: 10px;
            margin: 5px 0;
            span{
                color: red;
            }
            b{
                color: red;
            }
        }
        .table-pandect-hidden{
            display: none;
        }

        .top-slot{
            background: #fff;
            padding: 10px;
            span{
                color: red;
            }
            b{
                color: red;
            }
        }
    }
</style>
