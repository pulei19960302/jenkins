webpackJsonp([53],{BWUn:function(e,t){},"Lmf+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("aA9S"),l=a.n(n),r=a("lC5x"),i=a.n(r),o=a("J0Oq"),s=a.n(o),c=a("4YfN"),u=a.n(c),d=a("48sp"),p=(a("FFUX"),{name:"LabelManage",mixins:[a("8Rg7").a],data:function(){return{opreate:"",dialogVisible:!1,form:{status:null,back_color:"",font_color:"",label:""},show:!0,paginationOptions:[{value:"del",label:"批量删除",type:"danger",permission:[this.$api.product.label.del]},{value:"up",label:"批量上架"},{value:"down",label:"批量下架"}],searchOPtions:[{type:"input",key:"keywords",placeholder:"标签名"},{type:"select",key:"status",placeholder:"状态",options:[{label:"启用",value:10},{label:"禁用",value:0}]}],query:{},current:1,pageSize:10,count:0,tableData:[],columnSelect:[],rules:{},isEdit:!1,id:null}},computed:u()({},Object(d.e)("user",["button_permissions"])),activated:function(){this.getData()},methods:{changeStatus:function(e){var t=this,a=e.status,n=e.id;return s()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$api.product.setStatusLabel({status:a,id:n});case 3:t.getData(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),t.tableData.map(function(e){e.id===n&&t.$set(e,"status",10==a?0:10)});case 9:case"end":return e.stop()}},e,t,[[0,6]])}))()},resetForm:function(){this.$refs.form.resetFields()},handelEdit:function(e){var t=this;this.isEdit=!0,this.dialogVisible=!0,this.$nextTick(function(){l()(t.form,e)})},AddLabel:function(e){var t,a=this;this.$refs.form.validate((t=s()(i.a.mark(function t(n){var r;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=20;break}if(t.prev=1,r=l()({},a.form),!e){t.next=8;break}return t.next=6,a.$api.product.editLabel(r);case 6:t.next=11;break;case 8:return delete r.id,t.next=11,a.$api.product.addLabel(r);case 11:a.dialogVisible=!1,a.isEdit=!1,a.resetForm(),a.getData(),t.next=20;break;case 17:throw t.prev=17,t.t0=t.catch(1),new Error(t.t0);case 20:case"end":return t.stop()}},t,a,[[1,17]])})),function(e){return t.apply(this,arguments)}))},handelSearch:function(e,t){var a=this;({search:function(){a.query=u()({},t),a.current=1,a.getData()},reset:function(){a.query={},a.pageSize=10,a.current=1,a.getData()}})[e]()},getData:function(){var e=this;return s()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.product.getLabelList(u()({},e.query,{pageSize:e.pageSize,page:e.current}));case 3:a=t.sent,n=a.data,e.tableData=n.items,e.count=n.count,t.next=11;break;case 9:t.prev=9,t.t0=t.catch(0);case 11:case"end":return t.stop()}},t,e,[[0,9]])}))()},handlePageChange:function(e){this.current=e,this.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleSelectionChange:function(e){var t=[];e.length<1?this.columnSelect=[]:(e.map(function(e){t.push(e.id)}),this.columnSelect=t)},handleDel:function(e){var t=this;"many"==e&&this.columnSelect.length<1?this.$message({message:"请选择标签",type:"error"}):this.$confirm("确认删除选中商品标签？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.del(e)})},del:function(e){var t=this;"many"==e?this.$api.product.delLabel({ids:this.columnSelect.join(",")}).then(function(){t.getData()}):this.$api.product.delLabel({id:e}).then(function(){t.getData()})}}}),f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"label-manage"},[a("Search",{attrs:{searchOPtions:e.searchOPtions},on:{searchCallback:e.handelSearch}},[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.product.label.add],expression:"[$api.product.label.add]"}],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(t){e.dialogVisible=!0,e.form={status:0}}}},[e._v("添 加")])],1),e._v(" "),a("div",{staticClass:"common-table-wrapper"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,"tooltip-effect":"dark","header-cell-style":{background:"#fafafa",border:"none",borderBottom:"1px solid #e8e8e8"}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection"}}),e._v(" "),a("el-table-column",{attrs:{width:"110",align:"center",prop:"id",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"label",label:"商品标签"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"标签背景色"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-color-picker",{attrs:{disabled:"",value:e.row.back_color}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"标签字体色"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-color-picker",{attrs:{disabled:"",value:e.row.font_color}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{disabled:!e.button_permissions.includes(e.$api.product.label.edit),"active-value":10,"inactive-value":0},on:{change:function(a){return e.changeStatus(t.row)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.product.label.edit],expression:"[$api.product.label.edit]"}],staticClass:"look",attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){return e.handelEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.product.label.del],expression:"[$api.product.label.del]"}],staticClass:"look",attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(a){return e.handleDel(t.row.id)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("Pagination",{attrs:{options:e.paginationOptions,current:e.current,count:e.count,pageSize:e.pageSize},on:{opreateCBK:function(t){return e.handleDel("many")},pageChangeCBK:e.handlePageChange,sizeChangeCBK:e.handleSizeChange}}),e._v(" "),a("el-dialog",{attrs:{title:"添加商品标签",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:"标签名称：",prop:"label",rules:[e.simpleRule]}},[a("el-input",{staticStyle:{width:"70%"},attrs:{autocomplete:"off"},model:{value:e.form.label,callback:function(t){e.$set(e.form,"label",t)},expression:"form.label"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否启用：",prop:"status"}},[a("el-switch",{attrs:{"active-value":10,"inactive-value":0},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标签背景色"}},[a("el-color-picker",{model:{value:e.form.back_color,callback:function(t){e.$set(e.form,"back_color",t)},expression:"form.back_color"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标签字体色"}},[a("el-color-picker",{model:{value:e.form.font_color,callback:function(t){e.$set(e.form,"font_color",t)},expression:"form.font_color"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1,e.isEdit=!1,e.resetForm()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.AddLabel(e.isEdit)}}},[e._v("\n                确定\n            ")])],1)],1)],1)},staticRenderFns:[]};var b=a("C7Lr")(p,f,!1,function(e){a("BWUn")},"data-v-5be39a0d",null);t.default=b.exports}});