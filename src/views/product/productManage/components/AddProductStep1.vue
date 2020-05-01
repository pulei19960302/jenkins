<template>
    <div class="moreRules-content">
        <el-form ref="form">
            <div class="card">
                <div class="left">
                    <div class="left-gary">
                        <svg-icon icon-name="icon_favorite"/>
                        <p>选择分类</p>
                    </div>
                </div>
                <div class="right">
                    <div class="classify-wrap">
                        <ul class="classify">
                            <li>选择一级分类</li>
                            <li
                                v-for="(item, index) in categories"
                                :key="index"
                                :class="firstActive.value == item.value ? 'active' : ''"
                                @click="firstClick(item)">
                                <span>{{ item.label }}</span>
                                <svg-icon icon-name="previewright" :style="{ color: firstActive.value === item.value ? '#fff' : '#333'}"/>
                            </li>
                        </ul>
                        <svg-icon icon-name="arrowright" class="arrowright" />
                        <ul class="classify">
                            <li>选择二级分类</li>
                            <li
                                v-for="(item, index) in firstActive.children"
                                :key="index"
                                :class="secondActive.value == item.value ? 'active' : ''"
                                @click="secondClick(item)">
                                <span>{{ item.label }}</span>
                                <svg-icon icon-name="previewright" :style="{ color: secondActive.value === item.value ? '#fff' : '#333'}"/>
                            </li>
                        </ul>
                        <svg-icon icon-name="arrowright" class="arrowright" />
                        <ul class="classify">
                            <li>选择三级分类</li>
                            <li
                                v-for="(item, index) in secondActive.children"
                                :key="index"
                                :class="thirdActive.value == item.value ? 'active' : ''"
                                @click="thirdClick(item)">
                                <span>{{ item.label }}</span>
                                <svg-icon icon-name="previewright" :style="{ color: thirdActive.value === item.value ? '#fff' : '#333'}"/>
                            </li>
                        </ul>
                    </div>
                    <p class="nav">
                        您当前选择的商品分类是：<b>{{ firstActive.label }}</b> > <b>{{ secondActive.label | validVal }}</b> > <b>{{ thirdActive.label | validVal }}</b>
                    </p>
                    <el-button type="success" @click="goNext">下一步，填写商品信息</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        name: "AddProductStep1",
        props: {
            editData: {
                type: Object
            },
            id: {
                type: [String, Number]
            }
        },
        data() {
            return {
                firstActive: {
                    value: ''
                },
                secondActive: {
                    value: ''
                },
                thirdActive: {},
                categories: [],
                type: '',
                goods_id: null
            }
        },
        created() {
            this.getCategory();
        },
        methods: {
            ...mapMutations('product', ['SET_STATE']),
            firstClick(item) {
                this.firstActive = item;
                this.secondActive = {};
            },
            secondClick(item) {
                this.secondActive = item;this.thirdActive = {}
            },
            thirdClick(item) {
                this.thirdActive = item
            },
            async getCategory() {
                try {
                    const { data } = await this.$api.product.getCategory();
                    this.SET_STATE({ goods_id: data.goods_id });
                    this.goods_id = data.goods_id;
                    this.categories = data.category;
                    return Promise.resolve(true);
                } catch (e) {
                    return Promise.reject(false);
                    throw new Error(e);
                }
            },
            goNext() {
                if(!this.firstActive.value) {
                    this.$message({ message: '请选择商品分类', type: 'error' });
                    return;
                }
                const step1Data = {
                    goods_id: this.goods_id // tips: 此goods_id用于添加对应商品属性
                };
                step1Data.cat1 = { id: this.firstActive.value, label: this.firstActive.label };
                step1Data.cat2 = { id: this.secondActive.value, label: this.secondActive.label };
                step1Data.cat3 = { id: this.thirdActive.value, label: this.thirdActive.label };
                this.$emit('step1CBK', step1Data);
                this.$emit('update:active', 1);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../styles/variables";

    $currBorder: rgba(228, 228, 228, 1);
    .moreRules-content {
        border: 1px solid #E4E4E4
    }
    .moreRules-content .left {
        border-right: 1px solid #E4E4E4;
        width: 180px;
        padding-top: 50px
    }
    .moreRules-content .icon {
        color: #fff;
        font-size: 20px;
    }
    .left-gary {
        background-color: #9EA7B4;
        color: #fff;
        width: 180px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        align-items: center;
        position: relative;
    }
    .card {
        display: flex;
    }
    .left-gary p {
        margin-left: 5px
    }
    .left-gary:after {
        content: '';
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 20px solid #9EA7B4;
        border-bottom: 25px solid transparent;
        position: absolute;
        right: -20px;
    }
    .right {
        margin: 60px 50px 0;
        padding-bottom: 40px;
        width: 100%;
        text-align: center;
        .classify-wrap {
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .arrowright {
                font-size: 20px;
                color: #ccc;
            }
            .classify {
                min-height: 200px;
                border: 1px solid $currBorder;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                .active {
                    background-color: rgba(103, 194, 58, 1);
                    color: #fff;
                    svg {
                        color: #fff;
                    }
                }
                li {
                    padding: 10px 20px;
                    width: 200px;
                    &:first-child {
                        padding: 15px 20px;
                        background-color: #ccc;
                        border-top-left-radius: 6px;
                        border-top-right-radius: 6px;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    &:not(:last-child) {
                        border-bottom: 1px solid $currBorder;
                    }
                    &:not(:first-child) {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        svg {
                            color: #333;
                            font-size: 14px;
                        }
                        &:hover {
                            @extend .active;
                            background-color: rgba(103, 194, 58, .6);
                        }
                    }
                }
            }
        }
        .nav {
            margin-top: 40px;
            margin-bottom: 20px;
        }
    }
    .right .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
    }
    .right .row .word {
        display: flex;
        width: 200px;
        justify-content: flex-end;
    }
    .right .el-input {
        width: 200px
    }
    .right .row .supplement {
        margin-left: 10px
    }
</style>
