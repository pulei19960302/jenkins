
<template>
    <div class="couponRecord-container">
           <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <el-table
        element-loading-spinner="el-icon-loading"
        :highlight-current-row="true"
        v-loading="loading"
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >

        <el-table-column
            fixed
            type="selection"
            width="55">
        </el-table-column>

                    <el-table-column
                align="center"
                prop="id"
                label="编号">
            </el-table-column>
    
            <el-table-column
                align="center"
                prop="uid"
                label="用户ID">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="cid"
                label="优惠券ID">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="coupon_name"
                width="180"
                label="优惠券名称">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="coupon_max"
                label="满金额">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="coupon_money"
                label="减金额">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="created_at"
                width="140"
                label="发放时间">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="end_time"
                 width="140"
                label="到期时间">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="status"
                width="100"
                label="是否已使用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.is_used" :active-value="1" :inactive-value="0" @change="toogle(scope.row)"></el-switch>
                </template>
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="updated_at"
                 width="140"
                label="使用时间">
            </el-table-column>

            <el-table-column
                align="center"
                prop="order_id"
                label="订单id">
                <template slot-scope="scope">
                    {{scope.row.order_id || '--'}}
                </template>
            </el-table-column>
        <el-table-column
                    fixed="right"
                    align="center"
                    prop="id"
                    width="80"
                    label="操作">
                    <template slot-scope="scope">
                    
                    <el-button type="text" v-permission="[$api.activity.coupon.recordDel]" class="danger-color" @click.stop="del(scope.row.id)">删除</el-button>
            
                    </template>
                </el-table-column>
                
    </el-table>
    
        <Pagination
            style="width: 77% !important"
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange"
            @opreateCBK="handleMultipe"
            :options="multipeOptions"
        >
        </Pagination>
    </div>
</template>
<script>
import { common } from '@/OMS/mixins';
export default {
    name: "couponRecord",
    mixins: [common],
    data(){
        return {
            searchOPtions:[
            {
                type: 'input',
                key: 'uid',
                placeholder: '用户id'
            },
            {
                type: 'input',
                key: 'cid',
                placeholder: '优惠券id'
            },
            {
                type: 'select',
                key: 'is_used',
                placeholder: '状态',
                options:[
                    {value:-1,label:'全部'},
                    {value:0,label:'未使用'},
                    {value:1,label:'已使用'}
                ]
            },
        ],
        tableData:[],
        multipeOptions:[
            { value: 'del', label: '批量删除', type: 'danger' }
        ],
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
            toogle(row){
                this.$api.activity.couponRecordStatus({
                    is_used:row.is_used,
                    id:row.id
                }).then(res=>{
                    this.getData()
                }).catch((err)=>{
                    console.log(err)
                    row.is_used = row.is_used==0?1:0
                })
            },
        
            del(id){
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDel(id);
                })
            },
            handleDel(id){
                this.$api.activity.couponRecordDel({ ids:id }).then(res=>{
                    this.getData()
                })
            },
        
        handleMultipe(key){
            const choosed = this.multipleSelection
            if(choosed.length===0){
                this.$message({
                    message: '请至少选择一条数据',
                    type: 'error'
                })
                return;
            }
            switch (key){
                
            case 'del':
                this.del(this.multipleSelection.join(','))
            break
        
            }
        },
        getData(){
            try{
                this.loading = true
                this.$api.activity.couponRecordList({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current
                }).then(res=>{
                    this.loading = false
                    this.tableData = res.data.items
                    this.count = res.data.count
                }).catch(err=>{
                    this.loading = false
                })
            }catch(e){
                this.loading = false
            }
            
        },
    }
}
</script>
