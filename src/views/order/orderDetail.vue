<template>
    <div class="taskReward-content">
        <div class="mune-content">
                <span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gantanhao"></use>
                    </svg>
                    <span style="margin-left: 5px;">当前订单状态：<b style="color: #FC5855">{{ detailData.status_name }}</b></span>
                </span>
            <el-button type="primary" plain @click="changeTransport" v-permission="[$api.order.delivery.save]">修改物流信息</el-button>
            <el-button type="primary" plain @click="buyerOpen" v-permission="[$api.order.order.modify_receive]">修改收货人信息</el-button>
            <el-button type="primary" plain @click="openRemarks" v-permission="[$api.order.order.remark]">备注订单</el-button>
            <el-button type="warning" plain @click="closeOrder" v-permission="[$api.order.order.close]">关闭订单</el-button>
        </div>
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">基本信息</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">订单编号</div>
                            <div class="">{{ detailData.order_sn }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">发货单流水号</div>
                            <div class="">{{ detailData.order_sn }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">用户账号</div>
                            <div class="">
                                {{ detailData.buyer_nickname }}
                                <el-button style="margin-left: 10px" type="info" plain size="mini" @click="look" v-permission="[$api.user.userManage.detail]">查看</el-button>
                            </div>
                        </div>
                        <div class="table-row-col">
                            <div class="">支付方式</div>
                            <div class="">{{ detailData.pay_type }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">订单来源</div>
                            <div class="">{{ detailData.from | validVal}}</div>
                        </div>
                        <!--<div class="table-row-col">-->
                            <!--<div class="">订单类型</div>-->
                            <!--<div class="">{{ detailData.pay_type }}</div>-->
                        <!--</div>-->
                    </div>
                    <div class="table-row">
                        <!--<div class="table-row-col">-->
                            <!--<div class="">配送方式</div>-->
                            <!--<div class="">{{ detailData.pay_type }}</div>-->
                        <!--</div>-->
                        <div class="table-row-col">
                            <div class="">物流单号</div>
                            <div>{{ detailData.logistics_sn | validVal}}
                            <logisticsInfo style="margin-left: 10px;" v-if="looklogistics" :logisticssn="detailData.logistics_sn" :expresscode="detailData.express_code"></logisticsInfo>
                            </div>
                        </div>
                        <div class="table-row-col">
                            <div class="">付款时间</div>
                            <div class="">{{ detailData.pay_time }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">发货时间</div>
                            <div class="">{{ detailData.send_time }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">成交时间</div>
                            <div class="">{{ detailData.take_time }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">卖家留言</div>
                            <div class="">{{ detailData.remark }}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!--<div class="card">-->
            <!--<div>-->
                <!--<svg class="icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-icon_favorite"></use>-->
                <!--</svg>-->
                <!--<span class="f16">发票信息</span>-->
                <!--<div class="table-content">-->
                    <!--<div class="table-row">-->
                        <!--<div class="table-row-col">-->
                            <!--<div class="">发票类型</div>-->
                            <!--<div class="">电子普通发票</div>-->
                        <!--</div>-->
                        <!--<div class="table-row-col">-->
                            <!--<div class="">发票抬头</div>-->
                            <!--<div class="">个人</div>-->
                        <!--</div>-->
                        <!--<div class="table-row-col">-->
                            <!--<div class="">发票内容</div>-->
                            <!--<div class="">服饰</div>-->
                        <!--</div>-->
                        <!--<div class="table-row-col">-->
                            <!--<div class="">收票人信息</div>-->
                            <!--<div class="">18000000000 | 5698401@qq.com</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">收货人信息</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">收货人</div>
                            <div class="">{{ detailData.receiver_name | validVal}}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">手机号码</div>
                            <div class="">{{ detailData.receiver_mobile | validVal}}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">收货地址</div>
                            <div class="">{{ detailData.receiver_address | validVal}}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">买家留言</div>
                            <div class="">{{ detailData.buyer_message | validVal}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">商品信息</span>
                <div class="table-content">
                    <div class="table-row">
                        <el-table
                            show-summary
                            border
                            ref="multipleTable"
                            :data="goodsData">
                            <el-table-column
                                width="100"
                                align="center"
                                prop="goods_thumb"
                                label="商品图片">
                                <template slot-scope="scope">
                                    <img :src="scope.row.goods_thumb" style="width: 80px;" @click="previewImg=scope.row.goods_thumb;visible = true">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                align="center"
                                prop="goods_name">
                            </el-table-column>
                            <el-table-column
                                prop="usernum"
                                align="center"
                                label="价格/货号">
                                <template slot-scope="scope">
                                    <p>价格：￥{{ scope.row.shop_price }}</p>
                                    <p>货号：{{ scope.row.goods_id }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="属性"
                                align="center"
                                prop="sku_properties_name"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                label="数量（件）"
                                align="center"
                                prop="nums">
                            </el-table-column>
                            <el-table-column
                                label="小计（元）"
                                prop="rowDotal"
                                align="center">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">费用信息</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">商品合计</div>
                            <div class="">{{ detailData.goods_fee }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">运费(运费险)</div>
                            <div class="">{{ detailData.freight_fee }}({{detailData.insurance_fee}})</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">优惠券</div>
                            <div class="">{{detailData.coupon_name}}({{detailData.coupon_fee}}) </div>
                        </div>
                        <!--<div class="table-row-col">-->
                            <!--<div class="">优币抵扣</div>-->
                            <!--<div class="">0</div>-->
                        <!--</div>-->
                    </div>
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">活动优惠</div>
                            <div class="">{{ detailData.discount_fee }}</div>
                        </div>
                        <!--<div class="table-row-col">-->
                            <!--<div class="">折扣金额</div>-->
                            <!--<div class="">0</div>-->
                        <!--</div>-->
                        <div class="table-row-col">
                            <div class="">订单总金额</div>
                            <div class="red">{{ detailData.total_fee }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">应付款金额</div>
                            <div class="red">{{ detailData.actual_fee }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" v-if="detailData.sale_records.length!=0">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon_favorite"></use>
                </svg>
                <span class="f16">售后记录</span>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-row-col">
                            <div class="">时间</div>
                            <div class="for-div" v-bind:key="item.id" v-for="item in detailData.sale_records">{{ item.created_at }}</div>
                        </div>
                        <div class="table-row-col">
                            <div class="">内容</div>
                            <div class="for-div" v-bind:key="item.id" v-for="item in detailData.sale_records">{{ item.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="card">-->
            <!--<div>-->
                <!--<svg class="icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-icon_favorite"></use>-->
                <!--</svg>-->
                <!--<span class="f16">操作信息</span>-->
                <!--<el-table-->
                    <!--border-->
                    <!--ref="multipleTable"-->
                    <!--:data="tableData"-->
                    <!--tooltip-effect="dark"-->
                    <!--style="width: 100%;margin-top: 15px"-->
                    <!--@selection-change="handleSelectionChange">-->
                    <!--<el-table-column-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="number"-->
                        <!--label="操作者">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="操作时间"-->
                        <!--align="center"-->
                        <!--sortable-->
                        <!--prop="sort">-->
                        <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--prop="usernum"-->
                        <!--align="center"-->
                        <!--label="用户账号">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="订单状态"-->
                        <!--align="center"-->
                        <!--sortable-->
                        <!--prop="money"-->
                        <!--show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="付款状态"-->
                        <!--sortable-->
                        <!--align="center"-->
                        <!--prop="lxr"-->
                        <!--show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="发货状态"-->
                        <!--align="center"-->
                        <!--sortable-->
                        <!--prop="lxzt"-->
                        <!--show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--label="备注"-->
                        <!--align="center"-->
                        <!--prop="clsj">-->
                    <!--</el-table-column>-->
                <!--</el-table>-->
            <!--</div>-->
        <!--</div>-->
        <!--备注-->
        <el-dialog
            title="备注订单"
            :visible.sync="dialogVisible"
            :modal="needMask"
            width="30%">
            <el-form
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="操作备注：">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="remark"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button
                    :disabled="!remark"
                    type="primary"
                    @click="orderRemark">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <!--站内信-->
        <el-dialog
            title="发生站内信"
            :visible.sync="msgdialogVisible"
            :modal="needMask"
            width="30%">
            <el-form
                :model="msg"
                :rules="rules"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="标题：" prop="title">
                    <el-input
                        v-model="msg.title"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="操作备注：" prop="content">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="msg.content"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="msgdialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="msgdialogVisible = false">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <!--关闭订单-->
        <el-dialog
            title="关闭订单"
            :visible.sync="closedialogVisible"
            :modal="needMask"
            width="30%">
            <el-form
                ref="closeForm"
                :model="closeForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="是否退款：">
                    <el-switch v-model="closeForm.is_refund" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item v-show="closeForm.is_refund==1" label="退款金额：" prop="actual_fee" :rules="[simpleRule]">
                    <el-input
                        type="number"
                        v-model="closeForm.actual_fee"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="操作密码：" prop="password" :rules="[simpleRule]">
                    <el-input
                        type="password"
                        v-model="closeForm.password"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closedialogVisible = false">取消</el-button>
                <el-button
                    :disabled="!closeForm.password"
                    type="primary"
                    @click="orderClose">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <!--发票-->
        <el-dialog
            title="修改发票信息"
            :visible.sync="invoicedialogVisible"
            :modal="needMask"
            width="30%">
            <el-form
                :model="invoice"
                :rules="rules"
                ref="form"
                label-width="120px"
                label-position="right">
                <el-form-item label="发票类型：" prop="invoiceType">
                    <el-select style="width: 70%;margin:0 5% 10px 0" v-model="invoice.invoiceType" placeholder="请选择">
                        <el-option
                            v-for="item in invoiceTypeoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票抬头：" prop="title">
                    <el-input
                        v-model="invoice.title"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="发票内容：" prop="content">
                    <el-select style="width: 70%;margin:0 5% 10px 0" v-model="invoice.invoiceType" placeholder="请选择">
                        <el-option
                            v-for="item in invoiceContentoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收票人手机：" prop="title">
                    <el-input
                        v-model="invoice.tel"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="收票人邮箱：" prop="title">
                    <el-input
                        v-model="invoice.mailbox"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="invoicedialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="invoicedialogVisible = false">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <!--修改收货人信息-->
        <el-dialog
            title="修改收货人信息"
            :visible.sync="buyerdialogVisible"
            :modal="needMask"
            width="30%">
            <el-form
                :model="buyer"
                ref="buyerForm"
                label-width="120px"
                label-position="right">
                <el-form-item label="收货人姓名：" prop="title">
                    <el-input
                        v-model="buyer.receiver_name"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="title">
                    <el-input
                        v-model="buyer.receiver_mobile"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
                <el-form-item label="所在区域：" prop="content">
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0" v-model="buyer.receiver_province_id" placeholder="省">
                        <el-option
                            v-for="item in provinceData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0" v-model="buyer.receiver_city_id" placeholder="市">
                        <el-option
                            v-for="item in cityData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0" v-model="buyer.receiver_district_id" placeholder="区县">
                        <el-option
                            v-for="item in countyData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select clearable filterable style="width: 70%;margin:0 5% 10px 0" v-model="buyer.receiver_street_id" placeholder="街道">
                        <el-option
                            v-for="item in townData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址：" prop="title">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="buyer.receiver_address"
                        autocomplete="off"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="buyerdialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="modifyReceive">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog
        title="修改物流信息"
        :visible.sync="changeTransportVisible"
        :modal="needMask"
        width="30%"
        >
        <el-form
        :model="changeTransportForm"
        ref="changeTransportForm"
        label-width="120px"
        label-position="right"
        
        >
            <el-form-item label="快递" prop="code" :rules="[simpleRule]">
                <el-select v-model="changeTransportForm.code" placeholder="快递公司">
                    <el-option
                        v-for="item in express"
                        :key="item.id"
                        :label="item.name"
                        :value="item.express_code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物流单号" prop="sn" :rules="[simpleRule]">
                <el-input v-model="changeTransportForm.sn"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeTransportVisible = false">取消</el-button>
            <el-button
                type="primary"
                @click="submitChangeTransport">
                确定
            </el-button>
        </div>
        </el-dialog>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="30%"><orderFollow /></RightSidePopup>
    </div>
</template>

<script>
    // 退款处理-服务单信息
    import orderFollow from './orderFollow';
    import logisticsInfo from './logisticsInfo';

    export default {
        name: "orderDetail",
        components: { orderFollow ,logisticsInfo},
        data() {
            return {
                needMask:true, // 作为组件引入Customer.vue 时 遮罩会引起bug
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                provinceData: [],
                cityData: [],
                countyData: [],
                townData: [],
                goodsData: [],
                id:this.$route.params.id,
                detailData: {
                    sale_records:[],
                },
                rghtPopupVisible: false,
                visible: false,
                previewImg: '',
                active: 1,
                multipleSelection:[],
                tableData:[],
                remark: '',
                closeForm: {
                    is_refund: 0,
                    password: '',
                    actual_fee:0
                },
                msg:{
                    title:'',
                    content:'',
                },
                invoice:{
                    receiver_name:'',
                    receiver_mobile:'',
                    receiver_province_id:'',
                    receiver_city_id:'',
                    receiver_district_id:'',
                    receiver_street_id:'',
                    receiver_address:'',
                },
                buyer:{
                    receiver_name:'',
                    receiver_mobile:'',
                    receiver_province_id:'',
                    receiver_city_id:'',
                    receiver_district_id:'',
                    receiver_street_id:'',
                    receiver_address:'',
                },
                dialogVisible:false,
                msgdialogVisible:false,
                closedialogVisible:false,
                invoicedialogVisible:false,
                buyerdialogVisible:false,
                invoiceTypeoptions:[
                    { value: '1', label: '不开发票'},
                    { value: '2', label: '电子发票'},
                    { value: '3', label: '纸质发票'},
                ],
                invoiceContentoptions:[
                    { value: '1', label: '日用品'},
                    { value: '2', label: '家居用品'},
                    { value: '3', label: '食品'},
                    { value: '4', label: '酒/饮料'},
                    { value: '5', label: '服饰'},
                    { value: '6', label: '化妆品'},
                ],
                provinceoptions:[],
                cityceoptions:[],
                areaceoptions:[],
                rules: {
                    remarks: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    growup: [
                        { required: true, message: '请输入', trigger: 'change' },
                    ],
                    title: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    invoiceType:[
                        { required: true, message: '请选择', trigger: 'blur' },
                    ],
                },
                looklogistics:false,

                changeTransportVisible:false,
                changeTransportForm:{
                    code:'',
                    sn:'',
                },
                express: [],
            }
        },
        watch: {
            'buyer.receiver_province_id'(val) {
                this.getCityData(val, 'city');
            },
            'buyer.receiver_city_id'(val) {
                this.getCityData(val, 'county');
            },
            'buyer.receiver_district_id'(val) {
                this.getCityData(val, 'town');
            },
            'detailData'(val){
                if (val.logistics_sn){
                    this.looklogistics=true;
                }
            },
            '$route' (to, from) {
                if (to.name === 'orderDetail') {
                    console.log(to.query)     // 在此调用函数
                    this.id=this.$route.params.id;
                    this.getOrderDetail();
                }
            }

        },
        created() {
            this.getOrderDetail();
            this.getCityData(0, 'province');
            this.getExpress()
        },
        methods:{
            changeTransport(){
                this.changeTransportVisible = true
            },
            submitChangeTransport(){
                 this.$refs.changeTransportForm.validate(async valid => {
                     const params = {
                         ...this.changeTransportForm,
                         id:this.id
                     }
                     await this.$api.order.deliverySave({ items:[params] });
                     this.changeTransportVisible = false
                     this.getOrderDetail();
                 })
            },
            // 获取所有启用状态快递
            async getExpress() {
                try {
                    const { data } = await this.$api.setting.getExpressList({ status: 10 });
                    this.express = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 修改收货人信息
            async modifyReceive() {
                try {
                    const params = Object.assign({}, this.buyer);
                    params.id = this.id;
                    await this.$api.order.modifyReceive(params);
                    this.resetForm('buyerForm');
                    this.buyerdialogVisible = false;
                    this.getOrderDetail();
                } catch (e) {
                }
            },
            async getCityData(pid, type) {
                try {
                    const { data } = await this.$api.common.getAreaList({ pid });
                    this[`${type}Data`] = data;
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 修改备注
            async orderRemark() {
                try {
                    await this.$api.order.orderRemark({ id: this.id, remark: this.remark });
                    this.dialogVisible = false;
                    this.getOrderDetail();
                } catch (e) {
                }
            },
            // 关闭订单
            async orderClose() {
                this.$refs.closeForm.validate(async valid => {
                    if(valid) {
                        const params = Object.assign({}, this.closeForm);
                        params.id = this.id;
                        if(params.is_refund!=0){
                            if(Number(this.detailData.actual_fee)<Number(params.actual_fee)){
                                this.$message.error('退款金额高于实付金额！');
                                return
                            }
                        }
                        if(params.is_refund==0){
                            delete params.actual_fee
                        }
                        try {
                            await this.$api.order.orderClose(params);
                            this.closedialogVisible = false;
                            this.getOrderDetail();
                        } catch (e) {
                        }
                    }
                })
            },
            async getOrderDetail(){
                if(!this.id)return
                try {
                    const { data } = await this.$api.order.orderDetail({ id: this.id });
                    this.detailData = data;
                    this.goodsData = data.orderExtend.map(val => {
                        return {
                            goods_thumb: val.goods_thumb,
                            goods_name: val.goods_name,
                            shop_price: val.shop_price,
                            goods_id: val.goods_id,
                            sku_properties_name: val.sku_properties_name,
                            nums: val.nums,
                            rowDotal: val.shop_price * val.nums,
                        }
                    })
                    this.changeTransportForm.code = data.express_code
                    this.changeTransportForm.sn = data.logistics_sn
                } catch (e) {
                    this.loading = false;
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            follow(){
                this.$router.push({
                    name: 'orderFollow',params:{id:''}
                });
            },
            look(){
                this.$router.push({ name: 'userDetail', params: { type:'read', id: this.detailData.uid,listType:this.detailData.user_type }});
            },
            openRemarks(){
                this.dialogVisible=true;
            },
            openMsg(){
                this.msgdialogVisible=true;
            },
            closeOrder(){
                this.closeForm.password = '';
                this.closedialogVisible=true;
                this.closeForm.actual_fee = this.detailData.actual_fee
            },  
            invoiceOpen(){
                this.invoicedialogVisible=true;
            },
            buyerOpen(){
                this.buyerdialogVisible=true;
                // 信息回填
                for(const key in this.buyer) {
                    this.buyer[key] = this.detailData[key];
                }
            }
        }
    }
</script>

<style scoped>
    .taskReward-content{border: 1px solid #E4E4E4;
        background: #fff;}
    .taskReward-content .title{padding: 10px;border-bottom:1px solid #E4E4E4; }
    .taskReward-content .f16{font-size: 16px}
    .taskReward-content .card{margin: 20px}
    /*表格*/
    .table-content{display: flex;flex-direction: column;border: 1px solid #E4E4E4;border-bottom: 0;margin-top: 15px}
    .table-content .table-row{display: flex;flex-direction: row;align-items: stretch;}
    .card .icon{color: #666;font-size: 18px}
    .table-content .table-row-col{display: flex;flex: 1;align-items: center;justify-content: center;
        flex-direction: column;
    }
    .table-row-col div:first-child{height: 45px;display: flex;width: 100%;align-items: center;justify-content: center;
        font-weight: bold;font-size: 15px;
    }
    .table-row-col div:last-child{display: flex;width: 100%;align-items: center;justify-content: center;padding: 10px;flex: 1;line-height: 20px}
    .table-row-col div{border-bottom: 1px solid #E4E4E4;min-height: 45px;border-right: 1px solid #E4E4E4}
    .table-content .table-row-col:last-child div{border-right: 0}
    .table-content .table-row-col img{width: 70px;height: 50px;background-size: cover}
    .table-content .table-row-col .for-div{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .mune-content{padding: 20px;margin: 20px 0;border: 1px solid #E4E4E4;display: flex;flex-direction: row;align-items: center;
        border-right: 0;border-left: 0;
    }
    .mune-content span:first-child{font-size: 16px;display: flex;flex: 1}
    .total{text-align: right;padding: 15px;font-size: 16px;border-bottom:1px solid #E4E4E4; }
    .totalNum{margin-left: 10px;color: #FC5855;font-weight: bold}
    .table-content .red{color: #FC5855}
</style>
