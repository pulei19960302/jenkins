(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[89],{PC48:function(e,t,a){e.exports={container:"container___p8zar",title:"title___G1O7E",item:"item___3_8SX",autoCancel:"autoCancel___3vC57",autoReceive:"autoReceive___1R1eZ",remindContent:"remindContent___2iGXQ",orderTypesList:"orderTypesList___Bgg1S",add:"add____5oL5",afterSale:"afterSale___2JO98",reason:"reason___MTslq",cancelOrder:"cancelOrder___eP56f",editOrder:"editOrder___Tap9S",notes:"notes___LxpXj",addReasonModal:"addReasonModal___20IG-",tips:"tips___1zeop",submit:"submit___1GthN",flex:"flex___12Cns",label:"label___56tGQ",mr20:"mr20___3Fud2"}},RgAG:function(e,t,a){"use strict";a.r(t);a("+L6B");var n=a("2/Rp"),r=a("sEfC"),c=a.n(r),l=(a("5NDa"),a("5rEg")),o=(a("giR+"),a("fyUT")),i=a("2Taf"),s=a.n(i),u=a("vZ4D"),d=a.n(u),m=a("MhPg"),f=a.n(m),p=a("l4Ni"),_=a.n(p),h=a("ujKo"),v=a.n(h),g=a("p0pE"),E=a.n(g),y=a("q1tI"),C=a.n(y),N=a("MuoO"),R=a("WsrF"),x=(a("XlDN"),a("Kvkj")),T=(a("OaEy"),a("2fM7")),b=a("Gm+L"),S=(a("7Qib"),T["a"].Option),L=function(){var e=this;return[{title:"\u8ba2\u5355\u7c7b\u578b",width:200,dataIndex:"orderType",render:function(t,a){return C.a.createElement(T["a"],{defaultValue:t||b["b"].ALL,onChange:function(t){e.handleUpdateOrderList("orderType",t,a)}},b["c"]&&b["c"].map(function(e){return C.a.createElement(S,{value:e.value,key:e.value},e.name)}))}},{title:"\u53d6\u6d88\u8ba2\u5355\u65f6\u957f",dataIndex:"cancelTime",render:function(t,a){return C.a.createElement("div",null,C.a.createElement("span",null,"\u5ba2\u6237\u4e0b\u5355\u540e\xa0\xa0"),C.a.createElement(o["a"],{min:1,max:600,defaultValue:t,placeholder:"\u8bf7\u8f93\u5165",precision:0,onChange:function(t){e.handleUpdateOrderList("cancelTime",t,a)}}),C.a.createElement("span",null,"\xa0\xa0\u5206\u949f\xa0\xa0\u540e\u672a\u4ed8\u6b3e\uff0c\u81ea\u52a8\u53d6\u6d88\u8ba2\u5355\u3002\xa0\xa0"))}},{title:"\u53d6\u6d88\u8ba2\u5355\u63d0\u9192\u5185\u5bb9",dataIndex:"content",render:function(t,a){return C.a.createElement(l["a"],{defaultValue:t,onChange:function(t){e.handleUpdateOrderList("content",t,a)},placeholder:"\u8bf7\u8f93\u5165"})}},{title:"\u64cd\u4f5c",dataIndex:"operation",render:function(t,a){return C.a.createElement("div",{style:{textAlign:"center"}},C.a.createElement("a",{onClick:function(){e.handleDeleteOrderType(a)}},"\u5220\u9664"))}}]},O=(a("2qtc"),a("kLXV")),I=a("4i/N"),A=a("PC48"),k=a.n(A);function D(e){return function(){var t,a=v()(e);if(P()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function P(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}y["PureComponent"],a("g9YV");var w=a("wCAj"),G=a("gWZ8"),j=a.n(G),M=a("eHn4"),V=a.n(M),X=a("xvlK");function U(e){return function(){var t,a=v()(e);if(q()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var J,K,Q,Z;y["PureComponent"];function z(e){return function(){var t,a=v()(e);if(B()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var F="30",W="10",$="0",H=(J=R["a"].create(),K=Object(N["connect"])(function(e){var t=e.tradeSet;return E()({},t)}),J(Q=K((Z=function(e){f()(a,e);var t=z(a);function a(e){var n;return s()(this,a),n=t.call(this,e),n.toggleLoading=function(){n.setState(function(e){return{loading:!e.loading}})},n.handleSubmit=function(){n.toggleLoading();var e=n.props.trade,t=void 0===e?{}:e;$api.system.setTradeInfo({data:t},{success:!0}).finally(function(e){n.toggleLoading()})},n.handleChangeTrade=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=t;t instanceof Object&&!(t instanceof Array)&&(r=t.target&&t.target.value);var c=n.props.dispatch;c({type:"tradeSet/updateTradeInfo",payload:{keys:e,value:r,canDel:a}})},n.state={loading:!1},n}return d()(a,[{key:"renderAutoCancelSet",value:function(){var e=this,t=this.props.trade,a=void 0===t?{}:t,n=a.order_auto_cancel,r=void 0===n?{}:n,c=r.minutes,i=void 0===c?"":c,s=r.cancel_tips_message,u=void 0===s?"":s;return C.a.createElement("div",{className:k.a.container},C.a.createElement("div",{className:"".concat(k.a.title," ").concat(k.a.flex)},C.a.createElement("span",{className:k.a.mr20},"\u81ea\u52a8\u53d6\u6d88\u8ba2\u5355")),C.a.createElement(R["a"].Item,{className:k.a.item},C.a.createElement("span",{className:k.a.label},"\u5ba2\u6237\u4e0b\u5355\u540e"),C.a.createElement(o["a"],{min:1,max:600,placeholder:"\u8bf7\u8f93\u5165",precision:0,value:i,onChange:function(t){e.handleChangeTrade(["order_auto_cancel","minutes"],t||F)}}),C.a.createElement("span",null,"\xa0\xa0min\xa0\xa0\u540e\u672a\u4ed8\u6b3e\uff0c\u81ea\u52a8\u53d6\u6d88\u8ba2\u5355"),C.a.createElement("span",{className:k.a.notes},"\u5907\u6ce8\uff1a\u8bf7\u8f93\u51651-600\u4e4b\u95f4\u7684\u6574\u6570")),C.a.createElement(R["a"].Item,{className:"".concat(k.a.item," ").concat(k.a.autoCancel)},C.a.createElement("span",{className:k.a.label},"\u63d0\u9192\u5185\u5bb9"),C.a.createElement(l["a"].TextArea,{placeholder:"\u8bf7\u8f93\u5165\u81ea\u52a8\u53d6\u6d88\u63d0\u9192\u5185\u5bb9",value:u,onChange:function(t){e.handleChangeTrade(["order_auto_cancel","cancel_tips_message"],t)},maxLength:50})))}},{key:"renderAutoReceiveSet",value:function(){var e=this,t=this.props.trade,a=void 0===t?{}:t,n=a.order_auto_confirm_receipt,r=void 0===n?{}:n,c=r.flag,i=void 0===c?"":c,s=r.days,u=void 0===s?"":s,d=r.confirm_tips_message,m=void 0===d?"":d;return C.a.createElement("div",{className:k.a.container},C.a.createElement("div",{className:"".concat(k.a.title," ").concat(k.a.flex)},C.a.createElement("span",{className:k.a.mr20},"\u81ea\u52a8\u6536\u8d27\u8bbe\u7f6e"),C.a.createElement(x["m"],{onChange:function(t){e.handleChangeTrade(["order_auto_confirm_receipt","flag"],t,!1)},values:[!0,!1],value:i})),i&&C.a.createElement("div",{className:k.a.content},C.a.createElement(R["a"].Item,{className:k.a.item},C.a.createElement("span",{className:k.a.label},"\u5546\u5bb6\u53d1\u8d27"),C.a.createElement(o["a"],{min:1,max:30,placeholder:"\u8bf7\u8f93\u5165",precision:0,value:u,onChange:function(t){e.handleChangeTrade(["order_auto_confirm_receipt","days"],t||W)}}),C.a.createElement("span",null,"\xa0\xa0\u5929\xa0\xa0\u540e\u5ba2\u6237\u672a\u786e\u8ba4\u6536\u8d27\uff0c\u81ea\u52a8\u5b8c\u6210\u6536\u8d27"),C.a.createElement("span",{className:k.a.notes},"\u5907\u6ce8\uff1a\u8bf7\u8f93\u51651-30\u4e4b\u95f4\u7684\u6574\u6570")),C.a.createElement(R["a"].Item,{className:"".concat(k.a.item," ").concat(k.a.autoReceive)},C.a.createElement("span",{className:k.a.label},"\u63d0\u9192\u5185\u5bb9"),C.a.createElement(l["a"].TextArea,{placeholder:"\u8bf7\u8f93\u5165\u81ea\u52a8\u6536\u8d27\u63d0\u9192\u5185\u5bb9",value:m,onChange:function(t){e.handleChangeTrade(["order_auto_confirm_receipt","confirm_tips_message"],t)},maxLength:50}))))}},{key:"renderAutoRebateSet",value:function(){var e=this,t=this.props.trade,a=void 0===t?{}:t,n=a.order_auto_rebate,r=void 0===n?{}:n,c=r.days,l=void 0===c?"":c;return C.a.createElement("div",{className:k.a.container},C.a.createElement("div",{className:"".concat(k.a.title," ").concat(k.a.flex)},C.a.createElement("span",{className:k.a.mr20},"\u81ea\u52a8\u8fd4\u5229\u8bbe\u7f6e")),C.a.createElement(R["a"].Item,{className:k.a.item},C.a.createElement("span",{className:k.a.label},"\u8ba2\u5355\u5b8c\u6210\u8d85\u8fc7"),C.a.createElement(o["a"],{min:0,max:30,placeholder:"\u8bf7\u8f93\u5165",precision:0,value:l,onChange:function(t){e.handleChangeTrade(["order_auto_rebate","days"],t||$)}}),C.a.createElement("span",null,"\xa0\xa0\u5929\xa0\xa0\u81ea\u52a8\u8fd4\u5229"),C.a.createElement("span",{className:k.a.notes},"\u5907\u6ce8\uff1a\u8bf7\u8f93\u51650-30\u4e4b\u95f4\u7684\u6574\u6570")))}},{key:"render",value:function(){var e=this.state.loading,t=this.handleSubmit;return C.a.createElement(x["x"],null,C.a.createElement(R["a"],null,this.renderAutoCancelSet(),this.renderAutoReceiveSet(),this.renderAutoRebateSet(),$api.system.setTradeInfo.permission()&&C.a.createElement("div",{className:k.a.submit},C.a.createElement(n["a"],{type:"primary",loading:e,onClick:c()(t,300)},"\u63d0\u4ea4"))))}}]),a}(y["PureComponent"]),Q=Z))||Q)||Q);t["default"]=H}}]);