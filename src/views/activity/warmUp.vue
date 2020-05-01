
<template>
    <div class="warmUp-container">
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
        
    >

            <el-table-column
                align="center"
                prop="seckill_goods_id"
                label="商品ID">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="seckill_goods_name"
                label="商品标题">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="platform"
                label="平台">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="goods_uv_count"
                label="点击uv">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="seckill_start_time"
                label="开始时间">
            </el-table-column>
        
            <el-table-column
                align="center"
                prop="seckill_end_time"
                label="结束时间">
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
    name: "warmUp",
    mixins: [common],
    data(){
        return {
            searchOPtions:[
                {
                    type: 'input',
                    key: 'goods_id',
                    placeholder: '商品ID'
                },
                {
                    type: 'select',
                    key: 'platform',
                    placeholder: '平台',
                    options:[
                        {value:'',label:''}
                    ]
                },
                {
                    type: 'datetimerange',
                    key: 'start_time-end_time',
                    placeholder: '预热时间'
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
                this.$api.activity.warmUpList({
                    ...this.query,
                    pageSize: this.pageSize,
                    page: this.current
                }).then(res=>{
                    this.loading = false
                    this.tableData = res.data.items
                    this.count = res.data.count
                    this.searchOPtions.forEach(it=>{
                        if(it.key==='platform'){
                            it.options = Object.keys(res.data.platform_list || {}).map(item=>{
                                return {
                                    value:item,
                                    label:res.data.platform_list[item]
                                }
                            })
                        }
                    })
                }).catch(err=>{
                    this.loading = false
                })
            }catch(e){
                console.log(e)
                this.loading = false
            }
            
        },
        
    }
}
</script>
