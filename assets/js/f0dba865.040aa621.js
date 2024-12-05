"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8923],{73655:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>v,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=s(74848),t=s(28453);const r={},d="Conditional Rendering",o={id:"frontend/vue3/core/essentials/conditional-rendering",title:"Conditional Rendering",description:"v-if",source:"@site/docs/00200-frontend/vue3/010-core/011-essentials/060-conditional-rendering.md",sourceDirName:"00200-frontend/vue3/010-core/011-essentials",slug:"/frontend/vue3/core/essentials/conditional-rendering",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/conditional-rendering",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:60,frontMatter:{},sidebar:"docSidebar",previous:{title:"Class and Style Bindings",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/class-and-style-bindings"},next:{title:"List Rendering",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/list-rendering"}},l={},c=[{value:"v-if",id:"v-if",level:2},{value:"v-else",id:"v-else",level:2},{value:"v-else-if",id:"v-else-if",level:2},{value:"v-if on <code>&lt;template&gt;</code>",id:"v-if-on-template",level:2},{value:"v-show",id:"v-show",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"conditional-rendering",children:"Conditional Rendering"}),"\n",(0,i.jsx)(n.h2,{id:"v-if",children:"v-if"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'<h1 v-if="awesome">Vue is awesome!</h1>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"v-else",children:"v-else"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'<button @click="awesome = !awesome">Toggle</button>\r\n\r\n<h1 v-if="awesome">Vue is awesome!</h1>\r\n<h1 v-else>Oh no \ud83d\ude22</h1>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"v-else-if",children:"v-else-if"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"<div v-if=\"type === 'A'\">\r\n  A\r\n</div>\r\n<div v-else-if=\"type === 'B'\">\r\n  B\r\n</div>\r\n<div v-else-if=\"type === 'C'\">\r\n  C\r\n</div>\r\n<div v-else>\r\n  Not A/B/C\r\n</div>\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"v-if-on-template",children:["v-if on ",(0,i.jsx)(n.code,{children:"<template>"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:'<template v-if="ok">\r\n  <h1>Title</h1>\r\n  <p>Paragraph 1</p>\r\n  <p>Paragraph 2</p>\r\n</template>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"v-show",children:"v-show"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"v-show"})," only toggles the display CSS property of the element."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"v-show"})," doesn't support the ",(0,i.jsx)(n.code,{children:"<template>"})," element, nor does it work with ",(0,i.jsx)(n.code,{children:"v-else"})]})]})}function v(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>o});var i=s(96540);const t={},r=i.createContext(t);function d(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);