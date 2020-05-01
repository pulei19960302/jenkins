<template>
    <div style="min-height: calc(100vh - 135px); background: #fff; border-radius: 4px;">
        <!--搜索-->
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export :exportOptions="exportOptions" :query="query" :url="$api.order.delivery.export"
                    v-permission="[$api.order.delivery.export]"/>
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <span>{{ count }}</span> 个 总价 <span>{{total_actual_money}}</span> 元
        </div>

        <div style="padding: 0 20px 20px 20px; background: #fff; border-radius: 4px;">
            <!-- 卡片式表格 -->
            <card-table
                :loading="isCardTableLoading"
                :cardListData="listData.items"
                rowKey="id"
                :showCardFooter="false"
            >
                <!-- 表头 -->
                <template #thead>
                    <card-table-th :width="220">商品信息</card-table-th>
                    <card-table-th :width="140">单价/数量</card-table-th>
                    <card-table-th :width="120">实付金额</card-table-th>
                    <card-table-th :width="110">订单状态</card-table-th>
                    <card-table-th :width="110">供应商/ID</card-table-th>
                    <card-table-th :width="110">收货地址</card-table-th>
                    <card-table-th :width="135">快递及单号</card-table-th>
                    <card-table-th :width="114">导出记录</card-table-th>
                </template>

                <!-- 用于循环渲染的 卡片头 -->
                <template #cardheader="{ cardRowData }">
                    <span class="fcgrey">订单号：</span><span class="mr20">{{ cardRowData.order_sn }}</span>
                    <span class="fcgrey">提交时间：</span><span class="mr20">{{ cardRowData.created_at }}</span>
                    <span class="fcgrey">用户昵称：</span><span class="mr20">{{ cardRowData.user_nickname }}</span>
                    <span class="fcgrey">用户ID：</span><span>{{ cardRowData.user_id }}</span>
                    <span class="fr">
                    <!-- <span class="fcgrey">订单来源：</span>
                    <span class="mr6">{{ cardRowData.from_name }}</span> -->
                    <el-tooltip v-if="cardRowData.remark" effect="light" placement="bottom-end" :content="'卖家备注：' + cardRowData.remark" offset="8">
                        <i class="el-icon-document fs16 fcred"/>
                    </el-tooltip>
                </span>
                </template>

                <!-- 用于循环渲染的 卡片主体区域 -->
                <template #cardRow="{ cardRowData }">
                    <!-- 商品信息、单价/数量 -->
                    <card-table-td :width="320">
                        <div class="cardTableGood" v-for="goodData in cardRowData.goods_list" :key="goodData.goods_id">
                            <img class="cardTableGoodImg" :src="goodData.goods_thumb"/>
                            <div class="flex1 lh18 fs12">
                                <div class="dpflex">
                                    <div class="flex1 fcblue mr8 mb8">{{ goodData.goods_title }}</div><!-- 商品名称 -->
                                    <div class="taright fcgrey width80">¥{{ goodData.shop_price }}</div><!-- 商品单价 -->
                                </div>
                                <div class="dpflex">
                                    <div class="flex1 mr8"><!-- 商品规格、ID -->
                                        <p class="fcgray">{{ goodData.sku_properties_name }}</p>
                                        <p class="fcgray">商品ID：{{ goodData.goods_id }}</p>
                                    </div>
                                    <div class="taright fcgrey width80">x{{ goodData.nums }}</div>
                                </div>
                            </div>
                        </div>
                    </card-table-td>

                    <!-- 实付金额 -->
                    <card-table-td :width="140">
                        <div class="cardTablePrice">
                            <p style="color: red">¥{{cardRowData.actual_fee}}</p>
                            <p>（含订单运费：¥{{cardRowData.freight_fee}}）</p>
                            <p>（含退换省心：¥{{cardRowData.insurance_fee}}）</p>
                            <el-tooltip v-if="cardRowData.buyer_message !== ''" effect="dark" :content="'买家备注：' + cardRowData.buyer_message" placement="top-start">
                                <div class="dpinlineblock"><i class="el-icon-document fs16 fcorange mr6"/>买家备注</div>
                            </el-tooltip>
                        </div>
                    </card-table-td>

                    <!--订单状态-->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">{{ cardRowData.status_name }}</div>
                    </card-table-td>


                    <!-- 供应商/ID -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">
                            <p>{{ cardRowData.supplier_name }}</p>
                            <p>{{ cardRowData.supplier_id }}</p>
                        </div>
                    </card-table-td>

                    <!-- 收货地址 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">{{ cardRowData.receiver_address }}</div>
                    </card-table-td>

                    <!-- 快递和单号 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">
                            <div style="margin-bottom: 16px">
                                <el-select
                                    filterable
                                    clearable
                                    v-model="cardRowData.express_code">
                                    <el-option
                                        v-for="item in express"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.express_code">
                                    </el-option>
                                </el-select>
                            </div>

                            <div>
                                <el-input v-model="cardRowData.logistics_sn" placeholder="请填写快递单号" @blur="addSn(cardRowData)"/>
                            </div>

                        </div>
                    </card-table-td>

                    <!-- 导出记录 -->
                    <card-table-td :width="110">
                        <div class="cardTableInfo">{{ cardRowData.export_record }}</div>
                    </card-table-td>

                </template>
            </card-table>
        </div>

        <Pagination
            :options="paginationOptions"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            :pageChoose="[10,30,50,100]"
            @opreateCBK="handleOpreate"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
            <template #left-content>
                <div style="position: absolute;padding-left: 158px;z-index: -1">
                    <FileUpload
                        style="display: inline-block"
                        :isBotton="true"
                        ref="FileUpload"
                        :url="$api.order.delivery.importfile"
                        @successUploadCBK="successUploadCBK">
                    </FileUpload>
                </div>
            </template>
        </Pagination>
        <!--关闭订单-->
        <el-dialog
            title="关闭订单"
            :visible.sync="closedialogVisible"
            width="30%">
            <el-form
                label-width="120px"
                label-position="right">
                <el-form-item label="是否退款：">
                    <el-switch v-model="is_refund" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="操作密码：">
                    <el-input
                        v-model="password"
                        style="width: 70%;margin:0 5% 10px 0">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closedialogVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="orderClose">
                    确定
                </el-button>
            </div>
        </el-dialog>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>

<script>
    import CardTable from '@/components/card-table/index.vue'
    import CardTableTh from '@/components/card-table/card-table-th.vue'
    import CardTableTd from '@/components/card-table/card-table-td.vue'

    //订单列表
    export default {
        name: "DeliveryList",
        components: {
            'card-table': CardTable,
            'card-table-th': CardTableTh,
            'card-table-td': CardTableTd,
        },
        data() {
            return {
                exportOptions: [],
                id: null,
                is_refund: '',
                password: '',
                visible: false,
                previewImg: '',

                paginationOptions: [
                    {type: "warning", value: 'send', label: '一键发货', permission: [this.$api.order.delivery.send]},
                    {value: 'template', label: '模板', permission: [this.$api.order.delivery.send]},

                ],

                searchOPtions: [
                    {
                        type: 'input',
                        key: 'order_sn',
                        placeholder: '请输入订单号'
                    },

                    {
                        type: 'input',
                        key: 'goods_id',
                        placeholder: '请输入商品ID'
                    },

                    {
                        type: 'input',
                        key: 'supplier',
                        placeholder: '请输入供应商'
                    },
                    {
                        type: 'input',
                        key: 'receiver_name',
                        placeholder: '收货人'
                    },
                    {
                        type: 'input',
                        key: 'receiver_mobile',
                        placeholder: '收货人手机号'
                    },
                    {
                        type: 'input',
                        key: 'user_nickname',
                        placeholder: '下单人'
                    },
                    {
                        type: 'input',
                        key: 'goods_price',
                        placeholder: '商品价格'
                    },
                    {
                        type: 'datetimerange',
                        key: 'start_time-end_time',
                        placeholder: '下单时间'
                    },
                    {
                        type: 'select',
                        key: 'status',
                        placeholder: '发货状态',
                        options: [
                            {label: '已发货', value: 3},
                            {label: '待发货', value: 2},
                        ]
                    }
                ],
                query: {},
                current: 1,
                pageSize: 10,
                count: 0,
                express: [],
                closedialogVisible: false,
                total_actual_money: '',

                listData: {
                    items: [{}]
                },
                isCardTableLoading: false
            }
        },
        activated() {
            this.getData();
            this.getExpress();
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                console.log(row.export_record)
                if (row.export_record > 0) {
                    return 'row-height-light-normal'
                }
            },
            successUploadCBK(e) {
                // 导入成功，重新拉取数据
                if (e.code == 0) {
                    this.$message({
                        showClose: true,
                        message: `成功导入${e.data.num}行,${e.data.msg}`,
                        duration: 3000,
                        type: "success"
                    });
                    setTimeout(() => {
                        this.getData();
                    }, 1500)
                }
            },
            // 保存
            async handleDeliverySave() {
                // 筛选出已填写物流公司及单号数据，并重新组合后台所需数据
                const items = this.listData.items.filter(val => val.code && val.sn).map(val => {
                    return {
                        id: val.id,
                        code: val.code,
                        sn: val.sn
                    }
                })
                if (items.length < 1) {
                    this.$message.error('请选择快递及填写对应单号');
                    return;
                }
                try {
                    await this.$api.order.deliverySave({items});
                    this.getData();
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 一键导入
            async handDeliveryImport() {
                try {
                    this.$refs.FileUpload.click();
                    // await this.$api.order.deliveryImportfile();
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 模板下载
            async templateDownload() {
                try {
                    window.open(`${window.location.origin}${this.$api.order.delivery.template}`);
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 一键发货
            async handDeliverySend() {
                try {
                    this.$api.order.deliverySend().then(res => {
                        if (res.data === 0) {
                            return this.$message.info(`快递单号未设置，请先保存`);
                        }
                        this.$message.info(`成功发出${res.data}个订单`);
                        this.getData();
                    })
                } catch (e) {
                    throw new Error(e);
                }
            },
            // 获取所有启用状态快递
            async getExpress() {
                try {
                    const {data} = await this.$api.setting.getExpressList({status: 10});
                    this.express = data.items;
                } catch (e) {
                    throw new Error(e);
                }
            },
            transStatus(status) {
                switch (status) {
                    case 0:
                        return '已取消';
                    case 1:
                        return '待支付';
                    case 2:
                        return '待发货';
                    case 3:
                        return '待收货';
                    case 4:
                        return '待反馈';
                    case 5:
                        return '已完成';
                    case 6:
                        return '售后';
                    case 7:
                        return '已关闭';
                }
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = {...query};
                        this.current = 1;
                        this.getData();
                    },
                    reset: () => {
                        this.query = {};
                        this.pageSize = 10;
                        this.current = 1;
                        this.getData();
                    }
                }
                todo[type]();
            },
            async getData() {
                //获取列表数据
                this.isCardTableLoading = false;
                this.$api.order.odList({
                    page: this.current,
                    pageSize: this.pageSize,
                    ...this.query,
                    status: !this.query.status ? 2 : this.query.status
                }).then(res => {
                    this.count = res.data.count;
                    this.listData = res.data;
                    this.isCardTableLoading = false;
                    this.exportOptions = res.data.fields || []
                })
            },

            /**
             * @description 失去焦点自动保存
             * @param data 列表数据
             * @returns {Promise<void>}
             */
            async addSn(data) {
                if (!!data.logistics_sn.trim() && !!data.express_code) {
                    const items = [
                        {id: data.id, code: data.express_code, sn: data.logistics_sn}
                    ];
                    await this.$api.order.deliverySave({items});
                } else {
                    this.$message.warning('请填写快递单号或者选择快递公司')
                }
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            orderDetail(id) {
                this.$router.push({name: 'orderDetail', params: {id}});
            },
            async orderClose() {
                try {
                    await this.$api.order.orderClose({id: this.id, is_refund: this.is_refund, password: this.password});
                    this.closedialogVisible = false;
                    this.getData();
                } catch (e) {
                    console.log(e)
                }
            },

            /**
             * @description 分页左边操作按钮组
             * @param type 操作类型
             */
            handleOpreate(type) {
                switch (type) {
                    case "send":
                        this.handDeliverySend();
                        break;
                    case "template":
                        this.templateDownload();
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .color-red {
        color: #F24844
    }

    .order-active {
        background-color: #1ABC9C;
        color: #fff
    }

    .order-active .color-red {
        color: #fff
    }

    .button-content {
        margin-bottom: 10px
    }

</style>

<style scoped lang="scss">
    .width80 {
        width: 80px;
    }

    .fcblue {
        color: rgba(34, 149, 255, 1);
    }

    .fcgrey {
        color: #949494;
    }

    .fcred {
        color: #F56C6C;
    }

    .fcredFont {
        color: #F5222D;
    }

    .fcorange {
        color: #E6A23C;
    }

    .fcblack65 {
        color: rgba(0, 0, 0, 0.65)
    }

    .pageWrapper {
        padding: 10px;
        background: #fff;
    }

    .summaryBar {
        margin-top: 16px;
        margin-bottom: 16px;
        padding-left: 16px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: rgba(240, 248, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(145, 213, 255, 1);
    }

    /* 调用卡片式表格 */
    .cardTableGood {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid rgba(232, 232, 232, 1);
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
