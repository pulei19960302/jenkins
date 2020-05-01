webpackJsonp([60],{M0bF:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("lC5x"),i=r.n(a),n=r("aA9S"),s=r.n(n),o=r("J0Oq"),l=r.n(o),c={name:"MerchantSetting",props:{isAdd:{type:Boolean,required:!0},drawerVisible:{type:Boolean,required:!0}},data:function(){return{curVisible:!1,form:{merchant_no:"",terminal_id:"",status:0},rules:{merchant_no:[{required:!0,message:"请输入商户号",trigger:"blur"},{min:6,message:"应该包含至少6个字符",trigger:"blur"}],terminal_id:[{required:!0,message:"请输入终端ID",trigger:"blur"},{min:6,message:"应该包含至少6个字符",trigger:"blur"}],token:[{required:!0,message:"请输入Token",trigger:"blur"},{min:16,message:"应该包含至少16个字符",trigger:"blur"}]}}},watch:{drawerVisible:function(e){console.log(">>>>>> watch drawerVisible, val:",e),this.curVisible=e}},methods:{submit:function(){var e,t=this;this.$refs.ruleForm.validate((e=l()(i.a.mark(function e(r){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=11;break}return e.prev=1,a=s()({},t.form),e.next=5,t.$api.setting.editMerchant(a);case 5:t.$router.push({name:"merchantList"}),e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(1),new Error(e.t0);case 11:case"end":return e.stop()}},e,t,[[1,8]])})),function(t){return e.apply(this,arguments)}))},getData:function(e){var t=this;return l()(i.a.mark(function r(){var a,n;return i.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$api.setting.getMerchantInfo({id:e});case 3:a=r.sent,n=a.data,t.form=n,r.next=11;break;case 8:throw r.prev=8,r.t0=r.catch(0),new Error(r.t0);case 11:case"end":return r.stop()}},r,t,[[0,8]])}))()}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("RightSidePopup",{attrs:{mask:"",visible:e.curVisible,width:"50%"},on:{"update:visible":function(t){e.curVisible=t}}},[r("div",{staticClass:"platformSetting"},[r("p",{staticClass:"title"},[e._v("平台信息设置")]),e._v(" "),r("el-form",{ref:"ruleForm",staticStyle:{width:"565px",margin:"0 auto"},attrs:{"label-position":"right","label-width":"150px",model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:"商户号：",prop:"merchant_no"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入商户号"},model:{value:e.form.merchant_no,callback:function(t){e.$set(e.form,"merchant_no",t)},expression:"form.merchant_no"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"终端ID：",prop:"terminal_id"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入终端ID"},model:{value:e.form.terminal_id,callback:function(t){e.$set(e.form,"terminal_id",t)},expression:"form.terminal_id"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Token：",prop:"token"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入Token"},model:{value:e.form.token,callback:function(t){e.$set(e.form,"token",t)},expression:"form.token"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否启用：",prop:"is_enable"}},[r("el-switch",{attrs:{"active-value":1,"inactive-value":0},model:{value:e.form.is_enable,callback:function(t){e.$set(e.form,"is_enable",t)},expression:"form.is_enable"}})],1),e._v(" "),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:[e.$api.setting.config.save],expression:"[$api.setting.config.save]"}],staticClass:"submit",attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")])],1)],1)])},staticRenderFns:[]};var m=r("C7Lr")(c,u,!1,function(e){r("cY3N")},"data-v-430bbe5a",null);t.default=m.exports},cY3N:function(e,t){}});