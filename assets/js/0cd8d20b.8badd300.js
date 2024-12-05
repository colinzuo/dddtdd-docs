"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[2996],{48949:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var t=r(74848),i=r(28453);const o={},s="Provide / Inject",c={id:"frontend/vue3/core/components-in-depth/provide-inject",title:"Provide / Inject",description:"Prop Drilling",source:"@site/docs/00200-frontend/vue3/010-core/012-components-in-depth/070-provide-inject.md",sourceDirName:"00200-frontend/vue3/010-core/012-components-in-depth",slug:"/frontend/vue3/core/components-in-depth/provide-inject",permalink:"/dddtdd-docs/frontend/vue3/core/components-in-depth/provide-inject",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:70,frontMatter:{},sidebar:"docSidebar",previous:{title:"Slots",permalink:"/dddtdd-docs/frontend/vue3/core/components-in-depth/slots"},next:{title:"Async Components",permalink:"/dddtdd-docs/frontend/vue3/core/components-in-depth/async"}},d={},l=[{value:"Prop Drilling",id:"prop-drilling",level:2},{value:"Provide",id:"provide",level:2},{value:"App-level Provide",id:"app-level-provide",level:2},{value:"Inject",id:"inject",level:2},{value:"Working with Reactivity",id:"working-with-reactivity",level:2},{value:"Working with Symbol Keys",id:"working-with-symbol-keys",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"provide--inject",children:"Provide / Inject"}),"\n",(0,t.jsx)(n.h2,{id:"prop-drilling",children:"Prop Drilling"}),"\n",(0,t.jsx)(n.p,{children:'With only props, we would have to pass the same prop across the entire parent chain.\r\nThis is called "props drilling" and definitely isn\'t fun to deal with.'}),"\n",(0,t.jsxs)(n.p,{children:["A parent component can serve as a ",(0,t.jsx)(n.strong,{children:"dependency provider"})," for all its descendants"]}),"\n",(0,t.jsx)(n.h2,{id:"provide",children:"Provide"}),"\n",(0,t.jsxs)(n.p,{children:["The first argument is called the ",(0,t.jsx)(n.strong,{children:"injection key"}),", which can be a string or a ",(0,t.jsx)(n.code,{children:"Symbol"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"<script setup>\r\nimport { provide } from 'vue'\r\n\r\nprovide(/* key */ 'message', /* value */ 'hello!')\r\n<\/script>\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The second argument is the provided value. The value can be of ",(0,t.jsx)(n.strong,{children:"any type, including reactive state"})," such as refs"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { ref, provide } from 'vue'\r\n\r\nconst count = ref(0)\r\nprovide('key', count)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"app-level-provide",children:"App-level Provide"}),"\n",(0,t.jsx)(n.p,{children:"App-level provides are available to all components rendered in the app. This is especially useful when writing plugins"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { createApp } from 'vue'\r\n\r\nconst app = createApp({})\r\n\r\napp.provide(/* key */ 'message', /* value */ 'hello!')\n"})}),"\n",(0,t.jsx)(n.h2,{id:"inject",children:"Inject"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"<script setup>\r\nimport { inject } from 'vue'\r\n\r\nconst message = inject('message')\r\n<\/script>\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// `value` will be \"default value\"\r\n// if no data matching \"message\" was provided\r\nconst value = inject('message', 'default value')\r\n\r\nconst value = inject('key', () => new ExpensiveClass())\n"})}),"\n",(0,t.jsx)(n.h2,{id:"working-with-reactivity",children:"Working with Reactivity"}),"\n",(0,t.jsxs)(n.p,{children:["When using reactive provide / inject values, ",(0,t.jsx)(n.strong,{children:"it is recommended to keep any mutations to reactive state inside of the provider whenever possible"})]}),"\n",(0,t.jsxs)(n.p,{children:["There may be times when we need to update the data from an injector component. In such cases, we ",(0,t.jsx)(n.strong,{children:"recommend providing a function"})," that is responsible for mutating the state"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"\x3c!-- inside provider component --\x3e\r\n<script setup>\r\nimport { provide, ref } from 'vue'\r\n\r\nconst location = ref('North Pole')\r\n\r\nfunction updateLocation() {\r\n  location.value = 'South Pole'\r\n}\r\n\r\nprovide('location', {\r\n  location,\r\n  updateLocation\r\n})\r\n<\/script>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"working-with-symbol-keys",children:"Working with Symbol Keys"}),"\n",(0,t.jsx)(n.p,{children:"It's recommended to export the Symbols in a dedicated file"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"// keys.js\r\nexport const myInjectionKey = Symbol()\r\n\r\n// in provider component\r\nimport { provide } from 'vue'\r\nimport { myInjectionKey } from './keys.js'\r\n\r\nprovide(myInjectionKey, {\r\n  /* data to provide */\r\n})\r\n\r\n// in injector component\r\nimport { inject } from 'vue'\r\nimport { myInjectionKey } from './keys.js'\r\n\r\nconst injected = inject(myInjectionKey)\n"})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},28453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>c});var t=r(96540);const i={},o=t.createContext(i);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);