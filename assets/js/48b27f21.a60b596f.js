"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[99],{20074:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>d,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(74848),s=t(28453);const o={},d="Nested Routes",i={id:"frontend/vue3/router/essentials/nested-routes",title:"Nested Routes",description:"",source:"@site/docs/00200-frontend/vue3/030-router/020-essentials/050-nested-routes.md",sourceDirName:"00200-frontend/vue3/030-router/020-essentials",slug:"/frontend/vue3/router/essentials/nested-routes",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/nested-routes",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:50,frontMatter:{},sidebar:"docSidebar",previous:{title:"Named Routes",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/named-routes"},next:{title:"Programmatic Navigation",permalink:"/dddtdd-docs/frontend/vue3/router/essentials/navigation"}},u={},c=[];function a(e){const n={code:"code",h1:"h1",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"nested-routes",children:"Nested Routes"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const routes = [\r\n  {\r\n    path: '/user/:id',\r\n    component: User,\r\n    children: [\r\n      // UserHome will be rendered inside User's <router-view>\r\n      // when /user/:id is matched\r\n      { path: '', component: UserHome },\r\n\r\n      {\r\n        // UserProfile will be rendered inside User's <router-view>\r\n        // when /user/:id/profile is matched\r\n        path: 'profile',\r\n        component: UserProfile,\r\n      },\r\n      {\r\n        // UserPosts will be rendered inside User's <router-view>\r\n        // when /user/:id/posts is matched\r\n        path: 'posts',\r\n        component: UserPosts,\r\n      },\r\n    ],\r\n  },\r\n]\n"})})]})}function l(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>i});var r=t(96540);const s={},o=r.createContext(s);function d(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);