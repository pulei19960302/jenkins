(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[52],{"+FM6":function(t,e,a){"use strict";a.r(e);var r=a("d6i3"),n=a.n(r),s=a("p0pE"),i=a.n(s),c=a("wd/R"),o=a.n(c),p=a("GIZZ"),u=a.n(p),d=a("7Qib"),l=a("3Unq"),g=(a("n1G/"),"YYYY-MM-DD");e["default"]=u()(l["b"],{namespace:"orderList",state:{pagination:i()({},l["c"],{pageSize:10}),query:{start_at:"".concat(o()().subtract(3,"days").format(g)),end_at:"".concat(o()().format(g))},status:"",result:{},list:[],tabsNum:null},subscriptions:{setup:function(t){var e=t.dispatch,a=t.history;a.listen(function(t){var r=t.pathname;Object(d["g"])("/order/orderList",r)&&(console.log(a),e({type:"getList"}),e({type:"orderSta"}))})}},effects:{getList:n.a.mark(function t(e,a){var r,s,c,o,p,u,d,l,g,f,w,y,S,b;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,s=a.call,c=a.put,o=a.select,t.next=4,o(function(t){return t.orderList});case 4:return p=t.sent,u=p.pagination,d=p.query,l=p.status,g=u.pageSize,f=u.current,w=i()({pageSize:g,page:f,status:l},d,r),t.next=12,s($api.order.orderList,w);case 12:return y=t.sent,S=y.data,b=S.stat.count||0,t.next=17,c({type:"updateState",payload:{list:S.items,result:S.stat,pagination:i()({},u,{total:b,current:w.page,pageSize:w.pageSize})}});case 17:case"end":return t.stop()}},t)}),orderSta:n.a.mark(function t(e,a){var r,s,i,c;return n.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e.payload,r=a.call,s=a.put,a.select,t.next=4,r($api.order.orderSta);case 4:return i=t.sent,c=i.data,t.next=8,s({type:"updateState",payload:{tabsNum:c}});case 8:case"end":return t.stop()}},t)})},reducers:{}})}}]);