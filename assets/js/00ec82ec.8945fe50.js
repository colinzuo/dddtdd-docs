"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8337],{48051:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>l,frontMatter:()=>o,metadata:()=>d,toc:()=>s});var r=n(74848),a=n(28453);const o={},i="Data Fetching",d={id:"frontend/vue3/router/advanced/data-fetching",title:"Data Fetching",description:"Fetching After Navigation",source:"@site/docs/00200-frontend/vue3/030-router/030-advanced/030-data-fetching.md",sourceDirName:"00200-frontend/vue3/030-router/030-advanced",slug:"/frontend/vue3/router/advanced/data-fetching",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/data-fetching",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:30,frontMatter:{},sidebar:"docSidebar",previous:{title:"Route Meta Fields",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/meta"},next:{title:"Vue Router and the Composition API",permalink:"/dddtdd-docs/frontend/vue3/router/advanced/composition-api"}},c={},s=[{value:"Fetching After Navigation",id:"fetching-after-navigation",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"data-fetching",children:"Data Fetching"}),"\n",(0,r.jsx)(t.h2,{id:"fetching-after-navigation",children:"Fetching After Navigation"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:'<template>\r\n  <div class="post">\r\n    <div v-if="loading" class="loading">Loading...</div>\r\n\r\n    <div v-if="error" class="error">{{ error }}</div>\r\n\r\n    <div v-if="post" class="content">\r\n      <h2>{{ post.title }}</h2>\r\n      <p>{{ post.body }}</p>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script setup>\r\nimport { ref, watch } from \'vue\'\r\nimport { useRoute } from \'vue-router\'\r\nimport { getPost } from \'./api.js\'\r\n\r\nconst route = useRoute()\r\n\r\nconst loading = ref(false)\r\nconst post = ref(null)\r\nconst error = ref(null)\r\n\r\n// watch the params of the route to fetch the data again\r\nwatch(() => route.params.id, fetchData, { immediate: true })\r\n\r\nasync function fetchData(id) {\r\n  error.value = post.value = null\r\n  loading.value = true\r\n  \r\n  try {\r\n    // replace `getPost` with your data fetching util / API wrapper\r\n    post.value = await getPost(id)  \r\n  } catch (err) {\r\n    error.value = err.toString()\r\n  } finally {\r\n    loading.value = false\r\n  }\r\n}\r\n<\/script>\n'})})]})}function l(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>d});var r=n(96540);const a={},o=r.createContext(a);function i(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);