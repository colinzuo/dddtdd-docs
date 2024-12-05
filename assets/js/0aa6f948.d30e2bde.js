"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[708],{29833:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>l,frontMatter:()=>o,metadata:()=>d,toc:()=>u});var r=t(74848),s=t(28453);const o={},a="Named Routes",d={id:"frontend/vue3/router/essentials/named-routes",title:"Named Routes",description:"Alongside the path, you can provide a name to any route. This has the following advantages",source:"@site/docs/00200-frontend/vue3/030-router/020-essentials/040-named-routes.md",sourceDirName:"00200-frontend/vue3/030-router/020-essentials",slug:"/frontend/vue3/router/essentials/named-routes",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/named-routes",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:40,frontMatter:{},sidebar:"docSidebar",previous:{title:"Routes' Matching Syntax",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/route-matching-syntax"},next:{title:"Nested Routes",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/nested-routes"}},i={},u=[];function c(e){const n={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"named-routes",children:"Named Routes"}),"\n",(0,r.jsxs)(n.p,{children:["Alongside the path, you can provide a name to any route. This has the following ",(0,r.jsx)(n.strong,{children:"advantages"})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"No hardcoded URLs"}),"\n",(0,r.jsx)(n.li,{children:"Automatic encoding/decoding of params"}),"\n",(0,r.jsx)(n.li,{children:"Bypassing path ranking"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const routes = [\r\n  {\r\n    path: '/user/:username',\r\n    name: 'user',\r\n    component: User\r\n  }\r\n]\r\n\r\n<router-link :to=\"{ name: 'user', params: { username: 'erina' }}\">\r\n  User\r\n</router-link>\r\n\r\nrouter.push({ name: 'user', params: { username: 'erina' } })\n"})})]})}function l(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>d});var r=t(96540);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);