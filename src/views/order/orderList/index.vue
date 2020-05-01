<template>
<div>
  <div class="pageWrapper">
    <!-- Tabs 切换 -->
    <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
      <el-tab-pane name="-1"><span slot="label">全部订单({{orderStatus.total_count}})</span></el-tab-pane>
      <el-tab-pane name="1"><span slot="label">待付款({{orderStatus.wait_pay_count}})</span></el-tab-pane>
      <el-tab-pane name="2"><span slot="label">待发货({{orderStatus.wait_send_count}})</span></el-tab-pane>
      <el-tab-pane name="3"><span slot="label">已发货({{orderStatus.wait_get_count}})</span></el-tab-pane>
      <el-tab-pane name="5"><span slot="label">已完成({{orderStatus.end_count}})</span></el-tab-pane>
      <el-tab-pane name="7"><span slot="label">已关闭({{orderStatus.close_count}})</span></el-tab-pane>
    </el-tabs>

    <!-- 条件筛选与页面按钮区域 -->
    <div class="dpflex mt20">
      <!-- 条件筛选区域 -->
      <div class="flex1 dpflex">
        <div class="flex1">
          <el-row :gutter="16" :class="{ mb16: isQueryFold }">
            <el-col :span="6"><el-input v-model="order_sn" placeholder="请输入订单号"></el-input></el-col>
            <el-col :span="6"><el-input v-model="logistics_sn" placeholder="请输入物流编号"></el-input></el-col>
            <el-col :span="6"><el-input v-model="goods_id" placeholder="请输入商品ID"></el-input></el-col>
            <el-col :span="6"><el-input v-model="uid" placeholder="请输入下单人ID"></el-input></el-col>
          </el-row>
          <template v-if="isQueryFold">
            <el-row :gutter="16" class="mb16">
              <el-col :span="6"><el-input v-model="user_nickname" placeholder="请输入下单人昵称"></el-input></el-col>
              <el-col :span="6"><el-input v-model="receiver_name" placeholder="请输入收货人"></el-input></el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="orderedDate"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="下单开始日期"
                  end-placeholder="下单结束日期"
                  style="width: 100%;"
                >
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row :gutter="16" class="mb16">
              <el-col :span="6"><el-input v-model="goods_title" placeholder="请输入商品标题"></el-input></el-col>
              <el-col :span="6"><el-input v-model="supplier" placeholder="请输入供应商"></el-input></el-col>
              <el-col :span="6">
                <el-select v-model="has_coupon" class="widthPct100" placeholder="是否使用优惠券" clearable>
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"><el-input v-model="coupon_name" placeholder="请输入优惠券名称"></el-input></el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="6"><el-input v-model="receiver_mobile" placeholder="请输入收货人手机号"></el-input></el-col>
              <el-col :span="6">
                <el-select v-model="from" class="widthPct100" placeholder="请选择订单来源" clearable>
                  <el-option v-for="fromData in listData.from_map" :key="fromData.key" :label="fromData.text" :value="fromData.key"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </template>
        </div>
        <div class="ml20">
          <el-button @click="requestOrderList('search')" type="primary" class="mr6">查询</el-button>
          <el-button @click="handleResetQuery">重置</el-button>
          <span class="operationText" @click="isQueryFold = !isQueryFold">
            {{ isQueryFold ? '收起' : '展开' }} <i :class="{ 'el-icon-arrow-down': !isQueryFold, 'el-icon-arrow-up': isQueryFold }"></i>
          </span>
        </div>
      </div>
      <!-- 页面级操作按钮 -->
      <div class="ml40">
        <Export
          :exportOptions="exportOptions"
          :query="exportQuery"
          :url="$api.order.order.export"
          v-permission="[$api.order.order.export]"
        />
      </div>
    </div>

    <!-- 统计条形区域 -->
    <div class="summaryBar">
      <i class="el-icon-tickets mr6 fs18 fcblue vamiddle"></i>
      订单数：<span class="fcblue mr24">{{ listData.count }}</span>
      商品数：<span class="fcblue mr24">{{ listData.goods_num }}</span>
      订单金额：<span class="fcblue">¥{{ listData.order_amount }}</span>
    </div>

    <!-- 卡片式表格 -->
    <card-table
      :loading="isCardTableLoading"
      :cardListData="listData.items"
      rowKey="id"
      :showCardFooter="true"
    >
      <!-- 表头 -->
      <template #thead>
        <card-table-th v-if="activeTabName === '7'" :width="CHECKBOX_COLUMN_WIDTH" style="text-align: left; padding-left: 16px;">
          <el-checkbox
            v-model="checkAll"
            isIndeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          />
        </card-table-th>
        <card-table-th :width="260">商品信息</card-table-th>
        <card-table-th :width="140">单价/数量</card-table-th>
        <card-table-th :width="140">订单结算</card-table-th>
        <card-table-th :width="120">实付金额</card-table-th>
        <card-table-th :width="110">总计返利</card-table-th>
        <card-table-th :width="110">支付方式</card-table-th>
        <card-table-th :width="110">供应商/ID</card-table-th>
        <card-table-th :width="110">订单状态</card-table-th>
        <card-table-th :width="135">操作</card-table-th>
      </template>

      <!-- 用于循环渲染的 卡片头 -->
      <template #cardheader="{ cardRowData }">
        <el-checkbox
          v-if="activeTabName === '7'"
          v-model="checkedOrderStatus[cardRowData.renderIndex]"
          @change="handleOrderCheckedChange"
          class="mr8"
        />
        <span class="fcgrey">订单号：</span><span class="mr20">{{ cardRowData.order_sn }}</span>
        <span class="fcgrey">提交时间：</span><span class="mr20">{{ cardRowData.created_at }}</span>
        <span class="fcgrey">用户昵称：</span><span class="mr20">{{ cardRowData.user_nickname }}</span>
        <span class="fcgrey">用户ID：</span><span>{{ cardRowData.user_id }}</span>
        <span class="fr">
          <!-- <span class="fcgrey">订单来源：</span>
          <span class="mr6">{{ cardRowData.from_name }}</span> -->
          <el-tooltip v-if="cardRowData.remark" effect="light" placement="bottom-end" :content="'卖家备注：' + cardRowData.remark" offset="8">
            <i class="el-icon-document fs16 fcred"></i>
          </el-tooltip>
        </span>
      </template>

      <!-- 用于循环渲染的 卡片主体区域 -->
      <template #cardRow="{ cardRowData }">
        <!-- 商品信息、单价/数量 -->
        <card-table-td :width="activeTabName === '7' ? 400 + CHECKBOX_COLUMN_WIDTH : 400">
          <div class="cardTableGood" v-for="goodData in cardRowData.goods_list" :key="goodData.goods_id">
            <img class="cardTableGoodImg" :src="goodData.goods_thumb" />
            <div class="flex1 lh18 fs12">
              <div class="dpflex">
                <div class="flex1 mr8 mb8">{{ goodData.goods_title }}</div><!-- 商品名称 -->
                <div class="taright fcgrey width80">¥{{ goodData.shop_price }}</div><!-- 商品单价 -->
              </div>
              <div class="dpflex">
                <div class="flex1 mr8"><!-- 商品规格、ID -->
                  <p class="fcgrey">{{ goodData.sku_properties_name }}</p>
                  <p class="fcgrey">商品ID：{{ goodData.goods_id }}</p>
                </div>
                <div class="taright fcgrey width80">x{{ goodData.nums }}</div>
              </div>
            </div>
          </div>
        </card-table-td>

        <!-- 订单总价 -->
        <card-table-td :width="140">
          <div class="cardTablePrice">
            <p>优惠金额：¥{{ cardRowData.discount_fee }}</p>
            <p>下单立减：¥{{ cardRowData.diff_fee }}</p>
            <p>订单运费：¥{{ cardRowData.freight_fee }}</p>
            <p>退换省心：¥{{ cardRowData.insurance_fee }}</p>
          </div>
        </card-table-td>

        <!-- 实付金额 -->
        <card-table-td :width="120">
          <div class="cardTableInfo fcredFont">¥{{ cardRowData.actual_fee }}</div>
        </card-table-td>

        <!-- 总计返利 -->
        <card-table-td :width="110">
          <div class="cardTableInfo">¥{{ cardRowData.rebate_fee }}</div>
        </card-table-td>

        <!-- 支付方式 -->
        <card-table-td :width="110">
          <div class="cardTableInfo">{{ cardRowData.pay_type_name }}</div>
        </card-table-td>

        <!-- 供应商/ID -->
        <card-table-td :width="110">
          <div class="cardTableInfo">
            <p>{{ cardRowData.supplier_name }}</p>
            <p>{{ cardRowData.supplier_id }}</p>
          </div>
        </card-table-td>

        <!-- 订单状态 -->
        <card-table-td :width="110">
          <div class="cardTableInfo">{{ cardRowData.status_name }}</div>
        </card-table-td>

        <!-- 操作 -->
        <card-table-td :width="135">
          <div class="cardTableInfo">
            <div @click="handleRouterToDetail(cardRowData.id, cardRowData.user_id)" class="operationLink">查看详情</div>
            <div @click="handleModifyLogistics(cardRowData.id)" class="operationLink">修改物流</div>
            <div @click="handleModifyAddress(cardRowData.id)" class="operationLink">修改地址</div>
            <div @click="handleCancelOrder(cardRowData.id, cardRowData.actual_fee)" class="operationLink">关闭订单</div>
          </div>
        </card-table-td>
      </template>

      <!-- 用于循环渲染的 卡片底部 -->
      <template #cardfooter="{ cardRowData }">
        <span class="fcgrey">收货地址：</span>
        <span class="mr20 fcblack65">{{ cardRowData.receiver_name }}</span>
        <span class="mr20 fcblack65">{{ cardRowData.receiver_mobile }}</span>
        <span class="mr20 fcblack65">{{ cardRowData.receiver_address }}</span>
        <el-tooltip v-if="cardRowData.buyer_message !== ''" effect="light" :content="'买家备注：' + cardRowData.buyer_message" placement="top-start">
          <div class="dpinlineblock"><i class="el-icon-document fs16 fcorange mr6"></i>买家备注</div>
        </el-tooltip>
      </template>
    </card-table>

    <!-- 修改订单物流 -->
    <modify-logistics-dialog :id="operationOrderId" :status.sync="modifyLogisticsDialogVisible" />

    <!-- 修改订单地址 -->
    <edit-order-address-dialog :id="operationOrderId" :visable.sync="modifyAddressDialogVisible" :initData="handleEditAddressSuccess" />

    <!-- 取消订单 -->
    <close-order-dialog :money="operationOrderActualFee" :id="operationOrderId" :visable.sync="cancelOrderDialogVisible" />
  </div>

  <!-- Fixed 分页 -->
  <Pagination
    :current="pagination.current"
    :pageSize="pagination.pageSize"
    :count="pagination.count"
    :pageChoose="[10, 20, 30, 40]"
    :options="paginationOptions"
    @opreateCBK="handlePaginationOpreate"
    @pageChangeCBK="handlePageCrtChange"
    @sizeChangeCBK="handlePageSizeChange"
  >
  </Pagination>
</div>
</template>

<style scoped lang="scss">
.width80 { width: 80px; }
.fcblue { color: rgba(34, 149, 255, 1); }
.fcgrey { color: #949494; }
.fcred { color: #F56C6C; }
.fcredFont { color: #F5222D; }
.fcorange { color: #E6A23C; }
.fcblack65 { color: rgba(0, 0, 0, 0.65) }

.pageWrapper {
  padding: 16px;
  background: #fff;
  border-radius: 0 0 4px 4px;
  min-height: calc(100vh - 135px);
}
.summaryBar {
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 16px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgba(240,248,255,1);
  border-radius: 4px;
  border: 1px solid rgba(145,213,255,1);
}

/* 调用卡片式表格 */
.cardTableGood {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(232,232,232,1);
}
.cardTableGood:last-child {
  border-bottom: none;
}
.cardTableGoodImg {
  margin-right: 8px;
  display: block;
  width: 80px;
  height: 80px;
}
.cardTablePrice {
  padding: 10px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: #949494;
}
.cardTableInfo {
  padding: 10px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}
.operationLink {
  margin-right: auto;
  margin-left: auto;
  width: 60px;
  color: #1890FF;
  cursor: pointer;
}
</style>

<script src="./index.js"/>
