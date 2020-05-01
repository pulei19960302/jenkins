webpackJsonp([70],{U4cb:function(e,t){},"ZT+6":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("lC5x"),i=n.n(a),r=n("J0Oq"),o=n.n(r),s=n("4YfN"),l=n.n(s),p=n("48sp"),c=n("FFUX"),u={name:"freightFormwork",data:function(){return{paginationOptions:[{value:"del",label:"批量删除"}],current:1,pageSize:10,count:0,loading:!1,tableData:[],multipleSelection:[],value2:"",searchOPtions:[{type:"input",key:"id",placeholder:"模板ID"},{type:"input",key:"name",placeholder:"模板名称"},{type:"select",key:"supplier_id",placeholder:"供应商",options:[]}],query:{}}},computed:l()({},Object(p.e)("user",["button_permissions"])),created:function(){this.getFreightTemplateList(),this.getSupplierData(),this.button_permissions.includes(this.$api.setting.freight_template.del)||(this.paginationOptions=[])},methods:{getSupplierData:function(){var e=this;return o()(i.a.mark(function t(){var n,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.product.supplierList();case 3:n=t.sent,a=n.data,e.searchOPtions.forEach(function(e){"supplier_id"===e.key&&(e.options=a.items.map(function(e){return{value:e.id,label:e.name}}))}),t.next=11;break;case 8:throw t.prev=8,t.t0=t.catch(0),new Error(t.t0);case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},handelSearch:function(e,t){var n=this;({search:function(){n.query=l()({},t),n.current=1,n.getFreightTemplateList()},reset:function(){n.query={},n.pageSize=10,n.current=1,n.getFreightTemplateList()}})[e]()},pricingManner:function(e){return 1==e?"按件数":2==e?"按重量":3==e?"按体积":void 0},getFreightTemplateList:function(){var e=this;return o()(i.a.mark(function t(){var n,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,e.$api.setting.getFreightTemplateList(l()({},e.query,{pagesize:e.pageSize,page:e.current}));case 4:n=t.sent,a=n.data,e.tableData=a.items,e.count=a.count,e.loading=!1,t.next=15;break;case 11:throw t.prev=11,t.t0=t.catch(0),e.loading=!1,new Error(t.t0);case 15:case"end":return t.stop()}},t,e,[[0,11]])}))()},handleSelectionChange:function(e){this.multipleSelection=e.map(function(e){return e.id})},handlePageChange:function(e){this.current=e,this.getFreightTemplateList()},handleSizeChange:function(e){this.pageSize=e,this.getFreightTemplateList()},jumpTo:function(e,t,n){this.$router.push({name:e,params:{type:t,id:n}})},handleDel:function(e){var t=this;this.$confirm("确认删除选中模板？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(o()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=void 0,a=c.e.isArray(e)?e.join(","):e,n.prev=2,n.next=5,t.$api.setting.delFreightTemplate({ids:a});case 5:t.getFreightTemplateList(),n.next=11;break;case 8:throw n.prev=8,n.t0=n.catch(2),new Error(n.t0);case 11:case"end":return n.stop()}},n,t,[[2,8]])}))).catch(function(e){throw new Error(e)})}}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"min-height":"calc(100vh - 135px)",background:"#fff"}},[n("Search",{attrs:{searchOPtions:e.searchOPtions},on:{searchCallback:e.handelSearch}},[n("el-button",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.setting.freight_template.add],expression:"[$api.setting.freight_template.add]"}],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(t){return e.jumpTo("addFreightFormwork")}}},[e._v("添加")])],1),e._v(" "),[n("div",{staticStyle:{padding:"0 16px 16px 16px",background:"#fff","border-radius":"0 0 4px 4px",width:"100%"}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"element-loading-spinner":"el-icon-loading","highlight-current-row":!0,border:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{sortable:"",prop:"id",label:"编号"}}),e._v(" "),n("el-table-column",{attrs:{label:"模板名称",prop:"name","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{label:"供应商",prop:"supplier","show-overflow-tooltip":""}}),e._v(" "),n("el-table-column",{attrs:{label:"计价方式",prop:"type"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e.pricingManner(t.row.type))+"\n                ")]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"120px",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.setting.freight_template.edit],expression:"[$api.setting.freight_template.edit]"}],staticClass:"look-word",attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(n){return e.jumpTo("editFreightFormwork","edit",t.row.id)}}},[e._v("编辑")]),e._v(" "),n("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.setting.freight_template.del],expression:"[$api.setting.freight_template.del]"}],staticClass:"look-word",attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(n){return e.handleDel(t.row.id)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),n("Pagination",{attrs:{options:e.paginationOptions,current:e.current,pageSize:e.pageSize,count:e.count},on:{opreateCBK:function(t){return e.handleDel(e.multipleSelection)},pageChangeCBK:e.handlePageChange,sizeChangeCBK:e.handleSizeChange}})]],2)},staticRenderFns:[]};var d=n("C7Lr")(u,h,!1,function(e){n("U4cb")},"data-v-1ef8146a",null);t.default=d.exports}});