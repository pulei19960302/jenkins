webpackJsonp([5],{YMJJ:function(e,t){},ijF1:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("lC5x"),l=r.n(i),s=r("IHPB"),a=r.n(s),o=r("aA9S"),n=r.n(o),u=r("J0Oq"),m=r.n(u),d={name:"NewConfigProduct",props:{show:[Boolean],id:{}},data:function(){return{visible:!1,ruleForm:{name:"",num:"",delivery:!1,resource:"",desc:"",display:0,display_index:0,pid:[],thumb:[],imgs:[],sort:10},rules:{name:[{required:!0,message:"请输入",trigger:"blur"}],pid:[{required:!1,message:"请选择",trigger:"change"}],num:[{required:!0,message:"请填写",trigger:"blur"}],sort:[{required:!0,message:"请填写",trigger:"blur"}],describe:[{required:!1,message:"请填写",trigger:"blur"}],keywords:[{required:!1,message:"请填写",trigger:"blur"}]},areaList:[]}},watch:{visible:function(e){this.$emit("update:show",e)},show:function(e){this.visible=e},id:function(e){this.resetForm("ruleForm"),e||(this.ruleForm.thumb=[{url:""}],this.ruleForm.imgs=[{url:""}]),this.getData()}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.save()})},save:function(){var e=this;return m()(l.a.mark(function t(){var r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if((r=n()({},e.ruleForm)).thumb&&r.thumb.length>0?r.thumb=[r.thumb[0].url]:r.thumb=[],r.imgs&&r.imgs.length>0?r.imgs=[r.imgs[0].url]:r.imgs=[],r.pid&&(r.position=[].concat(a()(e.ruleForm.pid)).join(","),r.pid=[].concat(a()(e.ruleForm.pid)).splice(-1,1)[0]),!e.id){t.next=9;break}return t.next=7,e.$api.product.goodEdit(r);case 7:t.next=11;break;case 9:return t.next=11,e.$api.product.goodAdd(r);case 11:e.$emit("fresh"),e.visible=!1;case 13:case"end":return t.stop()}},t,e)}))()},resetForm:function(e){this.$refs[e].resetFields()},getData:function(){var e=this;return m()(l.a.mark(function t(){var r,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.product.goodsDetail({id:e.id});case 3:if(r=t.sent,i=r.data,e.areaList=e.delEmypt(i.allCat.children),e.id){t.next=8;break}return t.abrupt("return");case 8:e.ruleForm=i.detail,e.ruleForm.pid=[].concat(a()(i.detail.position.split(","))),e.ruleForm.thumb=[{name:i.detail.id,url:i.detail.thumb[0]}],e.ruleForm.imgs=[{name:i.detail.id,url:i.detail.imgs[0]}],t.next=16;break;case 14:t.prev=14,t.t0=t.catch(0);case 16:case"end":return t.stop()}},t,e,[[0,14]])}))()},delEmypt:function(e){var t=this;return e.map(function(e){e.children&&e.children.length>0&&t.delEmypt(e.children),e.children&&0===e.children.length&&delete e.children}),e},getsuccessUpload:function(e){this.ruleForm.thumb=[{name:"thumb",url:e[0]}]},getsuccessUpload2:function(e){this.ruleForm.imgs=[{name:"imgs",url:e[0]}]}}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("RightSidePopup",{attrs:{mask:"",visible:e.visible,width:"50%"},on:{"update:visible":function(t){e.visible=t}}},[r("div",{staticClass:"title",staticStyle:{"font-size":"20px","font-weight":"bold","margin-bottom":"40px"}},[e._v(e._s(this.id?"编辑分类":"添加分类"))]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"160px"}},[r("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上级分类",prop:"pid"}},[r("el-cascader",{staticStyle:{width:"200px"},attrs:{"change-on-select":"",filterable:"","expand-trigger":"hover",options:e.areaList},model:{value:e.ruleForm.pid,callback:function(t){e.$set(e.ruleForm,"pid",t)},expression:"ruleForm.pid"}}),e._v(" "),r("p",{staticClass:"tips"},[e._v("不选择分类默认为顶级分类")])],1),e._v(" "),r("el-form-item",{attrs:{label:"商品数量"}},[r("el-input",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:e.ruleForm.num,callback:function(t){e.$set(e.ruleForm,"num",t)},expression:"ruleForm.num"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"排序",prop:"sort"}},[r("el-input",{staticStyle:{width:"200px"},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否显示",prop:"display"}},[r("el-radio-group",{model:{value:e.ruleForm.display,callback:function(t){e.$set(e.ruleForm,"display",t)},expression:"ruleForm.display"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"是否显示在导航栏",prop:"display_index"}},[r("el-radio-group",{model:{value:e.ruleForm.display_index,callback:function(t){e.$set(e.ruleForm,"display_index",t)},expression:"ruleForm.display_index"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"分类图标",prop:"thumb"}},[r("FileUpload",{attrs:{isOnly:!0,fileList:e.ruleForm.thumb},on:{successUploadCBK:e.getsuccessUpload}})],1),e._v(" "),r("el-form-item",{attrs:{label:"主推图",prop:"thumb"}},[r("FileUpload",{attrs:{isOnly:!0,fileList:e.ruleForm.imgs},on:{successUploadCBK:e.getsuccessUpload2}})],1),e._v(" "),r("div",{staticStyle:{width:"100%","text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提 交")])],1)],1)],1)},staticRenderFns:[]};var p=r("C7Lr")(d,c,!1,function(e){r("YMJJ")},"data-v-7c160f1a",null);t.default=p.exports}});