(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[78],{"+4dv":function(e,a,t){"use strict";t.r(a);var n=t("d6i3"),r=t.n(n),p=t("Y/ft"),s=t.n(p),i=t("p0pE"),c=t.n(i),u=(t("wd/R"),t("GIZZ")),o=t.n(u),l=t("3Unq"),g=t("7Qib");a["default"]=o()(l["a"],l["b"],{namespace:"delivery",state:{templateQuery:{},expressQuery:{},insuranceQuery:{},areasList:[]},subscriptions:{setup:function(e){var a=e.dispatch,t=e.history;t.listen(function(e){var t=e.pathname;Object(g["g"])("/shipping/delivery",t)&&a({type:"getAllAreas"})})}},effects:{getTemplateList:r.a.mark(function e(a,t){var n,p,i,u,o,l,g,d,y,S,z,w,x,f;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,p=t.put,i=t.call,u=t.select,e.next=4,u(function(e){return e.delivery});case 4:return o=e.sent,l=o.pagination,g=o.templateQuery,d=l.pageSize,y=l.current,S=c()({pageSize:d,page:y},g,n),z=S.pageSize,w=s()(S,["pageSize"]),e.next=12,i($api.common.getFreightTemplate,c()({page_size:z},w));case 12:return x=e.sent,f=x.data,e.next=16,p({type:"querySuccess",payload:{list:f&&f.data,pagination:{total:f&&f.total,current:S.page,pageSize:S.pageSize}}});case 16:case"end":return e.stop()}},e)}),getExpressList:r.a.mark(function e(a,t){var n,p,i,u,o,l,g,d,y,S,z,w,x,f;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,p=t.put,i=t.call,u=t.select,e.next=4,u(function(e){return e.delivery});case 4:return o=e.sent,l=o.pagination,g=o.expressQuery,d=l.pageSize,y=l.current,S=c()({pageSize:d,page:y},g,n),z=S.pageSize,w=s()(S,["pageSize"]),e.next=12,i($api.common.getExpressList,c()({page_size:z},w));case 12:return x=e.sent,f=x.data,e.next=16,p({type:"querySuccess",payload:{list:f&&f.data,pagination:{total:f&&f.total,current:S.page,pageSize:S.pageSize}}});case 16:case"end":return e.stop()}},e)}),getInsuranceList:r.a.mark(function e(a,t){var n,p,i,u,o,l,g,d,y,S,z,w,x,f;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,p=t.put,i=t.call,u=t.select,e.next=4,u(function(e){return e.delivery});case 4:return o=e.sent,l=o.pagination,g=o.insuranceQuery,d=l.pageSize,y=l.current,S=c()({pageSize:d,page:y},g,n),z=S.pageSize,w=s()(S,["pageSize"]),e.next=12,i($api.common.getInsurance,c()({page_size:z},w));case 12:return x=e.sent,f=x.data,e.next=16,p({type:"querySuccess",payload:{list:f&&f.data,pagination:{total:f&&f.total,current:S.page,pageSize:S.pageSize}}});case 16:case"end":return e.stop()}},e)}),getAllAreas:r.a.mark(function e(a,t){var n,p,s,i;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.payload,n=t.put,p=t.call,t.select,e.next=4,p($api.common.getAllAreas);case 4:return s=e.sent,i=s.data,e.next=8,n({type:"updateState",payload:{areasList:i}});case 8:case"end":return e.stop()}},e)})}})}}]);