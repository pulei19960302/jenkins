(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[30],{tUWF:function(t,e,a){"use strict";a.r(e);var n=a("d6i3"),i=a.n(n),r=a("Y/ft"),s=a.n(r),p=a("p0pE"),u=a.n(p),c=a("wd/R"),o=a.n(c),d=a("GIZZ"),m=a.n(d),f=a("3Unq"),y=a("7Qib"),g=a("F1Dt");e["default"]=m()(f["a"],f["b"],{namespace:"returnProfitList",state:{query:{start_time:o()().subtract(30,"days").format(g["d"].DATE),end_time:o()().format(g["d"].DATE)}},subscriptions:{setup:function(t){var e=t.dispatch,a=t.history;a.listen(function(t){var a=t.pathname;Object(y["g"])("/finance/returnProfitList",a)&&e({type:"getList"})})}},effects:{getList:i.a.mark(function t(e,a){var n,r,p,c,o,d,m,f,y,g,_,l,w,v,S,b,z,h,L,x,q;return i.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.put,p=a.call,c=a.select,t.next=4,c(function(t){return t.returnProfitList});case 4:return o=t.sent,d=o.pagination,m=o.query,f=d.pageSize,y=d.current,g=u()({pageSize:f,page:y},m,n),_=g.timeType,l=void 0===_?"":_,w=g.start_time,v=void 0===w?"":w,S=g.end_time,b=void 0===S?"":S,z=g.pageSize,h=s()(g,["timeType","start_time","end_time","pageSize"]),L={},v&&b&&(L=l?{update_start_time:v,update_end_time:b}:{start_time:v,end_time:b}),t.next=14,p($api.finance.returnProfitList,u()({page_size:z},L,h));case 14:return x=t.sent,q=x.data,t.next=18,r({type:"querySuccess",payload:{list:q&&q.data,pagination:{total:q&&q.total,current:g.page,pageSize:g.pageSize}}});case 18:return t.next=20,r({type:"updateState",payload:{type:q&&q.type,sum:q&&q.sum,status:q&&q.status}});case 20:case"end":return t.stop()}},t)})}})}}]);