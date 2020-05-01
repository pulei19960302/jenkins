<template>
    <div>
        <p style="padding:30px;text-align:center;font-size:20px">{{data.title}}</p>
        <p style="color:#969696;line-height:1.5">简洁：{{data.breif}}</p>
        <div style="margin-top:20px" v-html="data.content"></div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    }
}
</script>