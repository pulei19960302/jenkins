<template>
    <div>
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <Export
                    :exportOptions="exportOptions"
                    :query="query"
                    :url="$api.statistics.sta2.exportProduct"
                    v-permission="[$api.statistics.sta2.exportProduct]"
                     />
        </Search>
        <div class="table-pandect">
            商品总数 <span>{{ total_goods_num }}</span> 个，  订单总数 <span>{{ total_order_num }}</span> 笔
        </div>
        <el-table
            element-loading-spinner="el-icon-loading"
            :highlight-current-row="true"
            v-loading="loading"
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
            @selection-change="handleSelectionChange">
            <el-table-column
                align="center"
                prop="goods_id"
                label="商品编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goods_name"
                label="商品名称">
            </el-table-column>
            <el-table-column
                width="90"
                align="center"
                prop="usernum"
                label="商品缩略图">
                <template slot-scope="scope">
                    <img
                        class="table-img"
                        @click="previewImg=scope.row.thumb;imgPreview = true"
                        :src="scope.row.thumb">
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column
                align="center"
                prop="supplier"
                label="供应商">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="brand"
                label="品牌">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="sale_num"
                label="销售总量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="order_num"
                label="订单总数">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="profit_fee"
                label="订单商品毛利">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="total_fee"
                label="销售总额">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="cost_fee"
                label="订单商品成本">
            </el-table-column> -->
            <!-- <el-table-column
                align="center"
                prop="rebate_fee"
                label="商品返利金额">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="freight_fee"
                label="运费">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="xx"
                label="订单总计">
            </el-table-column>
            <el-table-column
                align="center"
                prop="xx"
                label="订单详情">
            </el-table-column> -->
            <!-- <el-table-column
                align="center"
                prop="platform_profit_fee"
                label="平台利润">
            </el-table-column> -->
            <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="160">
                <template slot-scope="scope">
                    <span class="look-word" type="info" plain size="mini" @click.stop="goodsTeamrank(scope.row.goods_id)">团队购买力排行</span>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%"><salesStatisticsDetail :goods_id="goods_id"/></RightSidePopup>
        <PreviewImg :visible.sync="imgPreview" :imgSrc="previewImg"></PreviewImg>
    </div>
</template>
<script>
import { common } from '@/OMS/mixins';
import salesStatisticsDetail from './salesStatisticsDetail';
export default {
    name: "productRank",
    mixins: [common],
    components:{
        salesStatisticsDetail
    },
    data(){
        return {
            tableData:[],
            total_goods_num:'',
            total_order_num:"",
            goods_id:0,
            rghtPopupVisible:false,
            imgPreview:false,
            previewImg:'',
            exportOptions: [],
            searchOPtions: [
                {
                    type: 'input',
                    key: 'goods',
                    placeholder: '商品编号/名称'
                },
                {
                    type: 'select',
                    key: 'status',
                    placeholder: '上架状态',
                    options: [
                        {label:'全部',value:-1},
                        {label:'上架',value:10},
                        {label:'预上架',value:1},
                        {label:'下架',value:0},
                    ]
                },
                {
                    type: 'datetimerange',
                    key: 'start_at-end_at',
                    placeholder: '开始时间'
                },
                {
                    type: 'input',
                    key: 'min_sale_num',
                    placeholder: '销量最小值'
                },
                {
                    type: 'input',
                    key: 'max_sale_num',
                    placeholder: '销量最大值'
                },

                {
                    type: 'select',
                    key: 'supplier_id',
                    placeholder: '供应商',
                    options: []
                },
                {
                    type: 'select',
                    key: 'brand_id',
                    placeholder: '品牌',
                    options: []
                },
            ],
        }
    },
    created(){
        this.getData();
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data } = await this.$api.statistics.goodslist({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current,
                });
                this.tableData = data.list;
                this.searchOPtions[5].options=data.supplier;
                this.searchOPtions[6].options=data.brand;
                this.count = data.count;
                this.total_goods_num=data.total_goods_num;
                this.total_order_num=data.total_order_num;
                // 导出字段
                // this.exportOptions = data.fields || [];
                this.loading = false;
            } catch (e) {
                this.loading = false;
            }
        },
        async goodsTeamrank(id){
            this.goods_id = id;
            this.rghtPopupVisible = true;
        },
    },
}
</script>
