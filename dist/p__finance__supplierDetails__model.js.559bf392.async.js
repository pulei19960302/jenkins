(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{OGZt:function(e,t,a){"use strict";a.r(t);var n=a("d6i3"),p=a.n(n),i=a("Y/ft"),s=a.n(i),r=a("p0pE"),u=a.n(r),c=a("wd/R"),o=a.n(c),l=a("GIZZ"),d=a.n(l),y=a("3Unq"),f=a("7Qib"),g=a("F1Dt");t["default"]=d()(y["a"],y["b"],{namespace:"suppilerDetails",state:{query:{update_start_time:o()().subtract(30,"days").format(g["d"].DATE),update_end_time:o()().format(g["d"].DATE)}},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){var a=e.pathname,n=e.payload;Object(f["g"])("/finance/suppilerDetails",a)&&t({type:"getList",payload:n})})}},effects:{getList:p.a.mark(function e(t,a){var n,i,r,c,o,l,d,y,f,g,w,m,S,b;return p.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,i=a.put,r=a.call,c=a.select,e.next=4,c(function(e){return e.suppilerDetails});case 4:return o=e.sent,l=o.pagination,d=o.query,y=l.pageSize,f=l.current,g=u()({pageSize:y,page:f},d,n),w=g.pageSize,m=s()(g,["pageSize"]),e.next=12,r($api.finance.suppilerDetails,u()({page_size:w},m));case 12:return S=e.sent,b=S.data,e.next=16,i({type:"querySuccess",payload:{list:b&&b.data,pagination:{total:b&&b.total,current:g.page,pageSize:g.pageSize}}});case 16:return e.next=18,i({type:"updateState",payload:{type:b&&b.type,sum:b&&b.sum}});case 18:case"end":return e.stop()}},e)})}})}}]);