<template>
    <div class="billingSystemDetail-container">
        <div class="table-pandect table-pandect-hidden">
            数据共 <b>{{ count }}</b> 条
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
                prop="order_sn"
                label="订单号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="service_fee"
                label="服务费">
            </el-table-column>
            <el-table-column
                align="center"
                prop="status_name"
                label="订单状态">
            </el-table-column>
            <el-table-column
                align="center"
                prop="created_at"
                label="创建时间">
            </el-table-column>
        </el-table>
        <div class="page-box">
        <Pagination
            :current="current"
            :count="count"
            :pageSize="pageSize"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange"
        >
        </Pagination>
        </div>
    </div>
</template>
<script>
import { common } from '@/OMS/mixins';
export default {
    mixins: [common],
    props:{
        date:''
    },
    data(){
        return {
        }
    },
    watch:{
        date:{
            handler(){
                this.page = 1
                this.current = 1
                this.pageSize = 10
                this.getData()
            }
        }
    },
    methods:{
        getData(){
            if(!this.date)return
            try{
                this.loading = true
                this.$api.finance.billingSystemDetail({
                    ...this.query,
                    date:this.date,
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
        }
    }
}
</script>
