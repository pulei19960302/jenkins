(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[66],{F7rm:function(e,t,a){e.exports={"text-overflow":"text-overflow___Krftt","text-gradient":"text-gradient___nniXq","background-hover":"background-hover___3HHlX",modalIcon:"modalIcon___l1__D",more:"more___33I7_",listContainer:"listContainer___3WDNn",listItem:"listItem___1pJ6s",firstTabRow:"firstTabRow___2JEwG",secondTabRow:"secondTabRow___3lU6g",style_box:"style_box___2U4k7",big_box:"big_box___2OuyG",select_box:"select_box___JE4B-",text_box:"text_box___1N5ZG",barContent:"barContent___1N9Oc",btns:"btns___DzVZt",label_search:"label_search___arNjj",search_divider:"search_divider___2gMiQ",editable:"editable___3U7s9",labelGroupModal:"labelGroupModal___1mZDA",addGroupBtn:"addGroupBtn___2B3lU",contentInner:"contentInner___21D97"}},KZee:function(e,t,a){"use strict";a.r(t);var o,n,r,l,c=a("jehZ"),s=a.n(c),i=a("p0pE"),u=a.n(i),d=(a("2qtc"),a("kLXV")),p=a("2Taf"),b=a.n(p),f=a("vZ4D"),h=a.n(f),g=a("MhPg"),m=a.n(g),_=a("l4Ni"),y=a.n(_),C=a("ujKo"),k=a.n(C),L=a("MuoO"),S=a("q1tI"),v=a.n(S),x=a("Kvkj"),E=a("eHn4"),F=a.n(E),w=(a("/zsF"),a("PArb")),D=(a("BoS7"),a("Sdc0")),R=a("F7rm"),B=a.n(R),M=[{value:-1,name:"\u5168\u90e8"},{value:1,name:"\u542f\u7528"},{value:2,name:"\u7981\u7528"}],O=[{key:"label",placeholder:"\u8bf7\u8f93\u5165\u6807\u7b7e\u540d\u79f0"},{type:"enum",key:"status",placeholder:"\u72b6\u6001",enums:M}],P=function(){var e=this;return[{title:"\u6807\u7b7e\u540d\u79f0",dataIndex:"label",key:"label",width:200},{title:"\u6807\u7b7e\u6837\u5f0f",dataIndex:"color",key:"color",width:200,render:function(e){return v.a.createElement("div",{style:{background:e.back_color,color:e.font_color,border:""!==e.back_color?"none":"1px solid ".concat(e.font_color)},className:B.a.text_box},"\u6587\u5b57")}},{title:"\u6807\u7b7e\u72b6\u6001",dataIndex:"status_name",key:"status_name",width:180,render:function(t,a){return v.a.createElement(D["a"],{disabled:!$api.label.labelStatus.permission(),checkedChildren:"\u542f\u7528",unCheckedChildren:"\u7981\u7528",checked:"\u542f\u7528"===t,onChange:function(t){e.labelStatusChange(a.id,t?1:2)}})}},{title:"\u4fee\u6539\u65f6\u95f4",dataIndex:"updated_at",width:200},{title:"\u64cd\u4f5c",dataIndex:"operation",width:300,render:function(t,a){return v.a.createElement("div",null,$api.label.labelEdit.permission()&&v.a.createElement(v.a.Fragment,null,v.a.createElement("a",{onClick:function(){e.showModal("editLabelModal",a)}},"\u7f16\u8f91"),v.a.createElement(w["a"],{type:"vertical"})),$api.label.labelDel.permission()&&v.a.createElement(v.a.Fragment,null,v.a.createElement("a",{onClick:function(){e.labelDelete(a.id)}},"\u5220\u9664")))}}]},N=(a("14J3"),a("BMrR")),I=(a("jCWc"),a("kPKH")),$=(a("5NDa"),a("5rEg")),j=a("gWZ8"),H=a.n(j),T=(a("OaEy"),a("2fM7")),q=a("WsrF");a("XlDN");function A(e){return function(){var t,a=k()(e);if(G()){var o=k()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return y()(this,t)}}function G(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Z,J,K,V,z=q["a"].Item,U=(T["a"].Option,o=q["a"].create(),n=Object(L["connect"])(function(e){var t=e.loading,a=e.productLabelList;return{loading:t,productLabelList:a}}),o(r=n((l=function(e){m()(a,e);var t=A(a);function a(e){var o;return b()(this,a),o=t.call(this,e),o.handleOk=function(){var e=o.props,t=e.form,a=e.onCancel,n=(e.selectRow,o.state.selectStyleData);t.validateFields(function(e,t){0!==Object.keys(n).length?(o.setState({customStatus:"success",customHelp:""}),t.status=t.status?1:2,t.back_color=n.background,t.font_color=n.textColor,t.border_color=n.borderColor,e||$api.label.labelAdd(t,{success:!0}).then(function(e){o.props.dispatch({type:"productLabelList/getList"}),o.toogleLoading(!1),a()}).catch(function(e){o.toogleLoading(!1)})):o.setState({customStatus:"error",customHelp:"\u8bf7\u9009\u62e9\u6837\u5f0f"})})},o.toogleLoading=function(e){o.setState({loading:e})},o.selectStyle=function(e,t){for(var a=o.state.styleList,n=0;n<a.length;n++)a[n].isSelect=!1;a[t].isSelect=!0,o.setState({selectStyleData:e,styleList:H()(a)})},o.state={loading:!1,selectStyleData:{},styleList:e.styleList,customStatus:"success",customHelp:""},o}return h()(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.form.getFieldDecorator,o=t.onCancel,n=(t.selectRow,this.state),r=n.loading,l=n.styleList,c=n.customStatus,i=n.customHelp,u="\u6807\u7b7e\u65b0\u589e",p={labelCol:{span:6},wrapperCol:{span:14}},b={title:u,width:500,visible:!0,maskClosable:!1,confirmLoading:r,onOk:this.handleOk,onCancel:o};return v.a.createElement(d["a"],b,v.a.createElement(q["a"],p,v.a.createElement(z,{label:"\u6807\u7b7e\u540d"},a("label",{rules:[{required:!0,message:"\u8bf7\u586b\u5199\u6807\u7b7e\u540d"}]})(v.a.createElement($["a"],{maxLength:15,placeholder:"\u8bf7\u8f93\u5165\u6807\u7b7e\u540d"}))),v.a.createElement(z,s()({},p,{validateStatus:c,help:i,label:"\u6837\u5f0f",required:!0}),v.a.createElement(v.a.Fragment,null,v.a.createElement(N["a"],{gutter:[16,8]},l.map(function(t,a){return v.a.createElement(I["a"],{className:"gutter-row",span:6,key:a,onClick:e.selectStyle.bind(e,t,a)},v.a.createElement("div",{className:"".concat(B.a.big_box," ").concat(t.isSelect?B.a.select_box:"")},v.a.createElement("div",{style:{background:t.background,color:t.textColor,border:"".concat(t.borderColor?"1px solid ".concat(t.borderColor):"")},className:"".concat(B.a.style_box," ").concat(t.isSelect?B.a.select_box:"")},"\u6587\u5b57")))})))),v.a.createElement(z,{label:"\u6807\u7b7e\u72b6\u6001"},a("status",{valuePropName:"checked",initialValue:!1,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u72b6\u6001"}]})(v.a.createElement(D["a"],{checkedChildren:"\u542f\u7528",unCheckedChildren:"\u7981\u7528"})))))}}]),a}(S["PureComponent"]),r=l))||r)||r),W=U;function X(e){return function(){var t,a=k()(e);if(Q()){var o=k()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return y()(this,t)}}function Q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Y=q["a"].Item,ee=(T["a"].Option,Z=q["a"].create(),J=Object(L["connect"])(function(e){var t=e.loading,a=e.productLabelList;return{loading:t,productLabelList:a}}),Z(K=J((V=function(e){m()(a,e);var t=X(a);function a(e){var o;return b()(this,a),o=t.call(this,e),o.handleOk=function(){var e=o.props,t=e.form,a=e.onCancel,n=e.selectRow,r=o.state.selectStyleData;t.validateFields(function(e,t){0===Object.keys(r).length?o.setState({customStatus:"error",customHelp:"\u8bf7\u9009\u62e9\u6837\u5f0f"}):o.setState({customStatus:"success",customHelp:""}),t.status=t.status?1:2,t.back_color=r.background,t.font_color=r.textColor,t.border_color=r.borderColor,t.id=n.id,e||$api.label.labelEdit(t,{success:!0}).then(function(e){o.toogleLoading(!1),a(),o.props.dispatch({type:"productLabelList/getList"})}).catch(function(e){o.toogleLoading(!1)})})},o.toogleLoading=function(e){o.setState({loading:e})},o.selectStyle=function(e,t){for(var a=o.state.styleList,n=0;n<a.length;n++)a[n].isSelect=!1;a[t].isSelect=!0,o.setState({selectStyleData:e,styleList:H()(a)})},o.state={loading:!1,selectStyleData:{},styleList:e.styleList,customStatus:"success",customHelp:""},o}return h()(a,[{key:"componentDidMount",value:function(){for(var e={},t=this.props.selectRow,a=this.state.styleList,o=0;o<a.length;o++)t.color.back_color===a[o].background&&t.color.font_color===a[o].textColor&&(a[o].isSelect=!0,e=a[o]);this.setState({selectStyleData:e,styleList:H()(a)})}},{key:"render",value:function(){var e=this,t=this.props,a=t.form.getFieldDecorator,o=t.onCancel,n=t.selectRow,r=this.state,l=r.loading,c=r.styleList,i=r.customStatus,u=r.customHelp,p="\u6807\u7b7e\u7f16\u8f91",b={labelCol:{span:6},wrapperCol:{span:14}},f={title:p,width:500,visible:!0,maskClosable:!1,confirmLoading:l,onOk:this.handleOk,onCancel:o};return v.a.createElement(d["a"],f,v.a.createElement(q["a"],b,v.a.createElement(Y,{label:"\u6807\u7b7e\u540d"},a("label",{initialValue:n.label,rules:[{required:!0,message:"\u8bf7\u586b\u5199\u6807\u7b7e\u540d"}]})(v.a.createElement($["a"],{maxLength:15,placeholder:"\u8bf7\u8f93\u5165\u6807\u7b7e\u540d"}))),v.a.createElement(Y,s()({},b,{validateStatus:i,help:u,label:"\u6837\u5f0f",required:!0}),v.a.createElement(v.a.Fragment,null,v.a.createElement(N["a"],{gutter:[16,8]},c.map(function(t,a){return v.a.createElement(I["a"],{className:"gutter-row",span:6,key:a,onClick:e.selectStyle.bind(e,t,a)},v.a.createElement("div",{className:"".concat(B.a.big_box," ").concat(t.isSelect?B.a.select_box:"")},v.a.createElement("div",{style:{background:t.background,color:t.textColor,border:"".concat(t.borderColor?"1px solid ".concat(t.borderColor):"")},className:"".concat(B.a.style_box," ").concat(t.isSelect?B.a.select_box:"")},"\u6587\u5b57")))})))),v.a.createElement(Y,{label:"\u6807\u7b7e\u72b6\u6001"},a("status",{initialValue:1===n.status,valuePropName:"checked",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u72b6\u6001"}]})(v.a.createElement(D["a"],{checkedChildren:"\u542f\u7528",unCheckedChildren:"\u7981\u7528"})))))}}]),a}(S["PureComponent"]),K=V))||K)||K),te=ee;function ae(e){return function(){var t,a=k()(e);if(oe()){var o=k()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return y()(this,t)}}function oe(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var ne,re,le,ce=function(e){m()(a,e);var t=ae(a);function a(e){var o;return b()(this,a),o=t.call(this,e),o.onSearch=function(e){o.props.getList(e)},o.showModal=function(e,t){var a;o.setState((a={},F()(a,e,!0),F()(a,"selectRow",t),a))},o.hideModal=function(e){o.setState(F()({},e,!1))},o.getCommonProps=function(e){return{selectRow:o.state.selectRow,onCancel:function(){o.hideModal(e)},onOk:function(){}}},o.labelStatusChange=function(e,t){o.props.statusSwitch(e,t)},o.labelDelete=function(e){o.props.deleted(e)},o.state={selectRow:{},selectedRowKeys:[],addLabelModal:!1,editLabelModal:!1,secondCategoryEditModal:!1},o}return h()(a,[{key:"render",value:function(){var e=this.props.list,t=[{background:"linear-gradient(93deg,rgba(207,39,64,1) 0%,rgba(234,108,104,1) 100%)",textColor:"#FFFFFF",borderColor:"",isSelect:!1},{background:"linear-gradient(90deg,rgba(33,138,235,1) 0%,rgba(55,180,241,1) 100%)",textColor:"#FFFFFF",borderColor:"",isSelect:!1},{background:"linear-gradient(90deg,rgba(129,59,216,1) 0%,rgba(161,93,226,1) 100%)",textColor:"#FFFFFF",borderColor:"",isSelect:!1},{background:"linear-gradient(90deg,rgba(12,197,179,1) 0%,rgba(52,226,200,1) 100%)",textColor:"#FFFFFF",borderColor:"",isSelect:!1},{background:"linear-gradient(133deg,rgba(41,42,35,1) 0%,rgba(94,94,83,1) 100%)",textColor:"#E4B55C",borderColor:"",isSelect:!1},{background:"",textColor:"#EA485E",borderColor:"#FF817E",isSelect:!1},{background:"",textColor:"#388BE6",borderColor:"#78B3F2",isSelect:!1},{background:"",textColor:"#8E4DDE",borderColor:"#AA6DE8",isSelect:!1},{background:"",textColor:"#0DC6B4",borderColor:"#5BDFCB",isSelect:!1},{background:"",textColor:"#C29A4F",borderColor:"#DCBF84",isSelect:!1}],a=this.state,o=a.addLabelModal,n=a.editLabelModal,r=u()({},this.getCommonProps("addLabelModal"),{styleList:t}),l=u()({},this.getCommonProps("editLabelModal"),{styleList:t}),c=this.onSearch,s=this.props,i=s.pageProps,d=s.getList,p=i.btns,b=i.mutipulClick,f=i.paginationProps;return v.a.createElement("div",null,v.a.createElement(x["i"],{onSearch:c,searchFields:O,columns:P.call(this),dataSource:e,pagination:f,mutipulBtns:p,mutipulClick:b,getList:d}),o&&v.a.createElement(W,r),n&&v.a.createElement(te,l))}}]),a}(S["PureComponent"]),se=ce;function ie(e){return function(){var t,a=k()(e);if(ue()){var o=k()(this).constructor;t=Reflect.construct(a,arguments,o)}else t=a.apply(this,arguments);return y()(this,t)}}function ue(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var de=(ne=Object(L["connect"])(function(e){var t=e.loading,a=e.productLabelList;return{loading:t,productLabelList:a}}),ne((le=function(e){m()(a,e);var t=ie(a);function a(e){var o;return b()(this,a),o=t.call(this,e),o.mutipulClick=function(e,t){var a=t.join(",");switch(e){case"del":o.toogleDelBatch(a);break;case"up":o.toogleStatusBatch(a,1);break;case"disable":o.toogleStatusBatch(a,2);break}},o.getList=function(e){var t=o.props.dispatch;t({type:"productLabelList/getList",payload:e})},o.pageChange=function(e,t){var a=o.props.dispatch;a({type:"productLabelList/getList",payload:{page:e,pageSize:t}})},o.statusLabel=function(e,t){var a=o.props.dispatch;$api.label.labelStatus({id:e,status:t},{success:!0}).then(function(e){a({type:"productLabelList/getList"})})},o.toogleStatusBatch=function(e,t){var a=o.props.dispatch;$api.label.labelStatusBatch({ids:e,status:t},{success:!0}).then(function(e){a({type:"productLabelList/getList"})})},o.delLabel=function(e){var t=o.props.dispatch;d["a"].confirm({title:"\u786e\u8ba4\u5220\u9664\u6240\u9009\u6807\u7b7e\u4e48?",cancelText:"\u53d6\u6d88",okText:"\u786e\u8ba4",onOk:function(){$api.label.labelDel({id:e},{success:!0}).then(function(e){t({type:"productLabelList/getList"})})}})},o.toogleDelBatch=function(e){var t=o.props.dispatch;d["a"].confirm({title:"\u786e\u8ba4\u6279\u91cf\u5220\u9664\u6240\u9009\u6807\u7b7e\u4e48?",cancelText:"\u53d6\u6d88",okText:"\u786e\u8ba4",onOk:function(){$api.label.labelDelBatch({ids:e},{success:!0}).then(function(e){t({type:"productLabelList/getList"})})}})},o.ref=v.a.createRef(),o.state={},o}return h()(a,[{key:"render",value:function(){var e=this,t=this.state,a=(t.showfirLabel,t.operationType,this.props),o=(a.loading,a.productLabelList),n=o.list,r=o.pagination,l=u()({},r,{onChange:this.pageChange,onShowSizeChange:function(t,a){return e.pageChange(t,a)}}),c={btns:[{name:"\u6279\u91cf\u542f\u7528",key:"up",permission:$api.label.labelStatusBatch.permission()},{name:"\u6279\u91cf\u7981\u7528",key:"disable",permission:$api.label.labelStatusBatch.permission()},{name:"\u6279\u91cf\u5220\u9664",key:"del",permission:$api.label.labelDelBatch.permission()}].filter(function(e){return e.permission||void 0===e.permission}),mutipulClick:this.mutipulClick,paginationProps:l},i={deleted:this.delLabel,statusSwitch:this.statusLabel},d=$api.label.labelAdd.permission()?[{icon:"plus",type:"primary",name:"\u65b0\u589e\u6807\u7b7e",handleClick:function(){return e.ref.current.showModal("addLabelModal")}}]:[];return v.a.createElement(v.a.Fragment,null,v.a.createElement(x["x"],{inner:!0},v.a.createElement(x["y"],{btns:d}),v.a.createElement(se,s()({list:n,ref:this.ref,getList:this.getList},i,{pageProps:c}))))}}]),a}(S["PureComponent"]),re=le))||re);t["default"]=de}}]);