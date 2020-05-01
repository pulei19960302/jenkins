webpackJsonp([35],{fmx7:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("aA9S"),i=e.n(s),r=e("lC5x"),n=e.n(r),l=e("J0Oq"),o=e.n(l),c=e("4YfN"),u=e.n(c),d=e("IHPB"),p=e.n(d),v=e("czH5"),_={name:"reconciliationsDetail",props:["detailData"],data:function(){return{status:2,remark:"",imgs:"",isSend:!1}},mounted:function(){this.remark=this.detailData.remark},methods:{payTypeFormat:function(t){switch(t){case"0":return"全部";case"1":return"银行卡";case"2":return"支付宝";case"3":return"微信小程序";case"4":return"微信APP";case"5":return"微信公众号";case"6":return"消费余额";case"7":return"旺旺薪银行";case"8":return"旺旺薪微信";case"9":return"旺旺薪支付宝"}},statusFormat:function(t){switch(t){case"0":return"未审核";case"1":return"审核中";case"2":return"拒绝申请";case"3":return"提现成功";case"4":return"转银行处理";case"5":return"银行处理中";case"6":return"银行退回";case"7":return"微信拒绝";case"9":return"旺旺薪处理中";case"10":return"旺旺薪退回"}},getsuccessUpload:function(t){this.imgs=t[0]},handleSubmit:function(){var t=this;return o()(n.a.mark(function a(){var e;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!0!==t.isSend){a.next=2;break}return a.abrupt("return");case 2:return t.isSend=!0,e={id:t.detailData.id,status:t.status,remark:t.remark,imgs:t.imgs},a.prev=4,a.next=7,t.$api.finance.withdrawVerify(e);case 7:t.$emit("success"),t.remark="",t.isSend=!1,a.next=15;break;case 12:a.prev=12,a.t0=a.catch(4),t.isSend=!1;case 15:case"end":return a.stop()}},a,t,[[4,12]])}))()},handleTransfer:function(){var t=this;return o()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!0!==t.isSend){a.next=2;break}return a.abrupt("return");case 2:return t.isSend=!0,a.prev=3,a.next=6,t.$api.finance.withdrawTransfer({id:t.detailData.id});case 6:t.$emit("success"),t.remark="",t.isSend=!1,a.next=14;break;case 11:a.prev=11,a.t0=a.catch(3),t.isSend=!1;case 14:case"end":return a.stop()}},a,t,[[3,11]])}))()}}},f={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"taskReward-content"},[e("p",{staticClass:"title"},[t._v("提现审核")]),t._v(" "),e("div",{staticClass:"card"},[e("div",[e("div",{staticClass:"table-content"},[e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("提现单号")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.withdraw_sn)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("提现金额(元)")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.money)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("手续费比例(%)")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.fee_scale)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("实际提现(元)")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.real_money)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("提现支付类型")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t.payTypeFormat(t.detailData.pay_type)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("账号")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.open_name)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("开户行")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.bank_card)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("银行卡ID")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.bank_id)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("真实姓名")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.real_name)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("银行预留电话")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.cellphone)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("创建时间")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t._f("validVal")(t.detailData.created_at)))])])]),t._v(" "),e("div",{staticClass:"table-row"},[e("div",{staticClass:"table-left"},[t._v("提现状态")]),t._v(" "),e("div",{staticClass:"table-right"},[e("span",{staticClass:"s1"},[t._v(t._s(t.statusFormat(t.detailData.status)))])])])])]),t._v(" "),2!=t.detailData.status&&3!=t.detailData.status?e("el-form",{staticStyle:{"margin-top":"20px","margin-left":"12px"},attrs:{"label-width":"210px","label-position":"left"}},[e("el-form-item",{attrs:{label:"是否同意",prop:"status"}},[e("el-radio",{staticStyle:{color:"red"},attrs:{label:2},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},[t._v("拒绝")]),t._v(" "),e("el-radio",{staticStyle:{color:"green"},attrs:{label:3,disabled:7==t.detailData.status},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},[t._v("同意\n                ")])],1),t._v(" "),3==t.status?e("el-form-item",{attrs:{label:"转帐图片",prop:"name"}},[e("FileUpload",{attrs:{isOnly:!0,width:"100px",height:"100px"},on:{successUploadCBK:t.getsuccessUpload}})],1):t._e(),t._v(" "),e("el-form-item",{attrs:{label:"审核备注",prop:"remark"}},[e("el-input",{staticStyle:{width:"356px"},attrs:{type:"textarea",rows:4,placeholder:"备注"},model:{value:t.remark,callback:function(a){t.remark=a},expression:"remark"}})],1)],1):t._e(),t._v(" "),e("div",{staticStyle:{"margin-left":"224px","margin-top":"20px"}},[2==t.status?e("div",[0==t.detailData.status||1==t.detailData.status||7==t.detailData.status?e("el-button",{attrs:{type:"danger",loading:t.isSend},on:{click:t.handleSubmit}},[t._v("拒绝\n                ")]):t._e()],1):t._e(),t._v(" "),3==t.status?e("div",[1==t.detailData.pay_type&&t.detailData.status>=4||1!=t.detailData.pay_type?e("el-button",{attrs:{type:"success",loading:t.isSend},on:{click:t.handleSubmit}},[t._v("\n                    同意\n                ")]):t._e(),t._v(" "),1!=t.detailData.pay_type||0!=t.detailData.status&&1!=t.detailData.status?t._e():e("el-button",{attrs:{type:"primary",loading:t.isSend},on:{click:t.handleTransfer}},[t._v("转账\n                ")])],1):t._e()])],1)])},staticRenderFns:[]};var h={name:"withdrawManage",components:{Details:e("C7Lr")(_,f,!1,function(t){e("zWWf")},"data-v-29bec1b2",null).exports},data:function(){return{detailData:{},rghtPopupVisible:!1,loading:!1,current:1,pageSize:30,count:0,query:{},exportOptions:[],tableData:[],searchOPtions:[{type:"input",key:"withdraw_sn",placeholder:"提现单号 / 用户ID"},{type:"select",key:"pay_type",placeholder:"提现方式",options:[].concat(p()(v.b.RECHARGE_TYPES))},{type:"select",key:"status",placeholder:"提现状态",options:[].concat(p()(v.b.WITHDRAW_STATUS))},{type:"datetimerange",key:"start_at-end_at",placeholder:"提现时间"}],total_actual_money:""}},created:function(){this.getData()},filters:{timestampToTime:function(t){if(Number(t)){var a=new Date(1e3*t);return a.getFullYear()+"-"+((a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1)+"-")+((a.getDate()<10?"0"+a.getDate():a.getDate())+" ")+((a.getHours()<10?"0"+a.getHours():a.getHours())+":")+((a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes())+":")+(a.getSeconds()<10?"0"+a.getSeconds():a.getSeconds())}return""}},methods:{payTypeFormat:function(t){switch(t){case"0":return"全部";case"1":return"银行卡";case"2":return"支付宝";case"3":return"微信小程序";case"4":return"微信APP";case"5":return"微信公众号";case"6":return"消费余额";case"7":return"旺旺薪银行";case"8":return"旺旺薪微信";case"9":return"旺旺薪支付宝"}},statusFormat:function(t){switch(t){case"0":return"未审核";case"1":return"审核中";case"2":return"拒绝申请";case"3":return"提现成功";case"4":return"转银行处理";case"5":return"银行处理中";case"6":return"银行退回";case"7":return"微信拒绝";case"9":return"旺旺薪处理中";case"10":return"旺旺薪退回"}},handlePageChange:function(t){this.current=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()},handelSearch:function(t,a){var e=this;({search:function(){e.query=u()({},a),e.current=1,e.getData()},reset:function(){e.query={},e.pageSize=10,e.current=1,e.getData()}})[t]()},getData:function(){var t=this;return o()(n.a.mark(function a(){var e,s;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t.loading=!0,a.next=4,t.$api.finance.withdrawList(u()({},t.query,{type:1,pageSize:t.pageSize,page:t.current}));case 4:e=a.sent,s=e.data,t.tableData=s.items,t.count=s.count,t.exportOptions=s.fields||[],t.total_actual_money=s.total_money||0,t.loading=!1,a.next=16;break;case 13:a.prev=13,a.t0=a.catch(0),t.loading=!1;case 16:case"end":return a.stop()}},a,t,[[0,13]])}))()},handleVerify:function(t){this.detailData=i()({},t),this.rghtPopupVisible=!0},handelSuccess:function(){this.rghtPopupVisible=!1,this.getData()}}},b={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"br4 withdrawManage"},[e("Search",{attrs:{searchOPtions:t.searchOPtions},on:{searchCallback:t.handelSearch}},[e("Export",{attrs:{exportOptions:t.exportOptions,query:t.query,url:t.$api.finance.withdraw.export}})],1),t._v(" "),e("div",{staticStyle:{padding:"0 16px 16px 16px"}},[e("div",{staticClass:"summaryBar"},[e("i",{staticClass:"el-icon-tickets mr6 fs18 fcblue vamiddle"}),t._v("\n                符合搜索条件的数据："),e("span",{staticClass:"fcorange mr24"},[t._v(t._s(t.count))]),t._v("\n                总金额："),e("span",{staticClass:"fcorange"},[t._v(t._s(t.total_actual_money))])]),t._v(" "),[e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{"element-loading-spinner":"el-icon-loading","highlight-current-row":!0,border:"",data:t.tableData,"tooltip-effect":"dark"}},[e("el-table-column",{attrs:{width:"150",prop:"withdraw_sn",label:"提现单号"}}),t._v(" "),e("el-table-column",{attrs:{width:"100",prop:"uid",label:"用户"}}),t._v(" "),e("el-table-column",{attrs:{width:"100",prop:"username",label:"用户昵称"}}),t._v(" "),e("el-table-column",{attrs:{width:"100",align:"right",label:"提现金额(元)",prop:"money","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{width:"100",align:"right",label:"实际提现(元)",prop:"real_money","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{width:"100",label:"提现支付类型",prop:"pay_type","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n                            "+t._s(t.payTypeFormat(a.row.pay_type))+"\n                        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"真实姓名",prop:"real_name","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{label:"提现账号",prop:"open_name","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{label:"提现银行卡",prop:"bank_card",width:"200","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{width:"140",label:"创建时间",prop:"created_at","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{label:"发放时间",prop:"pay_time",width:"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n                            "+t._s(t._f("timestampToTime")(a.row.pay_time))+"\n                        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"100",label:"提现状态",prop:"status","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n                            "+t._s(t.statusFormat(a.row.status))+"\n                        ")]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"100",label:"操作",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(a){return[2!=a.row.status&&3!=a.row.status?e("span",{directives:[{name:"permission",rawName:"v-permission",value:[t.$api.finance.withdraw.verify],expression:"[$api.finance.withdraw.verify]"}],staticClass:"look-word",attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(e){return e.stopPropagation(),t.handleVerify(a.row)}}},[t._v("\n                            审核\n                        ")]):e("span",{staticClass:"look-word",attrs:{type:"info",plain:"",size:"mini"},on:{click:function(e){return e.stopPropagation(),t.handleVerify(a.row)}}},[t._v("\n                            查看\n                        ")])]}}])})],1)]],2),t._v(" "),e("Pagination",{attrs:{current:t.current,pageSize:t.pageSize,count:t.count},on:{pageChangeCBK:t.handlePageChange,sizeChangeCBK:t.handleSizeChange}}),t._v(" "),e("RightSidePopup",{attrs:{mask:"","no-outside":"",visible:t.rghtPopupVisible,width:"650px"},on:{"update:visible":function(a){t.rghtPopupVisible=a}}},[e("Details",{attrs:{detailData:t.detailData},on:{success:t.handelSuccess}})],1)],1)},staticRenderFns:[]};var m=e("C7Lr")(h,b,!1,function(t){e("zrNj")},"data-v-017e9ab7",null);a.default=m.exports},zWWf:function(t,a){},zrNj:function(t,a){}});