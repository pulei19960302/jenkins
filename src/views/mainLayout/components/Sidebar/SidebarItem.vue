<template>
    <div class="menu-wrapper">
        <template
            v-for="item in routes"
            v-if="!item.hidden&&item.children"
        >
            <router-link
                v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
                :to="{ name: item.children[0].name }"
                :key="item.children[0].name"
            >
                <el-menu-item
                    :index="item.children[0].name"
                    :class="{'submenu-title-noDropdown':!isNest}"
                >
                    <svg-icon
                        v-if="item.meta&&item.meta.icon"
                        :icon-name="item.meta.icon"
                    />
                    <span v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.meta.shortTitle }}</span>
                </el-menu-item>
            </router-link>

            <el-submenu
                v-else
                :index="item.name||item.path"
                :key="item.name"
            >
                <template slot="title">
                    <svg-icon
                        v-if="item.meta&&item.meta.icon"
                        :icon-name="item.meta.icon"
                    />
                    <span v-if="item.meta&&item.meta.shortTitle">{{ item.meta.shortTitle }}</span>
                </template>
                <template
                    v-for="(child, index) in item.children"
                    v-if="!child.hidden"
                >
                    <p
                        :key="index"
                        class="father-title"
                        v-if="child.fatherTitle">
                        {{ child.fatherTitle }}
                    </p>
                    <sidebar-item
                        :is-nest="true"
                        class="nest-menu"
                        v-if="child.children&&child.children.length>0"
                        :routes="[child]"
                        :key="child.path"
                    />

                    <router-link
                        v-else
                        :to="{ name: child.name }"
                        :key="child.name"
                    >
                        <el-menu-item :index="item.path+'/'+child.path">
                            <svg-icon
                                v-if="child.meta && child.meta.icon"
                                :icon-name="child.meta.icon"/>
                            <span v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>

    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
            routes: {
                type: Array,
                default: () => []
            },
            isNest: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../../../styles/variables";
    .father-title {
        padding-left: 20px;
        color: #fff;
        height: 40px;
        line-height: 40px;
    }
</style>
