
<template>
    <div class="billingSystem-container">
           <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <div class="table-pandect">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
            <div style="margin-top:10px">可用额度: <b>¥{{showTotal.amount}}</b> = 余额: <b>¥{{showTotal.balance}}</b> - 未结清金额: <b>¥{{showTotal.arrearage}}</b></div>
            <div style="margin-top:10px">系统累计为您服务 <b>{{showTotal.days}}</b>天， 成交 <b>{{showTotal.orders}}</b> 笔订单， 交易成功 <b>¥{{showTotal.total}}</b></div>
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
        
    >
            <el-table-column
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="date"
                label="日期">
            </el-table-column>
            <el-table-column
                align="center"
                prop="money"
                label="服务费">
            </el-table-column>
            <el-table-column
                align="center"
                prop="total"
                label="总交易额">
            </el-table-column>
            <el-table-column
                align="center"
                prop="num"
                label="订单量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <div>
                        {{STATUS_MAP[scope.row.status]}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="created_at"
                label="创建时间">
            </el-table-column>
        <el-table-column
                    align="center"
                    prop="id"
                    width="180"
                    label="操作">
                    <template slot-scope="scope">
                    
                    <el-button type="text"  @click.stop="detail(scope.row)">查看</el-button>
            
                    </template>
                </el-table-column>
                
    </el-table>
    
        <Pagination
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange"
        >
        </Pagination>
        
            <RightSidePopup :visible.sync="rightPopupVisible" width="60%">
                
            <div class="billingSystem-form-container">
                <el-row :gutter="20" style="margin-bottom:30px">
                    <span style="font-size:20px;font-weight: bold;margin-bottom:10px;" class="title">{{detailDate}}详情</span>
                </el-row>
                <billingSystemDetail :date="detailDate"></billingSystemDetail>
            </div>
        
            </RightSidePopup>
        
    </div>
</template>
<script>
import billingSystemDetail from './components/billingSystemDetail'
import { common } from '@/OMS/mixins';
const STATUS_MAP = {
    0:'待支付',
    1:'已结算'
}
export default {
    name: "billingSystem",
    mixins: [common],
    components:{
        billingSystemDetail
    },
    data(){
        return {
            STATUS_MAP,
            searchOPtions:[
                {
                    type: 'dateRangePicker',
                    key: 'start_at-end_at',
                    placeholder: '日期'
                },
                {
                    type: 'select',
                    key: 'status',
                    placeholder: '状态',
                    options:[
                        {value:'-1',label:'全部'},
                        {value:'0',label:'待支付'},
                        {value:'1',label:'已结算'}
                    ]
                },
            ],
            rightPopupVisible:false,
            detailDate:'',
            showTotal:{
                balance:'',//  余额
                arrearage:'',//  未结清金额
                amount:'',// 可用额度
                days:'' ,//天数
                orders:'',// 订单数
                total:'' // 交易总金额
            }

        }
    },
    created(){
        this.getData()
    },
    methods:{
        
        detail(row){
            this.rightPopupVisible = true
            this.detailDate = row.date
        },
        getData(){
            try{
                this.loading = true
                this.$api.finance.billingSystemList({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current
                }).then(res=>{
                    this.loading = false
                    this.tableData = res.data.items
                    this.count = res.data.count
                    Object.keys(this.showTotal).forEach(it=>{
                        this.showTotal[it] = res.data[it]
                    })
                }).catch(err=>{
                    this.loading = false
                })
            }catch(e){
                this.loading = false
            }
            
        },
        
            
            submit(){
                this.$refs.billingSystemForm.validate(val=>{
                    if(val){
                        const params = {...this.formData}
                        if(this.isEdit){
                            this.$api.finance.billingSystemEdit(params).then(res=>{
                                this.$refreshTab()
                            })
                            return 
                        }
                        this.$api.finance.billingSystemAdd(params).then(res=>{
                            this.$refreshTab()
                        })
                    }
                })
            },
            
            cancel(){
                this.$refs.billingSystemForm.resetFields();
                this.rightPopupVisible = false
            },
        
    
    }
}
</script>
