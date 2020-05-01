<!-- 浮起拖动方式，已弃用 -->
<template>
    <div class="im-wrap">
        <el-dialog
            :visible.sync="imVisible"
            :modal-append-to-body="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal="false"
            width="100%"
            class="im-dialog"
            top="0"
            :lock-scroll="true"
            :show-close="true"
            @close="handleClose">
            <div class="im-dialog-header" slot="title"></div>
            <div class="main">
                <div class="user">
                    <div style="padding: 0 10px;">
                        <el-tabs v-model="activeName" @tab-click="tabClick">
                            <el-tab-pane label="待接入（1）" name="first"></el-tab-pane>
                            <el-tab-pane label="当前咨询（10）" name="second"></el-tab-pane>
                            <el-tab-pane label="已完成（100）" name="third"></el-tab-pane>
                        </el-tabs>
                        <el-input
                            class="mt10"
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="input21">
                        </el-input>
                    </div>
                    <div class="list">
                        <div class="filters">
                            <p>等待时长 <i class="el-icon-sort"></i></p>
                            <p>优先级 <i class="el-icon-sort"></i></p>
                        </div>
                        <ul>
                            <li v-for="item in userList" :key="item.id" @click="active = item.id" :class="active === item.id ? 'active' : ''"
                                @click.right="clickRight(item.id)">
                                <p>
                                    <i class="tag" style="margin-left: -16px;" :class="item.mark"></i>
                                    <span>彩什么虹</span>
                                </p>
                                <p>17:26</p>
                                <div class="mark" v-show="rightIndex === item.id" v-clickoutside="clickoutside">
                                    <p @click="handleMark('urgency', item)"><i class="tag urgency"></i>紧急</p>
                                    <p @click="handleMark('important', item)"><i class="tag important"></i>优先</p>
                                    <p @click="handleMark('priority', item)"><i class="tag priority"></i>重要</p>
                                    <p @click="handleMark('general', item)"><i class="tag general"></i>一般</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <el-pagination
                        class="pagation"
                        small
                        :total="count"
                        :current-page="current"
                        :pager-count="10"
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        layout="total, prev, pager, next">
                    </el-pagination>
                </div>
                <div class="chart">chat</div>
                <div class="order">order</div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import clickoutside from '@/OMS/directive/clickoutside';
    import move from '@/OMS/utils/move';

    export default {
        name: 'Im',
        props: {
            imVisible: [Boolean]
        },
        directives: { clickoutside },
        components: {},
        data() {
            return {
                activeName: 'second',
                input21: '',
                active: null,
                rightIndex: null,
                mark: '',
                userList: [{
                    id: 1,
                    name: '彩什么虹',
                    time: '17:26',
                    mark: 'urgency'
                },{
                    id: 2,
                    name: '彩什么虹',
                    time: '17:26',
                    mark: 'important'
                },{
                    id: 3,
                    name: '彩什么虹',
                    time: '17:26',
                    mark: 'priority'
                }],
                count: 50,
                current: 1,
            }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
            this.initImDrag();
        },
        methods: {
            handlePageChange(page) {
                this.$emit('pageChangeCBK', page);
            },
            handleSizeChange(size) {
                this.$emit('sizeChangeCBK', size);
            },
            clickoutside() {
                if(this.rightIndex) this.rightIndex = null;
            },
            handleMark(mark, { id }) {
                this.mark = mark;
                // tips：后台标记后再变更
                this.userList.map(val => {
                    if(val.id === id) val.mark = mark;
                })
            },
            handleCommand(command) {
                this.$message('click on item ' + command);
            },
            clickRight(index) {
                this.rightIndex = index;
            },
            tabClick() {

            },
            handleClose() {
                this.$emit('update:imVisible', false);
            },
            // 初始化IM弹窗拖拽
            initImDrag() {
                //  网页内拖动IM框
                const divOut = document.querySelector('.app-wrapper');
                const divInner = document.querySelector('.im-dialog');
                const moveTarget = document.querySelector('.im-dialog .el-dialog__header');
                if (!divOut || !divInner) return;
                move(divOut, divInner, moveTarget, () => {});
            },
        }
    }
</script>

<style lang="scss">
    @import "../../styles/variables";
    $urgency: #F56C6C;
    $important: #67C23A;
    $priority: $theme;
    $general: #C0C4CC;


    $color: #EEF6FE;
    .urgency {
        background: $danger-color;
    }
    .important {
        background: $success-color;
    }
    .priority {
        background: $theme;
    }
    .general {
        background: $info-color;
    }

    @mixin flex {
        display: flex;
        justify-content: space-between;
    }
    .im-wrap {
        position: absolute;
        background: #fff;
        .im-dialog {
            background: #fff;
            width: 80%;
            max-height: 80%;
            height: 710px;
            top: 10%;
            left: calc(50% - 437px);
            box-shadow: 0px 1px 10px 1px #E7EBF0;
            overflow: hidden;
            p {
                font-size: 12px;
                font-family: '微软雅黑';
            }
            & * {
                box-sizing: border-box;
            }
            & > .el-dialog {
                width: 100%;
                height: 100%;
                margin: 0;
                overflow: hidden;
            }
            & .el-dialog__header {
                height: 56px;
                padding: 0 20px 0 20px;
                background-color: $color;
                text-align: left;
                .el-dialog__title, .el-dialog__close {
                    color: #909399 !important;
                }
            }
            & .el-dialog__body {
                width: 100%;
                height: 100%;
                padding: 0;
            }
            &-header {
                cursor: move;
                user-select: none;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                user-select: none;
                & > div:first-child {
                    max-width: 346px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #34353D;
                    font-size: 16px;
                    font-weight: 500;
                }
                & > div:last-child {
                    display: flex;
                    align-items: center;
                }
                & .logout {
                    display: flex;
                    align-items: center;
                    margin-right: 30px;
                    font-size: 12px;
                    color: #9D9D9D;
                    cursor: pointer;
                    &:hover {
                        color: #2590FF;
                    }
                    & > p {
                        margin-left: 6px;
                    }
                }
                & .close-dialog {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }
        .main {
            @include flex;
            height: 100%;
            .user {
                position: relative;
                width: 25%;
                .list {
                    .filters {
                        @include flex;
                        padding: 16px 60px;
                    }
                    li {
                        @include flex;
                        padding: 15px 60px;
                        cursor: pointer;
                        position: relative;
                        &:hover {
                            background: $color;
                        }
                        .tag {
                            display: inline-block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            margin-right: 5px;
                        }
                        .mark {
                            position: absolute;
                            top: 20px;
                            right: 90px;
                            background-color: #fff;
                            border: 1px solid #ebeef5;
                            border-radius: 4px;
                            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            z-index: 1;
                            p {
                                padding: 10px 15px;
                                &:hover {
                                    background: $color;
                                }
                                &:not(:last-child) {
                                    border-bottom: 1px solid $border;
                                }
                            }
                        }
                    }
                    .active {
                        background: $color;
                    }
                }
                .pagation {
                    text-align: center;
                    position: absolute;
                    bottom: 50px;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
            .chart {
                width: 50%;
                background-color: $color;
            }
            .order {
                width: 25%;
            }
        }
    }
</style>
