<template>
    <RightSidePopup :visible.sync="chooseGoodsVisible" style="width:60%">  
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
            :header-cell-style="{background:'#fafafa',border:'none',borderBottom:'1px solid #e8e8e8'}" 
            @selection-change="handleSelectionChange">
            <template v-for="item in Colums">
                <el-table-column
                    v-if="!item.handle"
                    :key="item.prop"
                    :prop="item.prop"
                    :fixed="item.fixed"
                    align="center"
                    :label="item.label"
                    :type="item.type"
                    >
                </el-table-column>
                <el-table-column
                    v-if="item.handle"
                    :key="item.prop"
                    :prop="item.prop"
                    :fixed="item.fixed"
                    align="center"
                    :label="item.label"
                    :type="item.type"
                    >
                    <template v-if="item.prop==='thumb'" slot-scope="scope">
                        <img :src="scope.row.thumb" class="table-img" />
                    </template>
                </el-table-column>
            </template>
        </el-table>
            <Pagination
                :current="current"
                :pageSize="pageSize"
                :count="count"
                @pageChangeCBK="handlePageChange"
                @sizeChangeCBK="handleSizeChange">
            </Pagination>
    </RightSidePopup> 
</template>
<script>
/**
 * @params
 * showChooseGoods Boolean 控制展示
 * choosedGoodsId[]<number> 已经选择的商品id
 * 示例
 * <ChooseGoods :choosedGoodsId.sync="xx" :showChooseGoods.sync="showChooseGoods"></ChooseGoods>
 */
import { common } from '@/OMS/mixins';
import { mapState, mapActions } from 'vuex';
const Colums = [
    {  prop: '1', type: 'selection', fixed: true },
    {  prop: 'id', label: "商品ID" },
    {  prop: 'thumb', label: "商品缩略图", handle:true },
    {  prop: 'title', label: "商品主标题" },
    {  prop: 'title_1', label: "商品分类" }, //
    {  prop: 'start_at', label: "上架时间" }, //
    {  prop: 'shop_price_1', label: "状态" }, //
    {  prop: 'shop_price', label: "售价（元）" },
    {  prop: 'stock', label: "库存" },
    {  prop: 'cost_price', label: "佣金" }, //
    // {  prop: 'start_at', label: "开团时间" },
]
export default {
    mixins: [common],
    props:{
        showChooseGoods:{
            type:Boolean
        },
        specialId: {
            type: String
        },
        choosedGoodsId:[Array]
    },
    data(){
        return {
            chooseGoodsVisible:false,
            searchOPtions:[
                {
                    type: 'select',
                    key: 'is_select',
                    placeholder: '选中状态',
                    options: [{
                        label: '已选中',
                        value: '1'
                    }, {
                        label: '未选中',
                        value: '0'
                    }]
                },
                {
                    type: 'input',
                    key: 'keywords',
                    placeholder: '商品ID / 商品名称'
                },
                {
                    type: 'dateRangePicker',
                    key: 'time',
                    placeholder: '上架时间'
                },
            ],
            Colums,
            selected:[],
            multipleSelection:[],
        }
    },
    computed: {
        ...mapState('product', ['allGoods', 'allCategories'])
    },
    watch:{
        showChooseGoods(v){
            this.chooseGoodsVisible = v
        },
        chooseGoodsVisible(v){
            this.$emit('update:showChooseGoods',v)
            if (this.chooseGoodsVisible) {
                this.getData()
            }
        },
        choosedGoodsId(v){
            this.tableData.forEach(it=>{
                if(this.choosedGoodsId.includes(it.id)){
                    this.$refs.multipleTable.toggleRowSelection(it,true)
                }else{
                    this.$refs.multipleTable.toggleRowSelection(it,false)
                }
            })
        },
    },
    created(){
        this.searchOPtions.forEach(it=>{
            if(it.key==='cate_id'){
                it.options = this.allCategories
            }
        })
    },
    methods:{
        ...mapActions('product', ['getAllGoods']),
        handleSelectionChange(val){
            
            let { linked,noLink } = this.findLinkId();
            
            linked = val.map(it=>it.id)

            this.$emit('update:choosedGoodsId',noLink.concat(linked))
        },
        /**
         * 受分页、搜索影响
         * 需要对数据分开管理
         * return 
         *       linked 当前操作数据
         *       noLink 当前未操作
         */
        findLinkId(){
            const ids = this.tableData.map(it=>it.id)
            const linked = []
            const noLink = []
            this.choosedGoodsId.forEach(it=>{
                if(ids.includes(it)){
                    linked.push(it)
                }else{
                    noLink.push(it)
                }
            })
            return { linked,noLink }
        },
        async getData(){
            this.loading = true
            if(this.query.cate_id && this.query.cate_id.length!==0){
                this.query.cate_id = this.query.cate_id[this.query.cate_id.length-1]
            }
            if (this.query.is_select) {
                this.query.special_id = this.specialId
            } else {
                this.query.special_id = undefined
            }
            const { data } = await this.$api.common.getGoodsList({ ...this.query,pageSize: this.pageSize,page: this.current });
            this.loading = false
            const copyChoosedGoodsId = [...this.choosedGoodsId]
            this.tableData = data.list.items;
            this.count = data.list.count
            this.$nextTick(()=>{
                if(copyChoosedGoodsId.length!==0){
                    this.$emit('update:choosedGoodsId',copyChoosedGoodsId)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.table-img {
    width: 40px;
    height: 40px;
}
</style>
