<template>
    <div class="product-list">
        <!-- <el-tabs v-model="activeName" @tab-click="handleTabClick"  style="background: #fff;padding: 0 10px;">
            <el-tab-pane name="-1">
                <span slot="label">全部<span></span></span>
            </el-tab-pane>
            <el-tab-pane name="3">
                <span slot="label">已关闭<span>({{topcount.end_tuan}})</span></span>
            </el-tab-pane>
            <el-tab-pane name="delflag">
                <span slot="label" style="color: #c5c5c5;"><i class="el-icon-delete"></i> 已删除({{topcount.del_num}})</span>
            </el-tab-pane>
        </el-tabs> -->
        <div class="tab-top">
              <el-tabs
        v-model="activeName"
        @tab-click="handleTabClick"
        style="background: #fff;padding: 0 10px;"
      >
        <el-tab-pane :name="item.key" v-for="item in navigation" :key="item.key">
          <span slot="label" style="font-weight:bold">
            {{ item.bar }}({{ item.count }})
          </span>
        </el-tab-pane>
      </el-tabs>
        

       </div>
       
        <Search
            :searchOPtions=searchOPtions
            @searchCallback=handelSearch>
            <el-button class="add-product-btn" size="small" type="primary" plain  @click="jumpTo('AddProduct')">添加商品</el-button>
            <Export
                :exportOptions="exportOptions"
                :query="query"
                :url="$api.product.addGoods.export"
                v-permission="[$api.product.addGoods.export]" />
                
        </Search>
        <div class="table-pandect table-pandect-hidden">
            符合搜索条件的数据共 <b>{{ count }}</b> 条
        </div>
        <div class="common-table-wrapper">
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
                fixed
                width="50"
                align="center"
                type="selection">
            </el-table-column>
            <el-table-column
                fixed
                width="60"
                align="center"
                prop="id"
                label="商品ID">
            </el-table-column>
            <!-- <el-table-column
                fixed
                width="160"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="mini"
                        v-permission="[$api.product.addGoods.detail]"
                        @click.stop="lookDetails(scope.row)">
                        查看
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        style="color: #909399;"
                        v-permission="[$api.product.addGoods.add_second_post]"
                        @click="handleCommand('copy',scope.row)"
                        >
                        复制
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        style="color: #e6a23c;"
                        @click="handleCommand('edit',scope.row)"
                        v-permission="[$api.product.addGoods.add_second_post]"
                        >
                        编辑
                    </el-button>
                </template>
            </el-table-column> -->
            <el-table-column
                width="120"
                align="center"
                prop="sort"
                label="排序">
                <template slot-scope="scope">
                    <div v-clickoutside="handleClickoutside">
                        <span v-show="nameEdit != scope.row.id" class="el-icon-edit-content">
                            {{ scope.row.sort }}
                            <i class="el-icon-edit icon" @click="edit('nameEdit',scope.row.id)"></i>
                        </span>
                        <div v-show="nameEdit == scope.row.id" style="display: flex">
                            <el-input v-model="scope.row.sort"></el-input>
                            <el-button type="text" size="mini" @click="handleSave2(scope.row)" style="margin-left: 2px;">保存</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>

                  <el-table-column width="280" align="center" prop="title" label="商品">
        <template slot-scope="scope">
          <div v-clickoutside="handleClickoutside">
            <div v-show="nameEdit != scope.row.id" class="product-info">
              <div style="margin-right: 15px">
                <img
                  class="table-img"
                  @click="previewImg=scope.row.thumb;visible = true"
                  :src="scope.row.thumb"
                />
              </div>
              <div class="verical-title">
                <div class="in">
                  {{ scope.row.title }}
                </div>
              </div>
              <i
                class="el-icon-edit icon"
                @click="edit('nameEdit',scope.row.id)"
                v-permission="[$api.product.addGoods.add_second_post]"
              ></i>
            </div>
            <div v-show="nameEdit == scope.row.id" style="display: flex">
              <img
                class="table-img"
                @click="previewImg=scope.row.thumb;visible = true"
                :src="scope.row.thumb"
              />
              <el-input v-model="scope.row.title" style="margin-top: 10px; margin-left: 10px;"></el-input>
              <el-button
                type="text"
                size="mini"
                @click="handleSave(scope.row)"
                style="margin-left: 12px;"
              >保存</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
<!--            <el-table-column-->
<!--                width="180"-->
<!--                align="center"-->
<!--                prop="subtitle"-->
<!--                label="商品副标题">-->
<!--            </el-table-column>-->
            <!-- <el-table-column
                width="100"
                align="center"
                prop="tuan_title"
                label="团购批次">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="supplier_name"
                width="100"
                show-overflow-tooltip
                label="供应商">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                prop="brand_name"
                label="品牌">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="category_name"
                width="100"
                label="商品分类">
            </el-table-column>
            <el-table-column
                align="center"
                prop="start_at"
                width="140"
                label="上架时间">
                <template slot-scope="scope">
                    {{ scope.row.start_at | validVal }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="status_label"
                label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status_label }}
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--align="center"-->
                <!--prop="goods_type_name"-->
                <!--label="商品类型">-->
            <!--</el-table-column>-->
            <el-table-column
                align="right"
                width="100"
                label="销售价（元）">
                <template slot-scope="scope">
                    <el-tooltip effect="dark"
                    :content="
                    '一级返利'+scope.row.goods_commission.first_fee+'；'
                    +'二级返利'+scope.row.goods_commission.second_fee+'；'
                    +'天使一级返利'+scope.row.goods_commission.team_angel1+'；'
                    +'天使二级返利'+scope.row.goods_commission.team_angel2+'；'
                    +'钻石返利'+scope.row.goods_commission.team_fee+'；'
                    "
                    placement="top">
                        <span>{{ scope.row.shop_price | validVal }}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--align="center"-->
                <!--prop="price"-->
                <!--label="销售价（元）">-->
                <!--<template slot-scope="scope">-->
                    <!--<p>{{ scope.row.shop_price | validVal }}</p>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!-- <el-table-column
                align="center"
                prop="price"
                label="成本价（元）">
                <template slot-scope="scope">
                    <p>{{ scope.row.cost_price | validVal }}</p>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="profit"
                label="平台利润（元）">
            </el-table-column> -->
            <el-table-column
                align="center"
                prop="stock"
                label="库存">
                <template slot-scope="scope">
                    {{ scope.row.stock }}
                </template>
            </el-table-column>
             <el-table-column
                align="right"
                prop="commission_price"
                width="100"
                label="佣金（元）">
            </el-table-column>
            <el-table-column
                width="100"
                align="center"
                label="标签">
                <template slot-scope="scope">
                    <div v-if="scope.row.labels && scope.row.labels.length > 0">
                        <el-tag
                            style="margin-right: 10px;margin-bottom: 3px;"
                            @close="delLabel(tag.id, scope.row.id)"
                            v-for="tag in scope.row.labels"
                            :key="tag.id"
                            size="mini"
                            closable
                            type="warning">
                            {{ tag.label }}
                        </el-tag>
                    </div>
                    <div v-else>--</div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_num"
                label="销量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="order_num"
                label="订单量">
            </el-table-column>

            <el-table-column
                align="center"
                width="140"
                prop="tuan_start"
                label="秒杀开始时间">
            </el-table-column>
            <el-table-column
                align="center"
                width="140"
                prop="tuan_end"
                label="秒杀结束时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                width="160"
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="mini"
                        v-permission="[$api.product.addGoods.detail]"
                        @click.stop="lookDetails(scope.row)">
                        查看
                    </el-button>
                    <el-dropdown @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="edit" v-permission="[$api.product.addGoods.add_second_post]">
                                <span style="color: #2d8cf0;">编辑</span>
                            </el-dropdown-item>
                            <el-dropdown-item command="copy" v-permission="[$api.product.addGoods.add_second_post]">
                                <span style="color: #909399;">复制</span>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.status==0" command="pre" v-permission="[$api.product.addGoods.set_status]">
                                <span style="color: #e6a23c;">
                                    <span>预上架</span>
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.status==0 || scope.row.status==1" command="up" v-permission="[$api.product.addGoods.set_status]">
                                <span style="color: #e6a23c;">
                                    <span>上架</span>
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.status==1 || scope.row.status==10" command="down" v-permission="[$api.product.addGoods.set_status]">
                                <span style="color: #e6a23c;">
                                    <span>下架</span>
                                </span>
                            </el-dropdown-item>
                            <el-dropdown-item command="del" v-if="activeName !== 'delflag'" v-permission="[$api.product.addGoods.del]">
                                <span style="color: #f56c6c;">删除</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <Pagination
            :options="paginationOptions"
            :current="current"
            :pageSize="pageSize"
            :count="count"
            @opreateCBK="handleOpreate"
            @pageChangeCBK="handlePageChange"
            @sizeChangeCBK="handleSizeChange">
        </Pagination>
        <PreviewImg :visible.sync="visible" :imgSrc="previewImg"></PreviewImg>
        <RightSidePopup :visible.sync="rghtPopupVisible" width="60%"><ProductDetail :detailData="detailData"/></RightSidePopup>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { product } from '@/assets/constant';
    import { _ } from '@/OMS/utils';
    import clickoutside from '@/OMS/directive/clickoutside';
    import ProductDetail from './components/ProductDetail';

    export default {
        name: 'ProductList',
        components: { ProductDetail },
        directives: { clickoutside },
        data() {
            return {
                navigation: [],
                exportOptions: [],
                nameEdit: null,
                detailData: {},
                multipleSelection: [],
                rghtPopupVisible: false,
                loading: false,
                visible: false,
                previewImg: '',
                opreate: '',
                options: [],
                paginationOptions: [
                    { value: 'up', label: '批量上架',type:'primary',permission:[this.$api.product.addGoods.set_status] },
                    { value: 'pre', label: '批量预上架',type:'primary',permission:[this.$api.product.addGoods.set_status] },
                    { value: 'down', label: '批量下架',type:'warning',permission:[this.$api.product.addGoods.set_status] },
                    { value: 'del', label: '批量删除',type:'danger',permission:[this.$api.product.addGoods.del] },
                ],
                activeName: 'all',
                searchOPtions: [
                    {
                        type: 'input',
                        key: 'keywords',
                        placeholder: '商品编号 / 商品名称'
                    },
                    {
                        type: 'datetimerange_single_param',
                        key: 'end_time',
                        placeholder: '下架时间'
                    },
                    // {
                    //     type: 'select',
                    //     key: 'status',
                    //     placeholder: '状态',
                    //     options: [
                    //         { value: '', label: '全部' },
                    //         { value: 1, label: '预上架' },
                    //         { value: 0, label: '下架' },
                    //         { value: 10, label: '上架' },
                    //     ]
                    // },
                    // {
                    //     type: 'input',
                    //     key: 'activity_name',
                    //     placeholder: '团购批次',
                    //     options: []
                    // },
                    // {
                    //     type: 'select',
                    //     key: 'brand_id',
                    //     placeholder: '商品品牌',
                    //     options: []
                    // },
                    {
                        type: 'select',
                        key: 'label_id',
                        placeholder: '商品标签',
                        options: []
                    },{
                        type: 'cascader',
                        key: 'cate_id',
                        placeholder: '商品分类',
                        options: []
                    },
                    // {
                    //     type: 'select',
                    //     key: 'goods_type',
                    //     placeholder: '商品类型',
                    //     options: []
                    // },
                    {
                        type: 'dateRangePicker',
                        key: 'start_at-end_at',
                        placeholder: '上架日期'
                    },
                    {
                        type: 'select',
                        key: 'brand_id',
                        placeholder: '品牌',
                        options: []
                    },
                    {
                        type: 'select',
                        key: 'supplier_id',
                        placeholder: '供应商',
                        options: []
                    }
                ],
                query: {},
                current: 1,
                pageSize: 10,
                count: 0,
                tableData: [],
                otherParams: {},
                topcount:{},
                process:1,
            }
        },
        computed: {
            ...mapState('user', ['button_permissions'])
        },
        activated() {
            this.getData();
        },
        methods: {
            handleClickoutside() {
                // if(this.nameEdit) this.nameEdit = null;
            },
            // table行内编辑商品title
            async handleSave({ title, id }) {
                await this.$api.product.setInfo({ title, id });
                this.nameEdit = null;
            },
            handleSave2({ sort, id }){
                //排序
                this.$api.product.setSort({ id,sort });
                this.nameEdit = null;
            },
            // table行内编辑商品标签
            async delLabel(label_id, id) {
                await this.$api.product.delLabelTable({ label_id, id });
                // 数据库删除成功后，本地作对应删除
                this.tableData.forEach(curr => {
                    if(curr.id === id) {
                        const newLabelArr = curr.labels.filter(val => val.id !== label_id);
                        this.$set(curr, 'labels', newLabelArr);
                    }
                });
            },
            edit(val, id) {
                this[val] = id;
            },
            handleCommand(command, { id, status }) {
                if(command === 'edit') return this.jumpTo('EditProduct', command, id);
                if(command === 'copy') return this.jumpTo('EditProduct', command, id);
                let newStatus;
                switch (command){
                    case 'up':
                        newStatus = 10
                        break;
                    case 'down':
                        newStatus = 0
                        break;
                    case 'pre':
                        newStatus = 1
                        break;
                }
                this.handleDel(id, command,newStatus);
            },
            jumpTo(name, type, id) {
                this.$router.push({ name, params: { type, id } });
            },
            lookDetails(val) {
                this.detailData = Object.assign({}, val);
                this.rghtPopupVisible = true;
            },
            handleTabClick(tab) {
            // if (tab.name === "delflag" || tab.name === "warn") {
            //   this.process = "";
            // } else {
            //   this.process = tab.name;
            // }
            this.process = tab.name;
            const otherParams = {
                key: this.process,
                // delflag: tab.name === "delflag" ? 1 : "", // 回收站商品
                // warn: tab.name === "warn" ? 1 : 0
            };
            this.otherParams = otherParams;
            this.getData();
            },
            handelSearch(type, query) {
                const todo = {
                    search: () => {
                        this.query = { ...query };
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
                try {
                    this.loading = true;
                    if (this.query.cate_id) this.query.cate_id = [...this.query.cate_id].splice(-1, 1);
                    const allQuery = {
                        ...this.query,
                        ...this.otherParams
                    };
                    const {data} = await this.$api.product.getGoodsList({
                        ...allQuery,
                        pageSize: this.pageSize,
                        page: this.current
                    });
                    this.navigation = data.navigation
                    this.tableData = data.list.items;
                    this.count = data.list.count;
                    this.topcount = data.count;
                    this.topcount.count = data.list.count;
                    // 回填对应搜索项
                    this.searchOPtions.forEach(curr => {
                        switch (curr.key) {
                            case 'supplier_id':
                                curr.options = data.supplier.map(val => {
                                    return {
                                        value: val.id,
                                        label: val.name
                                    }
                                });
                                break;
                            case 'brand_id':
                                curr.options = data.brand.map(val => {
                                    return {
                                        value: val.id,
                                        label: val.name
                                    }
                                });
                                break;
                            case 'cate_id':
                                curr.options = data.category;
                                break;
                            case 'goods_type':
                                curr.options = [...product.GOODS_TYPES];
                                break;
                            case 'label_id':
                                curr.options = data.labels.map(val => {
                                    return {
                                        value: val.id,
                                        label: val.label
                                    }
                                });
                                break;
                            default:
                        }
                    })
                    // 导出字段
                    this.exportOptions = data.fields || [];
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            handlePageChange(val) {
                this.current = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleSelectionChange(val) {
                const ids = val.map(curr => curr.id);
                this.multipleSelection = ids;
            },
            handleOpreate(type) {
                if(this.multipleSelection.length < 1) {
                    this.$message.warning('请选择商品');
                    return;
                }
                let status;
                if (type == 'up') {
                    status = 10;
                } else if (type == 'down') {
                    status = 0;
                }else if (type=='pre'){
                    status = 1
                }
                this.handleDel(this.multipleSelection, type, status);
            },
            handleDel(id, type, status) {
                let text;
                if(type === 'del') {
                    text = '删除';
                } else {
                    switch (status){
                        case 10:
                            text = '上架';
                            break
                        case 0:
                            text = '下架';
                            break
                        case 1:
                            text = '预上架';
                            break
                    }
                }
                if(type==='del'){
                    this.$confirm(`确认${text}选中商品？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        let ids;
                        if(!_.isArray(id)) {
                            // 单个
                            ids = id;
                        } else {
                            // 批量
                            ids = id.join(',');
                        }
                        try {
                            if(type === 'del') {
                                await this.$api.product.delGoods({ ids });
                            } else {
                                await this.$api.product.setGoodsStatus({ ids, status });
                            }
                            this.getData();
                        } catch (e) {
                            throw new Error(e);
                        }
                    })
                }else{
                    let ids;
                    if(!_.isArray(id)) {
                        // 单个
                        ids = id;
                    } else {
                        // 批量
                        ids = id.join(',');
                    }
                   this.$api.product.setGoodsStatus({ ids, status }).then(()=>{
                        this.getData();
                   })
                }

            }
        }
    }
</script>

<style scoped lang="scss">
@import "../../../styles/variables";
.product-list {
  .tab-top {
    position: relative;
    .add-product-btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%)
    }
  }
  .product-info {
    display: flex;
    .verical-title {
      .in {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height:50px;
        overflow: hidden;
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
  .circle-icon {
    width:6px;
    height:6px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    margin-top: -3px;
    &.type0 {
      background:#595959;
    }
    &.type1 {
      background:#1890FF;
    }
    &.type10 {
      background:#52C41A;
    }
  }
  /deep/ .el-table__header-wrapper, /deep/ .el-table__fixed-header-wrapper {
    th {
    //   background:rgba(245,245,245,1) !important;
    }
  }
  /deep/ .el-tabs.el-tabs--top {
    /deep/ .el-tabs__nav.is-top {
      height: 50px !important;
    }
    /deep/ .el-tabs__item {
      padding: 5px 25px !important;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: $theme;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .icon {
    margin-left: 10px;
    color: $theme;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .el-icon-edit.icon {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #1890FF;
    opacity: 0.65;
  }
}
.look {
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
<style lang="scss">
.product-list{
    .el-tabs{
        padding:0 16px !important;
    }
}
</style>    
