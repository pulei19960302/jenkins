(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[59],{krLW:function(e,t,a){"use strict";a.r(t);var n=a("BkRI"),r=a.n(n),s=a("d6i3"),i=a.n(s),c=a("GIZZ"),o=a.n(c),l=a("7Qib"),u=a("3Unq");t["default"]=o()(u["a"],{namespace:"security",state:{selectedRole:"",roles:[],details:[]},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;a.listen(function(e){var a=e.pathname;Object(l["g"])("/permissions/security",a)&&t({type:"getPermissionTree"}).then(function(e){t({type:"getRolesList"})})})}},effects:{getRolesList:i.a.mark(function e(t,a){var n,r,s,c,o,l,u,d,p;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,n=a.call,r=a.put,s=a.select,e.next=4,n($api.permissions.getRolesList);case 4:return c=e.sent,o=c.data,e.next=8,s(function(e){return e.security});case 8:return l=e.sent,u=l.selectedRole,d=o.every(function(e){return e.id===u}),p=d?u:o[0]&&o[0].id,e.next=14,r({type:"updateState",payload:{roles:o,selectedRole:p}});case 14:return e.next=16,r({type:"setPermissionTree",payload:{id:p}});case 16:case"end":return e.stop()}},e)}),updateRolesList:i.a.mark(function e(t,a){var n,r,s,c,o,l,u;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,s=a.put,a.select,c=n||{},o=c.callback,e.next=5,r($api.permissions.getRolesList);case 5:return l=e.sent,u=l.data,e.next=9,s({type:"updateState",payload:{roles:u}});case 9:o&&o();case 10:case"end":return e.stop()}},e)}),createRole:i.a.mark(function e(t,a){var n,r,s,c;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,s=a.put,a.select,c=n.name,e.next=5,r($api.permissions.createRole,{name:c});case 5:return e.next=7,s({type:"updateRolesList"});case 7:case"end":return e.stop()}},e)}),deleteRole:i.a.mark(function e(t,a){var n,r,s,c;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,s=a.put,a.select,c=n.role_id,e.next=5,r($api.permissions.deleteRole,{role_ids:[c]});case 5:return e.next=7,s({type:"getRolesList"});case 7:case"end":return e.stop()}},e)}),updateRole:i.a.mark(function e(t,a){var n,r,s,c,o,l;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,s=a.put,a.select,c=n.id,o=n.role_name,l=n.callback,e.next=5,r($api.permissions.updateRole,{data:[{id:c,role_name:o}]});case 5:return e.next=7,s({type:"updateRolesList",payload:{callback:l}});case 7:case"end":return e.stop()}},e)}),updateSelectedRole:i.a.mark(function e(t,a){var n,r,s,c;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,a.call,r=a.put,a.select,s=n.id,c=void 0===s?"":s,e.next=5,r({type:"updateState",payload:{selectedRole:c}});case 5:return e.next=7,r({type:"setPermissionTree",payload:{id:c}});case 7:case"end":return e.stop()}},e)}),getPermissionTree:i.a.mark(function e(t,a){var n,r,s,c,o,u;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t.payload,n=a.call,r=a.put,a.select,e.next=4,n($api.permissions.getPermissionsList);case 4:return s=e.sent,c=s.data,o=void 0===c?[]:c,u=o&&Object(l["a"])(o,"id","parent_id"),e.next=10,r({type:"updateState",payload:{details:u}});case 10:case"end":return e.stop()}},e)}),setPermissionTree:i.a.mark(function e(t,a){var n,s,c,o,l,u,d,p,h,f,y,v,w,m,x,k;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,s=a.call,c=a.put,o=a.select,l=n.id,u=void 0===l?"":l,e.next=5,s($api.permissions.getRolePermissions,{role_id:u});case 5:return d=e.sent,p=d.data,h=void 0===p?{}:p,f=h.role_ids,y=void 0===f?[]:f,e.next=11,o(function(e){return e.security});case 11:return v=e.sent,w=v.details,m=void 0===w?[]:w,x=r()(m),k=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t||!t.length)return null;t.forEach(function(t){var n=t.id,r=void 0===n?"":n,s=t.children,i=void 0===s?"":s;t.checked=!!a.includes(r),i&&e(i,a)})},k(x,y),e.next=19,c({type:"updateState",payload:{details:x}});case 19:case"end":return e.stop()}},e)}),updatePermissionTree:i.a.mark(function e(t,a){var n,s,c,o,l,u,d,p,h,f,y,v,w,m;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,a.call,s=a.put,c=a.select,e.next=4,c(function(e){return e.security});case 4:return o=e.sent,l=o.details,u=void 0===l?[]:l,d=r()(u),p=n.item,h=n.checked,f=p.id,y=p.parent_id,v=function(e,t){var a=t;return e.children.forEach(function(e){e.checked&&(a=!0)}),a},w=function e(t,a,n){t&&t.forEach(function(t){t.id===a||t.parent_id===a?(t.checked=n,t.children&&e(t.children,t.id,n)):t.children&&e(t.children,a,n)})},m=function e(t,a){a&&a.forEach(function(a){a.id===t?(a.checked=v(a,a.checked),a.parent_id&&e(a.parent_id,d)):a.children&&e(t,a.children)})},w(d,f,h),m(y,d),e.next=17,s({type:"updateState",payload:{details:d}});case 17:case"end":return e.stop()}},e)})}})}}]);