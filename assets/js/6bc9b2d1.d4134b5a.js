"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[4602],{23087:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=t(74848),o=t(28453);const a={},s="Programmatic Navigation",i={id:"frontend/vue3/router/essentials/navigation",title:"Programmatic Navigation",description:"Navigate to a different location",source:"@site/docs/00200-frontend/vue3/030-router/020-essentials/060-navigation.md",sourceDirName:"00200-frontend/vue3/030-router/020-essentials",slug:"/frontend/vue3/router/essentials/navigation",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/navigation",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:60,frontMatter:{},sidebar:"docSidebar",previous:{title:"Nested Routes",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/nested-routes"},next:{title:"Named Views",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/named-views"}},d={},c=[{value:"Navigate to a different location",id:"navigate-to-a-different-location",level:2},{value:"Replace current location",id:"replace-current-location",level:2},{value:"Traverse history",id:"traverse-history",level:2}];function l(e){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{id:"programmatic-navigation",children:"Programmatic Navigation"}),"\n",(0,n.jsx)(r.h2,{id:"navigate-to-a-different-location",children:"Navigate to a different location"}),"\n",(0,n.jsxs)(r.p,{children:["This is the method called internally when you click a ",(0,n.jsx)(r.code,{children:"<router-link>"}),", so clicking ",(0,n.jsx)(r.code,{children:'<router-link :to="...">'})," is the equivalent of calling ",(0,n.jsx)(r.code,{children:"router.push(...)"})]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-js",children:"// literal string path\r\nrouter.push('/users/eduardo')\r\n\r\n// object with path\r\nrouter.push({ path: '/users/eduardo' })\r\n\r\n// named route with params to let the router build the url\r\nrouter.push({ name: 'user', params: { username: 'eduardo' } })\r\n\r\n// with query, resulting in /register?plan=private\r\nrouter.push({ path: '/register', query: { plan: 'private' } })\r\n\r\n// with hash, resulting in /about#team\r\nrouter.push({ path: '/about', hash: '#team' })\n"})}),"\n",(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:"params are ignored if a path is provided"})}),"\n",(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:"router.push"})," and all the other navigation methods ",(0,n.jsx)(r.strong,{children:"return a Promise"})]}),"\n",(0,n.jsx)(r.h2,{id:"replace-current-location",children:"Replace current location"}),"\n",(0,n.jsx)(r.p,{children:"It acts like router.push, the only difference is that it navigates without pushing a new history entry"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-js",children:"router.push({ path: '/home', replace: true })\r\n// equivalent to\r\nrouter.replace({ path: '/home' })\n"})}),"\n",(0,n.jsx)(r.h2,{id:"traverse-history",children:"Traverse history"}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-js",children:"// go forward by one record, the same as router.forward()\r\nrouter.go(1)\r\n\r\n// go back by one record, the same as router.back()\r\nrouter.go(-1)\r\n\r\n// go forward by 3 records\r\nrouter.go(3)\r\n\r\n// fails silently if there aren't that many records\r\nrouter.go(-100)\r\nrouter.go(100)\n"})})]})}function u(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},28453:(e,r,t)=>{t.d(r,{R:()=>s,x:()=>i});var n=t(96540);const o={},a=n.createContext(o);function s(e){const r=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),n.createElement(a.Provider,{value:r},e.children)}}}]);