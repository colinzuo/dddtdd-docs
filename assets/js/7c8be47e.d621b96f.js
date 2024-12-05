"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[3172],{78471:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var i=n(74848),a=n(28453);const r={},s="Reactivity Fundamentals",c={id:"frontend/vue3/core/essentials/reactivity-fundamentals",title:"Reactivity Fundamentals",description:"Declaring Reactive State",source:"@site/docs/00200-frontend/vue3/010-core/011-essentials/030-reactivity-fundamentals.md",sourceDirName:"00200-frontend/vue3/010-core/011-essentials",slug:"/frontend/vue3/core/essentials/reactivity-fundamentals",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/reactivity-fundamentals",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:30,frontMatter:{},sidebar:"docSidebar",previous:{title:"Template Syntax",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/template-syntax"},next:{title:"Computed Properties",permalink:"/dddtdd-docs/frontend/vue3/core/essentials/computed-properties"}},l={},o=[{value:"Declaring Reactive State",id:"declaring-reactive-state",level:2},{value:"<code>&lt;script setup&gt;</code>",id:"script-setup",level:3},{value:"Why Refs?",id:"why-refs",level:2},{value:"Deep Reactivity",id:"deep-reactivity",level:2},{value:"DOM Update Timing",id:"dom-update-timing",level:2},{value:"<code>reactive()</code>",id:"reactive",level:2},{value:"Limitations of <code>reactive()</code>",id:"limitations-of-reactive",level:2},{value:"Additional Ref Unwrapping Details",id:"additional-ref-unwrapping-details",level:2},{value:"As Reactive Object Property",id:"as-reactive-object-property",level:3},{value:"Caveat in Arrays and Collections",id:"caveat-in-arrays-and-collections",level:3},{value:"Caveat when Unwrapping in Templates",id:"caveat-when-unwrapping-in-templates",level:3}];function d(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"reactivity-fundamentals",children:"Reactivity Fundamentals"}),"\n",(0,i.jsx)(t.h2,{id:"declaring-reactive-state",children:"Declaring Reactive State"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"ref()"})," takes the argument and returns it wrapped within a ref object with a ",(0,i.jsx)(t.code,{children:".value"})," property"]}),"\n",(0,i.jsx)(t.h3,{id:"script-setup",children:(0,i.jsx)(t.code,{children:"<script setup>"})}),"\n",(0,i.jsxs)(t.p,{children:["Manually exposing state and methods via ",(0,i.jsx)(t.code,{children:"setup()"})," can be verbose. Luckily, it can be avoided when using Single-File Components (SFCs). We can simplify the usage with ",(0,i.jsx)(t.code,{children:"<script setup>"})]}),"\n",(0,i.jsxs)(t.p,{children:["Top-level imports, variables and functions declared in ",(0,i.jsx)(t.code,{children:"<script setup>"})," are automatically usable in the template of the same component"]}),"\n",(0,i.jsx)(t.h2,{id:"why-refs",children:"Why Refs?"}),"\n",(0,i.jsxs)(t.p,{children:["When a component is rendered for the first time, Vue ",(0,i.jsx)(t.strong,{children:"tracks"})," every ref that was used during the render. Later on, when a ref is mutated, it will ",(0,i.jsx)(t.strong,{children:"trigger"})," a re-render for components that are tracking it"]}),"\n",(0,i.jsx)(t.h2,{id:"deep-reactivity",children:"Deep Reactivity"}),"\n",(0,i.jsxs)(t.p,{children:["A ref will make its value ",(0,i.jsx)(t.strong,{children:"deeply reactive"}),". This means you can expect changes to be detected even when you mutate nested objects or arrays"]}),"\n",(0,i.jsxs)(t.p,{children:["It is also possible to opt-out of deep reactivity with ",(0,i.jsx)(t.strong,{children:"shallow refs"})]}),"\n",(0,i.jsx)(t.h2,{id:"dom-update-timing",children:"DOM Update Timing"}),"\n",(0,i.jsxs)(t.p,{children:["To wait for the DOM update to complete after a state change, you can use the ",(0,i.jsx)(t.code,{children:"nextTick()"})," global API"]}),"\n",(0,i.jsx)(t.h2,{id:"reactive",children:(0,i.jsx)(t.code,{children:"reactive()"})}),"\n",(0,i.jsxs)(t.p,{children:["Unlike a ref which wraps the inner value in a special object, ",(0,i.jsx)(t.code,{children:"reactive()"})," makes an object itself reactive"]}),"\n",(0,i.jsxs)(t.p,{children:["Reactive objects are ",(0,i.jsx)(t.strong,{children:"JavaScript Proxies"})," and behave just like normal objects"]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"reactive()"})," converts the object deeply: nested objects are also wrapped with ",(0,i.jsx)(t.code,{children:"reactive()"})," when accessed. It is also called by ",(0,i.jsx)(t.code,{children:"ref()"})," internally when the ref value is an object. Similar to shallow refs, there is also the ",(0,i.jsx)(t.code,{children:"shallowReactive()"})," API for opting-out of deep reactivity"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-ts",children:"import { reactive } from 'vue'\r\n\r\nconst state = reactive({ count: 0 })\n"})}),"\n",(0,i.jsxs)(t.h2,{id:"limitations-of-reactive",children:["Limitations of ",(0,i.jsx)(t.code,{children:"reactive()"})]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Limited value types: it only works for object types"}),"\n",(0,i.jsx)(t.li,{children:"Cannot replace entire object"}),"\n",(0,i.jsx)(t.li,{children:"Not destructure-friendly"}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"additional-ref-unwrapping-details",children:"Additional Ref Unwrapping Details"}),"\n",(0,i.jsx)(t.h3,{id:"as-reactive-object-property",children:"As Reactive Object Property"}),"\n",(0,i.jsx)(t.p,{children:"A ref is automatically unwrapped when accessed or mutated as a property of a reactive object. In other words, it behaves like a normal property"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-js",children:"const count = ref(0)\r\nconst state = reactive({\r\n  count\r\n})\r\n\r\nconsole.log(state.count) // 0\r\n\r\nstate.count = 1\r\nconsole.log(count.value) // 1\n"})}),"\n",(0,i.jsx)(t.h3,{id:"caveat-in-arrays-and-collections",children:"Caveat in Arrays and Collections"}),"\n",(0,i.jsx)(t.p,{children:"Unlike reactive objects, there is no unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like Map"}),"\n",(0,i.jsx)(t.h3,{id:"caveat-when-unwrapping-in-templates",children:"Caveat when Unwrapping in Templates"}),"\n",(0,i.jsxs)(t.p,{children:["Ref unwrapping in templates ",(0,i.jsx)(t.strong,{children:"only applies if the ref is a top-level property"})," in the template render context"]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>c});var i=n(96540);const a={},r=i.createContext(a);function s(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);