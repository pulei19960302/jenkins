(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[60],{"/rFo":function(e,t,a){"use strict";a.r(t);a("y8nQ");var n=a("Vl3Y"),r=a("jehZ"),c=a.n(r),l=(a("+L6B"),a("2/Rp")),i=(a("miYZ"),a("tsqr")),o=a("2Taf"),s=a.n(o),u=a("vZ4D"),d=a.n(u),p=a("MhPg"),m=a.n(p),f=a("l4Ni"),h=a.n(f),_=a("ujKo"),g=a.n(_),v=a("p0pE"),y=a.n(v),E=(a("Znn+"),a("ZTPi")),b=a("q1tI"),C=a.n(b),S=a("MuoO"),k=a("wd/R"),w=a.n(k),P=a("yEr3"),R=a.n(P),D=a("7Qib"),T=a("Kvkj"),I=(a("iQDF"),a("+eQT")),x=(a("7Kak"),a("9yH6")),F=(a("IzEo"),a("bx4M")),U=(a("giR+"),a("fyUT")),M=(a("14J3"),a("BMrR")),N=(a("jCWc"),a("kPKH")),L=(a("5NDa"),a("5rEg")),Y=(a("sRBo"),a("kaz8")),j=a("gWZ8"),q=a.n(j),z=a("uM7l"),H=a.n(z),O=(a("+BJd"),a("mr32")),K=a("BkRI"),A=a.n(K),G=a("eHn4"),V=a.n(G),B=a("qIgq"),Q=a.n(B),Z=(a("OaEy"),a("2fM7")),J=Z["a"].Option;function W(e){var t=e.value,a=e.onChange,n=Object(b["useState"])(!1),r=Q()(n,2),c=r[0],l=r[1],i=Object(b["useState"])([]),o=Q()(i,2),s=o[0],u=o[1];return Object(b["useEffect"])(function(){c||(l(!0),$api.specs.getSpecsList({no_page_flag:!0}).then(function(e){u(e.data.item||[])}))},[c]),C.a.createElement(Z["a"],{showSearch:!0,optionFilterProp:"children",mode:"multiple",value:t,onChange:function(e){return a(s,e)},placeholder:"\u8bf7\u9009\u62e9\u89c4\u683c",getPopupContainer:function(e){return e.parentElement}},s.map(function(e){return C.a.createElement(J,{value:e.attr_item_id,key:e.attr_item_id},e.name)}))}var $,X,ee,te=a("MkZP");function ae(e){return function(){var t,a=g()(e);if(ne()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function ne(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var re=L["a"].Search,ce=($=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),$((ee=function(e){m()(a,e);var t=ae(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.state={rebateConfig:null,searchVal:{}},e.searchChange=function(t,a){var n=e.state.searchVal;e.setState({searchVal:y()({},n,V()({},t,a))})},e.specsListChange=function(t,a){var n=t.filter(function(e){return a.includes(e.attr_item_id)}),r=e.props.selectSpecs,c=n.map(function(e){var t=r.find(function(t){return t.attr_item_id===e.attr_item_id});return t||e}),l=A()(c);e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:l}}),e.props.dispatch({type:"addProduct/getDataSource"})},e.getTags=function(t){var a=t.values,n=void 0===a?[]:a,r=t.value,c=void 0===r?[]:r,l=n.filter(function(e){return c.includes(e.attr_value_id)||!e.attr_value_id});return l.map(function(a){return C.a.createElement(O["a"],{color:"cyan",key:a.attr_item_value,onClose:function(n){n.preventDefault(),e.handleTagClose(t,a)},closable:!0,className:"specTag"},a.attr_item_value)})},e.handleTagClose=function(t,a){var n=H()(e.props.selectSpecs),r=n.find(function(e){return t.attr_item_id===e.attr_item_id}),c=r.values,l=void 0===c?[]:c,i=r.value,o=void 0===i?[]:i;a.attr_value_id?(r.value=o.filter(function(e){return e!==a.attr_value_id}),e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:n}})):(r.values=l.filter(function(e){return e.attr_item_value!==a.attr_item_value}),e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:n}})),e.props.dispatch({type:"addProduct/getDataSource"})},e.addSpecsValue=function(t,a){if(a){var n=H()(e.props.selectSpecs),r=n.find(function(e){return t.attr_item_id===e.attr_item_id}),c=r.values,l=void 0===c?[]:c,o=r.value,s=void 0===o?[]:o,u=l.filter(function(e){return s.includes(e.attr_value_id)||!e.attr_value_id})||[];console.log(u,a),u.find(function(e){return e.attr_item_value===a})?i["a"].warn("\u89c4\u683c\u503c\u4e0d\u80fd\u91cd\u590d"):(l.find(function(e){return e.attr_item_value===a})?(r.value=[].concat(q()(s),[l.find(function(e){return e.attr_item_value===a}).attr_value_id]),e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:n}})):(r.values=[].concat(q()(l),[{attr_item_value:a}]),e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:n}})),e.searchChange(t.attr_item_id,""),e.props.dispatch({type:"addProduct/getDataSource"}))}},e.checkboxChange=function(t,a){var n=H()(e.props.selectSpecs),r=n.find(function(e){return t.attr_item_id===e.attr_item_id});r.value=a,e.props.dispatch({type:"addProduct/updateState",payload:{selectSpecs:n}}),e.props.dispatch({type:"addProduct/getDataSource"})},e.AddCustomSpec=function(){var t=[].concat(q()(e.props.customSpecs),[{id:Object(D["b"])(),name:"",values:[]}]);e.props.dispatch({type:"addProduct/updateState",payload:{customSpecs:t}})},e.removeCustomSpec=function(t){var a=e.props.customSpecs.filter(function(e){return t.id!==e.id});e.props.dispatch({type:"addProduct/updateState",payload:{customSpecs:a}}),e.props.dispatch({type:"addProduct/getDataSource"})},e.handleSpecNameChange=function(t,a){var n=H()(e.props.customSpecs),r=n.find(function(e){return t.id===e.id});r.name=a,e.props.dispatch({type:"addProduct/updateState",payload:{customSpecs:n}})},e.addCustomSpecsValue=function(t,a,n){if(a){var r=H()(e.props.customSpecs),c=r.find(function(e){return t.id===e.id}),l=c.values,o=void 0===l?[]:l;o.find(function(e){return e.attr_item_value===a})?i["a"].warn("\u89c4\u683c\u503c\u4e0d\u80fd\u91cd\u590d"):(c.values=[].concat(q()(o),[{attr_item_value:a}]),e.props.dispatch({type:"addProduct/updateState",payload:{customSpecs:r}}),e.searchChange(t.id,""),e.props.dispatch({type:"addProduct/getDataSource"}))}},e.getCustomTags=function(t){var a=t.values,n=void 0===a?[]:a;return n.map(function(a){return C.a.createElement(O["a"],{color:"cyan",key:a.attr_item_value,onClose:function(n){n.preventDefault(),e.handCustomleTagClose(t,a)},closable:!0,className:"specTag"},a.attr_item_value)})},e.handCustomleTagClose=function(t,a){var n=H()(e.props.customSpecs),r=n.find(function(e){return t.id===e.id}),c=r.values,l=void 0===c?[]:c;r.values=l.filter(function(e){return e.attr_item_value!==a.attr_item_value}),e.props.dispatch({type:"addProduct/updateState",payload:{customSpecs:n}}),e.props.dispatch({type:"addProduct/getDataSource"})},e}return d()(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state.searchVal,a=this.props,r=a.selectSpecs,c=a.customSpecs;return C.a.createElement(b["Fragment"],null,C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u6a21\u677f\u89c4\u683c"},C.a.createElement(W,{onChange:this.specsListChange})))),r.map(function(a){return C.a.createElement(M["a"],{className:"specContainer",key:a.attr_item_id},C.a.createElement(N["a"],{span:2},C.a.createElement("span",{className:"fieldLabel"},a.name,"\uff1a")),C.a.createElement(N["a"],{span:22},e.getTags(a),C.a.createElement(re,{value:t[a.attr_item_id],onChange:function(t){return e.searchChange(a.attr_item_id,t.target.value)},style:{width:200},placeholder:"\u8bf7\u8f93\u5165\u89c4\u683c\u503c",enterButton:"\u6dfb\u52a0",onSearch:function(t){return e.addSpecsValue(a,t)}}),C.a.createElement("div",{className:"specCheckBoxArea"},C.a.createElement(Y["a"].Group,{value:a.value,onChange:function(t){return e.checkboxChange(a,t)},options:Object(te["b"])(a.values)}))))}),c.map(function(a){return C.a.createElement(M["a"],{className:"specContainer",key:a.id},C.a.createElement(N["a"],{span:2,className:"fieldLabel",style:{paddingRight:8}},C.a.createElement(L["a"],{placeholder:"\u89c4\u683c\u540d",value:a.name,onChange:function(t){e.handleSpecNameChange(a,t.target.value)}})),C.a.createElement(N["a"],{span:22},e.getCustomTags(a),C.a.createElement(re,{value:t[a.id],onChange:function(t){return e.searchChange(a.id,t.target.value)},style:{width:200},placeholder:"\u8bf7\u8f93\u5165\u89c4\u683c\u503c",enterButton:"\u6dfb\u52a0",onSearch:function(t){return e.addCustomSpecsValue(a,t)}}),C.a.createElement("a",{onClick:function(){return e.removeCustomSpec(a)},style:{marginLeft:12}},"\u79fb\u9664\u6b64\u89c4\u683c")))}),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{offset:2,className:"addSpecBtn"},C.a.createElement("a",{onClick:this.AddCustomSpec},"+ \u6dfb\u52a0\u89c4\u683c"))))}}]),a}(b["PureComponent"]),X=ee))||X),le=ce,ie=(a("g9YV"),a("wCAj")),oe=(a("Q9mQ"),a("diRs")),se=(a("DZo9"),a("8z0m")),ue=a("d6i3"),de=a.n(ue),pe=a("1l/V"),me=a.n(pe),fe=a("Ck6f"),he=a.n(fe),_e=a("vDqi"),ge=a.n(_e);function ve(e){return function(){var t,a=g()(e);if(ye()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function ye(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Ee,be,Ce,Se=ge.a.create(),ke=function(e){m()(a,e);var t=ve(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.upload=function(){var t=me()(de.a.mark(function t(a){var n,r,c,l,o;return de.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$api.common.getQiniuToken({},{cache:!0,cacheTimeout:+new Date+36e5});case 2:n=t.sent,r=n.data,c=new FormData,c.append("token",r),c.append("file",a.file),l=a.file.name,o=l.slice(l.lastIndexOf(".")),c.append("key","".concat(a.file.uid).concat(o)),Se.post(he.a.qiniu_target,c).then(function(t){e.props.uploadSuccess("".concat(he.a.qiniu_img_url,"/").concat(t.data.key))}).catch(function(e){console.log(e,"\u4e0a\u4f20\u5931\u8d25"),i["a"].error("\u7cfb\u7edf\u5f02\u5e38")});case 11:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),e.beforeUpload=function(e,t){var a=e.size/1024/1024<t;return a||i["a"].error("\u56fe\u7247\u987b\u5c0f\u4e8e".concat(t,"M")),new Promise(function(t,n){a?t(e):n(e)})},e}return d()(a,[{key:"render",value:function(){var e=this,t=this.props.size,a=void 0===t?1:t;return C.a.createElement(se["a"],{accept:"image/*",customRequest:this.upload,beforeUpload:function(t){return e.beforeUpload(t,a)},showUploadList:!1},this.props.children)}}]),a}(b["PureComponent"]),we=function(e){var t=this,a=function(e){var a=[{title:"\u4ef7\u683c(\u5143)",children:[{title:"\u9500\u552e\u4ef7",dataIndex:"shop_price",width:100,render:function(e,a,n){return C.a.createElement(U["a"],{min:0,style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange("shop_price",a,e)}})}},{title:"\u6210\u672c\u4ef7",dataIndex:"cost_price",width:100,render:function(e,a,n){return C.a.createElement(U["a"],{min:0,style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange("cost_price",a,e)}})}}]}];return null===e?a:(0!==e.sell_prices.length&&a.push({title:"\u7ecf\u9500\u4ef7(\u5143)",children:e.sell_prices.map(function(e){var a=e.id,n=e.name,r="sell_prices_".concat(a);return{title:n,dataIndex:r,width:100,render:function(e,a,n){return C.a.createElement(L["a"],{style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange(r,a,e.target.value)}})}}})}),0!==e.agencies.length&&a.push({title:"\u4ee3\u7406\u4f63\u91d1(\u5143)",children:e.agencies.map(function(e){var a=e.id,n=e.name,r="agency_commissions_".concat(a);return{title:n,dataIndex:r,width:110,render:function(e,a,n){return C.a.createElement(L["a"],{style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange(r,a,e.target.value)}})}}})}),0!==e.distributions.length&&a.push({title:"\u5206\u9500\u4f63\u91d1(\u5143)",children:e.distributions.map(function(e){var a=e.id,n=e.name,r="distribution_commissions_".concat(a);return{title:n,dataIndex:r,width:110,render:function(e,a,n){return C.a.createElement(L["a"],{style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange(r,a,e.target.value)}})}}})}),e.teams&&a.push({title:"\u56e2\u961f\u5206\u7ea2(\u5143)",dataIndex:"team_commission",width:128,render:function(e,a,n){return C.a.createElement(L["a"],{style:{width:"100%"},value:e,onChange:function(e){t.handleTableFieldChange("team_commission",a,e.target.value)}})}}),a)},n=[{title:"\u89c4\u683c",dataIndex:"specs_name",width:200,fixed:"left"},{title:"\u5e93\u5b58",dataIndex:"stock",width:148,fixed:"left",render:function(e,a,n){return C.a.createElement(U["a"],{min:0,style:{width:"100%"},value:e,onChange:function(e){return t.handleTableFieldChange("stock",a,e)}})}},{title:"SKU\u7f16\u7801",dataIndex:"sku_code",width:148,fixed:"left",render:function(e,a,n){return C.a.createElement(L["a"],{disabled:-1!==a.sku_id,style:{width:"100%"},value:e,onChange:function(e){return t.handleTableFieldChange("sku_code",a,e.target.value)}})}},{title:"SKU\u56fe\u7247",dataIndex:"sku_img",width:88,fixed:"left",render:function(e){return e?C.a.createElement("img",{src:e,style:{marginLeft:5,width:40,height:40,borderRadius:3,cursor:"pointer"},onClick:function(){Object(T["A"])({imgUrl:e})}}):null}}],r=[{title:"\u64cd\u4f5c",dataIndex:"operation",width:90,fixed:"left",render:function(e,a,n){return C.a.createElement("div",null,C.a.createElement(ke,{uploadSuccess:function(e){return t.handleTableFieldChange("sku_img",a,e)}},C.a.createElement("a",null,a.sku_img?"\u91cd\u4f20\u56fe\u7247":"\u4e0a\u4f20\u56fe\u7247")),C.a.createElement("a",{onClick:function(){return t.handleCountRebate(a)},style:{display:"block"}},"\u8fd4\u5229\u8ba1\u7b97"),C.a.createElement("a",{onClick:function(){return t.handleClearTableRow(a)},style:{display:"block"}},"\u6e05\u9664\u6570\u636e"))}}],c=a(e);return[].concat(n,r,q()(c))},Pe=function(e){var t=we(e),a=0;return t.forEach(function(e){e.children?e.children.forEach(function(e){a+=e.width}):a+=e.width}),a},Re=a("zIxR"),De=a.n(Re);function Te(e){return function(){var t,a=g()(e);if(Ie()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function Ie(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var xe,Fe,Ue,Me=(Ee=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),Ee((Ce=function(e){m()(a,e);var t=Te(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.state={rebateConfig:null,multiUseChecked:[],multiUse:{}},e.handleMultiUseChange=function(t,a){var n=e.state.multiUse;e.setState({multiUse:y()({},n,V()({},a,t))})},e.handleAllCheckUseTo=function(){var t=e.props.dataSource,a=e.state.multiUseChecked;if(a.length>=t.length)e.setState({multiUseChecked:[]});else{var n=t.map(function(e){return e.specs_name});e.setState({multiUseChecked:n})}},e.handleMultiUseTo=function(){var t=e.state.multiUseChecked,a=e.state.multiUse,n={};for(var r in a)a[r]&&(n[r]=a[r]);var c=e.props.dataSource,l=c.map(function(e){return t.includes(e.specs_name)?y()({},e,n):e});e.props.dispatch({type:"addProduct/updateState",payload:{dataSource:l}})},e.handleTableFieldChange=function(t,a,n){var r=H()(e.props.dataSource),c=r.find(function(e){return e.specs_name===a.specs_name});c[t]=n,e.props.dispatch({type:"addProduct/updateState",payload:{dataSource:r}})},e.handleClearTableRow=function(t){var a=H()(e.props.dataSource),n=a.find(function(e){return e.specs_name===t.specs_name});for(var r in n)["specs_name","specs_key","sku_img","sku_id"].includes(r)||(n[r]="");e.props.dispatch({type:"addProduct/updateState",payload:{dataSource:a}})},e.handleCountRebate=function(t){var a=e.state.rebateConfig;if(a){var n=Number(t.shop_price||"");if(n){var r=a.agencies,c=a.distributions,l=a.teams,o=H()(e.props.dataSource),s=o.find(function(e){return e.specs_name===t.specs_name});r&&r.length&&r.forEach(function(e){var t=e.id,a=e.money;s["agency_commissions_".concat(t)]=(a/100*n).toFixed(2)}),c&&c.length&&c.forEach(function(e){var t=e.id,a=e.money;s["distribution_commissions_".concat(t)]=(a/100*n).toFixed(2)}),l&&(s["team_commission"]=l.money),e.props.dispatch({type:"addProduct/updateState",payload:{dataSource:o}})}else i["a"].info("\u8bf7\u586b\u5199\u5546\u54c1\u9500\u552e\u4ef7\uff01")}},e.renderMuitiDynamicField=function(){var t=e.state.rebateConfig;if(null===t)return null;var a=t.sell_prices,n=t.agencies,r=t.distributions,c=t.teams;return C.a.createElement(b["Fragment"],null,a&&a.map(function(t){return C.a.createElement(L["a"],{key:t.id,placeholder:t.name,onChange:function(a){e.handleMultiUseChange(a.target.value,"sell_prices_".concat(t.id))},className:"multiEditField"})}),n&&n.map(function(t){return C.a.createElement(L["a"],{key:t.id,placeholder:t.name,onChange:function(a){e.handleMultiUseChange(a.target.value,"agency_commissions_".concat(t.id))},className:"multiEditField"})}),r&&r.map(function(t){return C.a.createElement(L["a"],{key:t.id,placeholder:t.name,onChange:function(a){e.handleMultiUseChange(a.target.value,"distribution_commissions_".concat(t.id))},className:"multiEditField"})}),c&&C.a.createElement(L["a"],{placeholder:"\u56fa\u5b9a\u5206\u7ea2",onChange:function(t){e.handleMultiUseChange(t.target.value,"team_commission")},className:"multiEditField"}))},e.renderMultiUseTo=function(){var t=e.state.multiUseChecked,a=e.props.dataSource,n=C.a.createElement("div",{className:De.a.multiUseWrapper},C.a.createElement(Y["a"].Group,{value:t,className:De.a.multiUseGroup,onChange:function(t){e.setState({multiUseChecked:t})}},a.map(function(e){var t=e.specs_name;return C.a.createElement(M["a"],{key:t},C.a.createElement(N["a"],{span:24},C.a.createElement(Y["a"],{value:t},t)))})),C.a.createElement(l["a"],{onClick:e.handleAllCheckUseTo,className:"mt4",size:"small"},"\u5168\u9009"),C.a.createElement(l["a"],{onClick:e.handleMultiUseTo,className:"mt4",size:"small",type:"primary"},"\u786e\u5b9a"));return C.a.createElement(oe["a"],{content:n,title:"\u6279\u91cf\u586b\u5199\u4e8e",trigger:"hover",placement:"left",getPopupContainer:function(e){return e.parentElement}},C.a.createElement(l["a"],{className:"btnGhostPrimary"},"\u5e94\u7528"))},e}return d()(a,[{key:"componentDidMount",value:function(){var e=this;$api.product.productRebateConfig().then(function(t){e.setState({rebateConfig:t.data});var a={stock:0,shop_price:"",cost_price:"",sku_code:"",sku_img:""},n=t.data,r=n.sell_prices,c=n.agencies,l=n.distributions,i=n.teams;r&&r.length&&r.forEach(function(e){a["sell_prices_".concat(e.id)]=""}),c&&c.length&&c.forEach(function(e){a["agency_commissions_".concat(e.id)]=""}),l&&l.length&&l.forEach(function(e){a["distribution_commissions_".concat(e.id)]=""}),i&&(a["team_commission"]=""),e.props.dispatch({type:"addProduct/updateState",payload:{tempTableObj:a}})})}},{key:"render",value:function(){var e=this,t=this.state.rebateConfig,a=this.props.dataSource;return C.a.createElement(b["Fragment"],null,C.a.createElement(M["a"],{className:"multiEditArea"},C.a.createElement(N["a"],{span:2,className:"fieldLabel"},"\u6279\u91cf\u586b\u5199\uff1a"),C.a.createElement(N["a"],{span:20},C.a.createElement(L["a"],{placeholder:"\u5e93\u5b58",onChange:function(t){e.handleMultiUseChange(t.target.value,"stock")},className:"multiEditField"}),C.a.createElement(L["a"],{placeholder:"\u9500\u552e\u4ef7",onChange:function(t){e.handleMultiUseChange(t.target.value,"shop_price")},className:"multiEditField"}),C.a.createElement(L["a"],{placeholder:"\u6210\u672c\u4ef7",onChange:function(t){e.handleMultiUseChange(t.target.value,"cost_price")},className:"multiEditField"}),this.renderMuitiDynamicField()),C.a.createElement(N["a"],{span:2,className:"taRight"},this.renderMultiUseTo())),C.a.createElement(ie["a"],{rowKey:function(e,t){return t},scroll:{x:Pe(t)},columns:we.call(this,t),bordered:!0,dataSource:a,pagination:!1}))}}]),a}(b["PureComponent"]),be=Ce))||be),Ne=Me;function Le(e){return function(){var t,a=g()(e);if(Ye()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function Ye(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var je,qe,ze,He=L["a"].TextArea,Oe=(xe=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),xe((Ue=function(e){m()(a,e);var t=Le(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.state={},e.upperShelf=function(t){var a=t.target.value,n=e.props.dispatch;n({type:"addProduct/updateState",payload:{isPreUpperShelf:2===a}})},e.lowerShelf=function(t){var a=t.target.value,n=e.props.dispatch;n({type:"addProduct/updateState",payload:{isPreLowerShelf:2===a}})},e}return d()(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.isPreUpperShelf,a=e.isPreLowerShelf,r=e.isEdit;return C.a.createElement(b["Fragment"],null,C.a.createElement(F["a"],{title:"\u57fa\u672c\u4fe1\u606f",size:"small"},C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5546\u54c1\u540d\u79f0",name:["base_data","title"],rules:[{required:!0,message:"\u8bf7\u586b\u5199\u5546\u54c1\u540d\u79f0"}]},C.a.createElement(He,{placeholder:"\u8bf7\u586b\u5199\u5546\u54c1\u540d\u79f0(\u9650100\u5b57)",autoSize:{minRows:2,maxRows:2},maxLength:100}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u526f\u6807\u9898",name:["base_data","sub_title"]},C.a.createElement(He,{placeholder:"\u8bf7\u586b\u5199\u526f\u6807\u9898(\u9650300\u5b57)",autoSize:{minRows:2,maxRows:2},maxLength:300}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5546\u54c1\u7f16\u7801",name:["base_data","goods_code"]},C.a.createElement(L["a"],{placeholder:"\u8bf7\u8f93\u5165\u5546\u54c1\u7f16\u7801(\u672a\u586b\u5199\u5219\u7cfb\u7edf\u751f\u6210)",disabled:r})))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u8fd0\u8d39\u6a21\u677f",name:["base_data","freight_template_id"],rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8fd0\u8d39\u6a21\u677f"}]},C.a.createElement(T["h"],{type:"freightTemplate"}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u8fd0\u8d39\u9669",name:["base_data","freight_insurance_id"],rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u8fd0\u8d39\u9669"}]},C.a.createElement(T["h"],{type:"freightInsurance"}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u91cd\u91cf(kg)",name:["base_data","weight"]},C.a.createElement(U["a"],{placeholder:"\u8bf7\u586b\u5199\u5546\u54c1\u91cd\u91cf",min:0})))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5546\u54c1\u7c7b\u76ee",name:["base_data","goods_category_ids"],rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5546\u54c1\u7c7b\u76ee"}]},C.a.createElement(T["c"],null))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u4f9b\u5e94\u5546",name:["base_data","supplier_id"],rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u4f9b\u5e94\u5546"}]},C.a.createElement(T["h"],{type:"supplier"}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5546\u54c1\u54c1\u724c",name:["base_data","goods_brand_id"]},C.a.createElement(T["h"],{type:"brand",selectPorps:{allowClear:!0}}))))),C.a.createElement(F["a"],{title:"\u89c4\u683c\u53ca\u4ef7\u683c",size:"small"},C.a.createElement(le,null),C.a.createElement(Ne,null),C.a.createElement(M["a"],{style:{marginTop:12}},C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5e02\u573a\u4ef7",name:"market_price",rules:[{required:!0,message:"\u8bf7\u586b\u5199\u5e02\u573a\u4ef7"}]},C.a.createElement(U["a"],{min:0,placeholder:"\u8bf7\u586b\u5199\u5e02\u573a\u4ef7",precision:0}))),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5e93\u5b58\u9608\u503c",name:"warning_value"},C.a.createElement(U["a"],{min:0,placeholder:"\u8bf7\u586b\u5199\u5e93\u5b58\u8b66\u793a\u9608\u503c",precision:0}))))),C.a.createElement(F["a"],{title:"\u4e0a\u4e0b\u67b6\u8bbe\u7f6e",size:"small"},C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:12},C.a.createElement(n["a"].Item,{name:["pre_start_end_set","start_type"],label:"\u4e0a\u67b6\u8bbe\u7f6e",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9884\u4e0a\u67b6\u8bbe\u7f6e"}]},C.a.createElement(x["a"].Group,{onChange:this.upperShelf},C.a.createElement(x["a"],{value:1},"\u7acb\u5373\u4e0a\u67b6"),C.a.createElement(x["a"],{value:2},"\u9884\u4e0a\u67b6"),C.a.createElement(x["a"],{value:3},"\u6682\u4e0d\u4e0a\u67b6")))),C.a.createElement(N["a"],{span:12},t&&C.a.createElement(n["a"].Item,{name:["pre_start_end_set","pre_start_at"],label:"\u9884\u4e0a\u67b6\u65f6\u95f4",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9884\u4e0a\u67b6\u65f6\u95f4"}]},C.a.createElement(I["a"],{showTime:!0,placeholder:"\u8bf7\u9009\u62e9\u9884\u4e0a\u67b6\u65f6\u95f4",getPopupContainer:function(e){return e.parentElement}})))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:12},C.a.createElement(n["a"].Item,{name:["pre_start_end_set","end_type"],label:"\u4e0b\u67b6\u8bbe\u7f6e",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9884\u4e0b\u67b6\u8bbe\u7f6e"}]},C.a.createElement(x["a"].Group,{onChange:this.lowerShelf},C.a.createElement(x["a"],{value:1},"\u552e\u5b8c\u4e0b\u67b6"),C.a.createElement(x["a"],{value:2},"\u9884\u4e0b\u67b6"),C.a.createElement(x["a"],{value:3},"\u6c38\u4e0d\u4e0b\u67b6")))),C.a.createElement(N["a"],{span:12},a&&C.a.createElement(n["a"].Item,{name:["pre_start_end_set","pre_end_at"],label:"\u9884\u4e0b\u67b6\u65f6\u95f4",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9884\u4e0b\u67b6\u65f6\u95f4"}]},C.a.createElement(I["a"],{showTime:!0,placeholder:"\u8bf7\u9009\u62e9\u9884\u4e0b\u67b6\u65f6\u95f4",getPopupContainer:function(e){return e.parentElement}}))))))}}]),a}(b["PureComponent"]),Fe=Ue))||Fe),Ke=Oe;function Ae(e){return function(){var t,a=g()(e);if(Ge()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function Ge(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Ve,Be,Qe,Ze=(je=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),je((ze=function(e){m()(a,e);var t=Ae(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.state={},e.imgChange=function(t){e.props.dispatch({type:"addProduct/updateState",payload:{imgs:t}})},e.handleChangeEditor=function(t){e.props.dispatch({type:"addProduct/updateState",payload:{editorState:t}})},e}return d()(a,[{key:"render",value:function(){var e=this.props,t=e.imgs,a=e.editorState,r=5===t.length?576:112*t.length+112+16;return C.a.createElement(b["Fragment"],null,C.a.createElement(F["a"],{title:"\u5546\u54c1\u4e3b\u56fe",size:"small"},C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:2},C.a.createElement(n["a"].Item,{className:"required",labelCol:{span:20},label:"\u5546\u54c1\u56fe\u7247"})),C.a.createElement(N["a"],{style:{width:r}},C.a.createElement(T["G"],{pic:t,fileTotalCount:5,picSize:1,dataChange:this.imgChange})),C.a.createElement(N["a"],{style:{paddingTop:10}},C.a.createElement("p",{className:"uploadInfo"},"1. \u5efa\u8bae\u5c3a\u5bf8\uff1a800 x 800 px"),C.a.createElement("p",{className:"uploadInfo"},"2. \u5927\u5c0f\uff1a100k \u4ee5\u5185"),C.a.createElement("p",{className:"uploadInfo"},"3. \u6570\u91cf\uff1a\u9650\u5236\u5728 5 \u5f20\u4ee5\u5185"))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:2},C.a.createElement(n["a"].Item,{labelCol:{span:20},label:"\u5546\u54c1\u89c6\u9891"})),C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{name:["goods_desc_data","video"]},C.a.createElement(T["H"],{fileTotalCount:1}))))),C.a.createElement(F["a"],{title:"\u56fe\u6587\u4ecb\u7ecd",size:"small"},C.a.createElement(M["a"],null,C.a.createElement(N["a"],{style:{width:375}},C.a.createElement("div",{className:"pageContentContainer"},C.a.createElement("div",{className:"pageTitle"},C.a.createElement("span",null,"\u5546\u54c1\u8be6\u60c5\u9884\u89c8")),C.a.createElement("div",{className:"editorPreview",dangerouslySetInnerHTML:{__html:a?a.toHTML():""}}))),C.a.createElement(N["a"],{flex:"1 0 0"},C.a.createElement("div",{className:"editorContainer"},C.a.createElement(n["a"].Item,{wrapperCol:{span:24}},C.a.createElement(T["k"],{editorState:a,onChange:this.handleChangeEditor})))))))}}]),a}(b["PureComponent"]),qe=ze))||qe),Je=Ze,We=(a("5Dmo"),a("3S7+")),$e=a("+YFz");function Xe(e){return function(){var t,a=g()(e);if(et()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function et(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var tt,at,nt,rt=(Ve=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),Ve((Qe=function(e){m()(a,e);var t=Xe(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.state={},e.handleGroupChange=function(t){var a=e.props.dispatch;a({type:"addProduct/updateState",payload:{isJoinGroup:1===t}})},e}return d()(a,[{key:"render",value:function(){var e=this.props.isJoinGroup;return C.a.createElement(b["Fragment"],null,C.a.createElement(F["a"],{title:"\u9500\u552e\u4fe1\u606f",size:"small"},C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:C.a.createElement(We["a"],{title:"\u8bbe\u7f6e\u540e\uff0c\u60a8\u7684\u7528\u6237\u770b\u5230\u7684\u9500\u91cf=\u521d\u59cb\u9500\u91cf+\u5b9e\u9645\u9500\u91cf",placement:"topLeft"},"\u521d\u59cb\u9500\u91cf",C.a.createElement($e["a"],null)),name:["pre_start_end_set","initial_sales_num"]},C.a.createElement(U["a"],{min:0,precision:0,placeholder:"\u8bf7\u586b\u5199\u521d\u59cb\u9500\u91cf"})))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:8},C.a.createElement(n["a"].Item,{label:"\u5546\u54c1\u6807\u7b7e",name:["pre_start_end_set","label_ids"]},C.a.createElement(T["f"],{placeholder:"\u8bf7\u9009\u62e9\u6807\u7b7e\uff08\u6700\u591a\u4e09\u4e2a\uff09"})))),C.a.createElement(M["a"],null,C.a.createElement(N["a"],{span:3},C.a.createElement(n["a"].Item,{labelCol:{span:16},wrapperCol:{span:8},label:"\u662f\u5426\u53c2\u56e2",name:["pre_start_end_set","seckill_flag"]},C.a.createElement(T["m"],{onChange:this.handleGroupChange}))),C.a.createElement(N["a"],{span:8},e&&C.a.createElement(n["a"].Item,{colon:!1,labelCol:{span:1},wrapperCol:{span:23},label:" ",name:["pre_start_end_set","seckill_time"]},C.a.createElement(I["a"].RangePicker,{showTime:{format:"HH"},format:"YYYY-MM-DD HH:00",placeholder:["\u56e2\u8d2d\u5f00\u59cb\u65f6\u95f4","\u56e2\u8d2d\u7ed3\u675f\u65f6\u95f4"],getPopupContainer:function(e){return e.parentElement}}))))))}}]),a}(b["PureComponent"]),Be=Qe))||Be),ct=rt;function lt(e){return function(){var t,a=g()(e);if(it()){var n=g()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return h()(this,t)}}function it(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var ot=E["a"].TabPane,st={labelCol:{span:6},wrapperCol:{span:18}},ut=(tt=Object(S["connect"])(function(e){var t=e.addProduct;return y()({},t)}),tt((nt=function(e){m()(a,e);var t=lt(a);function a(){var e;s()(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=t.call.apply(t,[this].concat(r)),e.formRef=C.a.createRef(),e.state={tabsKey:"1",loading:!1},e.onKeyPressDo=function(e){"Enter"===e.code&&e.preventDefault()},e.tabChange=function(t){e.setState({tabsKey:t})},e.onFinish=function(t){var a=e.props,n=a.dataSource,r=a.selectSpecs,c=a.customSpecs,l=a.imgs,o=a.editorState;if(!n.length)return i["a"].warn("\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u89c4\u683c"),void e.setState({tabsKey:"1"});var s=Object(te["a"])(r,c);if(!s)return i["a"].warn("\u8bf7\u5c06\u586b\u5199\u89c4\u683c\u540d\u79f0"),void e.setState({tabsKey:"1"});if(!l||!l.length)return i["a"].warn("\u8bf7\u81f3\u5c11\u4e0a\u4f20\u4e00\u5f20\u5546\u54c1\u56fe\u7247"),void e.setState({tabsKey:"2"});var u=t.base_data,d=t.goods_desc_data,p=t.pre_start_end_set;if(u.goods_category_ids=u.goods_category_ids?u.goods_category_ids.join(","):"",d.main_img=l[0],d.sub_imgs=l.slice(1),d.desc=o?o.toHTML():"",d.video=d.video&&d.video.length?d.video[0]:"",p.seckill_begin_time="",p.seckill_end_time="",1===p.seckill_flag){if(!p.seckill_time)return void i["a"].warn("\u8bf7\u586b\u5199\u56e2\u8d2d\u65f6\u95f4");p.seckill_begin_time=w()(p.seckill_time[0]).format("YYYY-MM-DD HH:00"),p.seckill_end_time=w()(p.seckill_time[1]).format("YYYY-MM-DD HH:00")}if(delete p.seckill_time,2===p.start_type){var m=p.pre_start_at;p.pre_start_at=m?m.format("YYYY-MM-DD HH:mm:ss"):""}else p.pre_start_at="";if(2===p.end_type){var f=p.pre_end_at;p.pre_end_at=f?f.format("YYYY-MM-DD HH:mm:ss"):""}else p.pre_end_at="";p.label_ids=p.label_ids?p.label_ids.join(","):"";var h=y()({},t,{attr_group:s.map(function(e){return delete e.id,e}),sku_group:n});console.log(h);var _=e.props.history.location.query;_.id&&!_.copy?$api.product.editProduct(y()({},h,{goods_id:_.id}),{success:!0,loadingFn:e.toggleLoading}).then(function(){setTimeout(function(){e.props.history.push("/product/productList")},1500)}):$api.product.addProduct(h,{success:!0,loadingFn:e.toggleLoading}).then(function(){setTimeout(function(){e.props.history.push("/product/productList")},1500)})},e.onFinishFailed=function(t){var a=t.values,n=t.errorFields;i["a"].warn("\u8bf7\u5c06\u5fc5\u586b\u4fe1\u606f\u586b\u5199\u5b8c\u6574"),e.setState({tabsKey:"1"}),console.log(a,n)},e.toggleLoading=function(t){e.setState({loading:t})},e}return d()(a,[{key:"componentDidMount",value:function(){this.init(),document.addEventListener("keypress",this.onKeyPressDo)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keypress",this.onKeyPressDo)}},{key:"init",value:function(){var e=this;console.log(this.props);var t=this.props.history.location.query;t.id&&$api.product.productDetail({goods_id:t.id}).then(function(t){var a=t.data,n=a.base_data,r=a.market_price,c=a.warning_value,l=a.goods_desc_data,i=a.pre_start_end_set,o=a.attr_group,s=a.sku_group,u=n.title,d=n.sub_title,p=n.goods_brand_id,m=n.goods_category_ids,f=n.freight_template_id,h=n.freight_insurance_id,_=n.weight,g=n.goods_code,v=n.supplier_id,E=l.desc,b=l.main_img,C=l.sub_imgs,S=l.video,k=i.start_type,P=i.pre_start_at,T=i.end_type,I=i.pre_end_at,x=i.label_ids,F=i.seckill_flag,U=i.seckill_begin_time,M=i.seckill_end_time,N=i.initial_sales_num;e.formRef.current.setFieldsValue({market_price:r,warning_value:c,base_data:{title:u,sub_title:d,goods_brand_id:p||void 0,supplier_id:v,goods_category_ids:m?m.split(",").map(function(e){return+e}):[],freight_template_id:f,freight_insurance_id:h,weight:_,goods_code:g},goods_desc_data:{video:S?[S]:[]},pre_start_end_set:{start_type:k,end_type:T,pre_start_at:P?w()(P):void 0,pre_end_at:I?w()(I):void 0,label_ids:x?x.split(",").map(function(e){return+e}):[],initial_sales_num:N,seckill_flag:F,seckill_time:U&&M?[w()(U),w()(M)]:void 0}});var L=[];b&&L.push(b),e.props.dispatch({type:"addProduct/updateState",payload:{editorState:E?R.a.createEditorState(E):null,imgs:C&&L.concat(C),customSpecs:o.map(function(e){return y()({},e,{id:Object(D["b"])()})}),dataSource:s,isPreUpperShelf:2===k,isPreLowerShelf:2===T,isJoinGroup:1===F}}),console.log(a)})}},{key:"render",value:function(){var e=this.state.tabsKey;return console.log(e),C.a.createElement(T["x"],{inner:!0,className:De.a.addProduct},C.a.createElement(n["a"],c()({ref:this.formRef},st,{initialValues:{pre_start_end_set:{start_type:3,end_type:1,seckill_flag:0}},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed}),C.a.createElement(E["a"],{activeKey:e,onChange:this.tabChange,tabBarExtraContent:C.a.createElement(l["a"],{type:"primary",htmlType:"submit",loading:this.state.loading},"\u63d0\u4ea4"),className:"tabs",tabBarGutter:48},C.a.createElement(ot,{tab:"\u57fa\u672c\u4fe1\u606f",key:"1",forceRender:!0},C.a.createElement(Ke,null)),C.a.createElement(ot,{tab:"\u5546\u54c1\u4ecb\u7ecd",key:"2",forceRender:!0},C.a.createElement(Je,{form:this.formRef})),C.a.createElement(ot,{tab:"\u9644\u52a0\u4fe1\u606f",key:"3",forceRender:!0},C.a.createElement(ct,{form:this.formRef})))))}}]),a}(b["PureComponent"]),at=nt))||at);t["default"]=ut},zIxR:function(e,t,a){e.exports={addProduct:"addProduct___1aQqP",multiUseWrapper:"multiUseWrapper___1_wBp",multiUseGroup:"multiUseGroup___5o0ie"}}}]);