(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{"YO/e":function(t,e,n){"use strict";n.r(e);var a=n("d6i3"),c=n.n(a),s=n("p0pE"),i=n.n(s),r=n("GIZZ"),u=n.n(r),o=n("3Unq"),p=n("7Qib");e["default"]=u()(o["a"],o["b"],{namespace:"totalAccount",state:{},subscriptions:{setup:function(t){var e=t.dispatch,n=t.history;n.listen(function(t){var n=t.pathname;Object(p["g"])("/finance/totalAccount",n)&&e({type:"getList"})})}},reducers:{},effects:{getList:c.a.mark(function t(e,n){var a,s,r,u,o,p,f,l,d,w;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=e.payload,n.put,s=n.call,r=n.select,t.next=4,r(function(t){return t.totalAccount});case 4:return u=t.sent,o=u.pagination,p=u.query,f=o.pageSize,l=o.current,d=i()({pageSize:f,page:l},a,p),t.next=11,s($api.finance.totalAccount,d);case 11:w=t.sent,w.data;case 13:case"end":return t.stop()}},t)})}})}}]);