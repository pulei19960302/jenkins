(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[48],{SRaE:function(e,t,a){"use strict";a.r(t);var n=a("p0pE"),r=a.n(n),o=a("gWZ8"),i=a.n(o),l=a("2Taf"),s=a.n(l),c=a("vZ4D"),u=a.n(c),d=a("MhPg"),m=a.n(d),f=a("l4Ni"),p=a.n(f),_=a("ujKo"),g=a.n(_),v=a("q1tI"),y=a.n(v),E=a("MuoO"),h=a("Kvkj"),S=a("PETs"),k=(a("R9oj"),a("ECub")),C=(a("T2oS"),a("W9HT")),x=a("eHn4"),N=a.n(x),T=a("jehZ"),L=a.n(T),b=a("rlhR"),R=a.n(b),M=a("deaf"),I=a("9UV2"),w=a.n(I),A=a("dj3y"),P=a("q68s"),j=a.n(P),D=A["a"].WAIT_FINANCE_AUDIT,O=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:[j.a.contentCol,j.a.goodsContainer].join(" ")},t.goods_infos&&t.goods_infos.map(function(e,t){var a=e.goods_avatar,n=e.goods_title,r=e.goods_sale_price,o=e.count,i=e.goods_sku_id,l=e.goods_sku_properties_name;return y.a.createElement("div",{className:j.a.goods,key:t},y.a.createElement("div",{className:j.a.goodsInfo},y.a.createElement("img",{className:j.a.goodsImg,src:a,alt:"",onClick:function(){Object(h["A"])({imgUrl:a})}}),y.a.createElement("p",{className:j.a.goodsTitle},i),y.a.createElement("div",{className:j.a.goodsTitle},y.a.createElement(h["r"],{text:n,maxLine:"2"})),y.a.createElement("div",{className:j.a.goodsTitle},y.a.createElement(h["r"],{text:l,maxLine:"2"}))),y.a.createElement("div",{className:j.a.goodsPrice},y.a.createElement("p",{style:{marginBottom:10}},y.a.createElement("span",null,w.a.formatMoney(r,"\uffe5"))),y.a.createElement("p",null,y.a.createElement("span",null,"\u552e\u540e\uff1a".concat(o,"\u4ef6")))))}))},B=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:j.a.contentCol},y.a.createElement("p",{className:j.a.money},w.a.formatMoney(t.sale_fee_count_by_backend,"\uffe5")))},q=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:j.a.contentCol},y.a.createElement("p",null,t.type_name))},F=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:j.a.contentCol},y.a.createElement("p",null,t.status_name))},K=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:[j.a.contentCol,j.a.address].join(" ")},y.a.createElement("p",null,t.receiver_name," ",t.receiver_mobile),y.a.createElement("div",null,y.a.createElement(h["r"],{text:t.receiver_address,maxLine:"2"})))},U=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:j.a.contentCol},y.a.createElement("p",{className:j.a.money},w.a.formatMoney(t.total_fee,"\uffe5")))},Z=function(e){var t=e.item,a=e.field;return y.a.createElement("div",{style:{flex:a.span},className:[j.a.contentCol,j.a.address].join(" ")},y.a.createElement("p",null,t.logistics_name," ",t.receiver_city_name," ",t.receiver_district_name),y.a.createElement("div",null,y.a.createElement(h["r"],{text:t.logistics_sn,maxLine:"1"})))},V=function(e){var t=e.item,a=e.field,n=e.context,r=n.viewDetails;return y.a.createElement("div",{style:{flex:a.span},className:j.a.contentCol},t.status!==D&&y.a.createElement("a",{className:j.a.operateBtn,onClick:function(){r(t)}},"\u67e5\u770b\u8be6\u60c5"))},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[{title:"\u552e\u540e\u4fe1\u606f",span:4,key:"goodsInfo",render:function(e,t){return y.a.createElement(O,{item:e,field:t,key:"goodsInfo"})}},{title:"\u552e\u540e\u91d1\u989d",span:1,key:"afterSaleAmount",render:function(e,t){return y.a.createElement(B,{item:e,field:t,key:"afterSaleAmount"})}},{title:"\u552e\u540e\u7c7b\u578b",span:1,key:"afterSaleType",render:function(e,t){return y.a.createElement(q,{item:e,field:t,key:"afterSaleType"})}},{title:"\u552e\u540e\u72b6\u6001",span:1,key:"afterSaleStatus",render:function(e,t){return y.a.createElement(F,{item:e,field:t,key:"afterSaleStatus"})}},{title:"\u6536\u8d27\u4fe1\u606f",span:2,key:"address",render:function(e,t){return y.a.createElement(K,{item:e,field:t,key:"address"})}},{title:"\u5b9e\u9645\u9000\u6b3e",span:1,key:"returnAmount",render:function(e,t){return y.a.createElement(U,{item:e,field:t,key:"returnAmount"})}},{title:"\u9000\u5e93\u7269\u6d41",span:2,key:"returnAddress",render:function(e,t){return y.a.createElement(Z,{item:e,field:t,key:"returnAddress"})}},{title:"\u64cd\u4f5c",span:1,key:"operate",render:function(e,t,a){return y.a.createElement(V,{item:e,field:t,context:a,key:"operate"})}}],a=t.filter(function(t){return!e.includes(t.key)});return a},J=function(e){var t=e.order,a=e.context,n=e.removeFields,r=z(n);return y.a.createElement("div",{className:j.a.list},y.a.createElement("div",{className:j.a.listTitle},y.a.createElement("div",{className:j.a.listTitleItem},"\u670d\u52a1\u5355\u53f7\uff1a",t.return_sn),y.a.createElement("div",{className:j.a.listTitleItem},"\u8ba2\u5355\u7f16\u53f7\uff1a",t.order_sn),y.a.createElement("div",{className:j.a.listTitleItem},"\u552e\u540e\u65f6\u95f4\uff1a",t.created_at),y.a.createElement("div",{className:[j.a.listTitleItem,j.a.nickName].join(" ")},"\u7528\u6237\u540d\uff1a",t.uid_name)),y.a.createElement("div",{className:j.a.listContent},r.map(function(e){return e.render(t,e,a)})))},W=J,G=a("ogAu"),H=a("w4ly"),Y=a("c6xM"),$=a.n(Y);function X(e){return function(){var t,a=g()(e);if(Q()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return p()(this,t)}}function Q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var ee,te,ae,ne=A["a"].CLOSE,re=A["a"].COMPLETE,oe=A["a"].REFUSE_REFUND,ie=function(e){m()(a,e);var t=X(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={auditAfterSaleModal:!1,afterSaleOrderModal:!1,expressList:[],order:{}},e.getListRender=function(){var t=e.props.list;return t.map(function(t){var a={order:t,context:R()(e)};return y.a.createElement(W,L()({},a,{key:t.id}))})},e.viewDetails=function(t){[ne,re,oe].includes(t.status)?e.showModal("afterSaleOrderModal",t):e.showModal("auditAfterSaleModal",t)},e.showModal=function(t){var a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.setState((a={},N()(a,t,!0),N()(a,"order",n),a))},e.hideModal=function(t){e.setState(N()({},t,!1))},e.getCommonProps=function(t){return{order:e.state.order,modalVisible:e.state[t],onCancel:function(){e.hideModal(t)},successCallback:e.props.getList}},e}return u()(a,[{key:"componentDidMount",value:function(){var e=this;$api.common.getExpressList({no_page_flag:!0},{cache:!0}).then(function(t){e.setState({expressList:t.data||[]})})}},{key:"render",value:function(){var e=this.props,t=e.list,a=void 0===t?[]:t,n=e.loading,r=this.state.expressList;return y.a.createElement(y.a.Fragment,null,y.a.createElement(M["a"],{fields:z()}),this.getListRender(),n&&y.a.createElement(C["a"],{className:$.a.spin}),!a.length&&!n&&y.a.createElement(k["a"],{className:$.a.spin,image:k["a"].PRESENTED_IMAGE_SIMPLE}),y.a.createElement(G["a"],L()({},this.getCommonProps("auditAfterSaleModal"),{expressList:r})),y.a.createElement(H["a"],this.getCommonProps("afterSaleOrderModal")))}}]),a}(v["PureComponent"]),le=ie;function se(e){return function(){var t,a=g()(e);if(ce()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return p()(this,t)}}function ce(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var ue=(ee=Object(E["connect"])(function(e){var t=e.afterSale,a=e.app,n=e.loading;return{afterSale:t,app:a,loading:n}}),ee((ae=function(e){m()(a,e);var t=se(a);function a(e){var n;return s()(this,a),n=t.call(this,e),n.getList=function(e){var t=n.props.dispatch;t({type:"afterSale/getList",payload:e})},n.tabsChange=function(e){var t=e.value,a=n.props.dispatch;a({type:"afterSale/updateState",payload:{status:t}}),a({type:"afterSale/getList",payload:{page:1}}),a({type:"afterSale/afterSaleSta"})},n.handleSearch=function(e){var t=n.props.dispatch;t({type:"afterSale/onSearch",payload:e}),t({type:"afterSale/getList",payload:{page:1}})},n.pageChange=function(e,t){var a=n.props.dispatch;a({type:"afterSale/getList",payload:{page:e,pageSize:t}})},n.state={},n}return u()(a,[{key:"getTabs",value:function(){var e=this.props.afterSale.tabsNum,t=i()(S["b"]);return e&&(t=t.map(function(t){var a=r()({},t);return e[a.key]&&(a.title="".concat(a.title,"(").concat(e[a.key].num,")")),a})),t}},{key:"render",value:function(){var e=this,t=this.props,a=t.loading,n=t.afterSale,o=n.pagination,i=n.list,l=n.query,s=n.status,c={search:l,fields:Object(S["a"])(),onSearch:this.handleSearch},u=[{type:"export",url:"/post-sales/export",query:l,permission:$api.order.afterSaleDownload.permission()}].filter(function(e){return e.permission}),d={list:i,loading:a.effects["afterSale/getList"],getList:this.getList},m=r()({},o,{onChange:this.pageChange,onShowSizeChange:function(t,a){return e.pageChange(1,a)}});return y.a.createElement(h["x"],{inner:!0},y.a.createElement(h["E"],{defaultActiveKey:s,tabs:this.getTabs(),onChange:this.tabsChange,btns:u}),y.a.createElement(h["C"],c),y.a.createElement(le,d),y.a.createElement(h["z"],{paginationProps:m}))}}]),a}(v["PureComponent"]),te=ae))||te);t["default"]=ue},q68s:function(e,t,a){e.exports={"text-overflow":"text-overflow___1MJW9","text-gradient":"text-gradient___1npTo","background-hover":"background-hover___2LKBk",list:"list___1wuXJ",listTitle:"listTitle___odUbV",listTitleItem:"listTitleItem___1GKgP",nickName:"nickName___x985u",listContent:"listContent___2jgrt",contentCol:"contentCol___35B6R",goodsContainer:"goodsContainer___ZcKVv",goods:"goods___EYzLR",goodsInfo:"goodsInfo___3Sm7i",goodsPrice:"goodsPrice___Ogt9Y",goodsImg:"goodsImg___2ZqFS",goodsTitle:"goodsTitle___3pocv",noneBorderRight:"noneBorderRight___1boR1",address:"address___2sVZ_",money:"money___33w4o",operateBtn:"operateBtn___2Ekdn",remark:"remark___18D-T"}}}]);