/**
 * Created by cc on 2018/11/27.
 */

import axios from '../axios';

class Product{
    constructor() {
        // 商品管理
        this.product = {
            export: '/goods-category/export',
            list: '/goods-category/list',
            detail: '/goods-category/detail',
            edit: '/goods-category/edit',
            set_display: '/goods-category/set-display',
            set_display_index: '/goods-category/set-displayindex',
            add:'/goods-category/add',
            del:'/goods-category/del',
            delall:'/goods-category/del-all',
            tree:'/goods-category/tree',
            set_sku_stock:'/goods/ajax-sku-stock'
        };
        // 品牌
        this.brand ={
            export: '/goods-brand/export',
            list: '/goods-brand/list',
            detail: '/goods-brand/detail',
            edit: '/goods-brand/edit',
            add:'/goods-brand/add',
            del:'/goods-brand/del',
            delall:'/goods-brand/del-all',
            secondarycat: '/goods-brand/secondary-cat',
            set_status: '/goods-brand/set-display'
        }
        // 商品类型
        this.type ={
            list: '/goods-type/list',
            detail: '/goods-type/detail',
            edit: '/goods-type/edit',
            add:'/goods-type/add',
            del:'/goods-type/del',
            delall:'/goods-type/del-all',
            set_status: '/goods-type/set-status'
        }
        // 供应商管理
        this.supplier ={
            export: '/supplier/export',
            list: '/supplier/list',
            detail: '/supplier/detail',
            edit: '/supplier/edit',
            add:'/supplier/add',
            del:'/supplier/del',
            delall:'/supplier/del-all',
            set_status: '/supplier/set-status'
        }
        // 参数
        this.param ={
            list: '/goods-param/list',
            detail: '/goods-param/detail',
            edit: '/goods-param/edit',
            add:'/goods-param/add',
            del:'/goods-param/del',
            delall:'/goods-param/del-all',
        }
        // 参数值
        this.paramValue ={
            list: '/goods-param/list-value',
            detail: '/goods-param/detail-value',
            edit: '/goods-param/edit-value',
            add:'/goods-param/add-value',
            del:'/goods-param/del-value',
            delall:'/goods-param/del-all-value',
        }
        // 属性
        this.attr ={
            list: '/goods-attr/list',
            detail: '/goods-attr/detail',
            edit: '/goods-attr/edit',
            add:'/goods-attr/add',
            del:'/goods-attr/del',
            delall:'/goods-attr/del-all',
        }
        // 属性值
        this.attrValue = {
            list: '/goods-attr/list-value',
            detail: '/goods-attr/detail-value',
            edit: '/goods-attr/edit-value',
            add:'/goods-attr/add-value',
            del:'/goods-attr/del-value',
            delall:'/goods-attr/del-all-value',
        }
        // 商品
        this.addGoods = {
            add_first: '/goods/add-first',
            add_second_get: '/goods/add-second',
            add_second_post: '/goods/save',
            list: '/goods/list',
            export: '/goods/export',
            del: '/goods/del-all',
            set_status: '/goods/set-status',
            detail: '/goods/detail',
            freights: '/goods/freights',
            set_info: '/goods/set-info',
            del_label: '/goods/del-label',
            set_sort:'/goods/set-sort',
            bargainadd:'/bargain/add',
            bargainbuylist:'/bargain/list',
        }
        // 标签管理
        this.label = {
            list: '/goods-label/list',
            add: '/goods-label/add',
            del: '/goods-label/del',
            edit: '/goods-label/edit',
            detail: '/goods-label/detail',
            set_status: '/goods-label/set-status'
        }
        // 搜索关键词管理
        this.search = {
            list: '/search/list',
            del: '/search/del',
            edit: '/search/edit',
            set_status: '/search/set-status',
            detail: '/search/detail'
        }
        // 商品反馈
        this.evaluate = {
            list: '/goods-evaluate/list',
            del: '/goods-evaluate/del-all',
            set_status: '/goods-evaluate/set-status',
            add: '/goods-evaluate/evaluate',
        }
        // 商品规格
        this.goodsSpecification = {
            detail:'/goods-type/attr-info'
        }
    }
    // 商品反馈
    addEvaluate(params) { 
        return axios(this.evaluate.add, { method: 'post', params });
    }
    evaluateList(params) {
        return axios(this.evaluate.list, { method: 'get', params });
    }
    evaluateDel(params) {
        return axios(this.evaluate.del, { method: 'post', params });
    }
    evaluateSetStatus(params) {
        return axios(this.evaluate.set_status, { method: 'post', params });
    }
    // 搜索关键词管理
    searchList(params) {
        return axios(this.search.list, { method: 'get', params });
    }
    searchDetail(params) {
        return axios(this.search.detail, { method: 'get', params });
    }
    searchEdit(params) {
        return axios(this.search.edit, { method: 'post', params });
    }
    searchSetStatus(params) {
        return axios(this.search.set_status, { method: 'post', params });
    }
    searchDel(params) {
        return axios(this.search.del, { method: 'post', params });
    }


    // 商品管理
    goodsSetSkuStock(params) {
        return axios(this.product.set_sku_stock, { method: 'get', params });
    }
    goodsList(params) {
        return axios(this.product.list, { method: 'get', params });
    }
    goodsDetail(params) {
        return axios(this.product.detail, { method: 'get', params });
    }
    goodEdit(params) {
        return axios(this.product.edit, { method: 'post', params });
    }
    goodSetDisplay(params) {
        return axios(this.product.set_display, { method: 'post', params });
    }
    goodSetDisplayIndex(params) {
        return axios(this.product.set_display_index, { method: 'post', params });
    }
    goodAdd(params) {
        return axios(this.product.add, { method: 'post', params });
    }
    goodDel(params) {
        return axios(this.product.del, { method: 'post', params });
    }
    goodDelall(params) {
        return axios(this.product.delall, { method: 'post', params });
    }
    tree(params) {
        return axios(this.product.tree, { method: 'get', params });
    }
    //品牌
    brandList(params) {
        return axios(this.brand.list, { method: 'get', params });
    }
    brandDetail(params) {
        return axios(this.brand.detail, { method: 'get', params });
    }
    brandEdit(params) {
        return axios(this.brand.edit, { method: 'post', params });
    }
    brandSetStatus(params) {
        return axios(this.brand.set_status, { method: 'post', params });
    }
    brandAdd(params) {
        return axios(this.brand.add, { method: 'post', params });
    }
    brandDel(params) {
        return axios(this.brand.del, { method: 'post', params });
    }
    brandDelall(params) {
        return axios(this.brand.delall, { method: 'post', params });
    }
    secondArycat(params) {
        return axios(this.brand.secondarycat, { method: 'get', params });
    }
    //类型
    typeList(params) {
        return axios(this.type.list, { method: 'get', params });
    }
    typeDetail(params) {
        return axios(this.type.detail, { method: 'get', params });
    }
    typeEdit(params) {
        return axios(this.type.edit, { method: 'post', params });
    }
    typeSetStatus(params) {
        return axios(this.type.set_status, { method: 'post', params });
    }
    typeAdd(params) {
        return axios(this.type.add, { method: 'post', params });
    }
    typeDel(params) {
        return axios(this.type.del, { method: 'post', params });
    }
    typeDelall(params) {
        return axios(this.type.delall, { method: 'post', params });
    }
    //供应商
    supplierList(params) {
        return axios(this.supplier.list, { method: 'get', params });
    }
    supplierDetail(params) {
        return axios(this.supplier.detail, { method: 'get', params });
    }
    supplierEdit(params) {
        return axios(this.supplier.edit, { method: 'post', params });
    }
    supplierSetStatus(params) {
        return axios(this.supplier.set_status, { method: 'post', params });
    }
    supplierAdd(params) {
        return axios(this.supplier.add, { method: 'post', params });
    }
    supplierDel(params) {
        return axios(this.supplier.del, { method: 'post', params });
    }
    supplierDelall(params) {
        return axios(this.supplier.delall, { method: 'post', params });
    }
    //参数
    paramList(params) {
        return axios(this.param.list, { method: 'get', params });
    }
    paramDetail(params) {
        return axios(this.param.detail, { method: 'get', params });
    }
    paramEdit(params) {
        return axios(this.param.edit, { method: 'post', params });
    }
    paramAdd(params) {
        return axios(this.param.add, { method: 'post', params });
    }
    paramDel(params) {
        return axios(this.param.del, { method: 'post', params });
    }
    paramDelall(params) {
        return axios(this.param.delall, { method: 'post', params });
    }
    //参数值
    paramValueList(params) {
        return axios(this.paramValue.list, { method: 'get', params });
    }
    paramValueDetail(params) {
        return axios(this.paramValue.detail, { method: 'get', params });
    }
    paramValueEdit(params) {
        return axios(this.paramValue.edit, { method: 'post', params });
    }
    paramValueAdd(params) {
        return axios(this.paramValue.add, { method: 'post', params });
    }
    paramValueDel(params) {
        return axios(this.paramValue.del, { method: 'post', params });
    }
    paramValueDelall(params) {
        return axios(this.paramValue.delall, { method: 'post', params });
    }
    //属性
    attrList(params) {
        return axios(this.attr.list, { method: 'get', params });
    }
    attrDetail(params) {
        return axios(this.attr.detail, { method: 'get', params });
    }
    attrEdit(params) {
        return axios(this.attr.edit, { method: 'post', params });
    }
    attrAdd(params) {
        return axios(this.attr.add, { method: 'post', params });
    }
    attrDel(params) {
        return axios(this.attr.del, { method: 'post', params });
    }
    attrDelall(params) {
        return axios(this.attr.delall, { method: 'post', params });
    }
    //属性值
    attrValueList(params) {
        return axios(this.attrValue.list, { method: 'get', params });
    }
    attrValueDetail(params) {
        return axios(this.attrValue.detail, { method: 'get', params });
    }
    attrValueEdit(params) {
        return axios(this.attrValue.edit, { method: 'post', params });
    }
    attrValueAdd(params) {
        return axios(this.attrValue.add, { method: 'post', params });
    }
    attrValueDel(params) {
        return axios(this.attrValue.del, { method: 'post', params });
    }
    attrValueDelall(params) {
        return axios(this.attrValue.delall, { method: 'post', params });
    }
    // 添加商品
    getCategory(params) {
        return axios(this.addGoods.add_first, { method: 'get', params });
    }
    getAttrs(params) {
        return axios(this.addGoods.add_second_get, { method: 'get', params });
    }
    handleAddGoods(params) {
        return axios(this.addGoods.add_second_post, { method: 'post', params });
    }
    getGoodsList(params) {
        return axios(this.addGoods.list, { method: 'get', params });
    }
    delGoods(params) {
        return axios(this.addGoods.del, { method: 'post', params });
    }
    setGoodsStatus(params) {
        return axios(this.addGoods.set_status, { method: 'post', params });
    }
    getdetail(params) {
        return axios(this.addGoods.detail, { method: 'get', params });
    }
    getFreights(params) {
        return axios(this.addGoods.freights, { method: 'get', params });
    }
    setInfo(params) {
        return axios(this.addGoods.set_info, { method: 'post', params });
    }
    delLabelTable(params) {
        return axios(this.addGoods.del_label, { method: 'post', params });
    }
    setSort(params) {
        return axios(this.addGoods.set_sort, { method: 'post', params });
    }
    bargainAdd(params) {
        return axios(this.addGoods.bargainadd, { method: 'post', params });
    }
    bargainBuylist(params) {
        return axios(this.addGoods.bargainbuylist, { method: 'get', params });
    }

    // 添加商品
    getLabelList(params) {
        return axios(this.label.list, { method: 'get', params });
    }
    addLabel(params) {
        return axios(this.label.add, { method: 'post', params });
    }
    editLabel(params) {
        return axios(this.label.edit, { method: 'post', params });
    }
    delLabel(params) {
        return axios(this.label.del, { method: 'post', params });
    }
    setStatusLabel(params) {
        return axios(this.label.set_status, { method: 'post', params });
    }
    // 商品规格
    getGoodsSpecificationDetail(params){
        return axios(this.goodsSpecification.detail,{ method:'get',params })
    }
};
export default {
    name: 'product',
    module: new Product()
};

