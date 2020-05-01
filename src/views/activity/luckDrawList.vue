
<template>
    <div class="luckDrawList-container">
           <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
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
        
    >

            <el-table-column
                align="center"
                prop="id"
                label="编号">
            </el-table-column>

                    
            <el-table-column
                align="center"
                prop="nickname"
                label="用户昵称">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="uid"
                label="用户id">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="prize_name"
                label="奖品">
            </el-table-column>

        
            <el-table-column
                align="center"
                prop="created_at"
                label="中奖时间">
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
        
    </div>
</template>
<script>
import { common } from '@/OMS/mixins';
export default {
    name: "luckDrawList",
    mixins: [common],
    data(){
        return {
            searchOPtions:[
            {
                type: 'input',
                key: 'keyword',
                placeholder: '用户昵称'
            },
            {
                type: 'input',
                key: 'prize_name',
                placeholder: '奖品名称'
            },
            {
                type: 'select',
                key: 'prize_type',
                placeholder: '是否中奖',
                options: [ 
                    {label:'全部',value:null},
                    {label:'中奖',value:1},
                    {label:'未中奖',value:0},
                ]
            },
            {
                type: 'datetimerange',
                key: 'start_time-end_time',
                placeholder: '开始时间'
            },
        ],
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            try{
                this.loading = true
                this.$api.activity.getLuckDrawList({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current
                }).then(res=>{
                    this.loading = false
                    this.tableData = res.data.items
                    this.count = +res.data.count
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
