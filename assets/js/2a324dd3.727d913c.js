"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[1352],{38326:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>l,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var r=n(74848),s=n(28453);const i={},o="Named Views",a={id:"frontend/vue3/router/essentials/named-views",title:"Named Views",description:"A router-view without a name will be given default as its name",source:"@site/docs/00200-frontend/vue3/030-router/020-essentials/070-named-views.md",sourceDirName:"00200-frontend/vue3/030-router/020-essentials",slug:"/frontend/vue3/router/essentials/named-views",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/named-views",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:70,frontMatter:{},sidebar:"docSidebar",previous:{title:"Programmatic Navigation",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/navigation"},next:{title:"Redirect and Alias",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/redirect-and-alias"}},d={},c=[];function u(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"named-views",children:"Named Views"}),"\n",(0,r.jsxs)(t.p,{children:["A router-view without a name will be given ",(0,r.jsx)(t.strong,{children:"default"})," as its name"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-html",children:'<router-view class="view left-sidebar" name="LeftSidebar"></router-view>\r\n<router-view class="view main-content"></router-view>\r\n<router-view class="view right-sidebar" name="RightSidebar"></router-view>\n'})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"const router = createRouter({\r\n  history: createWebHashHistory(),\r\n  routes: [\r\n    {\r\n      path: '/',\r\n      components: {\r\n        default: Home,\r\n        // short for LeftSidebar: LeftSidebar\r\n        LeftSidebar,\r\n        // they match the `name` attribute on `<router-view>`\r\n        RightSidebar,\r\n      },\r\n    },\r\n  ],\r\n})\n"})})]})}function l(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var r=n(96540);const s={},i=r.createContext(s);function o(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);