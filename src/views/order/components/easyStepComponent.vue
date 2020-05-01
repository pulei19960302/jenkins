<template>
    <div class="easy-step-component">
        <div v-if="dataSource && dataSource.length > 0">
            <div class="content" v-for="(item, index) in dataSource" :key="item.ftime">
                <div class="title">
                    <div :class="[index === 0 ? 'current-bg' : '', 'round']"></div>
                    <div class="title-nr">
                    <span :class="[index === 0 ? 'current-color' : '', 'time']">
                        {{ item.ftime }}
                    </span>
                    <span :class="[index === 0 ? 'current-color' : '', 'text']">
                        {{item.context}}
                    </span>
                    </div>
                </div>
                <div class="box" v-if="item !== 8">
                    <div class="line"></div>
                    <div class="box-content"></div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="content">
                <div class="title">
                    <div class="round"></div>
                    <div class="title-nr">
                        <span class="time">
                            暂无物流记录
                        </span>
                    </div>
                </div>
                <div class="box">
                    <div class="line"></div>
                    <div class="box-content">
                        <img src="../../../assets/order/car.png" width="118" alt="">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "easyStepComponent",
        props: {
            dataSource: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped lang="scss">
    .easy-step-component {
        .content {
            .title {
                display: flex;
                align-items: center;

                .round {
                    width: 8px;
                    height: 8px;
                    background: #D8D8D8;
                    border-radius: 50%;
                    margin-right: 24px;
                }

                .title-nr {
                    flex: 1;
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.65);

                    > span {
                        display: inline-block;
                    }

                    .time {
                        margin-right: 18px;
                    }
                }
            }

            .box {
                display: flex;
                .line {
                    width: 2px;
                    background: rgba(216, 216, 216, 1);
                    margin-left: 3px;
                }
                .box-content {
                    margin-left: 27px;
                    margin-top: 20px;
                }
            }

            .current-bg {
                background: #F5222D !important;
            }

            .current-color {
                color: #F5222D !important;
            }

        }
    }
</style>
