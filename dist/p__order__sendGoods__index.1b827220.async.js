(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[55],{SLzX:function(e,t,a){"use strict";a.r(t);var n,r,o,s=a("p0pE"),i=a.n(s),l=(a("miYZ"),a("tsqr")),c=a("2Taf"),d=a.n(c),u=a("vZ4D"),m=a.n(u),p=a("MhPg"),f=a.n(p),g=a("l4Ni"),_=a.n(g),y=a("ujKo"),v=a.n(y),h=a("q1tI"),E=a.n(h),k=a("MuoO"),N=a("Kvkj"),C=a("wd/R"),L=a.n(C),x=function(){return[{key:"order_sn",placeholder:"\u8ba2\u5355\u53f7"},{key:"time",searchKeys:["start_at","end_at"],placeholder:["\u4e0b\u5355\u5f00\u59cb\u65f6\u95f4","\u7ed3\u675f\u65f6\u95f4"],type:"dateRange",inputProps:{disabledDate:function(e){return e<L()().subtract(3,"months")||e>L()().endOf("day")}},initialValue:[L()().subtract(3,"days"),L()()]},{key:"nick_name",placeholder:"\u7528\u6237\u540d"},{key:"user_id",placeholder:"\u7528\u6237\u8d26\u53f7"},{key:"from",placeholder:"\u6e20\u9053",type:"enum",enums:[{value:1,name:"\u5fae\u4fe1"},{value:2,name:"APP"},{value:3,name:"\u5c0f\u7a0b\u5e8f"}]}]},b=(a("R9oj"),a("ECub")),R=(a("T2oS"),a("W9HT")),I=a("eHn4"),S=a.n(I),P=a("jehZ"),T=a.n(P),w=a("rlhR"),D=a.n(w),M=a("7Qib"),j=a("deaf"),G=a("9UV2"),A=a.n(G),B=a("bflB"),F=a.n(B),O=function(e){var t=e.item,a=e.field;return E.a.createElement("div",{style:{flex:a.span},className:[F.a.contentCol,F.a.goodsContainer].join(" ")},t.goods_infos&&t.goods_infos.map(function(e,t){var a=e.goods_avatar,n=e.goods_title,r=e.goods_sale_price,o=e.goods_nums,s=e.goods_sku_id,i=e.goods_sku_properties_name;return E.a.createElement("div",{className:F.a.goods,key:t},E.a.createElement("div",{className:F.a.goodsInfo},E.a.createElement("img",{className:F.a.goodsImg,src:a,alt:"",onClick:function(){Object(N["A"])({imgUrl:a})}}),E.a.createElement("p",{className:F.a.goodsTitle},s),E.a.createElement("div",{className:F.a.goodsTitle},E.a.createElement(N["r"],{text:n,maxLine:"2"})),E.a.createElement("div",{className:F.a.goodsTitle},E.a.createElement(N["r"],{text:i,maxLine:"2"}))),E.a.createElement("div",{className:F.a.goodsPrice},E.a.createElement("p",{style:{marginBottom:10}},E.a.createElement("span",null,A.a.formatMoney(r,"\uffe5"))),E.a.createElement("p",null,E.a.createElement("span",null,"(".concat(o,"\u4ef6)")))))}))},q=function(e){var t=e.item,a=e.field;return E.a.createElement("div",{style:{flex:a.span},className:F.a.contentCol},E.a.createElement("p",null,t.type_name))},V=function(e){var t=e.item,a=e.field;return E.a.createElement("div",{style:{flex:a.span},className:[F.a.contentCol,F.a.address].join(" ")},E.a.createElement("p",null,t.receiver_name," ",t.receiver_mobile),E.a.createElement("p",null,t.receiver_province_name," ",t.receiver_city_name," ",t.receiver_district_name),E.a.createElement("div",null,E.a.createElement(N["r"],{text:t.receiver_address,maxLine:"2"})))},$=function(e){var t=e.item,a=e.field;return E.a.createElement("div",{style:{flex:a.span},className:[F.a.contentCol,F.a.address].join(" ")},E.a.createElement("p",null,"\u5feb\u9012\u516c\u53f8\uff1a",t.logistics_name||"-"),E.a.createElement("p",null,"\u5feb\u9012\u5355\u53f7\uff1a",t.logistics_sn||"-"))},z=function(e){var t=e.item,a=e.field;return E.a.createElement("div",{style:{flex:a.span},className:F.a.contentCol},E.a.createElement("p",{className:F.a.money},A.a.formatMoney(t.actual_fee,"\uffe5")),E.a.createElement("p",null,"(\u542b\u8fd0\u8d39\uff1a".concat(A.a.formatMoney(t.freight_fee,"\uffe5"),")")),E.a.createElement("p",null,E.a.createElement("span",null,t.pay_type_name)))},Z=function(e){var t=e.item,a=e.field,n=e.context,r=n.showModal;return E.a.createElement("div",{style:{flex:a.span},className:[F.a.contentCol,F.a.operate].join(" ")},E.a.createElement("a",{className:F.a.operateBtn,onClick:function(){return n.goDetail(t.id)}},"\u67e5\u770b\u8be6\u60c5"),E.a.createElement("a",{className:F.a.operateBtn,onClick:function(){r("modifyLogisticsModal",t)}},"\u7f16\u8f91\u7269\u6d41"))},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[{title:"\u5546\u54c1\u4fe1\u606f",span:4,key:"goodsInfo",render:function(e,t){return E.a.createElement(O,{item:e,field:t,key:"goodsInfo"})}},{title:"\u8ba2\u5355\u7c7b\u578b",span:1,key:"orderType",render:function(e,t){return E.a.createElement(q,{item:e,field:t,key:"orderType"})}},{title:"\u6536\u8d27\u4fe1\u606f",span:2,key:"address",render:function(e,t){return E.a.createElement(V,{item:e,field:t,key:"address"})}},{title:"\u7269\u6d41\u4fe1\u606f",span:2,key:"logistics",render:function(e,t){return E.a.createElement($,{item:e,field:t,key:"logistics"})}},{title:"\u5b9e\u4ed8\u91d1\u989d",span:2,key:"actualAmount",render:function(e,t){return E.a.createElement(z,{item:e,field:t,key:"actualAmount"})}},{title:"\u64cd\u4f5c",span:1,key:"operate",render:function(e,t,a){return E.a.createElement(Z,{item:e,field:t,context:a,key:"operate"})}}],a=t.filter(function(t){return!e.includes(t.key)});return a},H=function(e){var t=e.order,a=void 0===t?{}:t,n=e.context,r=e.removeFields,o=U(r);return E.a.createElement("div",{className:F.a.list},E.a.createElement("div",{className:F.a.listTitle},E.a.createElement("div",{className:F.a.listTitleItem},"\u8ba2\u5355\u53f7\uff1a",a.order_sn),E.a.createElement("div",{className:F.a.listTitleItem},"\u4e0b\u5355\u65f6\u95f4\uff1a",a.created_at),E.a.createElement("div",{className:F.a.listTitleItem},"\u8ba2\u5355\u6765\u6e90\uff1a",a.from_name),E.a.createElement("div",{className:[F.a.listTitleItem,F.a.nickName].join(" ")},"\u7528\u6237\u540d\uff1a",a.nick_name)),E.a.createElement("div",{className:F.a.listContent},o.map(function(e){return e.render(a,e,n)})),E.a.createElement("div",{className:F.a.remark},"\u4e70\u5bb6\u5907\u6ce8\uff1a",a.buyer_message||"-","\uff08\u7cfb\u7edf\u5907\u6ce8\uff09",a.remark||"-"))},J=H,K=(a("2qtc"),a("kLXV")),X=(a("5NDa"),a("5rEg")),Y=(a("OaEy"),a("2fM7")),W=a("WsrF");a("XlDN");function Q(e){return function(){var t,a=v()(e);if(ee()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function ee(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var te=W["a"].Item,ae=Y["a"].Option,ne={labelCol:{sm:{span:6}},wrapperCol:{sm:{span:16}}},re=(n=W["a"].create(),n((o=function(e){f()(a,e);var t=Q(a);function a(){var e;d()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={saveLoading:!1,sendLoading:!1,expressList:[]},e.toogleLoading=function(t,a){var n=1===t?"saveLoading":"sendLoading";e.setState(S()({},n,a))},e.getFooter=function(){var t=[{name:"\u53d6\u6d88",type:"default",handleClick:e.props.onCancel},{name:"\u4fdd\u5b58",handleClick:function(){e.handOk(1)},loding:e.state.saveLoading},{name:"\u53d1\u8d27",handleClick:function(){e.handOk(0)},loding:e.state.sendLoading}];return E.a.createElement(N["a"],{btns:t})},e}return m()(a,[{key:"componentDidMount",value:function(){var e=this;$api.common.getExpressList({no_page_flag:!0},{cache:!0}).then(function(t){e.setState({expressList:t.data||[]})})}},{key:"handOk",value:function(e){var t=this,a=this.props,n=a.form,r=a.onCancel,o=a.successCallback,s=a.order,l=this.state.expressList;n.validateFields(function(a,n){var c=l.find(function(e){return e.express_code===n.code});a||(t.toogleLoading(e,!0),$api.order.modifyLogistics(i()({},n,{name:c.name,id:s.id,only_logistics:e}),{success:!0}).then(function(a){r(),o(),t.toogleLoading(e,!1)}).catch(function(a){t.toogleLoading(e,!1)}))})}},{key:"render",value:function(){var e=this.props,t=e.order,a=e.form.getFieldDecorator,n=e.modalVisible,r=e.onCancel,o=this.state.expressList,s={title:"\u7f16\u8f91\u7269\u6d41\u4fe1\u606f",width:450,footer:this.getFooter(),visible:n,destroyOnClose:!0,maskClosable:!1,onCancel:r};return E.a.createElement(K["a"],s,E.a.createElement("p",{style:{paddingLeft:20}},"\u8ba2\u5355\u53f7\uff1a",t.order_sn),E.a.createElement(W["a"],ne,E.a.createElement(te,{label:"\u7269\u6d41\u516c\u53f8"},a("code",{initialValue:t.express_code,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u7269\u6d41\u516c\u53f8"}]})(E.a.createElement(Y["a"],null,o.map(function(e){return E.a.createElement(ae,{value:e.express_code,key:e.express_code},e.name)})))),E.a.createElement(te,{label:"\u5feb\u9012\u5355\u53f7"},a("sn",{initialValue:t.logistics_sn,rules:[{required:!0,message:"\u8bf7\u586b\u5199\u5feb\u9012\u5355\u53f7"}]})(E.a.createElement(X["a"],null)))))}}]),a}(h["PureComponent"]),r=o))||r),oe=re,se=a("fhe0"),ie=a.n(se);function le(e){return function(){var t,a=v()(e);if(ce()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function ce(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var de,ue,me,pe=function(e){f()(a,e);var t=le(a);function a(){var e;d()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={modifyLogisticsModal:!1,order:{}},e.getListRender=function(){var t=e.props.list;return t.map(function(t){var a={order:t,context:D()(e)};return E.a.createElement(J,T()({},a,{key:t.id}))})},e.showModal=function(t,a){var n;e.setState((n={},S()(n,t,!0),S()(n,"order",a),n))},e.hideModal=function(t){e.setState(S()({},t,!1))},e.getCommonProps=function(t){return{onCancel:function(){e.hideModal(t)},order:e.state.order,modalVisible:e.state[t],successCallback:e.props.getList}},e}return m()(a,[{key:"goDetail",value:function(e){M["j"].push({pathname:"/order/orderDetail/".concat(e)})}},{key:"render",value:function(){var e=this.props,t=e.list,a=void 0===t?[]:t,n=e.loading;return E.a.createElement(E.a.Fragment,null,E.a.createElement(j["a"],{fields:U([])}),this.getListRender(),n&&E.a.createElement(R["a"],{className:ie.a.spin}),!a.length&&!n&&E.a.createElement(b["a"],{className:ie.a.spin,image:b["a"].PRESENTED_IMAGE_SIMPLE}),E.a.createElement(oe,this.getCommonProps("modifyLogisticsModal")))}}]),a}(h["PureComponent"]),fe=pe,ge=function(e){var t=e.count,a=e.goods_num,n=e.price_sum;return E.a.createElement("div",{className:ie.a.resultBar},E.a.createElement("span",{className:ie.a.resultLabel},"\u8ba2\u5355\u6570\uff1a"),E.a.createElement("span",{className:ie.a.resultNum},A.a.formatNumber(t)),E.a.createElement("span",{className:ie.a.resultLabel},"\u5546\u54c1\u6570\u91cf\uff1a"),E.a.createElement("span",{className:ie.a.resultNum},A.a.formatNumber(a)),E.a.createElement("span",{className:ie.a.resultLabel},"\u8ba2\u5355\u91d1\u989d\uff1a"),E.a.createElement("span",{className:ie.a.resultNum},A.a.formatMoney(n,"\uffe5")))},_e=ge;function ye(e){return function(){var t,a=v()(e);if(ve()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return _()(this,t)}}function ve(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var he=(de=Object(k["connect"])(function(e){var t=e.sendGoods,a=e.loading;return{sendGoods:t,loading:a}}),de((me=function(e){f()(a,e);var t=ye(a);function a(){var e;d()(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e=t.call.apply(t,[this].concat(r)),e.state={},e.getList=function(t){var a=e.props.dispatch;a({type:"sendGoods/getList",payload:t})},e.handleSearch=function(t){var a=e.props.dispatch;a({type:"sendGoods/onSearch",payload:t}),a({type:"sendGoods/getList",payload:{page:1}})},e.pageChange=function(t,a){var n=e.props.dispatch;n({type:"sendGoods/getList",payload:{page:t,pageSize:a}})},e.handDeliverySend=function(){$api.order.batchSendGoods().then(function(t){if(0===t.data)return l["a"].info("\u5feb\u9012\u5355\u53f7\u672a\u8bbe\u7f6e\uff0c\u8bf7\u5148\u4fdd\u5b58");l["a"].info("\u6210\u529f\u53d1\u51fa".concat(t.data,"\u4e2a\u8ba2\u5355")),e.getList({page:1})})},e}return m()(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.loading,n=t.sendGoods,r=n.pagination,o=n.list,s=n.query,l=n.result,c={search:s,fields:x(),onSearch:this.handleSearch},d=[{name:"\u4e00\u952e\u53d1\u8d27",type:"primary",handleClick:this.handDeliverySend,permission:$api.order.batchSendGoods.permission()},{type:"templateDowbload",templateUrl:"/delivery_template.xlsx",permission:$api.order.orderImport.permission()},{type:"import",action:"/order/deliver-import",ImportSuccess:function(){return e.getList({page:1})},permission:$api.order.orderImport.permission()},{type:"export",url:"/order/export",query:i()({},s,{status:2}),permission:$api.order.orderImport.permission()}].filter(function(e){return e.permission}),u={list:o,loading:a.effects["sendGoods/getList"],getList:this.getList},m=i()({},r,{onChange:this.pageChange,onShowSizeChange:function(t,a){return e.pageChange(1,a)}});return E.a.createElement(N["x"],{inner:!0},E.a.createElement(N["y"],{btns:d}),E.a.createElement(N["C"],c),E.a.createElement(_e,l),E.a.createElement(fe,u),E.a.createElement(N["z"],{paginationProps:m}))}}]),a}(h["PureComponent"]),ue=me))||ue);t["default"]=he},bflB:function(e,t,a){e.exports={"text-overflow":"text-overflow___3glC7","text-gradient":"text-gradient___rleJ_","background-hover":"background-hover___1Axmy",list:"list___1A7v8",listTitle:"listTitle___9zZPs",listTitleItem:"listTitleItem___2PokF",nickName:"nickName___1qdFV",listContent:"listContent___19qAP",contentCol:"contentCol___1KHIr",goodsContainer:"goodsContainer___kb2by",goods:"goods___3HWYz",goodsInfo:"goodsInfo___1ZhGr",goodsPrice:"goodsPrice___hxFYt",goodsImg:"goodsImg___1A0f9",goodsTitle:"goodsTitle___2UYpG",noneBorderRight:"noneBorderRight___3oLje",address:"address___1v217",money:"money___3Ui31",operateBtn:"operateBtn___10yRd",remark:"remark___3-0yp"}},fhe0:function(e,t,a){e.exports={resultBar:"resultBar___3n1Lr",resultLabel:"resultLabel___2rZNo",resultNum:"resultNum___1Et8X",spin:"spin___8Jfyw"}}}]);