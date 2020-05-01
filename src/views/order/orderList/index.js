import _ from 'lodash'
import CardTable from '@/components/card-table/index.vue'
import CardTableTh from '@/components/card-table/card-table-th.vue'
import CardTableTd from '@/components/card-table/card-table-td.vue'
import ModifyLogisticsDialog from '../components/modifyLogisticsDialog'
import EditOrderAddressDialog from '../components/editOrderAddressDialog'
import CloseOrderDialog from "../components/closeOrderDialog"

const INITIAL_QUERY = {
  order_sn: '', // 订单编号 Input
  logistics_sn: '', // 物流编号 Input
  goods_id: '', // 商品ID Input
  uid: '', // 下单人ID Input

  user_nickname: '', // 下单人昵称 Input
  receiver_name: '', // 收货人 Input
  orderedDate: [], // 下单时间 daterange

  goods_title: '', // 商品标题 Input
  supplier: '', // 供应商 Input
  activity_name: '', // 活动批次 Input
  has_coupon: '', // 是否使用优惠券 Select

  coupon_name: '', // 优惠券名称 Input
  receiver_mobile: '', // 收货人手机号 Input
  from: '', // 订单来源 Select // TODO
}

export default {
  name: "orderList",
  components: {
    'card-table': CardTable,
    'card-table-th': CardTableTh,
    'card-table-td': CardTableTd,
    ModifyLogisticsDialog,
    EditOrderAddressDialog,
    CloseOrderDialog
  },
  data() {
    return {
      // 配置
      CHECKBOX_COLUMN_WIDTH: 60, // 批量选择列宽

      // 隶属于页面
      activeTabName: '-1', // 当前正在激活态的 Tab
      orderStatus: { // 订单状态
        total_count: '', // 全部订单数
        wait_pay_count: '', // 待付款数
        wait_send_count: '', // 待发货数
        wait_get_count: '', // 已发货数
        end_count: '', // 已完成数
        close_count: '', // 已关闭数
      },
      exportOptions: [], // 列表导出的配置项，请求列表数据时可能被更新
      exportQuery: {}, // 并不知道有啥用，先保留
      listData: { // 列表数据
        count: '', // 订单数
        goods_num: '', // 商品数
        order_amount: '', // 订单金额
        items: [], // 订单项数据
        from_map: [], // 订单来源下拉数据
      },
      pagination: { // 分页器
        current: 1,
        pageSize: 10,
        count: 0,
      },
      paginationOptions: [], // 分页批量操作配置
      checkedOrderStatus: [], // 已勾选的订单 ID 数组
      checkAll: false, // 是否全选态
      isIndeterminate: false, // 是否半选态

      operationOrderId: '', // 待操作的订单 ID
      operationOrderActualFee: '', // 待操作订单的实际支付金额，用于取消订单
      modifyLogisticsDialogVisible: false, // 修改物流，弹窗显隐
      modifyAddressDialogVisible: false, // 修改地址，弹窗显隐
      cancelOrderDialogVisible: false, // 取消订单，弹窗显隐

      // 隶属于 combine-query 条件组合筛选组件
      isQueryFold: false, // 条件筛选的展开/折叠

      // 隶属于 card-table 卡片式表格组件
      isCardTableLoading: false,

      ...INITIAL_QUERY,
    }
  },
  mounted: function() {
    this.$api.order.odStatus().then((res) => { // 获取订单状态统计
      this.orderStatus = res.data
    })
    this.requestOrderList() // 请求订单列表
  },
  methods: {
    // 切换 Tab
    handleTabClick(tab) {
      this.activeTabName = tab.name
      if (tab.name === '7') { // 已关闭状态
        this.paginationOptions = [{
          value: 'del',
          label: '批量删除',
          type: 'danger',
          permission: [
            this.$api.order.order.delall
          ]
        }]
      } else {
        this.paginationOptions = []
      }
      this.$api.order.odStatus().then((res) => { // 获取订单状态统计
        this.orderStatus = res.data
      })
        if (this.activeTabName == '-1') {
            Reflect.deleteProperty(this.exportQuery, 'status')
        } else {
            this.exportQuery.status = this.activeTabName;
        }
      this.requestOrderList()
    },
    // 分页器当前页变化
    handlePageCrtChange(page) {
      this.pagination.current = page
      this.requestOrderList()
    },
    // 分页器 pageSize 变化
    handlePageSizeChange(size) {
      this.pagination.pageSize = size
      this.requestOrderList()
    },
    // 处理重置并查询
    handleResetQuery() {
      Object.assign(this, INITIAL_QUERY)
      this.requestOrderList('search')
    },
    // 请求列表数据
    requestOrderList(type) {
      this.isCardTableLoading = true
      // 处理下单开始和结束日期
      let start_time = ''
      let end_time = ''
      if (this.orderedDate && this.orderedDate.length > 0) {
        start_time = this.orderedDate[0]
        end_time = this.orderedDate[1]
      }

      if (type === 'search') {
        this.pagination.current = 1
      }

      this.exportQuery = {
          status: this.activeTabName, // 订单状态，由 Tabs 决定
          page: this.pagination.current,
          pageSize: this.pagination.pageSize,

          order_sn: this.order_sn,
          logistics_sn: this.logistics_sn,
          goods_id: this.goods_id,
          uid: this.uid,
          user_nickname: this.user_nickname,
          receiver_name: this.receiver_name,
          start_time: start_time,
          end_time: end_time,
          goods_title: this.goods_title,
          supplier: this.supplier,
          activity_name: this.activity_name,
          has_coupon: this.has_coupon,
          coupon_name: this.coupon_name,
          receiver_mobile: this.receiver_mobile,
          from: this.from,
      };

        Reflect.deleteProperty(this.exportQuery, 'pageSize');
        Reflect.deleteProperty(this.exportQuery, 'page');

        if (this.activeTabName == '-1') {
            Reflect.deleteProperty(this.exportQuery, 'status');
        }


        this.$api.order.odList({
        status: this.activeTabName, // 订单状态，由 Tabs 决定
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,

        order_sn: this.order_sn,
        logistics_sn: this.logistics_sn,
        goods_id: this.goods_id,
        uid: this.uid,
        user_nickname: this.user_nickname,
        receiver_name: this.receiver_name,
        start_time: start_time,
        end_time: end_time,
        goods_title: this.goods_title,
        supplier: this.supplier,
        activity_name: this.activity_name,
        has_coupon: this.has_coupon,
        coupon_name: this.coupon_name,
        receiver_mobile: this.receiver_mobile,
        from: this.from,
      }).then((res) => {
        this.pagination.count = res.data.count

        let cloneResData = _.cloneDeep(res.data)
        if (cloneResData && cloneResData.items) {
          cloneResData.items = cloneResData.items.map((item, index) => ({
            ...item,
            renderIndex: index
          }))
        }
        this.listData = cloneResData

        // 初始化设置选中数组
        if (res.data && res.data.items) {
          this.checkedOrderStatus = res.data.items.map(() => false)
        } else {
          this.checkedOrderStatus = []
        }

        this.isCardTableLoading = false
        this.exportOptions = res.data.fields || []
      })
    },
    // 处理修改订单物流
    handleModifyLogistics(orderId) {
      this.operationOrderId = orderId
      this.modifyLogisticsDialogVisible = true
    },
    // 处理修改地址
    handleModifyAddress(orderId) {
      this.operationOrderId = orderId
      this.modifyAddressDialogVisible = true
    },
    // 处理取消订单
    handleCancelOrder(orderId, actualFee) {
      this.operationOrderId = orderId
      this.operationOrderActualFee = actualFee
      this.cancelOrderDialogVisible = true
    },
    // 处理跳转订单详情
    handleRouterToDetail(orderId, user_id) {
      this.$router.push({ name: "orderDetail", params: { id: orderId, user_id } });
    },
    // 处理修改地址成功
    handleEditAddressSuccess() {
      this.requestOrderList()
    },
    // 处理全选/非全选 change
    handleCheckAllChange(val) {
      this.checkedOrderStatus = val ? this.checkedOrderStatus.map(() => true) : this.checkedOrderStatus.map(() => false)
      this.isIndeterminate = false
    },
    // 处理逐个订单是否选中
    handleOrderCheckedChange() {
      const orderLength = this.checkedOrderStatus.length
      const checkedOrderLength = this.checkedOrderStatus.filter((item) => {
        return item === true
      }).length
      this.checkAll = checkedOrderLength === orderLength
      this.isIndeterminate = checkedOrderLength > 0 && checkedOrderLength < orderLength
    },
    // 处理分页批量操作
    handlePaginationOpreate() {
      let checkedOrderIds = []
      this.checkedOrderStatus.forEach((checked, index) => {
        if (checked) {
          checkedOrderIds.push(this.listData.items[index].id)
        }
      })

      if (checkedOrderIds.length === 0) {
        this.$message.warning("请选择订单")
        return;
      }
      this.handleDel(checkedOrderIds)
    },
    handleDel(idArr) {
      this.$confirm(`确认删除选中的订单？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const ids = idArr.join(",")
        try {
          await this.$api.order.delall({ ids });
          this.requestOrderList()
        } catch (e) {
          throw new Error(e);
        }
      })
    },
  }
}
