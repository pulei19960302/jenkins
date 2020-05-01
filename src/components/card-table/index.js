export default {
  name: "card-table",
  props: {
    loading: { // 卡片区域 Loading 态控制，受控
      type: Boolean,
      required: true
    },
    cardListData: { // 卡片列表数据，对象数组，受控
      type: Array,
      required: true,
    },
    rowKey: { // 用于卡片循环渲染的 key 值，一般来自于卡片数据中的某个字段
      type: String,
      required: true,
    },
    showCardFooter: { // 是否显示卡片底部横条，开启后可以使用 slot cardFooter，默认 false
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isShowFooter: this.showCardFooter
    }
  }
}
