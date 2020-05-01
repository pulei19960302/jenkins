<template>
    <div class="taskReward-content">
        <p class="title">服务单信息</p>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">服务单号</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.return_sn | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">申请状态</div>
                        <div class="table-right">
                            <b class="s1">{{ detail.statusName | validVal }}</b>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">用户寄回单号</div>
                        <div class="table-right">
                            <b class="s1">{{ detail.logistics_sn | validVal }}</b>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">订单编号</div>
                        <div class="table-right">
                            <span class="s1">{{ orderInfo.order_sn }}</span>
                            <el-button @click="jumpTo(detail.order_id)" type="info" plain>查看商品信息</el-button>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">申请时间</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.created_at | validDateTime }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">用户账号</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.username | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                    <div class="table-left">联系人</div>
                    <div class="table-right">
                    <span class="s1">{{ orderInfo.receiver_name | validVal }}</span>
                    </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">联系电话</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.phone | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">退货原因</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.reason | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">问题描述</div>
                        <div class="table-right">
                            <span class="s1">{{ detail.description | validVal }}</span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">凭证照片</div>
                        <div class="table-right">
                            <span class="s1">
                                <img v-for="(item, index) in detail.imgs" :key="index" :src="item" @click="previewImg=item;visible = true">
                            </span>
                        </div>
                    </div>
                    <div class="table-row video-table">
                        <div class="table-left video-left">凭证视频</div>
                        <div class="table-right">
                            <video v-for="(item, index) in detail.video" :key="index" :src="item" controls="controls"></video>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="card">
            <div class="table-content">
                <div class="table-row">
                    <div class="row-4">订单支付</div>
                    <div class="row-4">{{orderInfo.actual_fee}}</div>
                    <div class="row-4">商品总数</div>
                    <div class="row-4">{{orderInfo.nums}}</div>
                </div>
                <div class="table-row">
                    <div class="row-4">商品退款</div>
                    <div class="row-4">{{detail.goods_fee }}</div>
                    <div class="row-4">{{detail.freight_name}}</div>
                    <div class="row-4">{{detail.freight_fee}}</div>
                </div>
                <div class="table-row">
                    <div class="row-4">补偿金额	 </div>
                    <div class="row-4">{{detail.add_fee}}</div>
                    <div class="row-4">售后总金额</div>
                    <div class="row-4">{{detail.money}}</div>
                </div>
            </div>
        </div>
        <el-form>
            <el-form-item :label="form.sale_type!=4?'请选择需处理的商品：':'需处理的商品'" label-width="140" :rules="[simpleRule]">
                <el-table ref="orderExtendTable"  border :data="orderExtend" @selection-change="handleSelectionChange">
                    <el-table-column
                        v-show="orderCanEdit"
                        fixed
                        width="50"
                        v-if="type!=4"
                        align="center"
                        type="selection">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="goods_name"
                            width="120"
                            label="商品标题">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sku_properties_name"
                            label="商品型号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sale_price"
                            label="价格">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="bought_count"
                            label="数量">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="退货数量">
                    <template slot-scope="scope">
                            <el-input-number v-if="type!=4" v-model="scope.row.nums" :step="1" :min="0" :max="+scope.row.max_return_count" label="退货数量"></el-input-number>
                            <span v-if="type==4">{{scope.row.max_return_count}}</span>
                    </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            </el-form>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">换货/退货/取消订单/补偿</div>
                        <div class="table-right">
                            <span class="s1">
                                <el-radio v-model="type" label="2">换货</el-radio>
                                <el-radio v-model="type" label="1">退货</el-radio>
                                <!--<el-radio v-model="type" label="0">退款</el-radio>-->
                                <!-- <el-radio v-model="type" label="4">取消订单</el-radio> -->
                                <el-radio v-model="type" label="5">补偿</el-radio>
                                <el-radio v-model="type" label="6">补发</el-radio>
                            </span>
                        </div>
                    </div>
                    <div class="table-row" v-show="type==0||type==1||type==4">
                        <div class="table-left">商品退款</div>
                        <div class="table-right">
                            <!--<span class="s1">{{ orderInfo.sale_fee }}</span>-->
                            <span class="s1"><el-input v-model="form.goods_fee"><template slot="append">元</template></el-input></span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">补偿金额</div>
                        <div class="table-right">
                            <span class="s1"><el-input v-model="form.add_fee"><template slot="append">元</template></el-input></span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">
                            <i style="color: red;">*</i>
                            是否是质量问题
                        </div>
                        <div class="table-right">
                            <span class="s1">
                                <el-radio v-model="form.is_quality" label="0">否</el-radio>
                                <el-radio v-model="form.is_quality" label="1">是</el-radio>
                            </span>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">运费类型</div>
                        <div class="table-right">
                            <span style="padding-left: 10px;">
                                <el-radio v-model="form.freight_type" label="0">无</el-radio>
                                <el-radio v-model="form.freight_type" label="1">补平台运费</el-radio>
                                <el-radio v-model="form.freight_type" label="2">退用户运费/运费险</el-radio>
                                <span v-show="form.freight_type == 1 || form.freight_type == 2">
                                    <el-input
                                        v-model="form.freight_fee"
                                        placeholder="请输入运费"
                                        style="display: inline-block;width: 100px;margin-left: 20px;">
                                    </el-input> 元
                                    <!-- <span style="padding:0 5px;">{{form.freight_fee}} 元</span> -->
                                </span>
                            </span>
                        </div>
                    </div>

                    <div class="table-row">
                        <div class="table-left">
                            <i style="color: red;">*</i>
                            是否扣除返利
                        </div>
                        <div class="table-right">
                            <span class="s1">
                                <el-radio v-model="form.is_rebate" label="0">否</el-radio>
                                <el-radio v-model="form.is_rebate" label="1">是</el-radio>
                            </span>
                        </div>
                    </div>
                    <div v-show="type == 1 || type == 2">
                        <!--<div class="table-row">-->
                            <!--<div class="table-left">-->
                                <!--收货人姓名-->
                            <!--</div>-->
                            <!--<div class="table-right">-->
                            <!--<span class="s1">-->
                                <!--<el-input v-model="form.receiver_name"></el-input>-->
                            <!--</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="table-row">-->
                            <!--<div class="table-left">-->
                                <!--联系电话-->
                            <!--</div>-->
                            <!--<div class="table-right">-->
                            <!--<span class="s1">-->
                                <!--<el-input style="width: 500px" v-model="form.receiver_mobile"></el-input>-->
                            <!--</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="table-row" v-if="detail.status == 1">-->
                            <!--<div class="table-left">-->
                                <!--所在区域</div>-->
                            <!--<div class="table-right" style="padding-left: 10px;">-->
                                <!--<el-select-->
                                    <!--clearable-->
                                    <!--filterable-->
                                    <!--style="width: 140px;margin-right: 10px;"-->
                                    <!--v-model="orderInfo.receiver_province_id"-->
                                    <!--placeholder="省">-->
                                    <!--<el-option-->
                                        <!--v-for="item in provinceData"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <!--<el-select-->
                                    <!--clearable-->
                                    <!--filterable-->
                                    <!--style="width: 140px;margin-right: 10px;"-->
                                    <!--v-model="orderInfo.receiver_city_id"-->
                                    <!--placeholder="市">-->
                                    <!--<el-option-->
                                        <!--v-for="item in cityData"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <!--<el-select-->
                                    <!--clearable-->
                                    <!--filterable-->
                                    <!--style="width: 140px;margin-right: 10px;"-->
                                    <!--v-model="orderInfo.receiver_district_id"-->
                                    <!--placeholder="区县">-->
                                    <!--<el-option-->
                                        <!--v-for="item in countyData"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                                <!--&lt;!&ndash;<el-select&ndash;&gt;-->
                                    <!--&lt;!&ndash;clearable&ndash;&gt;-->
                                    <!--&lt;!&ndash;filterable&ndash;&gt;-->
                                    <!--&lt;!&ndash;style="width: 140px;margin-right: 10px;"&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-model="orderInfo.receiver_street_id"&ndash;&gt;-->
                                    <!--&lt;!&ndash;placeholder="街道">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<el-option&ndash;&gt;-->
                                        <!--&lt;!&ndash;v-for="item in townData"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:label="item.name"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:value="item.id">&ndash;&gt;-->
                                    <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="table-row">
                            <div class="table-left">
                                仓库信息</div>
                            <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-input style="width: 500px" v-model="form.receiver_address" v-if="detail.status == 1" placeholder="收货人姓名   联系电话   详细地址"></el-input>
                                <span v-else>{{ detail.receiver_address }}</span>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div>
                <div class="table-content">
                    <div class="table-row">
                        <div class="table-left">
                            <i style="color: red;">*</i>
                            处理备注</div>
                        <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-input placeholder="备注" style="width: 500px" v-model="form.remark"></el-input></span>
                        </div>
                    </div>
                    <div v-if="(type == 2 && detail.status == 11)||(type == 6 && detail.status == 15)">
                        <div class="table-row">
                            <div class="table-left">
                                <i style="color: red;">*</i>
                                快递公司</div>
                            <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-select
                                    filterable
                                    clearable
                                    v-model="logistics_code">
                                    <el-option
                                        v-for="item in express"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.express_code">
                                    </el-option>
                                </el-select>
                            </span>
                            </div>
                        </div>
                        <div class="table-row">
                            <div class="table-left">
                                <i style="color: red;">*</i>
                                快递单号</div>
                            <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-input placeholder="备注" style="width: 500px" v-model="logistics_sn"></el-input></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
        title="寄回物流信息"
        :visible.sync="backTransportVisible"
        :modal="false"
        width="30%"
        >
        <el-form
        :model="backTransportForm"
        ref="backTransportForm"
        label-width="120px"
        label-position="right"
        
        >
            <el-form-item label="快递" prop="logistics_code" :rules="[simpleRule]">
                <el-select v-model="backTransportForm.logistics_code" placeholder="快递公司">
                    <el-option
                        v-for="item in express"
                        :key="item.id"
                        :label="item.name"
                        :value="item.express_code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物流单号" prop="logistics_sn" :rules="[simpleRule]">
                <el-input v-model="backTransportForm.logistics_sn"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="backTransportVisible = false">取消</el-button>
            <el-button
                type="primary"
                @click="submitbackTransport">
                确定
            </el-button>
        </div>
        </el-dialog>
        <div style="text-align: center;margin-bottom: 20px" >
            
            <template v-if="detail.status == 1 || detail.status == 10 || detail.status == 11|| detail.status == 15|| detail.status == 13">

                <el-button type="success" v-if="(type == 1 || type == 2) && detail.status == 10"  @click="handelBack" >{{ '填写寄回信息'}}</el-button>

                <el-button type="success" v-if="(type == 1 || type == 2) && (detail.status == 10 || detail.status == 13)"  @click="handelTake" >{{ '确认收货'}}</el-button>
                <el-button type="success" v-if="(type == 2 && detail.status == 11)||(type==3&&detail.status == 15)"  @click="handelSend" >{{ '确认寄出'}}</el-button>
                <el-button type="primary" @click="handelConfirm" v-if="detail.status == 1">
                    <span v-if="type == 0 || type == 4">确认退款</span>
                    <span v-if="type == 1">确认退货</span>
                    <span v-if="type == 2">确认换货</span>
                    <span v-if="type == 5">确认补偿</span>
                    <span v-if="type == 6">确认补发</span>
                </el-button>
                    
            </template>

                <!-- <el-button type="success"  @click="handelBack" >{{ '填写寄回信息'}}</el-button> -->


            <el-button type="danger" @click="handelDeny" v-if="detail.status != 12">
                <!-- <span v-if="type == 0 || type == 4">拒绝退款</span>
                <span v-if="type == 1">拒绝退货</span>
                <span v-if="type == 2">拒绝换货</span> -->
                <span>关闭售后</span>
            </el-button>

        </div>

        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
import Big from 'big.js';
    // 售后申请处理详情
    export default {
        name: "afterSaleApplicationDetail",
        data() {
            return {
                provinceData: [],
                express: [],
                cityData: [],
                countyData: [],
                townData: [],

                form: {
                    add_fee: '',
                    is_quality: '',
                    freight_type: '',
                    // receiver_name: '',
                    // receiver_mobile: '',
                    remark: '',
                    freight_fee:'',
                    is_rebate:'',
                    goods_fee:'',
                },
                visible: false,
                previewImg: '',
                detail: {},
                goodsInfo: {},
                orderExtend: [],
                orderInfo: {},
                order_id: null,
                type: '',
                id: null,
                logistics_sn: '',
                logistics_code: '',
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                goodsChoosed:[],

                backTransportForm:{
                    logistics_code:'',
                    logistics_sn:'',
                },
                backTransportVisible:false,
            }
        },
        computed:{
            orderCanEdit(){
                // return this.detail.status == 1
                return true  // 暂不控制
            }
        },
        watch: {
            'orderInfo.receiver_province_id'(val) {
                this.getCityData(val, 'city');
            },
            'orderInfo.receiver_city_id'(val) {
                this.getCityData(val, 'county');
            },
            // 'orderInfo.receiver_district_id'(val) {
            //     this.getCityData(val, 'town');
            // }
            //是否是质量问题
            'form.is_quality':{
                handler(val){
                    switch(val){
                        case '0':  
                            if(this.form.freight_type==2){
                                this.calculateFreight_fee()
                            }
                            break;
                        case '1':   
                            if(this.form.freight_type==2){
                                this.calculateFreight_fee()
                            }
                            break;
                    }
                },
                immediate:true
            },
            'form.freight_type'(v){
                switch(v){
                    case '0':
                        this.form.freight_fee = 0
                        break
                    case '1':
                        this.form.freight_fee = 0
                        break
                    case '2':
                        this.calculateFreight_fee()
                        break
                }
            },
            type(v){
                if(v==1 || v==4){
                    this.form.is_rebate = '1'
                }
                if(v==2 || v==6 || v==5){
                    this.form.is_rebate = '0'
                }
                // 取消订单则全选商品 计算总价
                if(v==4){
                    this.calculatePrice(this.orderExtend,'max_return_count')
                }else{
                    this.calculatePrice(this.goodsChoosed,'nums')
                }
            },
            goodsChoosed:{
                handler(v){
                    this.calculatePrice(v,'nums')
                },
                deep:true
            }
        },
        created() {
            this.getCityData(0, 'province');
            this.getExpress();
        },
        methods: {
            // 帮用户填写寄回信息
            handelBack(){
                this.backTransportVisible = true
            },
            submitbackTransport(){
                this.$refs.backTransportForm.validate(async valid => {
                    if(valid){
                        const params = {
                            ...this.backTransportForm,
                            sale_id: this.id
                        }
                        this.$api.order.saleHelpBack(params).then(()=>{
                            this.backTransportVisible = false;
                        })
                    }
  
                 })
            },
            calculatePrice(v,key){
                if(v.length===0){
                    return this.form.goods_fee = '0'
                }
                const calculateRes = v.map(it=>{
                    return String(Big(String(it.sale_price)).mul(String(it[key])))
                }).reduce((a,b)=>String(Big(a).plus(b)))
                // 最大值是 实际支付-运费险
                const max_return_fee = String(Big(String(this.orderInfo.actual_fee)).minus(String(this.orderInfo.insurance_fee)))
                this.form.goods_fee = +calculateRes>+max_return_fee?+max_return_fee:+calculateRes
            },
            calculateFreight_fee(){
                if(this.form.is_quality==0){//非质量问题
                    this.form.freight_fee = String(Big(+this.orderInfo.freight_fee).plus(+this.orderInfo.compensate))
                    console.log(+this.orderInfo.freight_fee,+this.orderInfo.compensate)
                }
                if(this.form.is_quality==1){//质量问题
                    this.form.freight_fee = String(Big(+this.orderInfo.freight_fee).plus(+this.orderInfo.compensate).plus(+this.orderInfo.insurance_fee))
                    console.log(+this.orderInfo.freight_fee,+this.orderInfo.compensate)
                }
            },
            handleSelectionChange(v){
                this.goodsChoosed = v
            },
            async handelSend() {
                if(!this.logistics_code) {
                    this.$message.error('请选择快递公司');
                    return;
                } else if(!this.logistics_sn) {
                    this.$message.error('请填写快递单号');
                    return;
                }
                const params = {
                    sale_id: this.id,
                    logistics_sn: this.logistics_sn,
                    logistics_code: this.logistics_code
                }
                try {
                    await this.$api.order.saleSend(params);
                    this.$emit('successCBK');
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 获取所有启用状态快递
            async getExpress() {
                try {
                    const { data } = await this.$api.setting.getExpressList({ status: 1 });
                    this.express = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 级联数据
            async getCityData(pid, type) {
                try {
                    const {data} = await this.$api.common.getAreaList({pid});
                    this[`${type}Data`] = data;
                } catch (e) {
                    throw new Error(e);
                }
            },
            jumpTo(id) {
                let url = window.location.href;
                let tar = url.indexOf('#')
                url=url.slice(0,tar);
                url+='#/Order/order/orderDetail/'+id;
                window.open(url)
            },
            // 售后单详情
            async getDetailData(id) {
                for(const key in this.form) {
                    this.form[key] = '';
                }
                this.goodsChoosed = []
                this.id = id;
                try {
                    const { data } = await this.$api.order.saleDetail({id});
                    const { detail, goodsInfo, orderExtend, orderInfo } = data;
                    this.detail = detail;
                    // 回显已有信息
                    for(const key in this.form) {
                        this.form[key] = `${detail[key]}`;
                    }
                    this.goodsInfo = goodsInfo;
                    orderExtend.forEach(it=>{
                        it.max_return_count = (+it.max_return_count)+(+it.nums);
                    });

                    // 用户寄回信息
                    this.backTransportForm.logistics_sn = detail.logistics_sn
                    this.backTransportForm.logistics_code = detail.logistics_code

                    this.orderExtend = orderExtend

                    this.$nextTick(()=>{
                        this.orderExtend.forEach(it=>{
                            if(+it.nums>0){
                                this.$refs.orderExtendTable.toggleRowSelection(it,true)
                            }
                        })
                        if(+detail.freight_fee){ //优先填写客服输入的运费
                            this.form.freight_fee = detail.freight_fee
                        }
                        this.$nextTick(()=>{
                            if(+detail.goods_fee){
                                this.form.goods_fee = detail.goods_fee //优先填写客服输入的退款
                            }
                        })
                    })



 
                    this.orderInfo = orderInfo;
                    this.type = `${detail.type}`;

                    //
                    if(detail.logistics_code) this.logistics_code = detail.logistics_code;
                    if(detail.logistics_sn) this.logistics_sn = detail.logistics_sn;
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 确认退货/退款
            async handelConfirm() {
                try {
                    const params = Object.assign({}, this.form);
                    if(this.type == 1 || this.type == 2) {
                        const requiredFields = [
                            params.is_quality,
                            params.remark,
                            // params.receiver_name,
                            // params.receiver_mobile,
                            // params.receiver_address
                        ];
                        /* 此处直接发送中文给后台保存即可 */
                        const areaArr = [];
                        // if(this.orderInfo.receiver_province_id) {
                        //     areaArr[0] = this.commonFilter('provinceData', 'receiver_province_id');
                        // }
                        // else {
                        //     this.$message.error('请选择省份');
                        //     return;
                        // }
                        // if(this.orderInfo.receiver_city_id) {
                        //     areaArr[1] = this.commonFilter('cityData', 'receiver_city_id');
                        // }
                        // else {
                        //     this.$message.error('请选择市');
                        //     return;
                        // }
                        // if(this.orderInfo.receiver_district_id) {
                        //     areaArr[2] = this.commonFilter('countyData', 'receiver_district_id');
                        // }
                        // else {
                        //     this.$message.error('请选择区县');
                        //     return;
                        // }
                        // if(this.orderInfo.receiver_street_id) {
                        //     areaArr[3] = this.commonFilter('townData', 'receiver_street_id');
                        // }
                        // if(this.orderInfo.receiver_province_id!=''){
                        //     if(params.receiver_address){
                        //         params.receiver_address = `${areaArr.join('-')}-${params.receiver_address}`;
                        //     }else {
                        //         params.receiver_address = `${areaArr.join('-')}`;
                        //     }
                        // }else {
                        //     params.receiver_address='';
                        // }
                        if(!requiredFields.every(val => val)) {
                            this.$message.error('请检查必填信息是否完整');
                            return;
                        }
                    }
                    params.sale_id = this.id;
                    params.type = this.type;

                    if(this.type==4){
                        // 取消
                        params.return_sku_list = this.orderExtend.map(it=>({
                            sku_id:it.sku_id,
                            count:it.max_return_count
                        }))
                    }else{
                        params.return_sku_list = this.goodsChoosed.map(it=>({
                            sku_id:it.sku_id,
                            count:it.nums
                        }))
                    }

                    if(params.return_sku_list.length===0){
                        this.$message.error('请选择商品');
                        return;
                    }

                    // 过滤 0
                    params.return_sku_list = params.return_sku_list.filter(it=>{
                        return it.count!=0
                    })

                    await this.$api.order.saleEdit(params);
                    this.$emit('successCBK');
                } catch (e) {
                    throw new Error(e);
                }
            },
            commonFilter(allData, id) {
                return this[allData].filter(val => val.id === this.orderInfo[id])[0].name;
            },
            // 拒绝退货/退款
            async handelDeny() {
                try {
                    const params = {
                        sale_id: this.id,
                        is_quality: this.form.is_quality,
                        remark: this.form.remark
                    }
                    if(params.is_quality === undefined) {
                        this.$message.error('请选择是否是质量问题');
                        return;
                    } else if(!params.remark) {
                        this.$message.error('请填写备注');
                        return;
                    }
                    await this.$api.order.saleDeny(params);
                    this.$emit('successCBK');
                } catch (e) {
                    throw new Error(e);
                }
            },
            closeOrder(){
                this.$api.order.saleClose({
                    sale_id:this.id
                }).then(()=>{
                    this.$emit('successCBK');
                })
            },
            // 确认收货
            async handelTake() {
                try {
                    const params = {
                        sale_id: this.id
                    }
                    await this.$api.order.refundTake(params);
                    this.$emit('successCBK');
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 是否展示确认收货
            showSureGet(){
                if(this.type!=1 && this.type!=2){
                    return false
                }
                if(this.detail.status == 10 || this.detail.status == 11||this.detail.status == 13 || this.detail.status == 15){
                    return true
                }
                return false
            }
        }
    }
</script>

<style scoped>
    .taskReward-content {
        background: #fff;
    }

    .taskReward-content .title {
        padding: 17px;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 1px solid;
    }

    .taskReward-content .card {
        margin: 20px
    }

    /*表格*/
    .table-content {
        display: flex;
        flex-direction: column;
        border: 1px solid #E4E4E4;
        border-bottom: 0;
        margin-top: 15px
    }

    .table-content .table-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #E4E4E4;
        min-height: 50px
    }

    .table-content .table-left {
        padding: 0 10px;
        width: 180px;
        text-align: right
    }

    .table-content .table-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 20px 10px 0;
        border-left: 1px solid #E4E4E4;
        min-height: 50px
    }

    .table-content .table-right .s1 {
        width: 150px;
        display: flex;
        margin: 0 10px;
        text-align: left;
    }

    .table-row img {
        width: 75px;
        height: 55px;
        background-size: cover;
        margin-right: 10px
    }
    .table-row .row-4{
        display: flex;
        flex: 1;
        justify-content: center;
        border-right: 1px solid #E4E4E4;
        height: 50px;
        align-items: center;
    }
    .table-row .row-4:last-child{border-right: 0}
    .video-left{
        display: flex;
        justify-content: flex-end;

    }
    .video-table .table-right{
        display: flex;
        flex-direction: column;
    }
    .video-table .table-right video{
        height: 150px;
        width: 300px;
        margin: 10px 0 0 10px;
    }
</style>
