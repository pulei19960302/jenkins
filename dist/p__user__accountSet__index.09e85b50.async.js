(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[92],{"2OTV":function(e,t,a){e.exports={title:"title___bUU8g",form:"form___sUw2F",photo:"photo___2I81c",btns:"btns___1OCNv",spin:"spin___3fOe9"}},YoQp:function(e,t,a){"use strict";a.r(t);a("+L6B");var n,r,l,o,i=a("2/Rp"),c=(a("T2oS"),a("W9HT")),s=a("jehZ"),p=a.n(s),u=(a("5NDa"),a("5rEg")),m=a("p0pE"),f=a.n(m),d=a("2Taf"),h=a.n(d),v=a("vZ4D"),g=a.n(v),E=a("MhPg"),b=a.n(E),y=a("l4Ni"),_=a.n(y),C=a("ujKo"),w=a.n(C),I=(a("je13"),a("q1tI")),N=a.n(I),k=a("MuoO"),F=a("jhfD"),S=a("WsrF"),x=(a("XlDN"),a("Kvkj")),j=a("7Qib"),D=a("YP4+"),L=a("2OTV"),R=a.n(L);function O(e){return function(){var t,a=w()(e);if(P()){var n=w()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var T={labelCol:{span:7},wrapperCol:{span:8}},V=(n=S["a"].create(),r=Object(k["connect"])(function(e){var t=e.app;return{app:t}}),n(l=r((o=function(e){b()(a,e);var t=O(a);function a(e){var n;return h()(this,a),n=t.call(this,e),n.toggleLoading=function(){n.setState(function(e){return{loading:!e.loading}})},n.handleImgChange=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=n.props.form,a=e&&e[0];t.setFieldsValue({avatar:a})},n.handleSubmit=function(){var e=n.props,t=e.form,a=e.dispatch,r=e.app,l=r.user,o=void 0===l?{}:l;t.validateFields(function(e,t){if(e)return null;$api.user.accountSet(t,{success:!0,loadingFn:n.toggleLoading}).then(function(e){var t=e.data,n=void 0===t?{}:t,r=f()({},o,n);a({type:"app/updateState",payload:{user:r}}),j["j"].push("/dashboard")})})},n.handleRest=function(){var e=n.props.form;e.resetFields()},n.state={loading:!1},n}return g()(a,[{key:"renderForm",value:function(){var e=this.props,t=e.form,a=e.app.user,n=void 0===a?{}:a,r=t.getFieldDecorator,l=n.avatar,o=void 0===l?"":l,i=n.name,c=void 0===i?"":i,s=n.email,m=void 0===s?"":s;return N.a.createElement(S["a"],p()({},T,{className:R.a.form,autoComplete:"off",role:"presentation"}),N.a.createElement(S["a"].Item,{label:"\u5934\u50cf"},N.a.createElement("div",{className:"".concat(R.a.photo," dpflex")},r("avatar")(N.a.createElement(x["G"],{desc:"\u4e0a\u4f20\u56fe\u7247",fileTotalCount:1,dataChange:this.handleImgChange,pic:o})),N.a.createElement("ol",null,N.a.createElement("li",null,"\u683c\u5f0f\xa0:\xa0\xa0\u56fe\u7247\u4ec5\u652f\u6301JPG,PNG\u683c\u5f0f"),N.a.createElement("li",null,"\u5927\u5c0f\xa0:\xa0\xa0\u5efa\u8bae1M\u4ee5\u5185")))),N.a.createElement(S["a"].Item,{label:"\u59d3\u540d"},r("name",{initialValue:c})(N.a.createElement(u["a"],{autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165\u59d3\u540d",maxLength:10}))),N.a.createElement(S["a"].Item,{label:"\u7535\u5b50\u90ae\u7bb1"},r("email",{initialValue:m,rules:[{pattern:D["b"],message:"\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1"}]})(N.a.createElement(u["a"],{autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165\u7535\u5b50\u90ae\u7bb1"}))),N.a.createElement(S["a"].Item,{label:"\u65e7\u5bc6\u7801"},r("password_old")(N.a.createElement(u["a"],{type:"password",autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165\u65e7\u5bc6\u7801\xa0\xa0(\u4e0d\u4fee\u6539\u53ef\u4e0d\u586b\u5199)",maxLength:20}))),N.a.createElement(S["a"].Item,{label:"\u65b0\u5bc6\u7801"},r("password")(N.a.createElement(u["a"],{type:"password",autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801\xa0\xa0(\u4e0d\u4fee\u6539\u53ef\u4e0d\u586b\u5199)",maxLength:20}))),N.a.createElement(S["a"].Item,{label:"\u786e\u8ba4\u65b0\u5bc6\u7801"},r("password_conf")(N.a.createElement(u["a"],{type:"password",autoComplete:"off",placeholder:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801\xa0\xa0(\u4e0d\u4fee\u6539\u53ef\u4e0d\u586b\u5199)",maxLength:20}))))}},{key:"renderSpin",value:function(){var e=this.state.loading;if(e)return N.a.createElement("div",{className:R.a.spin},N.a.createElement(c["a"],null))}},{key:"render",value:function(){var e=this;return N.a.createElement(x["x"],{inner:!0},this.renderSpin(),N.a.createElement("div",{className:R.a.title},N.a.createElement(F["a"],{onClick:function(){e.props.history.goBack()}}),N.a.createElement("span",null,"\u8d26\u6237\u8bbe\u7f6e")),this.renderForm(),N.a.createElement("div",{className:R.a.btns},N.a.createElement(i["a"],{type:"primary",onClick:this.handleSubmit},"\u63d0\u4ea4")))}}]),a}(I["PureComponent"]),l=o))||l)||l);t["default"]=V}}]);