<template>
    <div>
        <SaasMultiplePage>
            <UserAvatar class="saas-user-avatar"></UserAvatar>
        </SaasMultiplePage>
        <!-- <Breadcrumb></Breadcrumb> -->
        <section class="app-main">
            <Breadcrumb v-show="!noBreadcrumb"></Breadcrumb>
            <transition
                name="fade"
                mode="out-in"
            >
                <!-- 缓存多页面数据，顶部标签栏存在即缓存，关闭则不再继续缓存（tips：所有编辑/新增共用同一组件情况，仅在新增缓存） -->
                <div :key="key" class="app-main-box">
                <keep-alive  :include="realCachedViews">
                    <router-view />
                </keep-alive>
                </div>
            </transition>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import SaasMultiplePage from '@/OMS/components/layout/SaasMultiplePage';
    import Breadcrumb from './Breadcrumb';
    import UserAvatar from './UserAvatar';


    // 不需要面包屑的页面
    const NoBreadcrumb = ['Index']

    export default {
        name: 'AppMain',
        components: {
            SaasMultiplePage,
            Breadcrumb,
            UserAvatar
        },
        computed: {
            ...mapState('tagsView', ['cachedViews','tabKey']),
            realCachedViews() {
                return this.cachedViews.filter(c => this.needCachedViews.includes(c));
            },
            key(){
                return this.tabKey
            },
            noBreadcrumb(){
                return NoBreadcrumb.includes(this.$route.name)
            }
        },
        created(){
            // 页面如果强刷新 改变 key 触发 keep-alive 的 activated
            setTimeout(()=>{
                this.$refreshTab()
            },0)
        },
        data() {
            return {
                needCachedViews: ['ProductList', 'index', 'afterSaleApplication', 'userList', 'shopkeeperList', 'partnerList', 'groupManagement', 'Insite', 'TaskManage',
                    'EvaluateProduct', 'ConfigProduct', 'BrandManage', 'SupplierManage', 'LabelManage', 'SearchKeywordsManage', 'orderList', 'DeliveryList', 'afterSaleApplication',
                    'refundApplication','businessArticle','couponRecord', 'Service'
                ],
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/variables";
    .app-main {
        /*min-height: 100%;*/
        /*padding: 20px 40px;*/
        width: 100%;
        height: calc(100vh - 58px);
        // padding: 10px 10px 100px 25px;
        padding: 0px 10px 100px $appMainPaddingLeft;
        margin-top:10px;
        background-color: #f0f2f5;
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 6px;
            &-thumb {
                width: 32px;
                height: 32px;
                background-color: $theme;
                border-radius: 4px;
            }
            &-track {
                background-color: transparent;
                border-radius: 4px;
            }
        }
    }
    .saas-user-avatar{
        position: absolute;
        right:0;
    }
</style>
