(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[79],{S19q:function(e,t,a){"use strict";a.r(t);a("+L6B");var n=a("2/Rp"),s=(a("T2oS"),a("W9HT")),o=a("jehZ"),i=a.n(o),r=a("d6i3"),u=a.n(r),c=a("p0pE"),p=a.n(c),l=a("1l/V"),m=a.n(l),f=a("qIgq"),d=a.n(f),b=a("q1tI"),v=a.n(b),g=a("Kvkj"),y=a("UoN7"),E=a("mZMw"),O=a("T3qe"),w=a("1mXV"),S=function(){var e=Object(b["useState"])({}),t=d()(e,2),a=t[0],o=t[1],r=Object(b["useState"])(y["a"].SHOP),c=d()(r,2),l=c[0],f=c[1],S=Object(b["useState"])(new Map),h=d()(S,2),T=h[0],j=h[1],C=Object(b["useState"])(!1),k=d()(C,2),A=k[0],H=k[1],I=Object(b["useState"])(!1),P=d()(I,2),R=P[0],q=P[1],x=Object(b["useState"])(!1),N=d()(x,2),$=N[0],L=N[1];Object(b["useEffect"])(function(){var e=function(){var e=m()(u.a.mark(function e(){return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:$api.system.getCompany({},{loadingFn:K}).then(function(e){var t=p()({},e.data,{about_us:e.data.about_us?e.data.about_us:""});o(t)});case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();e(),l===y["a"].SHOP&&H($api.system.saveCompany.permission())},[l]);var U=function(e){var t=e.value;switch(t){case y["a"].SHOP:H($api.system.saveCompany.permission());break;case y["a"].OPERATE:H($api.system.saveCompany.permission());break;case y["a"].AUTHENTICATION:H($api.system.saveCompany.permission());break}T.delete(l),f(t),j(T)},_=function(e){q(!0),e.preventDefault();var t=T.get(l);t&&t.handleSubmit()},J=function(e,t){var a=T.get(e);a||T.set(e,t),j(T)},K=function(e){L(e)},M=function(){switch(l){case y["a"].SHOP:return v.a.createElement(E["default"],i()({onRef:J},a,{toggleLoading:q}));case y["a"].OPERATE:return v.a.createElement(O["default"],i()({onRef:J},a,{toggleLoading:q}));case y["a"].AUTHENTICATION:return v.a.createElement(w["default"],i()({onRef:J},a,{toggleLoading:q}))}};return v.a.createElement("div",{style:{position:"relative"}},v.a.createElement(g["x"],{inner:!0},$&&v.a.createElement(s["a"],{style:{position:"absolute",zIndex:99,top:"30%",left:"50%",transform:"translate(-30%, -50%)"}}),v.a.createElement(g["E"],{defaultActiveKey:"shop",tabs:y["b"],onChange:U}),M()),A?v.a.createElement(n["a"],{loading:R,type:"primary",onClick:_,style:{position:"absolute",top:"16px",right:"40px"}},"\u63d0\u4ea4"):null)};t["default"]=S}}]);