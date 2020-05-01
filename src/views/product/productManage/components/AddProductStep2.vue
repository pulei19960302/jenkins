<template>
  <div class="add-product-step2">
    <!-- 爬楼梯及类目部分 -->
    <!-- <ul class="steps" :class="{'step-scroll': isScroll && showSteps }">
            <li v-for="item in steps"
                :key="item.value"
                :class="{'active': isActive === item.value }"
                @click="handelClick(item)">
                {{ item.label }}
            </li>
            <el-button v-show="isScroll" type="text" size="mini" class="tx" @click="showSteps = false">
                收起 <i class="el-icon-arrow-right"></i>
    </el-button>-->
    <!-- <p v-show="!isScroll">
                <span>您选择的类目：</span><b>{{ step1Data.cat1.label }} > {{ step1Data.cat2.label | validVal }} > {{ step1Data.cat3.label | validVal }}</b>
                <el-button @click="goBackOrNext(0)" v-if="!id" type="text">重新选择</el-button>
    </p>-->
    <!-- </ul> -->
    <el-tabs
      v-model="activeName"
      @tab-click="handelClick()"
    >
      <el-tab-pane v-for="item in steps" :key="item.value" :name="item.value">
        <span slot="label">
          {{ item.label }}
          <span></span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <ul v-show="isScroll && !showSteps" @click="showSteps = true" class="step-scroll unfold">
      <i class="el-icon-plus"></i>
      <p>展开</p>
    </ul>
    <el-tabs
      :class="{'step-scroll': isScroll && showSteps }"
      v-model="activeName"
      v-if="isScroll && showSteps"
      @tab-click="handelClick()"
    >
      <el-tab-pane v-for="item in steps" :key="item.value" :name="item.value">
        <span slot="label">
          {{ item.label }}
          <span></span>
        </span>
      </el-tab-pane>
    </el-tabs>
    <ul v-show="isScroll && !showSteps" @click="showSteps = true" class="step-scroll unfold">
      <i class="el-icon-plus"></i>
      <p>展开</p>
    </ul>
    <!-- 表单部分 -->
    <el-form :model="addGoodsForm" ref="addGoodsForm" label-width="120px" class="form">
      <div class="information model">
        <div class="title">基本信息</div>
        <div class="form">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品名称:" prop="title" :rules="[simpleRule]">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入商品名称"
                  v-model="addGoodsForm.title"
                  maxlength="60"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="副标题:" prop="subtitle">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入商品副标题"
                  v-model="addGoodsForm.subtitle"
                  maxlength="12"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品货号:" prop="goods_sn">
                <el-input v-model="addGoodsForm.goods_sn" placeholder="不输入商品货号，系统将自动生成唯一的货号"></el-input>
                <!-- <p class="tips"></p> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="商品分类" prop="cat_id" :rules="[simpleRule]" key="cat_id">
                <el-cascader
                  style="width:100%"
                  clearable
                  change-on-select
                  filterable
                  expand-trigger="hover"
                  :options="categories"
                  v-model="addGoodsForm.cat_id"
                  :placeholder="'请选择商品分类'"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品排序:" prop="sort">
                <el-input v-model="addGoodsForm.sort" placeholder="请输入商品排序"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商品品牌:" prop="brand_id">
                <el-select
                  clearable
                  filterable
                  v-model="addGoodsForm.brand_id"
                  placeholder="请选商品品牌"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in brands"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="选供应商:" prop="supplier_id">
                <el-select
                  style="width:100%"
                  clearable
                  filterable
                  v-model="addGoodsForm.supplier_id"
                  placeholder="请选择供应商"
                >
                  <el-option
                    v-for="item in suppliers"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="运费模板:" prop="weight">
                <el-select
                  clearable
                  filterable
                  v-model="addGoodsForm.freight_id"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in freights"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="选运费险:" prop="insurance_id">
                <el-select
                  clearable
                  filterable
                  v-model="addGoodsForm.insurance_id"
                  placeholder="请选择运费险"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in insuranceData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <!-- <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="退换货地址:" :rules="[simpleRule]" prop="return_address">
                                <el-input v-model="addGoodsForm.return_address" placeholder="请输入退换货地址"></el-input>
                                <span class="tips">请按照“姓名+“ ”+手机号+“ ”+地址” 的格式进行填写。 “ ”指的是空格</span>
                            </el-form-item>
                        </el-col>
          </el-row>-->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="跨境商品:" prop="cross_border" :rules="[simpleRule]" >
                <!-- <el-select clearable v-model="addGoodsForm.cross_border" placeholder="请选择">
                                    <el-option
                                        v-for="item in cross_border_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                </el-select>-->
                <el-radio-group v-model="addGoodsForm.cross_border">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- <div class="tags-type model">
                <div class="title">
                    商品标签
                </div>
                <div class="form">
                    <el-row :gutter="20">
                        <el-form-item label="商品标签:" prop="label">
                            <el-checkbox-group
                                v-model="addGoodsForm.label_ids">
                                <el-checkbox
                                    v-for="curr in labelData"
                                    :label="curr.id"
                                    :key="curr.id">
                                    {{ curr.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="20">
                        <el-form-item label="列表页标签:" prop="label">
                            <el-checkbox-group
                                :min="0"
                                :max="2"
                                v-model="addGoodsForm.list_label_ids">
                                <el-checkbox
                                    v-for="curr in labelData"
                                    :label="curr.id"
                                    :key="curr.id">
                                    {{ curr.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <p class="tips">标签最多可设置两个</p>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="20">
                        <el-form-item label="详情页标签:" prop="label">
                            <el-checkbox-group
                                :min="0"
                                :max="2"
                                v-model="addGoodsForm.detail_label_ids">
                                <el-checkbox
                                    v-for="curr in labelData"
                                    :label="curr.id"
                                    :key="curr.id">
                                    {{ curr.label }}
                                </el-checkbox>
                            </el-checkbox-group>
                            <p class="tips">标签最多可设置两个</p>
                        </el-form-item>
                    </el-row>
                </div>
      </div>-->
      <div class="parameter model">
        <div class="title">商品参数</div>
        <div class="form" size="mini">
          <el-button
            type="primary"
            @click="handleAddParams"
            size="mini"
            style="margin-left: 20px;margin-bottom: 20px;"
            icon="el-icon-plus"
            plain
          >新增</el-button>
          <el-row :gutter="10" v-for="(params, index) in addParams" :key="index">
            <el-form-item style="display: inline-block" label-width="26px">
              <el-input v-model="params.key" style="width: 220px;">
                <template slot="prepend">属性名:</template>
              </el-input>
            </el-form-item>
            <el-form-item style="display: inline-block" label-width="10px">
              <el-input v-model="params.value" style="width: 300px;">
                <template slot="prepend">属性值:</template>
              </el-input>
            </el-form-item>
            <i class="el-icon-close" @click.prevent="removeParam(params)"></i>
          </el-row>
        </div>
      </div>
      <div class="attribute model">
        <div class="title">销售属性</div>
        <div class="form">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="类目规格:" prop="goods_specification" :rules="[simpleRule]">
                <el-select
                  @change="goodsSpecificationChanged"
                  clearable
                  filterable
                  v-model="addGoodsForm.goods_specification"
                  placeholder="请选择商品规格"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in goodsSpecifications"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <div v-for="(item, idx) in attr" :key="idx" id="sku-table" class="spec-table-box">
            <div
              @click="item.showSpecList=!item.showSpecList,$set(attr,idx,item)"
              class="spec-table"
            >
              {{item.name}}
              <i :class="{arrowBottom:item.showSpecList}" class="el-icon-arrow-right"></i>
            </div>
            <el-checkbox-group
              v-show="item.showSpecList"
              @change="checkedColorsChange"
              class="spec-table-checkbox"
              v-model="checkbox[item.name]"
            >
              <el-checkbox
                v-for="(curr) in item.values"
                :label="curr"
                :key="curr.id"
              >{{ curr.value }}</el-checkbox>
              <i class="el-icon-circle-plus-outline new-attr" @click="addCurrentAttr(item)">新建</i>
            </el-checkbox-group>
          </div> -->
          <div v-for="(item, idx) in attr" :key="idx" id="sku-table" class="spec-table-box">
            <div class="spec-table-box-in">
              <div class="spec-name">
                {{ item.name }}
              </div>
              <el-tag
                :key="index"
                v-for="(it, index) in checkbox[item.name]"
                closable
                @close="handleClose(item.name, index)">
                {{it.value}}
              </el-tag>
              <el-button class="add-sku-btn" size="mini" round @click="addCurrentAttr(item)">添加</el-button>
            </div>
            <div class="check-block">
              <el-checkbox-group
                @change="checkedColorsChange"
                class="spec-table-checkbox"
                v-model="checkbox[item.name]"
              >
                <el-checkbox
                  v-for="(curr) in item.values"
                  :label="curr"
                  :key="curr.id"
                >{{ curr.value }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <!-- 批量填写 -->
          <div class="batch-input">
            批量填写
            <el-input type="number" v-model="shop_price" style="max-width: 120px;" size="mini" placeholder="团购价格" />
            <el-input type="number" v-model="cost_price" style="max-width: 120px;" size="mini" placeholder="成本价格" />
            <el-input type="number" v-model="stock" style="max-width: 120px;" size="mini" placeholder="商品库存" />
            <el-input type="number" v-model="store_price" style="max-width: 120px;" size="mini" placeholder="白银价格" />
            <el-input type="number" v-model="member_price" style="max-width: 120px;" size="mini" placeholder="svip价" />
            <el-input type="number" v-model="team_price" style="max-width: 120px;" size="mini" placeholder="钻石价格" />
            <el-input type="number" v-model="partner_price" style="max-width: 120px;" size="mini" placeholder="黄金价格" />

            <el-dropdown trigger="click" @command="handleCommand($event, typeNames)">
              <span class="el-dropdown-link">
                <el-button type="primary" plain size="mini">应用于</el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="all">全部应用</el-dropdown-item>
                <el-dropdown-item
                  v-for="(item, idex) in excludeColorAttrs"
                  :key="idex"
                  :command="item.value"
                >仅应用于：{{ item.value }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-table
            v-if="attr.length > 0"
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :span-method="objectSpanMethod"
            style="width: calc(100% - 20px); margin: 0 auto 20px 20px"
          >
            <el-table-column width="71" align="center" prop="color" :label="item.name" v-for="(item, index) in (reverseAttr || [])" :key="index">
              <template slot-scope="scope">
                {{ getAttrValue(scope.$index, item.id) }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="money" label="团购价格">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>团购价格</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="请输入"
                  :class="{price_active:scope.row.shop_price_active}"
                  v-model="scope.row.shop_price"
                  style="width: 70%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="money" label="成本价格">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>成本价格</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input type="number" placeholder="请输入" v-model="scope.row.cost_price" style="width: 70%"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="money" label="商品库存">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>商品库存</span>
                  <!-- <el-input v-model="stock" style="max-width: 100px;" size="mini" placeholder />
                  <el-dropdown trigger="click" @command="handleCommand($event, 'stock')">
                    <span class="el-dropdown-link">
                      <i class="el-icon-sort-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="all">全部应用</el-dropdown-item>
                      <el-dropdown-item
                        v-for="(item, idex) in excludeColorAttrs"
                        :key="idex"
                        :command="item.value"
                      >仅应用于：{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
                </div>
              </template>
              <template slot-scope="scope">
                <!-- <el-input v-if="!scope.row.id || (scope.row.id&&status!=10)" placeholder="请输入" v-model="scope.row.stock" style="width: 70%"></el-input> -->
                <el-input v-if="!scope.row.id || (scope.row.id&&status!=10)" type="number" placeholder="请输入" v-model="scope.row.stock" style="width: 70%" @change="changeStoce"></el-input>
                <!-- sku已存在则不可直接编辑库存，通过接口变更 -->
                <div v-else style="text-align:center">
                  <div>{{ scope.row.stock }}</div>
                  <el-button type="text" style="padding:0" @click="handelEditStock(scope.row.id)">编辑库存</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="store_price" label="白银价格">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>白银价格</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="请输入"
                  :class="{price_active:scope.row.store_price_active}"
                  v-model="scope.row.store_price"
                  style="width: 70%"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="member_price" label="svip价">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>svip价</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="请输入"
                  :class="{member_price_active:scope.row.member_price_active}"
                  v-model="scope.row.member_price"
                  style="width: 70%"
                ></el-input>
                <!-- <i class="el-icon-close" @click.prevent="removeCurrentColumn(scope.row)"></i> -->
              </template>
            </el-table-column>

            <el-table-column align="center" prop="team_price" label="钻石价">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>钻石价</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="请输入"
                  :class="{team_price_active:scope.row.team_price_active}"
                  v-model="scope.row.team_price"
                  style="width: 70%"
                ></el-input>
                <!-- <i class="el-icon-close" @click.prevent="removeCurrentColumn(scope.row)"></i> -->
              </template>
            </el-table-column>

                       <el-table-column align="center" prop="partner_price" label="黄金价">
              <template slot="header" slot-scope="scope">
                <div class="flex-center">
                  <span>黄金价</span>
                </div>
              </template>
              <template slot-scope="scope">
                <el-input
                  type="number"
                  placeholder="请输入"
                  :class="{price_active:scope.row.partner_priceFthis_active}"
                  v-model="scope.row.partner_price"
                  style="width: 70%"
                ></el-input>
                <!-- <i class="el-icon-close" @click.prevent="removeCurrentColumn(scope.row)"></i> -->
              </template>
            </el-table-column>
            <el-table-column align="center" prop="partner_price" label="操作" width="50px">
              <template slot-scope="scope">
                <!-- <span class="handle-clear" @click.prevent="clearCurrentColumn(scope.$index)">清空</span> -->
                <i class="el-icon-close" @click.prevent="removeCurrentColumn(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="sku-images">
            <div>规格图片<span class="prompt">（没有规格图片时，默认显示主图。买家选择不同规格会看到对应规格图片，建议尺寸：500 x 500像素）</span> <el-button size="mini" round @click="copyAll">一键复用到所有sku主图</el-button></div>
            <div class="sku-img-list">
              <div v-for="(item, index) in colors" :key="index" style="margin-top: 10px;">
                <i v-if="sku_imgs[item.id] && sku_imgs[item.id]['thumb']" class="el-icon-close clear-btn" @click.stop="removeSkuImg(item.id)"></i>
                <FileUpload
                  :isOnly="true"
                  :isNew="true"
                  :fileList="sku_imgs[item.id] ? [{ url: sku_imgs[item.id]['thumb'] }] : []"
                  @successUploadCBK="thumbUploadCBK($event, item.id)"
                  class="file-button"
                ></FileUpload>
                <b class="sku-name">{{ item.value }}</b>
              </div>
            </div>
          </div>

                              <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="商品总库存:" prop="stock" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.stock" placeholder="请输入商品总库存" :disabled="type === 'edit'">
                                    <template slot="append">个</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售数量:" prop="sale_num">
                                <el-input v-model="addGoodsForm.sale_num" placeholder="请输入销售数量">
                                    <template slot="append">个</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="运费险:" prop="insurance_id">
                                <el-select clearable filterable v-model="addGoodsForm.insurance_id" placeholder="请选择运费险" style="width: 50%;">
                                    <el-option
                                        v-for="item in insuranceData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
          
          <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="市场价:" prop="market_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.market_price" placeholder="请输入市场价" size="mini">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="成本价:" prop="cost_price">
                                <el-input v-model="addGoodsForm.cost_price" placeholder="请输入成本价">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="团购价:" prop="shop_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.shop_price" placeholder="请输入团购价">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">

                        <el-col :span="8">
                            <el-form-item label="svip价:" prop="member_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.member_price" placeholder="请输入svip价格">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="白银价格:" prop="store_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.store_price" placeholder="请输入白银价格">
                                    <template slot="append">元</template>
                                </el-input>
                                <!-- <p class="tips">若为百分比，请加单位%</p> -->
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="钻石返利:" prop="team_fee">
                                <el-input v-model="addGoodsForm.team_fee" placeholder="请输入钻石差价">
                                    <template slot="append">元 / %</template>
                                </el-input>
                                <p class="tips">若为百分比，请加单位%</p>
                            </el-form-item>
                        </el-col> -->
                                                <el-col :span="8">
                            <el-form-item label="黄金价:" prop="partner_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.partner_price" placeholder="请输入黄金价格">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="20">    

                        <el-col :span="8">
                            <el-form-item label="钻石价:" prop="team_price" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.team_price" placeholder="请输入钻石价格">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                                              <el-col :span="8">
                            <el-form-item label="白银平级返利:" prop="first_fee" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.first_fee" placeholder="请输入白银平级返利">
                                    <template slot="append">元</template>
                                </el-input>
                                <!-- <p class="tips">若为百分比，请加单位%</p> -->
                            </el-form-item>
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="黄金平级返利:" prop="team_angel1" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.team_angel1" placeholder="请输入黄金平级返利">
                                    <template slot="append">元</template>
                                </el-input>
                                <!-- <p class="tips">若为百分比，请加单位%</p> -->
                            </el-form-item>
                        </el-col> 
                    </el-row>
                    <el-row :gutter="20">

                        <!-- <el-col :span="8">
                            <el-form-item label="二级返利:" prop="second_fee" :rules="[simpleRule]">
                                <el-input v-model="addGoodsForm.second_fee" placeholder="请输入二级返利">
                                    <template slot="append">元 / %</template>
                                </el-input>
                                <p class="tips">若为百分比，请加单位%</p>
                            </el-form-item>
                        </el-col>
                        -->
  
                    </el-row>
                    <!-- <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="虚拟总库存:">
                                <el-input disabled v-model="addGoodsForm.show_stock_num" placeholder="请输入虚拟总库存">
                                    <template slot="append">个</template>
                                </el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="组合购数量:">
                                <el-input v-model="addGoodsForm.zu_num" placeholder="请输入整数">
                                </el-input>
                                <p class="tips">若为组合购，请填写整数，否则为0</p>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <!-- <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="虚拟总库存倍数:">
                                <el-input v-model="addGoodsForm.stock_double" placeholder="请输入虚拟总库存">
                                    <template slot="append">倍</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虚拟销售基数:">
                                <el-input v-model="addGoodsForm.stock_base" placeholder="请输入虚拟总库存">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="虚拟销售倍数:">
                                <el-input v-model="addGoodsForm.stock_multiple" placeholder="请输入虚拟总库存">
                                    <template slot="append">倍</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <!-- <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label-width="140px" label="顾客下单奖励积分:" prop="integral_customer_point">
                                <el-input v-model="addGoodsForm.integral_customer_point" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="下单奖励积分:" prop="buyer_point">
                                <el-input v-model="addGoodsForm.buyer_point" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label-width="140px" label="一级奖励积分:" prop="first_point">
                                <el-input v-model="addGoodsForm.first_point" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="二级奖励积分:" prop="second_point">
                                <el-input v-model="addGoodsForm.second_point" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
        </div>
      </div>

      <div class="imgs model describe">
        <div class="title">商品描述</div>
        <div class="form">
          <!-- <el-form-item label="商品图片:">
            <ul class="goods-img">
              <li
                class="minor-imgs minor-imgs-index"
                :style="{ backgroundImage: thumb.length > 0 ? `url(${thumb[0]})` : ''}"
                @click="handlePreview(thumb[0])"
              >
                主图
                <div
                  v-if="thumb.length > 0 && imgs.length>0"
                  @click.stop="moveMainImg"
                  class="shade"
                >
                  <i class="el-icon-caret-right"></i>
                </div>
              </li>
              <div class="goods-button">
                <span class="tips">建议宽度750px，高度不限</span>
                <FileUpload
                  :isOnly="true"
                  :isBotton="true"
                  @successUploadCBK="thumbUploadCBK($event, 'thumb')"
                  class="file-button"
                ></FileUpload>
                <el-button size="mini" type="text">从图库选择</el-button>
              </div>
              <li
                class="minor-imgs"
                v-for="(item, index) in imgs"
                :key="index"
                :style="{ backgroundImage: `url(${item})` }"
                @mouseenter="currImgIndex = index"
                @mouseleave="currImgIndex = null"
                @click="handlePreview(item)"
              >
                <i class="el-icon-circle-close-outline" @click.stop="removeMinorImgs(index)"></i>
                次图
                <div class="shade" v-show="currImgIndex === index">
                  <i
                    class="el-icon-caret-left"
                    v-if="index > 0"
                    @click.stop="shiftMinorImg(index, item, 'left')"
                  ></i>
                  <i
                    class="el-icon-caret-right"
                    v-if="index < imgs.length - 1"
                    @click.stop="shiftMinorImg(index, item, 'right')"
                  ></i>
                </div>
              </li>
              <div style="display: inherit">
                <p v-for="n in (4-imgs.length)" :key="n" class="other-img">次图</p>
              </div>
              <div class="goods-button">
                <span class="tips">建议宽度750px，最多四张</span>
                <FileUpload
                  :isBotton="true"
                  @successUploadCBK="imgSuccessUploadCBK($event, 'imgs')"
                  :limit="limit"
                >次图上传</FileUpload>
                <el-button size="mini" type="text">从图库选择</el-button>
              </div>
            </ul>
          </el-form-item> -->
          <el-form-item label="商品图片:" class="item-flex">
            <multiImgUpload topTitle="商品主图" :isNew="true" :hasMove="true" @handlePreview="handlePreview" :limit="5" :imgs.sync="productImgs"></multiImgUpload>
            <div class="prompt">
              <div>1.尺寸：800 x 800 像素</div>
              <div>2.大小：3M以内</div>
              <div>3.数量：限制在5张以内</div>
            </div>
          </el-form-item>
          <el-form-item label="商品视频:" class="item-flex video">
            <!-- <div class="goods-vidoe">
              <i class="el-icon-circle-close-outline" @click="removeVideo"></i>
              <video :src="videoUrl" controls preload v-if="videoUrl"></video>
              <span v-else>
                视频
                <span class="tips">建议尺寸16:9</span>
              </span>
            </div> -->
            <FileUpload
              :isNew="true"
              :btnDesc="'点击上传'"
              :isBotton="true"
              :isOnly="true"
              :fileList="videoUrl ? [{ name: videoUrl, url: videoUrl }] : []"
              listType="text"
              @successUploadCBK="videoSuccessUploadCBK"
              class="file-button"
            >视频上传</FileUpload>
            <span class="prompt">1.尺寸：此处可使用1：1或16：9比例视频 2.时长：≤60s，建议30秒以内 3.内容：突出商品1-2个核心卖点</span>
            <!-- <el-button size="mini" type="text">从图库选择</el-button> -->
          </el-form-item>
          <el-form-item label="商品长图:" class="item-flex">
            <div>
              <div>
                <FileUpload
                  class="file-upload"
                  :isOnly="true"
                  :isNew="true"
                  @successUploadCBK="imgSuccessUploadCBK($event, 'long_thumb')"
                  :fileList="long_thumb"
                  width="351px"
                  height="140px"
                ></FileUpload>
                <!-- <b>建议尺寸702px * 280px</b> -->
                <!-- <b>建议宽度750px，高度不限</b> -->
              </div>
            </div>
            <div class="prompt">
              <div>1.尺寸：702 x 280 像素</div>
              <div>2.大小：建议3M以内</div>
              <div>3.格式：图片仅支持JPG,PNG格式</div>
              <div>4.显示：展示在首页团购 长图模块 团购商品必须上传</div>
            </div>
          </el-form-item>

          <!-- <el-form-item label="商品简介:" prop="description">
            <Tinymce
              :toolbar="['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link charmap preview anchor pagebreak insertdatetime table emoticons forecolor backcolor fullscreen']"
              :uploadImg="false"
              ref="editor"
              :height="200"
              v-model="addGoodsForm.description"
            />
          </el-form-item> -->
          <el-form-item label="图文详情:" prop="content">
            <Tinymce ref="editor" :height="400" v-model="addGoodsForm.content" />
          </el-form-item>
        </div>
      </div>
      <div class="setting model">
        <div class="title">功能设置</div>
        <div class="form">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="定时上架:" prop="start_at">
                <el-date-picker
                  style="width:100%"
                  value-format="timestamp"
                  size="mini"
                  v-model="addGoodsForm.start_at"
                  type="datetime"
                  placeholder="选择定时上架时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定时下架:" prop="end_at">
                <el-date-picker
                  style="width:100%"
                  value-format="timestamp"
                  size="mini"
                  v-model="addGoodsForm.end_at"
                  type="datetime"
                  placeholder="选择定时下架时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="24h最大购买数:" prop="day_max">
                <el-input v-model="addGoodsForm.day_max" placeholder="24h最大购买数"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="单次最多购买:" prop="single_max">
                <el-input v-model="addGoodsForm.single_max" placeholder="单次最多购买"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单次最低购买:" prop="single_min">
                <el-input v-model="addGoodsForm.single_min" placeholder="单次最低购买"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最多购买:" prop="limit_max">
                <el-input v-model="addGoodsForm.limit_max" placeholder="最多购买"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <div style="font-weight:bold;margin:10px 0">推荐促销:</div> -->

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="列表页标签:" prop="label">
                <el-checkbox-group :min="0" :max="2" v-model="addGoodsForm.list_label_ids">
                  <el-checkbox
                    v-for="curr in labelData"
                    :label="curr.id"
                    :key="curr.id"
                  >{{ curr.label }}</el-checkbox>
                </el-checkbox-group>
                <p class="tips">标签最多可设置两个</p>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="上架平台:" prop="platform">
                <el-radio v-model="addGoodsForm.platform" :label="0">全部</el-radio>
                <el-radio v-model="addGoodsForm.platform" :label="1">app</el-radio>
                <el-radio v-model="addGoodsForm.platform" :label="2">公众号</el-radio>
              </el-form-item>
            </el-col>
          </el-row> -->
        </div>
      </div>
      <div class="sales model">
        <div class="title">推荐促销</div>
        <div class="form">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="热销top榜:" prop="label">
                <el-switch v-model="addGoodsForm.is_quick" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="新品上新:" prop="label">
                <el-switch v-model="addGoodsForm.is_top" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="特价福利:" prop="label">
                <el-switch v-model="addGoodsForm.is_welfare" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="白银礼包:" prop="label">
                <el-switch v-model="addGoodsForm.is_gift" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="添加秒杀:" class="seckill-flag">
                <el-switch v-model="seckill_flag" :active-value="true" :inactive-value="false"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="seckill_flag" :gutter="20">
            <el-form-item label="秒杀时间:">
              <el-date-picker
                v-model="tuan_gou_time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-row>
        </div>
      </div>
    </el-form>

    <div class="complete">
      <!-- <el-button @click="goBackOrNext(0)" v-if="!id">上一步，选择商品分类</el-button> -->
      <el-button type="primary" class="next" @click="handleAddGoods('addGoodsForm')">完成，提交商品</el-button>
    </div>
    <!-- 图片预览 -->
    <PreviewImg :visible.sync="visible" :imgSrc="imgSrc"></PreviewImg>
    <!-- 动态添加销售属性 -->
    <el-dialog title="添加商品属性值" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="submit"
        :rules="submitRules"
        ref="submit"
        label-width="150px"
        label-position="right"
      >
        <el-form-item label="属性名：">
          <span>{{ attr_name }}</span>
        </el-form-item>
        <el-form-item label="参数值：" prop="value">
          <el-input v-model="submit.value" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="是否设置单独sku图：" prop="is_color">
          <el-switch v-model="submit.is_color" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="色值：">
          <el-input v-model="submit.color" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input type="number" v-model="submit.sort" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;resetForm('submit')">取 消</el-button>
        <el-button type="primary" @click="handleAddAttr">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { _,debounce } from "@/OMS/utils";
import { product } from "@/assets/constant"
import { mapState, mapActions } from "vuex";
import multiImgUpload from '@/OMS/components/multiImgUpload/multiImgUpload'
import { async } from 'q';
const TYPE_NAMES = ['shop_price', 'cost_price', 'stock', 'store_price', 'partner_price','member_price','team_price']
let id = 0;
let container;
export default {
  name: "AddProductStep2",
  components: {
    multiImgUpload,
  },
  props: {
    // step1Data: {
    //     type: Object,
    //     required: true
    // },
    editData: {
      type: Object
    },
    id: {
      type: [String, Number]
    }
  },
  data() {
    const { type } = this.$route.params;
    return {
      typeNames: TYPE_NAMES,
      activeName: 'information',
      productImgs: [],
      provinceData: [],
      cityData: [],
      countyData: [],
      townData: [],
      status: "", // 商品状态
      seckill_flag: false, //是否添加团购
      is_coupon_convert: false, //是否可以优惠券兑换
      showSteps: true,
      currImgIndex: null,
      simpleRule: { required: true, message: "必填项", trigger: "change" },
      addParams: [],
      attr_id: null,
      dialogVisible: false,
      categories: [], // 商品分类
      type,
      rules: {},
      imgSrc: "",
      freights: [],
      brands: [],
      param: [],
      suppliers: [],
      stock: null,
      cost_price: null,
      shop_price: null,
      partner_price: null,
      activity_price: null,
      member_price: null,
      user_price: null,
      store_price: null,
      team_price:null,
      isScroll: false,
      isActive: "information",
      goodsTypes: [...product.GOODS_TYPES],
      steps: [...product.STEPS],
      selectedOptions2: [],
      visible: false,
      imgs: [],
      thumb: [],
      sku_imgs: {},
      videoUrl: "",
      tableData: [],
      editSkuData: [],
      options: [],
      address: [],
      addGoodsForm: {
        label_ids: [],
        list_label_ids: [],
        detail_label_ids: [],
        user_price: "10%",
        member_price: "",
        freight_id: "",
        store_price: "",
        team_fee: 0,
        first_fee: "2",
        cross_border: 2,
        second_fee: "0",
        combination: 0,
        sale_num: 0,
        zu_num: 0,
        stock_double: 1,
        is_quick: 0,
        is_top: 0,
        is_welfare: 0,
        partner_price: "",
        is_gift: 0,
        team_strategy1: 0,
        team_senior1: 0,
        team_angel1: "",
        brand_id: "",
        // 积分
        integral_customer_point: "",
        buyer_point: "",
        first_point: "",
        second_point: "",
        goods_specification: null, // 商品规格
        cat_id: null,
        // tuan_gou_time:[], // 团购时间 (seckill_begin_time,seckill_end_time)
        return_address: "",
        // platform: 0,
        // is_free:0
      },
      long_thumb: [],
      tuan_gou_time: [], // 团购时间 (seckill_begin_time,seckill_end_time)
      cross_border_options: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],
      addGoodsFormParam: {},
      goodsSpecifications: [],
      attr: [],
      labelData: [],
      insuranceData: [],
      checkbox: {},
      submit: {
        value: "",
        sort: "10",
        color: "",
        is_color: 1
      },
      attr_name: "",
      submitRules: {
        value: [{ required: true, message: "请输入", trigger: "change" }],
        sort: [{ required: true, message: "请输入", trigger: "change" }]
      }
    };
  },
  computed: {
    getAttrValue () {
      return (index, attr_id) => {
        if (typeof index === 'number') {
          let arr = this.tableData[index]
          let value = ''
          arr.forEach(v => {
            if (v.attr_id == attr_id) {
              value = v.value
            }
          })
          return value
        }
      }
    },
    reverseAttr() {
      let attr = [...this.attr]
      return attr.reverse();
    },
    limit() {
      return 4 - this.imgs.length;
    },
    // 从sku过滤出所有颜色（is_color），上传图片用
    colors() {
      const arr = [];
      const ids = [];
      this.tableData.map(item => {
        if (!_.isArray(item)) return;
        item.map(val => {
          if (val.is_color == 1) {
            if (!ids.includes(val.id)) {
              ids.push(val.id);
              arr.push(val);
            }
          }
        });
      });
      return arr;
    },
    // 从sku过滤出非颜色属性，批量设置用
    excludeColorAttrs() {
      const arr = [];
      const ids = [];
      this.tableData.map(item => {
        if (!_.isArray(item)) return;
        item.map(val => {
          if (val.is_color != 1) {
            if (!ids.includes(val.id)) {
              ids.push(val.id);
              arr.push(val);
            }
          }
        });
      });
      return arr;
    }
  },
  watch: {
    "addGoodsForm.supplier_id"(val, prev) {
      this.freights = [];
      if (prev !== undefined) {
        this.addGoodsForm.freight_id = "";
      }
      if (val) {
        this.getFreights(val);
      } else {
        this.getFreights(null);
      }
    },
    checkbox: {
      handler(val, oldVal) {
        this.checkedColorsChange();
      },
      deep: true
    },
    // tableData (val, prev) {
    //   this.changeStoce()
    // },
    deep: true
  },
  created() {
    if (!this.id) {
      this.getFreights(null);
    }
    this.getLabelData();
    this.getInsuranceList();
    this.getAttrs().then(async bool => {
      if (bool && this.id) {
        const { detail, skuData, attr } = this.editData;
        this.status = detail.status;

        this.addGoodsForm = detail;
        this.addGoodsForm.cat_id = [
          String(detail.cat_id1),
          String(detail.cat_id2),
          String(detail.cat_id3)
        ];
        if (this.addGoodsForm.brand_id == 0) {
          this.addGoodsForm.brand_id = "";
        }
        this.addGoodsForm.goods_specification = String(detail.type_id);
        // 回显标签
        this.addGoodsForm.label_ids =
          detail.label_ids.length > 0
            ? detail.label_ids.split(",").map(val => Number(val))
            : [];
        this.addGoodsForm.list_label_ids =
          detail.list_label_ids && detail.list_label_ids.length > 0
            ? detail.list_label_ids.split(",").map(val => Number(val))
            : [];
        this.addGoodsForm.detail_label_ids =
          detail.detail_label_ids && detail.detail_label_ids.length > 0
            ? detail.detail_label_ids.split(",").map(val => Number(val))
            : [];

        if (detail.seckill_flag == 1) {
          this.seckill_flag = true;
          this.tuan_gou_time = [
            this.$moment(+new Date(detail.seckill_begin_time) * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            this.$moment(+new Date(detail.seckill_end_time) * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          ];
        }
        if (detail.is_coupon_convert == 1) {
          this.is_coupon_convert = true;
        }

        // tips提交给后台的时间戳精确到秒，回填补全
        if (detail.start_at)
          this.addGoodsForm.start_at = detail.start_at * 1000;
        if (detail.end_at) this.addGoodsForm.end_at = detail.end_at * 1000;
        // 回显图片 thumb -------------
        this.long_thumb = detail.long_thumb ? [{ url: detail.long_thumb }] : [];
        let productImgs = [];
        productImgs.push({ url: detail.thumb });
        (detail.imgs || []).forEach(v => {
          productImgs.push({ url: v });
        });
        this.productImgs = productImgs;
        // ----------
        // if (detail.thumb) this.thumb = [detail.thumb];
        // if (detail.imgs) this.imgs = detail.imgs.slice(-4);
        if (detail.sku_imgs) this.sku_imgs = detail.sku_imgs;
        if (detail.video) this.videoUrl = detail.video;
        // 回显商品属性
        if (detail.param) this.addParams = detail.param;

        // 回显销售属性
        attr.forEach(val => {
          val.showSpecList = false;
          this.$set(this.checkbox, val.name, []);
        });
        this.attr = attr;
        if (detail.properties && detail.properties.length > 0) {
          detail.properties.map(val => {
            const ids = val.values.map(curr => curr.attribute_id);
            attr.map(curr => {
              if (curr.id == val.attr_id) {
                curr.values.map(current => {
                  if (ids.includes(current.id))
                    this.checkbox[val.attr_name].push(current);
                });
              }
            });
          });
          this.tableData = skuData;
          this.editSkuData = skuData;
        }
      }
    });
  },
  mounted() {
    // 页面渲染后container增加监听事件
    container = document.querySelector(".app-main");
    container.style.scrollBehavior = 'smooth'
    container.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 页面销毁移除container监听事件
    container.removeEventListener("scroll", this.handleScroll);
    container.style.scrollBehavior = 'auto'
  },
  methods: {
    ...mapActions("tagsView", ["delVisitedViews"]),
    changeStoce () {
      let total = 0;
      this.tableData.forEach(v => {
        if (v.stock) {
          total += parseFloat(v.stock)
        }
      })
      this.addGoodsForm.stock = total
    },
    removeSkuImg (id) {
      // let sku_imgs = {...this.sku_imgs}
      // delete sku_imgs[id]
      // this.sku_imgs = sku_imgs
      this.$set(this.sku_imgs, id, { thumb: '' });
    },
    getRowspan ({ row, column, rowIndex, columnIndex }) {
      let isSame = false
      let value = ''
      let num = []
      this.tableData.forEach((v, index) => {
        if (v[columnIndex]) {
          if (!value || value !== v[columnIndex].value) {
            value = v[columnIndex].value;
            num[num.length] = 1
          } else {
            num[num.length - 1] += 1
          }
        } else {
          if (!value) {
            num[num.length] = 1
          } else {
            num[num.length - 1] += 1
          }
        }
      })
      let rowA = 0
      let rowspan = 0
      for (let i = 0; i < num.length; i++) {
        if (rowIndex === rowA) {
          rowspan = num[i]
          break
        }
        rowA += num[i]
      }
      return { rowspan, size: num.length }
    },
    objectSpanMethod (obj) {
      if (obj.columnIndex < this.attr.length) {
        let { rowspan, size } = this.getRowspan(obj)
        let last = this.getRowspan({ ...obj, columnIndex: obj.columnIndex === 0 ? 0 : obj.columnIndex - 1 })
        let sizeLast = last.size
        return {
          rowspan: obj.columnIndex === 0 ? rowspan : size <= sizeLast ? 1 : rowspan,
          colspan: 1
        }
      }
      return {
        rowspan: 1,
        colspan: 1
      }
    },
    handleClose (name, index) {
      let checkbox = {...this.checkbox}
      checkbox[name].splice(index, 1);
      this.checkbox = checkbox
      // let attr = [...this.attr]
      // attr[idx].values.splice(index, 1);
      // this.attr = attr
    },
    // 级联数据
    async getCityData(pid, type) {
      try {
        const { data } = await this.$api.common.getAreaList({ pid });
        this[`${type}Data`] = data;
        data.forEach(v => {
          v.children = [];
        });
        return data;
      } catch (e) {
        throw new Error(e);
      }
    },
    goodsSpecificationChanged(v) {
      // 根据规格 id 获取规格参数
      this.$api.product
        .getGoodsSpecificationDetail({
          type_id: v
        })
        .then(res => {
          // 指定初始值位数组
          res.data.forEach(val => {
            val.showSpecList = false;
            this.$set(this.checkbox, val.name, []);
          });
          this.attr = res.data;
          this.checkbox = {};
          this.attr.forEach(val => {
            val.showSpecList = false;
            this.$set(this.checkbox, val.name, []);
          });
          this.tableData = [];
        });
    },
    // 运费险
    async getInsuranceList() {
      try {
        const { data } = await this.$api.setting.getInsuranceList();
        this.insuranceData = data.items;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 标签
    async getLabelData() {
      try {
        const { data } = await this.$api.product.getLabelList({
          status: 10
        });
        this.labelData = data.items;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 根据供应商获取物流模板
    async getFreights(supplier_id) {
      try {
        const { data } = await this.$api.product.getFreights({ supplier_id });
        this.freights = data;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 编辑已存在的sku库存
    handelEditStock(sku_id) {
      this.$prompt("添加 / 减少库存（减库存请输入负值）", "编辑库存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(async ({ value }) => {
        if (!value) return;
        try {
          const { data } = await this.$api.product.goodsSetSkuStock({
            id: sku_id,
            stock: value
          });
          // 修改成功后，改变当前sku原库存同时变更该商品数量
          this.$message.success("新库存编辑成功");
          this.tableData.forEach(curr => {
            if (curr.id === sku_id) this.$set(curr, "stock", data.sku_stock);
          });
          this.changeStoce()
          this.addGoodsForm.stock = data.total_stock;
        } catch (e) {
          throw new Error(e);
        }
      });
    },
    /**
     * 次图左右移动
     * @param index     需要移动图片索引
     * @param img       需要移动图片
     * @param direction 移动方向
     */
    shiftMinorImg(index, img, direction) {
      const imgsCopy = [...this.imgs];
      const nextIndex = direction === "left" ? index - 1 : index + 1;
      imgsCopy.splice(nextIndex, 1, img);
      imgsCopy.splice(index, 1, this.imgs[nextIndex]);
      this.imgs = imgsCopy;
    },
    removeMinorImgs(index) {
      this.imgs.splice(index, 1);
    },
    removeVideo() {
      this.videoUrl = "";
    },
    moveMainImg() {
      const temp = this.thumb[0];
      this.thumb = [this.imgs[0]];
      this.imgs.splice(0, 1, temp);
    },
    // 删除sku当前行
    removeCurrentColumn(row) {
      if (row.id) {
        this.tableData = this.tableData.filter(val => val.id !== row.id);
      } else {
        this.tableData = this.tableData.filter(val => !_.isEqual(val, row));
      }
    },
    clearCurrentColumn(index) {
      this.typeNames.forEach(v => {
        this.tableData[index][v] = null
      })
    },
    // 动态添加商品属性
    handleAddParams() {
      this.addParams.push({
        key: "",
        value: ""
      });
    },
    // 删除对应商品属性
    removeParam(item) {
      const index = this.addParams.indexOf(item);
      if (index !== -1) this.addParams.splice(index, 1);
    },
    // 弹出新建销售属性 dialog
    addCurrentAttr({ name, id }) {
      if (
        this.addGoodsForm.goods_specification !== 0 &&
        !this.addGoodsForm.goods_specification
      ) {
        this.$message.error("请先选择商品类目规格");
        return;
      }
      this.attr_id = id;
      this.attr_name = name;
      this.dialogVisible = true;
    },
    // 新建销售属性
    handleAddAttr() {
      this.$refs.submit.validate(async valid => {
        const params = Object.assign({}, this.submit);
        params.attr_id = this.attr_id;
        params.type_id = this.addGoodsForm.goods_specification;
        params.goods_id = this.id || this.goods_id;
        if (valid) {
          await this.$api.product.attrValueAdd(params);
          this.getAttrData();
          this.resetForm("submit");
          this.dialogVisible = false;
        }
      });
    },
    // 获取该商品基础属性
    async getAttrData() {
      try {
        const { data } = await this.$api.product.attrValueList({
          attr_id: this.attr_id,
          type_id: this.addGoodsForm.goods_specification,
          goods_id: this.id || this.goods_id
        });
        const attrFilter = this.attr.filter(it => {
          return it.id == this.attr_id;
        });
        const ids = attrFilter[0].values.map(it => it.id);
        const newChild = data.items.filter(it => {
          return !ids.includes(it.id);
        });
        this.attr.forEach(it => {
          if (it.id == this.attr_id) {
            it.values.push(newChild[0]);
          }
        });
      } catch (e) {}
    },
    // table内列数据批量设置
    handleCommand(command, type) {
      this.tableData.forEach(curr => {
        if (command !== "all") {
          // 部分设置除开颜色外对应的列数据（tips: 已存在的sku禁止直接设置库存）
          curr.forEach(val => {
            // if(val.value === command && (!curr.id || (curr.id && type !== 'stock'))) this.$set(curr, type, this[type]);
            if (val.value === command) {
              if (typeof type === 'string') {
                this.$set(curr, type, this[type]);
              } else {
                type.forEach(v => {
                   this.$set(curr, v, this[v]);
                })
              }
            }
          });
        } else {
          // 全部设置该列所有数据（tips: 已存在的sku禁止直接设置库存）
          // if(!curr.id || (curr.id && type !== 'stock')) this.$set(curr, type, this[type]);
          // 全部设置该列所有数据（tips: 已上架禁止直接设置库存）
          // if(!curr.id || (curr.id && this.status!=10)) this.$set(curr, type, this[type]);
          if (typeof type === 'string') {
            this.$set(curr, type, this[type]);
          } else {
            type.forEach(v => {
                this.$set(curr, v, this[v]);
            })
          }
        }
      });
    },
    // 一键复用到所有sku主图
    copyAll() {
      this.colors.map(val => {
        // this.$set(this.sku_imgs, val.id, { thumb: this.thumb[0] });
        this.$set(this.sku_imgs, val.id, { thumb: this.productImgs[0].url });
      });
    },
    // 滚动时，判读对应tab
    handleScroll:debounce(function() {
        
      this.$nextTick(() => {
        if (container.scrollTop > 100) {
        this.isScroll = true;
        } else {
        this.isScroll = false;
        }
        if(this.disableScroll){
            setTimeout(() => {
                this.disableScroll = false
            }, 2000);
            return
        }
        this.steps.forEach(curr => {
          const currH = document.querySelector(`.${curr.value}`);
          if (!currH) return;
          if (container.scrollTop > parseInt(currH.offsetTop) - 120){
              this.isActive = curr.value;
              this.activeName = curr.value;
          }
        });
      });
    },30),
    // 点击时，滚动到指定位置
    handelClick() {
      this.isActive = this.activeName;
      const currH = document.querySelector(`.${this.activeName}`);
      this.$nextTick(() => {
        this.disableScroll = true
        container.scrollTo(0, parseInt(currH.offsetTop) - 50);
      });
    },
    // 图片预览
    handlePreview(item) {
      if (!item) return;
      this.imgSrc = item;
      this.visible = true;
    },
    // 主图上传成功回调
    thumbUploadCBK(val, type) {
      if (type === "thumb") {
        // 统一主图
        this.thumb = [...val];
      } else {
        // 单独sku主图
        this.$set(this.sku_imgs, type, { thumb: val });
      }
    },
    // 次图上传成功回调
    imgSuccessUploadCBK(val, type) {
      if (type === "imgs") {
        this.imgs = [...this.imgs, ...val].slice(-4);
      } else {
        this.long_thumb = [{ url: val[0] }];
      }
    },
    // 视频上传成功回调
    videoSuccessUploadCBK(val) {
      console.log(val)
      this.videoUrl = val[0];
    },
    // 添加、编辑商品
    handleAddGoods(formName) {
      // if(this.addGoodsForm.is_free==1 && this.long_thumb.length===0){
      //     this.$message.error('免单商品需要上传商品长图')
      //     return
      // }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const formData = Object.assign({}, this.addGoodsForm);
          formData.long_thumb = this.long_thumb[0]
            ? this.long_thumb[0].url
            : "";
          formData.type = this.addGoodsForm.goods_specification;
          if (!formData.brand_id) {
            formData.brand_id = 0;
          }
          if (this.seckill_flag) {
            // 添加团购
            formData.seckill_begin_time = +(
              +new Date(this.tuan_gou_time[0]) / 1000
            ).toFixed(0);
            formData.seckill_end_time = +(
              +new Date(this.tuan_gou_time[1]) / 1000
            ).toFixed(0);
          } else {
            formData.seckill_begin_time = "";
            formData.seckill_end_time = "";
          }
          formData.seckill_flag = Number(this.seckill_flag);
          formData.is_coupon_convert = Number(this.is_coupon_convert);
          // 构造step1
          // if(this.step1Data.cat1) formData.cat_id1 = this.step1Data.cat1.id;
          // if(this.step1Data.cat2) formData.cat_id2 = this.step1Data.cat2.id;
          // if(this.step1Data.cat3) formData.cat_id3 = this.step1Data.cat3.id;
          formData.cat_id1 = this.addGoodsForm.cat_id[0] || null;
          formData.cat_id2 = this.addGoodsForm.cat_id[1] || 0;
          formData.cat_id3 = this.addGoodsForm.cat_id[2] || 0;
          // 商品标签
          formData.label_ids = [...formData.label_ids].join(",");
          formData.list_label_ids = [...formData.list_label_ids].join(",");
          formData.detail_label_ids = [...formData.detail_label_ids].join(",");
          // 构造picture
          // sku_imgs ---------------
          if (!this.productImgs[0]) {
            this.$message.error("请上传商品主图");
            return;
          }
          let productImgs = [];
          (this.productImgs).forEach(v => {
            productImgs.push(v.url);
          });
          // formData.thumb = this.thumb[0];
          // formData.imgs = this.imgs.slice(-4);
          formData.thumb = productImgs[0];
          formData.imgs = productImgs.slice(-4).splice(1);
          // ----------------------
          formData.sku_imgs = this.sku_imgs;
          formData.video = this.videoUrl;
          // 构造时间至秒
          formData.start_at = formData.start_at ? formData.start_at / 1000 : "";
          formData.end_at = formData.end_at ? formData.end_at / 1000 : "";
          // 构造attr_datas(编辑第一位是sku_id)
          const attr_datas = [];
          let submitFlag = false;
          this.tableData.map((curr, xindex) => {
            const attr_ids = curr.map(attr => attr.id);
            if (!curr.shop_price || !+curr.shop_price) {
              curr.shop_price_active = true;
              curr.shop_price = formData.shop_price;
              submitFlag = true;
            }
            if (!curr.store_price || !+curr.store_price) {
              curr.store_price_active = true;
              curr.store_price = formData.store_price;
              submitFlag = true;
            }
            if (!curr.partner_price || !+curr.partner_price) {
              curr.partner_price_active = true;
              curr.partner_price = formData.partner_price;
              submitFlag = true;
            }
            attr_datas.push([
              curr.id || 0,
              attr_ids.join(","),
              curr.shop_price,
              curr.cost_price,
              curr.stock,
              curr.member_price,
              curr.store_price,
              curr.user_price,
              curr.activity_price,
              curr.partner_price,
              curr.team_price
            ]);
          });
          if (submitFlag) {
            this.tableData = this.tableData.map(it => it);
            const currH = document.querySelector(`#sku-table`);
            this.$nextTick(() => {
              container.scrollTo(0, parseInt(currH.offsetTop) - 40);
            });
            this.$message({
              message:
                "检查到部分规格没有填写价格，已为您自动填写。红色价格为系统自动填写，请确认后提交",
              type: "error",
              duration: 10000
            });
            return;
          }
          formData.attr_datas = attr_datas;
          // 构造param
          formData.params = this.addParams.filter(
            curr => curr["key"] && curr["value"]
          );
          if (formData.param) delete formData.param;
          if (!formData.thumb) {
            this.$message.error("请上传商品主图");
            return;
          }
          if (formData.imgs.length < 1) {
            this.$message.error("请至少上传一张商品次图");
            return;
          }
          if (formData.properties) delete formData.properties;
          formData.goods_id = this.id || this.goods_id;
          // 编辑(tips:来自货源中心的商品需要重新新建)
          if (this.id && this.type === "edit") formData.goods_id = this.id;
          // 复制的商品 启用新id
          if (this.id && this.type === "copy") {
            formData.goods_id = this.goods_id;
            formData.old_goods_id = this.id;
            delete formData.id;
          }
          try {
            await this.$api.product.handleAddGoods(formData);
            // 添加成功后，删除多页面中该标签并跳转商品列表页
            // this.delVisitedViews({
            //     name: "AddProduct"
            // }).then(() => {
            this.$router.push({ name: "ProductList" });
            // });
          } catch (e) {
            throw new Error(e);
          }
        } else {
          this.$message.error("请确认信息是否填写完整");
        }
      });
    },
    resetForm(formName) {
      this.submit.value = "";
      this.submit.sort = "10";
      this.submit.color = "";
      // this.$refs[formName].resetFields();
    },
    async getAttrs() {
      try {
        const { data } = await this.$api.product.getAttrs({
          cat_id: 0,
          goods_id: this.id || 0
        });
        // 新增 填写默认值
        if (!this.id) {
          const {
            team_angel1,
            // team_senior1,
            // team_strategy1,
            integral_customer_point,
            buyer_point,
            first_point,
            second_point
          } = data.config;
          Object.assign(this.addGoodsForm, {
            team_angel1: team_angel1.key_value,
            // team_senior1:team_senior1.key_value,
            // team_strategy1:team_strategy1.key_value,
            integral_customer_point: integral_customer_point.key_value,
            buyer_point: buyer_point.key_value,
            first_point: first_point.key_value,
            second_point: second_point.key_value
          });
        }
        this.goodsSpecifications = data.typeList;
        this.goods_id = data.goods_id;
        this.brands = data.brand;
        this.suppliers = data.supplier;
        this.categories = data.category;
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(false);
        throw new Error(e);
      }
    },
    goBackOrNext(val) {
      this.$emit("update:active", val);
    },
    /**
     * 动态生成笛卡尔数组
     * @param attrArr   传入的属性数组
     * @returns {Array}
     */
    cartesian(attrArr) {
      const arr = [];
      (function f(t, a, n) {
        if (n == 0) return arr.push(t);
        for (let i = 0; i < a[n - 1].length; i++) {
          f(t.concat(a[n - 1][i]), a, n - 1);
        }
      })([], attrArr, attrArr.length);
      return arr;
    },
    // 判断两个数组元素是否相同(允许顺序不同)
    sameArr(arr1, arr2) {
      return (
        arr1.every(it => arr2.includes(it)) &&
        arr2.every(it => arr1.includes(it))
      );
    },
    // sku属性发生变化，动态回填已填写数据
    checkedColorsChange() {
      const arr = [];
      Object.values(this.checkbox).map(curr => {
        if (curr.length > 0) arr.push(curr);
      });
      const oldTableData = [...this.tableData];
      this.tableData = [...this.cartesian(arr)];
      if (oldTableData.length > 0) {
        oldTableData.forEach((curr, index) => {
          this.tableData.forEach(val => {
            const valIds = val.map(v => `${v.attr_id}:${v.id}`);
            // 编辑后的回显
            if (_.isEqual(this.editSkuData, oldTableData)) {
              // 存在id相互匹配
              if (this.sameArr(curr.properties.split(","), valIds)) {
                this.checkMethod(oldTableData, index, val, "cost_price");
                this.checkMethod(oldTableData, index, val, "shop_price");
                this.checkMethod(oldTableData, index, val, "stock");
                this.checkMethod(oldTableData, index, val, "member_price");
                this.checkMethod(oldTableData, index, val, "store_price");
                this.checkMethod(oldTableData, index, val, 'team_price');
                this.checkMethod(oldTableData, index, val, "user_price");
                this.checkMethod(oldTableData, index, val, "activity_price");
                this.checkMethod(oldTableData, index, val, "partner_price");
                this.checkMethod(oldTableData, index, val, "id");
              }
            } else {
              // 添加新的sku，已填数据回填
              const currId = curr.map(curr => `${curr.attr_id}:${curr.id}`);
              if (this.sameArr(currId, valIds)) {
                this.checkMethod(oldTableData, index, val, "cost_price");
                this.checkMethod(oldTableData, index, val, "shop_price");
                this.checkMethod(oldTableData, index, val, "stock");
                this.checkMethod(oldTableData, index, val, "member_price");
                this.checkMethod(oldTableData, index, val, "store_price");
                this.checkMethod(oldTableData, index, val, 'team_price');
                this.checkMethod(oldTableData, index, val, "user_price");
                this.checkMethod(oldTableData, index, val, "activity_price");
                this.checkMethod(oldTableData, index, val, "partner_price");
                this.checkMethod(oldTableData, index, val, "id");
              } else {
                // 默认填写普通用户、粉丝、店主默认价格
                // if (!val.user_price) this.$set(val, "user_price", "10%");
                // if (!val.member_price) this.$set(val, "member_price", "20%");
                // if (!val.store_price) this.$set(val, 'store_price', '40%');
              }
            }
          });
        });
        // 编辑首次回显，筛选无数据sku
        if (_.isEqual(this.editSkuData, oldTableData)) {
          this.tableData = this.tableData.filter(curr => curr.shop_price);
        }
      }
    },
    /**
     * 回填对应行价格/库存数据
     * @param data  table数据
     * @param index 行索引
     * @param val   行
     * @param name  价格/库存名
     */
    checkMethod(data, index, val, name) {
      if (data[index] && data[index][name])
        this.$set(val, name, data[index][name]);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../../styles/variables";
.add-product-step2 {
  // 规格图片
  .sku-images {
    background:rgba(242,242,242,1);
    margin-left: 20px;
    border-radius:4px;
    padding: 15px;
    padding-left: 30px;
    margin-bottom: 30px;
    .sku-img-list {
      overflow: hidden;
      & > div {
        float: left;
        text-align: center;
        margin-right: 16px;
        position: relative;
        /deep/ .file-up.file-button {
          margin-bottom: 10px !important;
          /deep/ .avatar-uploader {
            width: 70px !important;
            height: 70px !important;
            font-size:12px !important;
            .el-upload--picture-card {
              font-size:12px !important;
              line-height: 24px !important;
            }
            /deep/ .el-icon-plus.avatar-uploader-icon {
              font-size:18px !important;
            }
          }
        }
        
        .clear-btn {
          position: absolute;
          right: -2px;
          top: -2px;
          cursor: pointer;
          z-index: 10;
          width:15px;
          height:15px;
          background:rgba(175,175,175,1);
          text-align: center;
          line-height: 15px;
          border-radius: 50%;
          font-size: 12px;
          color: #fff;
          display: none;
        }
        &:hover .clear-btn {
          display: block;
        }
      }
      .sku-name {
        text-align: center;
      }
    }
  }
  // 批量填写
  .batch-input {
    height:64px;
    background:rgba(242,242,242,1);
    border-radius:4px;
    margin-left: 20px;
    margin-bottom: 10px;
    display: flex;
    line-height: 64px;
    padding-left: 30px;
    position: relative;
    /deep/ .el-input {
      margin-left: 20px;
    }
    .el-dropdown {
      position: absolute;
      right: 25px;
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
  // /deep/ .el-tabs.el-tabs--top.step-scroll {
  //   /deep/ .el-tabs__item {
  //     display: block;
  //   }
  //   /deep/ .el-tabs__nav.is-top {
  //     height: auto !important;
  //   }
  //   /deep/ .el-tabs__active-bar {
  //     display: none;
  //   }
  // }
  // padding: 0 20px;
  .el-tabs {
    background-color: #ffffff;
    // padding-left: 20px;
  }
  .imgs.model,
  .describe.model {
    padding-bottom: 20px;
  }
  .el-form.form {
    .form {
      padding-top: 20px;
      padding-right: 20px;
    }
  }
  .item-flex {
    /deep/ .el-form-item__content {
      overflow: hidden;
      position: relative;
      & > div {
        float: left;
      }
    }
    &.video .prompt {
      position: absolute;
      margin-top: 5px;
      top: 0px;
      left: 100px;
    }
  }
  .prompt {
    font-size:12px;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height:24px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .parameter {
    /deep/ .el-input-group__prepend {
      padding: 0 30px 0 15px !important;
    }
  }
  .model {
    background-color: #ffffff;
    // border: 1px solid $border;
    // border-top: 2px solid #999;
    margin: 10px 0;
    border-radius: 4px;
  }
  .title {
    font-weight: bold;
    padding: 12px;
    padding-left: 16px;
    line-height: 24px;
    font-size: 16px;
    border-bottom: 1px solid #e9e9e9;
    // background: #f7f7f7;
  }
  .icon {
    color: #fff;
    font-size: 20px;
  }
  .parameter {
    .el-icon-close {
      margin-left: 10px;
      width: 24px;
      height: 24px;
      border: 1px solid rgba(213, 216, 222, 1);
      border-radius: 50%;
      color: #d5d8de;
      text-align: center;
      line-height: 24px;
      margin-top: 2px;
      vertical-align: middle;
      &:hover {
        border: 1px solid red;
        color: red;
        transition: all 0.3s ease;
        transform: rotate(90deg);
        cursor: pointer;
      }
    }

  }
  .handle-clear {
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 141, 255, 1);
    line-height: 22px;
  }
  .complete {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 70;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #e4e4e4;
    opacity: 0.9;
  }
  .steps {
    width: 100%;
    margin: 0 auto;
    border: 1px solid $border;
    display: flex;
    align-items: center;
    position: relative;
    li {
      padding: 10px;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid $border;
      }
    }
    .active {
      background: $theme;
      color: #fff;
    }
    p {
      position: absolute;
      right: 20px;
    }
  }
  .step-scroll {
    width: calc(100% - 100px);
    flex-direction: column;
    position: fixed;
    // right: 10px;
    // bottom: 100px;
    top: 56px;
    z-index: 4;
    background: #fff;
    // box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    bottom: 1px solid $border;
    transition: all 0.3s ease;
    li {
      &:not(:last-child) {
        border-bottom: 1px solid $border;
      }
    }
  }
  .unfold {
    bottom: 300px;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 50%;
    background: $theme;
    color: #fff;
    padding-top: 10px;
    font-size: 13px;
    cursor: pointer;
    p {
      margin-top: 4px;
    }
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 16px;
      cursor: pointer;
      color: $theme;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .goods {
    &-img {
      display: flex;
      li,
      .other-img {
        width: 100px;
        height: 100px;
        line-height: 100px;
        border: 1px solid $border;
        text-align: center;
        margin-right: 10px;
        background-size: 100% 100%;
        color: $border;
      }
    }
    &-vidoe {
      width: 300px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      color: $border;
      border: 1px solid $border;
      margin-right: 20px;
      video {
        width: 100%;
        height: 100%;
      }
    }
    &-button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .minor-imgs,
  .goods-vidoe {
    position: relative;
    .el-icon-circle-close-outline {
      color: #666;
      top: -5px;
      right: -5px;
      width: 10px;
      height: 10px;
      position: absolute;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .minor-imgs-index {
    .shade {
      display: none !important;
    }
    &:hover {
      .shade {
        display: flex !important;
      }
    }
  }
  .minor-imgs {
    .shade {
      display: none;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 20px;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: #fff;
      i {
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: $theme;
        }
      }
    }
  }
  .new-attr {
    margin-left: 20px;
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  .file-button {
    /deep/ .el-upload {
      border: none;
    }
  }
}
</style>
<style lang="scss">
.add-product-step2 {
  .el-table .cell {
    padding-left: 10px;
    padding-right: 0;
  }
}
.el-dropdown-menu {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
.spec-table-box {
  margin-left: 25px;
  .check-block {
    background-color: #F2F2F2;
    border-radius: 4px;
    padding-left: 20px;
    margin-bottom: 24px;
    margin-top: -10px;
    margin-left: 95px;
    .el-checkbox {
      margin-top: 10px;
    }
  }
  .spec-table-box-in {
    display: flex;
    margin-bottom: 20px;
    line-height: 30px;
    .spec-name {
      width: 80px;
      text-align: right;
    }
    .add-sku-btn {
      margin-left: 18px;
      border-radius:4px;
    }
    .spec-table {
      padding-left: 79px;
      padding-right: 10px;
      color: #1890ff;
      cursor: pointer;
      .arrowBottom {
        transform: rotate(90deg);
      }
      .el-icon-arrow-right {
        transition: all 0.3s;
      }
    }
    .spec-table-checkbox {
      flex: 1;
    }
    /deep/ .el-tag--small {
      height: 30px;
      line-height: 30px;
      margin-left: 16px;
      border: 1px solid #DCDFE6;
      background-color: #fff;
      color: #000;
      cursor: pointer;
      position: relative;
      /deep/ .el-tag__close.el-icon-close {
        top: -7px;
        right: -10px;
        background: #AFAFAF;
        border-radius: 50%;
        color: #fff;
        display: none;
        position: absolute;
      }
      /deep/ &:hover {
        color: #1890FF;
        border: 1px solid #1890FF;
        /deep/ .el-tag__close.el-icon-close {
          display: block;
        }
      }
    }
  }
}
.el-icon-close {
    cursor: pointer;
}
</style>
<style lang="scss">
.spec-table-checkbox {
  .el-checkbox {
    margin-left: 0;
    margin-right: 30px;
    min-width: 40px;
    margin-bottom: 10px;
  }
}
.add-product-step2 {
  .price_active {
    input {
      color: red;
    }
  }
  .seckill-flag {
    float: left;
  }
  .is-coupon-convert {
    float: left;
    width: 190px;
    // .el-form-item__label {
    //   width: 150px !important;
    // }
  }
}
</style>

