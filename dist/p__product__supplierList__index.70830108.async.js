(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[74],{T5JX:function(t,e,i){t.exports={content_height:"content_height___j_CR1",content_box:"content_box___w18gN",content_imgList:"content_imgList___bJuh5",details_box:"details_box___2H8FC"}},bodq:function(t,e,i){"use strict";i.r(e);var s=i("p0pE"),a=i.n(s),n=(i("2qtc"),i("kLXV")),r=i("2Taf"),p=i.n(r),u=i("vZ4D"),l=i.n(u),c=i("MhPg"),o=i.n(c),d=i("l4Ni"),h=i.n(d),f=i("ujKo"),m=i.n(f),y=i("MuoO"),g=i("q1tI"),b=i.n(g),v=i("Kvkj"),S=i("KLZ9"),k=(i("bbsP"),i("/wGt")),L=(i("/zsF"),i("PArb")),_=(i("bP8k"),i("gFTJ")),D=i("T5JX"),E=i.n(D);function w(t){return function(){var e,i=m()(t);if(B()){var s=m()(this).constructor;e=Reflect.construct(i,arguments,s)}else e=i.apply(this,arguments);return h()(this,e)}}function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}var C,x,R,F=function(t){o()(i,t);var e=w(i);function i(t){var s;return p()(this,i),s=e.call(this,t),s.onClose=function(){s.props.close(!1)},s.state={dataSource:{}},s}return l()(i,[{key:"UNSAFE_componentWillReceiveProps",value:function(t){t.dataSource&&this.props.dataSource!==t.dataSource&&this.setState({dataSource:t.dataSource})}},{key:"render",value:function(){var t=this.props,e=t.visible,i=t.detailsFields,s=this.state.dataSource;return b.a.createElement(k["a"],{title:"\u8be6\u60c5",placement:"right",onClose:this.onClose,visible:e,width:800},b.a.createElement("div",{className:E.a.details_box},i&&i.map(function(t){return b.a.createElement("div",{key:t.key},b.a.createElement(_["a"],{title:t.title,column:2},t.content.map(function(t){return b.a.createElement(_["a"].Item,{label:t.titleName,key:t.key},t.type?b.a.createElement("div",null,s[t.dataField]&&s[t.dataField].map(function(t,e){return b.a.createElement("img",{key:e,src:t,onClick:function(){Object(v["A"])({imgUrl:t})},alt:"",className:E.a.content_imgList})})):b.a.createElement("span",{dangerouslySetInnerHTML:{__html:s[t.dataField]}}))})),b.a.createElement(L["a"],null))})))}}]),i}(g["PureComponent"]),$=i("dmXs");function P(t){return function(){var e,i=m()(t);if(T()){var s=m()(this).constructor;e=Reflect.construct(i,arguments,s)}else e=i.apply(this,arguments);return h()(this,e)}}function T(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}var j=(C=Object(y["connect"])(function(t){var e=t.user,i=t.supplierList,s=t.loading;return{user:e,loading:s,supplierList:i}}),C((R=function(t){o()(i,t);var e=P(i);function i(t){var s;return p()(this,i),s=e.call(this,t),s.tableMoreClick=function(t,e){var i=e.id;switch(t){case"del":s.supplierDel(i);break;case"up":s.supplierStatusSingle(i,1);break;case"disable":s.supplierStatusSingle(i,2);break}},s.goDetail=function(t,e){s.setState({detailVisible:t,detailsData:e})},s.supplierEdit=function(t){s.props.history.push({pathname:"/product/supplierEdit/".concat(t)})},s.mutipulClick=function(t,e){var i=e.join(",");switch(t){case"del":s.supplierDelBatch(i);break;case"up":s.supplierStatusBatch(i,1);break;case"disable":s.supplierStatusBatch(i,2);break}},s.supplierDel=function(t){n["a"].confirm({title:"\u786e\u8ba4\u5220\u9664\u6240\u9009\u4f9b\u5e94\u5546?",cancelText:"\u53d6\u6d88",okText:"\u786e\u8ba4",onOk:function(){$api.supplier.supplierDel({id:t},{success:!0}).then(function(t){s.props.dispatch({type:"supplierList/getList"})})}})},s.supplierDelBatch=function(t){n["a"].confirm({title:"\u786e\u8ba4\u6279\u91cf\u5220\u9664\u6240\u9009\u7528\u6237\u4e48?",onOk:function(){$api.supplier.supplierDelBatch({ids:t},{success:!0}).then(function(t){s.props.dispatch({type:"supplierList/getList"})})}})},s.getList=function(t){var e=t.page,i=t.pageSize,a=s.props.dispatch;a({type:"supplierList/getList",payload:{page:e,pageSize:i}})},s.onSearch=function(t){var e=s.props.dispatch;e({type:"supplierList/onSearch",payload:t}),e({type:"supplierList/getList",payload:t})},s.state={showBrandsDetails:!1,brandsData:{},showBrandsEdit:!1,editBrandsData:{},operationType:"",detailVisible:!1,detailsData:{}},s}return l()(i,[{key:"supplierStatusSingle",value:function(t,e){var i=this;$api.supplier.supplierStatus({id:t,status:e},{success:!0}).then(function(t){i.props.dispatch({type:"supplierList/getList"})})}},{key:"supplierStatusBatch",value:function(t,e){var i=this;$api.supplier.supplierStatusBatch({ids:t,status:e},{success:!0}).then(function(t){i.props.dispatch({type:"supplierList/getList"})})}},{key:"render",value:function(){var t=this.state,e=t.detailVisible,i=t.detailsData,s=this.goDetail,n=(this.supplierEdit,this.mutipulClick),r=this.getList,p=this.onSearch,u=this.props,l=u.supplierList,c=u.loading,o=l.list,d=l.pagination,h=l.query,f=l.pagination,m=f.current,y=f.pageSize,g=[];$api.supplier.supplierAdd.permission()&&g.push({icon:"plus",type:"primary",name:"\u65b0\u589e\u4f9b\u5e94\u5546",handleClick:this.supplierEdit.bind(this,0)}),$api.supplier.supplierDownload.permission()&&g.push({type:"export",url:$api.supplier.supplierDownload.url,query:a()({page:m,pageSize:y},h)});var k=[{name:"\u542f\u7528",key:"up",permission:$api.supplier.supplierStatusBatch.permission()},{name:"\u7981\u7528",key:"disable",permission:$api.supplier.supplierStatusBatch.permission()},{name:"\u5220\u9664",key:"del",permission:$api.supplier.supplierDelBatch.permission()}].filter(function(t){return t.permission||void 0===t.permission});return b.a.createElement(v["x"],{inner:!0},b.a.createElement(v["y"],{btns:g}),b.a.createElement(S["a"],{dataSource:o,getList:r,onSearch:p,pagination:d,loading:c.effects["supplierList/getList"],columns:$["a"].call(this),searchFields:$["c"],mutipulClick:n,mutipulBtns:k}),b.a.createElement(F,{visible:e,close:s,detailsFields:$["b"],dataSource:i}))}}]),i}(g["PureComponent"]),x=R))||x);e["default"]=j}}]);