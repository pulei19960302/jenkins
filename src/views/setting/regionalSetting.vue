<template>
    <div class="regionalSetting">
        <div class="title">
            <span class="pageTitle">区域设置</span>
            <!-- <div class="active-area">
                地址：
                <b>{{ provinceActive.name }}</b>
                <b>{{ cityActive.name }}</b>
                <b>{{ countyActive.name }}</b>
                <b>{{ townActive.name }}</b>
            </div> -->
            <!--<el-button type="warning" plain size="mini" @click="handleReset">恢复默认设置</el-button>-->
        </div>
        <div class="aera">
            <div class="fler-row">
                <div class="areaListTitle">省 自治区 直辖市</div>
                <div class="content province">
                    <div
                        class="list"
                        :class="{ 'activeList': item.id === provinceActive.id }"
                        v-for="(item, index) in provinceData"
                        :key="index"
                        @click="handleClick(item, 'province', 'city')"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="fler-row">
                <div class="areaListTitle">地级市</div>
                <div class="content city">
                    <div
                        class="list city"
                        :class="{ 'activeList': item.id === cityActive.id }"
                        v-for="(item, index) in cityData"
                        :key="index"
                        @click="handleClick(item, 'city', 'county')">
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="fler-row">
                <div class="areaListTitle">市辖区 县 县级市</div>
                <div class="content county">
                    <div
                        class="list"
                        :class="{ 'activeList': item.id === countyActive.id }"
                        v-for="(item, index) in countyData"
                        :key="index"
                        @click="handleClick(item, 'county', 'town')">
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div class="fler-row">
                <div class="areaListTitle">乡 镇 街道</div>
                <div class="content town">
                    <div
                        class="list"
                        :class="{ 'activeList': item.id === townActive.id }"
                        v-for="(item, index) in townData"
                        :key="index"
                        @click="handleClick(item, 'town')">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui';
    import { _ } from '@/OMS/utils';

    const defaultData = {
        provinceActive: { id: 30, name: '四川省' },
        cityActive: { id: 391, name: '成都市' },
        countyActive: { id: 3396, name: '双流区' },
        townActive: { id: 40818, name: '中和街道' }
    }
    export default {
        name: "regionalSetting",
        data() {
            const { provinceActive, cityActive, countyActive, townActive } = defaultData;
            return {
                provinceData: [], // 1 级
                cityData: [], // 2 级
                countyData: [], // 3 级
                townData: [], // 4 级
                provinceActive,
                cityActive,
                countyActive,
                townActive,
            }
        },
        mounted() {
            this.getData(0, 'province');
            this.handleReset();
        },
        methods: {
            /**
             * 区域级联数据
             * @param pid   父级id
             * @param type  区域类型
             * @returns {Promise<void>}
             */
            async getData(pid, type) {
                const loadingInstance = Loading.service({ target: `.${type}`, fullscreen: false });
                try {
                    const { data } = await this.$api.common.getAreaList({ pid });
                    this[`${type}Data`] = data;
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                } catch (e) {
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                    throw new Error(e);
                }
            },
            /**
             * 更换区域级联数据
             * @param id        当前id
             * @param currType  当前区域类型
             * @param nextType  点击搜索区域类型
             */
            handleClick(item, currType, nextType) {
                const { id, name } = item
                this[`${currType}Active`] = { id, name }
                // 选择 1 级时，清空 3、4 级
                if (currType === 'province') {
                    this.countyData = []
                    this.townData = []
                }
                // 选择 2 级时没清空 4 级
                if (currType === 'city') {
                    this.townData = []
                }
                if(nextType) {
                    this.getData(id, nextType)
                }
            },
            // 恢复默认设置
            handleReset() {
                const arr = Object.keys(defaultData);
                arr.forEach((key, index) => {
                    this[key] = defaultData[key];
                    const newKay = _.replace(arr[index + 1], 'Active', '');
                    if(newKay) this.getData(defaultData[key].id, newKay);
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../src/styles/variables";

    .regionalSetting {
        border-radius: 4px;
        background: #fff;
        display: flex;
        flex-direction: column;
        .active-area {
            b {
                color: $theme;
            }
        }
    }

    .regionalSetting .title {
        height: 56px;
        line-height: 56px;
        padding: 20px 24px;
        border-bottom: 1px solid #E4E7ED;
        display: flex;
        width: 100%;
        align-items: center;
    }

    .regionalSetting .title span {
        display: flex;
        flex: 1
    }

    .aera {
        display: flex;
        flex-direction: row;
    }

    .aera .fler-row {
        display: flex;
        flex-direction: column;
        flex: 1;
        border-right: 1px solid #E4E7ED;
        .content {
            max-height: 600px;
            overflow-y: hidden;
        }
        .content:hover {
            overflow-y: auto;
        }
    }

    .aera .fler-row:last-child {
        border-right: none;
    }
    .activeList {
        color: #1890FF;
        background:rgba(24,144,255,0.15);


    }
    .list {
        padding: 14px 24px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            color: #1890FF;
            background: rgba(24,144,255,0.15);
        }
    }
    .aera .fler-row .new {
        margin-top: 20px
    }
    .aera .fler-row .new .el-button {
        color: $theme
    }
    .aera .fler-row .add {
        padding: 15px;
        width: 100%;
        border: 1px #E4E4E4 dashed;
        text-align: center;
        color: #999;
        margin-top: 20px;
        cursor: pointer
    }

/* 改版 */
.pageTitle {
    color: #222;
    font-size: 16px !important;
    font-weight: 500;
}
.areaListTitle {
    font-size: 16px;
    padding: 20px 24px;
    color: #999;
}
</style>
