"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[8827],{92988:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var o=t(74848),r=t(28453);const i={},s="Dealing with Composables",d={id:"frontend/vue3/pinia/composables",title:"Dealing with Composables",description:"",source:"@site/docs/00200-frontend/vue3/040-pinia/090-composables.md",sourceDirName:"00200-frontend/vue3/040-pinia",slug:"/frontend/vue3/pinia/composables",permalink:"/dddtdd-docs/frontend/vue3/pinia/composables",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:90,frontMatter:{},sidebar:"docSidebar",previous:{title:"Using a store outside of a component",permalink:"/dddtdd-docs/frontend/vue3/pinia/outside-component-usage"},next:{title:"Why Vitest",permalink:"/dddtdd-docs/frontend/vue3/vitest/why"}},c={},a=[];function l(e){const n={code:"code",h1:"h1",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"dealing-with-composables",children:"Dealing with Composables"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-js",children:"import { defineStore, skipHydrate } from 'pinia'\r\nimport { useMediaControls } from '@vueuse/core'\r\n\r\nexport const useVideoPlayer = defineStore('video', () => {\r\n  // we won't expose (return) this element directly\r\n  const videoElement = ref<HTMLVideoElement>()\r\n  const src = ref('/data/video.mp4')\r\n  const { playing, volume, currentTime, togglePictureInPicture } =\r\n    useMediaControls(videoElement, { src })\r\n\r\n  function loadVideo(element: HTMLVideoElement, src: string) {\r\n    videoElement.value = element\r\n    src.value = src\r\n  }\r\n\r\n  return {\r\n    src,\r\n    playing,\r\n    volume,\r\n    currentTime,\r\n\r\n    loadVideo,\r\n    togglePictureInPicture,\r\n  }\r\n})\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>d});var o=t(96540);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);