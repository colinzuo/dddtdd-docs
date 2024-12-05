"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[224],{21335:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var c=n(74848),r=n(28453);const o={title:"Weak Reference Objects"},i=void 0,s={id:"programming-languages/python/c-api/concrete-weekref",title:"Weak Reference Objects",description:"There are two specific object types which directly implement weak references. The first is a simple reference object, and the second acts as a proxy for the original object as much as it can",source:"@site/docs/00400-programming-languages/python/c-api/1040-concrete-weekref.md",sourceDirName:"00400-programming-languages/python/c-api",slug:"/programming-languages/python/c-api/concrete-weekref",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-weekref",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,sidebarPosition:1040,frontMatter:{title:"Weak Reference Objects"},sidebar:"docSidebar",previous:{title:"MemoryView Objects",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-memoryview"},next:{title:"Capsules",permalink:"/dddtdd-docs/programming-languages/python/c-api/concrete-capsule"}},a={},d=[];function l(e){const t={code:"code",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(t.p,{children:["There are two specific object types which directly implement weak references. The first is a ",(0,c.jsx)(t.strong,{children:"simple reference object"}),", and the second acts as a ",(0,c.jsx)(t.strong,{children:"proxy for the original object"})," as much as it can"]}),"\n",(0,c.jsxs)(t.ul,{children:["\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"int PyWeakref_Check(PyObject *ob)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"int PyWeakref_CheckRef(PyObject *ob)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"int PyWeakref_CheckProxy(PyObject *ob)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"PyObject *PyWeakref_NewProxy(PyObject *ob, PyObject *callback)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"PyObject *PyWeakref_GetObject(PyObject *ref)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"PyObject *PyWeakref_GET_OBJECT(PyObject *ref)"})}),"\n",(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:"void PyObject_ClearWeakRefs(PyObject *object)"})}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>s});var c=n(96540);const r={},o=c.createContext(r);function i(e){const t=c.useContext(o);return c.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),c.createElement(o.Provider,{value:t},e.children)}}}]);