(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[47],{ro9y:function(e,t,n){"use strict";n.r(t);var a=n("d6i3"),s=n.n(a),i=n("Y/ft"),p=n.n(i),r=n("p0pE"),c=n.n(r),o=n("GIZZ"),u=n.n(o),g=n("3Unq"),d=n("7Qib"),l=n("Dpy5");t["default"]=u()(g["a"],g["b"],{namespace:"couponList",state:{searchFields:l["d"],query:{sort:"DESC"}},subscriptions:{setup:function(e){var t=e.dispatch,n=e.history;n.listen(function(e){var n=e.pathname;Object(d["g"])("/marketing/couponList",n)&&(t({type:"getList"}),t({type:"getTabs"}))})}},reducers:{},effects:{getList:s.a.mark(function e(t,n){var a,i,r,o,u,g,d,l,y,f,w,S,b,h;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,i=n.put,r=n.call,o=n.select,e.next=4,o(function(e){return e.couponList});case 4:return u=e.sent,g=u.pagination,d=u.query,l=g.pageSize,y=g.current,f=c()({pageSize:l,page:y},d,a),w=f.pageSize,S=p()(f,["pageSize"]),e.next=12,r($api.coupon.list,c()({page_size:w},S,{sort:"DESC"}));case 12:return b=e.sent,h=b.data,e.next=16,i({type:"querySuccess",payload:{list:h&&h.items,pagination:{total:h&&h.count,current:f.page,pageSize:f.pageSize}}});case 16:case"end":return e.stop()}},e)})}})}}]);