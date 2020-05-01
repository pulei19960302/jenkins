<template>
    <div class="new-order-detail" v-loading="loading">
        <el-tabs v-model="activeName"
             @tab-click="handelClick()"
             style="margin-bottom: 18px"
             :class="{'step-scroll': isScroll }"
        >
            <el-tab-pane v-for="item in steps" :key="item.value" :name="item.value">
                <span slot="label">
                    {{item.label}}
                </span>
            </el-tab-pane>
        </el-tabs>
        <!-- 订单状态 -->
        <order-status @operation="operationDialog" :status_info="status_info"/>

        <!-- 订单基本信息 -->
        <order-base :base_info="base_info"/>

        <!-- 订单商品信息 -->
        <order-goods :goods_info="goods_info"/>

        <!-- 财务信息 -->
        <order-f-m-s :finance_info="finance_info" :title="steps[this.steps.length - 2].label"/>

        <!-- 售后记录 -->
        <order-sale :info="sale_records"/>

        <!-- 模态框操作 -->
        <!-- 修改物流和添加物流 -->
        <modify-logistics-dialog :status.sync="modifyStatus" :id="id" :init-data="getInitData" :is-edit-or-add="isEditOrAdd"/>

        <!-- 备注 -->
        <remark-order-dialog :id="id" :init-data="getInitData" :visable.sync="remarkStatus"/>

        <!-- 修改地址和添加 -->
        <edit-order-address-dialog :visable.sync="editStatus" :id="id" :init-data="getInitData"/>

        <!-- 关闭订单 -->
        <close-order-dialog :money="money" :visable.sync="closeStatus" :id="id" :init-data="getInitData"/>
    </div>
</template>

<script>
    import { INSTANCE } from './constant'

    import OrderStatus from "./components/orderStatus";
    import OrderBase from "./components/orderBase";
    import OrderGoods from "./components/orderGoods";
    import OrderFMS from "./components/orderfms";
    import OrderSale from "./components/orderSale";
    import ModifyLogisticsDialog from "./components/modifyLogisticsDialog";
    import RemarkOrderDialog from "./components/remarkOrderDialog";
    import EditOrderAddressDialog from "./components/editOrderAddressDialog";
    import CloseOrderDialog from "./components/closeOrderDialog";

    let container = null;

    export default {
        name: "newOrderDetail",
        components: {
            CloseOrderDialog,
            EditOrderAddressDialog,
            RemarkOrderDialog, ModifyLogisticsDialog, OrderFMS, OrderGoods, OrderBase, OrderStatus, OrderSale},
        data() {
            return {
                loading: false,

                steps: [
                    {value: 'order-status', label: '订单状态'},
                    {value: 'order-base', label: '基本信息'},
                    {value: 'order-goods', label: '商品信息'},
                    {value: 'order-sale', label: '售后记录'},
                    {value: 'order-fms', label: '财务信息(待结算)'},
                    {value: 'order-after', label: '售后记录' }
                ],
                activeName: 'order-status',
                isScroll: false,

                // 新增还是编辑
                isEditOrAdd: false, // false 编辑 true 新增

                // 模态框操作
                modifyStatus: false, // 修改物流
                remarkStatus: false, // 备注
                editStatus: false, // 修改地址
                closeStatus: false, // 关闭订单
                money: 0, // 关闭订单需要数据

                // 订单id
                id: this.$route.params.id,

                status_info: {}, // 订单状态
                base_info: {}, //基本信息
                goods_info: {}, // 商品信息
                finance_info: [], // 财务信息
                sale_records: [], // 售后记录

            }
        },
        mounted() {
            container = document.querySelector(".app-main");
            container.addEventListener("scroll", this.handleScroll);
            this.getInitData();
        },
        destroyed() {
            container.removeEventListener("scroll", this.handleScroll);
            container.scrollTop = 0;
            container = null;
        },
        methods: {

            operationDialog ({key, value, type }) {
                switch (key) {
                    case INSTANCE.MODIFY:
                        this.isEditOrAdd = type;
                        this.modifyStatus = value;
                        break;
                    case INSTANCE.REMARK:
                        this.remarkStatus = value;
                        break;
                    case INSTANCE.EDIT:
                        this.editStatus = value;
                        break;
                    case INSTANCE.CLOSE:
                        this.closeStatus = value;
                        this.money = this.goods_info.actual_fee;
                        break;
                }
            },

            handelClick() {
                const currH = document.querySelector(`.${this.activeName}`);
                this.$nextTick(() => {
                    container.scrollTo(0, parseInt(currH.offsetTop) - 40);
                });
            },

            handleScroll() {
                this.$nextTick(() => {
                    this.steps.forEach(curr => {
                        const currH = document.querySelector(`.${curr.value}`);
                        if (!currH) return;
                        this.isScroll = container.scrollTop > 100;
                    });
                });
            },

            // 获取订单数据
            async getInitData () {
                if (!this.id) return;
                this.loading = true;
                try {
                    const { data } = await this.$api.order.getOrderService({ id: this.id });
                    this.base_info = data && data.base_info ? data.base_info : {};
                    this.base_info.user_id = this.$route.params.user_id;
                    this.status_info = data && data.status_info ? data.status_info : {};
                    this.goods_info = data && data.goods_info ? data.goods_info : {};
                    this.sale_info = data && data.sale_records ? data.sale_records : [];
                    this.finance_info = data && data.finance_info ? data.finance_info : {};
                    this.sale_records = data && data.sale_records ? data.sale_records : [];

                    if (this.status_info && this.status_info.status_name === '已完成') {
                        this.steps.forEach(r => {
                            if (r.value === 'order-fms') {
                                r.label = '财务信息(已结算)'
                            }
                        });
                    }

                } catch (e) {
                    console.log(e);
                } finally {
                    this.loading = false;
                }
            }
        },
        watch: {
            '$route' (to, from) {
                console.log(to, from);
                if (to.name === 'newOrderDetail') {
                    console.log(to.query);   // 在此调用函数
                    this.id=this.$route.params.id;
                    this.getInitData();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .new-order-detail {
        .el-tabs {
            background-color: #fff;
        }

        /deep/ .el-tabs.el-tabs--top {
            /deep/ .el-tabs__nav.is-top {
                height: 50px !important;
            }

            /deep/ .el-tabs__item {
                padding: 5px 25px !important;
            }
        }
        .step-scroll {
            width: calc(100% - 152px);
            flex-direction: column;
            position: fixed;
            z-index: 4;
            top:63px;
            background: #fff;
            border-bottom: 1px solid #e1e1e1;
            transition: all 0.3s ease;
            li {
                &:not(:last-child) {
                    border-bottom: 1px solid #e1e1e1;
                }
            }
        }
    }
</style>
