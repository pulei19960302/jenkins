<template>
    <div class="customer">
        <section v-show="haveOrder">
            <div class="user-info border-bottom">
                <img v-bind:src="avatar" />
                <p>
                    <span>{{username}}</span>
                    <span>{{phone}}</span>
                </p>
            </div>
            <div class="sale-info border-bottom flex">
                <el-input v-model="inputOrder" placeholder="请输入订单编号"></el-input>
                <el-button type="primary" @click="getOrder(inputOrder)">查询</el-button>
            </div>
            <div v-for="item in orderInfo.orderSale" :key="item.id" class="sale-info border-bottom flex" @click.stop="handleOrder(item)">
                <div>
                    <p><span>工单编号：</span><span>{{item.return_sn}}</span></p>
                    <p><span>工单状态：</span><span>{{item.status_name}}</span></p>
                    <p><span>售后类型：</span><span>{{item.type_name}}</span></p>
                </div>
                <i class="el-icon-arrow-right"></i>
            </div>
            <section v-if="orderInfo && orderInfo.order_sn!=''">
                <div class="sale-info border-bottom flex" @click.stop="jumpTo(orderInfo.id)">
                    <div>
                        <p><span>订单编号：</span><span>{{orderInfo.order_sn}}</span></p>
                        <p><span>订单状态：</span><span>{{orderInfo.status_name}}</span></p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="sale-info border-bottom flex" @click.stop="expressCheck">
                    <div>
                        <p><span>物流单号：</span><span>{{orderInfo.logistics_sn}}</span></p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </div>
                <div class="sale-info border-bottom">
                    <p><span>总价：</span><span>{{orderInfo.actual_fee}}</span></p>
                    <p><span>收货人：</span><span>{{orderInfo.receiver_name}}</span></p>
                    <p><span>收货人电话：</span><span>{{orderInfo.receiver_mobile}}</span></p> <br>
                    <p><span>供货商：</span><span>{{orderInfo.supplier_name}}</span></p>
                    <p><span>运费险：</span><span>{{orderInfo.insurance_fee}}</span></p>
                    <!--<p><span>供货商电话：</span><span>13699990000****8625</span></p>-->
                </div>
                <div class="product-info border-bottom"   v-for="item in orderInfo.orderExtend" :key="item.id">
                    <img v-bind:src="item.goods_thumb" @click="handlePreviewImg(item.goods_thumb)"/>
                    <p>
                        <span>{{item.goods_name}}</span>
                        <span>{{item.sku_properties_name}}</span>
                        <span>数量：{{item.nums}}</span>
                    </p>
                </div>
            </section>
        </section>
        <div class="btns">
            <el-button type="primary" plain @click="showAddWorkOrder(1)" v-if="orderExtend.length!=0">创建工单</el-button>
            <!-- <el-button type="primary" @click.stop="handleOrder"
                       v-if="orderInfo.orderSale!=''&&
                       (orderInfo.orderSale.status==1
                       ||orderInfo.orderSale.status==10
                       ||orderInfo.orderSale.status==15
                       ||orderInfo.orderSale.status==11
                       )"
            >处理</el-button>
            <el-button type="primary" @click.stop="handleOrder"
                       v-if="orderInfo.orderSale!=''&&orderInfo.orderSale.status==12"
            >查看</el-button> -->
            <el-button type="primary" plain @click="showAddWorkOrder(2)" v-if="orderExtend.length!=0">创建补偿</el-button>
        </div>

        <!--商品查询-->
        <section v-if="shouwProdect">
            <div class="sale-info border-bottom flex">
                <el-input v-model="inputProduct" placeholder="请输入商品名称"></el-input>
                <el-button type="primary" @click="getProduct()">查询</el-button>
            </div>
            <div class="product-info border-bottom"   v-for="item in productList" :key="item.id" @click.stop="proDetail(item)">
                <img v-bind:src="item.thumb" @click.stop="handlePreviewImg(item.thumb)"/>
                <p>
                    <span>{{item.title}}</span>
                    <span>价格：{{item.shop_price}}</span>
                    <span>库存：{{item.stock}}</span>
                </p>
            </div>
            <RightSidePopup :visible.sync="rghtProductVisible" width="60%"><ProductDetail :detailData="detailData"/></RightSidePopup>
        </section>

        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%">
            <afterSaleApplicationDetail ref="detail" @successCBK="successCallback"/>
        </RightSidePopup>


        <RightSidePopup :visible.sync="rghtPopupVisibleExpress" width="60%" class="express-check">
            <!--<express-check ref="detail" @successCBK="successCallback" :logistics_sn="orderInfo.logistics_sn"/>-->
            <express-check ref="detailExpress" @successCBK="successCallback" :logistics_sn="logistics_snSerch"/>
        </RightSidePopup>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>

        <el-dialog
            title="创建工单"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                label-position="right">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="售后原因：" prop="reason" :rules="[simpleRule]">
                            <el-select v-model="form.reason" style="width: 70%;">
                                <el-option
                                    v-for="item in options1"
                                    :key="item.id"
                                    :label="item.content"
                                    :value="item.content">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="售后类型：" prop="sale_type" :rules="[simpleRule]">
                            <el-select :disabled="showCreateRecoup" v-model="form.sale_type" style="width: 70%;">
                                <el-option
                                    v-for="item in options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系人：" prop="username">
                            <el-input
                                v-model="form.username"
                                autocomplete="off"
                                style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话：" prop="phone">
                            <el-input
                                v-model="form.phone"
                                autocomplete="off"
                                style="width: 70%;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="问题描述：">
                    <el-input
                        type="textarea"
                        :rows="4"
                        v-model="form.description"
                        autocomplete="off"
                        style="width: 70%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传图片：">
                    <li
                        v-for="(item, index) in form.imgs"
                        :key="index"
                        :style="{ backgroundImage: `url(${item})` }"
                        class="imgs"
                        @click="handlePreview(item)">
                        <i class="el-icon-circle-close-outline" @click.stop="removeImgs('index')"></i>
                    </li>
                    <FileUpload @successUploadCBK="getsuccessUpload($event, 'imgs')" width="100px" height="100px" :limit="5" isBotton></FileUpload>
                </el-form-item>
                <el-form-item label="上传视频：">
                    <li
                        v-for="(item, index) in form.video"
                        :key="index"
                        class="videos">
                        <video :src="item" controls preload v-if="item"></video>
                        <i class="el-icon-circle-close-outline" @click.stop="removeMinorVideo('index')"></i>
                    </li>
                    <FileUpload @successUploadCBK="getsuccessUpload($event, 'video')" width="100px" height="100px" :limit="2" isVideo isBotton></FileUpload>
                </el-form-item>
                <el-form-item v-if="!showCreateRecoup" :label="form.sale_type!=4?'请选择需处理的商品：':'需处理的商品'" label-width="150" :rules="[simpleRule]">
                    <el-table  border :data="orderExtend"  @selection-change="handleSelectionChange">
                        <el-table-column
                            fixed
                            width="50"
                            align="center"
                            v-if="form.sale_type!=4"
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
                                width="100"
                                prop="nums"
                                label="数量">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                width="200"
                                label="退货数量">
                        <template slot-scope="scope">
                             <el-input-number v-if="form.sale_type!=4" v-model="scope.row.now_count" :step="1" :min="0" :max="+scope.row.max_return_count" label="退货数量"></el-input-number>
                             <span v-if="form.sale_type==4">{{scope.row.max_return_count}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <div class="card">
            <div>
                <div class="table-content">
                    <!-- <div class="table-row">
                        <div class="table-left">换货/退货/取消订单/补偿</div>
                        <div class="table-right">
                            <span class="s1">
                                <el-radio v-model="type" label="2">换货</el-radio>
                                <el-radio v-model="type" label="1">退货</el-radio>
                                <el-radio v-model="type" label="4">取消订单</el-radio>
                                <el-radio v-model="type" label="5">补偿</el-radio>
                                <el-radio v-model="type" label="3">物流</el-radio>
                            </span>
                        </div>
                    </div> -->
                    <div class="table-row" v-show="form.sale_type==0||form.sale_type==1||form.sale_type==4">
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
                    <div v-show="form.sale_type == 1 || form.sale_type == 2">
                        <div class="table-row">
                            <div class="table-left">
                                仓库信息</div>
                            <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-input style="width: 500px" v-model="form.receiver_address" v-if="orderInfo.status == 1" placeholder="收货人姓名   联系电话   详细地址"></el-input>
                                <span v-else>{{ orderInfo.receiver_address }}</span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="table-row">
                        <div class="table-left">
                            <i style="color: red;">*</i>
                            处理备注</div>
                        <div class="table-right">
                            <span class="s1" style="width: 500px">
                                <el-input placeholder="备注" style="width: 500px" v-model="form.remark"></el-input></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;isEdit = false;resetForm();">取消</el-button>
                <el-button
                    type="primary"
                    @click="addOrder">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <RightSidePopup :visible.sync="orderDetailVisible" width="70%">
            <OrderDetail ref="orderDetail"></OrderDetail>
        </RightSidePopup>
    </div>
</template>

<script>
    import afterSaleApplicationDetail from '../../../order/afterSaleApplicationDetail';
    import ExpressCheck from './ExpressCheck';
    import ProductDetail from '../../../product/productManage/components/ProductDetail';
    import OrderDetail from '@/views/order/orderDetail';
    import Big from 'big.js';
    
    const ORDER_INFO = {
        order_sn:'',
        status_name:"",
        logistics_sn:'',
        actual_fee:"",
        receiver_name:'',
        receiver_mobile:'',
        supplier_name:'',
        orderExtend:[],
        insurance_fee:'',
        // orderSale:{
        //     return_sn:'',
        // }
        orderSale:[]
    }
    const FORM_ITEM = {
        sale_type: '',
        reason: '',
        description: '',
        username: '',
        phone: '',
        imgs:[],
        video:[],
        order_id:'',
        uid:'',
        freight_fee:'',
        is_quality:'0',
        goods_fee:'',
        add_fee:'',
        freight_type:'0',
        is_rebate:'',
        receiver_address:'',
        remark:''
    }
    export default {
        name: 'customer',
        props: {
            userObj:[Object],
            refresh:[Number],
        },
        components: { afterSaleApplicationDetail, ExpressCheck ,ProductDetail,OrderDetail},
        data() {
            return {
                visible: false,
                showCreateRecoup:false, //单纯创建补偿
                dialogVisible: false,
                orderDetailVisible:false, // 查看订单详情
                previewImg: '',
                rghtPopupVisible: false,
                rghtProductVisible: false,
                rghtPopupVisibleExpress: false,
                options1:[],
                options2:[],
                loading: false,
                username:'',
                phone:'',
                avatar:'',
                haveOrder:false,
                orderInfo:JSON.parse(JSON.stringify(ORDER_INFO)),
                inputOrder:'',
                uid:'',
                order_id:'',
                form: JSON.parse(JSON.stringify(FORM_ITEM)),
                rules: {},
                simpleRule: { required: true, message: '必填项', trigger: 'change' },
                videos: [],
                inputProduct:'',
                goods_id:"",
                productList:[],
                shouwProdect:false,
                logistics_snSerch:'',
                orderExtend:[], // 需要退货的商品
                goodsChoosed:[]
            }
        },
        watch: {
            'userObj'(val){
                console.log(val)
                this.username = val.username;
                this.avatar = val.avatar;
                this.haveOrder = true;
                this.uid=val.id;
                this.order_id=val.order_id;
                this.goodsChoosed = []
                this.getOrder()
                this.getOrderExtend()
            },
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
            'form.sale_type'(v){
                if(v==1 || v==4){
                    this.form.is_rebate = '1'
                }
                if(v==2 || v==3 || v==5){
                    this.form.is_rebate = '0'
                }
                // 取消订单则全选商品 计算总价
                if(v==4){
                    this.calculatePrice(this.orderExtend,'max_return_count')
                }else{
                    this.calculatePrice(this.goodsChoosed,'now_count')
                }
            },
            goodsChoosed:{
                handler(v){
                    this.calculatePrice(v,'now_count')
                },
                deep:true
            }
        },
        created() {
            this.getSaleinfo();
        },
        mounted() {
        },
        methods: {
            calculatePrice(v,key){
                if(v.length===0){
                    return this.form.goods_fee = '0'
                }
                this.form.goods_fee = v.map(it=>{
                    return String(Big(String(it.sale_price)).mul(String(it[key])))
                }).reduce((a,b)=>String(Big(a).plus(b)))
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
            async showAddWorkOrder(type){
                this.dialogVisible = true
                if(type===1){
                    this.showCreateRecoup = false
                    this.form.sale_type = ''
                    this.$nextTick(()=>{
                        this.orderExtend = JSON.parse(JSON.stringify(this.orderExtend))
                    })
                }
                if(type===2){
                    this.showCreateRecoup = true
                    this.form.sale_type = 5
                }
            },
            async getOrder(keywords){
                this.form = JSON.parse(JSON.stringify(FORM_ITEM))
                const { data } = await this.$api.order.orderinfo({uid:this.uid,order_id:this.order_id,keywords:keywords});
                if(data.order_data){ 
                    this.orderInfo=data.order_data;
                }else{
                    this.orderInfo = JSON.parse(JSON.stringify(ORDER_INFO))
                }
                this.phone=data.user_info.phone;
                this.order_id=data.order_data.id;
            },
            async getOrderExtend(){
                this.orderExtend = []
                const { data } = await this.$api.order.getOrderExtend({order_id:this.order_id})
                if(data.length){
                    data.forEach(it=>{
                        it.now_count = 0
                    })
                    this.orderExtend = data
                }else{
                    this.orderExtend = []
                }
            },
            async getSaleinfo(keywords){
                const { data } = await this.$api.service.saleinfo();
                this.options1=data.reason;
                this.options2=data.sale_type;
            },
            async getProduct(){
                const {data} = await this.$api.product.getGoodsList({
                    keywords:this.inputProduct,
                    goods_id:this.goods_id,
                    pageSize: 50,
                    page: 1
                });
                this.productList=data.list.items;
            },
            proDetail(val){
                this.rghtProductVisible=true;
                this.detailData=val;
                console.log(val)
            },
            resetForm() {
                this.$refs.form.resetFields();
            },
            getsuccessUpload(val, type) {
                console.log(val[0])
                // this.form.video = val;
                switch (type) {
                    case 'imgs':
                        this.form.imgs.push(val[0]);
                        break;
                    case 'video':
                        this.form.video.push(val[0]);
                        break;
                    default:
                }
            },
            checkParams(param){
                const map = ['is_quality','is_rebate','remark']
                let flag = true
                map.forEach(it=>{
                    if(param[it]!==0 && !param[it]){
                        flag = false
                    }
                })
                return flag
            },
            addOrder(){
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                       let obj={...this.form};
                       if(this.orderInfo.status!=1){
                           delete obj.receiver_address
                       }
                       obj.order_id=this.order_id;
                       obj.uid=this.uid;
                       obj.session_id = this.userObj.session_id;


                       if(!this.showCreateRecoup){

                            if(this.form.sale_type==4){
                                    // 取消
                                    obj.return_sku_list = this.orderExtend.map(it=>({
                                        sku_id:it.sku_id,
                                        count:it.max_return_count
                                    }))
                            }else{
                                    obj.return_sku_list = this.goodsChoosed.map(it=>({
                                        sku_id:it.sku_id,
                                        count:it.now_count
                                    }))
                            }

                            if(obj.return_sku_list.length===0){
                                this.$message.error('请选择商品');
                                return;
                            }

                            obj.return_sku_list = obj.return_sku_list.filter(it=>it.count!=0)

                       }



                       if(!this.checkParams(obj)){
                           this.$message.error('请检查必填信息是否完整');
                           return;
                       }

                       if(!this.showCreateRecoup){
                           await this.$api.service.apply(obj);
                       }else{
                           await this.$api.service.applyMoney(obj);
                       }

                        this.refresh=this.refresh+1;
                        this.$emit('update:refresh', this.refresh);
                       this.getOrder();
                       this.getOrderExtend()
                       this.dialogVisible=false;
                       this.resetForm();
                    }
                })
            },
            successUpload(val, name) {
                this[name] = [{ name, url: val[0] }];
            },
            removeMinorVideo(index) {
                this.form.video.splice(index,1)
            },
            removeImgs(index) {
                this.form.imgs.splice(index,1)
            },
            jumpTo(id) {
               
                // let url = window.location.href;
                // let tar = url.indexOf('#')
                // url=url.slice(0,tar);
                // url+='#/Order/order/orderDetail/'+id;
                // window.open(url)
                this.orderDetailVisible = true
                this.$refs.orderDetail.needMask = false
                this.$refs.orderDetail.id = id;
                this.$refs.orderDetail.getOrderDetail();
            },
            handleOrder(item) {
                this.rghtPopupVisible = true;
                this.$refs.detail.getDetailData(item.id);
            },
            successCallback() {
                this.getOrder();
                this.getOrderExtend();
                this.rghtPopupVisible = false;
                this.refresh=this.refresh+1;
                this.$emit('update:refresh', this.refresh);
            },
            handlePreviewImg(img) {
                this.visible = true;
                this.previewImg = img;
            },
            expressCheck() {
                this.rghtPopupVisibleExpress = true;
                this.logistics_snSerch =this.orderInfo.logistics_sn;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../styles/variables";
    .customer {
        color: #333;
        .border-bottom {
            border-bottom: 2px solid #eef6fe;
        }
        @mixin base-flex {
            display: flex;
            align-items: center;
        }
        .flex {
            @include base-flex;
            justify-content: space-between;
            i {
                cursor: pointer;
            }
        }
        .user-info {
            @include base-flex;
            padding: 10px;
            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 10px;
            }
            span {
                display: block;
                &:first-child {
                    margin-bottom: 6px;
                    font-weight: 400;
                }
                &:last-child {
                    color: #c0c4cc;
                    font-size: 12px;
                }
            }
        }
        .sale-info {
            padding: 10px;
            p {
                line-height: 1.5;
            }
        }
        .product-info {
            @include base-flex;
            padding: 10px;
            img {
                width: 60px;
                margin-right: 10px;
            }
            span {
                display: block;
                &:first-child {
                    margin-bottom: 6px;
                    font-weight: 400;
                }
            }
        }
        .btns {
            text-align: center;
            margin-top: 40px;
            margin-bottom:10px;
        }
        .express-check {
            /deep/ .content {
                height: 100%;
            }
        }
        .videos{
            position: relative;
            i{
                position: absolute;
                top: 0;
            }
        }
        .videos video{
            width: 300px;
            height: 150px;
        }
        .imgs {
            width: 60px;
            height: 60px;
            background-size: 100% 100%;
            display: inline-block;
            margin-right: 10px;
            position: relative;
            i{
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
    .file-upload {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        position: relative;
        .el-icon-circle-close-outline{
            position: absolute;
            right: 10px;
            top: 0;
        }
    }
</style>
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
