webpackJsonp([72],{"6uJM":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("aA9S"),r=a.n(n),i=a("lC5x"),o=a.n(i),s=a("J0Oq"),l=a.n(s),c=a("4YfN"),u=a.n(c),p=a("48sp"),d=a("FFUX"),m={name:"problemForDetail",data:function(){return{current:1,pageSize:10,count:0,dialogVisible:!1,loading:!1,form:{content:"",problem:"",sort:"",status:""},oldRowData:{},rules:{content:[{required:!0,message:"请输入",trigger:"change"}],problem:[{required:!0,message:"请输入",trigger:"change"}],sort:[{required:!0,message:"请输入",trigger:"change"}]},tableData:[],searchOPtions:[{type:"input",key:"keywords",placeholder:"答案名称/内容"},{type:"select",key:"status",placeholder:"状态",options:[{label:"启用",value:10},{label:"禁用",value:0}]}],multipleSelection:[],options:[{value:1,label:"取消订单"},{value:2,label:"申请售后"}],paginationOptions:[{value:"del",label:"批量删除"}],isEdit:!1,typeid:null,id:null}},computed:u()({},Object(p.e)("user",["button_permissions"])),created:function(){this.typeid=this.$route.params.id,this.getData()},methods:{switchChange:function(e,t){var a=this;return l()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.$api.service.setstatus({status:e,id:t});case 2:case"end":return n.stop()}},n,a)}))()},resetForm:function(){this.$refs.form.resetFields()},handelEdit:function(e){var t=e.content,a=e.problem,n=e.sort,r=e.status,i=e.id;this.id=i,this.isEdit=!0,this.dialogVisible=!0,this.form={content:t,sort:n,problem:a,status:r},this.oldRowData={content:t,sort:n,problem:a,status:r}},AddReason:function(e){var t,a=this;this.$refs.form.validate((t=l()(o.a.mark(function t(n){var i;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=20;break}if(t.prev=1,i=r()({},a.form),!e){t.next=8;break}if(!d.e.isEqual(a.oldRowData,a.form)){t.next=7;break}return a.$message({message:"暂无数据变更",type:"warning"}),t.abrupt("return");case 7:i.id=a.id;case 8:return i.type=a.typeid,t.next=11,a.$api.service.reasonEdit(i);case 11:a.isEdit=!1,a.dialogVisible=!1,a.resetForm(),a.getData(),t.next=20;break;case 17:throw t.prev=17,t.t0=t.catch(1),new Error(t.t0);case 20:case"end":return t.stop()}},t,a,[[1,17]])})),function(e){return t.apply(this,arguments)}))},handelSearch:function(e,t){var a=this;({search:function(){a.query=u()({},t),a.current=1,a.getData()},reset:function(){a.query={},a.pageSize=10,a.current=1,a.getData()}})[e]()},getData:function(){var e=this;return l()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e.id),t.prev=1,e.loading=!0,t.next=5,e.$api.service.reasonlist(u()({},e.query,{pageSize:e.pageSize,page:e.current,type:e.typeid}));case 5:a=t.sent,n=a.data,e.tableData=n.items,e.count=n.count,e.loading=!1,t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),e.loading=!1;case 15:case"end":return t.stop()}},t,e,[[1,12]])}))()},handleSelectionChange:function(e){this.multipleSelection=e.map(function(e){return e.id})},handlePageChange:function(e){this.current=e,this.getData()},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleOpreate:function(){this.multipleSelection.length<1?this.$message.error("请选择退货原因"):this.handleDel(this.multipleSelection)},handleDel:function(e){var t=this,a=void 0;a=d.e.isArray(e)?e.join(","):e,this.$confirm("确认删除选中的问题？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(l()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.service.delreasons({ids:a});case 2:t.getData();case 3:case"end":return e.stop()}},e,t)})))}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Search",{attrs:{searchOPtions:e.searchOPtions},on:{searchCallback:e.handelSearch}},[a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.order.reason.edit],expression:"[$api.order.reason.edit]"}],attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(t){e.dialogVisible=!0,e.form={status:10}}}},[e._v("添加问题")])],1),e._v(" "),[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"element-loading-spinner":"el-icon-loading","highlight-current-row":!0,border:"",data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"type_name",label:"售后类型"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"problem",label:"问题"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"content",label:"答案"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"排序",prop:"sort"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建时间","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("validDateTime")(t.row.created_at)))]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{attrs:{"active-value":10,"inactive-value":0},on:{change:function(a){return e.switchChange(a,t.row.id)}},model:{value:t.row.status,callback:function(a){e.$set(t.row,"status",a)},expression:"scope.row.status"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180px",label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.order.reason.edit],expression:"[$api.order.reason.edit]"}],staticClass:"look-word",attrs:{size:"mini",type:"primary",plain:""},on:{click:function(a){return e.handelEdit(t.row)}}},[e._v("编辑")]),e._v(" "),a("span",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.order.reason.del],expression:"[$api.order.reason.del]"}],staticClass:"look-word",attrs:{size:"mini",type:"danger",plain:""},on:{click:function(a){return e.handleDel(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("Pagination",{attrs:{current:e.current,pageSize:e.pageSize,count:parseInt(e.count,10),options:e.paginationOptions},on:{opreateCBK:e.handleOpreate,pageChangeCBK:e.handlePageChange,sizeChangeCBK:e.handleSizeChange}})],e._v(" "),a("el-dialog",{attrs:{title:"添加售后问题",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px","label-position":"right"}},[a("el-form-item",{attrs:{label:"问题名称：",prop:"problem"}},[a("el-input",{staticStyle:{width:"70%"},attrs:{autocomplete:"off"},model:{value:e.form.problem,callback:function(t){e.$set(e.form,"problem",t)},expression:"form.problem"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"问题答案：",prop:"content"}},[a("el-input",{staticStyle:{width:"70%"},attrs:{type:"textarea",rows:4,autocomplete:"off"},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"排序：",prop:"sort"}},[a("el-input",{staticStyle:{width:"70%"},attrs:{autocomplete:"off"},model:{value:e.form.sort,callback:function(t){e.$set(e.form,"sort",t)},expression:"form.sort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"启用状态："}},[a("el-switch",{attrs:{"active-value":10,"inactive-value":0},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1,e.isEdit=!1,e.resetForm()}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.AddReason(e.isEdit)}}},[e._v("\n                确定\n            ")])],1)],1)],2)},staticRenderFns:[]};var h=a("C7Lr")(m,f,!1,function(e){a("kXYr")},"data-v-153fee95",null);t.default=h.exports},kXYr:function(e,t){}});