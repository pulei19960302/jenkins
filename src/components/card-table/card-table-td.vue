<!-- 卡片式表格 - 用于卡片主体的单元格 -->
<template>
  <div class="cardTable-cardGrid" :style="'flex: ' + width">
    
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card-table-td",
  props: {
    width: { // flex 布局下表格所占的宽度比例
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.cardTable-cardGrid {
  margin-right: -1px;
  min-height: 104px;
  border-right: 1px solid rgba(232,232,232,1);
}
.cardTable-cardGrid:last-child {
  border-right: none;
}
</style>
