"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[6746],{32552:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=t(74848),s=t(28453);const r={},o="Transition",a={id:"frontend/vue3/core/built-ins/transition",title:"Transition",description:"- `` for applying animations when an element or component is entering and leaving the DOM. This is covered on this page",source:"@site/docs/00200-frontend/vue3/010-core/014-built-ins/010-transition.md",sourceDirName:"00200-frontend/vue3/010-core/014-built-ins",slug:"/frontend/vue3/core/built-ins/transition",permalink:"/dddtdd-docs/frontend/vue3/core/built-ins/transition",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:10,frontMatter:{},sidebar:"docSidebar",previous:{title:"Plugins",permalink:"/dddtdd-docs/frontend/vue3/core/reusability/plugins"},next:{title:"TransitionGroup",permalink:"/dddtdd-docs/frontend/vue3/core/built-ins/transition-group"}},l={},c=[{value:"The <code>&lt;Transition&gt;</code> Component",id:"the-transition-component",level:2},{value:"CSS-Based Transitions",id:"css-based-transitions",level:2},{value:"Named Transitions",id:"named-transitions",level:3},{value:"Reusable Transitions",id:"reusable-transitions",level:2}];function d(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"transition",children:"Transition"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"<Transition>"})," for applying animations when an element or component is entering and leaving the DOM. This is covered on this page"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"<TransitionGroup>"})," for applying animations when an element or component is inserted into, removed from, or moved within a ",(0,i.jsx)(e.code,{children:"v-for"})," list"]}),"\n"]}),"\n",(0,i.jsxs)(e.h2,{id:"the-transition-component",children:["The ",(0,i.jsx)(e.code,{children:"<Transition>"})," Component"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:'<button @click="show = !show">Toggle</button>\r\n<Transition>\r\n  <p v-if="show">hello</p>\r\n</Transition>\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-css",children:"/* we will explain what these classes do next! */\r\n.v-enter-active,\r\n.v-leave-active {\r\n  transition: opacity 0.5s ease;\r\n}\r\n\r\n.v-enter-from,\r\n.v-leave-to {\r\n  opacity: 0;\r\n}\n"})}),"\n",(0,i.jsx)(e.h2,{id:"css-based-transitions",children:"CSS-Based Transitions"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{src:"https://vuejs.org/assets/transition-classes.DYG5-69l.png",alt:"Transition Classes"})}),"\n",(0,i.jsx)(e.h3,{id:"named-transitions",children:"Named Transitions"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:'<Transition name="fade">\r\n  ...\r\n</Transition>\n'})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-css",children:".fade-enter-active,\r\n.fade-leave-active {\r\n  transition: opacity 0.5s ease;\r\n}\r\n\r\n.fade-enter-from,\r\n.fade-leave-to {\r\n  opacity: 0;\r\n}\n"})}),"\n",(0,i.jsx)(e.h2,{id:"reusable-transitions",children:"Reusable Transitions"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-html",children:'\x3c!-- MyTransition.vue --\x3e\r\n<script>\r\n// JavaScript hooks logic...\r\n<\/script>\r\n\r\n<template>\r\n  \x3c!-- wrap the built-in Transition component --\x3e\r\n  <Transition\r\n    name="my-transition"\r\n    @enter="onEnter"\r\n    @leave="onLeave">\r\n    <slot></slot> \x3c!-- pass down slot content --\x3e\r\n  </Transition>\r\n</template>\r\n\r\n<style>\r\n/*\r\n  Necessary CSS...\r\n  Note: avoid using <style scoped> here since it\r\n  does not apply to slot content.\r\n*/\r\n</style>\n'})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>o,x:()=>a});var i=t(96540);const s={},r=i.createContext(s);function o(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:o(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);