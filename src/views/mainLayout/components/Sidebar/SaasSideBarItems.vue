<template>
    <div class="zc-sidebar-container">
            <div
                v-for="(item,index) in routes"
                :key="item.name"
                v-if="!item.hidden&&item.children"
            >

                <!-- <div v-if="item.children.length===1" class="zc-sidebar-item" :class="{ active:index===activeIndex || item.name=== activeName}" slot="reference">
                    <router-link style="display:flex;align-items:center" :to="{ name: item.children[0].name }">
                        <svg-icon
                            v-if="item.meta&&item.meta.icon"
                            :icon-name="item.meta.icon"
                        />
                        <span style="margin-left:12px" v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.meta.shortTitle }}</span>
                    </router-link>
                </div> -->
                
                <!-- v-else -->
                <el-popover
                popper-class="popper-menu"
                placement="right"
                v-if="item.children.filter(it=>!it.hidden).length>1"
                transition="none"
                trigger="hover">
                <SaasSubSideBar :activeName.sync="activeName" :route="item"></SaasSubSideBar>
                <div class="zc-sidebar-item" :class="{ active:index===activeIndex || item.name=== activeName}" slot="reference">
                    <svg-icon
                        v-if="item.meta&&item.meta.icon"
                        :icon-name="item.meta.icon"
                    />
                    <span style="margin-left:12px" v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.meta.shortTitle }}</span>
                </div>
                </el-popover>
                <div v-else @click="goRoute(item)" class="zc-sidebar-item" :class="{ active:index===activeIndex || item.name=== activeName}" slot="reference">
                    <svg-icon
                        v-if="item.meta&&item.meta.icon"
                        :icon-name="item.meta.icon"
                    />
                    <span style="margin-left:12px" v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.meta.shortTitle }}</span>
                </div>
            </div>
    </div>
</template>
<script>
import SaasSubSideBar from './SaasSubSideBar'
export default {
    props:{
        routes: {
            type: Array,
            default: () => []
        },
    },
    computed:{
        activeIndex(){
            let activeIndex = 0
            this.routes.forEach((it,index)=>{
                if(!it.hidden && it.children){
                    const names = it.children.map(item=>item.name)
                    const target = this.$route.name
                    if(names.includes(target)){
                        activeIndex = index
                    }
                }
            })
            return activeIndex
        }
    },
    data(){
        return {
            activeName:''
        }
    },
    components:{
        SaasSubSideBar
    },
    methods:{
        goRoute(item){
            const aim = item.children.filter(it=>!it.hidden)
            this.$router.push({
                name:aim[0].name
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../../styles/variables";
.zc-sidebar-container{
    padding-top:10px;
    font-family: 'Hiragino Sans GB', Arial, "Microsoft YaHei", "Source Sans Pro", "Helvetica Neue", Helvetica, sans-serif;
    .zc-sidebar-item{
        display: flex;
        align-items: center;
        justify-content: center;
        height:44px;
        color:#c0c4cc;
        cursor: pointer;
        &:hover,&.active{
            color:$menuHover;
        }
    }
}

</style>
<style lang="scss">
.popper-menu{
    margin-left:0 !important;
    padding: 0;
    min-width: 0;
}
</style>
