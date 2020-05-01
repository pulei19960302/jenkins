<template>
    <div @mouseenter="activeMenu" @mouseleave="unactiveMenu" class="sub-side-bar-container">
        <div class="fathers" v-for="item in bars" :key="item.title">
            <div class="title">{{item.title}}</div>
            <ul>
                <li @click="jump(it.name)" class="items" :class="{active:it.name===$route.name}" v-for="it in item.children" :key="it.name">
                    {{it.meta.title}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        route:{
            type:Object
        },
        activeName:{
            type:String
        }
    },
    computed:{
        bars(){
            const arr = [
                {
                    title:this.route.meta.title,
                    children:[]
                }
            ];
            this.route.children.forEach(it=>{
                if(it.hidden)return
                if(it.fatherTitle){
                    arr.push({
                        title:it.fatherTitle,
                        children:[it]
                    })
                }else{
                    arr[arr.length-1].children.push(it)
                }
            })
            return arr
        }
    },
    methods:{
        jump(name){
            this.$router.push({
                name
            })
        },
        activeMenu(){
            this.$emit('update:activeName',this.route.name)
        },
        unactiveMenu(){
            this.$emit('update:activeName','')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../../styles/variables";
.sub-side-bar-container{
    // display: flex;
    box-shadow:2px 2px 10px rgba(0, 0, 0, 0.1);
    .fathers{
        // padding-right:10px;
        .title{
            color:#A2A2A2;
            font-size: 12px;
            line-height: 40px;
            padding-left: 10px;
        }
        .items{
            width: 120px;
            overflow: hidden;
            font-size:14px;
            line-height: 40px;
            cursor: pointer;
            padding: 0 10px;
            color:#000;
            &:hover,&.active{
                border-right:2px solid #1790FF;
                color:$menuHover;
                background-color:#EDF7FF;
            }
        }
    }
}
</style>

