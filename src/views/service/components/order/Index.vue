<template>
    <div class="order-service-single">
        <!--<p class="title">订单快捷查询</p>-->
        <!--<el-select-->
            <!--style="width: 100%;"-->
            <!--@change="handleChange"-->
            <!--v-model="keywords"-->
            <!--filterable-->
            <!--clearable-->
            <!--remote-->
            <!--placeholder="请输入订单号 / 售后单号"-->
            <!--:remote-method="querySearchAsync"-->
            <!--:loading="searchLoading">-->
            <!--<el-option-->
                <!--v-for="item in filterData"-->
                <!--:key="item.id"-->
                <!--:label="item.sn"-->
                <!--:value="item.id">-->
            <!--</el-option>-->
        <!--</el-select>-->
        <el-radio-group v-model="activeName">
            <el-radio-button label="customer">客户</el-radio-button>
            <el-radio-button label="more">更多工单</el-radio-button>
        </el-radio-group>
        <customer v-show="activeName === 'customer'" :userObj="userObj" :refresh.sync="refresh"/>
        <more-order v-show="activeName === 'more'" :userObj="userObj" :refresh.sync="refresh"/>
    </div>
</template>

<script>
    import Customer from './Customer';
    import MoreOrder from './MoreOrder';

    export default {
        name: 'Order',
        props: {
            userObj:[Object],
        },
        components: {
            Customer,
            MoreOrder
        },
        data() {
            return {
                activeName: 'customer',
                keywords: '',
                rghtPopupVisible: false,
                searchLoading: false,
                filterData: [],
                refresh:0
            }
        },
        computed: {},
        watch: {},
        created() {
            
        },
        mounted() {
        },
        methods: {
            querySearchAsync(queryString) {
                if(queryString) {
                    // 接口远程搜索
                    this.filterData = [{id: '503', sn: 'S20190222174447576885'}];
                    return;
                }
                this.filterData = [];
            },
            handleChange(id) {
                if(!id) return;
                this.rghtPopupVisible = true;
                this.$refs.detail.getDetailData(id);
            },
            successCallback() {
                this.getData();
                this.rghtPopupVisible = false;
            },
        }
    }
</script>

<style scoped lang="scss">
    .order-service-single {
        width: 25%;
        overflow-y: scroll;
        /*.title {*/
            /*font-size: 18px;*/
            /*font-weight: 500;*/
            /*text-align: center;*/
            /*margin: 20px;*/
        /*}*/
    }
</style>
<style lang="scss">
    .order-service-single {
        .el-radio-group, .el-radio-button__inner {
            width: 100%;
        }
        .el-radio-button {
            width: 50%;
        }
    }
</style>
