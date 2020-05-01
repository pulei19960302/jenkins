<!-- 卡片式表格的表头格 -->
<template>
  <div class="tacenter" :style="'flex: ' + width">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card-table-th",
  props: {
    width: { // flex 布局下表头格所占的宽度比例
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.tacenter {
  text-align: center;
}
</style>
