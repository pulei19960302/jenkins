webpackJsonp([7],{"3hZv":function(e,t){},A9kh:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("aA9S"),a=r.n(i),s=r("lC5x"),l=r.n(s),o=r("4YfN"),n=r.n(o),u=r("J0Oq"),c=r.n(u),m={name:"NewBrand",props:{show:[Boolean],id:{}},data:function(){return{visible:!1,ruleForm:{name:"",sort:"",display:0,is_maker:0,thumb:[{url:""}],imgs:[{url:""}],logo:[{url:""}],initial:"",description:"",cat_ids:"",cat_arr:[]},areaList:[],rules:{name:[{required:!0,message:"请输入",trigger:"blur"}],description:[{required:!0,message:"请输入",trigger:"blur"}],initial:[{required:!0,message:"请选择",trigger:"change"}],sort:[{required:!0,message:"请填写",trigger:"blur"}],describe:[{required:!0,message:"请填写",trigger:"blur"}],keywords:[{required:!0,message:"请填写",trigger:"blur"}],thumb:[{required:!0,message:"请上传",trigger:"change"}],logo:[{required:!0,message:"请上传",trigger:"change"}]},secondArycatoptions:[],imgWidth:"100px",imgHeight:"100px"}},created:function(){this.secondArycat()},watch:{visible:function(e){this.$emit("update:show",e)},show:function(e){this.visible=e},id:function(e){e&&this.getData(),e||(this.ruleForm={name:"",sort:"",display:0,is_maker:0,thumb:[{url:""}],imgs:[{url:""}],logo:[{url:""}],initial:"",description:"",cat_ids:"",cat_arr:[]})}},methods:{getData:function(){var e=this;return c()(l.a.mark(function t(){var r,i,a,s,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.product.brandDetail({id:e.id});case 3:for(r=t.sent,i=r.data,a=n()({},i),e.ruleForm=a,e.ruleForm.thumb=[{name:i.id,url:i.thumb}],e.ruleForm.logo=[{name:i.id,url:i.logo}],s=[],o=0;o<a.imgs.length;o++)s.push({name:a.imgs[o],url:a.imgs[o]});e.ruleForm.imgs=s,t.next=16;break;case 14:t.prev=14,t.t0=t.catch(0);case 16:case"end":return t.stop()}},t,e,[[0,14]])}))()},secondArycat:function(){var e=this;return c()(l.a.mark(function t(){var r,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$api.product.secondArycat();case 3:r=t.sent,i=r.data,e.secondArycatoptions=i,t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}},t,e,[[0,8]])}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.save()})},save:function(){var e=this;return c()(l.a.mark(function t(){var r;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:r=a()({},e.ruleForm);try{r.logo=r.logo[0].url,r.thumb=r.thumb[0].url}catch(e){}if(r.cat_ids=r.cat_arr,!e.id){t.next=8;break}return t.next=6,e.$api.product.brandEdit(r);case 6:t.next=10;break;case 8:return t.next=10,e.$api.product.brandAdd(r);case 10:e.$emit("fresh"),e.visible=!1;case 12:case"end":return t.stop()}},t,e)}))()},resetForm:function(e){this.$refs[e].resetFields()},getsuccessUpload:function(e){this.ruleForm.logo=[{name:e,url:e}]},getsuccessUploadImg:function(e){this.ruleForm.imgs={name:e,url:e}},getsuccessUploadthumb:function(e){this.ruleForm.thumb=[{name:e,url:e}]}}},d={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("RightSidePopup",{attrs:{mask:"",visible:e.visible,width:"50%"},on:{"update:visible":function(t){e.visible=t}}},[r("div",{staticClass:"title",staticStyle:{"font-size":"20px","font-weight":"bold","margin-bottom":"40px"}},[e._v(e._s(this.id?"编辑品牌":"添加品牌"))]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"160px"}},[r("el-form-item",{attrs:{label:"品牌名称：",prop:"name"}},[r("el-input",{staticStyle:{width:"200px"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"品牌首字母：",prop:"initial"}},[r("el-input",{staticStyle:{width:"200px"},model:{value:e.ruleForm.initial,callback:function(t){e.$set(e.ruleForm,"initial",t)},expression:"ruleForm.initial"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"包含的分类："}},[r("el-select",{staticStyle:{width:"200px"},attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},model:{value:e.ruleForm.cat_arr,callback:function(t){e.$set(e.ruleForm,"cat_arr",t)},expression:"ruleForm.cat_arr"}},e._l(e.secondArycatoptions,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"排序：",prop:"sort"}},[r("el-input",{staticStyle:{width:"200px"},model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"品牌故事："}},[r("el-input",{staticStyle:{width:"200px"},attrs:{type:"textarea",rows:6},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"是否显示：",prop:"display_index"}},[r("el-radio-group",{model:{value:e.ruleForm.display,callback:function(t){e.$set(e.ruleForm,"display",t)},expression:"ruleForm.display"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1),e._v(" "),r("div",{staticClass:"tips"},[e._v("当品牌下还没有商品的时候，分类页的品牌区将不会显示该品牌")])],1),e._v(" "),r("el-form-item",{attrs:{label:"品牌制造商：",prop:"is_maker"}},[r("el-radio-group",{model:{value:e.ruleForm.is_maker,callback:function(t){e.$set(e.ruleForm,"is_maker",t)},expression:"ruleForm.is_maker"}},[r("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"品牌LOGO：",prop:"logo"}},[r("FileUpload",{attrs:{width:e.imgWidth,height:e.imgHeight,isOnly:!0,fileList:e.ruleForm.logo},on:{successUploadCBK:e.getsuccessUpload}})],1),e._v(" "),r("el-form-item",{staticClass:"thumb-class",attrs:{label:"缩略图：",prop:"thumb"}},[r("FileUpload",{attrs:{width:e.imgWidth,height:e.imgHeight,isOnly:!0,fileList:e.ruleForm.thumb},on:{successUploadCBK:e.getsuccessUploadthumb}})],1),e._v(" "),r("el-form-item",{attrs:{label:"图集："}},[r("FileUpload",{attrs:{width:e.imgWidth,height:e.imgHeight,isOnly:!0,fileList:e.ruleForm.imgs},on:{successUploadCBK:e.getsuccessUploadImg}})],1),e._v(" "),r("el-form-item",{staticStyle:{width:"100%","text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提 交")])],1)],1)],1)},staticRenderFns:[]};var p=r("C7Lr")(m,d,!1,function(e){r("3hZv")},"data-v-2ce77f97",null);t.default=p.exports}});