"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8447],{10622:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var o=n(74848),t=n(28453);const s={},a="Scroll Behavior",i={id:"frontend/vue3/router/advanced/scroll-behavior",title:"Scroll Behavior",description:"When using client-side routing, we may want to scroll to top when navigating to a new route, or preserve the scrolling position of history entries just like real page reload does",source:"@site/docs/00200-frontend/vue3/030-router/030-advanced/070-scroll-behavior.md",sourceDirName:"00200-frontend/vue3/030-router/030-advanced",slug:"/frontend/vue3/router/advanced/scroll-behavior",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/scroll-behavior",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:70,frontMatter:{},sidebar:"docSidebar",previous:{title:"Transitions",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/transitions"},next:{title:"Lazy Loading Routes",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/lazy-loading"}},d={},c=[];function l(e){const r={code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{id:"scroll-behavior",children:"Scroll Behavior"}),"\n",(0,o.jsxs)(r.p,{children:["When using client-side routing, we may want to scroll to top when navigating to a new route, or ",(0,o.jsx)(r.strong,{children:"preserve the scrolling position"})," of history entries just like real page reload does"]}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-js",children:"const router = createRouter({\r\n  scrollBehavior(to, from, savedPosition) {\r\n    if (savedPosition) {\r\n      return savedPosition\r\n    } else {\r\n      return { top: 0 }\r\n    }\r\n  },\r\n})\r\n\r\nconst router = createRouter({\r\n  scrollBehavior(to, from, savedPosition) {\r\n    // always scroll 10px above the element #main\r\n    return {\r\n      // could also be\r\n      // el: document.getElementById('main'),\r\n      el: '#main',\r\n      top: -10,\r\n    }\r\n  },\r\n})\r\n\r\nconst router = createRouter({\r\n  scrollBehavior(to, from, savedPosition) {\r\n    if (to.hash) {\r\n      return {\r\n        el: to.hash,\r\n        behavior: 'smooth',\r\n      }\r\n    }\r\n  }\r\n})\n"})})]})}function u(e={}){const{wrapper:r}={...(0,t.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},28453:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>i});var o=n(96540);const t={},s=o.createContext(t);function a(e){const r=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),o.createElement(s.Provider,{value:r},e.children)}}}]);