<template>
    <div>
        <!-- 表头区域 -->
        <div class="cardTable-thead">
            <slot name="thead"></slot>
        </div>

        <!-- 卡片区域 -->
        <div v-loading="loading">
            <!-- 卡片行 -->
            <div :class="['cardTable-card', cardRowData['export_record'] > 0 ? 'row-height-light-normal': '']" v-for="cardRowData in cardListData" :key="cardRowData[rowKey]">
                <!-- 卡片头 -->
                <div :class="['cardTable-cardHeader', cardRowData['export_record'] > 0 ? 'row-height-light-normal': '']">
                    <slot name="cardheader" :cardRowData="cardRowData"></slot>
                </div>

                <!-- 卡片主体区域 -->
                <div :class="{ 'cardTable-cardMain': isShowFooter }" style="display: flex;">
                    <slot name="cardRow" :cardRowData="cardRowData"></slot>
                </div>

                <!-- 卡片底部 -->
                <div v-if="showCardFooter" :class="['cardTable-cardFooter', cardRowData['export_record'] > 0 ? 'row-height-light-normal': '']">
                    <slot name="cardfooter" :cardRowData="cardRowData"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .cardTable-thead {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 46px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        background: #f2f6fc;
        font-weight: bold;
        border-radius: 4px;
    }

    .cardTable-card {
        margin-bottom: 16px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #EBEEF5;
    }

    .cardTable-card:last-child {
        margin-bottom: 0;
    }

    .cardTable-cardHeader {
        height: 32px;
        padding-right: 12px;
        padding-left: 16px;
        line-height: 32px;
        font-size: 12px;
        background: #F0F8FF;
        border-bottom: 1px solid #EBEEF5;
    }

    .cardTable-cardMain {
        border-bottom: 1px solid #EBEEF5;
    }

    .cardTable-cardFooter {
        height: 32px;
        padding-right: 12px;
        padding-left: 16px;
        line-height: 32px;
        font-size: 12px;
        background: #fff;
    }
</style>

<script src="./index.js"/>
